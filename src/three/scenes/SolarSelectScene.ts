import * as THREE from 'three';
import { useMissionStore } from '../../store/useMissionStore';
import {
  createOrbitLine,
  createPlanetMesh,
  createStarfield,
  disposeObject3D,
} from '../meshes/ProceduralAssets';
import type { SceneController } from './SceneController';

export class SolarSelectScene implements SceneController {
  private scene!: THREE.Scene;
  private camera!: THREE.PerspectiveCamera;
  private root = new THREE.Group();
  private earth!: THREE.Group;
  private moon!: THREE.Group;
  private mars!: THREE.Group;

  private moonBeacon!: THREE.Mesh;
  private marsBeacon!: THREE.Mesh;
  private exploreRing!: THREE.Mesh;
  private eoProbeGroup = new THREE.Group();
  private telescopeProbeGroup = new THREE.Group();
  private reticleRing!: THREE.Mesh;

  private targetLookAt = new THREE.Vector3(0, 0, 0);
  private currentLookAt = new THREE.Vector3(0, 0, 0);
  private targetCamPos = new THREE.Vector3(18, 12, 34);
  private orbitYawOffset = 0;
  private orbitPitchOffset = 0.28;
  private hoveredTarget: string | null = null;

  private readonly moonPos = new THREE.Vector3(34, 2, -16);
  private readonly marsPos = new THREE.Vector3(64, -3, 22);
  private readonly eoBeaconPos = new THREE.Vector3(11.5, 1.5, 4);
  private readonly teleBeaconPos = new THREE.Vector3(-15.5, 4.2, 8);

  mount(scene: THREE.Scene, camera: THREE.PerspectiveCamera): void {
    this.scene = scene;
    this.camera = camera;
    this.camera.near = 0.2;
    this.camera.far = 4500;
    this.camera.updateProjectionMatrix();

    this.scene.add(this.root);

    // Lighting
    const ambient = new THREE.AmbientLight('#4d6b94', 0.85);
    const sun = new THREE.DirectionalLight('#fff5e4', 2.4);
    sun.position.set(120, 40, 60);
    const rim = new THREE.DirectionalLight('#38bdf8', 0.7);
    rim.position.set(-80, -30, -50);
    this.root.add(ambient, sun, rim);

    // Starfield
    this.root.add(createStarfield(1500, 2200));

    // Planets
    this.earth = createPlanetMesh('EARTH', 8.5);
    this.root.add(this.earth);

    this.moon = createPlanetMesh('MOON', 2.4);
    this.moon.position.copy(this.moonPos);
    this.root.add(this.moon);

    this.mars = createPlanetMesh('MARS', 4.1);
    this.mars.position.copy(this.marsPos);
    this.root.add(this.mars);

    // Orbital reference rings
    const makeRing = (radius: number, color: number, opacity: number) => {
      const pts: THREE.Vector3[] = [];
      for (let i = 0; i <= 96; i++) {
        const a = (i / 96) * Math.PI * 2;
        pts.push(new THREE.Vector3(Math.cos(a) * radius, 0, Math.sin(a) * radius));
      }
      return createOrbitLine(pts, color, opacity);
    };

    this.root.add(makeRing(this.moonPos.length(), 0x64748b, 0.35));
    this.root.add(makeRing(this.marsPos.length(), 0x9a3412, 0.3));

    // Clickable Explore Space Orbit Ring around Earth
    const exploreRingGeom = new THREE.TorusGeometry(12.2, 0.28, 12, 72);
    const exploreRingMat = new THREE.MeshBasicMaterial({
      color: '#22d3ee',
      transparent: true,
      opacity: 0.78,
    });
    this.exploreRing = new THREE.Mesh(exploreRingGeom, exploreRingMat);
    this.exploreRing.rotation.x = Math.PI / 2 - 0.14;
    this.exploreRing.userData.objectiveTarget = 'EXPLORE_SPACE';
    this.root.add(this.exploreRing);

    // Moon clickable halo beacon
    this.moonBeacon = new THREE.Mesh(
      new THREE.SphereGeometry(3.5, 20, 20),
      new THREE.MeshBasicMaterial({
        color: '#94a3b8',
        transparent: true,
        opacity: 0.18,
        wireframe: true,
      })
    );
    this.moonBeacon.position.copy(this.moonPos);
    this.moonBeacon.userData.objectiveTarget = 'MOON_LANDING';
    this.root.add(this.moonBeacon);

    // Mars clickable halo beacon
    this.marsBeacon = new THREE.Mesh(
      new THREE.SphereGeometry(5.3, 20, 20),
      new THREE.MeshBasicMaterial({
        color: '#fb923c',
        transparent: true,
        opacity: 0.22,
        wireframe: true,
      })
    );
    this.marsBeacon.position.copy(this.marsPos);
    this.marsBeacon.userData.objectiveTarget = 'MARS_LANDING';
    this.root.add(this.marsBeacon);

    // Explore Space sub-choice beacons (Earth Observation & Space Telescope)
    const buildProbeBeacon = (
      color: string,
      target: 'EARTH_OBSERVATION' | 'SPACE_TELESCOPE'
    ) => {
      const grp = new THREE.Group();
      const core = new THREE.Mesh(
        new THREE.OctahedronGeometry(0.95, 0),
        new THREE.MeshStandardMaterial({
          color,
          emissive: color,
          emissiveIntensity: 0.6,
          metalness: 0.5,
          roughness: 0.3,
        })
      );
      core.userData.subMissionTarget = target;
      const halo = new THREE.Mesh(
        new THREE.RingGeometry(1.3, 1.65, 28),
        new THREE.MeshBasicMaterial({
          color,
          side: THREE.DoubleSide,
          transparent: true,
          opacity: 0.85,
        })
      );
      halo.userData.subMissionTarget = target;
      const hit = new THREE.Mesh(
        new THREE.SphereGeometry(2.1, 12, 12),
        new THREE.MeshBasicMaterial({ transparent: true, opacity: 0, depthWrite: false })
      );
      hit.userData.subMissionTarget = target;
      grp.add(core, halo, hit);
      return grp;
    };

    this.eoProbeGroup = buildProbeBeacon('#34d399', 'EARTH_OBSERVATION');
    this.eoProbeGroup.position.copy(this.eoBeaconPos);
    this.root.add(this.eoProbeGroup);

    this.telescopeProbeGroup = buildProbeBeacon('#c084fc', 'SPACE_TELESCOPE');
    this.telescopeProbeGroup.position.copy(this.teleBeaconPos);
    this.root.add(this.telescopeProbeGroup);

    // Hover reticle ring
    this.reticleRing = new THREE.Mesh(
      new THREE.RingGeometry(4.2, 4.6, 36),
      new THREE.MeshBasicMaterial({
        color: '#22d3ee',
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.9,
      })
    );
    this.reticleRing.visible = false;
    this.root.add(this.reticleRing);

    this.camera.position.set(16, 10, 30);
    this.camera.lookAt(this.currentLookAt);
  }

