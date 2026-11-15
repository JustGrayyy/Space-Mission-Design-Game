import * as THREE from 'three';
import {
  EARTH_ATM_TOP_M,
  EARTH_MU,
  EARTH_RADIUS_M,
  DEFAULT_LAUNCH_SITE_ID,
  EARTH_ROT_RATE,
  GROUND_STATIONS,
  LAUNCH_SITES_BY_ID,
  MARS_MU,
  MARS_RADIUS_M,
  MARS_SOI_M,
  MOON_MU,
  MOON_RADIUS_M,
  MOON_SOI_M,
  SUN_DIRECTION,
} from '../../core/constants';
import {
  getGroundStationWorldPos,
  getMarsState,
  getMoonState,
  vecLen,
  vecSub,
  vecAdd,
  vecScale,
  getSurfacePosition,
} from '../../core/physicsEngine';
import type { SubsystemCategory, Vec3, FlightState } from '../../core/types';
import { useMissionStore } from '../../store/useMissionStore';
import {
  createConeBeam,
  createLaunchPadModel,
  createPlanetMesh,
  createRocketStackGroup,
  createSpentStage1Mesh,
  createExhaustPlume,
  createStarfield,
  disposeObject3D,
} from '../meshes/ProceduralAssets';
import type { SceneController } from './SceneController';

const WORLD_SCALE = 1 / 10_000;
const UP_Y = new THREE.Vector3(0, 1, 0);

/** Height of the visible meshes along the object's own up axis (ignores hidden plume/smoke). */
function visibleHeight(obj: THREE.Object3D): number {
  obj.updateWorldMatrix(true, true);
  const inv = new THREE.Matrix4().copy(obj.matrixWorld).invert();
  const box = new THREE.Box3();
  const tmp = new THREE.Box3();
  const scale = new THREE.Vector3();
  obj.matrixWorld.decompose(new THREE.Vector3(), new THREE.Quaternion(), scale);
  obj.traverse((o) => {
    let v = true;
    for (let a: THREE.Object3D | null = o; a && a !== obj.parent; a = a.parent) if (!a.visible) v = false;
    const mesh = o as THREE.Mesh;
    if (!v || !mesh.isMesh || !mesh.geometry) return;
    mesh.geometry.computeBoundingBox();
    tmp.copy(mesh.geometry.boundingBox!).applyMatrix4(new THREE.Matrix4().multiplyMatrices(inv, mesh.matrixWorld));
    box.union(tmp);
  });
  return box.isEmpty() ? 0 : (box.max.y - box.min.y) * scale.y;
}

function toWorld(v: Vec3): THREE.Vector3 {
  return new THREE.Vector3(v.x * WORLD_SCALE, v.y * WORLD_SCALE, v.z * WORLD_SCALE);
}

interface SpentBooster {
  mesh: THREE.Group;
  vel: THREE.Vector3;
  rotAxis: THREE.Vector3;
  age: number;
}

interface PooledDsnVisual {
  dot: THREE.Mesh;
  dotMat: THREE.MeshBasicMaterial;
  cone: THREE.Mesh;
  coneMat: THREE.MeshBasicMaterial;
  beam: THREE.Line;
  beamPositions: Float32Array;
}

const ORBIT_SEGMENTS = 96;
const DESCENT_LINE_SEGMENTS = 64;
const LANDING_TARGET_MARKER_RADIUS = 1.5;

export class FlightScene implements SceneController {
  private scene!: THREE.Scene;
  private camera!: THREE.PerspectiveCamera;
  private root = new THREE.Group();

  private earth!: THREE.Group;
  private moon!: THREE.Group;
  private mars!: THREE.Group;
  private padTower!: THREE.Group;
  /** Turns with the Earth so the pad (and the rocket on it) stays put on the ground. */
  private padPivot = new THREE.Group();
  /** Smoothed "up" for the camera, so it never flips when the reference body changes. */
  private camUp = new THREE.Vector3(0, 1, 0);
  private shake = 0;
  private smoke = new THREE.Group();
  private smokeT = -1;
  private sepFlash = (() => {
    const g = new THREE.Group();
    const core = new THREE.Mesh(
      new THREE.SphereGeometry(0.5, 16, 12),
      new THREE.MeshBasicMaterial({ color: '#fff1d6', transparent: true, opacity: 0, depthWrite: false, blending: THREE.AdditiveBlending })
    );
    const ring = new THREE.Mesh(
      new THREE.TorusGeometry(0.8, 0.05, 8, 48),
      new THREE.MeshBasicMaterial({ color: '#ff9a4d', transparent: true, opacity: 0, depthWrite: false, blending: THREE.AdditiveBlending })
    );
    ring.rotation.x = Math.PI / 2;
    g.add(core, ring);
    g.visible = false;
    return g;
  })();
  private sepT = -1;
  /** Engine power as the player sees it: eases toward the autopilot's command (no snapping). */
  private shownThrottle = 0;
  /** Player zoomed by hand: stop the automatic launch-to-orbit camera pull-back. */
  private userZoomed = false;
  /** Tower size relative to the rocket, measured once so the pad always matches it. */
  private padK = 0;
  private padRelease = 0;

  private craftPivot = new THREE.Group();
  private craftVisual: THREE.Group | null = null;
  private plume!: THREE.Group;
  private sensorCone!: THREE.Mesh;

