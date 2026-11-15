import * as THREE from 'three';
import type { SpacecraftConfig, SubsystemCategory } from '../../core/types';

// --- PBR Material Helpers ---

function makeMetalFoilMaterial(baseColor: string, emissiveColor?: string, emissiveIntensity = 0): THREE.MeshPhysicalMaterial {
  return new THREE.MeshPhysicalMaterial({
    color: baseColor,
    metalness: 0.85,
    roughness: 0.15,
    clearcoat: 0.3,
    clearcoatRoughness: 0.2,
    emissive: emissiveColor ? new THREE.Color(emissiveColor) : undefined,
    emissiveIntensity,
    reflectivity: 1.0,
  });
}

function makeCarbonCompositeMaterial(baseColor: string): THREE.MeshStandardMaterial {
  return new THREE.MeshStandardMaterial({
    color: baseColor,
    metalness: 0.1,
    roughness: 0.85,
  });
}

function makeSolarCellMaterial(): THREE.MeshPhysicalMaterial {
  return new THREE.MeshPhysicalMaterial({
    color: '#0a1628',
    metalness: 0.95,
    roughness: 0.02,
    clearcoat: 1.0,
    clearcoatRoughness: 0.05,
    emissive: new THREE.Color('#1e3a5f'),
    emissiveIntensity: 0.15,
    transmission: 0.05,
    thickness: 0.3,
  });
}

function makeThrusterBellMaterial(isVacuumOptimized = false): THREE.MeshStandardMaterial {
  return new THREE.MeshStandardMaterial({
    color: isVacuumOptimized ? '#1a1a2e' : '#2d2d3a',
    metalness: 0.9,
    roughness: isVacuumOptimized ? 0.15 : 0.25,
    emissive: isVacuumOptimized ? new THREE.Color('#0f0f1a') : new THREE.Color('#1a1008'),
    emissiveIntensity: isVacuumOptimized ? 0.1 : 0.05,
  });
}

function makeMLIMaterial(): THREE.MeshPhysicalMaterial {
  return new THREE.MeshPhysicalMaterial({
    color: '#c9a84c',
    metalness: 0.95,
    roughness: 0.08,
    clearcoat: 0.8,
    clearcoatRoughness: 0.1,
    emissive: new THREE.Color('#8b6f1a'),
    emissiveIntensity: 0.08,
  });
}

function makeWhiteThermalMaterial(): THREE.MeshPhysicalMaterial {
  return new THREE.MeshPhysicalMaterial({
    color: '#e8eef4',
    metalness: 0.05,
    roughness: 0.92,
    clearcoat: 0.2,
    clearcoatRoughness: 0.3,
  });
}

function makeTitaniumMaterial(): THREE.MeshPhysicalMaterial {
  return new THREE.MeshPhysicalMaterial({
    color: '#a8b0ba',
    metalness: 0.75,
    roughness: 0.35,
    clearcoat: 0.4,
    clearcoatRoughness: 0.2,
  });
}

function makeGoldKaptonMaterial(): THREE.MeshPhysicalMaterial {
  return new THREE.MeshPhysicalMaterial({
    color: '#d4a82e',
    metalness: 0.9,
    roughness: 0.12,
    clearcoat: 0.6,
    clearcoatRoughness: 0.15,
    emissive: new THREE.Color('#8b6f1a'),
    emissiveIntensity: 0.1,
  });
}

export function disposeObject3D(root: THREE.Object3D): void {
  root.traverse((obj) => {
    const mesh = obj as THREE.Mesh;
    if (mesh.geometry) {
      mesh.geometry.dispose();
    }
    const mat = (mesh as { material?: THREE.Material | THREE.Material[] }).material;
    if (mat) {
      const mats = Array.isArray(mat) ? mat : [mat];
      for (const m of mats) {
        if (m instanceof THREE.Material) {
          // Common maps
          (m as THREE.MeshStandardMaterial).map?.dispose();
          (m as THREE.MeshStandardMaterial).emissiveMap?.dispose();
          (m as THREE.MeshStandardMaterial).bumpMap?.dispose();
          (m as THREE.MeshStandardMaterial).normalMap?.dispose();
          (m as THREE.MeshStandardMaterial).roughnessMap?.dispose();
          (m as THREE.MeshStandardMaterial).metalnessMap?.dispose();
          (m as THREE.MeshStandardMaterial).displacementMap?.dispose();
          // Physical material maps
          (m as THREE.MeshPhysicalMaterial).clearcoatMap?.dispose();
          (m as THREE.MeshPhysicalMaterial).clearcoatRoughnessMap?.dispose();
          (m as THREE.MeshPhysicalMaterial).transmissionMap?.dispose();
          (m as THREE.MeshPhysicalMaterial).thicknessMap?.dispose();
        }
        m.dispose();
      }
    }
  });
}

// Export material creators for use in other files
export {
  makeMetalFoilMaterial,
  makeCarbonCompositeMaterial,
  makeSolarCellMaterial,
  makeThrusterBellMaterial,
  makeMLIMaterial,
  makeWhiteThermalMaterial,
  makeTitaniumMaterial,
  makeGoldKaptonMaterial,
};

export function createStarfield(count = 1600, radius = 3200): THREE.Points {
  const positions = new Float32Array(count * 3);
  const colors = new Float32Array(count * 3);

  const palette = [
    new THREE.Color('#ffffff'),
    new THREE.Color('#cbe4ff'),
    new THREE.Color('#ffe5b4'),
    new THREE.Color('#9ecbff'),
    new THREE.Color('#ffd3a6'),
  ];

  // Deterministic pseudo-random for crisp repeatable starfield
  let seed = 421337;
  const rand = () => {
    seed = (seed * 1664525 + 1013904223) >>> 0;
    return seed / 4294967296;
  };

  for (let i = 0; i < count; i++) {
    const u = rand();
    const v = rand();
    const theta = 2 * Math.PI * u;
    const phi = Math.acos(2 * v - 1);
    const r = radius * (0.75 + rand() * 0.35);

    positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
    positions[i * 3 + 1] = r * Math.cos(phi);
    positions[i * 3 + 2] = r * Math.sin(phi) * Math.sin(theta);

    const c = palette[Math.floor(rand() * palette.length)];
    const brightness = 0.5 + rand() * 0.5;
    colors[i * 3] = c.r * brightness;
    colors[i * 3 + 1] = c.g * brightness;
    colors[i * 3 + 2] = c.b * brightness;
  }

  const geom = new THREE.BufferGeometry();
  geom.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  geom.setAttribute('color', new THREE.BufferAttribute(colors, 3));

  const mat = new THREE.PointsMaterial({
    size: 2.2,
    sizeAttenuation: true,
    vertexColors: true,
    transparent: true,
    opacity: 0.92,
    depthWrite: false,
  });

  const stars = new THREE.Points(geom, mat);
  stars.name = 'starfield';
  return stars;
}

function makePlanetCanvasTexture(kind: 'EARTH' | 'MOON' | 'MARS'): THREE.CanvasTexture {
  const w = 512;
  const h = 256;
  const canvas = document.createElement('canvas');
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext('2d')!;

  let seed = kind === 'EARTH' ? 101 : kind === 'MOON' ? 202 : 303;
  const rand = () => {
    seed = (seed * 1664525 + 1013904223) >>> 0;
    return seed / 4294967296;
  };

  if (kind === 'EARTH') {
    const grad = ctx.createLinearGradient(0, 0, 0, h);
    grad.addColorStop(0, '#0a3366');
    grad.addColorStop(0.5, '#0c4b8c');
    grad.addColorStop(1, '#092e5e');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, w, h);

    // Continents
    for (let i = 0; i < 42; i++) {
      const cx = rand() * w;
      const cy = 28 + rand() * (h - 56);
      const rx = 18 + rand() * 44;
      const ry = 12 + rand() * 28;
      ctx.fillStyle = rand() > 0.35 ? '#267847' : '#80774a';
      ctx.beginPath();
      ctx.ellipse(cx, cy, rx, ry, rand() * Math.PI, 0, Math.PI * 2);
      ctx.fill();
    }

    // Polar ice caps
    ctx.fillStyle = '#e8f5ff';
    ctx.fillRect(0, 0, w, 14);
    ctx.fillRect(0, h - 14, w, 14);

    // Atmospheric cloud wisps
    ctx.fillStyle = 'rgba(255, 255, 255, 0.24)';
    for (let i = 0; i < 60; i++) {
      const cx = rand() * w;
      const cy = rand() * h;
      const rx = 16 + rand() * 54;
      const ry = 3 + rand() * 7;
      ctx.beginPath();
      ctx.ellipse(cx, cy, rx, ry, (rand() - 0.5) * 0.4, 0, Math.PI * 2);
      ctx.fill();
    }
  } else if (kind === 'MOON') {
    ctx.fillStyle = '#7e838b';
    ctx.fillRect(0, 0, w, h);

    // Maria dark patches
    for (let i = 0; i < 18; i++) {
      ctx.fillStyle = 'rgba(65, 70, 78, 0.45)';
      ctx.beginPath();
      ctx.ellipse(
        rand() * w,
        rand() * h,
        24 + rand() * 46,
        18 + rand() * 34,
        rand() * Math.PI,
        0,
        Math.PI * 2
      );
      ctx.fill();
    }

    // Craters
    for (let i = 0; i < 95; i++) {
      const cx = rand() * w;
      const cy = rand() * h;
      const r = 2 + rand() * 14;
      ctx.fillStyle = 'rgba(55, 58, 66, 0.55)';
      ctx.beginPath();
      ctx.arc(cx, cy, r, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = 'rgba(210, 215, 224, 0.45)';
      ctx.lineWidth = 1.1;
      ctx.beginPath();
      ctx.arc(cx - 0.6, cy - 0.6, r, 0, Math.PI * 2);
      ctx.stroke();
    }
  } else {
    // MARS
    const grad = ctx.createLinearGradient(0, 0, 0, h);
    grad.addColorStop(0, '#9d4a2c');
    grad.addColorStop(0.5, '#ba5531');
    grad.addColorStop(1, '#8c3d22');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, w, h);

    // Basalt canyons & dark highlands
    for (let i = 0; i < 36; i++) {
      ctx.fillStyle = rand() > 0.4 ? 'rgba(104, 38, 22, 0.45)' : 'rgba(214, 118, 70, 0.35)';
      ctx.beginPath();
      ctx.ellipse(
        rand() * w,
        20 + rand() * (h - 40),
        16 + rand() * 48,
        6 + rand() * 20,
        (rand() - 0.5) * 0.8,
        0,
        Math.PI * 2
      );
      ctx.fill();
    }

    // Polar CO2 ice caps
    ctx.fillStyle = '#f2e8e4';
    ctx.fillRect(0, 0, w, 10);
    ctx.fillRect(0, h - 10, w, 10);
  }

  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.wrapS = THREE.RepeatWrapping;
  tex.needsUpdate = true;
  return tex;
}

