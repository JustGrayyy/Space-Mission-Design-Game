import * as THREE from 'three';
import { validateSpacecraft } from '../../core/spacecraftValidator';
import type { SubsystemCategory } from '../../core/types';
import { useMissionStore } from '../../store/useMissionStore';
import {
  createRocketStackGroup,
  createVabHangarGroup,
  disposeObject3D,
} from '../meshes/ProceduralAssets';
import type { SceneController } from './SceneController';

export class HangarScene implements SceneController {
  private scene!: THREE.Scene;
  private camera!: THREE.PerspectiveCamera;
  private root = new THREE.Group();
  private stackContainer = new THREE.Group();
  private rocketGroup: THREE.Group | null = null;

  private yaw = 0.65;
  private pitch = 0.22;
  private distance = 15.5;
  private lookAtY = 4.9;

  private lastSignature = '';
  private bounceAmount = 0;

  mount(scene: THREE.Scene, camera: THREE.PerspectiveCamera): void {
    this.scene = scene;
    this.camera = camera;
    this.camera.near = 0.1;
    this.camera.far = 400;
    this.camera.updateProjectionMatrix();

    this.scene.add(this.root);

    // Hangar lighting
    const ambient = new THREE.AmbientLight('#6b8ab8', 0.9);
    const keyLight = new THREE.SpotLight('#fff3db', 160, 60, Math.PI / 4, 0.4, 1.2);
    keyLight.position.set(10, 17, 11);
    const fillLight = new THREE.DirectionalLight('#38bdf8', 1.15);
    fillLight.position.set(-12, 8, -8);
    const floorBounce = new THREE.PointLight('#f59e0b', 18, 22);
    floorBounce.position.set(0, 1.2, 2.5);

    this.root.add(ambient, keyLight, fillLight, floorBounce);
    this.root.add(createVabHangarGroup());
    this.root.add(this.stackContainer);

    this.rebuildRocketIfNeeded();
    this.updateCamera();
  }

  private rebuildRocketIfNeeded(): void {
    const state = useMissionStore.getState();
    const sig = JSON.stringify({
      sc: state.spacecraft,
      m: state.missionId,
      d: state.difficulty,
      ac: state.activeSnapCategory,
      g: state.ground.bandId,
    });

    if (sig === this.lastSignature) return;
    const isInitial = this.lastSignature === '';
    this.lastSignature = sig;

    if (this.rocketGroup) {
      this.stackContainer.remove(this.rocketGroup);
      disposeObject3D(this.rocketGroup);
      this.rocketGroup = null;
    }

    const validation = validateSpacecraft(
      state.missionId,
      state.spacecraft,
      state.difficulty,
      state.ground
    );

    const conflictCats = new Set<SubsystemCategory>();
    for (const c of validation.conflicts) {
      if (c.affectedCategory !== 'ground') {
        conflictCats.add(c.affectedCategory);
      }
    }

    this.rocketGroup = createRocketStackGroup(state.spacecraft, conflictCats, {
      activeCategory: state.activeSnapCategory,
      showSnapRings: true,
    });
    this.stackContainer.add(this.rocketGroup);

    if (!isInitial) {
      this.bounceAmount = 1.0;
    }
  }

  private updateCamera(): void {
    const horiz = Math.cos(this.pitch) * this.distance;
    const camY = this.lookAtY + Math.sin(this.pitch) * this.distance;
    const camX = Math.cos(this.yaw) * horiz;
    const camZ = Math.sin(this.yaw) * horiz;
    this.camera.position.set(camX, Math.max(1.2, camY), camZ);
    this.camera.lookAt(0, this.lookAtY, 0);
  }

  update(dt: number, elapsed: number): void {
    this.rebuildRocketIfNeeded();

    if (this.bounceAmount > 0) {
      this.bounceAmount = Math.max(0, this.bounceAmount - dt * 3.8);
      const scalePulse = 1 + Math.sin(this.bounceAmount * Math.PI) * 0.08;
      this.stackContainer.scale.set(scalePulse, 1 / Math.sqrt(scalePulse), scalePulse);
    } else {
      this.stackContainer.scale.set(1, 1, 1);
    }

    if (this.rocketGroup) {
      this.rocketGroup.rotation.y = Math.sin(elapsed * 0.25) * 0.14;
      // Gently pulse conflict emissive & active snap rings
      const pulse = 0.55 + Math.sin(elapsed * 5.2) * 0.35;
      this.rocketGroup.traverse((obj) => {
        if (obj.name.startsWith('snap-')) {
          const mat = (obj as THREE.Mesh).material as THREE.MeshBasicMaterial;
          if (obj.userData.snapCategory === useMissionStore.getState().activeSnapCategory) {
            mat.opacity = 0.75 + Math.sin(elapsed * 6) * 0.25;
          }
        } else {
          const mat = (obj as THREE.Mesh).material as THREE.MeshStandardMaterial | undefined;
          if (mat && mat.emissive && mat.emissive.r > 0.5) {
            mat.emissiveIntensity = pulse;
          }
        }
      });
    }

    this.updateCamera();
  }

  onOrbitDelta(dx: number, dy: number): void {
    this.yaw += dx * 0.007;
    this.pitch = Math.max(-0.12, Math.min(0.85, this.pitch + dy * 0.005));
  }

  onZoomDelta(deltaY: number): void {
    this.distance = Math.max(7.5, Math.min(26, this.distance + deltaY * 0.01));
  }

  onPointerMove(ndc: THREE.Vector2, raycaster: THREE.Raycaster): void {
    if (!this.rocketGroup) return;
    raycaster.setFromCamera(ndc, this.camera);
    const hits = raycaster.intersectObjects(this.rocketGroup.children, true);
    const found = hits.find((h) => Boolean(h.object.userData.snapCategory || h.object.userData.category));
    document.body.style.cursor = found ? 'pointer' : 'grab';
  }

  onPointerDown(ndc: THREE.Vector2, raycaster: THREE.Raycaster): void {
    if (!this.rocketGroup) return;
    raycaster.setFromCamera(ndc, this.camera);
    const hits = raycaster.intersectObjects(this.rocketGroup.children, true);

    for (const hit of hits) {
      let cur: THREE.Object3D | null = hit.object;
      while (cur) {
        const cat = (cur.userData.snapCategory ?? cur.userData.category) as
          | SubsystemCategory
          | undefined;
        if (cat) {
          useMissionStore.getState().setActiveSnapCategory(cat);
          return;
        }
        cur = cur.parent;
      }
    }
  }

  onDropPart(category: string, partId: string): void {
    const state = useMissionStore.getState();
    const cat = category as SubsystemCategory;
    state.setActiveSnapCategory(cat);
    state.equipPart(cat, partId);
    this.bounceAmount = 1.0;
  }

  dispose(): void {
    document.body.style.cursor = 'default';
    this.scene.remove(this.root);
    disposeObject3D(this.root);
  }
}
