import React from 'react';
import { useSoundStore } from '../audio/sound';
import { COMMS_BANDS, MISSIONS } from '../core/constants';
import { evaluateGroundSegment } from '../core/groundSegment';
import { validateSpacecraft } from '../core/spacecraftValidator';
import type { GamePhase, ResourceKey } from '../core/types';
import { useMissionStore } from '../store/useMissionStore';
import { useTourStore } from './KapTour';
import { MISSION_PLAIN } from './plainText';

type Status = 'good' | 'warn' | 'bad';

function getStatusClass(value: number, thresholds: { good: number; warn: number }): Status {
  if (value >= thresholds.good) return 'good';
  if (value >= thresholds.warn) return 'warn';
  return 'bad';
}

const STEPS: { phase: GamePhase; label: string }[] = [
  { phase: 'OBJECTIVE_SELECT', label: 'Mission' },
  { phase: 'HANGAR', label: 'Build' },
  { phase: 'LAUNCH_SITE', label: 'Launch site' },
  { phase: 'GROUND_SEGMENT', label: 'Mission control' },
  { phase: 'FLIGHT', label: 'Fly' },
  { phase: 'DEBRIEF', label: 'Results' },
];

const PhaseStepper: React.FC<{ phase: GamePhase }> = ({ phase }) => {
  const current = STEPS.findIndex((s) => s.phase === phase);
  return (
    <ol className="phase-stepper" aria-label="Mission progress" data-testid="phase-stepper">
      {STEPS.map((step, i) => {
        const state = i < current ? 'done' : i === current ? 'current' : 'next';
        return (
          <li key={step.phase} className={`step ${state}`} aria-current={state === 'current' ? 'step' : undefined}>
            <span className="step-mark" aria-hidden="true">
              {state === 'done' ? (
                <svg viewBox="0 0 16 16" width="10" height="10">
                  <path d="M3 8.5l3.2 3L13 4.5" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              ) : (
                i + 1
              )}
            </span>
            <span className="step-label">{step.label}</span>
          </li>
        );
      })}
    </ol>
  );
};

const SoundToggle: React.FC = () => {
  const muted = useSoundStore((s) => s.muted);
  const toggleMuted = useSoundStore((s) => s.toggleMuted);
  return (
    <button
      type="button"
      className="sound-toggle"
      onClick={toggleMuted}
      aria-pressed={!muted}
      aria-label={muted ? 'Turn sound on' : 'Turn sound off'}
      title={muted ? 'Sound off' : 'Sound on'}
      data-testid="sound-toggle"
    >
      <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true">
        <path d="M4 9.5h3.5L12 5.5v13l-4.5-4H4z" fill="currentColor" />
        {muted ? (
          <path d="M16 9.5l5 5M21 9.5l-5 5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        ) : (
          <path d="M15.5 9a4.2 4.2 0 010 6M18 6.5a7.8 7.8 0 010 11" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        )}
      </svg>
    </button>
  );
};

interface Chip {
  key: string;
  label: string;
  status: Status;
  value: string;
  tip: string;
}

const STATUS_WORD: Record<Status, string> = { good: 'OK', warn: 'Tight', bad: 'Problem' };

