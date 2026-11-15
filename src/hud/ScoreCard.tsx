import React, { useEffect, useMemo, useRef, useState } from 'react';
import { MISSIONS } from '../core/constants';
import { evaluateGroundSegment } from '../core/groundSegment';
import type { MissionId } from '../core/types';
import { useMissionStore } from '../store/useMissionStore';
import { MISSION_PLAIN } from './plainText';

/**
 * Mission score: rewards a successful mission plus efficient engineering
 * (money left, fuel to spare, finished early), as the challenge brief asks.
 * Best scores are kept on this device, per mission.
 */

const SCORES_KEY = 'orbital-architect-scores';

interface ScorePart {
  label: string;
  points: number;
  max: number;
}

function readBest(): Partial<Record<MissionId, number[]>> {
  try {
    return JSON.parse(localStorage.getItem(SCORES_KEY) ?? '{}');
  } catch {
    return {};
  }
}

function saveScore(missionId: MissionId, score: number): { best: number[]; isNewBest: boolean } {
  const all = readBest();
  const prev = all[missionId] ?? [];
  const isNewBest = prev.length === 0 || score > Math.max(...prev);
  const best = [...prev, score].sort((a, b) => b - a).slice(0, 5);
  all[missionId] = best;
  try {
    localStorage.setItem(SCORES_KEY, JSON.stringify(all));
  } catch {
    /* storage blocked: the score still shows, it just isn't remembered */
  }
  return { best, isNewBest };
}

function rankFor(total: number): string {
  if (total >= 1650) return 'Flight Director';
  if (total >= 1350) return 'Mission Lead';
  if (total >= 1000) return 'Flight Engineer';
  return 'Cadet';
}

export const ScoreCard: React.FC = () => {
  const debrief = useMissionStore((s) => s.debrief);
  const flight = useMissionStore((s) => s.flight);
  const missionId = useMissionStore((s) => s.missionId);
  const spacecraft = useMissionStore((s) => s.spacecraft);
  const ground = useMissionStore((s) => s.ground);
  const difficulty = useMissionStore((s) => s.difficulty);
  const [saved, setSaved] = useState<{ best: number[]; isNewBest: boolean } | null>(null);
  const savedFor = useRef<unknown>(null);

  const parts: ScorePart[] = useMemo(() => {
    if (!debrief || !flight) return [];
    const mission = MISSIONS[missionId];
    const ge = evaluateGroundSegment(missionId, spacecraft, ground, difficulty);
    const success = debrief.outcome === 'SUCCESS';
    const scienceShare = Math.min(1, flight.deliveredDataMb / Math.max(1, mission.targetScienceMb));
    const moneyLeft = Math.max(0, (mission.budgetCapM - ge.totalCampaignCostM) / mission.budgetCapM);
    const fuelLeft = Math.min(1, Math.max(0, flight.deltaVRemainingMs) / 800);
    const timeLeft = Math.max(0, (mission.scheduleLimitMonths - ge.totalCampaignMonths) / mission.scheduleLimitMonths);
    return [
      { label: success ? 'Mission complete' : 'Science sent home', points: success ? 1000 : Math.round(500 * scienceShare), max: 1000 },
      { label: 'Money left over', points: Math.round(400 * moneyLeft), max: 400 },
      { label: 'Fuel to spare', points: success ? Math.round(300 * fuelLeft) : 0, max: 300 },
      { label: 'Built ahead of schedule', points: Math.round(200 * timeLeft), max: 200 },
    ];
  }, [debrief, flight, missionId, spacecraft, ground, difficulty]);

  const total = parts.reduce((sum, p) => sum + p.points, 0);

  // Save once per finished mission.
  useEffect(() => {
    if (!debrief || parts.length === 0 || savedFor.current === debrief) return;
    savedFor.current = debrief;
    setSaved(saveScore(missionId, total));
  }, [debrief, parts, missionId, total]);

  if (!debrief || parts.length === 0) return null;

  return (
    <section className="score-card" data-testid="score-card" aria-label="Mission score">
      <div className="score-main">
        <div className="score-label">Score</div>
        <div className="score-total tabular-nums" data-testid="score-total">
          {total.toLocaleString()}
        </div>
        <div className="score-rank">
          {rankFor(total)}
          {saved?.isNewBest && <span className="score-best-badge">New best!</span>}
        </div>
      </div>
      <ul className="score-parts">
        {parts.map((p) => (
          <li key={p.label}>
            <span>{p.label}</span>
            <span className="score-part-bar" aria-hidden="true">
              <span style={{ width: `${(p.points / p.max) * 100}%` }} />
            </span>
            <span className="tabular-nums">+{p.points}</span>
          </li>
        ))}
      </ul>
      {saved && saved.best.length > 1 && (
        <div className="score-history">
          <div className="score-history-title">Your best on {MISSION_PLAIN[missionId].name}</div>
          <ol>
            {saved.best.map((s, i) => (
              <li key={i} className={s === total ? 'this-run' : ''}>
                {s.toLocaleString()}
              </li>
            ))}
          </ol>
        </div>
      )}
    </section>
  );
};
