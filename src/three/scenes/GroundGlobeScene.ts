import * as THREE from 'three';
import { GROUND_STATIONS, MISSIONS } from '../../core/constants';
import { useMissionStore } from '../../store/useMissionStore';
import {
  createConeBeam,
  createOrbitLine,
  createPlanetMesh,
  createStarfield,
  disposeObject3D,
} from '../meshes/ProceduralAssets';
import type { SceneController } from './SceneController';

const EARTH_R = 10;

interface StationVisual {
  id: string;
  anchor: THREE.Group;
  markerMat: THREE.MeshStandardMaterial;
  cone: THREE.Mesh;
  isRelay: boolean;
}

export class GroundGlobeScene implements SceneController {
  private scene!: THREE.Scene;
  private camera!: THREE.PerspectiveCamera;
  private root = new THREE.Group();
  private earthGroup!: THREE.Group;
  private stationGroup = new THREE.Group();
  private stationVisuals: StationVisual[] = [];
  private targetOrbitRing: THREE.Line | null = null;
  private lastMissionId = '';

  private yaw = 0.5;
  private pitch = 0.35;
  private distance = 28;
  private rotAngle = 0;

  mount(scene: THREE.Scene, camera: THREE.PerspectiveCamera): void {
    this.scene = scene;
    this.camera = camera;
    this.camera.near = 0.2;
    this.camera.far = 3000;
    this.camera.updateProjectionMatrix();

    this.scene.add(this.root);

    const ambient = new THREE.AmbientLight('#5b7aa8', 0.95);
    const sun = new THREE.DirectionalLight('#fff8eb', 2.3);
    sun.position.set(80, 20, 40);
    const rim = new THREE.DirectionalLight('#22d3ee', 0.65);
    rim.position.set(-50, -25, -40);
    this.root.add(ambient, sun, rim);

    this.root.add(createStarfield(1400, 1800));

    this.earthGroup = createPlanetMesh('EARTH', EARTH_R);
    this.root.add(this.earthGroup);
    this.root.add(this.stationGroup);

    this.buildStationMarkers();
    this.rebuildTargetOrbitRing();
    this.updateCamera();
  }

  private buildStationMarkers(): void {
    const upY = new THREE.Vector3(0, 1, 0);

    for (const st of GROUND_STATIONS) {
      const anchor = new THREE.Group();
      anchor.userData.stationId = st.id;

      const latRad = (st.latDeg * Math.PI) / 180;
      const lonRad = (st.lonDeg * Math.PI) / 180;
      const r = st.isOrbitalRelay ? EARTH_R * 2.05 : EARTH_R;

      const pos = new THREE.Vector3(
        r * Math.cos(latRad) * Math.cos(lonRad),
        r * Math.sin(latRad),
        r * Math.cos(latRad) * Math.sin(lonRad)
      );
      anchor.position.copy(pos);

      const normal = pos.clone().normalize();
      if (st.isOrbitalRelay) {
        // Point relay cone inward toward Earth / cis-lunar corridor
        anchor.quaternion.setFromUnitVectors(upY, normal.clone().negate());
      } else {
        anchor.quaternion.setFromUnitVectors(upY, normal);
      }

      const markerMat = new THREE.MeshStandardMaterial({
        color: '#34d399',
        emissive: '#10b981',
        emissiveIntensity: 0.7,
        roughness: 0.3,
      });

      const dish = new THREE.Mesh(
        st.isOrbitalRelay
          ? new THREE.OctahedronGeometry(0.65, 0)
          : new THREE.CylinderGeometry(0.45, 0.25, 0.45, 12),
        markerMat
      );
      dish.position.y = st.isOrbitalRelay ? 0 : 0.22;
      dish.userData.stationId = st.id;
      anchor.add(dish);

      // Generous invisible hit sphere for easy 3D clicking
      const hit = new THREE.Mesh(
        new THREE.SphereGeometry(1.35, 10, 10),
        new THREE.MeshBasicMaterial({ transparent: true, opacity: 0, depthWrite: false })
      );
      hit.userData.stationId = st.id;
      anchor.add(hit);

      const cone = createConeBeam(
        st.isOrbitalRelay ? 14 : 11,
        st.isOrbitalRelay ? 4.8 : 5.6,
        0x22d3ee,
        0.16
      );
      cone.userData.stationId = st.id;
      anchor.add(cone);

      this.stationGroup.add(anchor);
      this.stationVisuals.push({
        id: st.id,
        anchor,
        markerMat,
        cone,
        isRelay: Boolean(st.isOrbitalRelay),
      });
    }
  }

