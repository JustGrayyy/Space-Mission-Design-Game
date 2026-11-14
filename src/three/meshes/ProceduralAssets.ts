import * as THREE from 'three';
import type { SpacecraftConfig, SubsystemCategory } from '../../core/types';

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
        const std = m as THREE.MeshStandardMaterial;
        std.map?.dispose();
        std.emissiveMap?.dispose();
        std.bumpMap?.dispose();
        m.dispose();
      }
    }
  });
}

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

export function createPlanetMesh(
  kind: 'EARTH' | 'MOON' | 'MARS',
  radiusUnits: number
): THREE.Group {
  const group = new THREE.Group();
  group.name = `planet-${kind.toLowerCase()}`;

  const tex = makePlanetCanvasTexture(kind);
  const segs = 40;
  const geom = new THREE.SphereGeometry(radiusUnits, segs, segs);
  const mat = new THREE.MeshStandardMaterial({
    map: tex,
    roughness: kind === 'EARTH' ? 0.65 : 0.9,
    metalness: 0.05,
  });

  const body = new THREE.Mesh(geom, mat);
  body.name = `${kind.toLowerCase()}-surface`;
  group.add(body);

  if (kind === 'EARTH' || kind === 'MARS') {
    // Atmospheric Fresnel rim glow
    const rimGeom = new THREE.SphereGeometry(radiusUnits * 1.045, segs, segs);
    const rimColor =
      kind === 'EARTH' ? new THREE.Color('#3ca8ff') : new THREE.Color('#ff8c5a');
    const rimMat = new THREE.ShaderMaterial({
      uniforms: {
        glowColor: { value: rimColor },
      },
      vertexShader: `
        varying vec3 vNormal;
        varying vec3 vViewPosition;
        void main() {
          vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
          vNormal = normalize(normalMatrix * normal);
          vViewPosition = -mvPosition.xyz;
          gl_Position = projectionMatrix * mvPosition;
        }
      `,
      fragmentShader: `
        uniform vec3 glowColor;
        varying vec3 vNormal;
        varying vec3 vViewPosition;
        void main() {
          vec3 viewDir = normalize(vViewPosition);
          float fresnel = pow(1.0 - max(dot(vNormal, viewDir), 0.0), 2.8);
          gl_FragColor = vec4(glowColor, fresnel * 0.72);
        }
      `,
      transparent: true,
      blending: THREE.AdditiveBlending,
      side: THREE.FrontSide,
      depthWrite: false,
    });
    const rim = new THREE.Mesh(rimGeom, rimMat);
    rim.name = `${kind.toLowerCase()}-atmosphere`;
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
            : 0.78;

  const bodyMat = new THREE.MeshStandardMaterial({
    color: '#d8dee9',
    roughness: 0.4,
    metalness: 0.35,
  });
  const darkMat = new THREE.MeshStandardMaterial({
    color: '#1e293b',
    roughness: 0.5,
    metalness: 0.6,
  });

  const core = new THREE.Mesh(
    new THREE.CylinderGeometry(0.55 * scaleW, 0.58 * scaleW, 3.6, 20),
    bodyMat
  );
  core.position.y = 0;
  group.add(core);

  const nozzle = new THREE.Mesh(
    new THREE.ConeGeometry(0.32 * scaleW, 0.55, 16),
    darkMat
  );
  nozzle.position.y = -2.0;
  group.add(nozzle);

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

    const hullMat = conflictMat('#e2e8f0', 'launcher');
    const accentMat = new THREE.MeshStandardMaterial({
      color:
        launcherId === 'launcher-super-heavy'
          ? '#ef4444'
          : launcherId === 'launcher-heavy'
            ? '#f97316'
            : launcherId === 'launcher-medium-heavy'
              ? '#f59e0b'
              : launcherId === 'launcher-medium'
                ? '#0ea5e9'
                : '#22c55e',
      roughness: 0.4,
      metalness: 0.3,
    });
    const engineMat = new THREE.MeshStandardMaterial({
      color: '#1e293b',
      roughness: 0.5,
      metalness: 0.7,
    });

    if (!hideStage1) {
      // Stage 1 Core
      const s1 = new THREE.Mesh(
        new THREE.CylinderGeometry(0.55 * lvScaleW, 0.6 * lvScaleW, 3.6, 24),
        hullMat
      );
      s1.position.y = 2.0;
      lvGroup.add(s1);

      // Stripe
      const stripe = new THREE.Mesh(
        new THREE.CylinderGeometry(0.56 * lvScaleW, 0.56 * lvScaleW, 0.35, 24),
        accentMat
      );
      stripe.position.y = 3.2;
      lvGroup.add(stripe);

      // Side boosters for Heavy and Super-Heavy
      if (launcherId === 'launcher-heavy' || launcherId === 'launcher-super-heavy') {
        const boosterPositions = launcherId === 'launcher-super-heavy'
          ? [-1.5, -0.5, 0.5, 1.5]
          : [-1, 1];

        for (const side of boosterPositions) {
          const boosterScale = launcherId === 'launcher-super-heavy' ? 0.4 : 0.32;
          const booster = new THREE.Mesh(
            new THREE.CylinderGeometry(boosterScale, boosterScale * 1.06, 3.1, 16),
            hullMat
          );
          booster.position.set(side * (0.98 * (launcherId === 'launcher-super-heavy' ? 1.3 : 1)), 1.75, 0);
          lvGroup.add(booster);

          const nose = new THREE.Mesh(new THREE.ConeGeometry(boosterScale, 0.6, 16), accentMat);
          nose.position.set(side * (0.98 * (launcherId === 'launcher-super-heavy' ? 1.3 : 1)), 3.6, 0);
          lvGroup.add(nose);

          const bNozzle = new THREE.Mesh(new THREE.ConeGeometry(boosterScale * 0.75, 0.45, 14), engineMat);
          bNozzle.position.set(side * (0.98 * (launcherId === 'launcher-super-heavy' ? 1.3 : 1)), 0.05, 0);
          lvGroup.add(bNozzle);
        }
      } else if (launcherId === 'launcher-medium-heavy') {
        // Medium-Heavy has 2 smaller strap-on boosters
        for (const side of [-1, 1]) {
          const booster = new THREE.Mesh(
            new THREE.CylinderGeometry(0.24, 0.26, 2.8, 12),
            hullMat
          );
          booster.position.set(side * 0.88, 1.6, 0);
          lvGroup.add(booster);

          const nose = new THREE.Mesh(new THREE.ConeGeometry(0.24, 0.5, 12), accentMat);
          nose.position.set(side * 0.88, 3.3, 0);
          lvGroup.add(nose);

          const bNozzle = new THREE.Mesh(new THREE.ConeGeometry(0.18, 0.4, 10), engineMat);
          bNozzle.position.set(side * 0.88, 0.05, 0);
          lvGroup.add(bNozzle);
        }
      }

      // Main Engine Bell
      const bell = new THREE.Mesh(
        new THREE.ConeGeometry(0.36 * lvScaleW, 0.55, 18),
        engineMat
      );
      bell.position.y = 0.05;
      lvGroup.add(bell);
    }

    // Interstage + Stage 2
    const s2 = new THREE.Mesh(
      new THREE.CylinderGeometry(0.48 * lvScaleW, 0.54 * lvScaleW, 1.55, 24),
      hullMat
    );
    s2.position.y = 4.65;
    lvGroup.add(s2);

    const s2Bell = new THREE.Mesh(
      new THREE.ConeGeometry(0.25 * lvScaleW, 0.35, 14),
      engineMat
    );
    s2Bell.position.y = 3.78;
    lvGroup.add(s2Bell);

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
