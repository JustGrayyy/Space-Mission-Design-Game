import React, { useState } from 'react';
import { MISSIONS } from '../core/constants';
import { evaluateGroundSegment } from '../core/groundSegment';
import { validateSpacecraft } from '../core/spacecraftValidator';
import type { EngineeringConflict } from '../core/types';
import { useMissionStore } from '../store/useMissionStore';

type KapMood = 'HAPPY' | 'CONCERNED' | 'ALERT';

export const KapCommsBubble: React.FC = () => {
  const phase = useMissionStore((s) => s.phase);
  const difficulty = useMissionStore((s) => s.difficulty);
  const missionId = useMissionStore((s) => s.missionId);
  const spacecraft = useMissionStore((s) => s.spacecraft);
  const ground = useMissionStore((s) => s.ground);
  const flight = useMissionStore((s) => s.flight);
  const debrief = useMissionStore((s) => s.debrief);

  const [expanded, setExpanded] = useState(false);

  if (phase === 'TITLE') return null;

  const mission = MISSIONS[missionId];
  let mood: KapMood = 'HAPPY';
  let headline = '';
  let conflicts: EngineeringConflict[] = [];

  if (phase === 'OBJECTIVE_SELECT') {
    mood = 'HAPPY';
    headline =
      difficulty === 'BEGINNER'
        ? `Pick a target in 3D space! ${mission.beginnerBrief}`
        : `${mission.title} — ${mission.realisticBrief}`;
  } else if (phase === 'HANGAR') {
    const val = validateSpacecraft(missionId, spacecraft, difficulty, ground);
    mood = val.kapMood;
    conflicts = val.conflicts;
    if (conflicts.length > 0) {
      const top = conflicts[0];
      headline =
        difficulty === 'BEGINNER' ? top.beginnerMessage : top.realisticMessage;
    } else {
      headline = val.kapHeadline;
    }
  } else if (phase === 'GROUND_SEGMENT') {
    const ge = evaluateGroundSegment(missionId, spacecraft, ground, difficulty);
    conflicts = ge.conflicts;
    mood = !ge.canGreenlight
      ? 'ALERT'
      : ge.bufferOverflowRisk === 'WARNING'
        ? 'CONCERNED'
        : 'HAPPY';
    headline = ge.kapRecommendation;
  } else if (phase === 'FLIGHT' && flight) {
    const lastEvt = flight.events[flight.events.length - 1];
    if (flight.inEclipse && flight.batteryWh < flight.batteryMaxWh * 0.25) {
      mood = 'ALERT';
      headline =
        difficulty === 'BEGINNER'
          ? 'Shadow crossing! Battery running low — hang tight until sunlight!'
          : `Umbra power alert: ${flight.batteryWh.toFixed(0)} Wh remaining.`;
    } else if (flight.droppedDataMb > 5) {
      mood = 'CONCERNED';
      headline =
        difficulty === 'BEGINNER'
          ? 'Memory full! Dropping camera packets while waiting for a ground dish.'
          : `Onboard buffer overflow: ${flight.droppedDataMb.toFixed(1)} MB dropped.`;
    } else if (lastEvt) {
      mood =
        lastEvt.kind === 'CRITICAL'
          ? 'ALERT'
          : lastEvt.kind === 'WARN'
            ? 'CONCERNED'
            : 'HAPPY';
      headline = lastEvt.message;
    } else {
      headline = 'All flight telemetry nominal.';
    }
  } else if (phase === 'DEBRIEF' && debrief) {
    mood = debrief.outcome === 'SUCCESS' ? 'HAPPY' : 'ALERT';
    headline = debrief.kapSummary;
  }

  const ledColor =
    mood === 'HAPPY' ? '#34d399' : mood === 'CONCERNED' ? '#f59e0b' : '#ef4444';
  const visorAccent =
    mood === 'HAPPY' ? '#38bdf8' : mood === 'CONCERNED' ? '#fbbf24' : '#f87171';

  return (
    <aside
      className={`kap-comms-bubble mood-${mood.toLowerCase()}`}
      data-testid="kap-comms-bubble"
      data-kap-mood={mood}
    >
      <div className="kap-avatar-wrap" aria-hidden="true">
        <svg viewBox="0 0 72 72" className="kap-svg">
          {/* Helmet outer shell */}
          <circle
            cx="36"
            cy="36"
            r="31"
            fill="#0f1b33"
            stroke={ledColor}
            strokeWidth="2.5"
          />
          {/* Headset ear pods */}
          <rect x="2" y="26" width="7" height="20" rx="3.5" fill="#1e293b" stroke="#64748b" strokeWidth="1.5" />
          <rect x="63" y="26" width="7" height="20" rx="3.5" fill="#1e293b" stroke="#64748b" strokeWidth="1.5" />
          {/* Visor inner cavity */}
          <rect x="13" y="16" width="46" height="36" rx="16" fill="#071122" stroke={visorAccent} strokeWidth="1.6" />
          {/* Visor reflection */}
          <path d="M 19 22 Q 28 18 42 20" stroke="rgba(255,255,255,0.28)" strokeWidth="2.4" fill="none" strokeLinecap="round" />

          {/* Expressive Eyes & Eyebrows */}
          {mood === 'HAPPY' && (
            <>
              <path d="M 23 30 Q 27 27 31 30" stroke="#7dd3fc" strokeWidth="2" fill="none" strokeLinecap="round" />
              <path d="M 41 30 Q 45 27 49 30" stroke="#7dd3fc" strokeWidth="2" fill="none" strokeLinecap="round" />
              <circle cx="27" cy="34" r="2.7" fill="#e0f2fe" />
              <circle cx="45" cy="34" r="2.7" fill="#e0f2fe" />
              <path d="M 29 42 Q 36 47 43 42" stroke="#34d399" strokeWidth="2.4" fill="none" strokeLinecap="round" />
            </>
          )}
          {mood === 'CONCERNED' && (
            <>
              <line x1="22" y1="30" x2="31" y2="28" stroke="#fcd34d" strokeWidth="2.2" strokeLinecap="round" />
              <line x1="41" y1="28" x2="50" y2="30" stroke="#fcd34d" strokeWidth="2.2" strokeLinecap="round" />
              <circle cx="27" cy="34" r="2.6" fill="#fef3c7" />
              <circle cx="45" cy="34" r="2.6" fill="#fef3c7" />
              <path d="M 30 44 Q 36 42 42 44" stroke="#f59e0b" strokeWidth="2.3" fill="none" strokeLinecap="round" />
            </>
          )}
          {mood === 'ALERT' && (
            <>
              <line x1="22" y1="28" x2="31" y2="32" stroke="#fca5a5" strokeWidth="2.4" strokeLinecap="round" />
              <line x1="41" y1="32" x2="50" y2="28" stroke="#fca5a5" strokeWidth="2.4" strokeLinecap="round" />
              <circle cx="27" cy="35" r="2.8" fill="#fee2e2" />
              <circle cx="45" cy="35" r="2.8" fill="#fee2e2" />
              <ellipse cx="36" cy="44" rx="4.5" ry="3.2" fill="none" stroke="#ef4444" strokeWidth="2.2" />
            </>
          )}

          {/* Mic boom & status LED */}
          <path d="M 65 42 Q 58 53 45 53" stroke="#94a3b8" strokeWidth="2" fill="none" strokeLinecap="round" />
          <circle cx="44" cy="53" r="2.4" fill={ledColor} />
          <circle cx="36" cy="8" r="2.5" fill={ledColor} />
        </svg>
      </div>

      <div className="kap-text-col">
        <div className="kap-header-row">
          <span className="kap-name">KAP // FLIGHT ENGINEER</span>
          <span className="kap-mood-pill" style={{ color: ledColor, borderColor: ledColor }}>
            {mood}
          </span>
          {conflicts.length > 1 && (
            <button
              type="button"
              className="kap-expand-btn"
              onClick={() => setExpanded((v) => !v)}
            >
              {expanded ? 'HIDE' : `+${conflicts.length - 1} MORE`}
            </button>
          )}
        </div>
        <p className="kap-message" data-testid="kap-message">
          {headline}
        </p>

        {expanded && conflicts.length > 1 && (
          <div className="kap-conflict-list">
            {conflicts.slice(1).map((c) => (
              <div key={c.id} className={`kap-conflict-item sev-${c.severity.toLowerCase()}`}>
                {difficulty === 'BEGINNER' ? c.beginnerMessage : c.realisticMessage}
              </div>
            ))}
          </div>
        )}
      </div>
    </aside>
  );
};