const PLANET_MAP_FILE: Record<'EARTH' | 'MOON' | 'MARS', string> = {
  EARTH: '8k_earth_daymap.jpg', // 8K: stays sharp on the low launch camera
  MOON: '8k_moon.jpg',
  MARS: '8k_mars.jpg',
};
const planetMapCache = new Map<string, Promise<THREE.Texture>>();

/** Loads a real surface map once and shares it between every scene that draws the planet. */
function loadPlanetMap(kind: 'EARTH' | 'MOON' | 'MARS'): Promise<THREE.Texture> {
  let p = planetMapCache.get(kind);
  if (!p) {
    p = new THREE.TextureLoader()
      .loadAsync(`textures/${PLANET_MAP_FILE[kind]}`)
      .then((tex) => {
        tex.colorSpace = THREE.SRGBColorSpace;
        tex.anisotropy = 16;
        return tex;
      });
    planetMapCache.set(kind, p);
  }
  return p;
}

export function createPlanetMesh(
  kind: 'EARTH' | 'MOON' | 'MARS',
  radiusUnits: number
): THREE.Group {
  const group = new THREE.Group();
  group.name = `planet-${kind.toLowerCase()}`;

  const tex = makePlanetCanvasTexture(kind);
  // 256 segments: with 48 the flat faces sagged ~1.3 km (game scale) below the true
  // radius, so the launch pad visibly floated above the ground.
  const segs = 256;
  const geom = new THREE.SphereGeometry(radiusUnits, segs, segs);

  // PBR materials for planets
  let bodyMat: THREE.MeshStandardMaterial;
  if (kind === 'EARTH') {
    bodyMat = new THREE.MeshStandardMaterial({
      map: tex,
      roughness: 0.65,
      metalness: 0.05,
      envMapIntensity: 1.0,
    });
  } else if (kind === 'MOON') {
    bodyMat = new THREE.MeshStandardMaterial({
      map: tex,
      roughness: 0.95,
      metalness: 0.02,
    });
  } else {
    bodyMat = new THREE.MeshStandardMaterial({
      map: tex,
      roughness: 0.88,
      metalness: 0.03,
    });
  }

  const body = new THREE.Mesh(geom, bodyMat);
  body.name = `${kind.toLowerCase()}-surface`;
  // three.js wraps a map with east running toward -Z, but the game's longitudes run
  // toward +Z (getSurfacePosition). Mirroring Z lines the real map up with launch
  // sites and radio dishes, so Kennedy sits on Florida.
  body.scale.z = -1;
  group.add(body);

  // Real planet maps (Solar System Scope, CC BY 4.0). The drawn texture shows until it loads.
  loadPlanetMap(kind).then((real) => {
    bodyMat.map = real;
    bodyMat.needsUpdate = true;
  });

  if (kind === 'EARTH' || kind === 'MARS') {
    // Enhanced Atmospheric Fresnel Rim Glow - uses BackSide for proper limb glow
    const rimGeom = new THREE.SphereGeometry(radiusUnits * 1.06, 96, 96);

    const rimMat = new THREE.ShaderMaterial({
      uniforms: {
        uInnerColor: { value: new THREE.Color(kind === 'EARTH' ? '#bfe3ff' : '#ffc9a3') },
        uOuterColor: { value: new THREE.Color(kind === 'EARTH' ? '#0ea5e9' : '#fb923c') },
        uFresnelPower: { value: 3.2 },
        uFresnelScale: { value: 1.0 },
        uTime: { value: 0 },
        uCameraPos: { value: new THREE.Vector3() },
      },
      vertexShader: `
        varying vec3 vNormal;
        varying vec3 vWorldPos;
        void main() {
          vNormal = normalize(normalMatrix * normal);
          vWorldPos = (modelMatrix * vec4(position, 1.0)).xyz;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform vec3 uInnerColor;
        uniform vec3 uOuterColor;
        uniform float uFresnelPower;
        uniform float uFresnelScale;
        uniform float uTime;
        uniform vec3 uCameraPos;
        varying vec3 vNormal;
        varying vec3 vWorldPos;

        void main() {
          // Soft atmospheric halo: brightest right at the planet's edge, fading smoothly
          // into space (a classic back-face glow), instead of a hard blue ring.
          float rim = max(0.0, 0.72 + dot(normalize(vNormal), vec3(0.0, 0.0, 1.0)));
          float glow = pow(rim, 5.0) * uFresnelScale;
          vec3 color = mix(uOuterColor, uInnerColor, clamp(glow * 1.4, 0.0, 1.0));
          float alpha = clamp(glow, 0.0, 1.0) * 0.9;
          gl_FragColor = vec4(color * glow, alpha);
        }
      `,
      transparent: true,
      blending: THREE.AdditiveBlending,
      side: THREE.BackSide,
      depthWrite: false,
      depthTest: true,
    });

    const rim = new THREE.Mesh(rimGeom, rimMat);
    rim.name = `${kind.toLowerCase()}-atmosphere`;
    rim.userData.updateUniforms = (camera: THREE.Camera, time: number) => {
      rimMat.uniforms.uCameraPos.value.setFromMatrixPosition(camera.matrixWorld);
      rimMat.uniforms.uTime.value = time;
    };
    group.add(rim);
  }

  return group;
}

export function createVabHangarGroup(): THREE.Group {
  const group = new THREE.Group();
  group.name = 'vab-hangar';

  // High-tech circular launch pad floor
  const floorGeom = new THREE.CylinderGeometry(16, 16, 0.4, 36);
  const floorMat = new THREE.MeshStandardMaterial({
    color: '#111a2b',
    roughness: 0.45,
    metalness: 0.65,
  });
  const floor = new THREE.Mesh(floorGeom, floorMat);
  floor.position.y = -0.2;
  group.add(floor);

  const grid = new THREE.GridHelper(30, 30, '#22d3ee', '#132842');
  grid.position.y = 0.02;
  group.add(grid);

  // Flame trench ring
  const ringGeom = new THREE.RingGeometry(2.2, 3.4, 36);
  const ringMat = new THREE.MeshBasicMaterial({
    color: '#f59e0b',
    side: THREE.DoubleSide,
    transparent: true,
    opacity: 0.45,
  });
  const ring = new THREE.Mesh(ringGeom, ringMat);
  ring.rotation.x = -Math.PI / 2;
  ring.position.y = 0.04;
  group.add(ring);

  // Gantry tower along -X / -Z corner
  const towerMat = new THREE.MeshStandardMaterial({
    color: '#2b394d',
    metalness: 0.75,
    roughness: 0.35,
  });
  const beamMat = new THREE.MeshStandardMaterial({
    color: '#d97706',
    metalness: 0.5,
    roughness: 0.4,
  });

  const towerX = -4.6;
  const towerZ = -2.2;
  for (const [ox, oz] of [
    [-0.5, -0.5],
    [0.5, -0.5],
    [-0.5, 0.5],
    [0.5, 0.5],
  ]) {
    const col = new THREE.Mesh(new THREE.BoxGeometry(0.18, 12.5, 0.18), towerMat);
    col.position.set(towerX + ox, 6.25, towerZ + oz);
    group.add(col);
  }

  for (let y = 1.5; y <= 11.5; y += 2.0) {
    const deck = new THREE.Mesh(new THREE.BoxGeometry(1.4, 0.14, 1.4), towerMat);
    deck.position.set(towerX, y, towerZ);
    group.add(deck);

    // Umbilical arm reaching toward rocket centerline
    const arm = new THREE.Mesh(new THREE.BoxGeometry(3.2, 0.14, 0.22), beamMat);
    arm.position.set(towerX + 1.8, y, towerZ + 0.9);
    arm.rotation.y = -0.45;
    group.add(arm);
  }

  // Hangar bay enclosing cylindrical rib columns
  const wallMat = new THREE.MeshStandardMaterial({
    color: '#0b1424',
    metalness: 0.6,
    roughness: 0.5,
    side: THREE.BackSide,
  });
  const bayShell = new THREE.Mesh(
    new THREE.CylinderGeometry(18, 18, 22, 16, 1, true),
    wallMat
  );
  bayShell.position.y = 11;
  group.add(bayShell);

  for (let i = 0; i < 8; i++) {
    const a = (i / 8) * Math.PI * 2;
    const pillar = new THREE.Mesh(
      new THREE.BoxGeometry(0.45, 20, 0.7),
      towerMat
    );
    pillar.position.set(Math.cos(a) * 16.5, 10, Math.sin(a) * 16.5);
    pillar.rotation.y = -a;
    group.add(pillar);

    // Vertical cyan bay light strips
    const strip = new THREE.Mesh(
      new THREE.BoxGeometry(0.08, 16, 0.12),
      new THREE.MeshBasicMaterial({ color: '#38bdf8' })
    );
    strip.position.set(Math.cos(a) * 16.05, 9, Math.sin(a) * 16.05);
    strip.rotation.y = -a;
    group.add(strip);
  }

  return group;
}

export interface RocketStackOptions {
  activeCategory?: SubsystemCategory | null;
  hideStage1?: boolean;
  showSnapRings?: boolean;
}