  private orbitLine!: THREE.Line;
  private orbitPositions = new Float32Array((ORBIT_SEGMENTS + 1) * 3);
  private apMarker!: THREE.Mesh;
  private peMarker!: THREE.Mesh;

  private earthShadow!: THREE.Mesh;
  private moonShadow!: THREE.Mesh;
  private marsShadow!: THREE.Mesh;

  // Descent trajectory line and landing target marker
  private descentLine!: THREE.Line;
  private descentPositions = new Float32Array((DESCENT_LINE_SEGMENTS + 1) * 3);
  private descentTargetMarker!: THREE.Mesh;

  private dsnConesGroup = new THREE.Group();
  private downlinkLinesGroup = new THREE.Group();
  private dsnPool = new Map<string, PooledDsnVisual>();

  private spentBoosters: SpentBooster[] = [];
  private builtStageIndex: 0 | 1 | null = null;
  private builtLauncherId: string | null = null;

  private yaw = 0.8;
  private pitch = 0.45;
  private distance = 22;

  mount(scene: THREE.Scene, camera: THREE.PerspectiveCamera): void {
    this.scene = scene;
    this.camera = camera;
    this.camera.near = 0.05; // close enough for the low launch shot
    this.camera.far = 6500;
    this.camera.updateProjectionMatrix();

    this.scene.add(this.root);

    // Lighting matching SUN_DIRECTION (+X)
    // Space lighting: one strong warm sun, a soft sky/ground bounce so the night side
    // is dark but readable, and a cool rim so the rocket's edges catch the light.
    const ambient = new THREE.AmbientLight('#1b2233', 0.35);
    const sky = new THREE.HemisphereLight('#9cc8ff', '#2a1a10', 0.55);
    const sun = new THREE.DirectionalLight('#fff1dc', 3.4);
    sun.position.set(SUN_DIRECTION.x * 1200, 140, 200);
    const rim = new THREE.DirectionalLight('#8fb8ff', 0.9);
    rim.position.set(-400, 120, -260);
    this.root.add(ambient, sky, sun, rim);

    // Deep space starfield
    this.root.add(createStarfield(1800, 3400));

    // Planets
    this.earth = createPlanetMesh('EARTH', EARTH_RADIUS_M * WORLD_SCALE);
    this.moon = createPlanetMesh('MOON', MOON_RADIUS_M * WORLD_SCALE);
    this.mars = createPlanetMesh('MARS', MARS_RADIUS_M * WORLD_SCALE);
    this.root.add(this.earth, this.moon, this.mars);

    // Eclipse Shadow Cylinders extending along -X
    const makeShadow = (radiusUnits: number, lengthUnits: number) => {
      const geom = new THREE.CylinderGeometry(radiusUnits * 0.98, radiusUnits * 0.98, lengthUnits, 24, 1, true);
      geom.rotateZ(Math.PI / 2);
      geom.translate(-lengthUnits / 2, 0, 0);
      const mat = new THREE.MeshBasicMaterial({
        color: '#030816',
        transparent: true,
        opacity: 0.44,
        side: THREE.DoubleSide,
        depthWrite: false,
      });
      return new THREE.Mesh(geom, mat);
    };

    this.earthShadow = makeShadow(EARTH_RADIUS_M * WORLD_SCALE, 360);
    this.moonShadow = makeShadow(MOON_RADIUS_M * WORLD_SCALE, 90);
    this.marsShadow = makeShadow(MARS_RADIUS_M * WORLD_SCALE, 140);
    this.root.add(this.earthShadow, this.moonShadow, this.marsShadow);

    // Launchpad tower shares selected launch site's physical surface normal.
    const launchSiteId = useMissionStore.getState().launchSiteId;
    const launchSite = LAUNCH_SITES_BY_ID[launchSiteId] ?? LAUNCH_SITES_BY_ID[DEFAULT_LAUNCH_SITE_ID];
    const launchPos = getSurfacePosition(launchSite.latDeg, launchSite.lonDeg);
    const launchNormal = toWorld(launchPos).normalize();
    this.padTower = createLaunchPadModel();
    // Sink the slab a hair into the ground so no gap shows between pad and Earth.
    this.padTower.position.copy(toWorld(launchPos)).addScaledVector(launchNormal, -0.004);
    this.padTower.quaternion.setFromUnitVectors(UP_Y, launchNormal);
    this.padPivot.add(this.padTower);
    // Launch smoke puffs, hidden until ignition.
    for (let i = 0; i < 16; i++) {
      const a = (i / 16) * Math.PI * 2 + Math.random() * 0.3;
      const puff = new THREE.Mesh(
        new THREE.SphereGeometry(0.075, 10, 8),
        new THREE.MeshBasicMaterial({ color: '#e8e2d8', transparent: true, opacity: 0, depthWrite: false })
      );
      puff.userData.dir = new THREE.Vector3(Math.cos(a), 0, Math.sin(a));
      this.smoke.add(puff);
    }
    this.smoke.visible = false;
    this.padTower.add(this.smoke);
    this.root.add(this.padPivot);

    // Spacecraft Pivot + Exhaust Plume + Sensor Cone
    this.plume = createExhaustPlume();
    this.plume.visible = false;
    this.craftPivot.add(this.plume);

    this.sensorCone = createConeBeam(6.5, 2.2, 0x34d399, 0.22);
    this.sensorCone.visible = false;
    this.root.add(this.sensorCone);

    this.root.add(this.craftPivot);
    this.root.add(this.sepFlash);

    // AP / PE Markers
    this.apMarker = new THREE.Mesh(
      new THREE.SphereGeometry(1.4, 12, 12),
      new THREE.MeshBasicMaterial({ color: '#34d399' })
    );
    this.peMarker = new THREE.Mesh(
      new THREE.SphereGeometry(1.4, 12, 12),
      new THREE.MeshBasicMaterial({ color: '#f59e0b' })
    );
    this.apMarker.visible = false;
    this.peMarker.visible = false;
    this.root.add(this.apMarker, this.peMarker);

    this.root.add(this.dsnConesGroup, this.downlinkLinesGroup);

    // Preallocate persistent orbit line buffer
    const orbitGeom = new THREE.BufferGeometry();
    orbitGeom.setAttribute('position', new THREE.BufferAttribute(this.orbitPositions, 3));
    orbitGeom.setDrawRange(0, 0);
    this.orbitLine = new THREE.Line(
      orbitGeom,
      new THREE.LineBasicMaterial({ color: 0x38bdf8, transparent: true, opacity: 0.72 })
    );
    this.orbitLine.frustumCulled = false;
    this.orbitLine.renderOrder = 2; // Above atmosphere halos (renderOrder 1)
    this.root.add(this.orbitLine);
    // Predicted-path lines confused players more than they helped, so they stay hidden.
    this.orbitLine.visible = false;

    // Preallocate descent trajectory line
    const descentGeom = new THREE.BufferGeometry();
    descentGeom.setAttribute('position', new THREE.BufferAttribute(this.descentPositions, 3));
    descentGeom.setDrawRange(0, 0);
    this.descentLine = new THREE.Line(
      descentGeom,
      new THREE.LineBasicMaterial({ color: 0xfbbf24, transparent: true, opacity: 0.75 })
    );
    this.descentLine.frustumCulled = false;
    this.descentLine.renderOrder = 2;
    this.root.add(this.descentLine);
    this.descentLine.visible = false;

    // Preallocate landing target marker
    this.descentTargetMarker = new THREE.Mesh(
      new THREE.SphereGeometry(LANDING_TARGET_MARKER_RADIUS, 12, 12),
      new THREE.MeshBasicMaterial({ color: 0xfbbf24, transparent: true, opacity: 0.9 })
    );
    this.descentTargetMarker.visible = false;
    this.root.add(this.descentTargetMarker);

    // Preallocate DSN station dots, cones, and beams
    const dotGeom = new THREE.SphereGeometry(0.95, 8, 8);
    for (const st of GROUND_STATIONS) {
      const dotMat = new THREE.MeshBasicMaterial({ color: '#38bdf8' });
      const dot = new THREE.Mesh(dotGeom, dotMat);
      dot.visible = false;

      const cone = createConeBeam(18, 8, 0x22d3ee, 0.1);
      const coneMat = cone.material as THREE.MeshBasicMaterial;
      cone.visible = false;

      const beamPositions = new Float32Array(6);
      const beamGeom = new THREE.BufferGeometry();
      beamGeom.setAttribute('position', new THREE.BufferAttribute(beamPositions, 3));
      const beam = new THREE.Line(
        beamGeom,
        new THREE.LineBasicMaterial({ color: 0x4ade80, transparent: true, opacity: 0.92 })
      );
      beam.frustumCulled = false;
      beam.visible = false;

      this.dsnConesGroup.add(dot, cone);
      this.downlinkLinesGroup.add(beam);
      this.dsnPool.set(st.id, { dot, dotMat, cone, coneMat, beam, beamPositions });
    }

    this.rebuildCraftMesh(0);
    this.update(0, 0);
  }

