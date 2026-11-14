import React, { useState } from 'react';
import {
  COMMS_BANDS,
  GROUND_STATIONS,
  LAUNCH_VEHICLES,
  MISSIONS,
  SPACECRAFT_PARTS,
} from '../core/constants';
import { evaluateGroundSegment } from '../core/groundSegment';
import { validateSpacecraft } from '../core/spacecraftValidator';
import type {
  CommsBandId,
  ResourceKey,
  SubsystemCategory,
} from '../core/types';
import { useMissionStore } from '../store/useMissionStore';

const SUBSYSTEM_SLOTS: { key: SubsystemCategory; label: string }[] = [
  { key: 'structure', label: 'FRAME' },
  { key: 'power', label: 'POWER' },
  { key: 'battery', label: 'BATTERY' },
  { key: 'computer', label: 'CPU' },
  { key: 'adcs', label: 'ADCS' },
  { key: 'thermal', label: 'THERMAL' },
  { key: 'payload', label: 'PAYLOAD' },
  { key: 'launcher', label: 'ROCKET' },
];

const RESOURCE_LABELS: Record<ResourceKey, string> = {
  mass: 'MASS & Δv',
  power: 'POWER BUS',
  budget: 'BUDGET',
  data: 'SCIENCE DATA',
  comms: 'COMMS LINK',
  time: 'SCHEDULE',
};

function fmtAlt(altM: number): string {
  if (!Number.isFinite(altM)) return 'ESC';
  if (Math.abs(altM) >= 1000) return `${(altM / 1000).toFixed(1)} km`;
  return `${Math.round(altM)} m`;
}