function getCategorySlotY(cat: SubsystemCategory): number {
  switch (cat) {
    case 'launcher':
      return 2.4;
    case 'structure':
      return 6.35;
    case 'thermal':
      return 5.75;
    case 'battery':
      return 6.35;
    case 'computer':
      return 6.95;
    case 'adcs':
      return 7.45;
    case 'power':
      return 6.6;
    case 'payload':
      return 8.35;
  }
}

// --- Launcher geometry helpers (shared by the stack and the spent booster) ---

interface LauncherMats {
  paint: THREE.Material;
  carbon: THREE.Material;
  engine: THREE.Material;
  orange: THREE.Material;
  tier: THREE.Material;
}

function makeLauncherPaintMaterial(): THREE.MeshStandardMaterial {
  return new THREE.MeshStandardMaterial({ color: '#f4efe4', roughness: 0.45, metalness: 0.1 });
}

function makeLauncherCarbonMaterial(): THREE.MeshStandardMaterial {
  return new THREE.MeshStandardMaterial({ color: '#23252b', roughness: 0.6, metalness: 0.2 });
}

function makeLauncherEngineMaterial(): THREE.MeshStandardMaterial {
  return new THREE.MeshStandardMaterial({
    color: '#3a3d45',
    roughness: 0.35,
    metalness: 0.8,
    side: THREE.DoubleSide,
  });
}

function makeLauncherOrangeMaterial(): THREE.MeshStandardMaterial {
  return new THREE.MeshStandardMaterial({ color: '#ff7a1a', roughness: 0.5, metalness: 0.1 });
}

function launcherTierColor(launcherId: string | null): string {
  return launcherId === 'launcher-super-heavy'
    ? '#ef4444'
    : launcherId === 'launcher-heavy'
      ? '#f97316'
      : launcherId === 'launcher-medium-heavy'
        ? '#f59e0b'
        : launcherId === 'launcher-medium'
          ? '#0ea5e9'
          : '#22c55e';
}

/** Flared engine bell. Throat at local y=0, exit at y=-length. */
function makeBellGeometry(exitR: number, length: number): THREE.LatheGeometry {
  const throatR = exitR * 0.42;
  const pts: THREE.Vector2[] = [];
  const steps = 14;
  for (let i = 0; i <= steps; i++) {
    const t = i / steps;
    const r = throatR + (exitR - throatR) * (1 - Math.pow(1 - t, 1.8));
    pts.push(new THREE.Vector2(r, -length * t));
  }
  return new THREE.LatheGeometry(pts, 32);
}

/** Rounded ogive nose. Base at local y=0, tip at y=h. */
function makeOgiveGeometry(baseR: number, h: number): THREE.LatheGeometry {
  const pts: THREE.Vector2[] = [];
  const steps = 16;
  for (let i = 0; i <= steps; i++) {
    const t = i / steps;
    const r = baseR * Math.pow(Math.cos((t * Math.PI) / 2), 0.75);
    pts.push(new THREE.Vector2(Math.max(r, 0.0001), h * t));
  }
  return new THREE.LatheGeometry(pts, 32);
}

function addEngineCluster(
  group: THREE.Group,
  mats: LauncherMats,
  coreR: number,
  cluster: boolean,
  topY: number,
  x = 0,
  z = 0
): void {
  const placeBell = (bx: number, bz: number, exitR: number, len: number) => {
    const bell = new THREE.Mesh(makeBellGeometry(exitR, len), mats.engine);
    bell.position.set(bx, topY, bz);
    group.add(bell);
    const chamber = new THREE.Mesh(
      new THREE.CylinderGeometry(exitR * 0.5, exitR * 0.42, 0.1, 20),
      mats.engine
    );
    chamber.position.set(bx, topY + 0.05, bz);
    group.add(chamber);
  };
  if (cluster) {
    placeBell(x, z, coreR * 0.24, 0.32);
    for (let i = 0; i < 6; i++) {
      const a = (i / 6) * Math.PI * 2;
      placeBell(x + Math.cos(a) * coreR * 0.58, z + Math.sin(a) * coreR * 0.58, coreR * 0.2, 0.3);
    }
  } else {
    placeBell(x, z, coreR * 0.62, 0.36);
  }
}

/**
 * Stage 1 (core + strap-ons + interstage), in stack coordinates
 * (base of the stack at y=0), shifted by yOffset.
 */
function addStage1Geometry(
  group: THREE.Group,
  launcherId: string,
  scaleW: number,
  mats: LauncherMats,
  yOffset: number
): void {
  const R = 0.55 * scaleW;
  const seg = 32;
  const y = (v: number) => v + yOffset;

  // Thrust skirt (carbon), 0.12..0.32
  const skirt = new THREE.Mesh(new THREE.CylinderGeometry(R, R * 1.04, 0.2, seg), mats.carbon);
  skirt.position.y = y(0.22);
  group.add(skirt);

  // Main tank, 0.32..3.8
  const tank = new THREE.Mesh(new THREE.CylinderGeometry(R, R, 3.48, seg), mats.paint);
  tank.position.y = y(2.06);
  group.add(tank);

  // Orange accent stripe + thin tier band
  const stripe = new THREE.Mesh(new THREE.CylinderGeometry(R * 1.006, R * 1.006, 0.12, seg), mats.orange);
  stripe.position.y = y(3.2);
  group.add(stripe);
  const tierBand = new THREE.Mesh(new THREE.CylinderGeometry(R * 1.006, R * 1.006, 0.035, seg), mats.tier);
  tierBand.position.y = y(3.32);
  group.add(tierBand);
  const lowStripe = new THREE.Mesh(new THREE.CylinderGeometry(R * 1.006, R * 1.006, 0.05, seg), mats.orange);
  lowStripe.position.y = y(0.55);
  group.add(lowStripe);

  // Interstage (carbon), 3.8..4.22
  const interstage = new THREE.Mesh(new THREE.CylinderGeometry(R * 1.004, R * 1.004, 0.42, seg), mats.carbon);
  interstage.position.y = y(4.01);
  group.add(interstage);

  // Grid fins (deployed, on the interstage)
  for (let i = 0; i < 4; i++) {
    const a = (i / 4) * Math.PI * 2 + Math.PI / 4;
    const fin = new THREE.Mesh(new THREE.BoxGeometry(0.26 * scaleW, 0.03, 0.22 * scaleW), mats.carbon);
    const rr = R + 0.13 * scaleW;
    fin.position.set(Math.cos(a) * rr, y(4.08), Math.sin(a) * rr);
    fin.rotation.y = -a;
    group.add(fin);
  }

  // Folded landing-leg stubs
  for (let i = 0; i < 4; i++) {
    const a = (i / 4) * Math.PI * 2 + Math.PI / 4;
    const leg = new THREE.Mesh(new THREE.BoxGeometry(0.04, 0.95, 0.14 * scaleW), mats.carbon);
    const rr = R + 0.02;
    leg.position.set(Math.cos(a) * rr, y(0.82), Math.sin(a) * rr);
    leg.rotation.y = -a;
    group.add(leg);
  }

  // Strap-on boosters
  const strapOns: { xs: number[]; r: number; h: number; cy: number }[] = [];
  if (launcherId === 'launcher-heavy' || launcherId === 'launcher-super-heavy') {
    const isSH = launcherId === 'launcher-super-heavy';
    const spread = 0.98 * (isSH ? 1.3 : 1);
    strapOns.push({
      xs: (isSH ? [-1.5, -0.5, 0.5, 1.5] : [-1, 1]).map((s) => s * spread),
      r: isSH ? 0.4 : 0.32,
      h: 3.1,
      cy: 1.75,
    });
  } else if (launcherId === 'launcher-medium-heavy') {
    strapOns.push({ xs: [-0.88, 0.88], r: 0.25, h: 2.8, cy: 1.6 });
  }
  for (const so of strapOns) {
    for (const bx of so.xs) {
      const body = new THREE.Mesh(new THREE.CylinderGeometry(so.r, so.r, so.h, seg), mats.paint);
      body.position.set(bx, y(so.cy), 0);
      group.add(body);
      const topY = so.cy + so.h / 2;
      const nose = new THREE.Mesh(makeOgiveGeometry(so.r, so.r * 2.2), mats.paint);
      nose.position.set(bx, y(topY), 0);
      group.add(nose);
      const band = new THREE.Mesh(new THREE.CylinderGeometry(so.r * 1.01, so.r * 1.01, 0.08, seg), mats.orange);
      band.position.set(bx, y(topY - 0.12), 0);
      group.add(band);
      const baseY = so.cy - so.h / 2;
      const bSkirt = new THREE.Mesh(new THREE.CylinderGeometry(so.r, so.r * 1.05, 0.12, seg), mats.carbon);
      bSkirt.position.set(bx, y(baseY + 0.06), 0);
      group.add(bSkirt);
      const bBell = new THREE.Mesh(makeBellGeometry(so.r * 0.7, 0.3), mats.engine);
      bBell.position.set(bx, y(baseY), 0);
      group.add(bBell);
    }
  }

  // Main engines, throat just under the skirt
  addEngineCluster(group, mats, R, scaleW >= 1.2, y(0.13));
}
export function createSpentStage1Mesh(launcherId: string | null): THREE.Group {
  const group = new THREE.Group();
  const scaleW =
    launcherId === 'launcher-super-heavy'
      ? 2.0
      : launcherId === 'launcher-heavy'
        ? 1.35
        : launcherId === 'launcher-medium-heavy'
          ? 1.2
          : launcherId === 'launcher-medium'
            ? 1.05
            : 0.8;

  const mats: LauncherMats = {
    paint: makeLauncherPaintMaterial(),
    carbon: makeLauncherCarbonMaterial(),
    engine: makeLauncherEngineMaterial(),
    orange: makeLauncherOrangeMaterial(),
    tier: new THREE.MeshStandardMaterial({ color: launcherTierColor(launcherId), roughness: 0.5, metalness: 0.1 }),
  };
  // Same geometry as the stack's stage 1, centred on the origin (stack y=2.0 -> 0).
  addStage1Geometry(group, launcherId ?? '', scaleW, mats, -2.0);

  return group;
}

