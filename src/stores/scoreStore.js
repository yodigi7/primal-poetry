import { writable } from 'svelte/store';

const defaultScores = {
	teamGlad: 0,
	teamMad: 0
};
export const scores = writable(defaultScores);

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
	scores.set(defaultScores);
}
