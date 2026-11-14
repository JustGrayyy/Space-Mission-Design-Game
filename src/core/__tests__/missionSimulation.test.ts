import { describe, expect, it } from 'vitest';
import {
  EARTH_RADIUS_M,
  MARS_RADIUS_M,
  RECOMMENDED_GROUND,
  RECOMMENDED_LOADOUTS,
} from '../constants';
import { generateDebrief } from '../debriefAnalyzer';
import {
  createInitialFlightState,
  getMarsState,
  stepFlightSimulation,
} from '../physicsEngine';
import type { GroundConfig, MissionId, SpacecraftConfig } from '../types';

function runFlightToCompletion(
  missionId: MissionId,
  craft: SpacecraftConfig,
  ground: GroundConfig,
  maxSteps: number = 4000,
  stepDt: number = 10
) {
  let state = createInitialFlightState(missionId, craft, ground, true);
  for (let i = 0; i < maxSteps; i++) {
    state = stepFlightSimulation(
      state,
      missionId,
      craft,
      ground,
      { throttle: 1, pitchInput: 0, yawInput: 0, autoGuidance: true },
      stepDt,
      'BEGINNER'
    );
    if (state.status === 'SUCCESS' || state.status === 'FAILED') {
      break;
    }
  }
  return state;
}

