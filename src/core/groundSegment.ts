import {
  COMMS_BANDS,
  GROUND_STATIONS_BY_ID,
  LIFETIME_OPS_COST_M,
  MISSIONS,
} from './constants';
import { validateSpacecraft } from './spacecraftValidator';
import type {
  DifficultyMode,
  EngineeringConflict,
  GroundConfig,
  GroundEvaluation,
  MissionId,
  MissionSpec,
  SpacecraftConfig,
} from './types';

export function computeContactCoverage(
  stationIds: string[],
  orbitAltM: number,
  targetType: MissionSpec['targetType']
): number {
  if (stationIds.length === 0) return 0;

  const uniqueIds = Array.from(new Set(stationIds));
  let coverage = 0;

  const isLeo = targetType === 'LEO' || orbitAltM < 500_000;

  for (const id of uniqueIds) {
    const station = GROUND_STATIONS_BY_ID[id];
    if (!station) continue;

    if (station.isOrbitalRelay) {
      coverage += isLeo ? 12 : 35;
    } else if (id === 'svalbard') {
      coverage += isLeo ? 18 : 8;
    } else {
      // Goldstone / Madrid / Canberra 70m DSN complex
      coverage += isLeo ? 14 : 18.5;
    }
  }

  return Math.min(96, Math.round(coverage * 10) / 10);
}

