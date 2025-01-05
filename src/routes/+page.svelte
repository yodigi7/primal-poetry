<script>
	/** @import { GameState } from '$lib/gameState' */
	import { base } from '$app/paths';
	import { onMount } from 'svelte';
	import settingSvg from '../images/setting-5-svgrepo-com.svg';
	import { clearGameState, getGameState } from '$lib/gameState';
	import { goto } from '$app/navigation';
	/** @type {GameState | null}*/
	let gameState;
	onMount(() => {
		gameState = getGameState();
	});
	function newGame() {
		clearGameState();
		goto(`${base}/game`);
	}
</script>

<div class="my-auto flex flex-wrap justify-center gap-8 px-8 pb-20">
	<a href="https://www.youtube.com/watch?v=hpbqepbvoJ8" target="_blank"
		><strong>How to Play</strong></a
	>
	<!-- TODO: add in a settings page -->
	<a class="inline-flex items-center justify-center text-center" href="{base}/settings"
		><strong>Settings</strong><img
			src={settingSvg}
			alt="settings"
			class="ml-4 mr-[-0.5rem] h-8 w-8"
		/></a
	>
	{#if gameState}
		<a href="{base}/game"><strong>Continue Game</strong></a>
	{/if}
	<button on:click={newGame}><strong>New Game</strong></button>
</div>

<style>
	a,
	button {
		text-align: center;
		border: 2px solid darkslategray;
		border-radius: 0.25rem;
		padding: 1rem 2rem;
		flex: 1 1 auto;
	}

	a:hover {
		background-color: #f0f0f0e0;
	}
</style>
