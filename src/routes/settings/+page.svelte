<script>
	/** @import { Unsubscriber } from 'svelte/store' */
	import { settings, defaultSettings, settingsFromLocalStorage } from '../../stores/settingStore';
	import { onDestroy, onMount } from 'svelte';
	import { base } from '$app/paths';
	import { updateSettings } from '$lib/settings';

	/** @type {Unsubscriber | undefined} */
	let unsubscriber;
	let saved = false;

	function resetSettings() {
		saved = false;
		settings.set(defaultSettings);
	}

	function changed() {
		saved = false;
	}

	onMount(() => {
		settingsFromLocalStorage();
		unsubscriber = settings.subscribe((value) => {
			const isSuccessfullyUpdated = updateSettings(value);
			if (!isSuccessfullyUpdated) {
				console.log('Issue updating settings');
				saved = false;
			} else {
				setTimeout(() => (saved = true), 200);
			}
		});
	});

	onDestroy(() => {
		if (unsubscriber) {
			unsubscriber();
		}
	});
</script>

<div class="my-auto flex flex-col items-center gap-8">
	<div class="flex flex-wrap items-center justify-center gap-3 text-center">
		<label for="turnDuration">Turn Duration (seconds):</label>
		<span class="flex gap-2">
			<input
				type="number"
				id="turnDuration"
				placeholder="seconds"
				min="1"
				step="5"
				class="flex-auto"
				on:input={changed}
				bind:value={$settings.turnDuration}
			/>
			{#if saved}
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" class="inline"
					><path
						d="M64 32C28.7 32 0 60.7 0 96L0 416c0 35.3 28.7 64 64 64l320 0c35.3 0 64-28.7 64-64l0-320c0-35.3-28.7-64-64-64L64 32zM337 209L209 337c-9.4 9.4-24.6 9.4-33.9 0l-64-64c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l47 47L303 175c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9z"
					/></svg
				>
			{:else}
				<svg
					class="inline"
					version="1.1"
					stroke="#000"
					fill="none"
					stroke-width="7"
					viewBox="0 0 48 48"
					xmlns="http://www.w3.org/2000/svg"
					><g stroke-linecap="round" stroke-linejoin="round"
						><path d="m3.5 3.5 41 41" /><path d="m44.5 3.5-41 41" /></g
					></svg
				>
			{/if}
		</span>
	</div>
	<button on:click={resetSettings}>Reset</button>
	<a class="btn" href={base}>Home</a>
</div>

<style>
	svg {
		width: 32px;
		height: 37px;
		fill: darkslategray;
		stroke: darkslategray;
	}
	input {
		background-color: transparent;
		border: 1px solid #666;
		padding: 8px;
	}
	input:focus {
		border-color: #aaa;
		outline: none;
	}
</style>
