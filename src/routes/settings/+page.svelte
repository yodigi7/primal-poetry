<script>
	/** @import { Unsubscriber } from 'svelte/store' */
	import { settings, defaultSettings, settingsFromLocalStorage } from '../../stores/settingStore';
	import { onDestroy, onMount } from 'svelte';
	import { base } from '$app/paths';
	import { updateSettings } from '$lib/settings';

	/** @type {Unsubscriber | null} */
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
			let isSuccessfullyUpdated = updateSettings(value);
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

<div class="my-auto flex flex-col gap-8 px-12">
	<div class="flex flex-wrap items-center justify-center gap-3">
		<label for="turnDuration">Turn Duration (seconds):</label>
		<input
			type="number"
			id="turnDuration"
			placeholder="Enter seconds"
			min="1"
			on:input={changed}
			bind:value={$settings.turnDuration}
		/>
		{#if saved}
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"
				><path
					d="M64 32C28.7 32 0 60.7 0 96L0 416c0 35.3 28.7 64 64 64l320 0c35.3 0 64-28.7 64-64l0-320c0-35.3-28.7-64-64-64L64 32zM337 209L209 337c-9.4 9.4-24.6 9.4-33.9 0l-64-64c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l47 47L303 175c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9z"
				/></svg
			>
		{:else}
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"
				><path
					d="M376.6 84.5c11.3-13.6 9.5-33.8-4.1-45.1s-33.8-9.5-45.1 4.1L192 206 56.6 43.5C45.3 29.9 25.1 28.1 11.5 39.4S-3.9 70.9 7.4 84.5L150.3 256 7.4 427.5c-11.3 13.6-9.5 33.8 4.1 45.1s33.8 9.5 45.1-4.1L192 306 327.4 468.5c11.3 13.6 31.5 15.4 45.1 4.1s15.4-31.5 4.1-45.1L233.7 256 376.6 84.5z"
				/></svg
			>
		{/if}
	</div>
	<button class="btn" on:click={resetSettings}>Reset</button>
	<a class="btn" href={base}>Home</a>
</div>

<style>
	svg {
		width: 32px;
		height: 37px;
		fill: darkslategray;
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
