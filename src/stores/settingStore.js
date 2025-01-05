import { getSettings } from '$lib/settings';
import { writable } from 'svelte/store';

export const defaultSettings = {
	turnDuration: 90
};

export const settings = writable(defaultSettings);

/** Update current settings store to be the value in the local storage if there is one, otherwise no op */
export function settingsFromLocalStorage() {
	const storedSettings = getSettings();

	if (storedSettings) {
		settings.set(storedSettings);
	}
}