  private rebuildCraftMesh(stageIdx: 0 | 1): void {
    const state = useMissionStore.getState();
    if (this.craftVisual) {
      this.craftPivot.remove(this.craftVisual);
      disposeObject3D(this.craftVisual);
      this.craftVisual = null;
    }

    this.craftVisual = createRocketStackGroup(
      state.spacecraft,
      new Set<SubsystemCategory>(),
      {
        hideStage1: stageIdx === 1,
        showSnapRings: false,
      }
    );
    // Shift so rocket stack sits neatly around local origin
    this.craftVisual.scale.setScalar(0.32);
    this.craftVisual.position.y = stageIdx === 1 ? -1.4 : 0;
    this.craftPivot.add(this.craftVisual);

    this.plume.scale.setScalar(0.32);
    this.plume.position.y = stageIdx === 1 ? -0.18 : 0.0;

    this.builtStageIndex = stageIdx;
    this.builtLauncherId = state.spacecraft.launcherId;
  }

  private spawnSpentStage1(craftWorldPos: THREE.Vector3, headingVec: THREE.Vector3): void {
    const booster = createSpentStage1Mesh(this.builtLauncherId);
    // Match the rocket's on-screen size, so the booster doesn't shrink as it separates.
    booster.scale.setScalar(this.craftPivot.scale.x * 0.32);
    // Separation flash + expanding ring at the joint.
    this.sepFlash.position.copy(craftWorldPos);
    this.sepFlash.quaternion.setFromUnitVectors(UP_Y, headingVec);
    this.sepFlash.visible = true;
    this.sepT = 0;
    booster.position.copy(craftWorldPos);
    booster.quaternion.setFromUnitVectors(UP_Y, headingVec);
    this.root.add(booster);

    // Drift backward and to the side, so the player sees it fall away.
    const side = new THREE.Vector3().crossVectors(headingVec, UP_Y);
    if (side.lengthSq() < 1e-6) side.set(1, 0, 0);
    side.normalize();
    const sepVel = headingVec.clone().multiplyScalar(-0.9).addScaledVector(side, 0.35);
    this.spentBoosters.push({
      mesh: booster,
      vel: sepVel,
      rotAxis: new THREE.Vector3(0.7, 0.2, 0.6).normalize(),
      age: 0,
    });
  }

