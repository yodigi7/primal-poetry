import { writable } from 'svelte/store';

export const scores = writable({
	teamGlad: 0,
	teamMad: 0
});

export function loadGameState() {
	const gameStateString = sessionStorage.getItem('gameState');
	if (gameStateString) {
		const gameState = JSON.parse(gameStateString);
		let tempScoreGlad, tempScoreMad;
		({ scoreTeamGlad: tempScoreGlad, scoreTeamMad: tempScoreMad } = gameState);
		scores.set({ teamGlad: tempScoreGlad, teamMad: tempScoreMad });
		return true;
	}
	return false;
}

export function resetScores() {
	scores.set({ teamGlad: 0, teamMad: 0 });
}
