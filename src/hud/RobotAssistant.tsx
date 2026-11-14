import React, { useEffect, useState } from 'react';
import {
  generateDebriefAnalysis,
  getRobotImage,
  type RobotHint,
} from '../core/robotAssistant';
import { useMissionStore } from '../store/useMissionStore';

/**
 * RobotAssistant Component
 * Displays AI failure analysis only during DEBRIEF phase for unsuccessful missions
 * Uses deterministic rule-based AI with no API tokens required
 */
export const RobotAssistant: React.FC = () => {
  const phase = useMissionStore((s) => s.phase);
  const difficulty = useMissionStore((s) => s.difficulty);
  const debrief = useMissionStore((s) => s.debrief);
  const flight = useMissionStore((s) => s.flight);

  const [hint, setHint] = useState<RobotHint | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);

  // Generate hints only for DEBRIEF phase when mission FAILED
  useEffect(() => {
    if (phase === 'DEBRIEF' && debrief && flight) {
      // Only show robot for FAILED missions
      if (debrief.outcome === 'FAILED') {
        const newHint = generateDebriefAnalysis(debrief, flight, difficulty);
        setHint(newHint);
        setIsVisible(true);
      } else {
        // Hide for successful missions
        setIsVisible(false);
      }
    } else {
      // Hide in all other phases (TITLE, OBJECTIVE_SELECT, HANGAR, GROUND_SEGMENT, FLIGHT)
      setIsVisible(false);
    }
  }, [phase, debrief, flight, difficulty]);

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
              <span className="robot-name">AI Failure Analysis</span>
              <span className="robot-phase-badge">MISSION DEBRIEF</span>
            </div>
            <div className="robot-message">{hint.message}</div>
            {hint.priority === 'critical' && (
              <div className="robot-priority-indicator">🚨 Critical Failure</div>
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
