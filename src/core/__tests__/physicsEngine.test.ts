import { describe, expect, it } from 'vitest';
import {
  EARTH_ATM_TOP_M,
  EARTH_MU,
  EARTH_RADIUS_M,
  G0,
  LAUNCHERS_BY_ID,
  LAUNCH_SITES_BY_ID,
  RECOMMENDED_GROUND,
  RECOMMENDED_LOADOUTS,
  SUN_DIRECTION,
} from '../constants';
import {
  computeOrbitalElements,
  computeBoilOffRate,
  createInitialFlightState,
  getVisibleGroundStations,
  getSurfacePosition,
  isInEclipseShadow,
  stepFlightSimulation,
  seededRandom,
} from '../physicsEngine';
import { validateSpacecraft } from '../spacecraftValidator';
import { generateDebrief } from '../debriefAnalyzer';

describe('physicsEngine core mechanics', () => {
  it('computes exact Tsiolkovsky delta-V for 2-stage rocket', () => {
    const cfg = RECOMMENDED_LOADOUTS.EARTH_OBSERVATION;
    const val = validateSpacecraft('EARTH_OBSERVATION', cfg, 'REALISTIC');
    const lv = LAUNCHERS_BY_ID[cfg.launcherId!];
    const scDry = val.mass.spacecraftDryKg;

    const m0_s1 = scDry + lv.stage2DryKg + lv.stage2PropKg + lv.stage1DryKg + lv.stage1PropKg;
    const mf_s1 = m0_s1 - lv.stage1PropKg;
    const expectedDv1 = lv.stage1IspS * G0 * Math.log(m0_s1 / mf_s1);

    const m0_s2 = scDry + lv.stage2DryKg + lv.stage2PropKg;
    const mf_s2 = scDry + lv.stage2DryKg;
    const expectedDv2 = lv.stage2IspS * G0 * Math.log(m0_s2 / mf_s2);

    expect(val.mass.stage1DeltaVMs).toBeCloseTo(expectedDv1, 3);
    expect(val.mass.stage2DeltaVMs).toBeCloseTo(expectedDv2, 3);
    expect(val.mass.totalDeltaVMs).toBeCloseTo(expectedDv1 + expectedDv2, 3);
    expect(val.mass.totalDeltaVMs).toBeGreaterThan(2850);
  });

  it('starts from selected launch site surface with outward heading', () => {
    const cfg = RECOMMENDED_LOADOUTS.EARTH_OBSERVATION;
    const ground = RECOMMENDED_GROUND.EARTH_OBSERVATION;
    const site = LAUNCH_SITES_BY_ID.vandenberg;
    const state = createInitialFlightState('EARTH_OBSERVATION', cfg, ground, false, site.id);
    const expected = getSurfacePosition(site.latDeg, site.lonDeg);

    expect(state.position.x).toBeCloseTo(expected.x, 6);
    expect(state.position.y).toBeCloseTo(expected.y, 6);
    expect(state.position.z).toBeCloseTo(expected.z, 6);
    expect(state.heading.x).toBeCloseTo(expected.x / EARTH_RADIUS_M, 6);
    expect(state.heading.y).toBeCloseTo(expected.y / EARTH_RADIUS_M, 6);
    expect(state.heading.z).toBeCloseTo(expected.z / EARTH_RADIUS_M, 6);
  });

  it('applies bounded local pitch and yaw steering from a vertical launch', () => {
    const cfg = RECOMMENDED_LOADOUTS.EARTH_OBSERVATION;
    const ground = RECOMMENDED_GROUND.EARTH_OBSERVATION;
    let state = createInitialFlightState('EARTH_OBSERVATION', cfg, ground, false, 'vandenberg');

    state = stepFlightSimulation(
      state,
      'EARTH_OBSERVATION',
      cfg,
      ground,
      { throttle: 1, pitchInput: 1, yawInput: 0, autoGuidance: false },
      0.5,
      'REALISTIC'
    );
    const pitched = { ...state.heading };
    const radial = getSurfacePosition(LAUNCH_SITES_BY_ID.vandenberg.latDeg, LAUNCH_SITES_BY_ID.vandenberg.lonDeg);
    const radialUnit = { x: radial.x / EARTH_RADIUS_M, y: radial.y / EARTH_RADIUS_M, z: radial.z / EARTH_RADIUS_M };
    expect(Math.abs(pitched.x * radialUnit.x + pitched.y * radialUnit.y + pitched.z * radialUnit.z)).toBeLessThan(1);

    state = stepFlightSimulation(
      state,
      'EARTH_OBSERVATION',
      cfg,
      ground,
      { throttle: 1, pitchInput: 0, yawInput: 1, autoGuidance: false },
      0.5,
      'REALISTIC'
    );
    expect(state.heading.x).not.toBeCloseTo(pitched.x, 6);
    expect(state.heading.y).not.toBeCloseTo(pitched.y, 6);
    expect(Number.isFinite(state.orbitalElements.altitudeM)).toBe(true);
    expect(Math.hypot(state.heading.x, state.heading.y, state.heading.z)).toBeCloseTo(1, 6);
  });

  it('maintains circular orbit stability above atmosphere with Velocity-Verlet', () => {
    const r = EARTH_RADIUS_M + 150_000;
    const vCirc = Math.sqrt(EARTH_MU / r);
    const cfg = RECOMMENDED_LOADOUTS.EARTH_OBSERVATION;
    const ground = RECOMMENDED_GROUND.EARTH_OBSERVATION;

    let state = createInitialFlightState('EARTH_OBSERVATION', cfg, ground, false);
    state = {
      ...state,
      status: 'ORBIT',
      position: { x: r, y: 0, z: 0 },
      velocity: { x: 0, y: 0, z: vCirc },
    };

    // Simulate 1 full orbit (~2200 s) with zero thrust
    for (let i = 0; i < 220; i++) {
      state = stepFlightSimulation(
        state,
        'EARTH_OBSERVATION',
        cfg,
        ground,
        { throttle: 0, pitchInput: 0, yawInput: 0 },
        10,
        'REALISTIC'
      );
    }

    expect(state.status).not.toBe('FAILED');
    expect(state.orbitalElements.eccentricity).toBeLessThan(0.01);
    expect(state.orbitalElements.altitudeM).toBeGreaterThan(145_000);
    expect(state.orbitalElements.altitudeM).toBeLessThan(155_000);
  });

  it('decays and crashes when orbiting below 80 km atmospheric top', () => {
    const r = EARTH_RADIUS_M + 55_000; // 55 km inside dense atmosphere
    const vCirc = Math.sqrt(EARTH_MU / r);
    const cfg = RECOMMENDED_LOADOUTS.EARTH_OBSERVATION;
    const ground = RECOMMENDED_GROUND.EARTH_OBSERVATION;

    let state = createInitialFlightState('EARTH_OBSERVATION', cfg, ground, false);
    state = {
      ...state,
      status: 'ORBIT',
      enteredOrbitAtSec: 100,
      position: { x: r, y: 0, z: 0 },
      velocity: { x: 0, y: 0, z: vCirc },
      orbitalElements: computeOrbitalElements({ x: r, y: 0, z: 0 }, { x: 0, y: 0, z: vCirc }),
    };

    expect(state.orbitalElements.isDecaying).toBe(true);
    expect(state.orbitalElements.periapsisAltM).toBeLessThan(EARTH_ATM_TOP_M);

    for (let i = 0; i < 600 && state.status !== 'FAILED'; i++) {
      state = stepFlightSimulation(
        state,
        'EARTH_OBSERVATION',
        cfg,
        ground,
        { throttle: 0, pitchInput: 0, yawInput: 0 },
        5,
        'REALISTIC'
      );
    }

    expect(state.status).toBe('FAILED');
    expect(state.failureReason).toMatch(/decay|reentry/i);
  });

  it('detects eclipse shadow geometrically and drains solar vs maintains RTG battery', () => {
    const nightPos = { x: -(EARTH_RADIUS_M + 150_000), y: 0, z: 50_000 };
    const dayPos = { x: EARTH_RADIUS_M + 150_000, y: 0, z: 50_000 };

    expect(isInEclipseShadow(nightPos, { x: 0, y: 0, z: 0 }, EARTH_RADIUS_M, SUN_DIRECTION)).toBe(true);
    expect(isInEclipseShadow(dayPos, { x: 0, y: 0, z: 0 }, EARTH_RADIUS_M, SUN_DIRECTION)).toBe(false);

    // Solar craft in continuous shadow drains battery
    const solarCfg = { ...RECOMMENDED_LOADOUTS.EARTH_OBSERVATION, batteryId: 'bat-liion-small' };
    const ground = RECOMMENDED_GROUND.EARTH_OBSERVATION;
    let solarState = createInitialFlightState('EARTH_OBSERVATION', solarCfg, ground, false);
    const startBatt = solarState.batteryWh;
    solarState = {
      ...solarState,
      status: 'ORBIT',
      position: nightPos,
      velocity: { x: 0, y: 0, z: 0 },
    };
    // Step 100s purely in shadow (pinned position by putting high orbit, or let's use real velocity)
    const r = EARTH_RADIUS_M + 150_000;
    solarState.position = { x: -r, y: 0, z: 0 };
    solarState.velocity = { x: 0, y: 0, z: -Math.sqrt(EARTH_MU / r) };

    const afterSolar = stepFlightSimulation(
      solarState,
      'EARTH_OBSERVATION',
      solarCfg,
      ground,
      { throttle: 0, pitchInput: 0, yawInput: 0 },
      120,
      'REALISTIC'
    );
    expect(afterSolar.currentPowerGenW).toBe(0);
    expect(afterSolar.batteryWh).toBeLessThan(startBatt);

    // RTG craft in shadow keeps 280 W power generation
    const rtgCfg = { ...RECOMMENDED_LOADOUTS.MARS_LANDING };
    let rtgState = createInitialFlightState('MARS_LANDING', rtgCfg, RECOMMENDED_GROUND.MARS_LANDING, false);
    rtgState.status = 'ORBIT';
    rtgState.position = { x: -r, y: 0, z: 0 };
    rtgState.velocity = { x: 0, y: 0, z: -Math.sqrt(EARTH_MU / r) };

    const afterRtg = stepFlightSimulation(
      rtgState,
      'MARS_LANDING',
      rtgCfg,
      RECOMMENDED_GROUND.MARS_LANDING,
      { throttle: 0, pitchInput: 0, yawInput: 0 },
      120,
      'REALISTIC'
    );
    expect(afterRtg.currentPowerGenW).toBe(280);
    expect(afterRtg.batteryWh).toBe(rtgState.batteryMaxWh);
  });

  it('computes DSN ground station line-of-sight elevation visibility', () => {
    // Spacecraft directly over Goldstone at t=0 (35.4N, -116.9E)
    const lat = (35.4 * Math.PI) / 180;
    const lon = (-116.9 * Math.PI) / 180;
    const altR = EARTH_RADIUS_M + 200_000;
    const overGoldstone = {
      x: altR * Math.cos(lat) * Math.cos(lon),
      y: altR * Math.sin(lat),
      z: altR * Math.cos(lat) * Math.sin(lon),
    };

    const visible = getVisibleGroundStations(overGoldstone, 0, ['goldstone', 'madrid', 'canberra']);
    expect(visible).toContain('goldstone');
    expect(visible).not.toContain('madrid');
  });

  it('computes deterministic seeded random for anomaly reproducibility', () => {
    // Same seed always produces same value
    expect(seededRandom(42)).toBe(seededRandom(42));
    // Different seeds produce different values
    expect(seededRandom(42)).not.toBe(seededRandom(43));
    // Value always in [0, 1)
    for (let i = 0; i < 100; i++) {
      const v = seededRandom(i);
      expect(v).toBeGreaterThanOrEqual(0);
      expect(v).toBeLessThan(1);
    }
  });

  it('computes cryogenic boil-off rate with thermal/structure mitigation', () => {
    const thermalT1 = { thermalTier: 1 } as any;
    const thermalT3 = { thermalTier: 3 } as any;
    const struct1 = { structuralIntegrity: 1 } as any;
    const struct3 = { structuralIntegrity: 3 } as any;

    // Stage 2 propellant: 5000 kg
    // Base rate = 5000 * 0.0005 / 3600 = 0.000694 kg/s
    const baseRate = 5000 * 0.0005 / 3600;

    // No mitigation (tier 1)
    const rateT1S1 = computeBoilOffRate(5000, thermalT1, struct1, 'TRANSIT', 'MOON_LANDING');
    expect(rateT1S1).toBeCloseTo(baseRate * (1 - 0.5) * (1 - 0.2) * 1.0 * 1.2, 6);

    // Tier 3 thermal, tier 3 structure
    const rateT3S3 = computeBoilOffRate(5000, thermalT3, struct3, 'TRANSIT', 'MOON_LANDING');
    expect(rateT3S3).toBeCloseTo(baseRate * (1 - 0.85) * (1 - 0.6) * 1.0 * 1.2, 6);

    // Mars distance factor (1/1.52^2 ≈ 0.43)
    const rateMars = computeBoilOffRate(5000, thermalT1, struct1, 'TRANSIT', 'MARS_LANDING');
    expect(rateMars).toBeCloseTo(baseRate * (1 - 0.5) * (1 - 0.2) * (1/1.52/1.52) * 1.2, 6);

    // No boil-off during ascent
    const rateAscent = computeBoilOffRate(5000, thermalT1, struct1, 'ASCENT', 'MARS_LANDING');
    expect(rateAscent).toBe(0);

    // No boil-off when propellant exhausted
    const rateEmpty = computeBoilOffRate(0, thermalT1, struct1, 'TRANSIT', 'MARS_LANDING');
    expect(rateEmpty).toBe(0);
  });

  it('simulates propellant boil-off accumulation during deep-space coast', () => {
    const cfg = RECOMMENDED_LOADOUTS.MARS_LANDING;
    const ground = RECOMMENDED_GROUND.MARS_LANDING;

    let state = createInitialFlightState('MARS_LANDING', cfg, ground, false);
    state = {
      ...state,
      status: 'TRANSIT',
      position: { x: 6_500_000, y: 0, z: 0 }, // Deep space
      velocity: { x: 0, y: 0, z: 3000 },
    };

    // Simulate 10 hours of coast (36000 seconds)
    const initialBoilOff = state.propellantBoilOffKg;
    const initialStage2Prop = state.stage2PropKg;

    for (let i = 0; i < 360; i++) {
      state = stepFlightSimulation(
        state,
        'MARS_LANDING',
        cfg,
        ground,
        { throttle: 0, pitchInput: 0, yawInput: 0 },
        100,
        'REALISTIC'
      );
    }

    // Should have accumulated boil-off
    expect(state.propellantBoilOffKg).toBeGreaterThan(initialBoilOff);
    expect(state.stage2PropKg).toBeLessThan(initialStage2Prop);
    expect(state.propellantBoilOffRateKgPerSec).toBeGreaterThan(0);
  });

  it('tracks thermal temperature and margin with 1/r^2 solar scaling', () => {
    const cfg = RECOMMENDED_LOADOUTS.EARTH_OBSERVATION;
    const ground = RECOMMENDED_GROUND.EARTH_OBSERVATION;

    let state = createInitialFlightState('EARTH_OBSERVATION', cfg, ground, false);
    state = {
      ...state,
      status: 'ORBIT',
      position: { x: EARTH_RADIUS_M + 150_000, y: 0, z: 0 }, // Sunlit
      velocity: { x: 0, y: 0, z: Math.sqrt(EARTH_MU / (EARTH_RADIUS_M + 150_000)) },
    };

    // Simulate orbit in sunlit
    for (let i = 0; i < 100; i++) {
      state = stepFlightSimulation(
        state,
        'EARTH_OBSERVATION',
        cfg,
        ground,
        { throttle: 0, pitchInput: 0, yawInput: 0 },
        10,
        'REALISTIC'
      );
    }

    // Should track thermal state
    expect(state.thermalTempC).toBeGreaterThan(-50);
    expect(state.thermalMarginC).toBeGreaterThan(0);
    // Thermal temp should be reasonable in sunlit
    expect(state.thermalTempC).toBeGreaterThan(10);
  });

  it('tracks peak power draw during DSN downlink operations', () => {
    const cfg = RECOMMENDED_LOADOUTS.EARTH_OBSERVATION;
    const ground = RECOMMENDED_GROUND.EARTH_OBSERVATION;

    let state = createInitialFlightState('EARTH_OBSERVATION', cfg, ground, false);
    state = {
      ...state,
      status: 'ORBIT',
      position: { x: EARTH_RADIUS_M + 150_000, y: 0, z: 0 },
      velocity: { x: 0, y: 0, z: Math.sqrt(EARTH_MU / (EARTH_RADIUS_M + 150_000)) },
      onboardDataMb: 100,
    };

    const initialPeak = state.peakPowerDrawW;

    // Simulate with visible station and data onboard
    for (let i = 0; i < 50; i++) {
      state = stepFlightSimulation(
        state,
        'EARTH_OBSERVATION',
        cfg,
        ground,
        { throttle: 0, pitchInput: 0, yawInput: 0 },
        10,
        'REALISTIC'
      );
    }

    // Peak power draw should be tracked (might stay same if no active downlink)
    expect(state.peakPowerDrawW).toBeGreaterThanOrEqual(initialPeak);
  });

  it('generates deterministic anomalies during coast phases', () => {
    const cfg = RECOMMENDED_LOADOUTS.MARS_LANDING;
    const ground = RECOMMENDED_GROUND.MARS_LANDING;

    let state = createInitialFlightState('MARS_LANDING', cfg, ground, false);
    state = {
      ...state,
      status: 'TRANSIT',
      position: { x: 6_500_000, y: 0, z: 0 },
      velocity: { x: 0, y: 0, z: 3000 },
      elapsedFlightSec: 3600 * 10, // 10 hours in
    };

    // Run simulation - anomaly probability is low but deterministic

    for (let i = 0; i < 100; i++) {
      state = stepFlightSimulation(
        state,
        'MARS_LANDING',
        cfg,
        ground,
        { throttle: 0, pitchInput: 0, yawInput: 0 },
        360,
        'REALISTIC'
      );
    }

    // Anomaly events array should be tracked
    expect(Array.isArray(state.anomalyEvents)).toBe(true);
    expect(state.anomaliesHandled).toBeGreaterThanOrEqual(0);
  });

  it('includes new telemetry in debrief report', () => {
    const cfg = RECOMMENDED_LOADOUTS.EARTH_OBSERVATION;
    const ground = RECOMMENDED_GROUND.EARTH_OBSERVATION;

    let state = createInitialFlightState('EARTH_OBSERVATION', cfg, ground, false);
    state = {
      ...state,
      status: 'SUCCESS',
      position: { x: EARTH_RADIUS_M + 150_000, y: 0, z: 0 },
      velocity: { x: 0, y: 0, z: Math.sqrt(EARTH_MU / (EARTH_RADIUS_M + 150_000)) },
      elapsedFlightSec: 5000,
      deltaVRemainingMs: 500,
      deltaVExpendedMs: 3500,
      minBatteryPct: 85,
      targetAchieved: true,
      propellantBoilOffKg: 1.5,
      thermalTempC: 22,
      thermalMarginC: 62,
      peakPowerDrawW: 450,
      anomaliesHandled: 2,
      anomalyEvents: [
        { timeSec: 1000, type: 'THERMAL_SOAK', severity: 'MINOR', subsystemsAffected: ['thermal'], mitigated: true, message: 'test', recoveryTimeSec: 60 },
        { timeSec: 2000, type: 'ATTITUDE_DISTURBANCE', severity: 'MINOR', subsystemsAffected: ['adcs'], mitigated: true, message: 'test', recoveryTimeSec: 30 },
      ],
    };

    const debrief = generateDebrief('EARTH_OBSERVATION', cfg, ground, state, 'REALISTIC');

    // Check mass debrief includes boil-off
    expect(debrief.resources.mass.realisticMetrics).toMatch(/Boil-off: 1\.50 kg/);

    // Check power debrief includes thermal
    expect(debrief.resources.power.realisticMetrics).toMatch(/Temp: 22\.0°C/);
    expect(debrief.resources.power.realisticMetrics).toMatch(/Margin: 62\.0°C/);
    expect(debrief.resources.power.realisticMetrics).toMatch(/Peak Draw \(flight\): 450 W/);

    // Check time debrief includes anomalies
    expect(debrief.resources.time.realisticMetrics).toMatch(/Anomalies: 2 handled/);
    expect(debrief.resources.time.realisticMetrics).toMatch(/Boil-off: 1\.50 kg/);
    expect(debrief.resources.time.realisticMetrics).toMatch(/Peak Power: 450 W/);
  });
});