export function createRocketStackGroup(
  config: SpacecraftConfig,
  conflictCategories: Set<SubsystemCategory>,
  options: RocketStackOptions = {}
): THREE.Group {
  const root = new THREE.Group();
  root.name = 'rocket-stack';

  const {
    activeCategory = null,
    hideStage1 = false,
    showSnapRings = false,
  } = options;

  const conflictMat = (baseColor: string, cat: SubsystemCategory) => {
    const isConflict = conflictCategories.has(cat);
    const isActive = activeCategory === cat;
    return new THREE.MeshStandardMaterial({
      color: baseColor,
      roughness: 0.38,
      metalness: 0.48,
      emissive: isConflict
        ? new THREE.Color('#ef4444')
        : isActive
          ? new THREE.Color('#0284c7')
          : new THREE.Color('#000000'),
      emissiveIntensity: isConflict ? 0.65 : isActive ? 0.35 : 0,
    });
  };

  // --- LAUNCHER (Stage 1 + Stage 2) ---
  const launcherId = config.launcherId;
  const lvScaleW =
    launcherId === 'launcher-super-heavy'
      ? 2.0
      : launcherId === 'launcher-heavy'
        ? 1.35
        : launcherId === 'launcher-medium-heavy'
          ? 1.2
          : launcherId === 'launcher-medium'
            ? 1.05
            : 0.8;

  if (launcherId) {
    const lvGroup = new THREE.Group();
    lvGroup.name = 'slot-launcher';
    lvGroup.userData.category = 'launcher';

    const hullMat = conflictMat('#f4efe4', 'launcher');
    hullMat.roughness = 0.45;
    hullMat.metalness = 0.1;
    const mats: LauncherMats = {
      paint: hullMat,
      carbon: makeLauncherCarbonMaterial(),
      engine: makeLauncherEngineMaterial(),
      orange: makeLauncherOrangeMaterial(),
      tier: new THREE.MeshStandardMaterial({ color: launcherTierColor(launcherId), roughness: 0.5, metalness: 0.1 }),
    };

    if (!hideStage1) {
      addStage1Geometry(lvGroup, launcherId, lvScaleW, mats, 0);
    }

    // Stage 2, 4.22..5.47 (sits on the interstage)
    const R2 = 0.55 * lvScaleW;
    const s2 = new THREE.Mesh(new THREE.CylinderGeometry(R2, R2, 1.25, 32), hullMat);
    s2.position.y = 4.845;
    lvGroup.add(s2);

    const s2Stripe = new THREE.Mesh(
      new THREE.CylinderGeometry(R2 * 1.006, R2 * 1.006, 0.07, 32),
      mats.orange
    );
    s2Stripe.position.y = 5.3;
    lvGroup.add(s2Stripe);

    // Payload adapter cone (carbon)
    const adapter = new THREE.Mesh(
      new THREE.CylinderGeometry(R2 * 0.7, R2, 0.07, 32),
      mats.carbon
    );
    adapter.position.y = 5.505;
    lvGroup.add(adapter);

    // Vacuum engine: hidden inside the interstage until stage 1 drops
    addEngineCluster(lvGroup, mats, R2 * 0.85, false, 4.2);

    root.add(lvGroup);
  }

  // --- STRUCTURE BUS ---
  if (config.structureId) {
    const stGroup = new THREE.Group();
    stGroup.name = 'slot-structure';
    stGroup.userData.category = 'structure';
    const stMat = conflictMat(
      config.structureId === 'struct-heavy-landing-platform'
        ? '#94a3b8'
        : config.structureId === 'struct-lander-chassis'
          ? '#cbd5e1'
          : config.structureId === 'struct-modular-bus'
            ? '#94a3b8'
            : '#64748b',
      'structure'
    );

    const sides = config.structureId === 'struct-modular-bus' ? 6 : 8;
    const radius =
      config.structureId === 'struct-heavy-landing-platform'
        ? 1.0
        : config.structureId === 'struct-lander-chassis'
          ? 0.74
          : config.structureId === 'struct-modular-bus'
            ? 0.62
            : 0.48;
    const bus = new THREE.Mesh(
      new THREE.CylinderGeometry(radius, radius, 1.65, sides),
      stMat
    );
    bus.position.y = 6.35;
    stGroup.add(bus);

    if (config.structureId === 'struct-lander-chassis' || config.structureId === 'struct-heavy-landing-platform') {
      const legMat = new THREE.MeshStandardMaterial({
        color: '#f59e0b',
        metalness: 0.65,
        roughness: 0.35,
      });
      const legCount = config.structureId === 'struct-heavy-landing-platform' ? 6 : 4;
      const legRadius = config.structureId === 'struct-heavy-landing-platform' ? 1.25 : 0.9;
      const legHeight = config.structureId === 'struct-heavy-landing-platform' ? 1.6 : 1.3;
      for (let i = 0; i < legCount; i++) {
        const a = (i / legCount) * Math.PI * 2 + Math.PI / legCount;
        const leg = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.05, legHeight, 8), legMat);
        leg.position.set(Math.cos(a) * legRadius, 5.4, Math.sin(a) * legRadius);
        leg.rotation.z = Math.cos(a) * 0.5;
        leg.rotation.x = -Math.sin(a) * 0.5;
        stGroup.add(leg);

        const pad = new THREE.Mesh(
          new THREE.CylinderGeometry(0.18, 0.2, 0.08, 10),
          legMat
        );
        pad.position.set(Math.cos(a) * (legRadius + 0.25), 4.75, Math.sin(a) * (legRadius + 0.25));
        stGroup.add(pad);
      }
    }

    root.add(stGroup);
  }

  // --- THERMAL ---
  if (config.thermalId) {
    const thGroup = new THREE.Group();
    thGroup.name = 'slot-thermal';
    thGroup.userData.category = 'thermal';

    if (config.thermalId === 'thermal-heavy-rad-shield') {
      // Blunt PICA-X Aeroshell Heatshield Cone at base of spacecraft bus
      const shieldMat = conflictMat('#451a03', 'thermal');
      const shield = new THREE.Mesh(new THREE.ConeGeometry(0.95, 0.52, 24), shieldMat);
      shield.rotation.x = Math.PI;
      shield.position.y = 5.48;
      thGroup.add(shield);
    } else if (config.thermalId === 'thermal-deployable-radiator') {
      // Active Deployable Radiator - large folding panels
      const radMat = conflictMat('#06b6d4', 'thermal');
      const frameMat = new THREE.MeshStandardMaterial({
        color: '#cbd5e1',
        metalness: 0.7,
        roughness: 0.3,
      });
      for (const side of [-1, 1]) {
        // Main radiator panel
        const panel = new THREE.Mesh(new THREE.BoxGeometry(2.2, 0.06, 1.4), radMat);
        panel.position.set(side * 1.3, 6.25, 0);
        thGroup.add(panel);

        // Deployment hinge/strut
        const strut = new THREE.Mesh(
          new THREE.CylinderGeometry(0.04, 0.04, 0.5, 8),
          frameMat
        );
        strut.rotation.z = Math.PI / 2;
        strut.position.set(side * 0.55, 6.25, 0);
        thGroup.add(strut);

        // Fluid loop tubing visual
        const tube = new THREE.Mesh(
          new THREE.TorusGeometry(0.6, 0.025, 8, 16),
          new THREE.MeshStandardMaterial({ color: '#0ea5e9', metalness: 0.8, roughness: 0.2 })
        );
        tube.rotation.x = Math.PI / 2;
        tube.position.set(side * 0.95, 6.15, 0);
        thGroup.add(tube);
      }
    } else if (config.thermalId === 'thermal-active-louvers') {
      const louverMat = conflictMat('#e2e8f0', 'thermal');
      for (const side of [-1, 1]) {
        const louver = new THREE.Mesh(new THREE.BoxGeometry(0.14, 0.95, 0.65), louverMat);
        louver.position.set(0, 6.25, side * 0.68);
        thGroup.add(louver);
      }
    } else {
      // Gold Kapton MLI wrap ring
      const goldMat = conflictMat('#eab308', 'thermal');
      const mli = new THREE.Mesh(new THREE.CylinderGeometry(0.56, 0.56, 0.55, 16), goldMat);
      mli.position.y = 5.82;
      thGroup.add(mli);
    }
    root.add(thGroup);
  }

  // --- BATTERY ---
  if (config.batteryId) {
    const batGroup = new THREE.Group();
    batGroup.name = 'slot-battery';
    batGroup.userData.category = 'battery';
    const scale =
      config.batteryId === 'bat-ultra-solid-state'
        ? 1.5
        : config.batteryId === 'bat-solid-state'
          ? 1.25
          : config.batteryId === 'bat-liion-med'
            ? 1.0
            : 0.72;
    const batMat = conflictMat('#06b6d4', 'battery');
    for (const side of [-1, 1]) {
      const pack = new THREE.Mesh(
        new THREE.BoxGeometry(0.24 * scale, 0.62 * scale, 0.36 * scale),
        batMat
      );
      pack.position.set(side * 0.56, 6.35, 0);
      batGroup.add(pack);
    }
    // Ultra version has additional cooling fins
    if (config.batteryId === 'bat-ultra-solid-state') {
      const finMat = new THREE.MeshStandardMaterial({
        color: '#22d3ee',
        emissive: '#06b6d4',
        emissiveIntensity: 0.3,
        roughness: 0.4,
        metalness: 0.5,
      });
      for (const side of [-1, 1]) {
        for (let i = 0; i < 3; i++) {
          const fin = new THREE.Mesh(
            new THREE.BoxGeometry(0.04, 0.5, 0.3),
            finMat
          );
          fin.position.set(side * 0.56, 6.35 + (i - 1) * 0.25, 0.25);
          batGroup.add(fin);
        }
      }
    }
    root.add(batGroup);
  }

  // --- COMPUTER ---
  if (config.computerId) {
    const cpuGroup = new THREE.Group();
    cpuGroup.name = 'slot-computer';
    cpuGroup.userData.category = 'computer';
    const cpuColor =
      config.computerId === 'cpu-radhard-autonomous'
        ? '#ec4899'
        : config.computerId === 'cpu-ai-edge'
          ? '#a855f7'
          : config.computerId === 'cpu-radhard-obc'
            ? '#3b82f6'
            : '#64748b';
    const cpuMat = conflictMat(cpuColor, 'computer');
    const avionics = new THREE.Mesh(new THREE.BoxGeometry(0.55, 0.38, 0.55), cpuMat);
    avionics.position.y = 6.95;
    cpuGroup.add(avionics);

    // Rad-hard autonomous has redundant compute modules
    if (config.computerId === 'cpu-radhard-autonomous') {
      const redundantMat = new THREE.MeshStandardMaterial({
        color: '#fda4af',
        metalness: 0.6,
        roughness: 0.3,
      });
      for (const offset of [-0.35, 0.35]) {
        const module = new THREE.Mesh(new THREE.BoxGeometry(0.18, 0.3, 0.4), redundantMat);
        module.position.set(offset, 7.1, 0);
        cpuGroup.add(module);
      }
      // Vision co-processor camera
      const vision = new THREE.Mesh(
        new THREE.CylinderGeometry(0.08, 0.08, 0.15, 12),
        new THREE.MeshStandardMaterial({ color: '#1e293b', metalness: 0.8, roughness: 0.1 })
      );
      vision.position.set(0, 7.25, 0.4);
      vision.rotation.x = -0.2;
      cpuGroup.add(vision);
    }
    root.add(cpuGroup);
  }

  // --- ADCS ---
  if (config.adcsId) {
    const adcsGroup = new THREE.Group();
    adcsGroup.name = 'slot-adcs';
    adcsGroup.userData.category = 'adcs';
    const adcsMat = conflictMat(
      config.adcsId === 'adcs-cmg-optical-nav'
        ? '#ec4899'
        : config.adcsId === 'adcs-cmg-precision'
          ? '#f43f5e'
          : config.adcsId === 'adcs-reaction-wheels'
            ? '#38bdf8'
            : '#94a3b8',
      'adcs'
    );

    if (config.adcsId === 'adcs-cmg-optical-nav') {
      // Tier 4: 6-CMG pyramid cluster + optical nav suite
      // CMG pyramid (4 gimbaled flywheels in pyramid config)
      for (let i = 0; i < 4; i++) {
        const a = (i / 4) * Math.PI * 2;
        const cmg = new THREE.Mesh(
          new THREE.CylinderGeometry(0.12, 0.12, 0.35, 12),
          adcsMat
        );
        cmg.position.set(Math.cos(a) * 0.35, 7.45, Math.sin(a) * 0.35);
        cmg.rotation.x = Math.PI / 4;
        adcsGroup.add(cmg);

        // Gimbal housing
        const gimbal = new THREE.Mesh(
          new THREE.TorusGeometry(0.18, 0.03, 8, 16),
          new THREE.MeshStandardMaterial({ color: '#cbd5e1', metalness: 0.8, roughness: 0.2 })
        );
        gimbal.position.set(Math.cos(a) * 0.35, 7.3, Math.sin(a) * 0.35);
        gimbal.rotation.x = Math.PI / 2;
        adcsGroup.add(gimbal);
      }
      // Central pyramid hub
      const hub = new THREE.Mesh(new THREE.OctahedronGeometry(0.18), adcsMat);
      hub.position.y = 7.45;
      adcsGroup.add(hub);

      // Optical Navigation Camera (front-facing)
      const optNav = new THREE.Mesh(
        new THREE.CylinderGeometry(0.1, 0.1, 0.25, 12),
        new THREE.MeshStandardMaterial({ color: '#1e293b', metalness: 0.9, roughness: 0.05 })
      );
      optNav.position.set(0, 7.6, 0.55);
      optNav.rotation.x = -0.15;
      adcsGroup.add(optNav);

      // Star tracker (top)
      const starTracker = new THREE.Mesh(new THREE.ConeGeometry(0.12, 0.28, 12), adcsMat);
      starTracker.position.set(0, 7.85, 0.15);
      starTracker.rotation.x = -0.3;
      adcsGroup.add(starTracker);
    } else {
      // Tier 1-3: single ring
      const ring = new THREE.Mesh(new THREE.TorusGeometry(0.55, 0.09, 10, 24), adcsMat);
      ring.rotation.x = Math.PI / 2;
      ring.position.y = 7.45;
      adcsGroup.add(ring);

      if (config.adcsId !== 'adcs-magnetorquer') {
        // Star tracker optical baffle
        const tracker = new THREE.Mesh(new THREE.ConeGeometry(0.14, 0.32, 12), adcsMat);
        tracker.position.set(0.5, 7.52, 0.25);
        tracker.rotation.z = -0.6;
        adcsGroup.add(tracker);
      }
    }
    root.add(adcsGroup);
  }

  // --- POWER (Solar Wings or Glowing RTG Fins) ---
  if (config.powerId) {
    const pwrGroup = new THREE.Group();
    pwrGroup.name = 'slot-power';
    pwrGroup.userData.category = 'power';

    if (config.powerId === 'power-rtg' || config.powerId === 'power-enhanced-rtg') {
      const isEnhanced = config.powerId === 'power-enhanced-rtg';
      const rtgBodyMat = conflictMat(isEnhanced ? '#1e293b' : '#334155', 'power');
      const rtgFinMat = new THREE.MeshStandardMaterial({
        color: isEnhanced ? '#ef4444' : '#f97316',
        emissive: isEnhanced ? '#dc2626' : '#ea580c',
        emissiveIntensity: isEnhanced ? 0.9 : 0.7,
        roughness: 0.4,
      });
      const pod = new THREE.Mesh(new THREE.CylinderGeometry(0.22, 0.22, 1.05, 12), rtgBodyMat);
      pod.rotation.z = Math.PI / 2.6;
      pod.position.set(0.95, 6.45, 0);
      pwrGroup.add(pod);

      const finCount = isEnhanced ? 6 : 4;
      for (let i = 0; i < finCount; i++) {
        const fin = new THREE.Mesh(new THREE.BoxGeometry(0.06, 0.95, 0.55), rtgFinMat);
        fin.position.set(0.95, 6.45, 0);
        fin.rotation.y = (i / finCount) * Math.PI * 2;
        fin.rotation.z = Math.PI / 2.6;
        pwrGroup.add(fin);
      }

      if (isEnhanced) {
        // Enhanced RTG has central heat pipe
        const pipe = new THREE.Mesh(
          new THREE.CylinderGeometry(0.08, 0.08, 1.05, 12),
          new THREE.MeshStandardMaterial({ color: '#fef08a', emissive: '#facc15', emissiveIntensity: 0.5, roughness: 0.2 })
        );
        pipe.rotation.z = Math.PI / 2.6;
        pipe.position.set(0.95, 6.45, 0);
        pwrGroup.add(pipe);
      }
    } else {
      const span = config.powerId === 'power-multi-junction-solar'
        ? 3.0
        : config.powerId === 'power-large-solar'
          ? 2.6
          : 1.5;
      const chord = config.powerId === 'power-multi-junction-solar'
        ? 1.1
        : config.powerId === 'power-large-solar'
          ? 0.95
          : 0.58;
      const panelMat = conflictMat(
        config.powerId === 'power-multi-junction-solar' ? '#0f172a' : '#1d4ed8',
        'power'
      );
      const frameMat = new THREE.MeshStandardMaterial({
        color: '#cbd5e1',
        metalness: 0.7,
        roughness: 0.3,
      });

      for (const side of [-1, 1]) {
        const panel = new THREE.Mesh(new THREE.BoxGeometry(span, 0.04, chord), panelMat);
        panel.position.set(side * (0.65 + span * 0.5), 6.65, 0);
        pwrGroup.add(panel);

        const strut = new THREE.Mesh(
          new THREE.CylinderGeometry(0.04, 0.04, 0.45, 8),
          frameMat
        );
        strut.rotation.z = Math.PI / 2;
        strut.position.set(side * 0.55, 6.65, 0);
        pwrGroup.add(strut);
      }

      // Multi-junction has distinctive cell pattern
      if (config.powerId === 'power-multi-junction-solar') {
        const cellMat = new THREE.MeshStandardMaterial({
          color: '#020617',
          metalness: 0.9,
          roughness: 0.05,
        });
        for (const side of [-1, 1]) {
          for (let row = 0; row < 5; row++) {
            for (let col = 0; col < 3; col++) {
              const cell = new THREE.Mesh(
                new THREE.BoxGeometry(0.55, 0.02, 0.3),
                cellMat
              );
              cell.position.set(
                side * (0.65 + 0.25 + col * 0.7),
                6.67,
                (col - 1) * 0.38
              );
              pwrGroup.add(cell);
            }
          }
        }
      }
    }
    root.add(pwrGroup);
  }

  // --- PAYLOAD ---
  if (config.payloadId) {
    const payGroup = new THREE.Group();
    payGroup.name = 'slot-payload';
    payGroup.userData.category = 'payload';

    if (config.payloadId === 'payload-ir-telescope') {
      const goldMat = conflictMat('#facc15', 'payload');
      const tubeMat = new THREE.MeshStandardMaterial({
        color: '#1e293b',
        metalness: 0.6,
        roughness: 0.35,
      });
      // Sunshield + Hex mirror
      const sunshield = new THREE.Mesh(
        new THREE.BoxGeometry(1.6, 0.08, 1.3),
        new THREE.MeshStandardMaterial({ color: '#c084fc', metalness: 0.6, roughness: 0.25 })
      );
      sunshield.position.y = 7.92;
      payGroup.add(sunshield);

      const mirror = new THREE.Mesh(new THREE.CylinderGeometry(0.68, 0.68, 0.14, 6), goldMat);
      mirror.rotation.x = Math.PI / 2.4;
      mirror.position.y = 8.45;
      payGroup.add(mirror);

      const secondary = new THREE.Mesh(new THREE.CylinderGeometry(0.16, 0.16, 0.16, 12), tubeMat);
      secondary.position.set(0, 8.85, 0.45);
      payGroup.add(secondary);
    } else if (config.payloadId === 'payload-hyperspectral-imager') {
      // Tier 4: Hyperspectral imager - larger aperture, distinctive prism/slit
      const housingMat = conflictMat('#0f172a', 'payload');
      const prismMat = new THREE.MeshPhysicalMaterial({
        color: '#c084fc',
        metalness: 0.8,
        roughness: 0.1,
        transmission: 0.3,
        thickness: 0.5,
        transparent: true,
      });
      const goldMat = conflictMat('#facc15', 'payload');

      // Main telescope tube
      const tube = new THREE.Mesh(new THREE.CylinderGeometry(0.55, 0.62, 1.2, 12), housingMat);
      tube.position.y = 8.3;
      payGroup.add(tube);

      // Sunshield
      const sunshield = new THREE.Mesh(
        new THREE.BoxGeometry(2.0, 0.08, 1.6),
        new THREE.MeshStandardMaterial({ color: '#c084fc', metalness: 0.6, roughness: 0.2 })
      );
      sunshield.position.y = 7.85;
      payGroup.add(sunshield);

      // Primary mirror (larger)
      const mirror = new THREE.Mesh(new THREE.CylinderGeometry(0.58, 0.58, 0.16, 8), goldMat);
      mirror.rotation.x = Math.PI / 2.3;
      mirror.position.y = 8.9;
      payGroup.add(mirror);

      // Hyperspectral prism assembly (distinctive)
      const prism = new THREE.Mesh(
        new THREE.BoxGeometry(0.35, 0.25, 0.45),
        prismMat
      );
      prism.position.set(0.4, 8.7, 0);
      payGroup.add(prism);

      // Slit spectrometer entrance
      const slit = new THREE.Mesh(
        new THREE.BoxGeometry(0.02, 0.15, 0.4),
        new THREE.MeshStandardMaterial({ color: '#1e293b', metalness: 0.9, roughness: 0.05 })
      );
      slit.position.set(0.58, 8.7, 0);
      payGroup.add(slit);
    } else if (config.payloadId === 'payload-deep-space-lander-science') {
      // Tier 4: Deep-surface science suite - drill + mass spec + seismo
      const baseMat = conflictMat('#e2e8f0', 'payload');
      const instrumentMat = conflictMat('#a855f7', 'payload');
      const mastMat = new THREE.MeshStandardMaterial({ color: '#f59e0b', metalness: 0.6 });

      // Main instrument deck
      const deck = new THREE.Mesh(new THREE.BoxGeometry(1.2, 0.6, 1.0), baseMat);
      deck.position.y = 8.15;
      payGroup.add(deck);

      // Deep drill (tall, distinctive)
      const drill = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.1, 1.8, 12), instrumentMat);
      drill.position.set(-0.35, 8.9, 0.3);
      payGroup.add(drill);

      // Drill head
      const drillHead = new THREE.Mesh(
        new THREE.ConeGeometry(0.12, 0.2, 8),
        new THREE.MeshStandardMaterial({ color: '#ef4444', metalness: 0.8, roughness: 0.2 })
      );
      drillHead.position.set(-0.35, 10.0, 0.3);
      payGroup.add(drillHead);

      // Mass spectrometer
      const massSpec = new THREE.Mesh(new THREE.CylinderGeometry(0.25, 0.25, 0.5, 16), instrumentMat);
      massSpec.position.set(0.35, 8.5, -0.25);
      payGroup.add(massSpec);

      // Laser ablation port
      const laser = new THREE.Mesh(
        new THREE.CylinderGeometry(0.04, 0.04, 0.15, 8),
        new THREE.MeshStandardMaterial({ color: '#fef08a', emissive: '#facc15', emissiveIntensity: 0.8 })
      );
      laser.position.set(0.55, 8.5, -0.25);
      laser.rotation.x = -0.2;
      payGroup.add(laser);

      // Seismometer (on ground contact foot)
      const seismo = new THREE.Mesh(new THREE.BoxGeometry(0.2, 0.15, 0.2), baseMat);
      seismo.position.set(-0.45, 7.7, -0.35);
      payGroup.add(seismo);

      // Mast with cameras
      const mast = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.05, 0.9, 8), mastMat);
      mast.position.set(0.3, 8.7, 0.4);
      payGroup.add(mast);

      const head = new THREE.Mesh(new THREE.BoxGeometry(0.25, 0.15, 0.2), baseMat);
      head.position.set(0.3, 9.2, 0.4);
      payGroup.add(head);
    } else if (config.payloadId === 'payload-surface-lander') {
      const domeMat = conflictMat('#e2e8f0', 'payload');
      const mastMat = new THREE.MeshStandardMaterial({ color: '#f59e0b', metalness: 0.5 });
      const lab = new THREE.Mesh(new THREE.BoxGeometry(0.9, 0.55, 0.85), domeMat);
      lab.position.y = 8.05;
      payGroup.add(lab);

      const mast = new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.06, 0.65, 8), mastMat);
      mast.position.set(0.2, 8.55, 0.15);
      payGroup.add(mast);

      const head = new THREE.Mesh(new THREE.BoxGeometry(0.28, 0.18, 0.2), domeMat);
      head.position.set(0.2, 8.9, 0.15);
      payGroup.add(head);
    } else {
      // Multispectral Earth Imager
      const camMat = conflictMat('#38bdf8', 'payload');
      const housing = new THREE.Mesh(new THREE.CylinderGeometry(0.42, 0.48, 0.85, 16), camMat);
      housing.position.y = 8.2;
      payGroup.add(housing);

      const lens = new THREE.Mesh(
        new THREE.CylinderGeometry(0.32, 0.32, 0.12, 16),
        new THREE.MeshStandardMaterial({ color: '#0ea5e9', emissive: '#0284c7', emissiveIntensity: 0.4 })
      );
      lens.position.y = 8.66;
      payGroup.add(lens);
    }
    root.add(payGroup);
  }

  // --- GLOWING 3D SNAP NODES (in VAB Hangar) ---
  if (showSnapRings) {
    const categories: SubsystemCategory[] = [
      'launcher',
      'structure',
      'thermal',
      'battery',
      'computer',
      'adcs',
      'power',
      'payload',
    ];
    for (const cat of categories) {
      const y = getCategorySlotY(cat);
      const isFilled = Boolean(
        config[
          cat === 'launcher'
            ? 'launcherId'
            : (`${cat}Id` as keyof SpacecraftConfig)
        ]
      );
      const isSelected = activeCategory === cat;
      const isConflict = conflictCategories.has(cat);

      const color = isConflict
        ? '#ef4444'
        : isSelected
          ? '#22d3ee'
          : isFilled
            ? '#10b981'
            : '#f59e0b';

      const ringGeom = new THREE.TorusGeometry(isSelected ? 1.15 : 0.95, 0.045, 8, 32);
      const ringMat = new THREE.MeshBasicMaterial({
        color,
        transparent: true,
        opacity: isSelected ? 0.95 : isFilled ? 0.38 : 0.78,
      });
      const snapRing = new THREE.Mesh(ringGeom, ringMat);
      snapRing.rotation.x = Math.PI / 2;
      snapRing.position.y = y;
      snapRing.name = `snap-${cat}`;
      snapRing.userData.snapCategory = cat;
      root.add(snapRing);

      // Invisible generous hit cylinder for reliable raycasting
      const hitGeom = new THREE.CylinderGeometry(1.25, 1.25, 0.55, 12);
      const hitMat = new THREE.MeshBasicMaterial({
        transparent: true,
        opacity: 0,
        depthWrite: false,
      });
      const hitMesh = new THREE.Mesh(hitGeom, hitMat);
      hitMesh.position.y = y;
      hitMesh.name = `snap-hit-${cat}`;
      hitMesh.userData.snapCategory = cat;
      root.add(hitMesh);
    }
  }

  return root;
}

