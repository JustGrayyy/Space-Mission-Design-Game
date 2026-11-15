import React from 'react';

export type KapMood = 'HAPPY' | 'CONCERNED' | 'ALERT';

/** Kap's helmet face. Mood changes the eyes, mouth and status light. */
export const KapFace: React.FC<{ mood: KapMood; size?: number }> = ({ mood, size = 64 }) => {
  const ledColor = mood === 'HAPPY' ? '#4ade80' : mood === 'CONCERNED' ? '#fbbf24' : '#ff5a5a';
  const visorAccent = mood === 'HAPPY' ? '#ff9a4d' : mood === 'CONCERNED' ? '#fbbf24' : '#ff8a8a';
  return (
    <svg viewBox="0 0 72 72" width={size} height={size} className="kap-svg" aria-hidden="true">
      <circle cx="36" cy="36" r="31" fill="#131a2a" stroke={ledColor} strokeWidth="2.5" />
      <rect x="2" y="26" width="7" height="20" rx="3.5" fill="#1e293b" stroke="#64748b" strokeWidth="1.5" />
      <rect x="63" y="26" width="7" height="20" rx="3.5" fill="#1e293b" stroke="#64748b" strokeWidth="1.5" />
      <rect x="13" y="16" width="46" height="36" rx="16" fill="#070b14" stroke={visorAccent} strokeWidth="1.6" />
      <path d="M 19 22 Q 28 18 42 20" stroke="rgba(255,255,255,0.28)" strokeWidth="2.4" fill="none" strokeLinecap="round" />
      {mood === 'HAPPY' && (
        <>
          <path d="M 23 30 Q 27 27 31 30" stroke="#ffd2ad" strokeWidth="2" fill="none" strokeLinecap="round" />
          <path d="M 41 30 Q 45 27 49 30" stroke="#ffd2ad" strokeWidth="2" fill="none" strokeLinecap="round" />
          <circle cx="27" cy="34" r="2.7" fill="#fff4e6" />
          <circle cx="45" cy="34" r="2.7" fill="#fff4e6" />
          <path d="M 29 42 Q 36 47 43 42" stroke="#4ade80" strokeWidth="2.4" fill="none" strokeLinecap="round" />
        </>
      )}
      {mood === 'CONCERNED' && (
        <>
          <line x1="22" y1="30" x2="31" y2="28" stroke="#fcd34d" strokeWidth="2.2" strokeLinecap="round" />
          <line x1="41" y1="28" x2="50" y2="30" stroke="#fcd34d" strokeWidth="2.2" strokeLinecap="round" />
          <circle cx="27" cy="34" r="2.6" fill="#fef3c7" />
          <circle cx="45" cy="34" r="2.6" fill="#fef3c7" />
          <path d="M 30 44 Q 36 42 42 44" stroke="#fbbf24" strokeWidth="2.3" fill="none" strokeLinecap="round" />
        </>
      )}
      {mood === 'ALERT' && (
        <>
          <line x1="22" y1="28" x2="31" y2="32" stroke="#fca5a5" strokeWidth="2.4" strokeLinecap="round" />
          <line x1="41" y1="32" x2="50" y2="28" stroke="#fca5a5" strokeWidth="2.4" strokeLinecap="round" />
          <circle cx="27" cy="35" r="2.8" fill="#fee2e2" />
          <circle cx="45" cy="35" r="2.8" fill="#fee2e2" />
          <ellipse cx="36" cy="44" rx="4.5" ry="3.2" fill="none" stroke="#ff5a5a" strokeWidth="2.2" />
        </>
      )}
      <path d="M 65 42 Q 58 53 45 53" stroke="#94a3b8" strokeWidth="2" fill="none" strokeLinecap="round" />
      <circle cx="44" cy="53" r="2.4" fill={ledColor} />
      <circle cx="36" cy="8" r="2.5" fill={ledColor} />
    </svg>
  );
};
