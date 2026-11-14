import { describe, expect, it } from 'vitest';
import { RECOMMENDED_GROUND, RECOMMENDED_LOADOUTS } from '../constants';
import { computeContactCoverage, evaluateGroundSegment } from '../groundSegment';

describe('groundSegment DSN & link budget evaluation', () => {
  it('scales contact coverage by active ground stations and orbit altitude', () => {
    const none = computeContactCoverage([], 150_000, 'LEO');
    const one = computeContactCoverage(['goldstone'], 150_000, 'LEO');
    const three = computeContactCoverage(['goldstone', 'madrid', 'canberra'], 150_000, 'LEO');
    const withPolar = computeContactCoverage(
      ['goldstone', 'madrid', 'canberra', 'svalbard'],
      150_000,
      'LEO'
    );
    const moonWithRelay = computeContactCoverage(
      ['goldstone', 'madrid', 'canberra', 'lunar-relay'],
      2_600_000,
      'MOON_SURFACE'
    );

    expect(none).toBe(0);
    expect(one).toBeGreaterThan(0);
    expect(three).toBeGreaterThan(one);
    expect(withPolar).toBeGreaterThan(three);
    expect(moonWithRelay).toBeGreaterThan(80);
  });

  it('flags S-Band buffer overflow on high-rate Earth Observation and clears with X-Band', () => {
    const craft = RECOMMENDED_LOADOUTS.EARTH_OBSERVATION;
    const sBandEval = evaluateGroundSegment(
      'EARTH_OBSERVATION',
      craft,
      {
        activeStationIds: ['goldstone', 'madrid', 'canberra'],
        bandId: 'S_BAND',
        plannedLifetimeYears: 1,
      },
      'REALISTIC'
    );
    expect(sBandEval.bufferOverflowRisk).toBe('CRITICAL');
    expect(sBandEval.canGreenlight).toBe(false);

    const xBandEval = evaluateGroundSegment(
      'EARTH_OBSERVATION',
      craft,
      RECOMMENDED_GROUND.EARTH_OBSERVATION,
      'REALISTIC'
    );
    expect(xBandEval.bufferOverflowRisk).toBe('NONE');
    expect(xBandEval.canGreenlight).toBe(true);
  });

  it('greenlights all 4 recommended mission + ground pairings within budget and schedule', () => {
    const missions = [
      'EARTH_OBSERVATION',
      'SPACE_TELESCOPE',
      'MOON_LANDING',
      'MARS_LANDING',
    ] as const;

    for (const m of missions) {
      const evalRes = evaluateGroundSegment(
        m,
        RECOMMENDED_LOADOUTS[m],
        RECOMMENDED_GROUND[m],
        'BEGINNER'
      );
      expect(evalRes.canGreenlight).toBe(true);
      expect(evalRes.conflicts.filter((c) => c.severity === 'CRITICAL')).toHaveLength(0);
    }
  });

  it('blocks greenlight when zero ground stations are active or budget cap exceeded', () => {
    const noStations = evaluateGroundSegment(
      'EARTH_OBSERVATION',
      RECOMMENDED_LOADOUTS.EARTH_OBSERVATION,
      {
        activeStationIds: [],
        bandId: 'X_BAND',
        plannedLifetimeYears: 1,
      },
      'BEGINNER'
    );
    expect(noStations.canGreenlight).toBe(false);
    expect(noStations.conflicts.some((c) => c.id === 'ground-no-stations')).toBe(true);

    // Expensive add-ons push Earth Observation over $175M cap
    const overBudget = evaluateGroundSegment(
      'EARTH_OBSERVATION',
      RECOMMENDED_LOADOUTS.EARTH_OBSERVATION,
      {
        activeStationIds: ['goldstone', 'madrid', 'canberra', 'svalbard', 'lunar-relay'],
        bandId: 'KA_BAND',
        plannedLifetimeYears: 5,
      },
      'REALISTIC'
    );
    expect(overBudget.canGreenlight).toBe(false);
    expect(overBudget.conflicts.some((c) => c.resource === 'budget')).toBe(true);
  });
});