export function createExhaustPlume(): THREE.Group {
  const group = new THREE.Group();
  group.name = 'exhaust-plume';

  const outerGeom = new THREE.ConeGeometry(0.48, 3.2, 16, 1, true);
  outerGeom.translate(0, -1.6, 0);
  const outerMat = new THREE.MeshBasicMaterial({
    color: '#f97316',
    transparent: true,
    opacity: 0.72,
    blending: THREE.AdditiveBlending,
    side: THREE.DoubleSide,
    depthWrite: false,
  });
  const outer = new THREE.Mesh(outerGeom, outerMat);
  group.add(outer);

  const innerGeom = new THREE.ConeGeometry(0.24, 2.0, 14, 1, true);
  innerGeom.translate(0, -1.0, 0);
  const innerMat = new THREE.MeshBasicMaterial({
    color: '#fef08a',
    transparent: true,
    opacity: 0.9,
    blending: THREE.AdditiveBlending,
    side: THREE.DoubleSide,
    depthWrite: false,
  });
  const inner = new THREE.Mesh(innerGeom, innerMat);
  group.add(inner);

  group.userData.update = (throttle: number, inVacuum: boolean, elapsed: number) => {
    if (throttle <= 0.01) {
      group.visible = false;
      return;
    }
    group.visible = true;
    const flicker = 0.88 + Math.sin(elapsed * 48) * 0.12;
    const widthScale = inVacuum ? 1.45 : 0.95;
    const lenScale = (0.45 + throttle * 1.25) * flicker;
    outer.scale.set(widthScale, lenScale, widthScale);
    inner.scale.set(widthScale * 0.85, lenScale * 0.9, widthScale * 0.85);
    outerMat.opacity = Math.min(0.85, 0.28 + throttle * 0.55);
  };

  return group;
}

