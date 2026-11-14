import {
  COMMS_BANDS,
  DEEP_SPACE_ORBIT_M,
  EARTH_ATM_TOP_M,
  EARTH_MU,
  EARTH_RADIUS_M,
  EARTH_RHO0,
  EARTH_ROT_RATE,
  EARTH_SCALE_HEIGHT_M,
  G0,
  GROUND_STATIONS_BY_ID,
  LAUNCHERS_BY_ID,
  MARS_ANGULAR_RATE,
  MARS_ATM_TOP_M,
  MARS_MU,
  MARS_RADIUS_M,
  MARS_RHO0,
  MARS_SCALE_HEIGHT_M,
  MARS_SOI_M,
  MARS_TRANSFER_M,
  MISSIONS,
  MOON_ANGULAR_RATE,
  MOON_MU,
  MOON_ORBIT_M,
  MOON_RADIUS_M,
  MOON_SOI_M,
  PARTS_BY_ID,
  SUN_DIRECTION,
} from './constants';
import type {
  DifficultyMode,
  FlightControls,
  FlightEvent,
  FlightState,
  FlightStatus,
  GroundConfig,
  MissionId,
  OrbitalElements,
  SpacecraftConfig,
  SpacecraftPart,
  Vec3,
} from './types';

// --- Vector math helpers ---
export function vecAdd(a: Vec3, b: Vec3): Vec3 {
  return { x: a.x + b.x, y: a.y + b.y, z: a.z + b.z };
}

export function vecSub(a: Vec3, b: Vec3): Vec3 {
  return { x: a.x - b.x, y: a.y - b.y, z: a.z - b.z };
}

export function vecScale(a: Vec3, s: number): Vec3 {
  return { x: a.x * s, y: a.y * s, z: a.z * s };
}

export function vecDot(a: Vec3, b: Vec3): number {
  return a.x * b.x + a.y * b.y + a.z * b.z;
}

export function vecCross(a: Vec3, b: Vec3): Vec3 {
  return {
    x: a.y * b.z - a.z * b.y,
    y: a.z * b.x - a.x * b.z,
    z: a.x * b.y - a.y * b.x,
  };
}

export function vecLen(a: Vec3): number {
  return Math.sqrt(a.x * a.x + a.y * a.y + a.z * a.z);
}

export function vecNorm(a: Vec3): Vec3 {
  const l = vecLen(a);
  if (l < 1e-9) return { x: 0, y: 0, z: 0 };
  return { x: a.x / l, y: a.y / l, z: a.z / l };
}

// --- Celestial Body Ephemerides (in X-Z equatorial plane) ---
// Moon starts at ~115 deg and Mars at ~165 deg so first/second LEO orbit hits clean Hohmann window
const MOON_PHASE_0 = 2.0;
const MARS_PHASE_0 = 2.85;

export function getMoonState(elapsedSec: number): { pos: Vec3; vel: Vec3 } {
  const angle = MOON_PHASE_0 + MOON_ANGULAR_RATE * elapsedSec;
  const speed = MOON_ORBIT_M * MOON_ANGULAR_RATE;
  return {
    pos: {
      x: MOON_ORBIT_M * Math.cos(angle),
      y: 0,
      z: MOON_ORBIT_M * Math.sin(angle),
    },
    vel: {
      x: -speed * Math.sin(angle),
      y: 0,
      z: speed * Math.cos(angle),
    },
  };
}

export function getMarsState(elapsedSec: number): { pos: Vec3; vel: Vec3 } {
  const angle = MARS_PHASE_0 + MARS_ANGULAR_RATE * elapsedSec;
  const speed = MARS_TRANSFER_M * MARS_ANGULAR_RATE;
  return {
    pos: {
      x: MARS_TRANSFER_M * Math.cos(angle),
      y: 0,
      z: MARS_TRANSFER_M * Math.sin(angle),
    },
    vel: {
      x: -speed * Math.sin(angle),
      y: 0,
      z: speed * Math.cos(angle),
    },
  };
}

export function computeOrbitalElements(
  pos: Vec3,
  vel: Vec3,
  mu: number = EARTH_MU,
  bodyRadiusM: number = EARTH_RADIUS_M,
  atmTopM: number = EARTH_ATM_TOP_M
): OrbitalElements {
  const r = vecLen(pos);
  const v = vecLen(vel);
  const altitudeM = r - bodyRadiusM;

  const specificEnergy = (v * v) / 2 - mu / Math.max(r, 1);
  const h = vecCross(pos, vel);
  const vCrossH = vecCross(vel, h);
  const eVec = vecSub(vecScale(vCrossH, 1 / mu), vecNorm(pos));
  const eccentricity = vecLen(eVec);

  let semiMajorAxisM: number;
  let apoapsisAltM: number;
  let periapsisAltM: number;
  let periodSec: number;

  if (specificEnergy >= -1e-6) {
    // Hyperbolic / escape
    semiMajorAxisM = -mu / (2 * Math.max(specificEnergy, 1e-3));
    const rp = (vecLen(h) * vecLen(h)) / (mu * (1 + eccentricity));
    periapsisAltM = rp - bodyRadiusM;
    apoapsisAltM = Infinity;
    periodSec = Infinity;
  } else {
    semiMajorAxisM = -mu / (2 * specificEnergy);
    const ra = semiMajorAxisM * (1 + eccentricity);
    const rp = semiMajorAxisM * (1 - eccentricity);
    apoapsisAltM = ra - bodyRadiusM;
    periapsisAltM = rp - bodyRadiusM;
    periodSec = 2 * Math.PI * Math.sqrt(Math.pow(semiMajorAxisM, 3) / mu);
  }

  const isDecaying = periapsisAltM < atmTopM && altitudeM > 0;

  return {
    semiMajorAxisM,
    eccentricity,
    apoapsisAltM,
    periapsisAltM,
    periodSec,
    speedMs: v,
    altitudeM,
    isDecaying,
  };
}

