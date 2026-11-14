import { COMMS_BANDS, MISSIONS } from './constants';
import { evaluateGroundSegment } from './groundSegment';
import { validateSpacecraft } from './spacecraftValidator';
import type {
  CoupledMetrics,
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
  mode: DifficultyMode,
  launchCoupledMetrics?: CoupledMetrics
): DebriefReport {
  const mission = MISSIONS[missionId];
  const craftVal = validateSpacecraft(missionId, spacecraftConfig, mode, groundConfig);
  const groundEval = evaluateGroundSegment(missionId, spacecraftConfig, groundConfig, mode);
  const outcome: 'SUCCESS' | 'FAILED' =
    flightState.status === 'SUCCESS' ? 'SUCCESS' : 'FAILED';

  const band = COMMS_BANDS[groundConfig.bandId];

  // Use launch-time coupled metrics if available, else fall back to validation metrics
  const coupled = launchCoupledMetrics ?? craftVal.coupledMetrics;

  // 1. MASS & DELTA-V (using coupled metrics)
  const dvMargin = coupled.deltaVMarginMs;
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
        ? `Delivered ${craftVal.mass.spacecraftDryKg} kg spacecraft cleanly with ${flightState.deltaVRemainingMs.toFixed(0)} m/s fuel reserve (Delta-v margin: ${dvMargin.toFixed(0)} m/s).`
        : `Rocket structural integration achieved ${coupled.padTwr.toFixed(2)} pad TWR.`,
    whatWentWrong:
      massStatus === 'CRITICAL'
        ? flightState.failureReason ?? 'Insufficient propulsion or landing/entry protection.'
        : massStatus === 'WARNING'
          ? `Thin Delta-v margin (${dvMargin.toFixed(0)} m/s above target); payload-to-lift margin: ${coupled.payloadToLiftMarginKg.toFixed(0)} kg.`
          : `No structural or Delta-v anomalies detected. Payload-to-lift margin: ${coupled.payloadToLiftMarginKg.toFixed(0)} kg.`,
    beginnerNote:
      massStatus === 'OPTIMAL'
        ? 'Your rocket had enough muscle to lift off, climb into space, and finish the flight with spare fuel.'
        : 'Lighter spacecraft parts or a stronger rocket/heatshield would give you much safer flight margins.',
    realisticMetrics: `Dry: ${craftVal.mass.spacecraftDryKg} kg | Wet: ${craftVal.mass.launchTotalMassKg} kg | TWR: ${coupled.padTwr.toFixed(2)} | Delta-v Expended: ${flightState.deltaVExpendedMs.toFixed(0)} m/s | Remaining: ${flightState.deltaVRemainingMs.toFixed(0)} m/s | Delta-v Margin: ${dvMargin.toFixed(0)} m/s | Lift Margin: ${coupled.payloadToLiftMarginKg.toFixed(0)} kg`,
  };

  // 2. POWER (using coupled metrics: solar flux, dual power modes, thermal heaters)
  const powerFailed =
    outcome === 'FAILED' &&
    Boolean(flightState.failureReason?.match(/Power blackout|battery/i));
  const solarPct = Math.round(coupled.irradianceFactor * 100);
  const powerStatus: ResourceDebrief['status'] = powerFailed
    ? 'CRITICAL'
    : flightState.minBatteryPct < 30
      ? 'WARNING'
      : 'OPTIMAL';

  const powerDebrief: ResourceDebrief = {
    status: powerStatus,
    whatWentRight:
      powerStatus !== 'CRITICAL'
        ? `Power bus stayed online through eclipses (lowest battery: ${flightState.minBatteryPct.toFixed(0)}%). Solar flux: ${solarPct}% of Earth.`
        : `Solar/RTG array peaked at ${coupled.sunlitGenerationW.toFixed(0)} W (${solarPct}% Earth flux).`,
    whatWentWrong:
      powerStatus === 'CRITICAL'
        ? flightState.failureReason ?? 'Battery ran dry during shadow crossing.'
        : powerStatus === 'WARNING'
          ? `Battery dipped to ${flightState.minBatteryPct.toFixed(0)}% during shadow. Cruise margin: ${coupled.netCruiseW.toFixed(0)} W, Peak margin: ${coupled.netPeakW.toFixed(0)} W.`
          : `Zero brownouts. Cruise margin: +${coupled.netCruiseW.toFixed(0)} W, Peak margin: +${coupled.netPeakW.toFixed(0)} W. Thermal heaters: sunlit ${coupled.sunlitSurvivalHeaterW.toFixed(0)} W, shadow ${coupled.shadowSurvivalHeaterW.toFixed(0)} W.`,
    beginnerNote:
      powerStatus === 'OPTIMAL'
        ? `Your solar panels/RTG and battery kept the lights on even on the dark side. Sunlight here is ${solarPct}% of Earth orbit.`
        : `In shadow, solar panels produce 0 W — bring a bigger battery or an RTG nuclear battery for dark/deep space. At ${solarPct}% solar flux, solar arrays need to be ${(100/solarPct).toFixed(0)}% larger than at Earth.`,
    realisticMetrics: `Gen: ${coupled.sunlitGenerationW.toFixed(0)} W sunlit (${coupled.eclipseGenerationW.toFixed(0)} W eclipse) @ ${solarPct}% flux | Cruise: ${coupled.cruisePowerW.toFixed(0)} W (margin: ${coupled.netCruiseW.toFixed(0)} W) | Peak: ${coupled.peakPowerW.toFixed(0)} W (margin: ${coupled.netPeakW.toFixed(0)} W) | Sunlit heaters: ${coupled.sunlitSurvivalHeaterW.toFixed(0)} W | Shadow heaters: ${coupled.shadowSurvivalHeaterW.toFixed(0)} W | Min SoC: ${flightState.minBatteryPct.toFixed(1)}%`,
  };

  // 3. BUDGET (using coupled metrics)
  const overBudget = coupled.totalCampaignCostM > mission.budgetCapM;
  const budgetPct = (coupled.totalCampaignCostM / mission.budgetCapM) * 100;
  const budgetStatus: ResourceDebrief['status'] = overBudget
    ? 'CRITICAL'
    : budgetPct > 92
      ? 'WARNING'
      : 'OPTIMAL';

  const budgetDebrief: ResourceDebrief = {
    status: budgetStatus,
    whatWentRight: !overBudget
      ? `Campaign cost $${coupled.totalCampaignCostM}M stayed within $${mission.budgetCapM}M NASA ceiling (margin: $${coupled.budgetMarginM}M).`
      : `Invested $${coupled.totalCraftAndLauncherM}M in flight hardware.`,
    whatWentWrong: overBudget
      ? `Over budget by $${coupled.totalCampaignCostM - mission.budgetCapM}M.`
      : budgetPct > 92
        ? `Used ${budgetPct.toFixed(0)}% of budget ceiling — minimal contingency reserve ($${coupled.budgetMarginM}M).`
        : 'All hardware, launch, and ops costs balanced cleanly.',
    beginnerNote:
      overBudget
        ? 'Try swapping to a lighter launcher or cheaper subsystem options to stay under NASA budget cap.'
        : 'Smart cost discipline — you delivered mission science without overspending.',
    realisticMetrics: `Craft+LV: $${coupled.totalCraftAndLauncherM}M | Ground: $${coupled.groundCostM}M | Ops (${groundConfig.plannedLifetimeYears}y): $${coupled.opsCostM}M | Total: $${coupled.totalCampaignCostM}M | Cap: $${mission.budgetCapM}M | Margin: $${coupled.budgetMarginM}M`,
  };

  // 4. DATA (using coupled metrics for bus & downlink margin)
  const dataStatus: ResourceDebrief['status'] =
    outcome === 'FAILED' && flightState.deliveredDataMb < mission.targetScienceMb
      ? 'CRITICAL'
      : flightState.droppedDataMb > 10
        ? 'WARNING'
        : 'OPTIMAL';

  const dataDebrief: ResourceDebrief = {
    status: dataStatus,
    whatWentRight: `Delivered ${flightState.deliveredDataMb.toFixed(1)} / ${mission.targetScienceMb} MB of target science data. Bus margin: ${coupled.dataBusMarginMbps} Mbps, Downlink: ${coupled.commsDownlinkMbps.toFixed(1)} Mbps.`,
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
    realisticMetrics: `Delivered: ${flightState.deliveredDataMb.toFixed(1)} MB | Dropped: ${flightState.droppedDataMb.toFixed(1)} MB | Buffer: ${flightState.storageMaxMb} MB | Payload: ${craftVal.data.payloadDataRateMbps} Mbps | Bus: ${craftVal.data.cpuMaxMbps} Mbps (margin: ${coupled.dataBusMarginMbps} Mbps) | Downlink: ${coupled.commsDownlinkMbps.toFixed(1)} Mbps`,
  };

  // 5. COMMS (using coupled metrics)
  const commsStatus: ResourceDebrief['status'] =
    groundConfig.activeStationIds.length === 0
      ? 'CRITICAL'
      : groundEval.bufferOverflowRisk === 'CRITICAL'
        ? 'WARNING'
        : 'OPTIMAL';

  const commsDebrief: ResourceDebrief['status'] = commsStatus;

  const commsReport: ResourceDebrief = {
    status: commsDebrief,
    whatWentRight: `${band.name} link over ${groundConfig.activeStationIds.length} ground station(s) achieved ${groundEval.contactCoveragePct}% coverage. Downlink capacity: ${coupled.commsDownlinkMbps.toFixed(1)} Mbps.`,
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
    realisticMetrics: `Band: ${band.name} (${band.bandwidthMbps} Mbps) | Coverage: ${groundEval.contactCoveragePct}% | Contact/Orbit: ${groundEval.contactSecPerOrbit}s | Distance factor: ${mission.distanceCommsFactor}x | Downlink: ${coupled.commsDownlinkMbps.toFixed(1)} Mbps`,
  };

  // 6. TIME & SCHEDULE (using coupled metrics)
  const overTime = coupled.buildMonths > mission.scheduleLimitMonths;
  const timeStatus: ResourceDebrief['status'] = overTime
    ? 'CRITICAL'
    : outcome === 'FAILED'
      ? 'WARNING'
      : 'OPTIMAL';

  const timeDebrief: ResourceDebrief = {
    status: timeStatus,
    whatWentRight: !overTime
      ? `Built in ${coupled.buildMonths} months (limit ${mission.scheduleLimitMonths} mo); flight elapsed ${Math.round(flightState.elapsedFlightSec)}s.`
      : `Flight simulation logged ${Math.round(flightState.elapsedFlightSec)}s telemetry.`,
    whatWentWrong: overTime
      ? `Exceeded launch window by ${coupled.buildMonths - mission.scheduleLimitMonths} months.`
      : outcome === 'FAILED'
        ? `Flight terminated prematurely at T+${Math.round(flightState.elapsedFlightSec)}s.`
        : 'Met integration window and flight milestones on time.',
    beginnerNote:
      overTime
        ? 'Faster-to-build parts help you hit strict planetary launch windows.'
        : 'Great schedule management — integrated on time and reached operational phase smoothly.',
    realisticMetrics: `Campaign Build: ${coupled.buildMonths}/${mission.scheduleLimitMonths} mo | Orbit: ${flightState.enteredOrbitAtSec ? `T+${Math.round(flightState.enteredOrbitAtSec)}s` : 'N/A'} | Target: ${flightState.reachedTargetAtSec ? `T+${Math.round(flightState.reachedTargetAtSec)}s` : 'N/A'}`,
  };

  const headline =
    outcome === 'SUCCESS'
      ? `${mission.title}: MISSION ACCOMPLISHED`
      : `${mission.title}: MISSION FAILURE`;

  const kapSummary =
    outcome === 'SUCCESS'
      ? mode === 'BEGINNER'
        ? `Outstanding flight, Commander! Your ${craftVal.mass.spacecraftDryKg} kg spacecraft survived launch, powered through shadows, and beamed all ${mission.targetScienceMb} MB of science back to Earth.`
        : `Nominal campaign completion. All ${mission.targetScienceMb} MB science telemetry downlinked via ${band.name}; remaining Delta-v ${flightState.deltaVRemainingMs.toFixed(0)} m/s.`
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