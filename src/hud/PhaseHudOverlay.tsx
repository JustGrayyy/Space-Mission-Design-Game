import React, { useState, useMemo, useEffect } from 'react';
import {
  COMMS_BANDS,
  GROUND_STATIONS,
  LAUNCH_SITES,
  LAUNCH_VEHICLES,
  MISSIONS,
  SPACECRAFT_PARTS,
} from '../core/constants';
import { evaluateGroundSegment } from '../core/groundSegment';
import { validateSpacecraft, previewBuildCandidate, previewLauncherCandidate } from '../core/spacecraftValidator';
import type {
  CommsBandId,
  HoverDelta,
  ResourceKey,
  SubsystemCategory,
} from '../core/types';
import { useMissionStore } from '../store/useMissionStore';
import { MISSION_ORDER, MISSION_PLAIN } from './plainText';
import { PART_PLAIN, usePartFocus } from './partPlain';
import { ScoreCard } from './ScoreCard';

function formatDeltaHtml(deltas: HoverDelta): React.ReactNode {
  const badges: React.ReactElement[] = [];
  if (deltas.deltaMassKg !== 0) badges.push(<span key="mass" className={`delta-badge ${deltas.deltaMassKg > 0 ? 'improve' : 'worsen'}`}>{deltas.deltaMassKg > 0 ? '+' : ''}{deltas.deltaMassKg} kg</span>);
  if (deltas.deltaDvMs !== 0) badges.push(<span key="dv" className={`delta-badge ${deltas.deltaDvMs > 0 ? 'improve' : 'worsen'}`}>{deltas.deltaDvMs > 0 ? '+' : ''}{deltas.deltaDvMs} m/s Δv</span>);
  if (deltas.deltaTwr !== 0) badges.push(<span key="twr" className={`delta-badge ${deltas.deltaTwr > 0 ? 'improve' : 'worsen'}`}>{deltas.deltaTwr > 0 ? '+' : ''}{deltas.deltaTwr.toFixed(2)} TWR</span>);
  if (deltas.deltaCostM !== 0) badges.push(<span key="cost" className={`delta-badge ${deltas.deltaCostM > 0 ? 'worsen' : 'improve'}`}>{deltas.deltaCostM > 0 ? '+' : ''}$${deltas.deltaCostM}M</span>);
  if (deltas.deltaScheduleDays !== 0) badges.push(<span key="sched" className={`delta-badge ${deltas.deltaScheduleDays > 0 ? 'worsen' : 'improve'}`}>{deltas.deltaScheduleDays > 0 ? '+' : ''}{deltas.deltaScheduleDays}d</span>);
  if (deltas.deltaCruisePowerW !== 0) badges.push(<span key="cruise" className={`delta-badge ${deltas.deltaCruisePowerW > 0 ? 'worsen' : 'improve'}`}>{deltas.deltaCruisePowerW > 0 ? '+' : ''}{deltas.deltaCruisePowerW}W cruise</span>);
  if (deltas.deltaPeakPowerW !== 0) badges.push(<span key="peak" className={`delta-badge ${deltas.deltaPeakPowerW > 0 ? 'worsen' : 'improve'}`}>{deltas.deltaPeakPowerW > 0 ? '+' : ''}{deltas.deltaPeakPowerW}W peak</span>);
  if (deltas.deltaEclipseMin !== 0) badges.push(<span key="eclipse" className={`delta-badge ${deltas.deltaEclipseMin > 0 ? 'improve' : 'worsen'}`}>{deltas.deltaEclipseMin > 0 ? '+' : ''}{deltas.deltaEclipseMin} min eclipse</span>);
  if (deltas.deltaThermalW !== 0) badges.push(<span key="thermal" className={`delta-badge ${deltas.deltaThermalW > 0 ? 'worsen' : 'improve'}`}>{deltas.deltaThermalW > 0 ? '+' : ''}{deltas.deltaThermalW}W thermal</span>);
  return badges;
}

const SUBSYSTEM_SLOTS: { key: SubsystemCategory; label: string; plain: string }[] = [
  { key: 'structure', label: 'FRAME', plain: 'Frame' },
  { key: 'power', label: 'POWER', plain: 'Power' },
  { key: 'battery', label: 'BATTERY', plain: 'Battery' },
  { key: 'computer', label: 'CPU', plain: 'Computer' },
  { key: 'adcs', label: 'ADCS', plain: 'Steering' },
  { key: 'thermal', label: 'THERMAL', plain: 'Heat control' },
  { key: 'payload', label: 'PAYLOAD', plain: 'Science tool' },
  { key: 'launcher', label: 'ROCKET', plain: 'Rocket' },
];