  private updateDescentTrajectory(flight: FlightState, isMoon: boolean): void {
    // Reset descent line
    this.descentLine.geometry.setDrawRange(0, 0);
    this.descentTargetMarker.visible = false;

    // Get target body state
    const moonState = getMoonState(flight.elapsedFlightSec);
    const marsState = getMarsState(flight.elapsedFlightSec);
    const targetBodyCenterM = isMoon ? moonState.pos : marsState.pos;
    const targetBodyVelM = isMoon ? moonState.vel : marsState.vel;
    const mu = isMoon ? MOON_MU : MARS_MU;
    const radius = isMoon ? MOON_RADIUS_M : MARS_RADIUS_M;

    // Compute relative position and velocity to target body
    const relPos = vecSub(flight.position, targetBodyCenterM);
    const relVel = vecSub(flight.velocity, targetBodyVelM);

    // Simple ballistic trajectory preview: project current state forward under gravity only
    let pos = relPos;
    let vel = relVel;
    const positionsArr = this.descentPositions as Float32Array;
    const numSteps = DESCENT_LINE_SEGMENTS;
    const stepTime = 20; // 20 seconds per step for smooth preview

    // Use current position as first point
    positionsArr[0] = pos.x;
    positionsArr[1] = pos.y;
    positionsArr[2] = pos.z;

    for (let i = 1; i <= numSteps; i++) {
      // Simple Velocity-Verlet integration
      const h = stepTime;
      const halfVel = vecAdd(vel, vecScale({
        x: -mu * pos.x / Math.pow(vecLen(pos), 3),
        y: -mu * pos.y / Math.pow(vecLen(pos), 3),
        z: -mu * pos.z / Math.pow(vecLen(pos), 3)
      }, 0.5 * h));

      const nextPos = vecAdd(pos, vecScale(halfVel, h));
      const nextGrav = {
        x: -mu * nextPos.x / Math.pow(vecLen(nextPos), 3),
        y: -mu * nextPos.y / Math.pow(vecLen(nextPos), 3),
        z: -mu * nextPos.z / Math.pow(vecLen(nextPos), 3)
      };
      const nextVel = vecAdd(halfVel, vecScale(nextGrav, 0.5 * h));

      positionsArr[i * 3] = nextPos.x;
      positionsArr[i * 3 + 1] = nextPos.y;
      positionsArr[i * 3 + 2] = nextPos.z;

      pos = nextPos;
      vel = nextVel;

      // Stop if we'd hit the surface
      if (vecLen(pos) < radius * 1.01) {
        // Fill remaining with surface point
        for (let j = i + 1; j <= numSteps; j++) {
          positionsArr[j * 3] = pos.x;
          positionsArr[j * 3 + 1] = pos.y;
          positionsArr[j * 3 + 2] = pos.z;
        }
        break;
      }
    }

    const geom = this.descentLine.geometry;
    geom.setDrawRange(0, numSteps + 1);
    const attr = geom.getAttribute('position') as THREE.BufferAttribute;
    attr.needsUpdate = true;

    // Landing target marker at target surface (projected along velocity)
    this.descentTargetMarker.visible = true;
    const targetBodyWorld = isMoon ? this.moon.position : this.mars.position;
    this.descentTargetMarker.position.copy(targetBodyWorld);
  }

