/**
 * @typedef {Object} GameState
 * @property {number} scoreTeamGlad - The score of the "Glad" team.
 * @property {number} scoreTeamMad - The score of the "Mad" team.
 * @property {number} timer - The timer for the current game round.
 * @property {number} currentTeam - The team currently playing the game.
 * @property {string} otherTeam - The opposing team.
 * @property {string} currentWord1 - The first current word in the game.
 * @property {string} currentWord3 - The third current word in the game.
 * @property {WordList} wordList - Current deck of words
 */

/**
 * @typedef {Object} WordListItem
 * @property {string} one - The word for the "1" property.
 * @property {string} three - The word for the "3" property.
 */

/**
 * @typedef {WordListItem[]} WordList
 * An array of word list items where each item contains a "1" and "3" string property.
 */

const key = 'gameState';

/**
 * @returns {GameState | null}
 */
export function getGameState() {
	const gameStateString = sessionStorage.getItem(key);
	if (gameStateString) {
		return JSON.parse(gameStateString);
	}
	return null;
}

export function clearGameState() {
	sessionStorage.removeItem(key);
}

/**
 * @param {GameState} gameState
 */
export function updateGameState(gameState) {
	sessionStorage.setItem(key, JSON.stringify(gameState));
}