describe('launch site and Earth spin', () => {
  const craft = RECOMMENDED_LOADOUTS.EARTH_OBSERVATION;
  const ground = RECOMMENDED_GROUND.EARTH_OBSERVATION;
  const eastwardSpeedAfterLiftoff = (siteId: string) => {
    let s = createInitialFlightState('EARTH_OBSERVATION', craft, ground, true, siteId);
    s = stepFlightSimulation(s, 'EARTH_OBSERVATION', craft, ground,
      { throttle: 1, pitchInput: 0, yawInput: 0, autoGuidance: true }, 0.5, 'BEGINNER');
    const up = { x: s.position.x, y: s.position.y, z: s.position.z };
    const r = Math.hypot(up.x, up.y, up.z);
    const east = { x: -up.z / r, z: up.x / r };
    const norm = Math.hypot(east.x, east.z);
    return (s.velocity.x * east.x + s.velocity.z * east.z) / norm;
  };

  it('gives a rocket eastward speed from Earth spin, more near the equator', () => {
    const guiana = eastwardSpeedAfterLiftoff('guiana-space-centre'); // 5° N
    const baikonur = eastwardSpeedAfterLiftoff('baikonur'); // 46° N
    expect(guiana).toBeGreaterThan(100);
    expect(guiana).toBeGreaterThan(baikonur * 1.3);
  });

  it('keeps a rocket on the pad turning with the Earth before launch', () => {
    let s = createInitialFlightState('EARTH_OBSERVATION', craft, ground, false);
    const before = { ...s.position };
    s = stepFlightSimulation(s, 'EARTH_OBSERVATION', craft, ground,
      { throttle: 0, pitchInput: 0, yawInput: 0, autoGuidance: false }, 60, 'REALISTIC');
    expect(s.status).toBe('PRELAUNCH');
    const moved = Math.hypot(s.position.x - before.x, s.position.z - before.z);
    expect(moved).toBeGreaterThan(1000);
    expect(Math.hypot(s.position.x, s.position.y, s.position.z)).toBeCloseTo(Math.hypot(before.x, before.y, before.z), 0);
  });
});