  private updateOrbitTrajectory(
    craftPosM: Vec3,
    craftVelM: Vec3,
    bodyCenterM: Vec3,
    bodyVelM: Vec3,
    mu: number,
    bodyRadiusM: number
  ): void {
    this.orbitLine.geometry.setDrawRange(0, 0);
    this.apMarker.visible = false;
    this.peMarker.visible = false;

    const rVec = vecSub(craftPosM, bodyCenterM);
    const vVec = vecSub(craftVelM, bodyVelM);
    const r = vecLen(rVec);
    const v = vecLen(vVec);

    if (r < bodyRadiusM * 1.005 || v < 20) return;

    const r3 = new THREE.Vector3(rVec.x, rVec.y, rVec.z);
    const v3 = new THREE.Vector3(vVec.x, vVec.y, vVec.z);
    const h = new THREE.Vector3().crossVectors(r3, v3);
    const hLen = h.length();
    if (hLen < 1e4) return;

    const eVec = new THREE.Vector3()
      .crossVectors(v3, h)
      .divideScalar(mu)
      .sub(r3.clone().normalize());
    const e = eVec.length();

    const p = (hLen * hLen) / mu; // semi-latus rectum
    if (!Number.isFinite(p) || p <= 0) return;

    // Basis in orbital plane: pHat points toward periapsis, qHat is prograde at periapsis
    const hHat = h.clone().normalize();
    const pHat = e > 1e-4 ? eVec.clone().normalize() : r3.clone().normalize();
    const qHat = new THREE.Vector3().crossVectors(hHat, pHat).normalize();

    const bodyCenterWorld = toWorld(bodyCenterM);

    const maxNu = e < 0.99 ? Math.PI : Math.acos(-1 / e) * 0.88;
    let count = 0;
    for (let i = 0; i <= ORBIT_SEGMENTS; i++) {
      const nu = -maxNu + (i / ORBIT_SEGMENTS) * (2 * maxNu);
      const denom = 1 + e * Math.cos(nu);
      if (denom <= 0.05) continue;
      const rad = p / denom;
      if (rad > 12_000_000) continue;

      const x =
        bodyCenterWorld.x +
        (pHat.x * Math.cos(nu) + qHat.x * Math.sin(nu)) * rad * WORLD_SCALE;
      const y =
        bodyCenterWorld.y +
        (pHat.y * Math.cos(nu) + qHat.y * Math.sin(nu)) * rad * WORLD_SCALE;
      const z =
        bodyCenterWorld.z +
        (pHat.z * Math.cos(nu) + qHat.z * Math.sin(nu)) * rad * WORLD_SCALE;

      this.orbitPositions[count * 3] = x;
      this.orbitPositions[count * 3 + 1] = y;
      this.orbitPositions[count * 3 + 2] = z;
      count++;
    }

    if (count >= 2) {
      const attr = this.orbitLine.geometry.getAttribute('position') as THREE.BufferAttribute;
      attr.needsUpdate = true;
      this.orbitLine.geometry.setDrawRange(0, count);
    }

    // PE marker at nu = 0
    const rp = p / (1 + e);
    if (rp > bodyRadiusM * 0.95 && rp < 10_000_000) {
      this.peMarker.position
        .copy(bodyCenterWorld)
        .addScaledVector(pHat, rp * WORLD_SCALE);
      this.peMarker.visible = true;
    }

    // AP marker at nu = pi (elliptical only)
    if (e < 0.98) {
      const ra = p / (1 - e);
      if (ra < 10_000_000) {
        this.apMarker.position
          .copy(bodyCenterWorld)
          .addScaledVector(pHat, -ra * WORLD_SCALE);
        this.apMarker.visible = true;
      }
    }
  }

  private updateDsnVisuals(
    craftWorldPos: THREE.Vector3,
    elapsedFlightSec: number,
    selectedStations: string[],
    activeDsnIds: string[],
    isTransmitting: boolean
  ): void {
    const selectedSet = new Set(selectedStations);
    const activeSet = new Set(activeDsnIds);

    for (const [id, vis] of this.dsnPool.entries()) {
      if (!selectedSet.has(id)) {
        vis.dot.visible = false;
        vis.cone.visible = false;
        vis.beam.visible = false;
        continue;
      }

      const stPosM = getGroundStationWorldPos(id, elapsedFlightSec);
      const stWorld = toWorld(stPosM);
      const isVisible = activeSet.has(id);

      vis.dot.visible = true;
      vis.dot.position.copy(stWorld);
      vis.dotMat.color.set(isVisible ? '#34d399' : '#38bdf8');

      vis.cone.visible = true;
      vis.cone.position.copy(stWorld);
      const dir =
        id === 'lunar-relay'
          ? stWorld.clone().normalize().negate()
          : stWorld.clone().normalize();
      vis.cone.quaternion.setFromUnitVectors(UP_Y, dir);
      vis.coneMat.color.setHex(isVisible ? 0x34d399 : 0x22d3ee);
      vis.coneMat.opacity = isVisible ? 0.14 : 0.06;

      if (isVisible && isTransmitting) {
        vis.beam.visible = true;
        vis.beamPositions[0] = craftWorldPos.x;
        vis.beamPositions[1] = craftWorldPos.y;
        vis.beamPositions[2] = craftWorldPos.z;
        vis.beamPositions[3] = stWorld.x;
        vis.beamPositions[4] = stWorld.y;
        vis.beamPositions[5] = stWorld.z;
        const attr = vis.beam.geometry.getAttribute('position') as THREE.BufferAttribute;
        attr.needsUpdate = true;
      } else {
        vis.beam.visible = false;
      }
    }
  }

