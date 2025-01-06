/**
 * @typedef {Object} Settings
 * @property {number} turnDuration - The timer for the current game round.
 */

const key = 'settings';

/**
 * @returns {Settings | null}
 */
export function getSettings() {
	const settingsString = localStorage.getItem(key);
	if (settingsString) {
		return JSON.parse(settingsString);
	}
	return null;
}

/**
 * @param {Settings} settings
 * @returns {boolean} returns true if correctly updated, otherwise returns false
 */
export function updateSettings(settings) {
	if (settings && settings.turnDuration && settings.turnDuration > 0) {
		localStorage.setItem(key, JSON.stringify(settings));
		return true;
	}
	return false;
}