/** The science behind each resource, from the team's Project TALA physics reference. */
const LEARN: Record<string, { title: string; body: string; formula: string; note: string; tip: string }> = {
  mass: {
    title: 'Weight',
    body: 'Every kilogram you add has to be lifted off Earth. A heavier spacecraft needs a stronger rocket, more fuel, or both.',
    formula: 'TWR = thrust ÷ (mass × g)  >  1',
    note: 'Thrust-to-weight ratio. Below 1 the rocket cannot leave the pad. Real launchers start around 1.2 to 1.5.',
    tip: 'Pick the lightest part that still does the job. Big parts are not always better parts.',
  },
  fuel: {
    title: 'Fuel',
    body: 'Fuel is really a budget of speed. Every burn spends some of it, and once it is gone you cannot change course.',
    formula: 'Δv = Isp × g₀ × ln(m₀ ÷ m_f)',
    note: 'The Tsiolkovsky rocket equation. Δv is how much speed you can add, Isp is engine efficiency, m₀ and m_f are mass with and without fuel. Low Earth orbit needs about 9.4 km/s.',
    tip: 'A lighter spacecraft gets more Δv out of the same rocket.',
  },
  power: {
    title: 'Power',
    body: 'Solar panels must make more power than everything on board uses. In a planet\'s shadow the panels make nothing, so a battery has to carry you through.',
    formula: 'battery Wh  ≥  power draw W × shadow minutes ÷ 60',
    note: 'Sunlight also gets weaker with distance: at Mars it is only 43% as strong as at Earth (it falls off with distance squared).',
    tip: 'Far from the Sun, a nuclear RTG generator beats solar panels.',
  },
  data: {
    title: 'Science',
    body: 'Your instrument collects data every orbit. You only win when that data reaches scientists on Earth.',
    formula: 'data made per orbit  ≤  radio speed × contact time',
    note: 'If the camera makes data faster than the radio can send it, memory fills up and new data is lost.',
    tip: 'A sharper camera makes more data, so it needs a faster radio too.',
  },
  comms: {
    title: 'Radio',
    body: 'Data travels home through giant radio dishes on Earth, like NASA\'s Deep Space Network in California, Spain and Australia.',
    formula: 'S-band  <  X-band  <  Ka-band',
    note: 'Higher frequency bands carry more data per second, but cost more. Three dishes spread around the world keep the spacecraft in view almost all day.',
    tip: 'More dishes means more time in contact.',
  },
  radio: {
    title: 'Radio',
    body: 'You can only send science home while a ground dish can see your spacecraft. Between dishes, data waits in memory.',
    formula: 'S-band  <  X-band  <  Ka-band',
    note: 'Higher frequency bands carry more data per second, but cost more.',
    tip: 'No signal is normal for a few minutes per orbit.',
  },
  budget: {
    title: 'Money',
    body: 'Every mission has a budget cap. The spacecraft, the rocket and the ground stations all come out of the same pot.',
    formula: 'spacecraft + rocket + ground stations  ≤  budget',
    note: 'Real missions trade capability for cost all the time. NASA cost-caps many science missions the same way.',
    tip: 'The cheapest rocket that can still lift you is usually the right one.',
  },
  time: {
    title: 'Build time',
    body: 'Every part takes months to build. If the spacecraft is not ready, it misses its launch window.',
    formula: 'longest part build time  ≤  launch window',
    note: 'Planets line up only at certain times. A Mars launch window opens about every 26 months.',
    tip: 'New, cutting-edge parts take the longest to build.',
  },
};

