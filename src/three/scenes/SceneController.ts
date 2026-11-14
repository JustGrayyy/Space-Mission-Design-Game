import * as THREE from 'three';

export interface SceneController {
  mount(scene: THREE.Scene, camera: THREE.PerspectiveCamera): void;
  update(dt: number, elapsed: number): void;
  onPointerMove?(ndc: THREE.Vector2, raycaster: THREE.Raycaster): void;
  onPointerDown?(ndc: THREE.Vector2, raycaster: THREE.Raycaster): void;
  onPointerUp?(): void;
  onOrbitDelta?(dx: number, dy: number): void;
  onZoomDelta?(deltaY: number): void;
  onDropPart?(category: string, partId: string): void;
  dispose(): void;
}
