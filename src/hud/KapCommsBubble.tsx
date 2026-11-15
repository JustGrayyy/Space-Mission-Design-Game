import React, { useEffect, useRef, useState } from 'react';
import { engine } from '../audio/sound';
import { MISSIONS } from '../core/constants';
import { evaluateGroundSegment } from '../core/groundSegment';
import { validateSpacecraft } from '../core/spacecraftValidator';
import type { CoupledMetrics, EngineeringConflict, MissionSpec } from '../core/types';
import { useMissionStore } from '../store/useMissionStore';

import { KapFace, type KapMood } from './KapFace';
import { useTourVisible } from './KapTour';
import { PART_PLAIN, usePartFocus } from './partPlain';

/** Plays Kap's comm blip when the message changes (at most once every 1.5 s). */
const KapChime: React.FC<{ headline: string; mood: KapMood }> = ({ headline, mood }) => {
  const last = useRef({ headline: '', at: 0 });
  useEffect(() => {
    if (!headline || headline === last.current.headline) return;
    const now = performance.now();
    const quiet = now - last.current.at < 1500;
    last.current = { headline, at: quiet ? last.current.at : now };
    if (!quiet && engine.ready) engine.kap(mood);
  }, [headline, mood]);
  return null;
};

export const KapCommsBubble: React.FC = () => {
  const phase = useMissionStore((s) => s.phase);
  const difficulty = useMissionStore((s) => s.difficulty);
  const missionId = useMissionStore((s) => s.missionId);
  const spacecraft = useMissionStore((s) => s.spacecraft);
  const ground = useMissionStore((s) => s.ground);
  const flight = useMissionStore((s) => s.flight);
  const debrief = useMissionStore((s) => s.debrief);
  const coupledMetrics = useMissionStore((s) => s.coupledMetrics);
  const launchCoupledMetrics = useMissionStore((s) => s.launchCoupledMetrics);

  const [expanded, setExpanded] = useState(false);
  const store = useMissionStore.getState();
  const tourVisible = useTourVisible();
  const focusPartId = usePartFocus((s) => s.partId);

  if (phase === 'TITLE') return null;

  const mission = MISSIONS[missionId];
  let mood: KapMood = 'HAPPY';
  let headline = '';
  let conflicts: EngineeringConflict[] = [];
  let contextualTip = '';

  // Use coupled metrics for contextual tips
  const coupled = coupledMetrics ?? launchCoupledMetrics;

  if (phase === 'OBJECTIVE_SELECT') {
    mood = 'HAPPY';
    headline =
      difficulty === 'BEGINNER'
        ? 'Pick a mission on the right. Orbit Earth is the easiest first flight.'
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

    // Contextual engineering tips for HANGAR
    if (coupled) {
      contextualTip = getHangarContextualTip(coupled, mission, difficulty);
    }
  } else if (phase === 'LAUNCH_SITE') {
    mood = 'HAPPY';
    headline =
      difficulty === 'BEGINNER'
        ? 'Pick where your rocket launches from. Kennedy Space Center in Florida is a great first choice.'
        : 'Select a launch range. Site latitude sets your minimum orbital inclination and how much boost Earth\'s spin gives you.';
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

    // Contextual tips for FLIGHT
    if (coupled) {
      contextualTip = getFlightContextualTip(coupled, flight, mission, difficulty);
    }
  } else if (phase === 'DEBRIEF' && debrief) {
    mood = debrief.outcome === 'SUCCESS' ? 'HAPPY' : 'ALERT';
    headline = debrief.kapSummary;
  }

  // In Beginner, Kap offers the one action that moves the player forward.
  const isBeginner = difficulty === 'BEGINNER';
  let action: { label: string; run: () => void } | null = null;
  if (phase === 'HANGAR') {
    const val = validateSpacecraft(missionId, spacecraft, difficulty, ground);
    if (!val.isLaunchable) {
      action = { label: val.isComplete ? 'Fix it for me' : 'Build it for me', run: store.applyRecommendedLoadout };
      if (isBeginner && !val.isComplete && conflicts.length === 0) {
        headline = 'A spacecraft needs 8 parts. Pick them below, or let me build it.';
      }
    } else {
      if (isBeginner) headline = 'Looks great! Everything is green. Next, pick where to launch.';
      action = { label: 'Next', run: store.rolloutToGround };
    }
    // Kap talks about the part you're looking at, unless there's a problem to flag first.
    const focus = focusPartId ? PART_PLAIN[focusPartId] : null;
    if (isBeginner && focus && !conflicts.some((c) => c.severity === 'CRITICAL')) {
      headline = `${focus.name}: ${focus.good.toLowerCase()}. The catch: ${focus.bad.toLowerCase()}.`;
    }
  } else if (phase === 'LAUNCH_SITE') {
    action = { label: 'Continue', run: store.confirmLaunchSite };
  } else if (phase === 'GROUND_SEGMENT') {
    const ge = evaluateGroundSegment(missionId, spacecraft, ground, difficulty);
    if (!ge.canGreenlight) {
      action = { label: 'Set it up for me', run: store.applyRecommendedGround };
    } else {
      if (isBeginner) headline = 'Radio dishes are ready to catch your data. Ready when you are!';
      action = { label: 'Go for launch', run: store.greenlightLiftoff };
    }
  } else if (phase === 'FLIGHT' && flight?.status === 'PRELAUNCH') {
    if (isBeginner) headline = 'Your rocket is on the pad. Press Launch and the autopilot does the flying.';
    action = { label: 'Launch', run: store.igniteLaunch };
  } else if (phase === 'DEBRIEF' && debrief && debrief.outcome !== 'SUCCESS') {
    action = { label: 'Fix my design', run: store.returnToHangarKeepDesign };
  }
  if (isBeginner && phase === 'FLIGHT' && flight) headline = plainFlight(headline);

  // On the results screen the report and score speak for themselves; Kap would cover them.
  if (tourVisible || phase === 'DEBRIEF') return null;

  return (
    <aside
      className={`kap-comms-bubble mood-${mood.toLowerCase()}`}
      data-testid="kap-comms-bubble"
      data-kap-mood={mood}
    >
      <KapChime headline={headline} mood={mood} />
      <div className="kap-avatar-wrap">
        <KapFace mood={mood} />
      </div>

      <div className="kap-text-col">
        <div className="kap-header-row">
          <span className="kap-name">Kap</span>
          {conflicts.length > 1 && (
            <button
              type="button"
              className="kap-expand-btn"
              onClick={() => setExpanded((v) => !v)}
            >
              {expanded ? 'Hide' : `${conflicts.length - 1} more`}
            </button>
          )}
        </div>
        <p className="kap-message" data-testid="kap-message">
          {headline}
        </p>

        {!isBeginner && contextualTip && (
          <p className="kap-contextual-tip">{contextualTip}</p>
        )}

        {expanded && conflicts.length > 1 && (
          <div className="kap-conflict-list">
            {conflicts.slice(1).map((c) => (
              <div key={c.id} className={`kap-conflict-item sev-${c.severity.toLowerCase()}`}>
                {isBeginner ? c.beginnerMessage : c.realisticMessage}
              </div>
            ))}
          </div>
        )}

        {action && (
          <button type="button" className="kap-action-btn" onClick={action.run} data-testid="kap-action-btn">
            {action.label}
          </button>
        )}
      </div>
    </aside>
  );
};

