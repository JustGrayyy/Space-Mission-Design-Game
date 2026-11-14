import { COMMS_BANDS, MISSIONS } from './constants';
import { evaluateGroundSegment } from './groundSegment';
import { validateSpacecraft } from './spacecraftValidator';
import type {
  DebriefReport,
  DifficultyMode,
  FlightState,
  GroundConfig,
  MissionId,
  ResourceDebrief,
  SpacecraftConfig,
} from './types';

export function generateDebrief(
  missionId: MissionId,
  spacecraftConfig: SpacecraftConfig,
  groundConfig: GroundConfig,
  flightState: FlightState,
  mode: DifficultyMode
): DebriefReport {
  const mission = MISSIONS[missionId];
  const craftVal = validateSpacecraft(missionId, spacecraftConfig, mode, groundConfig);
  const groundEval = evaluateGroundSegment(missionId, spacecraftConfig, groundConfig, mode);
  const outcome: 'SUCCESS' | 'FAILED' =
    flightState.status === 'SUCCESS' ? 'SUCCESS' : 'FAILED';

  const band = COMMS_BANDS[groundConfig.bandId];

  // 1. MASS & DELTA-V
  const dvMargin = craftVal.mass.totalDeltaVMs - mission.targetDeltaVMs;
  const massFailed =
    outcome === 'FAILED' &&
    Boolean(
      flightState.failureReason?.match(
        /TWR|Thrust-to-weight|crash|shock|Orbital decay|Suborbital|Burned up/i
      )
    );
  const massStatus: ResourceDebrief['status'] = massFailed
    ? 'CRITICAL'
    : dvMargin < 150
      ? 'WARNING'
      : 'OPTIMAL';

  const massDebrief: ResourceDebrief = {
    status: massStatus,
    whatWentRight:
      massStatus === 'OPTIMAL'
        ? `Delivered ${craftVal.mass.spacecraftDryKg} kg spacecraft cleanly with ${flightState.deltaVRemainingMs.toFixed(0)} m/s fuel reserve.`
        : `Rocket structural integration achieved ${craftVal.mass.padTwr.toFixed(2)} pad TWR.`,
    whatWentWrong:
      massStatus === 'CRITICAL'
        ? flightState.failureReason ?? 'Insufficient propulsion or landing/entry protection.'
        : massStatus === 'WARNING'
          ? `Thin Δv margin (${dvMargin.toFixed(0)} m/s above target).`
          : 'No structural or Δv anomalies detected.',
    beginnerNote:
      massStatus === 'OPTIMAL'
        ? 'Your rocket had enough muscle to lift off, climb into space, and finish the flight with spare fuel.'
        : 'Lighter spacecraft parts or a stronger rocket/heatshield would give you much safer flight margins.',
    realisticMetrics: `Dry: ${craftVal.mass.spacecraftDryKg} kg | Wet: ${craftVal.mass.launchTotalMassKg} kg | TWR: ${craftVal.mass.padTwr.toFixed(2)} | Δv Expended: ${flightState.deltaVExpendedMs.toFixed(0)} m/s | Remaining: ${flightState.deltaVRemainingMs.toFixed(0)} m/s`,
  };

  // 2. POWER
  const powerFailed =
    outcome === 'FAILED' &&
    Boolean(flightState.failureReason?.match(/Power blackout|battery/i));
  const powerStatus: ResourceDebrief['status'] = powerFailed
    ? 'CRITICAL'
    : flightState.minBatteryPct < 30
      ? 'WARNING'
      : 'OPTIMAL';

  const powerDebrief: ResourceDebrief = {
    status: powerStatus,
    whatWentRight:
      powerStatus !== 'CRITICAL'
        ? `Power bus stayed online through eclipses (lowest battery: ${flightState.minBatteryPct.toFixed(0)}%).`
        : `Solar/RTG array peaked at ${craftVal.power.sunlitGenerationW.toFixed(0)} W.`,
    whatWentWrong:
      powerStatus === 'CRITICAL'
        ? flightState.failureReason ?? 'Battery ran dry during shadow crossing.'
        : powerStatus === 'WARNING'
          ? `Battery dipped to ${flightState.minBatteryPct.toFixed(0)}% during shadow.`
          : 'Zero brownouts or power bus resets.',
    beginnerNote:
      powerStatus === 'OPTIMAL'
        ? 'Your solar panels/RTG and battery kept the lights on even on the dark side of the planet.'
        : 'In shadow, solar panels produce 0 W — bring a bigger battery or an RTG nuclear battery for dark/deep space.',
    realisticMetrics: `Gen: ${craftVal.power.sunlitGenerationW.toFixed(0)} W sunlit (${craftVal.power.eclipseGenerationW.toFixed(0)} W eclipse) | Load: ${craftVal.power.totalDrawW} W | Min SoC: ${flightState.minBatteryPct.toFixed(1)}%`,
  };

  // 3. BUDGET
  const overBudget = groundEval.totalCampaignCostM > mission.budgetCapM;
  const budgetPct = (groundEval.totalCampaignCostM / mission.budgetCapM) * 100;
  const budgetStatus: ResourceDebrief['status'] = overBudget
    ? 'CRITICAL'
    : budgetPct > 92
      ? 'WARNING'
      : 'OPTIMAL';

  const budgetDebrief: ResourceDebrief = {
    status: budgetStatus,
    whatWentRight: !overBudget
      ? `Campaign cost $${groundEval.totalCampaignCostM}M stayed within $${mission.budgetCapM}M NASA ceiling.`
      : `Invested $${craftVal.budget.totalCraftAndLauncherM}M in flight hardware.`,
    whatWentWrong: overBudget
      ? `Over budget by $${groundEval.totalCampaignCostM - mission.budgetCapM}M.`
      : budgetPct > 92
        ? `Used ${budgetPct.toFixed(0)}% of budget ceiling — minimal contingency reserve.`
        : 'All hardware, launch, and ops costs balanced cleanly.',
    beginnerNote:
      overBudget
        ? 'Try swapping to a lighter launcher or cheaper subsystem options to stay under NASA’s budget cap.'
        : 'Smart cost discipline — you delivered mission science without overspending.',
    realisticMetrics: `Craft+LV: $${craftVal.budget.totalCraftAndLauncherM}M | Ground: $${groundEval.groundCostM}M | Ops (${groundConfig.plannedLifetimeYears}y): $${groundEval.opsCostM}M | Cap: $${mission.budgetCapM}M`,
  };

  // 4. DATA
  const dataStatus: ResourceDebrief['status'] =
    outcome === 'FAILED' && flightState.deliveredDataMb < mission.targetScienceMb
      ? 'CRITICAL'
      : flightState.droppedDataMb > 10
        ? 'WARNING'
        : 'OPTIMAL';

  const dataDebrief: ResourceDebrief = {
    status: dataStatus,
    whatWentRight: `Delivered ${flightState.deliveredDataMb.toFixed(1)} / ${mission.targetScienceMb} MB of target science data.`,
    whatWentWrong:
      flightState.droppedDataMb > 10
        ? `Buffer overflow dropped ${flightState.droppedDataMb.toFixed(1)} MB of science packets.`
        : outcome === 'FAILED'
          ? 'Mission ended before science target was fully transmitted.'
          : 'Zero packet loss during science operations.',
    beginnerNote:
      flightState.droppedDataMb > 10
        ? 'Your camera filled onboard memory faster than the radio could empty it — upgrade computer storage or radio speed!'
        : 'Every byte of science data was captured cleanly and beamed home.',
    realisticMetrics: `Delivered: ${flightState.deliveredDataMb.toFixed(1)} MB | Dropped: ${flightState.droppedDataMb.toFixed(1)} MB | Buffer: ${flightState.storageMaxMb} MB | Rate: ${craftVal.data.payloadDataRateMbps} Mbps`,
  };

  // 5. COMMS
  const commsStatus: ResourceDebrief['status'] =
    groundConfig.activeStationIds.length === 0
      ? 'CRITICAL'
      : groundEval.bufferOverflowRisk === 'CRITICAL'
        ? 'WARNING'
        : 'OPTIMAL';

  const commsDebrief: ResourceDebrief['status'] = commsStatus;

  const commsReport: ResourceDebrief = {
    status: commsDebrief,
    whatWentRight: `${band.name} link over ${groundConfig.activeStationIds.length} ground station(s) achieved ${groundEval.contactCoveragePct}% coverage.`,
    whatWentWrong:
      groundConfig.activeStationIds.length === 0
        ? 'Zero ground stations selected — total communications blackout.'
        : groundEval.bufferOverflowRisk !== 'NONE'
          ? 'Downlink bandwidth trailed peak payload generation rate.'
          : 'Clean carrier lock during ground station passes.',
    beginnerNote:
      commsDebrief === 'OPTIMAL'
        ? 'Your Deep Space Network dishes and radio band kept strong contact with the spacecraft.'
        : 'Adding DSN dishes or upgrading from S-Band to X-Band/Ka-Band boosts download speed.',
    realisticMetrics: `Band: ${band.name} (${band.bandwidthMbps} Mbps) | Coverage: ${groundEval.contactCoveragePct}% | Contact/Orbit: ${groundEval.contactSecPerOrbit}s`,
  };

  // 6. TIME & SCHEDULE
  const overTime = groundEval.totalCampaignMonths > mission.scheduleLimitMonths;
  const timeStatus: ResourceDebrief['status'] = overTime
    ? 'CRITICAL'
    : outcome === 'FAILED'
      ? 'WARNING'
      : 'OPTIMAL';

  const timeDebrief: ResourceDebrief = {
    status: timeStatus,
    whatWentRight: !overTime
      ? `Built in ${groundEval.totalCampaignMonths} months (limit ${mission.scheduleLimitMonths} mo); flight elapsed ${Math.round(flightState.elapsedFlightSec)}s.`
      : `Flight simulation logged ${Math.round(flightState.elapsedFlightSec)}s telemetry.`,
    whatWentWrong: overTime
      ? `Exceeded launch window by ${groundEval.totalCampaignMonths - mission.scheduleLimitMonths} months.`
      : outcome === 'FAILED'
        ? `Flight terminated prematurely at T+${Math.round(flightState.elapsedFlightSec)}s.`
        : 'Met integration window and flight milestones on time.',
    beginnerNote:
      overTime
        ? 'Faster-to-build parts help you hit strict planetary launch windows.'
        : 'Great schedule management — integrated on time and reached operational phase smoothly.',
    realisticMetrics: `Campaign Build: ${groundEval.totalCampaignMonths}/${mission.scheduleLimitMonths} mo | Orbit: ${flightState.enteredOrbitAtSec ? `T+${Math.round(flightState.enteredOrbitAtSec)}s` : 'N/A'} | Target: ${flightState.reachedTargetAtSec ? `T+${Math.round(flightState.reachedTargetAtSec)}s` : 'N/A'}`,
  };

  const headline =
    outcome === 'SUCCESS'
      ? `${mission.title}: MISSION ACCOMPLISHED`
      : `${mission.title}: MISSION FAILURE`;

  const kapSummary =
    outcome === 'SUCCESS'
      ? mode === 'BEGINNER'
        ? `Outstanding flight, Commander! Your ${craftVal.mass.spacecraftDryKg} kg spacecraft survived launch, powered through shadows, and beamed all ${mission.targetScienceMb} MB of science back to Earth.`
        : `Nominal campaign completion. All ${mission.targetScienceMb} MB science telemetry downlinked via ${band.name}; remaining Δv ${flightState.deltaVRemainingMs.toFixed(0)} m/s.`
      : mode === 'BEGINNER'
        ? `Flight ended early: ${flightState.failureReason ?? 'Unknown anomaly'}. Review the red cards below and tweak your build in the Hangar!`
        : `Anomaly termination at T+${Math.round(flightState.elapsedFlightSec)}s: ${flightState.failureReason ?? 'Telemetry lost'}. Inspect subsystem margins below.`;

  return {
    outcome,
    headline,
    kapSummary,
    resources: {
      mass: massDebrief,
      power: powerDebrief,
      budget: budgetDebrief,
      data: dataDebrief,
      comms: commsReport,
      time: timeDebrief,
    },
  };
}