  update(dt: number, elapsed: number): void {
    const state = useMissionStore.getState();
    const flight = state.flight;
    if (!flight) return;

    const flElapsed = flight.elapsedFlightSec;

    // Planets rotation & ephemeris
    this.earth.rotation.y = -EARTH_ROT_RATE * flElapsed;
    this.padPivot.rotation.y = this.earth.rotation.y;
    const moon = getMoonState(flElapsed);
    const mars = getMarsState(flElapsed);
    this.moon.position.copy(toWorld(moon.pos));
    this.mars.position.copy(toWorld(mars.pos));
    this.moonShadow.position.copy(this.moon.position);
    this.marsShadow.position.copy(this.mars.position);

    // Stage separation check
    if (this.builtStageIndex === 0 && flight.activeStageIndex === 1) {
      const hVec = new THREE.Vector3(
        flight.heading.x,
        flight.heading.y,
        flight.heading.z
      ).normalize();
      this.spawnSpentStage1(this.craftPivot.position.clone(), hVec);
      this.rebuildCraftMesh(1);
    } else if (this.builtStageIndex === null) {
      this.rebuildCraftMesh(flight.activeStageIndex);
    }

    // Update craft position & attitude
    const craftWorldPos = toWorld(flight.position);
    this.craftPivot.position.copy(craftWorldPos);

    const headingVec = new THREE.Vector3(
      flight.heading.x,
      flight.heading.y,
      flight.heading.z
    );
    if (headingVec.lengthSq() > 1e-6) {
      headingVec.normalize();
      this.craftPivot.quaternion.setFromUnitVectors(UP_Y, headingVec);
    }

    // Cinematic framing: start close on the pad, pull back as the rocket climbs.
    if (!this.userZoomed) {
      const altKm = Math.max(0, flight.orbitalElements.altitudeM) / 1000;
      const k = Math.min(1, altKm / 160);
      const target = 3.2 + 18.8 * (k * k * (3 - 2 * k));
      this.distance += (target - this.distance) * Math.min(1, dt * 1.2);
    }
    // Visual scale keeps craft clearly visible even when camera zoomed out
    const visualScale = Math.max(0.12, Math.min(3.4, this.distance * 0.036));
    this.craftPivot.scale.setScalar(visualScale);

    // Size the launch tower from the rocket's real on-screen height, once.
    if (!this.padK) {
      const rocketH = visibleHeight(this.craftPivot);
      this.padTower.scale.setScalar(1);
      const towerH = visibleHeight(this.padTower);
      if (rocketH > 0 && towerH > 0) this.padK = (1.12 * rocketH) / (towerH * visualScale);
    }
    if (this.padK) this.padTower.scale.setScalar(this.padK * visualScale);

    // Liftoff: the swing arms pull away and the hold-down clamps fold back.
    if (flight.status !== 'PRELAUNCH') {
      this.padRelease = Math.min(1, this.padRelease + dt / 1.6);
      const e = 1 - Math.pow(1 - this.padRelease, 3);
      const arm1 = this.padTower.getObjectByName('pad-arm-1');
      const arm2 = this.padTower.getObjectByName('pad-arm-2');
      if (arm1) arm1.rotation.y = -1.35 * e;
      if (arm2) arm2.rotation.y = 1.35 * e;
      const clamps = this.padTower.getObjectByName('pad-clamps');
      if (clamps) clamps.scale.y = 1 - 0.85 * e;
    }

    // Exhaust plume update
    const currentProp =
      flight.activeStageIndex === 0 ? flight.stage1PropKg : flight.stage2PropKg;
    const hasThrust =
      flight.throttle > 0.01 &&
      currentProp > 0 &&
      !flight.targetPhaseStatus.landedOnTarget &&
      flight.status !== 'SUCCESS' &&
      flight.status !== 'FAILED';
    const inVacuum = flight.orbitalElements.altitudeM > EARTH_ATM_TOP_M * 0.7;
    const cmd = hasThrust ? flight.throttle : 0;
    this.shownThrottle += (cmd - this.shownThrottle) * Math.min(1, dt * 2.2);
    const lowAlt = Math.max(0, 1 - flight.orbitalElements.altitudeM / 30_000);
    // Shake scales with camera distance so it reads the same up close and far away.
    const targetShake = hasThrust ? 0.0045 * this.distance * lowAlt * this.shownThrottle : 0;
    this.shake += (targetShake - this.shake) * Math.min(1, dt * 6);
    const plumeUpdater = this.plume.userData.update as
      | ((t: number, vac: boolean, e: number) => void)
      | undefined;
    plumeUpdater?.(this.shownThrottle, inVacuum, elapsed);
    // A big, flickering plume: the reward moment. It swells in thin air, like real exhaust.
    const flicker = 1 + Math.sin(elapsed * 38) * 0.06 + Math.sin(elapsed * 23) * 0.04;
    const plumeSize = (inVacuum ? 1.15 : 0.75 + 0.25 * (1 - lowAlt)) * flicker * (0.35 + 0.65 * this.shownThrottle);
    // Near the pad the flame is short (it hits the flame trench), so it never pokes through the ground.
    const groundClip = Math.min(1, Math.max(0.02, flight.orbitalElements.altitudeM / 380));
    this.plume.scale.set(plumeSize, plumeSize * groundClip, plumeSize);

    // Launch smoke: billows out from the pad for a few seconds after ignition.
    if (hasThrust && flight.orbitalElements.altitudeM < 400 && this.smokeT < 0) this.smokeT = 0;
    if (this.smokeT >= 0) {
      this.smokeT += dt;
      const k = this.smokeT / 7;
      this.smoke.visible = k < 1;
      this.smoke.children.forEach((puff, i) => {
        const m = puff as THREE.Mesh;
        const dir = puff.userData.dir as THREE.Vector3;
        const reach = (1 - Math.exp(-this.smokeT * 0.9)) * (0.3 + (i % 3) * 0.09);
        m.position.set(dir.x * reach, 0.03 + this.smokeT * 0.012 * (1 + (i % 2)), dir.z * reach);
        m.scale.setScalar(0.5 + this.smokeT * 0.35);
        (m.material as THREE.MeshBasicMaterial).opacity = Math.max(0, 0.42 * (1 - k));
      });
    }

    // Separation flash: a quick bright pop and a ring that spreads out, then fades.
    if (this.sepT >= 0) {
      this.sepT += dt;
      const k = Math.min(1, this.sepT / 0.9);
      const [core, ring] = this.sepFlash.children as THREE.Mesh[];
      const sc = this.craftPivot.scale.x;
      core.scale.setScalar(sc * (0.6 + k * 1.6));
      ring.scale.setScalar(sc * (0.5 + k * 3.5));
      (core.material as THREE.MeshBasicMaterial).opacity = 0.9 * (1 - k) * (1 - k);
      (ring.material as THREE.MeshBasicMaterial).opacity = 0.8 * (1 - k);
      if (k >= 1) {
        this.sepFlash.visible = false;
        this.sepT = -1;
      }
    }

    // Spent booster tumbling physics
    for (let i = this.spentBoosters.length - 1; i >= 0; i--) {
      const sb = this.spentBoosters[i];
      sb.age += dt;
      sb.mesh.position.addScaledVector(sb.vel, dt);
      sb.mesh.rotateOnAxis(sb.rotAxis, dt * 1.8);
      if (sb.age > 10) {
        this.root.remove(sb.mesh);
        disposeObject3D(sb.mesh);
        this.spentBoosters.splice(i, 1);
      }
    }

    // Sensor footprint cone during observation / landing
    const showSensor =
      flight.status === 'ORBIT' ||
      flight.status === 'LANDING' ||
      flight.status === 'TARGET_CAPTURE';
    if (showSensor) {
      let targetCenter = new THREE.Vector3(0, 0, 0);
      if (state.missionId === 'MOON_LANDING' && vecLen(vecSub(flight.position, moon.pos)) < MOON_SOI_M) {
        targetCenter = this.moon.position;
      } else if (state.missionId === 'MARS_LANDING' && vecLen(vecSub(flight.position, mars.pos)) < MARS_SOI_M) {
        targetCenter = this.mars.position;
      }
      const toSurface = targetCenter.clone().sub(craftWorldPos);
      const dist = toSurface.length();
      if (dist > 1 && dist < 140) {
        this.sensorCone.visible = true;
        this.sensorCone.position.copy(craftWorldPos);
        this.sensorCone.quaternion.setFromUnitVectors(UP_Y, toSurface.normalize());
        const coneH = Math.min(dist * 0.65, 24);
        this.sensorCone.scale.set(coneH / 6.5, coneH / 6.5, coneH / 6.5);
      } else {
        this.sensorCone.visible = false;
      }
    } else {
      this.sensorCone.visible = false;
    }

    // Active Keplerian orbit trajectory
    const relMoonDist = vecLen(vecSub(flight.position, moon.pos));
    const relMarsDist = vecLen(vecSub(flight.position, mars.pos));
    const isLandingMission = state.missionId === 'MOON_LANDING' || state.missionId === 'MARS_LANDING';
    const isMoon = state.missionId === 'MOON_LANDING';
    const inTargetSOI = (isMoon && relMoonDist < MOON_SOI_M) ||
                        (!isMoon && relMarsDist < MARS_SOI_M);

    if (isMoon && relMoonDist < MOON_SOI_M) {
      this.updateOrbitTrajectory(
        flight.position,
        flight.velocity,
        moon.pos,
        moon.vel,
        MOON_MU,
        MOON_RADIUS_M
      );
    } else if (!isMoon && relMarsDist < MARS_SOI_M) {
      this.updateOrbitTrajectory(
        flight.position,
        flight.velocity,
        mars.pos,
        mars.vel,
        MARS_MU,
        MARS_RADIUS_M
      );
    } else {
      this.updateOrbitTrajectory(
        flight.position,
        flight.velocity,
        { x: 0, y: 0, z: 0 },
        { x: 0, y: 0, z: 0 },
        EARTH_MU,
        EARTH_RADIUS_M
      );
    }

    // Add predicted descent trajectory line during TARGET_CAPTURE and LANDING for landing missions
    if (isLandingMission && inTargetSOI && (flight.status === 'TARGET_CAPTURE' || flight.status === 'LANDING')) {
      this.updateDescentTrajectory(flight, isMoon);
    } else {
      // Hide descent trajectory when not landing
      if (this.descentLine) {
        this.descentLine.geometry.setDrawRange(0, 0);
      }
      if (this.descentTargetMarker) {
        this.descentTargetMarker.visible = false;
      }
    }

    // DSN cones & active green downlink beams
    const isTransmitting =
      flight.activeDsnStationIds.length > 0 &&
      (flight.onboardDataMb > 0.05 || flight.deliveredDataMb > 0);
    this.updateDsnVisuals(
      craftWorldPos,
      flElapsed,
      state.ground.activeStationIds,
      flight.activeDsnStationIds,
      isTransmitting
    );

    // Debrief cinematic slow orbit
    if (state.phase === 'DEBRIEF') {
      this.yaw += dt * 0.25;
    }

    // Chase camera, built in the rocket's LOCAL frame: "up" points away from the
    // nearest planet, so the rocket stands upright on screen and the ground stays below.
    const bodies = [
      { c: new THREE.Vector3(0, 0, 0), r: EARTH_RADIUS_M * WORLD_SCALE },
      { c: this.moon.position, r: MOON_RADIUS_M * WORLD_SCALE },
      { c: this.mars.position, r: MARS_RADIUS_M * WORLD_SCALE },
    ];
    let body = bodies[0];
    let bestGap = Infinity;
    for (const b of bodies) {
      const gap = craftWorldPos.distanceTo(b.c) - b.r;
      if (gap < bestGap) {
        bestGap = gap;
        body = b;
      }
    }
    const localUp = craftWorldPos.clone().sub(body.c).normalize();
    this.camUp.lerp(localUp, 1 - Math.exp(-dt * 3)).normalize();
    let east = new THREE.Vector3().crossVectors(UP_Y, this.camUp);
    if (east.lengthSq() < 1e-6) east = new THREE.Vector3(1, 0, 0);
    east.normalize();
    const north = new THREE.Vector3().crossVectors(this.camUp, east).normalize();
    // Launch cinematic: a low angle beside the pad looking up, with a slow drift, so you
    // see the rocket lift off the pad against the sky. It eases back to normal by 6 km.
    const altM = Math.max(0, flight.orbitalElements.altitudeM);
    const launchBlend = this.userZoomed ? 0 : Math.max(0, 1 - altM / 6000);
    const ease = launchBlend * launchBlend * (3 - 2 * launchBlend);
    const pitch = Math.max(0.035, Math.max(0.12, this.pitch) * (1 - ease) + 0.035 * ease);
    if (ease > 0) this.yaw += dt * 0.05 * ease;
    const horiz = Math.cos(pitch) * this.distance;
    const camPos = craftWorldPos
      .clone()
      .addScaledVector(this.camUp, Math.sin(pitch) * this.distance)
      .addScaledVector(east, Math.cos(this.yaw) * horiz)
      .addScaledVector(north, Math.sin(this.yaw) * horiz);
    // Never let the camera sink inside a planet.
    for (const b of bodies) {
      const fromC = camPos.clone().sub(b.c);
      const minR = b.r + 0.03; // just above the ground (about 300 m in game scale)
      if (fromC.length() < minR) camPos.copy(b.c).addScaledVector(fromC.normalize(), minR);
    }
    // Engine rumble shakes the camera a little at liftoff, fading with altitude.
    if (this.shake > 0.001) {
      camPos.x += (Math.random() - 0.5) * this.shake;
      camPos.y += (Math.random() - 0.5) * this.shake;
      camPos.z += (Math.random() - 0.5) * this.shake;
    }
    // Beginner: the highest/lowest-point markers are unlabeled balls that confuse new players.
    if (state.difficulty === 'BEGINNER') {
      this.apMarker.visible = false;
      this.peMarker.visible = false;
    }
    this.camera.position.copy(camPos);
    this.camera.up.copy(this.camUp);
    this.camera.lookAt(craftWorldPos);
  }