export function evaluateGroundSegment(
  missionId: MissionId,
  spacecraftConfig: SpacecraftConfig,
  groundConfig: GroundConfig,
  mode: DifficultyMode
): GroundEvaluation {
  const mission = MISSIONS[missionId];
  const craftValidation = validateSpacecraft(missionId, spacecraftConfig, mode, groundConfig);
  const band = COMMS_BANDS[groundConfig.bandId];

  const uniqueStations = Array.from(new Set(groundConfig.activeStationIds))
    .map((id) => GROUND_STATIONS_BY_ID[id])
    .filter(Boolean);

  const contactCoveragePct = computeContactCoverage(
    groundConfig.activeStationIds,
    mission.orbitAltitudeTargetM,
    mission.targetType
  );
  const contactSecPerOrbit = Math.round((contactCoveragePct / 100) * mission.referencePeriodSec);

  const payloadMbps = craftValidation.data.payloadDataRateMbps;
  const dataGeneratedPerOrbitMb =
    (payloadMbps * mission.observationDutyCycle * mission.referencePeriodSec) / 8;

  const effectiveDownlinkMbps = band.bandwidthMbps * mission.distanceCommsFactor;
  const downlinkCapacityPerOrbitMb = (effectiveDownlinkMbps * contactSecPerOrbit) / 8;

  let bufferOverflowRisk: 'NONE' | 'WARNING' | 'CRITICAL' = 'NONE';
  if (contactCoveragePct === 0 || downlinkCapacityPerOrbitMb < dataGeneratedPerOrbitMb * 0.9) {
    bufferOverflowRisk = 'CRITICAL';
  } else if (downlinkCapacityPerOrbitMb < dataGeneratedPerOrbitMb * 1.15) {
    bufferOverflowRisk = 'WARNING';
  }

  const stationCostM = uniqueStations.reduce((s, st) => s + st.costM, 0);
  const groundCostM = stationCostM + band.costM;
  const opsCostM = LIFETIME_OPS_COST_M[groundConfig.plannedLifetimeYears];
  const totalCampaignCostM =
    craftValidation.budget.totalCraftAndLauncherM + groundCostM + opsCostM;

  const stationLeadMonths = uniqueStations.reduce((s, st) => s + st.leadMonths, 0);
  const groundLeadMonths = band.leadMonths + stationLeadMonths;
  const totalCampaignMonths = craftValidation.schedule.buildMonths + groundLeadMonths;

  const conflicts: EngineeringConflict[] = [...craftValidation.conflicts];

  if (uniqueStations.length === 0) {
    conflicts.push({
      id: 'ground-no-stations',
      severity: 'CRITICAL',
      resource: 'comms',
      affectedCategory: 'ground',
      beginnerMessage: 'No ground stations active! Your spacecraft will never be able to call home.',
      realisticMessage: 'Zero DSN apertures allocated; 0% downlink duty cycle.',
    });
  }

  if (bufferOverflowRisk === 'CRITICAL' && uniqueStations.length > 0) {
    conflicts.push({
      id: 'ground-buffer-overflow',
      severity: 'CRITICAL',
      resource: 'data',
      affectedCategory: 'ground',
      beginnerMessage: `Radio too slow! ${band.name} only downloads ${downlinkCapacityPerOrbitMb.toFixed(0)} MB/orbit while your camera makes ${dataGeneratedPerOrbitMb.toFixed(0)} MB/orbit — upgrade to X-Band or Ka-Band!`,
      realisticMessage: `Downlink deficit: ${downlinkCapacityPerOrbitMb.toFixed(0)} MB/orbit < ${dataGeneratedPerOrbitMb.toFixed(0)} MB/orbit science generation; onboard buffer will saturate & drop packets.`,
    });
  } else if (bufferOverflowRisk === 'WARNING') {
    conflicts.push({
      id: 'ground-tight-margin',
      severity: 'WARNING',
      resource: 'comms',
      affectedCategory: 'ground',
      beginnerMessage: `Radio link margin is tight (${downlinkCapacityPerOrbitMb.toFixed(0)} MB downlink vs ${dataGeneratedPerOrbitMb.toFixed(0)} MB/orbit). Adding another dish or faster band helps.`,
      realisticMessage: `Slim link margin (<15% downlink headroom); consider higher band or polar/relay aperture.`,
    });
  }

  if (totalCampaignCostM > mission.budgetCapM) {
    // Avoid duplicating craft-only cap conflict if already triggered, or replace with campaign total
    const hasCraftBudget = conflicts.some((c) => c.id === 'budget-craft-over-cap');
    if (!hasCraftBudget) {
      conflicts.push({
        id: 'budget-campaign-over-cap',
        severity: 'CRITICAL',
        resource: 'budget',
        affectedCategory: 'ground',
        beginnerMessage: `Total campaign cost ($${totalCampaignCostM}M) exceeds the $${mission.budgetCapM}M NASA budget!`,
        realisticMessage: `Total campaign EAC $${totalCampaignCostM}M exceeds $${mission.budgetCapM}M cap (Craft $${craftValidation.budget.totalCraftAndLauncherM}M + Ground $${groundCostM}M + Ops $${opsCostM}M).`,
      });
    }
  }

  if (totalCampaignMonths > mission.scheduleLimitMonths) {
    const hasCraftSchedule = conflicts.some((c) => c.id === 'schedule-craft-over-cap');
    if (!hasCraftSchedule) {
      conflicts.push({
        id: 'schedule-campaign-over-cap',
        severity: 'CRITICAL',
        resource: 'time',
        affectedCategory: 'ground',
        beginnerMessage: `Campaign timeline (${totalCampaignMonths} mo) misses the ${mission.scheduleLimitMonths}-month launch window!`,
        realisticMessage: `Total campaign integration (${totalCampaignMonths} mo) misses ${mission.scheduleLimitMonths}-month planetary/orbital window.`,
      });
    }
  }

  const criticalCount = conflicts.filter((c) => c.severity === 'CRITICAL').length;
  const canGreenlight = craftValidation.isComplete && criticalCount === 0;

  let kapRecommendation =
    'Ground & Spacecraft integrated within budget, schedule, and link margin. Greenlit for Launch!';
  if (!canGreenlight) {
    const firstCrit = conflicts.find((c) => c.severity === 'CRITICAL');
    kapRecommendation = firstCrit
      ? mode === 'BEGINNER'
        ? firstCrit.beginnerMessage
        : firstCrit.realisticMessage
      : 'Finish spacecraft assembly before launch clearance.';
  } else if (bufferOverflowRisk === 'WARNING') {
    kapRecommendation =
      'Launch cleared, though link margin is tight — watch onboard memory during orbital passes.';
  }

  return {
    contactCoveragePct,
    contactSecPerOrbit,
    dataGeneratedPerOrbitMb,
    downlinkCapacityPerOrbitMb,
    bufferOverflowRisk,
    groundCostM,
    opsCostM,
    totalCampaignCostM,
    groundLeadMonths,
    totalCampaignMonths,
    canGreenlight,
    conflicts,
    kapRecommendation,
  };
}