describe('headless full-campaign mission simulations', () => {
  it('completes EARTH_OBSERVATION from pad to SUCCESS and generates clean debrief', () => {
    const finalState = runFlightToCompletion(
      'EARTH_OBSERVATION',
      RECOMMENDED_LOADOUTS.EARTH_OBSERVATION,
      RECOMMENDED_GROUND.EARTH_OBSERVATION,
      1500,
      5
    );
    expect(finalState.failureReason).toBeNull();
    expect(finalState.status).toBe('SUCCESS');
    expect(finalState.deliveredDataMb).toBeGreaterThanOrEqual(300);

    const debrief = generateDebrief(
      'EARTH_OBSERVATION',
      RECOMMENDED_LOADOUTS.EARTH_OBSERVATION,
      RECOMMENDED_GROUND.EARTH_OBSERVATION,
      finalState,
      'BEGINNER'
    );
    expect(debrief.outcome).toBe('SUCCESS');
    expect(debrief.resources.mass.status).toBe('OPTIMAL');
    expect(debrief.resources.power.status).toBe('OPTIMAL');
  });

  it('completes SPACE_TELESCOPE from pad to 1,800 km orbit & SUCCESS', () => {
    const finalState = runFlightToCompletion(
      'SPACE_TELESCOPE',
      RECOMMENDED_LOADOUTS.SPACE_TELESCOPE,
      RECOMMENDED_GROUND.SPACE_TELESCOPE,
      3000,
      5
    );
    expect(finalState.failureReason).toBeNull();
    expect(finalState.status).toBe('SUCCESS');
    expect(finalState.targetPhaseStatus.targetOrbitAchieved).toBe(true);
    expect(finalState.deliveredDataMb).toBeGreaterThanOrEqual(600);
  });

  it('completes MOON_LANDING from pad through TLI, lunar capture, landing, and science SUCCESS', () => {
    const finalState = runFlightToCompletion(
      'MOON_LANDING',
      RECOMMENDED_LOADOUTS.MOON_LANDING,
      RECOMMENDED_GROUND.MOON_LANDING,
      4000,
      5
    );
    expect(finalState.failureReason).toBeNull();
    expect(finalState.status).toBe('SUCCESS');
    expect(finalState.targetPhaseStatus.landedOnTarget).toBe(true);
    expect(finalState.deliveredDataMb).toBeGreaterThanOrEqual(400);
  });

  it('completes MARS_LANDING from pad through TMI, aerobrake, landing, and science SUCCESS', () => {
    const finalState = runFlightToCompletion(
      'MARS_LANDING',
      RECOMMENDED_LOADOUTS.MARS_LANDING,
      RECOMMENDED_GROUND.MARS_LANDING,
      6000,
      5
    );
    expect(finalState.failureReason).toBeNull();
    expect(finalState.status).toBe('SUCCESS');
    expect(finalState.targetPhaseStatus.landedOnTarget).toBe(true);
    expect(finalState.deliveredDataMb).toBeGreaterThanOrEqual(500);
  });

  it('fails Mars atmospheric entry when PICA-X heatshield is omitted', () => {
    const noShield = {
      ...RECOMMENDED_LOADOUTS.MARS_LANDING,
      thermalId: 'thermal-passive-mli',
    };
    const ground = RECOMMENDED_GROUND.MARS_LANDING;
    const mars0 = getMarsState(0);

    let state = createInitialFlightState('MARS_LANDING', noShield, ground, false);
    // Drop craft straight into Mars upper atmosphere at entry velocity
    state = {
      ...state,
      status: 'TARGET_CAPTURE',
      position: {
        x: mars0.pos.x + MARS_RADIUS_M + 30_000,
        y: 0,
        z: mars0.pos.z,
      },
      velocity: {
        x: mars0.vel.x - 450,
        y: 0,
        z: mars0.vel.z,
      },
    };

    const next = stepFlightSimulation(
      state,
      'MARS_LANDING',
      noShield,
      ground,
      { throttle: 0, pitchInput: 0, yawInput: 0 },
      5,
      'REALISTIC'
    );
    expect(next.status).toBe('FAILED');
    expect(next.failureReason).toMatch(/heatshield/i);

    const debrief = generateDebrief('MARS_LANDING', noShield, ground, next, 'BEGINNER');
    expect(debrief.outcome).toBe('FAILED');
    expect(debrief.resources.mass.status).toBe('CRITICAL');
  });

  it('fails on launchpad when TWR < 1.0', () => {
    // Ultra-heavy payload/spacecraft on light rocket with low thrust (simulate custom heavy craft)
    const heavyOnLight = {
      ...RECOMMENDED_LOADOUTS.MARS_LANDING,
      launcherId: 'launcher-light',
    };
    // Verify pad gravity pin or failure on burnout if thrust < weight
    let state = createInitialFlightState(
      'EARTH_OBSERVATION',
      heavyOnLight,
      RECOMMENDED_GROUND.EARTH_OBSERVATION,
      false
    );
    // Force stage 1 to empty and test stage 2 (32,000 N thrust vs ~4,000 kg*10.6 = 42,000 N weight!)
    state = {
      ...state,
      activeStageIndex: 1,
      stage1PropKg: 0,
      position: { x: EARTH_RADIUS_M, y: 0, z: 0 },
      velocity: { x: 0, y: 0, z: 0 },
    };

    for (let i = 0; i < 600 && state.status !== 'FAILED'; i++) {
      state = stepFlightSimulation(
        state,
        'EARTH_OBSERVATION',
        heavyOnLight,
        RECOMMENDED_GROUND.EARTH_OBSERVATION,
        { throttle: 0.15, pitchInput: 0, yawInput: 0, autoGuidance: false },
        5,
        'REALISTIC'
      );
    }
    expect(state.status).toBe('FAILED');
    expect(state.failureReason).toMatch(/TWR|Thrust-to-weight|pad/i);
  });

  it('fails with power blackout in Earth eclipse when battery is undersized', () => {
    const lowBattCraft = {
      ...RECOMMENDED_LOADOUTS.SPACE_TELESCOPE,
      batteryId: 'bat-liion-small', // 35 Wh vs 282 W draw -> ~447s max endurance
    };
    const ground = RECOMMENDED_GROUND.SPACE_TELESCOPE;
    let state = createInitialFlightState('SPACE_TELESCOPE', lowBattCraft, ground, false);
    // Place entering Earth's nightside shadow in circular orbit (120 km)
    const r = EARTH_RADIUS_M + 120_000;
    const vCirc = Math.sqrt(3.84e12 / r);
    const angle = Math.PI - 0.9; // enters umbra moving counterclockwise across full Earth shadow
    state = {
      ...state,
      status: 'ORBIT',
      position: { x: r * Math.cos(angle), y: 0, z: r * Math.sin(angle) },
      velocity: { x: -vCirc * Math.sin(angle), y: 0, z: vCirc * Math.cos(angle) },
    };

    for (let i = 0; i < 150 && state.status !== 'FAILED'; i++) {
      state = stepFlightSimulation(
        state,
        'SPACE_TELESCOPE',
        lowBattCraft,
        ground,
        { throttle: 0, pitchInput: 0, yawInput: 0 },
        5,
        'REALISTIC'
      );
    }

    expect(state.status).toBe('FAILED');
    expect(state.failureReason).toMatch(/Power blackout|battery/i);

    const debrief = generateDebrief('SPACE_TELESCOPE', lowBattCraft, ground, state, 'REALISTIC');
    expect(debrief.outcome).toBe('FAILED');
    expect(debrief.resources.power.status).toBe('CRITICAL');
  });
});
