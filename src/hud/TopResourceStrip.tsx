import React from 'react';
import { COMMS_BANDS, MISSIONS } from '../core/constants';
import { evaluateGroundSegment } from '../core/groundSegment';
import { validateSpacecraft } from '../core/spacecraftValidator';
import { useMissionStore } from '../store/useMissionStore';

export const TopResourceStrip: React.FC = () => {
  const phase = useMissionStore((s) => s.phase);
  const difficulty = useMissionStore((s) => s.difficulty);
  const missionId = useMissionStore((s) => s.missionId);
  const spacecraft = useMissionStore((s) => s.spacecraft);
  const ground = useMissionStore((s) => s.ground);
  const flight = useMissionStore((s) => s.flight);
  const setDifficulty = useMissionStore((s) => s.setDifficulty);

  if (phase === 'TITLE') return null;

  const mission = MISSIONS[missionId];
  const craftVal = validateSpacecraft(missionId, spacecraft, difficulty, ground);
  const groundEval = evaluateGroundSegment(missionId, spacecraft, ground, difficulty);
  const band = COMMS_BANDS[ground.bandId];

  const isBeginner = difficulty === 'BEGINNER';

  const massValue =
    phase === 'FLIGHT' && flight
      ? isBeginner
        ? `${Math.round(flight.deltaVRemainingMs)} m/s fuel`
        : `${Math.round(flight.deltaVRemainingMs)} m/s Δv`
      : isBeginner
        ? `${craftVal.mass.spacecraftDryKg} kg`
        : `${craftVal.mass.spacecraftDryKg}kg · ${Math.round(craftVal.mass.totalDeltaVMs)}m/s`;

  const powerValue =
    phase === 'FLIGHT' && flight
      ? isBeginner
        ? `${Math.round((flight.batteryWh / Math.max(1, flight.batteryMaxWh)) * 100)}% bat`
        : `${Math.round(flight.currentPowerGenW - flight.currentPowerDrawW)}W · ${Math.round(flight.batteryWh)}Wh`
      : isBeginner
        ? `${Math.round(craftVal.power.netSunlitW)}W net`
        : `${Math.round(craftVal.power.sunlitGenerationW)}/${craftVal.power.totalDrawW}W · ${craftVal.power.batteryWh}Wh`;

  const totalCostM =
    phase === 'HANGAR' || phase === 'OBJECTIVE_SELECT'
      ? craftVal.budget.totalCraftAndLauncherM
      : groundEval.totalCampaignCostM;
  const budgetOver = totalCostM > mission.budgetCapM;

  const dataValue =
    phase === 'FLIGHT' && flight
      ? `${Math.round(flight.deliveredDataMb)}/${mission.targetScienceMb} MB`
      : isBeginner
        ? `${craftVal.data.payloadDataRateMbps} Mbps`
        : `${craftVal.data.payloadDataRateMbps}/${craftVal.data.cpuMaxMbps} Mbps`;

  const commsValue =
    phase === 'FLIGHT' && flight
      ? `${flight.activeDsnStationIds.length} link · ${band.id.replace('_BAND', '')}`
      : `${groundEval.contactCoveragePct}% · ${band.id.replace('_BAND', '')}`;

  const totalMonths =
    phase === 'HANGAR' || phase === 'OBJECTIVE_SELECT'
      ? craftVal.schedule.buildMonths
      : groundEval.totalCampaignMonths;
  const timeOver = totalMonths > mission.scheduleLimitMonths;

  const massAlert = craftVal.conflicts.some((c) => c.resource === 'mass' && c.severity === 'CRITICAL');
  const powerAlert = craftVal.conflicts.some((c) => c.resource === 'power' && c.severity === 'CRITICAL');
  const dataAlert =
    craftVal.conflicts.some((c) => c.resource === 'data' && c.severity === 'CRITICAL') ||
    (phase === 'GROUND_SEGMENT' && groundEval.bufferOverflowRisk === 'CRITICAL');
  const commsAlert =
    craftVal.conflicts.some((c) => c.resource === 'comms' && c.severity === 'CRITICAL') ||
    ground.activeStationIds.length === 0;

  return (
    <header className="top-resource-strip" data-testid="top-resource-strip">
      <div className="top-mission-tag">
        <span className="mission-dot" />
        <span className="mission-title-text">{mission.title}</span>
      </div>

      <div className="resource-gauges">
        <div className={`res-pill ${massAlert ? 'alert' : ''}`}>
          <span className="res-label">MASS</span>
          <span className="res-val">{massValue}</span>
        </div>
        <div className={`res-pill ${powerAlert ? 'alert' : ''}`}>
          <span className="res-label">POWER</span>
          <span className="res-val">{powerValue}</span>
        </div>
        <div className={`res-pill ${budgetOver ? 'alert' : ''}`}>
          <span className="res-label">BUDGET</span>
          <span className="res-val">
            ${totalCostM}M / ${mission.budgetCapM}M
          </span>
        </div>
        <div className={`res-pill ${dataAlert ? 'alert' : ''}`}>
          <span className="res-label">DATA</span>
          <span className="res-val">{dataValue}</span>
        </div>
        <div className={`res-pill ${commsAlert ? 'alert' : ''}`}>
          <span className="res-label">COMMS</span>
          <span className="res-val">{commsValue}</span>
        </div>
        <div className={`res-pill ${timeOver ? 'alert' : ''}`}>
          <span className="res-label">TIME</span>
          <span className="res-val">
            {phase === 'FLIGHT' && flight
              ? `T+${Math.round(flight.elapsedFlightSec)}s`
              : `${totalMonths}/${mission.scheduleLimitMonths} mo`}
          </span>
        </div>
      </div>

      <div className="mode-toggle-group" role="group" aria-label="Difficulty Mode">
        <button
          type="button"
          data-testid="hud-mode-beginner"
          className={`mode-btn ${difficulty === 'BEGINNER' ? 'active' : ''}`}
          onClick={() => setDifficulty('BEGINNER')}
        >
          BEGINNER
        </button>
        <button
          type="button"
          data-testid="hud-mode-realistic"
          className={`mode-btn ${difficulty === 'REALISTIC' ? 'active' : ''}`}
          onClick={() => setDifficulty('REALISTIC')}
        >
          REALISTIC
        </button>
      </div>
    </header>
  );
};