export function createOrbitLine(
  points: THREE.Vector3[],
  color: number,
  opacity = 0.75
): THREE.Line {
  const geom = new THREE.BufferGeometry().setFromPoints(points);
  const mat = new THREE.LineBasicMaterial({
    color,
    transparent: opacity < 1,
    opacity,
  });
  return new THREE.Line(geom, mat);
}

export function createConeBeam(
  height: number,
  radius: number,
  color: number,
  opacity: number
): THREE.Mesh {
  const geom = new THREE.ConeGeometry(radius, height, 24, 1, true);
  // Tip at origin (0,0,0), flaring toward -Y or +Y; shift so tip is at (0,0,0) and base at +height
  geom.translate(0, -height / 2, 0);
  geom.rotateX(Math.PI);
  const mat = new THREE.MeshBasicMaterial({
    color,
    transparent: true,
    opacity,
    side: THREE.DoubleSide,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
  });
  return new THREE.Mesh(geom, mat);
}

// --- Particle System for Exhaust Plumes ---

interface ParticleSystem {
  points: THREE.Points;
  geometry: THREE.BufferGeometry;
  material: THREE.PointsMaterial;
  particles: {
    positions: Float32Array;
    sizes: Float32Array;
    colors: Float32Array;
    alphas: Float32Array;
    velocities: Float32Array;
    lifetimes: Float32Array;
    ages: Float32Array;
  };
  maxParticles: number;
  activeCount: number;
  update: (dt: number, throttle: number, inVacuum: boolean, stageType: 'kerolox' | 'hydrolox' | 'methalox' | 'ion') => void;
  dispose: () => void;
}

