import React, { useEffect, useState } from 'react';
import { validateSpacecraft } from '../core/spacecraftValidator';
import {
  generateHangarHints,
  generateDebriefAnalysis,
  getRobotImage,
  type RobotHint,
} from '../core/robotAssistant';
import { useMissionStore } from '../store/useMissionStore';

/**
 * RobotAssistant Component
 * Displays contextual AI hints during HANGAR (building) and DEBRIEF (post-flight analysis)
 * Uses deterministic rule-based AI with no API tokens required
 */
export const RobotAssistant: React.FC = () => {
  const phase = useMissionStore((s) => s.phase);
  const difficulty = useMissionStore((s) => s.difficulty);
  const missionId = useMissionStore((s) => s.missionId);
  const spacecraft = useMissionStore((s) => s.spacecraft);
  const ground = useMissionStore((s) => s.ground);
  const coupledMetrics = useMissionStore((s) => s.coupledMetrics);
  const debrief = useMissionStore((s) => s.debrief);
  const flight = useMissionStore((s) => s.flight);

  const [hint, setHint] = useState<RobotHint | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);

  // Generate hints based on current phase
  useEffect(() => {
    if (phase === 'HANGAR') {
      // Generate hangar building hints
      const validation = validateSpacecraft(missionId, spacecraft, difficulty, ground);
      const newHint = generateHangarHints(
        validation,
        validation.conflicts,
        coupledMetrics,
        missionId,
        difficulty
      );
      setHint(newHint);
      setIsVisible(true);
    } else if (phase === 'DEBRIEF' && debrief && flight) {
      // Generate post-flight analysis
      const newHint = generateDebriefAnalysis(debrief, flight, difficulty);
      setHint(newHint);
      setIsVisible(true);
    } else {
      // Hide in other phases (TITLE, OBJECTIVE_SELECT, GROUND_SEGMENT, FLIGHT)
      setIsVisible(false);
    }
  }, [phase, spacecraft, ground, coupledMetrics, debrief, flight, missionId, difficulty]);

  if (!isVisible || !hint) return null;

  const priorityClass = `priority-${hint.priority}`;
  const robotImage = getRobotImage(hint.mood);

  return (
    <div
      className={`robot-assistant ${isMinimized ? 'minimized' : ''} ${priorityClass}`}
      data-testid="robot-assistant"
    >
      {/* Minimize/Maximize button */}
      <button
        className="robot-toggle-btn"
        onClick={() => setIsMinimized(!isMinimized)}
        aria-label={isMinimized ? 'Show robot assistant' : 'Hide robot assistant'}
        title={isMinimized ? 'Show assistant' : 'Hide assistant'}
      >
        {isMinimized ? '◀' : '▶'}
      </button>

      {!isMinimized && (
        <>
          {/* Robot avatar */}
          <div className="robot-avatar">
            <img
              src={robotImage}
              alt={`Robot ${hint.mood}`}
              className="robot-image"
            />
          </div>

          {/* Hint bubble */}
          <div className="robot-bubble">
            <div className="robot-bubble-header">
              <span className="robot-name">AI Assistant</span>
              {phase === 'HANGAR' && (
                <span className="robot-phase-badge">BUILD HINTS</span>
              )}
              {phase === 'DEBRIEF' && (
                <span className="robot-phase-badge">FLIGHT ANALYSIS</span>
              )}
            </div>
            <div className="robot-message">{hint.message}</div>
            {hint.priority === 'critical' && (
              <div className="robot-priority-indicator">🚨 Critical Issue</div>
            )}
          </div>
        </>
      )}

      {/* Minimized state shows just the avatar */}
      {isMinimized && (
        <div className="robot-avatar-mini">
          <img
            src={robotImage}
            alt={`Robot ${hint.mood}`}
            className="robot-image-mini"
          />
        </div>
      )}
    </div>
  );
};