const FLIGHT_STATUS_PLAIN: Record<string, string> = {
  PRELAUNCH: 'On the pad',
  ASCENT: 'Climbing',
  ORBIT: 'In orbit',
  TRANSIT: 'Cruising to target',
  TARGET_CAPTURE: 'Arriving',
  LANDING: 'Landing',
  SUCCESS: 'Success',
  FAILED: 'Lost',
};

const PLAIN_RESOURCE: Record<ResourceKey, string> = {
  mass: 'Weight & fuel',
  power: 'Power',
  budget: 'Money',
  data: 'Science',
  comms: 'Radio',
  time: 'Schedule',
};

const PLAIN_STATUS: Record<string, string> = { OPTIMAL: 'Great', WARNING: 'Close call', CRITICAL: 'Problem' };

const RESOURCE_LABELS: Record<ResourceKey, string> = {
  mass: 'MASS & Δv',
  power: 'POWER BUS',
  budget: 'BUDGET',
  data: 'SCIENCE DATA',
  comms: 'COMMS LINK',
  time: 'SCHEDULE',
};

/** Eases a jumpy value toward its target so gauges glide instead of snapping. */
function useEasedValue(target: number): number {
  const [shown, setShown] = useState(target);
  const targetRef = React.useRef(target);
  targetRef.current = target;
  useEffect(() => {
    let raf = 0;
    let last = performance.now();
    const tick = (now: number) => {
      const dt = Math.min(0.1, (now - last) / 1000);
      last = now;
      setShown((v) => {
        const next = v + (targetRef.current - v) * Math.min(1, dt * 2.2);
        return Math.abs(next - v) < 0.0005 ? v : next;
      });
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);
  return shown;
}

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
  const launchSiteId = useMissionStore((s) => s.launchSiteId);
  const exploreSubChoiceOpen = useMissionStore((s) => s.exploreSubChoiceOpen);
  const spacecraft = useMissionStore((s) => s.spacecraft);
  const activeSnapCategory = useMissionStore((s) => s.activeSnapCategory);
  const ground = useMissionStore((s) => s.ground);
  const flight = useMissionStore((s) => s.flight);
  const flightControls = useMissionStore((s) => s.flightControls);
  const debrief = useMissionStore((s) => s.debrief);

  const startSingleplayer = useMissionStore((s) => s.startSingleplayer);
  const backToTitle = useMissionStore((s) => s.backToTitle);
  const setDifficulty = useMissionStore((s) => s.setDifficulty);
  const selectTopObjective = useMissionStore((s) => s.selectTopObjective);
  const selectExploreSubMission = useMissionStore((s) => s.selectExploreSubMission);
  const requestEnterHangar = useMissionStore((s) => s.requestEnterHangar);
  const openTutorial = useMissionStore((s) => s.openTutorial);
  const setActiveSnapCategory = useMissionStore((s) => s.setActiveSnapCategory);
  const equipPart = useMissionStore((s) => s.equipPart);
  const applyRecommendedLoadout = useMissionStore((s) => s.applyRecommendedLoadout);
  const rolloutToGround = useMissionStore((s) => s.rolloutToGround);
  const selectLaunchSite = useMissionStore((s) => s.selectLaunchSite);
  const confirmLaunchSite = useMissionStore((s) => s.confirmLaunchSite);
  const backToHangar = useMissionStore((s) => s.backToHangar);
  const backToObjectiveSelect = useMissionStore((s) => s.backToObjectiveSelect);
  const toggleStation = useMissionStore((s) => s.toggleStation);
  const setCommsBand = useMissionStore((s) => s.setCommsBand);
  const setPlannedLifetime = useMissionStore((s) => s.setPlannedLifetime);
  const applyRecommendedGround = useMissionStore((s) => s.applyRecommendedGround);
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
  const setFocusPart = usePartFocus((s) => s.setPart);
  const shownThrottle = useEasedValue(flight && flight.status !== 'SUCCESS' && flight.status !== 'FAILED' ? flight.throttle : 0);
  const setHoveredCandidate = useMissionStore((s) => s.setHoveredCandidate);

  const mission = MISSIONS[missionId];
  const isBeginner = difficulty === 'BEGINNER';

  // Memoized preview candidates for hover deltas
  const previewCandidate = useMemo(() => {
    if (!hoveredPartId || !activeSnapCategory) return null;
    if (activeSnapCategory === 'launcher') {
      return previewLauncherCandidate(missionId, spacecraft, ground, hoveredPartId);
    } else {
      return previewBuildCandidate(missionId, spacecraft, ground, activeSnapCategory, hoveredPartId);
    }
  }, [hoveredPartId, activeSnapCategory, missionId, spacecraft, ground, difficulty]);

  // Update store when hover candidate changes
  useEffect(() => {
    setHoveredCandidate(previewCandidate);
  }, [previewCandidate, setHoveredCandidate]);

  // --- TITLE SCREEN ---
  if (phase === 'TITLE') {
    return (
      <div className="hud-layer title-overlay" data-testid="title-screen">
        <div className="title-frame">
          <div className="title-badge">NASA Space Apps 2026 · Team CyberSects</div>
          <h1 className="game-logo">Orbital<br />Architect</h1>
          <p className="game-tagline">
            Design a spacecraft, launch it, and fly a real mission to Earth orbit, the Moon or
            Mars. Every choice costs something.
          </p>

          <div className="title-mode-row" role="group" aria-label="Flight Difficulty">
            <button
              type="button"
              data-testid="title-mode-beginner"
              className={`hud-pill-btn ${difficulty === 'BEGINNER' ? 'active' : ''}`}
              onClick={() => setDifficulty('BEGINNER')}
            >
              Beginner
              <span className="pill-sub">Plain-English tips, autopilot flies for you</span>
            </button>
            <button
              type="button"
              data-testid="title-mode-realistic"
              className={`hud-pill-btn ${difficulty === 'REALISTIC' ? 'active' : ''}`}
              onClick={() => setDifficulty('REALISTIC')}
            >
              Realistic
              <span className="pill-sub">Full telemetry, you steer the rocket</span>
            </button>
          </div>

          <div className="title-actions">
            <button
              type="button"
              data-testid="btn-singleplayer"
              className="primary-cta-btn"
              onClick={startSingleplayer}
            >
              Start a mission
            </button>
            <button
              type="button"
              data-testid="btn-multiplayer"
              className="locked-cta-btn"
              disabled
              aria-disabled="true"
            >
              Team mode for up to 4 players · coming soon
            </button>
            <p className="title-credit">
              Planet maps by <a href="https://www.solarsystemscope.com/textures/" target="_blank" rel="noreferrer">Solar System Scope</a>, CC BY 4.0
            </p>
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
          <h2 className="panel-heading">Choose your mission</h2>

          {isBeginner ? (
            <>
              <div className="mission-cards" data-testid="mission-cards">
                {MISSION_ORDER.map((id) => (
                  <button
                    key={id}
                    type="button"
                    data-testid={`mission-card-${id}`}
                    className={`mission-card ${missionId === id ? 'active' : ''}`}
                    aria-pressed={missionId === id}
                    onClick={() => {
                      if (id === 'EARTH_OBSERVATION' || id === 'SPACE_TELESCOPE') {
                        selectTopObjective('EXPLORE_SPACE');
                        selectExploreSubMission(id);
                      } else {
                        selectTopObjective(id);
                      }
                    }}
                  >
                    <span className="mission-card-name">{MISSION_PLAIN[id].name}</span>
                    <span className={`mission-card-level lvl-${MISSION_ORDER.indexOf(id)}`}>{MISSION_PLAIN[id].level}</span>
                  </button>
                ))}
              </div>
              <p className="mission-brief">{MISSION_PLAIN[missionId].goal(mission.targetScienceMb)}</p>
              <div className="reticle-button-row">
                <button type="button" data-testid="back-to-title-btn" className="secondary-cta-btn" onClick={backToTitle}>
                  Back
                </button>
                <button type="button" data-testid="enter-hangar-btn" className="primary-cta-btn" onClick={requestEnterHangar}>
                  Next: build it
                </button>
              </div>
            </>
          ) : (
          <>

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

          <h3 className="reticle-title">{mission.title}</h3>
          <div className="reticle-sub">{mission.subtitle}</div>

          {isBeginner ? (
            <>
              <p className="mission-brief">{mission.beginnerBrief}</p>
              <div className="mission-limits">
                <span>Budget <strong>${mission.budgetCapM}M</strong></span>
                <span>Build time <strong>{mission.scheduleLimitMonths} months</strong></span>
              </div>
            </>
          ) : (
            <div className="reticle-specs-row">
              <span>Δv TARGET: {mission.targetDeltaVMs} m/s</span>
              <span>CAP: ${mission.budgetCapM}M</span>
              <span>WINDOW: {mission.scheduleLimitMonths} mo</span>
            </div>
          )}

          {!isBeginner && <div className="reticle-intel">
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
          </div>}

          <div className="reticle-button-row">
            <button
              type="button"
              data-testid="back-to-title-btn"
              className="secondary-cta-btn"
              onClick={backToTitle}
            >
              Back
            </button>
            <button
              type="button"
              data-testid="enter-hangar-btn"
              className="primary-cta-btn"
              onClick={requestEnterHangar}
            >
              Next: build it
            </button>
          </div>
          </>
          )}
        </div>
      </div>
    );
  }

  // --- PHASE 2: HANGAR (VAB) ---
  if (phase === 'HANGAR') {
    const val = validateSpacecraft(missionId, spacecraft, difficulty, ground);
    const activeCat: SubsystemCategory = activeSnapCategory ?? 'structure';

    const filledCount = SUBSYSTEM_SLOTS.filter((slot) =>
      slot.key === 'launcher' ? spacecraft.launcherId : spacecraft[`${slot.key}Id` as keyof typeof spacecraft]
    ).length;

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
            meta: isBeginner ? `$${lv.costM}M` : `${lv.stage1ThrustN / 1000} kN · $${lv.costM}M`,
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
          {isBeginner ? (
            <div className="vab-readout-pill">
              <span>{filledCount} of 8 parts chosen</span>
            </div>
          ) : (
            <div className="vab-readout-pill">
              <span>PAD TWR: {val.mass.padTwr.toFixed(2)}</span>
              <span>TOTAL Δv: {Math.round(val.mass.totalDeltaVMs)} m/s</span>
            </div>
          )}

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
              ? 'Next: pick a launch site'
              : val.isComplete
                ? 'Next (Kap sees problems)'
                : `Choose all 8 parts (${filledCount}/8)`}
          </button>
        </div>

        {/* Bottom Dock: Active Slot Parts + 8 Subsystem Slots */}
        <div className="hangar-bottom-dock">
          {/* Hangar Action Buttons */}
          <div className="hangar-action-buttons">
            <button
              type="button"
              data-testid="back-to-objective-btn"
              className="secondary-cta-btn"
              onClick={backToObjectiveSelect}
            >
              Back to missions
            </button>

            <button
              type="button"
              data-testid="open-guide-btn"
              className="secondary-hud-btn guide-btn"
              onClick={openTutorial}
            >
              How to win
            </button>

            <button
              type="button"
              data-testid="kap-auto-engineer-btn"
              className="secondary-hud-btn kap-build-btn"
              onClick={applyRecommendedLoadout}
            >
              Let Kap build it
            </button>
          </div>

          {inspectedOpt && !isBeginner && (
            <div className="part-inspector-bar">
              <strong>{inspectedOpt.name}:</strong> {inspectedOpt.desc}
              {!isBeginner && previewCandidate && previewCandidate.deltas && (
                <div className="hover-delta-badges">
                  {formatDeltaHtml(previewCandidate.deltas)}
                </div>
              )}
            </div>
          )}

          <div className="part-tier-row">
            {options.map((opt) => {
              const isSelected = selectedId === opt.id;
              const isHovered = hoveredPartId === opt.id;
              // Compute inline deltas for hovered part
              let inlineDeltas: string[] = [];
              if (!isBeginner && isHovered && previewCandidate && previewCandidate.deltas) {
                const d = previewCandidate.deltas;
                if (d.deltaMassKg !== 0) inlineDeltas.push(`${d.deltaMassKg > 0 ? '+' : ''}${d.deltaMassKg} kg`);
                if (d.deltaDvMs !== 0) inlineDeltas.push(`${d.deltaDvMs > 0 ? '+' : ''}${d.deltaDvMs} m/s Δv`);
                if (d.deltaTwr !== 0) inlineDeltas.push(`${d.deltaTwr > 0 ? '+' : ''}${d.deltaTwr.toFixed(2)} TWR`);
                if (d.deltaCostM !== 0) inlineDeltas.push(`${d.deltaCostM > 0 ? '+' : ''}$${d.deltaCostM}M`);
                if (d.deltaScheduleDays !== 0) inlineDeltas.push(`${d.deltaScheduleDays > 0 ? '+' : ''}${d.deltaScheduleDays}d`);
                if (d.deltaCruisePowerW !== 0) inlineDeltas.push(`${d.deltaCruisePowerW > 0 ? '+' : ''}${d.deltaCruisePowerW}W cruise`);
                if (d.deltaPeakPowerW !== 0) inlineDeltas.push(`${d.deltaPeakPowerW > 0 ? '+' : ''}${d.deltaPeakPowerW}W peak`);
                if (d.deltaEclipseMin !== 0) inlineDeltas.push(`${d.deltaEclipseMin > 0 ? '+' : ''}${d.deltaEclipseMin} min eclipse`);
                if (d.deltaThermalW !== 0) inlineDeltas.push(`${d.deltaThermalW > 0 ? '+' : ''}${d.deltaThermalW}W thermal`);
              }
              return (
                <button
                  key={opt.id}
                  type="button"
                  draggable
                  data-testid={`part-chip-${opt.id}`}
                  className={`part-tier-chip ${isSelected ? 'selected' : ''} ${isHovered ? 'hovered' : ''}`}
                  onMouseEnter={() => {
                    setHoveredPartId(opt.id);
                    setFocusPart(opt.id);
                  }}
                  onMouseLeave={() => setHoveredPartId(null)}
                  onDragStart={(e) => {
                    e.dataTransfer.setData(
                      'application/json',
                      JSON.stringify({ category: activeCat, partId: opt.id })
                    );
                  }}
                  onClick={() => {
                    equipPart(activeCat, opt.id);
                    setFocusPart(opt.id);
                  }}
                >
                  <div className="part-chip-name">{isBeginner ? PART_PLAIN[opt.id]?.name ?? opt.name : opt.name}</div>
                  {isBeginner && PART_PLAIN[opt.id] && (
                    <div className="part-tradeoff">
                      <span className="part-good">+ {PART_PLAIN[opt.id].good}</span>
                      <span className="part-bad">- {PART_PLAIN[opt.id].bad}</span>
                    </div>
                  )}
                  <div className="part-chip-meta">{opt.meta}</div>
                  {isHovered && inlineDeltas.length > 0 && (
                    <div className="inline-delta-badges">
                      {inlineDeltas.map((delta, i) => (
                        <span key={i} className={`inline-delta ${delta.startsWith('+') || delta.startsWith('-') ? (delta.startsWith('-') ? 'worsen' : 'improve') : ''}`}>
                          {delta}
                        </span>
                      ))}
                    </div>
                  )}
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
                  <span>{isBeginner ? slot.plain : slot.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  // --- PHASE 3: LAUNCH SITE ---
  if (phase === 'LAUNCH_SITE') {
    const selectedSite = LAUNCH_SITES.find((site) => site.id === launchSiteId);
    return (
      <div className="hud-layer pointer-pass" data-testid="launch-site-hud">
        <div className="launch-site-console">
          <h2 className="panel-heading">Pick a launch site</h2>
          <div className="console-subhint">Click a marker on Earth or pick from the list.</div>
          <div className="launch-site-selected" data-testid="selected-launch-site">
            <strong>{selectedSite?.name}</strong>
            <span>{selectedSite?.operator} · {selectedSite?.country}</span>
            {!isBeginner && <span>{selectedSite?.latDeg.toFixed(3)}°, {selectedSite?.lonDeg.toFixed(3)}°</span>}
            <p>{selectedSite?.description}</p>
          </div>
          <div className="launch-site-list">
            {LAUNCH_SITES.map((site) => (
              <button
                key={site.id}
                type="button"
                data-testid={`launch-site-btn-${site.id}`}
                className={`launch-site-chip ${site.id === launchSiteId ? 'active' : ''}`}
                onClick={() => selectLaunchSite(site.id)}
              >
                <strong>{site.name}</strong>
                <span>{site.operator} · {site.country}</span>
              </button>
            ))}
          </div>
          <div className="ground-cta-row">
            <button type="button" className="secondary-hud-btn" onClick={backToHangar}>
              Back
            </button>
            <button
              type="button"
              data-testid="confirm-launch-site-btn"
              className="primary-cta-btn"
              onClick={confirmLaunchSite}
            >
              Next: mission control
            </button>
          </div>
        </div>
      </div>
    );
  }

  // --- PHASE 4: GROUND SEGMENT ---
  if (phase === 'GROUND_SEGMENT') {
    const ge = evaluateGroundSegment(missionId, spacecraft, ground, difficulty);
    const bandIds: CommsBandId[] = ['S_BAND', 'X_BAND', 'KA_BAND'];
    const lifetimes: (1 | 3 | 5)[] = [1, 3, 5];

    return (
      <div className="hud-layer pointer-pass" data-testid="ground-segment-hud">
        <div className="ground-console">
          <h2 className="panel-heading">Set up mission control</h2>
          <div className="console-subhint">
            {isBeginner
              ? 'Your spacecraft sends science home through radio dishes on Earth. More dishes and a faster radio mean more data gets home.'
              : 'Click dishes on the 3D Earth or toggle below.'}
          </div>
          {isBeginner && (
            <button
              type="button"
              data-testid="kap-ground-btn"
              className="secondary-hud-btn kap-build-btn full"
              onClick={applyRecommendedGround}
            >
              Let Kap set it up
            </button>
          )}

          <div className="console-section-label">{isBeginner ? 'Radio dishes on Earth' : 'GROUND STATIONS'}</div>
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
                    {st.costM > 0 ? `$${st.costM}M` : isBeginner ? 'Free' : 'INCL'}
                  </span>
                </button>
              );
            })}
          </div>

          <div className="console-section-label">{isBeginner ? 'Radio speed' : 'RADIO FREQUENCY BAND'}</div>
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
                  <div>{b.id.replace('_BAND', '-band')}</div>
                  <div className="chip-cost">
                    {isBeginner
                      ? `${bId === 'S_BAND' ? 'Slow' : bId === 'X_BAND' ? 'Fast' : 'Fastest'} · $${b.costM}M`
                      : `${b.bandwidthMbps} Mbps · $${b.costM}M`}
                  </div>
                </button>
              );
            })}
          </div>

          <div className="console-section-label">{isBeginner ? 'How long the mission runs' : 'OPERATIONS LIFETIME'}</div>
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
              <span>{isBeginner ? 'Time in radio contact' : 'CONTACT COVERAGE'}</span>
              <strong>{ge.contactCoveragePct}%</strong>
            </div>
            <div className="clearance-row">
              <span>{isBeginner ? 'Science made vs. sent home, per orbit' : 'ORBIT DATA GEN / DOWNLINK'}</span>
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
              Back
            </button>
            <button
              type="button"
              data-testid="greenlight-liftoff-btn"
              className="primary-cta-btn"
              disabled={!ge.canGreenlight}
              onClick={greenlightLiftoff}
            >
              {ge.canGreenlight ? 'Go for launch' : 'Fix what Kap flagged first'}
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
    const totalFuelKg = flight.stage1PropKg + flight.stage2PropKg;
    // Fuel left as a share of what the rocket launched with (was always 100%).
    const lv = LAUNCH_VEHICLES.find((v) => v.id === spacecraft.launcherId);
    const fullFuelKg = lv ? lv.stage1PropKg + lv.stage2PropKg : totalFuelKg;
    const stage1FullKg = lv?.stage1PropKg ?? flight.stage1PropKg;
    const stage2FullKg = lv?.stage2PropKg ?? flight.stage2PropKg;
    const fuelPct = Math.round((totalFuelKg / Math.max(1, fullFuelKg)) * 100);

    // Thermal color coding
    const thermalColor = flight.thermalMarginC < 10 ? 'critical' : flight.thermalMarginC < 25 ? 'warn' : 'good';
    const batteryColor = battPct < 20 ? 'critical' : battPct < 40 ? 'warn' : 'good';

    const goalPct = Math.min(100, (flight.deliveredDataMb / Math.max(1, mission.targetScienceMb)) * 100);
    const goalLabel =
      missionId === 'EARTH_OBSERVATION'
        ? 'Climate photos sent home'
        : missionId === 'SPACE_TELESCOPE'
          ? 'Telescope images sent home'
          : 'Science sent home';
    const goalHint =
      flight.status === 'PRELAUNCH'
        ? 'Press Launch. Autopilot flies the rocket for you.'
        : flight.status === 'ASCENT'
          ? 'Climbing to orbit. Science starts once you get there.'
          : flight.status === 'TRANSIT' || flight.status === 'TARGET_CAPTURE'
            ? 'Cruising to the target. Speed up time with the warp buttons.'
            : flight.status === 'LANDING'
              ? 'Landing. Hold on.'
              : flight.activeDsnStationIds.length > 0
                ? 'Sending science home through a ground dish.'
                : 'Collecting science. It sends when a ground dish comes into view.';
    const L = (plain: string, expert: string) => (isBeginner ? plain : expert);

    return (
      <div className="hud-layer pointer-pass" data-testid="flight-hud">
        {/* Rocket stages: what each stage does, its fuel, and what it is doing now */}
        <div className="stage-panel" data-testid="stage-panel">
          <div className="stage-panel-title">Rocket stages</div>
          {[0, 1].map((i) => {
            const full = i === 0 ? stage1FullKg : stage2FullKg;
            const left = i === 0 ? flight.stage1PropKg : flight.stage2PropKg;
            const pct = Math.max(0, Math.min(100, (left / Math.max(1, full)) * 100));
            const state =
              i < flight.activeStageIndex
                ? 'dropped'
                : i === flight.activeStageIndex
                  ? flight.status === 'PRELAUNCH'
                    ? 'ready'
                    : flight.throttle > 0.01 && left > 0
                      ? 'burning'
                      : 'coasting'
                  : 'waiting';
            const label = { dropped: 'Dropped', ready: 'Ready', burning: 'Burning', coasting: 'Engine off', waiting: 'Waiting' }[state];
            return (
              <div
                key={i}
                className={`stage-card ${state}`}
                data-testid={i === flight.activeStageIndex ? 'flight-stage-badge' : undefined}
              >
                <div className="stage-card-top">
                  <span className="stage-card-name">{i === 0 ? 'Stage 1: Booster' : 'Stage 2: Upper stage'}</span>
                  <span className="stage-card-state">{label}</span>
                </div>
                {isBeginner && (
                  <div className="stage-card-role">
                    {i === 0 ? 'Lifts you off the ground, then falls away.' : 'Pushes you the rest of the way into orbit.'}
                  </div>
                )}
                <div className="stage-fuel-track" aria-label={`Stage ${i + 1} fuel ${Math.round(pct)}%`}>
                  <div className="stage-fuel-fill" style={{ width: `${pct}%` }} />
                </div>
              </div>
            );
          })}

          <div className="engine-meter">
            <div className="engine-meter-row">
              <span>Engine power</span>
              <span className="tabular-nums">{Math.round(shownThrottle * 100)}%</span>
            </div>
            {isBeginner || flightControls.autoGuidance ? (
              <div className="stage-fuel-track engine">
                <div className="stage-fuel-fill engine-fill" style={{ width: `${Math.round(shownThrottle * 100)}%` }} />
              </div>
            ) : (
              <input
                type="range"
                min={0}
                max={100}
                value={Math.round(flightControls.throttle * 100)}
                onChange={(e) => setThrottle(Number(e.target.value) / 100)}
                aria-label="Throttle"
                className="throttle-slider horizontal"
                data-testid="throttle-slider"
              />
            )}
          </div>

          {!isBeginner && (
            <button
              type="button"
              data-testid="stage-btn"
              className="stage-trigger-btn"
              disabled={flight.activeStageIndex === 1 || flight.status === 'PRELAUNCH'}
              onClick={requestStage}
            >
              Drop stage 1 now
            </button>
          )}
        </div>

        {/* Right Flight Status & Launch/Abort */}
        <div className="flight-right-controls">
          <div className="flight-phase-pill" data-testid="flight-status-pill">
            {isBeginner ? FLIGHT_STATUS_PLAIN[flight.status] ?? flight.status : `PHASE: ${flight.status}`}
          </div>
          {flight.status === 'PRELAUNCH' ? (
            <button
              type="button"
              data-testid="ignite-launch-btn"
              className="primary-cta-btn ignite"
              onClick={igniteLaunch}
            >
              Launch
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
        {/* Mission goal: the one number that decides the win */}
        <div className="flight-goal" data-testid="flight-goal">
          <div className="flight-goal-row">
            <span className="flight-goal-label">{goalLabel}</span>
            <span className="flight-goal-value tabular-nums">
              {Math.round(flight.deliveredDataMb)} / {mission.targetScienceMb} MB
            </span>
          </div>
          <div className="flight-goal-track">
            <div className="flight-goal-fill" style={{ width: `${goalPct}%` }} />
          </div>
          {isBeginner && <div className="flight-goal-hint">{goalHint}</div>}
        </div>

          <div className="flight-controls-row">
            {!isBeginner && (
              <>
                <button
                  type="button"
                  data-testid="toggle-autopilot-btn"
                  className={`mini-toggle-btn ${flightControls.autoGuidance ? 'active' : ''}`}
                  onClick={toggleFlightAssist}
                  title="Autopilot flies the best path to orbit. Turn it off to steer yourself."
                >
                  {flightControls.autoGuidance ? 'Autopilot: on' : 'Autopilot: off'}
                </button>
                <button
                  type="button"
                  data-testid="toggle-autostage-btn"
                  className={`mini-toggle-btn ${flightControls.autoStage ? 'active' : ''}`}
                  onClick={toggleAutoStage}
                  title="Drops the empty booster for you. If off, press Space when Stage 1 runs dry, or you coast with no engine."
                >
                  {flightControls.autoStage ? 'Auto-drop stage: on' : 'Auto-drop stage: off'}
                </button>
              </>
            )}

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

          {!isBeginner && !flightControls.autoGuidance && (
            <div className="manual-steer-hint" data-testid="manual-controls-help">
              You are flying. <kbd>W</kbd>/<kbd>S</kbd> tilt the nose up or down, <kbd>A</kbd>/<kbd>D</kbd> turn left or right,{' '}
              <kbd>Z</kbd>/<kbd>X</kbd> more or less engine power, <kbd>Space</kbd> drops stage 1. Tilt slowly toward the
              horizon after you clear the air: going straight up never reaches orbit.
            </div>
          )}
          {!isBeginner && !flightControls.autoStage && flight.activeStageIndex === 0 && (
            <div className="manual-steer-hint warn">
              Auto-drop is off: press <kbd>Space</kbd> when Stage 1 is empty, or the rocket coasts and falls back.
            </div>
          )}
          <div className="instrument-row">
            <div className="inst-pill">
              <span className="inst-k">{L('Altitude', 'ALT')}</span>
              <span className="inst-v" data-testid="inst-alt">
                {fmtAlt(flight.orbitalElements.altitudeM)}
              </span>
            </div>
            <div className="inst-pill">
              <span className="inst-k">{L('Speed', 'SPD')}</span>
              <span className="inst-v" data-testid="inst-spd">
                {Math.round(flight.orbitalElements.speedMs)} m/s
              </span>
            </div>
            <div className="inst-pill" title="Apoapsis: the highest point of your orbit">
              <span className="inst-k">{L('Orbit high', 'AP')}</span>
              <span className="inst-v">{fmtAlt(flight.orbitalElements.apoapsisAltM)}</span>
            </div>
            <div className="inst-pill" title="Periapsis: the lowest point of your orbit. Below 80 km the air drags you down.">
              <span className="inst-k">{L('Orbit low', 'PE')}</span>
              <span className="inst-v">
                {isBeginner && flight.orbitalElements.periapsisAltM < 0 ? 'Not yet' : fmtAlt(flight.orbitalElements.periapsisAltM)}
              </span>
            </div>
            <div className="inst-pill">
              <span className="inst-k">{L('Fuel', 'FUEL')}</span>
              <span className="inst-v">{isBeginner ? `${fuelPct}%` : `${Math.round(activeFuelKg)} kg stage · ${fuelPct}% total`}</span>
            </div>
            <div className={`inst-pill ${batteryColor}`}>
              <span className="inst-k">{L('Battery', 'BAT')}</span>
              <span className="inst-v">
                {battPct}%{flight.inEclipse ? L(' (in shadow)', ' (ECLIPSE)') : ''}
                {!isBeginner && flight.currentPowerDrawW > 0 ? ` (${flight.currentPowerDrawW > flight.currentPowerGenW ? '-' : '+'}${Math.round(Math.abs(flight.currentPowerGenW - flight.currentPowerDrawW))}W)` : ''}
              </span>
            </div>
            {!isBeginner && <>
            <div className={`inst-pill ${thermalColor}`}>
              <span className="inst-k">THERM</span>
              <span className="inst-v">
                {flight.thermalTempC.toFixed(0)}°C (M:{flight.thermalMarginC.toFixed(0)}°C)
              </span>
            </div>
            <div className="inst-pill">
              <span className="inst-k">BOIL</span>
              <span className="inst-v">
                {flight.propellantBoilOffKg.toFixed(2)} kg
              </span>
            </div>
            </>}
            {!isBeginner && (
            <div className="inst-pill">
              <span className="inst-k">SCIENCE</span>
              <span className="inst-v" data-testid="inst-science">
                {flight.deliveredDataMb.toFixed(0)}/{mission.targetScienceMb} MB
              </span>
            </div>
            )}
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
            <h2 className="debrief-title">
              {isBeginner
                ? debrief.outcome === 'SUCCESS'
                  ? `${MISSION_PLAIN[missionId].name}: you did it!`
                  : `${MISSION_PLAIN[missionId].name}: not this time`
                : debrief.headline}
            </h2>
          </div>

          <ScoreCard />

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
                    <span className="debrief-cell-name">{isBeginner ? PLAIN_RESOURCE[rk] : RESOURCE_LABELS[rk]}</span>
                    <span className="debrief-cell-status">{isBeginner ? PLAIN_STATUS[item.status] : item.status}</span>
                  </div>
                  {isBeginner ? (
                    <>
                      <div className="debrief-line note plain">{item.beginnerNote}</div>
                      <details className="debrief-more">
                        <summary>Details</summary>
                        <div className="debrief-line right">
                          <strong>RIGHT:</strong> {item.whatWentRight}
                        </div>
                        <div className="debrief-line wrong">
                          <strong>ISSUE:</strong> {item.whatWentWrong}
                        </div>
                      </details>
                    </>
                  ) : (
                    <>
                      <div className="debrief-line right">
                        <strong>RIGHT:</strong> {item.whatWentRight}
                      </div>
                      <div className="debrief-line wrong">
                        <strong>ISSUE:</strong> {item.whatWentWrong}
                      </div>
                      <div className="debrief-line note">{item.realisticMetrics}</div>
                    </>
                  )}
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
              {debrief.outcome === 'SUCCESS' ? 'Try another design' : 'Fix my design'}
            </button>
            <button
              type="button"
              data-testid="new-mission-btn"
              className="secondary-hud-btn"
              onClick={restartCampaign}
            >
              New mission
            </button>
          </div>
        </div>
      </div>
    );
  }

  return null;
};