function createParticleTexture(): THREE.DataTexture {
  const size = 64;
  const data = new Uint8Array(size * size * 4);
  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      const dx = (x - size / 2) / (size / 2);
      const dy = (y - size / 2) / (size / 2);
      const dist = Math.sqrt(dx * dx + dy * dy);
      const alpha = dist < 1.0 ? Math.pow(1.0 - dist, 2.5) : 0;
      const idx = (y * size + x) * 4;
      data[idx] = 255;
      data[idx + 1] = 255;
      data[idx + 2] = 255;
      data[idx + 3] = Math.round(alpha * 255);
    }
  }
  const texture = new THREE.DataTexture(data, size, size, THREE.RGBAFormat);
  texture.needsUpdate = true;
  return texture;
}

const particleTexture = createParticleTexture();

export function createParticleSystem(
  maxParticles: number = 800,
  isMainEngine: boolean = true
): ParticleSystem {
  const geometry = new THREE.BufferGeometry();
  const positions = new Float32Array(maxParticles * 3);
  const sizes = new Float32Array(maxParticles);
  const colors = new Float32Array(maxParticles * 3);
  const alphas = new Float32Array(maxParticles);
  const velocities = new Float32Array(maxParticles * 3);
  const lifetimes = new Float32Array(maxParticles);
  const ages = new Float32Array(maxParticles);

  // Initialize all particles as dead
  for (let i = 0; i < maxParticles; i++) {
    lifetimes[i] = 0;
    ages[i] = 0;
    alphas[i] = 0;
    sizes[i] = 0;
  }

  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  geometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));
  geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
  geometry.setAttribute('alpha', new THREE.BufferAttribute(alphas, 1));

  // Stage-specific color palettes
  const keroloxColors = [
    new THREE.Color('#ff6b1a'),  // Hot amber
    new THREE.Color('#ff9500'),  // Orange
    new THREE.Color('#ffaa33'),  // Light orange
    new THREE.Color('#ffcc66'),  // Yellow-orange
    new THREE.Color('#ffdd99'),  // Pale yellow
  ];
  const hydroloxColors = [
    new THREE.Color('#88ccff'),  // Cyan-blue
    new THREE.Color('#aaddff'),  // Light cyan
    new THREE.Color('#ccffff'),  // Pale cyan
    new THREE.Color('#ffffff'),  // White hot core
    new THREE.Color('#eef8ff'),  // Very pale blue
  ];
  const methaloxColors = [
    new THREE.Color('#ff5500'),  // Deep orange
    new THREE.Color('#ff8822'),  // Orange
    new THREE.Color('#ffaa44'),  // Light orange
    new THREE.Color('#ffcc77'),  // Yellow-orange
    new THREE.Color('#ffeedd'),  // Pale cream
  ];
  const ionColors = [
    new THREE.Color('#bb88ff'),  // Violet
    new THREE.Color('#ccaaaa'),  // Light violet
    new THREE.Color('#ddccff'),  // Pale violet
    new THREE.Color('#eeeeff'),  // Almost white
    new THREE.Color('#ffffff'),  // White core
  ];

  const material = new THREE.PointsMaterial({
    size: 1.0,
    vertexColors: true,
    transparent: true,
    opacity: 1.0,
    sizeAttenuation: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    map: particleTexture,
    alphaMap: particleTexture,
    alphaTest: 0.001,
  });

  const points = new THREE.Points(geometry, material);
  points.frustumCulled = false;

  const system: ParticleSystem = {
    points,
    geometry,
    material,
    particles: { positions, sizes, colors, alphas, velocities, lifetimes, ages },
    maxParticles,
    activeCount: 0,
    update: (dt: number, throttle: number, inVacuum: boolean, stageType: 'kerolox' | 'hydrolox' | 'methalox' | 'ion') => {
      if (throttle <= 0.01) {
        // Fade out existing particles
        for (let i = 0; i < system.activeCount; i++) {
          ages[i] += dt;
          const lifeRatio = ages[i] / lifetimes[i];
          if (lifeRatio >= 1.0) {
            alphas[i] = 0;
            continue;
          }
          alphas[i] = Math.max(0, (1.0 - lifeRatio) * alphas[i]);

          // Continue physics
          positions[i * 3] += velocities[i * 3] * dt;
          positions[i * 3 + 1] += velocities[i * 3 + 1] * dt;
          positions[i * 3 + 2] += velocities[i * 3 + 2] * dt;

          // Gravity falloff for pad smoke
          if (!isMainEngine) {
            velocities[i * 3 + 1] -= 0.5 * dt; // gentle settling
          }
        }
        geometry.attributes.position.needsUpdate = true;
        geometry.attributes.alpha.needsUpdate = true;
        geometry.attributes.size.needsUpdate = true;
        return;
      }

      // Select color palette
      let palette: THREE.Color[];
      let baseSpeed: number;
      let spread: number;
      let particleLifetime: number;
      let particleSize: number;
      let spawnRate: number;

      switch (stageType) {
        case 'kerolox':
          palette = keroloxColors;
          baseSpeed = inVacuum ? 120 : 60;
          spread = inVacuum ? 0.45 : 0.25;
          particleLifetime = inVacuum ? 1.2 : 0.6;
          particleSize = inVacuum ? 2.8 : 1.5;
          spawnRate = 120;
          break;
        case 'hydrolox':
          palette = hydroloxColors;
          baseSpeed = inVacuum ? 180 : 90;
          spread = inVacuum ? 0.35 : 0.2;
          particleLifetime = inVacuum ? 1.0 : 0.5;
          particleSize = inVacuum ? 2.2 : 1.2;
          spawnRate = 100;
          break;
        case 'methalox':
          palette = methaloxColors;
          baseSpeed = inVacuum ? 150 : 75;
          spread = inVacuum ? 0.4 : 0.22;
          particleLifetime = inVacuum ? 1.1 : 0.55;
          particleSize = inVacuum ? 2.5 : 1.3;
          spawnRate = 110;
          break;
        case 'ion':
          palette = ionColors;
          baseSpeed = 300;
          spread = 0.08;
          particleLifetime = 2.0;
          particleSize = 0.8;
          spawnRate = 60;
          break;
      }

      const spawnCount = Math.floor(spawnRate * throttle * dt);
      const vacuumScale = inVacuum ? 1.5 : 1.0;

      // Spawn new particles
      for (let s = 0; s < spawnCount && system.activeCount < maxParticles; s++) {
        const idx = system.activeCount;
        system.activeCount++;

        // Position at engine exit (origin)
        positions[idx * 3] = (Math.random() - 0.5) * 0.1;
        positions[idx * 3 + 1] = 0;
        positions[idx * 3 + 2] = (Math.random() - 0.5) * 0.1;

        // Velocity: mainly backward with spread
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.random() * spread;
        const speed = baseSpeed * (0.7 + Math.random() * 0.6) * vacuumScale;

        velocities[idx * 3] = -Math.sin(phi) * Math.cos(theta) * speed;
        velocities[idx * 3 + 1] = Math.cos(phi) * speed + (Math.random() - 0.5) * 2;
        velocities[idx * 3 + 2] = -Math.sin(phi) * Math.sin(theta) * speed;

        // Lifetime and size
        lifetimes[idx] = particleLifetime * (0.7 + Math.random() * 0.6);
        ages[idx] = 0;
        alphas[idx] = 1.0;
        sizes[idx] = particleSize * (0.8 + Math.random() * 0.4) * vacuumScale;

        // Color from palette with variation
        const colorIdx = Math.floor(Math.random() * palette.length);
        const color = palette[colorIdx];
        colors[idx * 3] = color.r;
        colors[idx * 3 + 1] = color.g;
        colors[idx * 3 + 2] = color.b;
      }

      // Update existing particles
      let aliveCount = 0;
      for (let i = 0; i < system.activeCount; i++) {
        ages[i] += dt;
        const lifeRatio = ages[i] / lifetimes[i];

        if (lifeRatio >= 1.0) {
          alphas[i] = 0;
          continue;
        }

        aliveCount++;

        // Physics
        positions[i * 3] += velocities[i * 3] * dt;
        positions[i * 3 + 1] += velocities[i * 3 + 1] * dt;
        positions[i * 3 + 2] += velocities[i * 3 + 2] * dt;

        // Cooling/expansion
        const coolFactor = 1.0 - lifeRatio * 0.7;
        alphas[i] = coolFactor * coolFactor;
        sizes[i] = particleSize * (0.8 + Math.random() * 0.4) * (1.0 + lifeRatio * 1.5) * vacuumScale;

        // Color shift as it cools (shift toward red/orange for chemical, blue/violet for ion)
        if (stageType === 'ion') {
          const shift = lifeRatio * 0.3;
          colors[i * 3] = Math.min(1.0, colors[i * 3] + shift);
          colors[i * 3 + 1] = Math.min(1.0, colors[i * 3 + 1] + shift * 0.5);
        } else {
          const shift = lifeRatio * 0.4;
          colors[i * 3] = Math.min(1.0, colors[i * 3] + shift);
          colors[i * 3 + 1] = Math.max(0.0, colors[i * 3 + 1] - shift * 0.3);
        }
      }

      system.activeCount = aliveCount;
      geometry.attributes.position.needsUpdate = true;
      geometry.attributes.size.needsUpdate = true;
      geometry.attributes.color.needsUpdate = true;
      geometry.attributes.alpha.needsUpdate = true;
    },
    dispose: () => {
      geometry.dispose();
      material.dispose();
      particleTexture.dispose();
    },
  };

  return system;
}