/** Turns engineering flight callouts into words a first-time player understands. */
function plainFlight(msg: string): string {
  const rules: [RegExp, string][] = [
    [/MECO|stage 2 ignition/i, 'First stage done! The second engine takes over.'],
    [/liftoff|ignition confirmed/i, 'Liftoff! We are on our way up.'],
    [/parking orbit|orbit achieved|stable/i, 'We made it to orbit! The camera is starting work.'],
    [/TLI|trans-?lunar/i, 'Engines on! Heading for the Moon.'],
    [/TMI|trans-?mars/i, 'Engines on! Heading for Mars.'],
    [/fairing/i, 'The nose cover just popped off. We are above the air now.'],
    [/touchdown|landed/i, 'Touchdown! We landed safely.'],
    [/telemetry nominal/i, 'Everything looks good.'],
  ];
  for (const [re, plain] of rules) if (re.test(msg)) return plain;
  return msg;
}

function getHangarContextualTip(coupled: CoupledMetrics, _mission: MissionSpec, difficulty: string): string {
  const tips: string[] = [];

  // Mars solar flux drop
  if (coupled.solarDistanceAU > 1.2 && coupled.sunlitGenerationW > 0) {
    const solarPct = Math.round(coupled.irradianceFactor * 100);
    if (coupled.netPeakW < 0) {
      tips.push(
        difficulty === 'BEGINNER'
          ? `Mars sunlight is only ${solarPct}% of Earth — solar arrays produce ${Math.round(coupled.sunlitGenerationW)}W here vs ${Math.round(coupled.sunlitGenerationW / coupled.irradianceFactor)}W at Earth. Consider RTG nuclear power.`
          : `1/r² solar flux at ${coupled.solarDistanceAU.toFixed(2)} AU = ${solarPct}% Earth irradiance. Peak margin ${coupled.netPeakW.toFixed(0)}W — RTG or oversized arrays required.`
      );
    }
  }

  // Cold deep-space heaters draining battery
  if (coupled.shadowSurvivalHeaterW > 0 && coupled.eclipseEnduranceMin < coupled.requiredEclipseMin * 1.5) {
    tips.push(
      difficulty === 'BEGINNER'
        ? `Deep-space cold requires ${Math.round(coupled.shadowSurvivalHeaterW)}W survival heaters in shadow, draining your battery. Bigger battery or better thermal tier (Tier 3+) reduces heater draw.`
        : `Shadow survival heaters: ${coupled.shadowSurvivalHeaterW.toFixed(0)}W. Eclipse endurance ${coupled.eclipseEnduranceMin.toFixed(1)}min vs ${coupled.requiredEclipseMin.toFixed(1)}min required. Thermal Tier ${Math.ceil(coupled.radiatorRejectionW / 500)} insufficient for heat rejection.`
    );
  }

  // Heavy Tier 4 parts eroding Δv margin
  if (coupled.deltaVMarginMs < 300 && coupled.payloadToLiftMarginKg < 500) {
    tips.push(
      difficulty === 'BEGINNER'
        ? `Heavy subsystems eating your Δv margin (${Math.round(coupled.deltaVMarginMs)} m/s left). Consider lighter Tier 3 parts or a bigger rocket.`
        : `Δv margin thin: ${coupled.deltaVMarginMs.toFixed(0)} m/s. Payload-to-lift margin: ${coupled.payloadToLiftMarginKg.toFixed(0)} kg. Heavy Tier 4 parts reduce propellant fraction.`
    );
  }

  // Thermal heater capacity exceeded
  if (coupled.thermalCritical) {
    tips.push(
      difficulty === 'BEGINNER'
        ? `Thermal heaters exceed capacity — spacecraft will freeze in shadow! Upgrade to Tier 3+ thermal.`
        : `Required shadow heater ${coupled.shadowSurvivalHeaterW.toFixed(0)}W > thermal subsystem capacity. Cold-soak risk.`
    );
  }

  // Tight power margin
  if (coupled.netCruiseW < coupled.cruisePowerW * 0.15 && coupled.netCruiseW > 0) {
    tips.push(
      difficulty === 'BEGINNER'
        ? `Power margin is thin (+${Math.round(coupled.netCruiseW)}W). Battery recharges slowly in sun.`
        : `Low sunlit recharge margin: +${coupled.netCruiseW.toFixed(0)}W (<15% of cruise load).`
    );
  }

  return tips.join(' | ');
}

function getFlightContextualTip(coupled: CoupledMetrics, _flight: any, _mission: MissionSpec, difficulty: string): string {
  // During flight, reference launch margins
  if (coupled.deltaVMarginMs < 200) {
    return difficulty === 'BEGINNER'
      ? `Low Δv reserve (${Math.round(coupled.deltaVMarginMs)} m/s) — fly efficiently!`
      : `Launch Δv margin: ${coupled.deltaVMarginMs.toFixed(0)} m/s. Minimize gravity losses.`;
  }

  if (coupled.eclipseEnduranceMin < coupled.requiredEclipseMin * 1.2) {
    return difficulty === 'BEGINNER'
      ? `Battery may not survive next eclipse — watch your power!`
      : `Eclipse endurance margin: ${(coupled.eclipseEnduranceMin / coupled.requiredEclipseMin * 100).toFixed(0)}%.`;
  }

  return '';
}
