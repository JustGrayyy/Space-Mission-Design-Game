import * as THREE from 'three';
import { LAUNCH_SITES } from '../../core/constants';
import { getSurfacePosition } from '../../core/physicsEngine';
import { useMissionStore } from '../../store/useMissionStore';
import {
  createPlanetMesh,
  createRocketStackGroup,
  createStarfield,
  disposeObject3D,
} from '../meshes/ProceduralAssets';
import type { SceneController } from './SceneController';

const EARTH_R = 10;
const UP_Y = new THREE.Vector3(0, 1, 0);

interface LaunchSiteVisual {
  id: string;
  anchor: THREE.Group;
  marker: THREE.Mesh;
  markerMat: THREE.MeshStandardMaterial;
}

export class LaunchSiteScene implements SceneController {
  private scene!: THREE.Scene;
  private camera!: THREE.PerspectiveCamera;
  private root = new THREE.Group();
  private siteGroup = new THREE.Group();
  private siteVisuals: LaunchSiteVisual[] = [];
  private previewRocket: THREE.Group | null = null;
  private previewRocketSiteId: string | null = null;
  private yaw = 0.35;
  private pitch = 0.42;
  private distance = 29;

  mount(scene: THREE.Scene, camera: THREE.PerspectiveCamera): void {
    this.scene = scene;
    this.camera = camera;
    this.camera.near = 0.2;
    this.camera.far = 3000;
    this.camera.updateProjectionMatrix();

    const ambient = new THREE.AmbientLight('#5b7aa8', 0.95);
    const sun = new THREE.DirectionalLight('#fff8eb', 2.3);
    sun.position.set(80, 20, 40);
    const rim = new THREE.DirectionalLight('#22d3ee', 0.65);
    rim.position.set(-50, -25, -40);
    this.root.add(ambient, sun, rim, createStarfield(1400, 1800));
    this.root.add(createPlanetMesh('EARTH', EARTH_R), this.siteGroup);
    this.buildSiteMarkers();
    this.scene.add(this.root);
    this.updateCamera();
  }

  private buildSiteMarkers(): void {
    for (const site of LAUNCH_SITES) {
      const anchor = new THREE.Group();
      const pos = getSurfacePosition(site.latDeg, site.lonDeg, EARTH_R * 1.02);
      anchor.position.set(pos.x, pos.y, pos.z);
      anchor.quaternion.setFromUnitVectors(UP_Y, anchor.position.clone().normalize());
      anchor.userData.launchSiteId = site.id;

      const markerMat = new THREE.MeshStandardMaterial({
        color: '#64748b',
        emissive: '#1e293b',
        emissiveIntensity: 0.35,
        roughness: 0.3,
      });
      const marker = new THREE.Mesh(new THREE.CylinderGeometry(0.25, 0.42, 0.7, 12), markerMat);
      marker.position.y = 0.35;
      marker.userData.launchSiteId = site.id;

      const hit = new THREE.Mesh(
        new THREE.SphereGeometry(0.95, 10, 10),
        new THREE.MeshBasicMaterial({ transparent: true, opacity: 0, depthWrite: false })
      );
      hit.position.y = 0.4;
      hit.userData.launchSiteId = site.id;

      anchor.add(marker, hit);
      this.siteGroup.add(anchor);
      this.siteVisuals.push({ id: site.id, anchor, marker, markerMat });
    }
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

  update(_dt: number, _elapsed: number): void {
    const { launchSiteId, spacecraft } = useMissionStore.getState();
    for (const visual of this.siteVisuals) {
      const selected = visual.id === launchSiteId;
      visual.markerMat.color.set(selected ? '#34d399' : '#64748b');
      visual.markerMat.emissive.set(selected ? '#10b981' : '#1e293b');
      visual.markerMat.emissiveIntensity = selected ? 1.0 : 0.3;
    }

    const selected = this.siteVisuals.find((visual) => visual.id === launchSiteId);
    if (selected && this.previewRocketSiteId !== launchSiteId) {
      if (this.previewRocket) {
        this.previewRocket.parent?.remove(this.previewRocket);
        disposeObject3D(this.previewRocket);
      }
      this.previewRocket = createRocketStackGroup(spacecraft, new Set(), { showSnapRings: false });
      this.previewRocket.scale.setScalar(0.16);
      this.previewRocket.position.y = 0.35;
      selected.anchor.add(this.previewRocket);
      this.previewRocketSiteId = launchSiteId;
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
    const hit = raycaster
      .intersectObjects(this.siteGroup.children, true)
      .find((entry) => Boolean(entry.object.userData.launchSiteId));
    document.body.style.cursor = hit ? 'pointer' : 'grab';
  }

  onPointerDown(ndc: THREE.Vector2, raycaster: THREE.Raycaster): void {
    raycaster.setFromCamera(ndc, this.camera);
    for (const hit of raycaster.intersectObjects(this.siteGroup.children, true)) {
      const siteId = hit.object.userData.launchSiteId as string | undefined;
      if (siteId) {
        useMissionStore.getState().selectLaunchSite(siteId);
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