// ---------------------------------------------------------------------------
// Launch complex. Origin = rocket base, +Y up, ground at y = 0, tallest tower
// top at y = 1.0. Clear radius 0.12 around origin. Children 'pad-arm-1',
// 'pad-arm-2' (hinge at tower, rotate .y to swing away) and 'pad-clamps'.
// ---------------------------------------------------------------------------
export function createLaunchPadModel(): THREE.Group {
  const root = new THREE.Group();
  root.name = 'launch-pad-model';

  const concreteMat = new THREE.MeshStandardMaterial({ color: '#b9b7b2', roughness: 0.9, metalness: 0.0 });
  const concreteDarkMat = new THREE.MeshStandardMaterial({ color: '#8f8d88', roughness: 0.95, metalness: 0.0 });
  const trenchMat = new THREE.MeshStandardMaterial({ color: '#0c0c0d', roughness: 1.0, metalness: 0.0 });
  const towerMat = new THREE.MeshStandardMaterial({ color: '#a8401f', roughness: 0.55, metalness: 0.5 });
  const steelMat = new THREE.MeshStandardMaterial({ color: '#8a8f96', roughness: 0.45, metalness: 0.6 });
  const clampMat = new THREE.MeshStandardMaterial({ color: '#3d4045', roughness: 0.5, metalness: 0.6 });
  const lampMat = new THREE.MeshStandardMaterial({
    color: '#fff1c9', emissive: '#ffcf80', emissiveIntensity: 2.2, roughness: 0.4, metalness: 0.0,
  });

  const add = (parent: THREE.Object3D, geo: THREE.BufferGeometry, mat: THREE.Material, x: number, y: number, z: number): THREE.Mesh => {
    const m = new THREE.Mesh(geo, mat);
    m.position.set(x, y, z);
    m.castShadow = false;
    m.receiveShadow = false;
    parent.add(m);
    return m;
  };

  // Pad slab: beveled concrete disc (lower wide skirt + slightly narrower top).
  const slabH = 0.03;
  add(root, new THREE.CylinderGeometry(0.53, 0.55, slabH * 0.7, 64), concreteMat, 0, slabH * 0.35, 0);
  add(root, new THREE.CylinderGeometry(0.515, 0.53, slabH * 0.3, 64), concreteMat, 0, slabH * 0.85, 0);
  // Inner pedestal ring around the rocket.
  add(root, new THREE.CylinderGeometry(0.115, 0.125, 0.012, 48), concreteDarkMat, 0, slabH + 0.006, 0);

  // Flame trench along +X: dark channel from under the rocket to the slab edge.
  const trenchLen = 0.5;
  const trench = add(root, new THREE.BoxGeometry(trenchLen, 0.004, 0.09), trenchMat, trenchLen / 2 + 0.02, slabH + 0.0015, 0);
  trench.name = 'pad-flame-trench';
  // Trench lip walls.
  add(root, new THREE.BoxGeometry(trenchLen, 0.01, 0.008), concreteDarkMat, trenchLen / 2 + 0.02, slabH + 0.005, 0.049);
  add(root, new THREE.BoxGeometry(trenchLen, 0.01, 0.008), concreteDarkMat, trenchLen / 2 + 0.02, slabH + 0.005, -0.049);
  // Dark exhaust hole directly under the rocket.
  add(root, new THREE.CylinderGeometry(0.06, 0.06, 0.004, 32), trenchMat, 0, slabH + 0.0135, 0);

  // Lattice service tower, centered at x = -0.22.
  const tower = new THREE.Group();
  tower.name = 'pad-tower';
  tower.position.set(-0.22, 0, 0);
  root.add(tower);
  const towerTop = 1.0;
  const mastH = 0.06;
  const legTop = towerTop - mastH; // lattice height; mast reaches exactly 1.0
  const half = 0.045;
  const beam = 0.008;
  const legH = legTop - slabH;
  const corners: Array<[number, number]> = [[-half, -half], [half, -half], [half, half], [-half, half]];
  for (const [cx, cz] of corners) {
    add(tower, new THREE.BoxGeometry(beam * 1.4, legH, beam * 1.4), towerMat, cx, slabH + legH / 2, cz);
  }
  const step = 0.12;
  const levels: number[] = [];
  for (let y = slabH; y <= legTop + 1e-6; y += step) levels.push(y);
  if (legTop - levels[levels.length - 1] > 0.02) levels.push(legTop);
  const span = half * 2;
  for (const y of levels) {
    add(tower, new THREE.BoxGeometry(span, beam, beam), towerMat, 0, y, -half);
    add(tower, new THREE.BoxGeometry(span, beam, beam), towerMat, 0, y, half);
    add(tower, new THREE.BoxGeometry(beam, beam, span), towerMat, -half, y, 0);
    add(tower, new THREE.BoxGeometry(beam, beam, span), towerMat, half, y, 0);
  }
  // Diagonal braces on each face, alternating direction per bay.
  for (let i = 0; i < levels.length - 1; i++) {
    const y0 = levels[i];
    const y1 = levels[i + 1];
    const dy = y1 - y0;
    const len = Math.hypot(span, dy);
    const ang = Math.atan2(dy, span) * (i % 2 === 0 ? 1 : -1);
    const ym = (y0 + y1) / 2;
    // Faces normal to Z (brace lies in XY plane).
    for (const z of [-half, half]) {
      const b = add(tower, new THREE.BoxGeometry(len, beam * 0.7, beam * 0.7), towerMat, 0, ym, z);
      b.rotation.z = ang;
    }
    // Faces normal to X (brace lies in ZY plane).
    for (const x of [-half, half]) {
      const b = add(tower, new THREE.BoxGeometry(beam * 0.7, beam * 0.7, len), towerMat, x, ym, 0);
      b.rotation.x = -ang;
    }
  }
  // Top deck and lightning mast (tip at y = 1.0 exactly).
  add(tower, new THREE.BoxGeometry(span + 0.02, 0.008, span + 0.02), steelMat, 0, legTop + 0.004, 0);
  add(tower, new THREE.CylinderGeometry(0.0025, 0.004, mastH - 0.008, 8), steelMat, 0, legTop + 0.008 + (mastH - 0.008) / 2, 0);

  // Swing arms: hinge at the tower's rocket-facing face (+X side), reaching toward origin.
  const hingeX = -0.22 + half;
  const armReach = Math.abs(hingeX) - 0.115; // stop just short of the rocket clear circle
  const makeArm = (name: string, y: number): void => {
    const arm = new THREE.Group();
    arm.name = name;
    arm.position.set(hingeX, y, 0);
    add(arm, new THREE.BoxGeometry(armReach, 0.014, 0.022), towerMat, armReach / 2, 0, 0);
    add(arm, new THREE.BoxGeometry(armReach, 0.004, 0.026), steelMat, armReach / 2, 0.009, 0);
    // Umbilical plate at the rocket end.
    add(arm, new THREE.BoxGeometry(0.008, 0.03, 0.03), clampMat, armReach, 0, 0);
    // Hinge pin.
    add(arm, new THREE.CylinderGeometry(0.006, 0.006, 0.03, 10), steelMat, 0, 0, 0);
    root.add(arm);
  };
  makeArm('pad-arm-1', 0.55);
  makeArm('pad-arm-2', 0.85);

  // Hold-down clamps at the rocket base (four, just outside the clear circle).
  const clamps = new THREE.Group();
  clamps.name = 'pad-clamps';
  root.add(clamps);
  for (let i = 0; i < 4; i++) {
    const a = Math.PI / 4 + (i * Math.PI) / 2;
    const r = 0.135;
    const c = new THREE.Group();
    c.position.set(Math.cos(a) * r, slabH + 0.012, Math.sin(a) * r);
    c.rotation.y = -a;
    add(c, new THREE.BoxGeometry(0.022, 0.024, 0.02), clampMat, 0, 0, 0);
    const jaw = add(c, new THREE.BoxGeometry(0.014, 0.008, 0.016), steelMat, -0.012, 0.012, 0);
    jaw.rotation.z = 0.35;
    clamps.add(c);
  }

  // Floodlight poles with emissive heads (no real lights).
  const poles: Array<[number, number]> = [[0.36, 0.3], [0.3, -0.36], [-0.4, -0.25]];
  for (const [px, pz] of poles) {
    const poleH = 0.32;
    add(root, new THREE.CylinderGeometry(0.004, 0.006, poleH, 8), steelMat, px, slabH + poleH / 2, pz);
    const head = new THREE.Group();
    head.position.set(px, slabH + poleH, pz);
    head.lookAt(0, 0.3, 0);
    add(head, new THREE.BoxGeometry(0.03, 0.02, 0.012), clampMat, 0, 0, 0);
    add(head, new THREE.BoxGeometry(0.026, 0.016, 0.002), lampMat, 0, 0, 0.007);
    root.add(head);
  }

  root.traverse((o) => {
    o.castShadow = false;
    o.receiveShadow = false;
  });
  return root;
}