  private rebuildTargetOrbitRing(): void {
    const missionId = useMissionStore.getState().missionId;
    if (missionId === this.lastMissionId) return;
    this.lastMissionId = missionId;

    if (this.targetOrbitRing) {
      this.root.remove(this.targetOrbitRing);
      disposeObject3D(this.targetOrbitRing);
    }

    const mission = MISSIONS[missionId];
    const orbitR =
      mission.targetType === 'LEO'
        ? EARTH_R * 1.28
        : mission.targetType === 'DEEP_SPACE_ORBIT'
          ? EARTH_R * 1.95
          : EARTH_R * 2.55;

    const pts: THREE.Vector3[] = [];
    for (let i = 0; i <= 96; i++) {
      const a = (i / 96) * Math.PI * 2;
      pts.push(new THREE.Vector3(Math.cos(a) * orbitR, 0, Math.sin(a) * orbitR));
    }
    this.targetOrbitRing = createOrbitLine(pts, 0x38bdf8, 0.72);
    this.root.add(this.targetOrbitRing);
  }

  private updateCamera(): void {
    const horiz = Math.cos(this.pitch) * this.distance;
    this.camera.position.set(
      Math.cos(this.yaw) * horiz,
      Math.sin(this.pitch) * this.distance,
      Math.sin(this.yaw) * horiz
    );
    this.camera.lookAt(0, 0, 0);
  }

  update(dt: number, elapsed: number): void {
    this.rebuildTargetOrbitRing();

    this.rotAngle += dt * 0.12;
    this.earthGroup.rotation.y = -this.rotAngle;
    this.stationGroup.rotation.y = -this.rotAngle;

    const activeIds = new Set(useMissionStore.getState().ground.activeStationIds);

    for (const sv of this.stationVisuals) {
      const active = activeIds.has(sv.id);
      sv.cone.visible = active;
      sv.markerMat.color.set(active ? '#34d399' : '#64748b');
      sv.markerMat.emissive.set(active ? '#10b981' : '#1e293b');
      sv.markerMat.emissiveIntensity = active ? 0.8 + Math.sin(elapsed * 4) * 0.2 : 0.2;

      if (sv.isRelay) {
        const a = elapsed * 0.55;
        sv.anchor.position.set(
          Math.cos(a) * EARTH_R * 2.05,
          Math.sin(a * 0.7) * 2.2,
          Math.sin(a) * EARTH_R * 2.05
        );
        const normal = sv.anchor.position.clone().normalize().negate();
        sv.anchor.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), normal);
      }
    }

    this.updateCamera();
  }

  onOrbitDelta(dx: number, dy: number): void {
    this.yaw += dx * 0.007;
    this.pitch = Math.max(-1.1, Math.min(1.1, this.pitch + dy * 0.006));
  }

  onZoomDelta(deltaY: number): void {
    this.distance = Math.max(16, Math.min(48, this.distance + deltaY * 0.02));
  }

  onPointerMove(ndc: THREE.Vector2, raycaster: THREE.Raycaster): void {
    raycaster.setFromCamera(ndc, this.camera);
    const hits = raycaster.intersectObjects(this.stationGroup.children, true);
    const hit = hits.find((h) => Boolean(h.object.userData.stationId));
    document.body.style.cursor = hit ? 'pointer' : 'grab';
  }

  onPointerDown(ndc: THREE.Vector2, raycaster: THREE.Raycaster): void {
    raycaster.setFromCamera(ndc, this.camera);
    const hits = raycaster.intersectObjects(this.stationGroup.children, true);
    for (const h of hits) {
      const id = h.object.userData.stationId as string | undefined;
      if (id) {
        useMissionStore.getState().toggleStation(id);
        return;
      }
    }
  }

  dispose(): void {
    document.body.style.cursor = 'default';
    this.scene.remove(this.root);
    disposeObject3D(this.root);
  }
}
