import { describe, expect, it } from 'vitest';
import { useMissionStore } from '../../store/useMissionStore';

describe('tutorial and instructions flow', () => {
  it('opens tutorial before entering hangar and transitions to hangar on acknowledgment', () => {
    const store = useMissionStore.getState();
    store.restartCampaign();

    expect(useMissionStore.getState().phase).toBe('OBJECTIVE_SELECT');
    expect(useMissionStore.getState().tutorialOpen).toBe(false);
    expect(useMissionStore.getState().tutorialAcknowledged).toBe(false);

    // Player selects Mars landing
    useMissionStore.getState().selectTopObjective('MARS_LANDING');
    expect(useMissionStore.getState().missionId).toBe('MARS_LANDING');

    // Player clicks "ENTER VAB HANGAR"
    useMissionStore.getState().requestEnterHangar();

    // Tutorial popup should now be open before entering hangar
    expect(useMissionStore.getState().tutorialOpen).toBe(true);
    expect(useMissionStore.getState().phase).toBe('OBJECTIVE_SELECT');

    // Player acknowledges instructions
    useMissionStore.getState().acknowledgeTutorialAndEnterHangar();

    // Now player enters HANGAR
    expect(useMissionStore.getState().tutorialOpen).toBe(false);
    expect(useMissionStore.getState().tutorialAcknowledged).toBe(true);
    expect(useMissionStore.getState().phase).toBe('HANGAR');

    // Inside Hangar, player can re-open guide anytime
    useMissionStore.getState().openTutorial();
    expect(useMissionStore.getState().tutorialOpen).toBe(true);
    expect(useMissionStore.getState().phase).toBe('HANGAR');

    // Closing guide keeps player in HANGAR
    useMissionStore.getState().closeTutorial();
    expect(useMissionStore.getState().tutorialOpen).toBe(false);
    expect(useMissionStore.getState().phase).toBe('HANGAR');
  });

  it('provides instructions tailored for Moon landing', () => {
    const store = useMissionStore.getState();
    store.restartCampaign();

    store.selectTopObjective('MOON_LANDING');
    expect(useMissionStore.getState().missionId).toBe('MOON_LANDING');

    store.requestEnterHangar();
    expect(useMissionStore.getState().tutorialOpen).toBe(true);

    store.acknowledgeTutorialAndEnterHangar();
    expect(useMissionStore.getState().phase).toBe('HANGAR');
  });
});