const LearnModal: React.FC<{ chip: Chip; onClose: () => void }> = ({ chip, onClose }) => {
  const info = LEARN[chip.key];
  const closeRef = React.useRef<HTMLButtonElement>(null);
  React.useEffect(() => {
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);
  if (!info) return null;
  return (
    <div className="learn-modal-backdrop" onClick={onClose} data-testid="learn-modal">
      <div className="learn-modal" role="dialog" aria-modal="true" aria-labelledby="learn-title" onClick={(e) => e.stopPropagation()}>
        <span className={`learn-status ${chip.status}`}>{STATUS_WORD[chip.status]}</span>
        <h2 className="learn-title" id="learn-title">{info.title}</h2>
        <div className="learn-now">Now: {chip.value}</div>
        <p className="learn-body">{info.body}</p>
        <p className="learn-tip">{info.tip}</p>
        <details className="learn-math">
          <summary>See the real formula</summary>
          <div className="learn-formula">{info.formula}</div>
          <p className="learn-formula-note">{info.note}</p>
        </details>
        <button ref={closeRef} type="button" className="secondary-hud-btn learn-close" onClick={onClose}>
          Got it
        </button>
      </div>
    </div>
  );
};

export const TopResourceStrip: React.FC = () => {
  const phase = useMissionStore((s) => s.phase);
  const difficulty = useMissionStore((s) => s.difficulty);
  const missionId = useMissionStore((s) => s.missionId);
  const spacecraft = useMissionStore((s) => s.spacecraft);
  const ground = useMissionStore((s) => s.ground);
  const flight = useMissionStore((s) => s.flight);
  const coupledMetrics = useMissionStore((s) => s.coupledMetrics);
  const setDifficulty = useMissionStore((s) => s.setDifficulty);
  const [learnKey, setLearnKey] = React.useState<string | null>(null);
  const startTour = useTourStore((s) => s.start);
  const closeLearn = React.useCallback(() => setLearnKey(null), []);

  if (phase === 'TITLE') return null;

  const mission = MISSIONS[missionId];
  const craftVal = validateSpacecraft(missionId, spacecraft, difficulty, ground);
  const groundEval = evaluateGroundSegment(missionId, spacecraft, ground, difficulty);
  const band = COMMS_BANDS[ground.bandId];
  const coupled = coupledMetrics ?? craftVal.coupledMetrics;
  const isBeginner = difficulty === 'BEGINNER';
  const inFlight = phase === 'FLIGHT' && flight;
  const buildStarted = Object.values(spacecraft).some(Boolean);

  const conflictStatus = (rk: ResourceKey): Status => {
    const cs = craftVal.conflicts.filter((c) => c.resource === rk);
    if (cs.some((c) => c.severity === 'CRITICAL')) return 'bad';
    if (cs.length > 0) return 'warn';
    return 'good';
  };

  const totalCostM =
    phase === 'HANGAR' || phase === 'OBJECTIVE_SELECT'
      ? craftVal.budget.totalCraftAndLauncherM
      : groundEval.totalCampaignCostM;
  const totalMonths =
    phase === 'HANGAR' || phase === 'OBJECTIVE_SELECT'
      ? craftVal.schedule.buildMonths
      : groundEval.totalCampaignMonths;

  // ---- Beginner chips: plain words, one status each, details on hover ----
  let chips: Chip[];
  if (inFlight && flight) {
    const battPct = Math.round((flight.batteryWh / Math.max(1, flight.batteryMaxWh)) * 100);
    const linked = flight.activeDsnStationIds.length > 0;
    chips = [
      {
        key: 'fuel',
        label: 'Fuel',
        status: flight.deltaVRemainingMs > 300 ? 'good' : flight.deltaVRemainingMs > 80 ? 'warn' : 'bad',
        value: `${Math.round(flight.deltaVRemainingMs)} m/s left`,
        tip: 'How much more speed your remaining fuel can add.',
      },
      {
        key: 'power',
        label: 'Battery',
        status: battPct > 40 ? 'good' : battPct > 20 ? 'warn' : 'bad',
        value: `${battPct}%${flight.inEclipse ? ' (in shadow)' : ''}`,
        tip: 'Solar panels make no power in shadow, so the battery has to carry you through.',
      },
      {
        key: 'radio',
        label: 'Radio',
        status: linked ? 'good' : 'warn',
        value: linked ? `Connected (${flight.activeDsnStationIds.length})` : 'No signal',
        tip: 'Science only reaches Earth while a ground dish can see you.',
      },
      {
        key: 'budget',
        label: 'Money',
        status: totalCostM > mission.budgetCapM ? 'bad' : 'good',
        value: `$${totalCostM}M of $${mission.budgetCapM}M`,
        tip: 'Total cost of the spacecraft, rocket and ground stations.',
      },
    ];
  } else {
    const off = !buildStarted && phase !== 'GROUND_SEGMENT';
    const pick = (rk: ResourceKey): Status => (off ? 'good' : conflictStatus(rk));
    chips = [
      {
        key: 'mass',
        label: 'Weight',
        status: pick('mass'),
        value: `${craftVal.mass.spacecraftDryKg} kg`,
        tip: 'Heavier spacecraft need a stronger rocket and more fuel.',
      },
      {
        key: 'power',
        label: 'Power',
        status: pick('power'),
        value: `${Math.round(craftVal.power.netSunlitW)} W spare`,
        tip: 'Solar panels or a generator must cover everything that draws power.',
      },
      {
        key: 'data',
        label: 'Science',
        status: phase === 'GROUND_SEGMENT' && groundEval.bufferOverflowRisk === 'CRITICAL' ? 'bad' : pick('data'),
        value: `${mission.targetScienceMb} MB goal`,
        tip: 'The data your instrument must send home to win.',
      },
      {
        key: 'comms',
        label: 'Radio',
        status: ground.activeStationIds.length === 0 ? 'bad' : pick('comms'),
        value: `${band.id.replace('_BAND', '-band')}`,
        tip: 'Faster radio bands download more science per pass.',
      },
      {
        key: 'budget',
        label: 'Money',
        status: totalCostM > mission.budgetCapM ? 'bad' : 'good',
        value: `$${totalCostM}M of $${mission.budgetCapM}M`,
        tip: 'Total cost must stay under the mission budget.',
      },
      {
        key: 'time',
        label: 'Build time',
        status: totalMonths > mission.scheduleLimitMonths ? 'bad' : 'good',
        value: `${totalMonths} of ${mission.scheduleLimitMonths} mo`,
        tip: 'Everything must be built before the launch window closes.',
      },
    ];
  }

  const beginnerRow = (
    <div className="resource-row beginner" data-testid="resource-row">
      {chips.map((c) => (
        <button
          key={c.key}
          type="button"
          className={`res-chip ${c.status}`}
          title={`${c.tip} Click to learn more.`}
          onClick={() => setLearnKey(c.key)}
          data-testid={`res-chip-${c.key}`}
        >
          <span className="res-chip-dot" aria-hidden="true" />
          <span className="res-chip-label">{c.label}</span>
          <span className="res-chip-value tabular-nums">{c.value}</span>
          <span className="sr-only">{STATUS_WORD[c.status]}</span>
        </button>
      ))}
    </div>
  );

  // ---- Realistic: the full engineering readout ----
  let realisticRow: React.ReactNode = null;
  if (!isBeginner) {
    if (phase === 'HANGAR' && coupled) {
      const payloadLiftMargin = Math.round(coupled.payloadToLiftMarginKg);
      const dvMargin = Math.round(coupled.deltaVMarginMs);
      const cruiseMargin = Math.round(coupled.netCruiseW);
      const peakMargin = Math.round(coupled.netPeakW);
      const eclipseEndurance = coupled.eclipseEnduranceMin;
      const requiredEclipse = Math.round(coupled.requiredEclipseMin);
      const budgetMargin = Math.round(coupled.budgetMarginM);
      const scheduleMargin = Math.round(coupled.scheduleMarginMonths);
      const sign = (n: number) => (n >= 0 ? '+' : '');
      realisticRow = (
        <div className="resource-row realistic" data-testid="resource-row">
          <div className={`res-pill ${getStatusClass(payloadLiftMargin, { good: 500, warn: 200 })}`}>
            <span className="res-label">LIFT MARGIN</span>
            <span className="res-val tabular-nums">{sign(payloadLiftMargin)}{payloadLiftMargin} kg · TWR {coupled.padTwr.toFixed(2)}</span>
          </div>
          <div className={`res-pill ${getStatusClass(dvMargin, { good: 500, warn: 150 })}`}>
            <span className="res-label">Δv MARGIN</span>
            <span className="res-val tabular-nums">{sign(dvMargin)}{dvMargin} m/s</span>
          </div>
          <div className={`res-pill ${getStatusClass(cruiseMargin, { good: 50, warn: 0 })}`}>
            <span className="res-label">POWER</span>
            <span className="res-val tabular-nums">{sign(cruiseMargin)}{cruiseMargin} W cruise / {sign(peakMargin)}{peakMargin} W peak</span>
          </div>
          <div className={`res-pill ${getStatusClass(Number.isFinite(eclipseEndurance) ? eclipseEndurance - requiredEclipse : 999, { good: 10, warn: 0 })}`}>
            <span className="res-label">ECLIPSE</span>
            <span className="res-val tabular-nums">
              {Number.isFinite(eclipseEndurance) ? `${Math.round(eclipseEndurance)} min` : 'no drain'} / {requiredEclipse} min
            </span>
          </div>
          <div className={`res-pill ${coupled.thermalCritical ? 'bad' : coupled.thermalWarning ? 'warn' : 'good'}`}>
            <span className="res-label">HEATERS</span>
            <span className="res-val tabular-nums">{Math.round(coupled.sunlitSurvivalHeaterW)} W sun / {Math.round(coupled.shadowSurvivalHeaterW)} W shade</span>
          </div>
          <div className={`res-pill ${getStatusClass(budgetMargin, { good: 20, warn: 0 })}`}>
            <span className="res-label">BUDGET</span>
            <span className="res-val tabular-nums">${coupled.totalCampaignCostM}M / ${mission.budgetCapM}M</span>
          </div>
          <div className={`res-pill ${getStatusClass(scheduleMargin, { good: 3, warn: 0 })}`}>
            <span className="res-label">SCHEDULE</span>
            <span className="res-val tabular-nums">{coupled.buildMonths} / {mission.scheduleLimitMonths} mo</span>
          </div>
        </div>
      );
    } else {
      const val = (s: string) => <span className="res-val tabular-nums">{s}</span>;
      realisticRow = (
        <div className="resource-row realistic" data-testid="resource-row">
          <div className="res-pill"><span className="res-label">MASS</span>{val(inFlight && flight ? `${Math.round(flight.deltaVRemainingMs)} m/s Δv` : `${craftVal.mass.spacecraftDryKg} kg · ${Math.round(craftVal.mass.totalDeltaVMs)} m/s`)}</div>
          <div className="res-pill"><span className="res-label">POWER</span>{val(inFlight && flight ? `${Math.round(flight.currentPowerGenW - flight.currentPowerDrawW)} W · ${Math.round(flight.batteryWh)} Wh` : `${Math.round(craftVal.power.sunlitGenerationW)}/${craftVal.power.totalDrawW} W · ${craftVal.power.batteryWh} Wh`)}</div>
          <div className={`res-pill ${totalCostM > mission.budgetCapM ? 'bad' : ''}`}><span className="res-label">BUDGET</span>{val(`$${totalCostM}M / $${mission.budgetCapM}M`)}</div>
          <div className="res-pill"><span className="res-label">DATA</span>{val(inFlight && flight ? `${Math.round(flight.deliveredDataMb)}/${mission.targetScienceMb} MB` : `${craftVal.data.payloadDataRateMbps}/${craftVal.data.cpuMaxMbps} Mbps`)}</div>
          <div className="res-pill"><span className="res-label">COMMS</span>{val(inFlight && flight ? `${flight.activeDsnStationIds.length} link · ${band.id.replace('_BAND', '')}` : `${groundEval.contactCoveragePct}% · ${band.id.replace('_BAND', '')}`)}</div>
          <div className={`res-pill ${totalMonths > mission.scheduleLimitMonths ? 'bad' : ''}`}><span className="res-label">TIME</span>{val(inFlight && flight ? `T+${Math.round(flight.elapsedFlightSec)} s` : `${totalMonths}/${mission.scheduleLimitMonths} mo`)}</div>
        </div>
      );
    }
  }

  return (
    <header className="top-resource-strip" data-testid="top-resource-strip">
      <div className="top-bar-row">
        <div className="top-mission-tag">
          <span className="mission-dot" />
          <span className="mission-title-text">{isBeginner ? MISSION_PLAIN[missionId].name : mission.title}</span>
        </div>

        <PhaseStepper phase={phase} />

        <div className="top-controls">
          <button
            type="button"
            className="sound-toggle"
            onClick={startTour}
            aria-label="Replay Kap's tutorial"
            title="Replay tutorial"
            data-testid="replay-tour-btn"
          >
            <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true">
              <circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" strokeWidth="1.8" />
              <path d="M9.5 9.5a2.5 2.5 0 114 2c-.9.6-1.5 1.1-1.5 2.2" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
              <circle cx="12" cy="17" r="1.1" fill="currentColor" />
            </svg>
          </button>
          <SoundToggle />
          <div className="mode-toggle-group" role="group" aria-label="Difficulty">
            <button
              type="button"
              data-testid="hud-mode-beginner"
              className={`mode-btn ${isBeginner ? 'active' : ''}`}
              onClick={() => setDifficulty('BEGINNER')}
            >
              Beginner
            </button>
            <button
              type="button"
              data-testid="hud-mode-realistic"
              className={`mode-btn ${!isBeginner ? 'active' : ''}`}
              onClick={() => setDifficulty('REALISTIC')}
            >
              Realistic
            </button>
          </div>
        </div>
      </div>
      {phase !== 'DEBRIEF' && phase !== 'OBJECTIVE_SELECT' && (isBeginner ? beginnerRow : realisticRow)}
      {learnKey && chips.find((c) => c.key === learnKey) && (
        <LearnModal chip={chips.find((c) => c.key === learnKey)!} onClose={closeLearn} />
      )}
    </header>
  );
};
