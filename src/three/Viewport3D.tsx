import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import type { GamePhase } from '../core/types';
import { useMissionStore } from '../store/useMissionStore';
import { FlightScene } from './scenes/FlightScene';
import { GroundGlobeScene } from './scenes/GroundGlobeScene';
import { HangarScene } from './scenes/HangarScene';
import { LaunchSiteScene } from './scenes/LaunchSiteScene';
import type { SceneController } from './scenes/SceneController';
import { SolarSelectScene } from './scenes/SolarSelectScene';

type SceneKind = 'SOLAR' | 'HANGAR' | 'LAUNCH_SITE' | 'GROUND' | 'FLIGHT';

function phaseToSceneKind(phase: GamePhase): SceneKind {
  switch (phase) {
    case 'TITLE':
    case 'OBJECTIVE_SELECT':
      return 'SOLAR';
    case 'HANGAR':
      return 'HANGAR';
    case 'LAUNCH_SITE':
      return 'LAUNCH_SITE';
    case 'GROUND_SEGMENT':
      return 'GROUND';
    case 'FLIGHT':
    case 'DEBRIEF':
      return 'FLIGHT';
  }
}

export const Viewport3D: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const phase = useMissionStore((s) => s.phase);

  const controllerRef = useRef<SceneController | null>(null);
  const sceneKindRef = useRef<SceneKind | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);

  // Switch scene controller when scene kind changes
  useEffect(() => {
    const targetKind = phaseToSceneKind(phase);
    if (
      sceneKindRef.current === targetKind ||
      !sceneRef.current ||
      !cameraRef.current
    ) {
      return;
    }

    controllerRef.current?.dispose();
    controllerRef.current = null;

    let nextController: SceneController;
    if (targetKind === 'SOLAR') nextController = new SolarSelectScene();
    else if (targetKind === 'HANGAR') nextController = new HangarScene();
    else if (targetKind === 'LAUNCH_SITE') nextController = new LaunchSiteScene();
    else if (targetKind === 'GROUND') nextController = new GroundGlobeScene();
    else nextController = new FlightScene();

    nextController.mount(sceneRef.current, cameraRef.current);
    controllerRef.current = nextController;
    sceneKindRef.current = targetKind;
  }, [phase]);

  // Initialize Three.js renderer, input listeners, and rAF loop once
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    let renderer: THREE.WebGLRenderer | null = null;
    try {
      renderer = new THREE.WebGLRenderer({
        canvas,
        antialias: true,
        powerPreference: 'high-performance',
      });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
      renderer.setSize(window.innerWidth, window.innerHeight, false);
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1.08;
    } catch {
      return;
    }

    const scene = new THREE.Scene();
    scene.background = new THREE.Color('#02050d');
    const camera = new THREE.PerspectiveCamera(
      48,
      window.innerWidth / Math.max(window.innerHeight, 1),
      0.2,
      4500
    );

    sceneRef.current = scene;
    cameraRef.current = camera;

    // Mount initial scene
    const initialKind = phaseToSceneKind(useMissionStore.getState().phase);
    const initialController =
      initialKind === 'SOLAR'
        ? new SolarSelectScene()
        : initialKind === 'HANGAR'
          ? new HangarScene()
          : initialKind === 'LAUNCH_SITE'
            ? new LaunchSiteScene()
            : initialKind === 'GROUND'
              ? new GroundGlobeScene()
              : new FlightScene();
    initialController.mount(scene, camera);
    controllerRef.current = initialController;
    sceneKindRef.current = initialKind;

    const raycaster = new THREE.Raycaster();
    const ndc = new THREE.Vector2();

    let isDown = false;
    let downX = 0;
    let downY = 0;
    let lastX = 0;
    let lastY = 0;
    let dragged = false;

    const updateNdc = (clientX: number, clientY: number) => {
      const rect = canvas.getBoundingClientRect();
      ndc.x = ((clientX - rect.left) / Math.max(rect.width, 1)) * 2 - 1;
      ndc.y = -((clientY - rect.top) / Math.max(rect.height, 1)) * 2 + 1;
    };

    const handlePointerDown = (e: PointerEvent) => {
      isDown = true;
      dragged = false;
      downX = e.clientX;
      downY = e.clientY;
      lastX = e.clientX;
      lastY = e.clientY;
    };

    const handlePointerMove = (e: PointerEvent) => {
      updateNdc(e.clientX, e.clientY);
      if (isDown) {
        const dx = e.clientX - lastX;
        const dy = e.clientY - lastY;
        lastX = e.clientX;
        lastY = e.clientY;
        if (Math.hypot(e.clientX - downX, e.clientY - downY) > 5) {
          dragged = true;
        }
        if (dragged) {
          controllerRef.current?.onOrbitDelta?.(dx, dy);
        }
      } else {
        controllerRef.current?.onPointerMove?.(ndc, raycaster);
      }
    };

    const handlePointerUp = (e: PointerEvent) => {
      if (!isDown) return;
      isDown = false;
      updateNdc(e.clientX, e.clientY);
      if (!dragged) {
        controllerRef.current?.onPointerDown?.(ndc, raycaster);
      }
      controllerRef.current?.onPointerUp?.();
    };

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      controllerRef.current?.onZoomDelta?.(e.deltaY);
    };

    const handleDragOver = (e: DragEvent) => {
      e.preventDefault();
    };

    const handleDrop = (e: DragEvent) => {
      e.preventDefault();
      const raw = e.dataTransfer?.getData('application/json');
      if (!raw) return;
      try {
        const parsed = JSON.parse(raw) as { category?: string; partId?: string };
        if (parsed.category && parsed.partId) {
          controllerRef.current?.onDropPart?.(parsed.category, parsed.partId);
        }
      } catch {
        // Ignore malformed drops
      }
    };

    const handleResize = () => {
      if (!renderer) return;
      const w = window.innerWidth;
      const h = Math.max(window.innerHeight, 1);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h, false);
    };

    const pressedKeys = new Set<string>();
    const warpKeys: Record<string, number> = {
      Digit1: 1,
      Digit2: 5,
      Digit3: 25,
      Digit4: 100,
      Digit5: 500,
    };

    const syncFlightAxes = () => {
      const st = useMissionStore.getState();
      if (st.phase !== 'FLIGHT') return;
      const pitch =
        (pressedKeys.has('KeyW') || pressedKeys.has('ArrowUp') ? 1 : 0) -
        (pressedKeys.has('KeyS') || pressedKeys.has('ArrowDown') ? 1 : 0);
      const yaw =
        (pressedKeys.has('KeyD') || pressedKeys.has('ArrowRight') ? 1 : 0) -
        (pressedKeys.has('KeyA') || pressedKeys.has('ArrowLeft') ? 1 : 0);
      st.setPitchYaw(pitch, yaw);
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      const st = useMissionStore.getState();
      if (st.phase !== 'FLIGHT') return;

      if (e.code === 'Space') {
        e.preventDefault();
        st.requestStage();
        return;
      }
      if (warpKeys[e.code]) {
        st.setTimeWarp(warpKeys[e.code]);
        return;
      }
      if (e.code === 'KeyZ' || e.code === 'ShiftLeft' || e.code === 'ShiftRight') {
        st.setThrottle(Math.min(1, st.flightControls.throttle + 0.15));
      }
      if (e.code === 'KeyX' || e.code === 'ControlLeft' || e.code === 'ControlRight') {
        st.setThrottle(Math.max(0, st.flightControls.throttle - 0.15));
      }

      pressedKeys.add(e.code);
      syncFlightAxes();
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      pressedKeys.delete(e.code);
      syncFlightAxes();
    };

    canvas.addEventListener('pointerdown', handlePointerDown);
    window.addEventListener('pointermove', handlePointerMove);
    window.addEventListener('pointerup', handlePointerUp);
    canvas.addEventListener('wheel', handleWheel, { passive: false });
    canvas.addEventListener('dragover', handleDragOver);
    canvas.addEventListener('drop', handleDrop);
    window.addEventListener('resize', handleResize);
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    let rafId = 0;
    let prevTime = performance.now();
    const startTime = prevTime;

    const animate = (now: number) => {
      rafId = requestAnimationFrame(animate);
      const dt = Math.min((now - prevTime) / 1000, 0.1);
      prevTime = now;
      const elapsed = (now - startTime) / 1000;

      const storeState = useMissionStore.getState();
      if (storeState.phase === 'FLIGHT') {
        storeState.tickFlight(dt);
      }

      controllerRef.current?.update(dt, elapsed);
      renderer?.render(scene, camera);
    };

    rafId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(rafId);
      canvas.removeEventListener('pointerdown', handlePointerDown);
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerup', handlePointerUp);
      canvas.removeEventListener('wheel', handleWheel);
      canvas.removeEventListener('dragover', handleDragOver);
      canvas.removeEventListener('drop', handleDrop);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);

      controllerRef.current?.dispose();
      controllerRef.current = null;
      renderer?.dispose();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      data-testid="game-viewport-canvas"
      className="viewport-canvas"
    />
  );
};