export function isInEclipseShadow(
  pos: Vec3,
  bodyCenter: Vec3 = { x: 0, y: 0, z: 0 },
  bodyRadiusM: number = EARTH_RADIUS_M,
  sunDir: Vec3 = SUN_DIRECTION
): boolean {
  const rel = vecSub(pos, bodyCenter);
  const sunNorm = vecNorm(sunDir);
  const alongSun = vecDot(rel, sunNorm);
  if (alongSun >= 0) return false; // Sunlit hemisphere

  const proj = vecScale(sunNorm, alongSun);
  const perp = vecSub(rel, proj);
  return vecLen(perp) < bodyRadiusM * 0.99;
}

export function getGroundStationWorldPos(stationId: string, elapsedSec: number): Vec3 {
  const st = GROUND_STATIONS_BY_ID[stationId];
  if (!st) return { x: EARTH_RADIUS_M, y: 0, z: 0 };
  const latRad = (st.latDeg * Math.PI) / 180;
  const lonRad = (st.lonDeg * Math.PI) / 180 + EARTH_ROT_RATE * elapsedSec;
  const r = st.isOrbitalRelay ? EARTH_RADIUS_M * 2.2 : EARTH_RADIUS_M;
  return {
    x: r * Math.cos(latRad) * Math.cos(lonRad),
    y: r * Math.sin(latRad),
    z: r * Math.cos(latRad) * Math.sin(lonRad),
  };
}

export function getVisibleGroundStations(
  craftPos: Vec3,
  elapsedSec: number,
  stationIds: string[]
): string[] {
  const visible: string[] = [];
  const craftDist = vecLen(craftPos);
  if (craftDist < EARTH_RADIUS_M * 0.95) return visible;

  for (const id of stationIds) {
    const st = GROUND_STATIONS_BY_ID[id];
    if (!st) continue;

    if (st.isOrbitalRelay) {
      // Relay constellation sees spacecraft unless occluded directly behind Earth from relay ring
      visible.push(id);
      continue;
    }

    const stPos = getGroundStationWorldPos(id, elapsedSec);
    const stNormal = vecNorm(stPos);
    const toCraft = vecSub(craftPos, stPos);
    const toCraftLen = vecLen(toCraft);
    if (toCraftLen < 1) {
      visible.push(id);
      continue;
    }

    const sinElev = vecDot(stNormal, toCraft) / toCraftLen;
    const minSin = Math.sin((st.minElevationDeg * Math.PI) / 180);
    if (sinElev >= minSin) {
      visible.push(id);
    }
  }

  return visible;
}

function getSelectedParts(config: SpacecraftConfig): SpacecraftPart[] {
  const ids = [
    config.structureId,
    config.powerId,
    config.batteryId,
    config.computerId,
    config.adcsId,
    config.thermalId,
    config.payloadId,
  ];
  return ids
    .map((id) => (id ? PARTS_BY_ID[id] : undefined))
    .filter((p): p is SpacecraftPart => Boolean(p));
}

function computeDeltaVRemaining(
  spacecraftDryKg: number,
  launcherId: string | null,
  activeStageIndex: 0 | 1,
  stage1PropKg: number,
  stage2PropKg: number
): number {
  const launcher = launcherId ? LAUNCHERS_BY_ID[launcherId] : undefined;
  if (!launcher) return 0;

  let dv = 0;
  if (activeStageIndex === 0 && stage1PropKg > 0) {
    const m0 =
      spacecraftDryKg +
      launcher.stage2DryKg +
      stage2PropKg +
      launcher.stage1DryKg +
      stage1PropKg;
    const mf = m0 - stage1PropKg;
    dv += launcher.stage1IspS * G0 * Math.log(m0 / mf);
  }
  if (stage2PropKg > 0) {
    const m0 = spacecraftDryKg + launcher.stage2DryKg + stage2PropKg;
    const mf = spacecraftDryKg + launcher.stage2DryKg;
    dv += launcher.stage2IspS * G0 * Math.log(m0 / mf);
  }
  return dv;
}

export function createInitialFlightState(
  missionId: MissionId,
  spacecraftConfig: SpacecraftConfig,
  groundConfig: GroundConfig,
  flightAssistEnabled: boolean = true
): FlightState {
  const parts = getSelectedParts(spacecraftConfig);
  const spacecraftDryKg = parts.reduce((s, p) => s + p.massKg, 0);
  const launcher = spacecraftConfig.launcherId
    ? LAUNCHERS_BY_ID[spacecraftConfig.launcherId]
    : undefined;
  const battery = spacecraftConfig.batteryId
    ? PARTS_BY_ID[spacecraftConfig.batteryId]
    : undefined;
  const computer = spacecraftConfig.computerId
    ? PARTS_BY_ID[spacecraftConfig.computerId]
    : undefined;

  const stage1PropKg = launcher?.stage1PropKg ?? 0;
  const stage2PropKg = launcher?.stage2PropKg ?? 0;
  const batteryMaxWh = battery?.capacityWh ?? 180;
  const storageMaxMb = computer?.storageMb ?? 400;

  const startPos: Vec3 = { x: EARTH_RADIUS_M, y: 0, z: 0 };
  const startVel: Vec3 = { x: 0, y: 0, z: 0 };

  const moon = getMoonState(0);
  const mars = getMarsState(0);

  return {
    position: startPos,
    velocity: startVel,
    heading: { x: 1, y: 0, z: 0 },
    throttle: 0,
    activeStageIndex: 0,
    stage1PropKg,
    stage2PropKg,
    batteryWh: batteryMaxWh,
    batteryMaxWh,
    onboardDataMb: 0,
    storageMaxMb,
    deliveredDataMb: 0,
    droppedDataMb: 0,
    observationProgress: 0,
    targetAchieved: false,
    elapsedFlightSec: 0,
    timeWarp: 1,
    flightAssistEnabled,
    status: 'PRELAUNCH',
    failureReason: null,
    inEclipse: false,
    activeDsnStationIds: getVisibleGroundStations(
      startPos,
      0,
      groundConfig.activeStationIds
    ),
    currentPowerGenW: 0,
    currentPowerDrawW: 0,
    deltaVRemainingMs: computeDeltaVRemaining(
      spacecraftDryKg,
      spacecraftConfig.launcherId,
      0,
      stage1PropKg,
      stage2PropKg
    ),
    deltaVExpendedMs: 0,
    orbitalElements: computeOrbitalElements(startPos, startVel),
    targetPhaseStatus: {
      moonDistanceM: vecLen(vecSub(startPos, moon.pos)),
      marsDistanceM: vecLen(vecSub(startPos, mars.pos)),
      lunarCaptureProgress: 0,
      marsCaptureProgress: 0,
      landedOnTarget: false,
      targetOrbitAchieved: false,
    },
    events: [
      {
        timeSec: 0,
        kind: 'INFO',
        message: `Vehicle on launchpad for ${MISSIONS[missionId].title}. Ready for ignition.`,
      },
    ],
    minBatteryPct: 100,
    peakDynamicPressurePa: 0,
    enteredOrbitAtSec: null,
    reachedTargetAtSec: null,
  };
}

