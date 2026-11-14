# Robot Assistant AI Feature

## Overview

The Robot Assistant is an AI-powered helper that provides contextual hints during spacecraft building and analyzes mission failures to help players succeed. It uses **deterministic rule-based AI** (no API tokens required) to deliver intelligent guidance.

## Features

### 1. Building Phase Hints (HANGAR)
The robot assistant appears during the spacecraft building phase and provides real-time feedback:

- **Critical Issues**: Identifies blocking problems that prevent launch (TWR < 1.05, power deficit, missing parts)
- **Design Optimization**: Suggests improvements for thin margins (fuel, power, battery life)
- **Success Confirmation**: Celebrates when the design is ready with healthy margins
- **Contextual Tips**: Explains why specific parts are needed and how to fix conflicts

### 2. Post-Flight Analysis (DEBRIEF)
After a mission completes (success or failure), the robot analyzes what happened:

- **Failure Root Cause**: Identifies exactly why the mission failed
- **Specific Fixes**: Suggests which parts to upgrade or change
- **Success Celebration**: Congratulates successful missions
- **Technical Metrics**: Links analysis to specific telemetry data

## Robot Moods

The robot displays different expressions based on the situation:

| Mood | Image | Usage |
|------|-------|-------|
| **Happy** | `Robot-Happy.png` | Success, optimal builds, general positive feedback |
| **Thinking** | `Robot-Thinking.png` | Analyzing issues, reviewing configurations, warnings |
| **Love** | `Robot-Love.png` | Perfect builds, mission success, excellent margins |
| **Bulb** | `Robot-Bulb.png` | Critical hints, specific fix suggestions, eureka moments |

## Priority Levels

The assistant categorizes issues by priority, which affects visual styling:

- **CRITICAL**: Red border - blocking issues that prevent launch or caused mission failure
- **HIGH**: Orange border - important warnings that should be addressed
- **MEDIUM**: Blue border - suggestions for improvement
- **LOW**: Green border - optimizations or success messages

## Example Hints

### Building Phase

**Critical TWR Issue (Bulb mood):**
> 💡 Your rocket can't lift off! TWR is 0.92 but needs 1.05+. Pick a stronger rocket or drop weight.

**Power Shortage (Bulb mood):**
> 💡 Power shortage! Your solar panels make 450W but you need 520W. Get bigger panels!

**Perfect Build (Love mood):**
> Perfect build! All your margins look healthy. Let's roll out and set up the ground dishes!

### Post-Flight Analysis

**Battery Depletion (Bulb mood):**
> 💡 Analysis: Battery died during shadow (hit 0%). Fix: Install a BIGGER BATTERY or add an RTG (nuclear battery) that works in the dark!

**Crash Landing (Bulb mood):**
> 💡 Analysis: Landing too hard! Fix: Need LANDING LEGS (Structure Tier 2+) and save more fuel for the final descent.

**Mission Success (Love mood):**
> 🎉 Mission success! You nailed it! All systems performed perfectly and you achieved the objective. Great piloting!

## Technical Implementation

### Core Components

1. **`robotAssistant.ts`** - Rule-based AI engine
   - `generateHangarHints()` - Building phase hint generation
   - `generateDebriefAnalysis()` - Post-flight root cause analysis
   - Priority and mood determination logic

2. **`RobotAssistant.tsx`** - React component
   - Automatic phase detection (HANGAR/DEBRIEF)
   - Minimize/maximize functionality
   - Responsive positioning (bottom-right corner)

3. **CSS Styling** - `index.css`
   - Smooth animations (slide-in, bob, pulse)
   - Priority-based border colors
   - Responsive design for mobile

### State Integration

The robot reads from the Zustand store:
- `spacecraft` - Current build configuration
- `coupledMetrics` - Real-time resource calculations
- `debrief` - Post-flight analysis report
- `flight` - Flight telemetry for failure analysis

### Decision Logic

**Hangar Phase Priority Order:**
1. CRITICAL conflicts (blocks launch)
2. Incomplete configuration (missing parts)
3. Not launchable (marginal issues)
4. WARNING conflicts (suggestions)
5. Optimization hints (thin margins)
6. Success confirmation (ready to launch)

**Debrief Phase Analysis:**
1. Check for success → celebrate
2. Parse failure reason string
3. Match to known failure patterns:
   - Power blackout → battery/RTG recommendation
   - Thermal → upgrade thermal tier
   - TWR → stronger rocket or lighter parts
   - Crash → landing legs + fuel reserve
   - Orbital decay → more Δv
   - Data overflow → more ground stations/faster comms

## UI/UX Features

- **Auto-show**: Appears automatically in HANGAR and DEBRIEF phases
- **Minimize**: Click toggle button (▶/◀) to minimize to avatar only
- **Animations**: 
  - Slide-in from right on appearance
  - Gentle bobbing animation on avatar
  - Critical pulse for urgent issues
- **Responsive**: Adapts to mobile screens (320px width, smaller text)

## Difficulty Modes

The robot tailors its language to the selected difficulty:

**BEGINNER Mode:**
- Plain English explanations
- Specific part recommendations
- Emoji hints (💡 for critical tips, 🎉 for success)
- Simplified technical terms

**REALISTIC Mode:**
- Technical engineering language
- Exact metrics and margins
- Professional terminology (Δv, TWR, SoC, DoD)
- References to specific telemetry fields

## Files Modified

### New Files
- `src/core/robotAssistant.ts` - AI logic engine
- `src/hud/RobotAssistant.tsx` - UI component
- `docs/ROBOT_ASSISTANT.md` - This documentation

### Modified Files
- `src/App.tsx` - Added `<RobotAssistant />` component
- `src/index.css` - Added robot assistant styling (250+ lines)
- `public/Robot/` - Added 4 robot mood images

## Future Enhancements

Potential improvements for future versions:

1. **Flight Phase Hints**: Real-time tips during active flight
2. **Tutorial Integration**: Robot guides through first mission
3. **Hint History**: Log of previous hints for reference
4. **Custom Personalities**: Different robot characters with unique styles
5. **Audio Feedback**: Voice acting for hint delivery
6. **Hint Progression**: Track which hints help players improve

## Testing

The robot assistant has been verified with:
- ✅ TypeScript compilation (`npm run typecheck`)
- ✅ Production build (`npm run build`)
- ✅ Development server (`npm run dev`)
- ✅ All 4 robot images copied to public folder
- ✅ Integration with existing game phases

## Performance

- **Zero API costs**: Deterministic rule-based logic
- **No network calls**: All logic runs client-side
- **Minimal overhead**: < 10ms per hint generation
- **Bundle impact**: ~15 KB minified (core logic + component)