export const PhaseHudOverlay: React.FC = () => {
  const phase = useMissionStore((s) => s.phase);
  const difficulty = useMissionStore((s) => s.difficulty);
  const selectedObjective = useMissionStore((s) => s.selectedObjective);
  const missionId = useMissionStore((s) => s.missionId);
  const exploreSubChoiceOpen = useMissionStore((s) => s.exploreSubChoiceOpen);
  const spacecraft = useMissionStore((s) => s.spacecraft);
  const activeSnapCategory = useMissionStore((s) => s.activeSnapCategory);
  const ground = useMissionStore((s) => s.ground);
  const flight = useMissionStore((s) => s.flight);
  const flightControls = useMissionStore((s) => s.flightControls);
  const debrief = useMissionStore((s) => s.debrief);

  const startSingleplayer = useMissionStore((s) => s.startSingleplayer);
  const setDifficulty = useMissionStore((s) => s.setDifficulty);
  const selectTopObjective = useMissionStore((s) => s.selectTopObjective);
  const selectExploreSubMission = useMissionStore((s) => s.selectExploreSubMission);
  const enterHangar = useMissionStore((s) => s.enterHangar);
  const setActiveSnapCategory = useMissionStore((s) => s.setActiveSnapCategory);
  const equipPart = useMissionStore((s) => s.equipPart);
  const applyRecommendedLoadout = useMissionStore((s) => s.applyRecommendedLoadout);
  const rolloutToGround = useMissionStore((s) => s.rolloutToGround);
  const backToHangar = useMissionStore((s) => s.backToHangar);
  const toggleStation = useMissionStore((s) => s.toggleStation);
  const setCommsBand = useMissionStore((s) => s.setCommsBand);
  const setPlannedLifetime = useMissionStore((s) => s.setPlannedLifetime);
  const greenlightLiftoff = useMissionStore((s) => s.greenlightLiftoff);
  const igniteLaunch = useMissionStore((s) => s.igniteLaunch);
  const setThrottle = useMissionStore((s) => s.setThrottle);
  const requestStage = useMissionStore((s) => s.requestStage);
  const setTimeWarp = useMissionStore((s) => s.setTimeWarp);
  const toggleFlightAssist = useMissionStore((s) => s.toggleFlightAssist);
  const toggleAutoStage = useMissionStore((s) => s.toggleAutoStage);
  const abortMission = useMissionStore((s) => s.abortMission);
  const returnToHangarKeepDesign = useMissionStore((s) => s.returnToHangarKeepDesign);
  const restartCampaign = useMissionStore((s) => s.restartCampaign);

  const [hoveredPartId, setHoveredPartId] = useState<string | null>(null);

  const mission = MISSIONS[missionId];
  const isBeginner = difficulty === 'BEGINNER';

  // --- TITLE SCREEN ---
  if (phase === 'TITLE') {
    return (
      <div className="hud-layer title-overlay" data-testid="title-screen">
        <div className="title-frame">
          <div className="title-badge">NASA SPACEAPPS // FLIGHT ENGINEERING SIM</div>
          <h1 className="game-logo">ORBITAL ARCHITECT 3D</h1>
          <p className="game-tagline">
            Design spacecraft buses, balance power &amp; radio links, and fly orbital or
            interplanetary missions in real-time 3D.
          </p>

          <div className="title-mode-row" role="group" aria-label="Flight Difficulty">
            <button
              type="button"
              data-testid="title-mode-beginner"
              className={`hud-pill-btn ${difficulty === 'BEGINNER' ? 'active' : ''}`}
              onClick={() => setDifficulty('BEGINNER')}
            >
              BEGINNER MODE
              <span className="pill-sub">Plain-English Tips &amp; Flight Assist</span>
            </button>
            <button
              type="button"
              data-testid="title-mode-realistic"
              className={`hud-pill-btn ${difficulty === 'REALISTIC' ? 'active' : ''}`}
              onClick={() => setDifficulty('REALISTIC')}
            >
              REALISTIC MODE
              <span className="pill-sub">Full Δv, Isp &amp; Manual Steering</span>
            </button>
          </div>

          <div className="title-actions">
            <button
              type="button"
              data-testid="btn-singleplayer"
              className="primary-cta-btn"
              onClick={startSingleplayer}
            >
              SINGLEPLAYER MISSION
            </button>
            <button
              type="button"
              data-testid="btn-multiplayer"
              className="locked-cta-btn"
              disabled
              aria-disabled="true"
            >
              MULTIPLAYER (LOCKED — COMING SOON)
            </button>
          </div>
        </div>
      </div>
    );
  }

  // --- PHASE 1: OBJECTIVE SELECT ---
  if (phase === 'OBJECTIVE_SELECT') {
    return (
      <div className="hud-layer pointer-pass" data-testid="objective-select-hud">
        <div className="tactical-reticle">
          <div className="reticle-kicker">PHASE 1 // TARGET ACQUISITION</div>

          <div className="target-chip-row">
            <button
              type="button"
              data-testid="obj-explore-space"
              className={`target-chip ${selectedObjective === 'EXPLORE_SPACE' ? 'active' : ''}`}
              onClick={() => selectTopObjective('EXPLORE_SPACE')}
            >
              EXPLORE SPACE
            </button>
            <button
              type="button"
              data-testid="obj-moon-landing"
              className={`target-chip ${selectedObjective === 'MOON_LANDING' ? 'active' : ''}`}
              onClick={() => selectTopObjective('MOON_LANDING')}
            >
              MOON LANDING
            </button>
            <button
              type="button"
              data-testid="obj-mars-landing"
              className={`target-chip ${selectedObjective === 'MARS_LANDING' ? 'active' : ''}`}
              onClick={() => selectTopObjective('MARS_LANDING')}
            >
              MARS LANDING
            </button>
          </div>

          {exploreSubChoiceOpen && (
            <div className="subchoice-row" data-testid="explore-subchoice">
              <button
                type="button"
                data-testid="subobj-earth-observation"
                className={`sub-chip ${missionId === 'EARTH_OBSERVATION' ? 'active' : ''}`}
                onClick={() => selectExploreSubMission('EARTH_OBSERVATION')}
              >
                EARTH OBSERVATION (LEO)
              </button>
              <button
                type="button"
                data-testid="subobj-space-telescope"
                className={`sub-chip ${missionId === 'SPACE_TELESCOPE' ? 'active' : ''}`}
                onClick={() => selectExploreSubMission('SPACE_TELESCOPE')}
              >
                SPACE TELESCOPE (1,800 KM)
              </button>
            </div>
          )}

          <div className="reticle-divider" />

          <h2 className="reticle-title">{mission.title}</h2>
          <div className="reticle-sub">{mission.subtitle}</div>

          <div className="reticle-specs-row">
            <span>Δv TARGET: {mission.targetDeltaVMs} m/s</span>
            <span>CAP: ${mission.budgetCapM}M</span>
            <span>WINDOW: {mission.scheduleLimitMonths} mo</span>
          </div>

          <div className="reticle-intel">
            <div className="intel-col">
              <div className="intel-hdr pros">ADVANTAGES</div>
              {mission.pros.map((p) => (
                <div key={p} className="intel-line">
                  + {p}
                </div>
              ))}
            </div>
            <div className="intel-col">
              <div className="intel-hdr cons">HAZARDS</div>
              {mission.challenges.map((c) => (
                <div key={c} className="intel-line">
                  ! {c}
                </div>
              ))}
            </div>
          </div>

          <button
            type="button"
            data-testid="enter-hangar-btn"
            className="primary-cta-btn full-w"
            onClick={enterHangar}
          >
            ENTER VAB HANGAR
          </button>
        </div>
      </div>
    );
  }

  // --- PHASE 2: HANGAR (VAB) ---
  if (phase === 'HANGAR') {
    const val = validateSpacecraft(missionId, spacecraft, difficulty, ground);
    const activeCat: SubsystemCategory = activeSnapCategory ?? 'structure';

    const conflictCats = new Set<string>(
      val.conflicts.map((c) => c.affectedCategory)
    );

    const options =
      activeCat === 'launcher'
        ? LAUNCH_VEHICLES.map((lv) => ({
            id: lv.id,
            name: lv.name,
            costM: lv.costM,
            leadMonths: lv.leadMonths,
            desc: isBeginner ? lv.beginnerDesc : lv.realisticDesc,
            meta: `${lv.stage1ThrustN / 1000} kN · $${lv.costM}M`,
          }))
        : SPACECRAFT_PARTS.filter((p) => p.category === activeCat).map((p) => ({
            id: p.id,
            name: p.name,
            costM: p.costM,
            leadMonths: p.leadMonths,
            desc: isBeginner ? p.beginnerDesc : p.realisticDesc,
            meta: `${p.massKg} kg · $${p.costM}M`,
          }));

    const selectedId =
      activeCat === 'launcher'
        ? spacecraft.launcherId
        : spacecraft[`${activeCat}Id` as keyof typeof spacecraft];

    const inspectedOpt =
      options.find((o) => o.id === hoveredPartId) ??
      options.find((o) => o.id === selectedId) ??
      options[0];

    return (
      <div className="hud-layer pointer-pass" data-testid="hangar-hud">
        {/* Right-edge Quick Hangar Actions */}
        <div className="hangar-right-actions">
          <div className="vab-readout-pill">
            <span>PAD TWR: {val.mass.padTwr.toFixed(2)}</span>
            <span>TOTAL Δv: {Math.round(val.mass.totalDeltaVMs)} m/s</span>
          </div>

          <button
            type="button"
            data-testid="kap-auto-engineer-btn"
            className="secondary-hud-btn"
            onClick={applyRecommendedLoadout}
          >
            KAP AUTO-ENGINEER
          </button>

          <button
            type="button"
            data-testid="rollout-ground-btn"
            className={`primary-cta-btn ${
              val.isLaunchable ? 'ready' : val.isComplete ? 'warn' : ''
            }`}
            disabled={!val.isComplete}
            onClick={rolloutToGround}
          >
            {val.isLaunchable
              ? 'ROLL OUT TO GROUND CONTROL'
              : val.isComplete
                ? 'ROLL OUT (CONFLICTS ACTIVE)'
                : 'EQUIP ALL 8 SLOTS'}
          </button>
        </div>

        {/* Bottom Dock: Active Slot Parts + 8 Subsystem Slots */}
        <div className="hangar-bottom-dock">
          {inspectedOpt && (
            <div className="part-inspector-bar">
              <strong>{inspectedOpt.name}:</strong> {inspectedOpt.desc}
            </div>
          )}

          <div className="part-tier-row">
            {options.map((opt) => {
              const isSelected = selectedId === opt.id;
              return (
                <button
                  key={opt.id}
                  type="button"
                  draggable
                  data-testid={`part-chip-${opt.id}`}
                  className={`part-tier-chip ${isSelected ? 'selected' : ''}`}
                  onMouseEnter={() => setHoveredPartId(opt.id)}
                  onMouseLeave={() => setHoveredPartId(null)}
                  onDragStart={(e) => {
                    e.dataTransfer.setData(
                      'application/json',
                      JSON.stringify({ category: activeCat, partId: opt.id })
                    );
                  }}
                  onClick={() => equipPart(activeCat, opt.id)}
                >
                  <div className="part-chip-name">{opt.name}</div>
                  <div className="part-chip-meta">{opt.meta}</div>
                </button>
              );
            })}
          </div>

          <div className="slot-dock-row">
            {SUBSYSTEM_SLOTS.map((slot) => {
              const fieldVal =
                slot.key === 'launcher'
                  ? spacecraft.launcherId
                  : spacecraft[`${slot.key}Id` as keyof typeof spacecraft];
              const isSelected = activeCat === slot.key;
              const hasConflict = conflictCats.has(slot.key);
              return (
                <button
                  key={slot.key}
                  type="button"
                  data-testid={`slot-btn-${slot.key}`}
                  className={`slot-dock-btn ${isSelected ? 'active' : ''} ${
                    fieldVal ? 'filled' : 'empty'
                  } ${hasConflict ? 'conflict' : ''}`}
                  onClick={() => setActiveSnapCategory(slot.key)}
                >
                  <span className="slot-dot" />
                  <span>{slot.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  // --- PHASE 3: GROUND SEGMENT ---
  if (phase === 'GROUND_SEGMENT') {
    const ge = evaluateGroundSegment(missionId, spacecraft, ground, difficulty);
    const bandIds: CommsBandId[] = ['S_BAND', 'X_BAND', 'KA_BAND'];
    const lifetimes: (1 | 3 | 5)[] = [1, 3, 5];

    return (
      <div className="hud-layer pointer-pass" data-testid="ground-segment-hud">
        <div className="ground-console">
          <div className="reticle-kicker">PHASE 3 // DSN &amp; COMMS GREENLIGHT</div>
          <div className="console-subhint">
            Click dishes on the 3D Earth or toggle below
          </div>

          <div className="console-section-label">GROUND STATIONS</div>
          <div className="station-chip-grid">
            {GROUND_STATIONS.map((st) => {
              const active = ground.activeStationIds.includes(st.id);
              return (
                <button
                  key={st.id}
                  type="button"
                  data-testid={`station-btn-${st.id}`}
                  className={`station-chip ${active ? 'active' : ''}`}
                  onClick={() => toggleStation(st.id)}
                >
                  <span>{st.name.replace(/\s*\(.*?\)/, '')}</span>
                  <span className="chip-cost">
                    {st.costM > 0 ? `$${st.costM}M` : 'INCL'}
                  </span>
                </button>
              );
            })}
          </div>

          <div className="console-section-label">RADIO FREQUENCY BAND</div>
          <div className="band-row">
            {bandIds.map((bId) => {
              const b = COMMS_BANDS[bId];
              return (
                <button
                  key={bId}
                  type="button"
                  data-testid={`band-btn-${bId}`}
                  className={`band-chip ${ground.bandId === bId ? 'active' : ''}`}
                  onClick={() => setCommsBand(bId)}
                >
                  <div>{b.id.replace('_BAND', '-BAND')}</div>
                  <div className="chip-cost">
                    {b.bandwidthMbps} Mbps · ${b.costM}M
                  </div>
                </button>
              );
            })}
          </div>

          <div className="console-section-label">OPERATIONS LIFETIME</div>
          <div className="band-row">
            {lifetimes.map((yr) => (
              <button
                key={yr}
                type="button"
                data-testid={`lifetime-btn-${yr}`}
                className={`band-chip ${ground.plannedLifetimeYears === yr ? 'active' : ''}`}
                onClick={() => setPlannedLifetime(yr)}
              >
                {yr} YEAR{yr > 1 ? 'S' : ''}
              </button>
            ))}
          </div>

          <div className="link-clearance-box">
            <div className="clearance-row">
              <span>CONTACT COVERAGE</span>
              <strong>{ge.contactCoveragePct}%</strong>
            </div>
            <div className="clearance-row">
              <span>ORBIT DATA GEN / DOWNLINK</span>
              <strong>
                {Math.round(ge.dataGeneratedPerOrbitMb)} /{' '}
                {Math.round(ge.downlinkCapacityPerOrbitMb)} MB
              </strong>
            </div>
            <div className="clearance-bar-track">
              <div
                className={`clearance-bar-fill risk-${ge.bufferOverflowRisk.toLowerCase()}`}
                style={{
                  width: `${Math.min(
                    100,
                    (ge.downlinkCapacityPerOrbitMb /
                      Math.max(1, ge.dataGeneratedPerOrbitMb)) *
                      60
                  )}%`,
                }}
              />
            </div>
          </div>

          <div className="ground-cta-row">
            <button
              type="button"
              data-testid="back-to-hangar-btn"
              className="secondary-hud-btn"
              onClick={backToHangar}
            >
              BACK TO VAB
            </button>
            <button
              type="button"
              data-testid="greenlight-liftoff-btn"
              className="primary-cta-btn"
              disabled={!ge.canGreenlight}
              onClick={greenlightLiftoff}
            >
              GREENLIGHT LIFTOFF
            </button>
          </div>
        </div>
      </div>
    );
  }

  // --- PHASE 4: FLIGHT ---
  if (phase === 'FLIGHT' && flight) {
    const warpLevels = [1, 5, 25, 100, 500];
    const battPct = Math.round(
      (flight.batteryWh / Math.max(1, flight.batteryMaxWh)) * 100
    );
    const activeFuelKg =
      flight.activeStageIndex === 0 ? flight.stage1PropKg : flight.stage2PropKg;

    return (
      <div className="hud-layer pointer-pass" data-testid="flight-hud">
        {/* Left Vertical Throttle & Stage Control */}
        <div className="flight-left-throttle">
          <div className="stage-badge" data-testid="flight-stage-badge">
            STAGE {flight.activeStageIndex + 1}
          </div>
          <input
            type="range"
            min={0}
            max={100}
            value={Math.round(flightControls.throttle * 100)}
            onChange={(e) => setThrottle(Number(e.target.value) / 100)}
            aria-label="Throttle"
            className="throttle-slider"
            data-testid="throttle-slider"
          />
          <div className="throttle-pct">
            {Math.round(flightControls.throttle * 100)}%
          </div>
          <button
            type="button"
            data-testid="stage-btn"
            className="stage-trigger-btn"
            disabled={flight.activeStageIndex === 1}
            onClick={requestStage}
          >
            STAGE
          </button>
        </div>

        {/* Right Flight Status & Launch/Abort */}
        <div className="flight-right-controls">
          <div className="flight-phase-pill" data-testid="flight-status-pill">
            PHASE: {flight.status}
          </div>
          {flight.status === 'PRELAUNCH' ? (
            <button
              type="button"
              data-testid="ignite-launch-btn"
              className="primary-cta-btn ignite"
              onClick={igniteLaunch}
            >
              IGNITE LAUNCH
            </button>
          ) : (
            <button
              type="button"
              data-testid="abort-mission-btn"
              className="abort-hud-btn"
              onClick={abortMission}
            >
              END MISSION
            </button>
          )}
        </div>

        {/* Bottom Flight Instrument Strip */}
        <div className="flight-bottom-strip">
          <div className="flight-controls-row">
            <button
              type="button"
              data-testid="toggle-autopilot-btn"
              className={`mini-toggle-btn ${flightControls.autoGuidance ? 'active' : ''}`}
              onClick={toggleFlightAssist}
            >
              {flightControls.autoGuidance ? 'AUTO PILOT: ON' : 'MANUAL STEER'}
            </button>
            <button
              type="button"
              data-testid="toggle-autostage-btn"
              className={`mini-toggle-btn ${flightControls.autoStage ? 'active' : ''}`}
              onClick={toggleAutoStage}
            >
              AUTO-STAGE: {flightControls.autoStage ? 'ON' : 'OFF'}
            </button>

            <div className="warp-group">
              <span className="warp-label">WARP</span>
              {warpLevels.map((w) => (
                <button
                  key={w}
                  type="button"
                  data-testid={`warp-btn-${w}`}
                  className={`warp-btn ${flight.timeWarp === w ? 'active' : ''}`}
                  onClick={() => setTimeWarp(w)}
                >
                  {w}x
                </button>
              ))}
            </div>
          </div>

          <div className="instrument-row">
            <div className="inst-pill">
              <span className="inst-k">ALT</span>
              <span className="inst-v" data-testid="inst-alt">
                {fmtAlt(flight.orbitalElements.altitudeM)}
              </span>
            </div>
            <div className="inst-pill">
              <span className="inst-k">SPD</span>
              <span className="inst-v" data-testid="inst-spd">
                {Math.round(flight.orbitalElements.speedMs)} m/s
              </span>
            </div>
            <div className="inst-pill">
              <span className="inst-k">AP</span>
              <span className="inst-v">{fmtAlt(flight.orbitalElements.apoapsisAltM)}</span>
            </div>
            <div className="inst-pill">
              <span className="inst-k">PE</span>
              <span className="inst-v">{fmtAlt(flight.orbitalElements.periapsisAltM)}</span>
            </div>
            <div className="inst-pill">
              <span className="inst-k">FUEL</span>
              <span className="inst-v">{Math.round(activeFuelKg)} kg</span>
            </div>
            <div className="inst-pill">
              <span className="inst-k">BAT</span>
              <span className="inst-v">
                {battPct}%{flight.inEclipse ? ' (ECLIPSE)' : ''}
              </span>
            </div>
            <div className="inst-pill">
              <span className="inst-k">SCIENCE</span>
              <span className="inst-v" data-testid="inst-science">
                {flight.deliveredDataMb.toFixed(0)}/{mission.targetScienceMb} MB
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // --- PHASE 5: DEBRIEF ---
  if (phase === 'DEBRIEF' && debrief) {
    const keys: ResourceKey[] = ['mass', 'power', 'budget', 'data', 'comms', 'time'];
    return (
      <div className="hud-layer debrief-overlay" data-testid="debrief-hud">
        <div className="debrief-frame">
          <div className="debrief-header">
            <span
              className={`outcome-badge ${
                debrief.outcome === 'SUCCESS' ? 'success' : 'failed'
              }`}
              data-testid="debrief-outcome"
            >
              {debrief.outcome === 'SUCCESS'
                ? 'MISSION ACCOMPLISHED'
                : 'MISSION FAILED'}
            </span>
            <h2 className="debrief-title">{debrief.headline}</h2>
          </div>

          <div className="debrief-resource-grid">
            {keys.map((rk) => {
              const item = debrief.resources[rk];
              return (
                <div
                  key={rk}
                  className={`debrief-res-cell status-${item.status.toLowerCase()}`}
                  data-testid={`debrief-res-${rk}`}
                >
                  <div className="debrief-cell-top">
                    <span className="debrief-cell-name">{RESOURCE_LABELS[rk]}</span>
                    <span className="debrief-cell-status">{item.status}</span>
                  </div>
                  <div className="debrief-line right">
                    <strong>RIGHT:</strong> {item.whatWentRight}
                  </div>
                  <div className="debrief-line wrong">
                    <strong>ISSUE:</strong> {item.whatWentWrong}
                  </div>
                  <div className="debrief-line note">
                    {isBeginner ? item.beginnerNote : item.realisticMetrics}
                  </div>
                </div>
              );
            })}
          </div>

          <div className="debrief-actions">
            <button
              type="button"
              data-testid="return-hangar-keep-btn"
              className="primary-cta-btn"
              onClick={returnToHangarKeepDesign}
            >
              RETURN TO HANGAR (KEEP DESIGN)
            </button>
            <button
              type="button"
              data-testid="new-mission-btn"
              className="secondary-hud-btn"
              onClick={restartCampaign}
            >
              NEW MISSION
            </button>
          </div>
        </div>
      </div>
    );
  }

  return null;
};