  update(dt: number, elapsed: number): void {
    const state = useMissionStore.getState();

    this.earth.rotation.y += dt * 0.08;
    this.moon.rotation.y += dt * 0.05;
    this.mars.rotation.y += dt * 0.07;

    const showBeacons = state.phase === 'OBJECTIVE_SELECT';
    this.exploreRing.visible = showBeacons;
    this.moonBeacon.visible = showBeacons;
    this.marsBeacon.visible = showBeacons;

    // The floating green/purple probe icons had no label, so players could not tell
    // what they were. Missions are picked from the panel instead.
    const showSubBeacons = false;
    this.eoProbeGroup.visible = showSubBeacons;
    this.telescopeProbeGroup.visible = showSubBeacons;

    if (showSubBeacons) {
      this.eoProbeGroup.rotation.y = elapsed * 1.4;
      this.telescopeProbeGroup.rotation.y = -elapsed * 1.1;
    }

    if (state.phase === 'TITLE') {
      const a = elapsed * 0.14 + this.orbitYawOffset;
      this.targetLookAt.set(0, 0, 0);
      this.targetCamPos.set(
        Math.cos(a) * 26,
        7.5 + Math.sin(elapsed * 0.25) * 2.0,
        Math.sin(a) * 26
      );
    } else {
      // OBJECTIVE_SELECT focus camera
      if (state.selectedObjective === 'MOON_LANDING') {
        this.targetLookAt.copy(this.moonPos);
        this.targetCamPos
          .copy(this.moonPos)
          .add(
            new THREE.Vector3(
              Math.cos(this.orbitYawOffset) * 14,
              6 + this.orbitPitchOffset * 8,
              Math.sin(this.orbitYawOffset) * 14
            )
          );
      } else if (state.selectedObjective === 'MARS_LANDING') {
        this.targetLookAt.copy(this.marsPos);
        this.targetCamPos
          .copy(this.marsPos)
          .add(
            new THREE.Vector3(
              Math.cos(this.orbitYawOffset) * 18,
              7 + this.orbitPitchOffset * 9,
              Math.sin(this.orbitYawOffset) * 18
            )
          );
      } else if (state.selectedObjective === 'EXPLORE_SPACE') {
        this.targetLookAt.set(0, 1, 0);
        const r = 28;
        this.targetCamPos.set(
          Math.cos(this.orbitYawOffset + 0.4) * r,
          12 + this.orbitPitchOffset * 10,
          Math.sin(this.orbitYawOffset + 0.4) * r
        );
      } else {
        // Overview of Earth, Moon & Mars
        this.targetLookAt.set(22, 0, 2);
        this.targetCamPos.set(
          22 + Math.sin(this.orbitYawOffset) * 32,
          26 + this.orbitPitchOffset * 14,
          68
        );
      }
    }

    const lerpAmt = 1 - Math.exp(-dt * 4.2);
    this.currentLookAt.lerp(this.targetLookAt, lerpAmt);
    this.camera.position.lerp(this.targetCamPos, lerpAmt);
    this.camera.lookAt(this.currentLookAt);

    if (this.reticleRing.visible) {
      this.reticleRing.lookAt(this.camera.position);
      this.reticleRing.rotation.z = elapsed * 1.2;
    }
  }

