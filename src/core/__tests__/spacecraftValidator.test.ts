import { describe, expect, it } from 'vitest';
import { RECOMMENDED_GROUND, RECOMMENDED_LOADOUTS } from '../constants';
import { validateSpacecraft } from '../spacecraftValidator';
import type { MissionId } from '../types';

describe('spacecraftValidator subsystem conflict rules', () => {
  it('accepts all 4 recommended mission loadouts cleanly with zero critical conflicts', () => {
    const missions: MissionId[] = [
      'EARTH_OBSERVATION',
      'SPACE_TELESCOPE',
      'MOON_LANDING',
      'MARS_LANDING',
    ];

    for (const m of missions) {
      const val = validateSpacecraft(
        m,
        RECOMMENDED_LOADOUTS[m],
        'REALISTIC',
        RECOMMENDED_GROUND[m]
      );
      expect(val.isComplete).toBe(true);
      expect(val.conflicts.filter((c) => c.severity === 'CRITICAL')).toHaveLength(0);
      expect(val.isLaunchable).toBe(true);
      expect(val.kapMood).toBe('HAPPY');
    }
  });

  it('flags structure payload overload & missing landing legs', () => {
    const overload = {
      ...RECOMMENDED_LOADOUTS.SPACE_TELESCOPE,
      structureId: 'struct-micro-bus', // max 180 kg vs 210 kg IR telescope
    };
    const res1 = validateSpacecraft('SPACE_TELESCOPE', overload, 'BEGINNER');
    expect(res1.conflicts.some((c) => c.id === 'struct-payload-overload')).toBe(true);

    const noLegs = {
      ...RECOMMENDED_LOADOUTS.MOON_LANDING,
      structureId: 'struct-micro-bus',
    };
    const res2 = validateSpacecraft('MOON_LANDING', noLegs, 'BEGINNER');
    expect(res2.conflicts.some((c) => c.id === 'struct-no-landing-legs')).toBe(true);
  });

  it('flags Mars solar irradiance power deficit', () => {
    const weakSolarMars = {
      ...RECOMMENDED_LOADOUTS.MARS_LANDING,
      powerId: 'power-small-solar', // 220 * 0.43 = 94.6 W << draw
    };
    const res = validateSpacecraft(
      'MARS_LANDING',
      weakSolarMars,
      'REALISTIC',
      RECOMMENDED_GROUND.MARS_LANDING
    );
    expect(res.conflicts.some((c) => c.id === 'power-deficit')).toBe(true);
    expect(res.isLaunchable).toBe(false);
  });

  it('flags battery eclipse blackout when battery cannot survive planetary shadow', () => {
    const tinyBatteryMoon = {
      ...RECOMMENDED_LOADOUTS.MOON_LANDING,
      batteryId: 'bat-liion-small', // 35 Wh vs 46.8 Wh needed for 900s lunar shadow
    };
    const res = validateSpacecraft(
      'MOON_LANDING',
      tinyBatteryMoon,
      'REALISTIC',
      RECOMMENDED_GROUND.MOON_LANDING
    );
    expect(res.power.batteryWh).toBe(35);
    expect(res.conflicts.some((c) => c.id === 'battery-eclipse-blackout')).toBe(true);
    expect(res.isLaunchable).toBe(false);
  });

  it('flags computer bus throughput bottleneck and non-rad-hard CPU in deep space', () => {
    const bottleneck = {
      ...RECOMMENDED_LOADOUTS.SPACE_TELESCOPE,
      computerId: 'cpu-basic-mcu', // 30 Mbps < 75 Mbps IR telescope AND !radHardened
    };
    const res = validateSpacecraft('SPACE_TELESCOPE', bottleneck, 'REALISTIC');
    expect(res.conflicts.some((c) => c.id === 'cpu-bottleneck')).toBe(true);
    expect(res.conflicts.some((c) => c.id === 'cpu-radiation-risk')).toBe(true);
  });

  it('flags ADCS magnetorquers in deep space and insufficient pointing tier for Space Telescope', () => {
    const magDeepSpace = {
      ...RECOMMENDED_LOADOUTS.MOON_LANDING,
      adcsId: 'adcs-magnetorquer',
    };
    const res1 = validateSpacecraft('MOON_LANDING', magDeepSpace, 'BEGINNER');
    expect(res1.conflicts.some((c) => c.id === 'adcs-no-mag-field')).toBe(true);

    const lowTierTelescope = {
      ...RECOMMENDED_LOADOUTS.SPACE_TELESCOPE,
      adcsId: 'adcs-reaction-wheels', // Tier 2 < Tier 3
    };
    const res2 = validateSpacecraft('SPACE_TELESCOPE', lowTierTelescope, 'BEGINNER');
    expect(res2.conflicts.some((c) => c.id === 'adcs-pointing-insufficient')).toBe(true);
  });

  it('flags missing Mars aeroshell heatshield and insufficient thermal control', () => {
    const noShieldMars = {
      ...RECOMMENDED_LOADOUTS.MARS_LANDING,
      thermalId: 'thermal-active-louvers',
    };
    const res1 = validateSpacecraft('MARS_LANDING', noShieldMars, 'BEGINNER');
    expect(res1.conflicts.some((c) => c.id === 'thermal-missing-heatshield')).toBe(true);

    const passiveMoon = {
      ...RECOMMENDED_LOADOUTS.MOON_LANDING,
      thermalId: 'thermal-passive-mli',
    };
    const res2 = validateSpacecraft('MOON_LANDING', passiveMoon, 'BEGINNER');
    expect(res2.conflicts.some((c) => c.id === 'thermal-insufficient')).toBe(true);
  });

  it('flags payload mission mismatch and underpowered launcher delta-V', () => {
    const wrongPayload = {
      ...RECOMMENDED_LOADOUTS.EARTH_OBSERVATION,
      payloadId: 'payload-surface-lander',
    };
    const res1 = validateSpacecraft('EARTH_OBSERVATION', wrongPayload, 'BEGINNER');
    expect(res1.conflicts.some((c) => c.id === 'payload-mismatch')).toBe(true);

    const lightToMars = {
      ...RECOMMENDED_LOADOUTS.MARS_LANDING,
      launcherId: 'launcher-light',
    };
    const res2 = validateSpacecraft('MARS_LANDING', lightToMars, 'REALISTIC');
    expect(res2.conflicts.some((c) => c.id === 'launcher-deltav-short')).toBe(true);
  });
});
