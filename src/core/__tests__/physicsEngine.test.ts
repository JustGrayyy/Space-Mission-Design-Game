import { describe, expect, it } from 'vitest';
import {
  EARTH_ATM_TOP_M,
  EARTH_MU,
  EARTH_RADIUS_M,
  G0,
  LAUNCHERS_BY_ID,
  RECOMMENDED_GROUND,
  RECOMMENDED_LOADOUTS,
  SUN_DIRECTION,
} from '../constants';
import {
  computeOrbitalElements,
  createInitialFlightState,
  getVisibleGroundStations,
  isInEclipseShadow,
  stepFlightSimulation,
} from '../physicsEngine';
import { validateSpacecraft } from '../spacecraftValidator';

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
});
