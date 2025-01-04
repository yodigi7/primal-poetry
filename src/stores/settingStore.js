import { writable } from 'svelte/store';

export const settings = writable({
	turnDuration: 90 // Timer in seconds
});
