<script>
	/** @import { Unsubscriber } from 'svelte/store' */
	import { settings, defaultSettings, settingsFromLocalStorage } from '../../stores/settingStore';
	import { onDestroy, onMount } from 'svelte';
	import { base } from '$app/paths';
	import { updateSettings } from '$lib/settings';

	/** @type {Unsubscriber | null} */
	let unsubscriber;

	function resetSettings() {
		settings.set(defaultSettings);
	}

	onMount(() => {
		settingsFromLocalStorage();
		unsubscriber = settings.subscribe((value) => {
            let isSuccessfullyUpdated = updateSettings(value);
            if (!isSuccessfullyUpdated) {
                console.log("Issue updating settings");
            }
		});
	});

	onDestroy(() => {
		unsubscriber && unsubscriber();
	});
</script>

<div class="my-auto flex flex-col gap-8 px-12">
	<div class="flex flex-wrap items-center justify-center gap-3">
		<label for="turnDuration">Turn Duration (seconds):</label>
		<input
			type="number"
			id="turnDuration"
			placeholder="Enter seconds"
			min="1"
			bind:value={$settings.turnDuration}
		/>
	</div>
	<button class="btn" on:click={resetSettings}>Reset</button>
	<a class="btn" href={base}>Home</a>
</div>

<style>
	input {
		background-color: transparent;
		border: 1px solid #666;
		padding: 8px;
	}
	input:focus {
		border-color: #aaa;
		outline: none;
	}
	.btn {
		text-align: center;
		border: 2px solid darkslategray;
		border-radius: 0.25rem;
		padding: 1rem 2rem;
	}
	.btn:hover {
		background-color: #f0f0f0;
	}
</style>