  onOrbitDelta(dx: number, dy: number): void {
    this.yaw += dx * 0.007;
    this.pitch = Math.max(0.12, Math.min(1.35, this.pitch + dy * 0.006));
  }

  onZoomDelta(deltaY: number): void {
    this.userZoomed = true;
    this.distance = Math.max(4.5, Math.min(420, this.distance * (1 + deltaY * 0.001)));
  }

  dispose(): void {
    // Clean up spent boosters
    for (const sb of this.spentBoosters) {
      this.root.remove(sb.mesh);
      disposeObject3D(sb.mesh);
    }
    this.spentBoosters = [];

    // Clean up DSN pool visuals
    for (const vis of this.dsnPool.values()) {
      this.dsnConesGroup.remove(vis.dot);
      this.dsnConesGroup.remove(vis.cone);
      this.downlinkLinesGroup.remove(vis.beam);
      disposeObject3D(vis.dot);
      disposeObject3D(vis.cone);
      disposeObject3D(vis.beam);
      vis.dotMat.dispose();
      vis.coneMat.dispose();
      vis.beam.geometry.dispose();
      const beamMat = vis.beam.material;
      if (Array.isArray(beamMat)) {
        beamMat.forEach((m) => m.dispose());
      } else {
        beamMat.dispose();
      }
    }
    this.dsnPool.clear();

    // Clean up craft visual if not already disposed via root
    if (this.craftVisual) {
      this.craftPivot.remove(this.craftVisual);
      disposeObject3D(this.craftVisual);
      this.craftVisual = null;
    }

    // Clean up orbit line
    this.root.remove(this.orbitLine);
    this.orbitLine.geometry.dispose();
    const orbitMat = this.orbitLine.material;
    if (Array.isArray(orbitMat)) {
      orbitMat.forEach((m) => m.dispose());
    } else {
      orbitMat.dispose();
    }

    // Clean up AP/PE markers
    this.root.remove(this.apMarker);
    this.root.remove(this.peMarker);
    this.apMarker.geometry.dispose();
    this.peMarker.geometry.dispose();
    (this.apMarker.material as THREE.Material).dispose();
    (this.peMarker.material as THREE.Material).dispose();

    // Clean up sensor cone
    this.root.remove(this.sensorCone);
    this.sensorCone.geometry.dispose();
    (this.sensorCone.material as THREE.Material).dispose();

    // Clean up plume (has its own meshes with materials)
    if (this.plume) {
      this.craftPivot.remove(this.plume);
      disposeObject3D(this.plume);
    }

    // Clean up descent trajectory line and target marker
    if (this.descentLine) {
      this.root.remove(this.descentLine);
      this.descentLine.geometry.dispose();
      const descentMat = this.descentLine.material;
      if (Array.isArray(descentMat)) {
        descentMat.forEach((m) => m.dispose());
      } else {
        descentMat.dispose();
      }
    }
    if (this.descentTargetMarker) {
      this.root.remove(this.descentTargetMarker);
      this.descentTargetMarker.geometry.dispose();
      (this.descentTargetMarker.material as THREE.Material).dispose();
    }

    // Clean up DSN groups
    this.root.remove(this.dsnConesGroup);
    this.root.remove(this.downlinkLinesGroup);
    disposeObject3D(this.dsnConesGroup);
    disposeObject3D(this.downlinkLinesGroup);

    // Finally remove and dispose root (planets, shadows, pad tower, starfield, etc.)
    this.scene.remove(this.root);
    disposeObject3D(this.root);
  }
}