  onOrbitDelta(dx: number, dy: number): void {
    this.orbitYawOffset += dx * 0.006;
    this.orbitPitchOffset = Math.max(-0.5, Math.min(0.8, this.orbitPitchOffset + dy * 0.004));
  }

  onPointerMove(ndc: THREE.Vector2, raycaster: THREE.Raycaster): void {
    const state = useMissionStore.getState();
    if (state.phase !== 'OBJECTIVE_SELECT') {
      this.reticleRing.visible = false;
      return;
    }

    raycaster.setFromCamera(ndc, this.camera);
    const targets: THREE.Object3D[] = [
      this.moonBeacon,
      this.marsBeacon,
      this.exploreRing,
    ];

    const hits = raycaster.intersectObjects(targets, true);
    if (hits.length > 0) {
      const hitObj = hits[0].object;
      const sub = hitObj.userData.subMissionTarget as string | undefined;
      const obj = hitObj.userData.objectiveTarget as string | undefined;
      this.hoveredTarget = sub ?? obj ?? null;

      this.reticleRing.visible = true;
      if (sub === 'EARTH_OBSERVATION') {
        this.reticleRing.position.copy(this.eoBeaconPos);
        this.reticleRing.scale.setScalar(0.6);
      } else if (sub === 'SPACE_TELESCOPE') {
        this.reticleRing.position.copy(this.teleBeaconPos);
        this.reticleRing.scale.setScalar(0.6);
      } else if (obj === 'MOON_LANDING') {
        this.reticleRing.position.copy(this.moonPos);
        this.reticleRing.scale.setScalar(1.0);
      } else if (obj === 'MARS_LANDING') {
        this.reticleRing.position.copy(this.marsPos);
        this.reticleRing.scale.setScalar(1.45);
      } else {
        this.reticleRing.position.set(0, 0, 0);
        this.reticleRing.scale.setScalar(2.6);
      }
      document.body.style.cursor = 'pointer';
    } else {
      this.hoveredTarget = null;
      this.reticleRing.visible = false;
      document.body.style.cursor = 'grab';
    }
  }

  onPointerDown(ndc: THREE.Vector2, raycaster: THREE.Raycaster): void {
    const state = useMissionStore.getState();
    if (state.phase !== 'OBJECTIVE_SELECT') return;

    raycaster.setFromCamera(ndc, this.camera);
    const targets: THREE.Object3D[] = [
      this.moonBeacon,
      this.marsBeacon,
      this.exploreRing,
    ];
    const hits = raycaster.intersectObjects(targets, true);
    if (hits.length === 0) return;

    const hitObj = hits[0].object;
    const sub = hitObj.userData.subMissionTarget as
      | 'EARTH_OBSERVATION'
      | 'SPACE_TELESCOPE'
      | undefined;
    if (sub) {
      state.selectExploreSubMission(sub);
      return;
    }

    const obj = hitObj.userData.objectiveTarget as
      | 'MOON_LANDING'
      | 'MARS_LANDING'
      | 'EXPLORE_SPACE'
      | undefined;
    if (obj) {
      state.selectTopObjective(obj);
    }
  }

  dispose(): void {
    document.body.style.cursor = 'default';
    this.scene.remove(this.root);
    disposeObject3D(this.root);
    void this.hoveredTarget;
  }
}