function pushEvent(
  events: FlightEvent[],
  timeSec: number,
  kind: FlightEvent['kind'],
  message: string
) {
  const last = events[events.length - 1];
  if (last && last.message === message) return;
  events.push({ timeSec, kind, message });
  if (events.length > 60) {
    events.shift();
  }
}

function computeGravityAccel(
  pos: Vec3,
  elapsedSec: number,
  missionId: MissionId
): Vec3 {
  // Primary Earth gravity
  const r2 = pos.x * pos.x + pos.y * pos.y + pos.z * pos.z;
  const r = Math.sqrt(Math.max(r2, EARTH_RADIUS_M * EARTH_RADIUS_M * 0.5));
  let acc = vecScale(pos, -EARTH_MU / (r * r * r));

  // Target body gravity when relevant
  if (missionId === 'MOON_LANDING') {
    const moon = getMoonState(elapsedSec);
    const rel = vecSub(pos, moon.pos);
    const d = vecLen(rel);
    if (d < MOON_SOI_M * 1.4) {
      const dm = Math.max(d, MOON_RADIUS_M * 0.5);
      acc = vecAdd(acc, vecScale(rel, -MOON_MU / (dm * dm * dm)));
    }
  } else if (missionId === 'MARS_LANDING') {
    const mars = getMarsState(elapsedSec);
    const rel = vecSub(pos, mars.pos);
    const d = vecLen(rel);
    if (d < MARS_SOI_M * 1.4) {
      const dm = Math.max(d, MARS_RADIUS_M * 0.5);
      acc = vecAdd(acc, vecScale(rel, -MARS_MU / (dm * dm * dm)));
    }
  }

  return acc;
}

