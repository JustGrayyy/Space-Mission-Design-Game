import * as THREE from 'three';
import {
  EARTH_ATM_TOP_M,
  EARTH_MU,
  EARTH_RADIUS_M,
  EARTH_ROT_RATE,
  GROUND_STATIONS,
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
} from '../../core/physicsEngine';
import type { SubsystemCategory, Vec3 } from '../../core/types';
import { useMissionStore } from '../../store/useMissionStore';
import {
  createConeBeam,
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

export class FlightScene implements SceneController {
  private scene!: THREE.Scene;
  private camera!: THREE.PerspectiveCamera;
  private root = new THREE.Group();

  private earth!: THREE.Group;
  private moon!: THREE.Group;
  private mars!: THREE.Group;
  private padTower!: THREE.Group;

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
    this.camera.near = 0.25;
    this.camera.far = 6500;
    this.camera.updateProjectionMatrix();

    this.scene.add(this.root);

    // Lighting matching SUN_DIRECTION (+X)
    const ambient = new THREE.AmbientLight('#435e86', 0.72);
    const sun = new THREE.DirectionalLight('#fff8ea', 2.6);
    sun.position.set(SUN_DIRECTION.x * 1200, 140, 200);
    const fill = new THREE.DirectionalLight('#38bdf8', 0.45);
    fill.position.set(-400, -100, -200);
    this.root.add(ambient, sun, fill);

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

    // Launchpad tower at (EARTH_RADIUS_M, 0, 0) pointing radially +X
    this.padTower = this.createLaunchpadTower();
    this.padTower.position.set(EARTH_RADIUS_M * WORLD_SCALE, 0, 0);
    this.padTower.quaternion.setFromUnitVectors(UP_Y, new THREE.Vector3(1, 0, 0));
    this.root.add(this.padTower);

    // Spacecraft Pivot + Exhaust Plume + Sensor Cone
    this.plume = createExhaustPlume();
    this.plume.visible = false;
    this.craftPivot.add(this.plume);

    this.sensorCone = createConeBeam(6.5, 2.2, 0x34d399, 0.22);
    this.sensorCone.visible = false;
    this.root.add(this.sensorCone);

    this.root.add(this.craftPivot);

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
    this.root.add(this.orbitLine);

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

  private createLaunchpadTower(): THREE.Group {
    const grp = new THREE.Group();
    const steelMat = new THREE.MeshStandardMaterial({
      color: '#475569',
      metalness: 0.7,
      roughness: 0.4,
    });
    const padBase = new THREE.Mesh(new THREE.CylinderGeometry(1.4, 1.8, 0.35, 16), steelMat);
    padBase.position.y = 0.15;
    const mast = new THREE.Mesh(new THREE.BoxGeometry(0.42, 3.8, 0.42), steelMat);
    mast.position.set(-0.95, 1.9, -0.6);
    const arm = new THREE.Mesh(
      new THREE.BoxGeometry(1.1, 0.12, 0.16),
      new THREE.MeshStandardMaterial({ color: '#f59e0b' })
    );
    arm.position.set(-0.4, 3.1, -0.3);
    grp.add(padBase, mast, arm);
    return grp;
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
    booster.scale.setScalar(0.32);
    booster.position.copy(craftWorldPos);
    booster.quaternion.setFromUnitVectors(UP_Y, headingVec);
    this.root.add(booster);

    const sepVel = headingVec.clone().multiplyScalar(-1.6).add(new THREE.Vector3(0, -0.5, 0.4));
    this.spentBoosters.push({
      mesh: booster,
      vel: sepVel,
      rotAxis: new THREE.Vector3(0.7, 0.2, 0.6).normalize(),
      age: 0,
    });
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

    // Visual scale keeps craft clearly visible even when camera zoomed out
    const visualScale = Math.max(0.45, Math.min(3.4, this.distance * 0.036));
    this.craftPivot.scale.setScalar(visualScale);

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
    const plumeUpdater = this.plume.userData.update as
      | ((t: number, vac: boolean, e: number) => void)
      | undefined;
    plumeUpdater?.(hasThrust ? flight.throttle : 0, inVacuum, elapsed);

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
    if (state.missionId === 'MOON_LANDING' && relMoonDist < MOON_SOI_M) {
      this.updateOrbitTrajectory(
        flight.position,
        flight.velocity,
        moon.pos,
        moon.vel,
        MOON_MU,
        MOON_RADIUS_M
      );
    } else if (state.missionId === 'MARS_LANDING' && relMarsDist < MARS_SOI_M) {
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

    // Chase camera around spacecraft
    const horiz = Math.cos(this.pitch) * this.distance;
    const camOffset = new THREE.Vector3(
      Math.cos(this.yaw) * horiz,
      Math.sin(this.pitch) * this.distance,
      Math.sin(this.yaw) * horiz
    );
    this.camera.position.copy(craftWorldPos).add(camOffset);
    this.camera.lookAt(craftWorldPos);
  }

  onOrbitDelta(dx: number, dy: number): void {
    this.yaw += dx * 0.007;
    this.pitch = Math.max(-1.2, Math.min(1.2, this.pitch + dy * 0.006));
  }

  onZoomDelta(deltaY: number): void {
    this.distance = Math.max(4.5, Math.min(420, this.distance * (1 + deltaY * 0.001)));
  }

  dispose(): void {
    this.scene.remove(this.root);
    disposeObject3D(this.root);
  }
}