export function stepFlightSimulation(
  prevState: FlightState,
  missionId: MissionId,
  spacecraftConfig: SpacecraftConfig,
  groundConfig: GroundConfig,
  controls: FlightControls,
  dtSec: number,
  _mode: DifficultyMode
): FlightState {
  if (
    prevState.status === 'SUCCESS' ||
    prevState.status === 'FAILED' ||
    dtSec <= 0
  ) {
    return prevState;
  }

  const mission = MISSIONS[missionId];
  const parts = getSelectedParts(spacecraftConfig);
  const structure = spacecraftConfig.structureId
    ? PARTS_BY_ID[spacecraftConfig.structureId]
    : undefined;
  const power = spacecraftConfig.powerId
    ? PARTS_BY_ID[spacecraftConfig.powerId]
    : undefined;
  const computer = spacecraftConfig.computerId
    ? PARTS_BY_ID[spacecraftConfig.computerId]
    : undefined;
  const adcs = spacecraftConfig.adcsId
    ? PARTS_BY_ID[spacecraftConfig.adcsId]
    : undefined;
  const thermal = spacecraftConfig.thermalId
    ? PARTS_BY_ID[spacecraftConfig.thermalId]
    : undefined;
  const payload = spacecraftConfig.payloadId
    ? PARTS_BY_ID[spacecraftConfig.payloadId]
    : undefined;
  const launcher = spacecraftConfig.launcherId
    ? LAUNCHERS_BY_ID[spacecraftConfig.launcherId]
    : undefined;

  const spacecraftDryKg = parts.reduce((s, p) => s + p.massKg, 0);
  const band = COMMS_BANDS[groundConfig.bandId];

  // Clone mutable working state
  let pos = { ...prevState.position };
  let vel = { ...prevState.velocity };
  let heading = { ...prevState.heading };
  let throttle = Math.max(0, Math.min(1, controls.throttle));
  let activeStageIndex: 0 | 1 = prevState.activeStageIndex;
  let stage1PropKg = prevState.stage1PropKg;
  let stage2PropKg = prevState.stage2PropKg;
  let batteryWh = prevState.batteryWh;
  const batteryMaxWh = prevState.batteryMaxWh;
  let onboardDataMb = prevState.onboardDataMb;
  let deliveredDataMb = prevState.deliveredDataMb;
  let droppedDataMb = prevState.droppedDataMb;
  let observationProgress = prevState.observationProgress;
  let targetAchieved = prevState.targetAchieved;
  let elapsed = prevState.elapsedFlightSec;
  let status: FlightStatus = prevState.status as FlightStatus;
  let failureReason = prevState.failureReason;
  let deltaVExpendedMs = prevState.deltaVExpendedMs;
  let minBatteryPct = prevState.minBatteryPct;
  let peakDynamicPressurePa = prevState.peakDynamicPressurePa;
  let enteredOrbitAtSec = prevState.enteredOrbitAtSec;
  let reachedTargetAtSec = prevState.reachedTargetAtSec;
  let landedOnTarget = prevState.targetPhaseStatus.landedOnTarget;
  let targetOrbitAchieved = prevState.targetPhaseStatus.targetOrbitAchieved;
  let lunarCaptureProgress = prevState.targetPhaseStatus.lunarCaptureProgress;
  let marsCaptureProgress = prevState.targetPhaseStatus.marsCaptureProgress;
  const events = [...prevState.events];

  // Sub-step integration so even 500x time warp stays numerically accurate
  const maxSubStep = 0.25;
  const steps = Math.max(1, Math.ceil(dtSec / maxSubStep));
  const h = dtSec / steps;

  let lastInEclipse = prevState.inEclipse;
  let lastPowerGenW = prevState.currentPowerGenW;
  let lastPowerDrawW = prevState.currentPowerDrawW;

  // Compute time warp step-down for landing missions (once per frame, not per sub-step)
  let timeWarp = prevState.timeWarp;
  if (missionId === 'MOON_LANDING' || missionId === 'MARS_LANDING') {
    const isMoon = missionId === 'MOON_LANDING';
    const moon = getMoonState(0);
    const mars = getMarsState(0);
    const relPos = isMoon ? vecSub({ x: EARTH_RADIUS_M, y: 0, z: 0 }, moon.pos) : vecSub({ x: EARTH_RADIUS_M, y: 0, z: 0 }, mars.pos);
    const targetRadius = isMoon ? MOON_RADIUS_M : MARS_RADIUS_M;
    const targetAlt = vecLen(relPos) - targetRadius;

    if (targetAlt < 15_000 && prevState.timeWarp > 1) {
      timeWarp = 1;
    } else if (targetAlt < 100_000 && prevState.timeWarp > 10) {
      timeWarp = Math.min(prevState.timeWarp, 10);
    } else if (targetAlt < 500_000 && prevState.timeWarp > 50) {
      timeWarp = Math.min(prevState.timeWarp, 50);
    }
  }

  for (let i = 0; i < steps; i++) {
    if (status === 'SUCCESS' || status === 'FAILED') break;

    const r = vecLen(pos);
    const alt = r - EARTH_RADIUS_M;
    const up = vecNorm(pos);
    // Counterclockwise tangent in X-Z plane
    const east = vecNorm({ x: -up.z, y: 0, z: up.x });
    const orbElem = computeOrbitalElements(pos, vel);

    // Check Moon/Mars proximity
    const moon = getMoonState(elapsed);
    const mars = getMarsState(elapsed);
    const relMoonPos = vecSub(pos, moon.pos);
    const relMoonVel = vecSub(vel, moon.vel);
    const moonDist = vecLen(relMoonPos);
    const relMarsPos = vecSub(pos, mars.pos);
    const relMarsVel = vecSub(vel, mars.vel);
    const marsDist = vecLen(relMarsPos);

    // Check if landed and locked on target surface
    if (landedOnTarget) {
      if (missionId === 'MOON_LANDING') {
        const surfDir = vecNorm(relMoonPos);
        pos = vecAdd(moon.pos, vecScale(surfDir, MOON_RADIUS_M));
        vel = { ...moon.vel };
      } else if (missionId === 'MARS_LANDING') {
        const surfDir = vecNorm(relMarsPos);
        pos = vecAdd(mars.pos, vecScale(surfDir, MARS_RADIUS_M));
        vel = { ...mars.vel };
      }
      throttle = 0;
    }

    // Manual stage request
    if (controls.stageRequested && activeStageIndex === 0) {
      activeStageIndex = 1;
      stage1PropKg = 0;
      pushEvent(events, elapsed, 'MILESTONE', 'Stage 1 separation confirmed.');
    }

    // Auto-stage on S1 burnout
    if (activeStageIndex === 0 && stage1PropKg <= 0.01) {
      activeStageIndex = 1;
      stage1PropKg = 0;
      pushEvent(events, elapsed, 'MILESTONE', 'MECO & Stage 2 ignition.');
    }

    // Prelaunch check
    if (status === 'PRELAUNCH') {
      if (throttle > 0 || (prevState.flightAssistEnabled && controls.autoGuidance)) {
        status = 'ASCENT';
        pushEvent(events, elapsed, 'MILESTONE', 'Liftoff! Booster ignition confirmed.');
      } else {
        // Keep sitting on pad
        elapsed += h;
        continue;
      }
    }

    // Guidance (Flight Assist vs Manual)
    const assistActive = prevState.flightAssistEnabled || Boolean(controls.autoGuidance);
    const hasManualSteer =
      Math.abs(controls.pitchInput) > 0.05 || Math.abs(controls.yawInput) > 0.05;

    if (hasManualSteer) {
      // Manual pitch/yaw adjustment in orbital plane & out-of-plane
      const pitchStep = controls.pitchInput * 1.2 * h;
      const yawStep = controls.yawInput * 1.2 * h;
      heading = vecNorm({
        x: heading.x + up.x * pitchStep,
        y: heading.y + yawStep,
        z: heading.z + up.z * pitchStep,
      });
    } else if (assistActive && !landedOnTarget) {
      // Flight Assist autopilot per flight phase
      if (status === 'ASCENT') {
        const targetParkAlt = mission.targetType === 'LEO' ? 215_000 : 120_000;
        const radialVel = vecDot(vel, up);

        if (alt < 1_500) {
          heading = up;
          throttle = 1.0;
        } else if (alt < 42_000) {
          const frac = Math.min(1, (alt - 1_500) / 40_500);
          const pitchFromVertical = Math.pow(frac, 0.62) * (Math.PI * 0.44);
          heading = vecNorm(
            vecAdd(
              vecScale(up, Math.cos(pitchFromVertical)),
              vecScale(east, Math.sin(pitchFromVertical))
            )
          );
          throttle = 1.0;
        } else if (orbElem.apoapsisAltM < targetParkAlt) {
          // Build horizontal orbital speed while holding gentle climb if falling
          const upBias = radialVel < 25 ? 0.25 : 0.04;
          heading = vecNorm(vecAdd(east, vecScale(up, upBias)));
          throttle = 1.0;
        } else if (orbElem.periapsisAltM < 105_000) {
          // Coast to apoapsis (radialVel <= 25) before burning horizontally along east
          if (radialVel > 25 && alt > 65_000) {
            heading = vecLen(vel) > 10 ? vecNorm(vel) : east;
            throttle = 0;
          } else {
            const holdUp = radialVel < -15 ? Math.min(0.4, -radialVel * 0.01) : 0;
            heading = vecNorm(vecAdd(east, vecScale(up, holdUp)));
            throttle = 1.0;
          }
        } else {
          throttle = 0;
          heading = vecLen(vel) > 10 ? vecNorm(vel) : east;
        }
      } else if (status === 'ORBIT') {
        throttle = 0;
        heading = vecLen(vel) > 10 ? vecNorm(vel) : east;

        if (missionId === 'SPACE_TELESCOPE' && !targetOrbitAchieved) {
          const targetR = DEEP_SPACE_ORBIT_M;
          if (orbElem.apoapsisAltM < targetR - EARTH_RADIUS_M - 80_000) {
            // Burn prograde for Hohmann transfer to 1,800 km
            heading = vecNorm(vel);
            throttle = 1.0;
            status = 'TRANSIT';
            pushEvent(events, elapsed, 'MILESTONE', 'Hohmann transfer burn to 1,800 km orbit.');
          } else {
            targetOrbitAchieved = true;
          }
        } else if (missionId === 'MOON_LANDING' && !targetOrbitAchieved) {
          // Check Hohmann phase angle to Moon
          const craftAngle = Math.atan2(pos.z, pos.x);
          const moonAngle = Math.atan2(moon.pos.z, moon.pos.x);
          let lead = moonAngle - craftAngle;
          while (lead < 0) lead += Math.PI * 2;
          while (lead >= Math.PI * 2) lead -= Math.PI * 2;

          if (lead >= 1.55 && lead <= 1.82) {
            heading = vecNorm(vel);
            throttle = 1.0;
            status = 'TRANSIT';
            pushEvent(events, elapsed, 'MILESTONE', 'Trans-Lunar Injection (TLI) burn started!');
          }
        } else if (missionId === 'MARS_LANDING' && !targetOrbitAchieved) {
          const craftAngle = Math.atan2(pos.z, pos.x);
          const marsAngle = Math.atan2(mars.pos.z, mars.pos.x);
          let lead = marsAngle - craftAngle;
          while (lead < 0) lead += Math.PI * 2;
          while (lead >= Math.PI * 2) lead -= Math.PI * 2;

          if (lead >= 2.4 && lead <= 2.68) {
            heading = vecNorm(vel);
            throttle = 1.0;
            status = 'TRANSIT';
            pushEvent(events, elapsed, 'MILESTONE', 'Trans-Mars Injection (TMI) burn started!');
          }
        }
      } else if (status === 'TRANSIT') {
        if (missionId === 'SPACE_TELESCOPE') {
          const radialVel = vecDot(vel, up);
          const targetAlt = DEEP_SPACE_ORBIT_M - EARTH_RADIUS_M;
          if (orbElem.apoapsisAltM < targetAlt - 40_000) {
            heading = vecNorm(vel);
            throttle = 0.6;
          } else if (radialVel > 25 && alt < targetAlt - 120_000) {
            heading = vecNorm(vel);
            throttle = 0; // Coast up to apoapsis
          } else if (orbElem.periapsisAltM < targetAlt - 320_000) {
            heading = east;
            throttle = alt >= targetAlt - 250_000 ? 0.35 : 0; // Circularize near apoapsis
          } else {
            throttle = 0;
            targetOrbitAchieved = true;
            status = 'ORBIT';
            reachedTargetAtSec = reachedTargetAtSec ?? elapsed;
            pushEvent(events, elapsed, 'MILESTONE', 'Deep-Space Observatory circularized at 1,800 km!');
          }
        } else if (missionId === 'MOON_LANDING' || missionId === 'MARS_LANDING') {
          const isMoon = missionId === 'MOON_LANDING';
          const targetR = isMoon ? MOON_ORBIT_M : MARS_TRANSFER_M;

          if (orbElem.apoapsisAltM + EARTH_RADIUS_M < targetR * 0.96) {
            heading = vecNorm(vel);
            throttle = 1.0;
          } else {
            // Ballistic Hohmann coast into target SOI
            throttle = 0;
            heading = vecLen(vel) > 10 ? vecNorm(vel) : east;
          }
        }
      } else if (status === 'TARGET_CAPTURE' || status === 'LANDING') {
        const isMoon = missionId === 'MOON_LANDING';
        const relPos = isMoon ? relMoonPos : relMarsPos;
        const relVel = isMoon ? relMoonVel : relMarsVel;
        const targetRadius = isMoon ? MOON_RADIUS_M : MARS_RADIUS_M;
        const targetMu = isMoon ? MOON_MU : MARS_MU;
        const targetAlt = vecLen(relPos) - targetRadius;
        const relSpeed = vecLen(relVel);
        const relUp = vecNorm(relPos);
        const radialOut = vecDot(relVel, relUp);

        // Compute relative periapsis to make sure we actually hit/enter low altitude rather than flying by
        const relOrb = computeOrbitalElements(relPos, relVel, targetMu, targetRadius, 0);
        const startLandingAlt = isMoon ? 32_000 : 12_000;

        // Stronger capture burn when first entering SOI with high periapsis
        const isCaptureBurn = (status === 'TARGET_CAPTURE' && relOrb.periapsisAltM > (isMoon ? 20_000 : 15_000));

        if (targetAlt > startLandingAlt) {
          // Coast cleanly down to suicide-burn corridor; tiny nudge only if periapsis misses target
          if (relOrb.periapsisAltM > (isMoon ? 55_000 : 28_000) || isCaptureBurn) {
            // Capture burn: retrograde relative to target body
            const retrogradeDir = relSpeed > 1 ? vecNorm(vecScale(relVel, -1)) : relUp;
            // Fallback to radial-in if speed near zero
            const captureDir = relSpeed > 1 ? retrogradeDir : vecScale(relUp, -1);
            heading = captureDir;
            throttle = isCaptureBurn ? 0.8 : 0.12;
          } else {
            heading = relSpeed > 5 ? vecNorm(vecScale(relVel, -1)) : relUp;
            throttle = 0;
          }
        } else {
          // True stopping-distance suicide burn (minimizes gravity loss)
          status = 'LANDING';
          const gLocal = targetMu / (targetRadius * targetRadius);
          const stageMassNow =
            spacecraftDryKg +
            (launcher ? launcher.stage2DryKg + stage2PropKg : 0);
          const maxThrustNow = launcher ? launcher.stage2ThrustN : 60_000;
          const maxDecel = Math.max(2, maxThrustNow / Math.max(stageMassNow, 100) - gLocal);
          const safeSpeed = Math.max(
            4,
            Math.sqrt(2 * maxDecel * 0.52 * Math.max(targetAlt - 120, 0))
          );
          // Use retrograde direction, fallback to radial-up if speed too low
          const retrogradeDir = relSpeed > 1 ? vecNorm(vecScale(relVel, -1)) : relUp;
          heading = retrogradeDir;

          if (relSpeed > safeSpeed) {
            throttle = Math.min(1, 0.35 + (relSpeed - safeSpeed) / 30);
          } else if (radialOut < -safeSpeed * 0.9) {
            throttle = 0.4;
          } else {
            throttle = 0;
          }
        }
      }
    }

    // Current mass & propulsion
    const currentStageProp = activeStageIndex === 0 ? stage1PropKg : stage2PropKg;
    const stage1Mass = activeStageIndex === 0 && launcher ? launcher.stage1DryKg + stage1PropKg : 0;
    const stage2Mass = launcher ? launcher.stage2DryKg + stage2PropKg : 0;
    const totalMassKg = Math.max(100, spacecraftDryKg + stage1Mass + stage2Mass);

    let thrustAccel: Vec3 = { x: 0, y: 0, z: 0 };
    if (launcher && throttle > 0 && currentStageProp > 0 && !landedOnTarget) {
      const maxThrustN =
        activeStageIndex === 0 ? launcher.stage1ThrustN : launcher.stage2ThrustN;
      const ispS = activeStageIndex === 0 ? launcher.stage1IspS : launcher.stage2IspS;
      const thrustN = maxThrustN * throttle;
      const massFlowKgS = thrustN / (ispS * G0);
      const propBurned = Math.min(currentStageProp, massFlowKgS * h);
      const actualFraction = propBurned / Math.max(massFlowKgS * h, 1e-9);
      const effectiveThrustN = thrustN * actualFraction;

      if (activeStageIndex === 0) {
        stage1PropKg -= propBurned;
      } else {
        stage2PropKg -= propBurned;
      }

      const accelMag = effectiveThrustN / totalMassKg;
      deltaVExpendedMs += accelMag * h;
      thrustAccel = vecScale(vecNorm(heading), accelMag);
    }

    // Atmospheric drag (Earth or Mars)
    let dragAccel: Vec3 = { x: 0, y: 0, z: 0 };
    if (alt >= 0 && alt < EARTH_ATM_TOP_M) {
      const rho = EARTH_RHO0 * Math.exp(-alt / EARTH_SCALE_HEIGHT_M);
      const speed = vecLen(vel);
      const q = 0.5 * rho * speed * speed;
      if (q > peakDynamicPressurePa) peakDynamicPressurePa = q;
      // Ballistic drag coefficient: light ascent drag, while <80 km sustained orbit decays rapidly
      const dragMag = (q * 0.22) / Math.max(totalMassKg, 1);
      if (speed > 0.1) {
        dragAccel = vecScale(vecNorm(vel), -dragMag);
      }
    }

    if (missionId === 'MARS_LANDING' && marsDist <= MARS_SOI_M && !landedOnTarget) {
      const marsAlt = marsDist - MARS_RADIUS_M;
      const relMarsSpeed = vecLen(relMarsVel);
      // Mars entry check - only applies when actually in atmosphere
      if (marsAlt >= 0 && marsAlt < MARS_ATM_TOP_M) {
        if (relMarsSpeed > 260 && !thermal?.heatShield) {
          status = 'FAILED';
          failureReason = 'Burned up during Mars atmospheric entry — missing PICA-X heatshield!';
          pushEvent(events, elapsed, 'CRITICAL', failureReason);
          break;
        }
        const rhoM = MARS_RHO0 * Math.exp(-marsAlt / MARS_SCALE_HEIGHT_M);
        const qM = 0.5 * rhoM * relMarsSpeed * relMarsSpeed;
        if (qM > peakDynamicPressurePa) peakDynamicPressurePa = qM;
        // Blunt-body aeroshell provides strong aerobraking deceleration
        const dragMag = (qM * 18.0) / Math.max(totalMassKg, 1);
        if (relMarsSpeed > 0.5) {
          dragAccel = vecAdd(dragAccel, vecScale(vecNorm(relMarsVel), -dragMag));
        }
      }
    }

    // Pad gravity check: if on pad and thrust <= gravity, stay pinned on pad
    const grav0 = computeGravityAccel(pos, elapsed, missionId);
    let totalAccel = vecAdd(vecAdd(grav0, thrustAccel), dragAccel);

    if (alt <= 1 && vecDot(totalAccel, up) <= 0 && vecLen(vel) < 1) {
      // Sitting on launchpad
      vel = { x: 0, y: 0, z: 0 };
      pos = vecScale(up, EARTH_RADIUS_M);

      // Check if player ran out of ALL fuel on the pad (TWR < 1.0)
      if (stage1PropKg <= 0.01 && stage2PropKg <= 0.01 && throttle > 0) {
        status = 'FAILED';
        failureReason = 'Thrust-to-weight < 1.0 — rocket burned out on pad without lifting off.';
        pushEvent(events, elapsed, 'CRITICAL', failureReason);
        break;
      }
    } else if (!landedOnTarget) {
      // Velocity-Verlet integration
      const halfVel = vecAdd(vel, vecScale(totalAccel, 0.5 * h));
      const nextPos = vecAdd(pos, vecScale(halfVel, h));
      const nextGrav = computeGravityAccel(nextPos, elapsed + h, missionId);
      const nextAccel = vecAdd(vecAdd(nextGrav, thrustAccel), dragAccel);
      const nextVel = vecAdd(halfVel, vecScale(nextAccel, 0.5 * h));

      pos = nextPos;
      vel = nextVel;
    }

    elapsed += h;

    // Post-step checks: Earth impact / crash
    const newR = vecLen(pos);
    const newAlt = newR - EARTH_RADIUS_M;
    if (newAlt < -10) {
      status = 'FAILED';
      failureReason =
        enteredOrbitAtSec !== null
          ? 'Orbital decay & atmospheric reentry crash.'
          : 'Suborbital impact on Earth surface.';
      pushEvent(events, elapsed, 'CRITICAL', failureReason);
      break;
    }

    // Orbit entry detection
    const postOrb = computeOrbitalElements(pos, vel);
    if (status === 'ASCENT' && postOrb.periapsisAltM >= EARTH_ATM_TOP_M + 5_000) {
      status = 'ORBIT';
      enteredOrbitAtSec = enteredOrbitAtSec ?? elapsed;
      if (missionId === 'EARTH_OBSERVATION') {
        targetOrbitAchieved = true;
      }
      pushEvent(events, elapsed, 'MILESTONE', 'Stable Earth parking orbit achieved!');
    }

    // Moon / Mars SOI capture & surface touchdown
    if (missionId === 'MOON_LANDING' && !landedOnTarget) {
      const mNow = getMoonState(elapsed);
      const rPos = vecSub(pos, mNow.pos);
      const rVel = vecSub(vel, mNow.vel);
      const d = vecLen(rPos);
      const mAlt = d - MOON_RADIUS_M;

      if (d <= MOON_SOI_M && (status === 'TRANSIT' || status === 'ORBIT')) {
        status = 'TARGET_CAPTURE';
        reachedTargetAtSec = reachedTargetAtSec ?? elapsed;
        pushEvent(events, elapsed, 'MILESTONE', 'Entered Lunar Sphere of Influence!');
      }
      if (d <= MOON_SOI_M) {
        lunarCaptureProgress = Math.min(1, Math.max(lunarCaptureProgress, 1 - mAlt / MOON_SOI_M));
      }

      if (mAlt <= 0) {
        const impactSpeed = vecLen(rVel);
        if (impactSpeed > 28) {
          status = 'FAILED';
          failureReason = `Lunar crash landing at ${impactSpeed.toFixed(1)} m/s!`;
          pushEvent(events, elapsed, 'CRITICAL', failureReason);
          break;
        }
        if ((structure?.structuralIntegrity ?? 0) < 2) {
          status = 'FAILED';
          failureReason = `Landing shock destroyed ${structure?.name ?? 'frame'} — reinforced lander legs required!`;
          pushEvent(events, elapsed, 'CRITICAL', failureReason);
          break;
        }
        landedOnTarget = true;
        targetOrbitAchieved = true;
        lunarCaptureProgress = 1;
        status = 'LANDING';
        const surfDir = vecNorm(rPos);
        pos = vecAdd(mNow.pos, vecScale(surfDir, MOON_RADIUS_M));
        vel = { ...mNow.vel };
        pushEvent(events, elapsed, 'MILESTONE', `Soft touchdown on the Moon (${impactSpeed.toFixed(1)} m/s)!`);
      }
    } else if (missionId === 'MARS_LANDING' && !landedOnTarget) {
      const maNow = getMarsState(elapsed);
      const rPos = vecSub(pos, maNow.pos);
      const rVel = vecSub(vel, maNow.vel);
      const d = vecLen(rPos);
      const maAlt = d - MARS_RADIUS_M;

      if (d <= MARS_SOI_M && (status === 'TRANSIT' || status === 'ORBIT')) {
        status = 'TARGET_CAPTURE';
        reachedTargetAtSec = reachedTargetAtSec ?? elapsed;
        pushEvent(events, elapsed, 'MILESTONE', 'Entered Mars Sphere of Influence!');
      }
      if (d <= MARS_SOI_M) {
        marsCaptureProgress = Math.min(1, Math.max(marsCaptureProgress, 1 - maAlt / MARS_SOI_M));
      }

      if (maAlt <= 0) {
        const impactSpeed = vecLen(rVel);
        if (impactSpeed > 28) {
          status = 'FAILED';
          failureReason = `Mars crash landing at ${impactSpeed.toFixed(1)} m/s!`;
          pushEvent(events, elapsed, 'CRITICAL', failureReason);
          break;
        }
        if ((structure?.structuralIntegrity ?? 0) < 2) {
          status = 'FAILED';
          failureReason = `Landing shock crushed ${structure?.name ?? 'frame'} — reinforced lander chassis required!`;
          pushEvent(events, elapsed, 'CRITICAL', failureReason);
          break;
        }
        landedOnTarget = true;
        targetOrbitAchieved = true;
        marsCaptureProgress = 1;
        status = 'LANDING';
        const surfDir = vecNorm(rPos);
        pos = vecAdd(maNow.pos, vecScale(surfDir, MARS_RADIUS_M));
        vel = { ...maNow.vel };
        pushEvent(events, elapsed, 'MILESTONE', `Touchdown on Mars (${impactSpeed.toFixed(1)} m/s)!`);
      }
    }

    // Power & Eclipse simulation
    let inEclipse = isInEclipseShadow(pos, { x: 0, y: 0, z: 0 }, EARTH_RADIUS_M, SUN_DIRECTION);
    if (missionId === 'MOON_LANDING' && moonDist < MOON_SOI_M) {
      inEclipse =
        inEclipse || isInEclipseShadow(pos, moon.pos, MOON_RADIUS_M, SUN_DIRECTION);
    } else if (missionId === 'MARS_LANDING' && marsDist < MARS_SOI_M) {
      inEclipse =
        inEclipse || isInEclipseShadow(pos, mars.pos, MARS_RADIUS_M, SUN_DIRECTION);
    }

    let powerGenW = 0;
    if (power?.baseOutputW) {
      if (power.isSolar) {
        powerGenW = inEclipse ? 0 : power.baseOutputW * mission.irradianceFactor;
      } else {
        powerGenW = power.baseOutputW;
      }
    }

    const baseDrawW = parts.reduce((s, p) => s + p.drawW, 0) + band.drawW;
    const netPowerW = powerGenW - baseDrawW;
    batteryWh = Math.max(
      0,
      Math.min(batteryMaxWh, batteryWh + (netPowerW * h) / 3600)
    );
    const battPct = (batteryWh / Math.max(1, batteryMaxWh)) * 100;
    if (battPct < minBatteryPct) minBatteryPct = battPct;

    lastInEclipse = inEclipse;
    lastPowerGenW = powerGenW;
    lastPowerDrawW = baseDrawW;

    if (batteryWh <= 0) {
      status = 'FAILED';
      failureReason = inEclipse
        ? 'Power blackout in Earth/planetary shadow — battery depleted!'
        : 'Power blackout — solar/RTG output insufficient for spacecraft load!';
      pushEvent(events, elapsed, 'CRITICAL', failureReason);
      break;
    }

    // Science observation & DSN downlink
    const visibleStations = getVisibleGroundStations(
      pos,
      elapsed,
      groundConfig.activeStationIds
    );

    const canCollectScience =
      ((missionId === 'EARTH_OBSERVATION' &&
        status === 'ORBIT' &&
        postOrb.periapsisAltM >= 85_000) ||
        (missionId === 'SPACE_TELESCOPE' &&
          status === 'ORBIT' &&
          targetOrbitAchieved &&
          (adcs?.pointingTier ?? 0) >= 3 &&
          Boolean(computer?.radHardened)) ||
        ((missionId === 'MOON_LANDING' || missionId === 'MARS_LANDING') &&
          landedOnTarget &&
          Boolean(computer?.radHardened))) &&
      payload?.missionMatch === mission.requiredPayloadMatch;

    if (canCollectScience && payload?.dataRateMbps) {
      const cpuCap = computer?.maxDataMbps ?? 15;
      const effectiveMbps = Math.min(payload.dataRateMbps, cpuCap);
      const genMb = (effectiveMbps * 0.25 * h) / 8;
      if (onboardDataMb + genMb > prevState.storageMaxMb) {
        const overflow = onboardDataMb + genMb - prevState.storageMaxMb;
        droppedDataMb += overflow;
        onboardDataMb = prevState.storageMaxMb;
      } else {
        onboardDataMb += genMb;
      }
    }

    if (visibleStations.length > 0 && onboardDataMb > 0) {
      const dlRateMbps = band.bandwidthMbps * mission.distanceCommsFactor;
      const dlMb = Math.min(onboardDataMb, (dlRateMbps * h) / 8);
      onboardDataMb -= dlMb;
      deliveredDataMb += dlMb;
    }

    observationProgress = Math.min(1, deliveredDataMb / mission.targetScienceMb);
    if (deliveredDataMb >= mission.targetScienceMb) {
      targetAchieved = true;
      status = 'SUCCESS';
      pushEvent(
        events,
        elapsed,
        'MILESTONE',
        `Mission Complete! ${mission.targetScienceMb} MB science downlinked.`
      );
      break;
    }
  }

  const finalOrb = computeOrbitalElements(pos, vel);
  const finalMoon = getMoonState(elapsed);
  const finalMars = getMarsState(elapsed);
  const activeDsnStationIds = getVisibleGroundStations(
    pos,
    elapsed,
    groundConfig.activeStationIds
  );

  return {
    ...prevState,
    position: pos,
    velocity: vel,
    heading,
    throttle,
    activeStageIndex,
    stage1PropKg,
    stage2PropKg,
    batteryWh,
    onboardDataMb,
    deliveredDataMb,
    droppedDataMb,
    observationProgress,
    targetAchieved,
    elapsedFlightSec: elapsed,
    status,
    failureReason,
    inEclipse: lastInEclipse,
    activeDsnStationIds,
    currentPowerGenW: lastPowerGenW,
    currentPowerDrawW: lastPowerDrawW,
    deltaVRemainingMs: computeDeltaVRemaining(
      spacecraftDryKg,
      spacecraftConfig.launcherId,
      activeStageIndex,
      stage1PropKg,
      stage2PropKg
    ),
    deltaVExpendedMs,
    orbitalElements: finalOrb,
    targetPhaseStatus: {
      moonDistanceM: vecLen(vecSub(pos, finalMoon.pos)),
      marsDistanceM: vecLen(vecSub(pos, finalMars.pos)),
      lunarCaptureProgress,
      marsCaptureProgress,
      landedOnTarget,
      targetOrbitAchieved,
    },
    events,
    minBatteryPct,
    peakDynamicPressurePa,
    enteredOrbitAtSec,
    reachedTargetAtSec,
    timeWarp: timeWarp,
  };
}
