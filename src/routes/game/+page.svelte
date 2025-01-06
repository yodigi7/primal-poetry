<script>
	import { onDestroy, onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import { base } from '$app/paths';
	import fullWordList from '../../word-list.json';
	import { settings, settingsFromLocalStorage } from '../../stores/settingStore';
	import { scores } from '../../stores/scoreStore';
	import { clearGameState, getGameState, updateGameState } from '$lib/gameState';

	let wordList = fullWordList;
	// Randomize wordList to "shuffle deck"
	wordList.sort(() => Math.random() - 0.5);
	/** @type {string | undefined} */
	let currentWord1;
	/** @type {string | undefined} */
	let currentWord3;
	let timer = $settings.turnDuration;
	let currentTeam = 1; // Track which team is playing (1 or 2)
	let otherTeam = currentTeam === 1 ? 'Mad' : 'Glad';
	/** @type {number | undefined} */
	let interval;

	function resetDefaults() {
		wordList = fullWordList;
		// Randomize wordList to "shuffle deck"
		wordList.sort(() => Math.random() - 0.5);
		currentWord1 = undefined;
		currentWord3 = undefined;
		timer = $settings.turnDuration;
		currentTeam = 1; // Track which team is playing (1 or 2)
		otherTeam = currentTeam === 1 ? 'Mad' : 'Glad';
		interval = undefined;
	}

	/**
	 * Loads the game state from local storage
	 * @return {boolean} returns true if found game state, otherwise return false if starting fresh
	 */
	function loadGameState() {
		const gameState = getGameState();
		if (gameState) {
			let tempScoreGlad, tempScoreMad;
			({
				scoreTeamGlad: tempScoreGlad,
				scoreTeamMad: tempScoreMad,
				timer,
				wordList,
				currentTeam,
				otherTeam,
				currentWord1,
				currentWord3
			} = gameState);
			scores.set({ teamGlad: tempScoreGlad, teamMad: tempScoreMad });
			return true;
		}
		return false;
	}

	/**
	 * Save the current game state to local storage
	 */
	function saveGameState() {
		const tempScoreGlad = $scores.teamGlad;
		const tempScoreMad = $scores.teamMad;
		const gameState = {
			scoreTeamGlad: tempScoreGlad,
			scoreTeamMad: tempScoreMad,
			timer,
			wordList,
			currentTeam,
			otherTeam,
			currentWord1,
			currentWord3
		};
		updateGameState(gameState);
	}

	/**
	 * Start the game with a timer countdown
	 */
	function startRound() {
		interval = setInterval(() => {
			if (wordList.length <= 0) {
				clearInterval(interval);
				endGame();
			} else if (timer > 0) {
				timer--;
				saveGameState();
			} else {
				clearInterval(interval);
				navigator.vibrate(500);
			}
		}, 1000);
	}

	/**
	 * Switch turns between teams
	 */
	function switchTurn() {
		if (currentTeam === 1) {
			currentTeam = 2;
			otherTeam = 'Glad';
		} else {
			currentTeam = 1;
			otherTeam = 'Mad';
		}
		// Reset the timer and start again
		timer = $settings.turnDuration;
		getNewWords();
		startRound();
	}

	/**
	 * Draw new words from the top of the deck, end game if no cards left
	 */
	function getNewWords() {
		const card = wordList.shift();
		if (card === undefined) {
			endGame();
		} else {
			currentWord1 = card['one'];
			currentWord3 = card['three'];
		}
	}

	/**
	 * Update score for the current team when the word is guessed correctly, will automatically draw
	 * new card if there is still time left on the timer
	 * @param {number} pointValue how many points to add to the current team's score
	 */
	function updateScore(pointValue) {
		if (currentTeam === 1) {
			scores.update((currentScores) => ({
				...currentScores,
				teamGlad: currentScores.teamGlad + pointValue
			}));
		} else {
			scores.update((currentScores) => ({
				...currentScores,
				teamMad: currentScores.teamMad + pointValue
			}));
		}
		if (timer > 0) {
			getNewWords();
		}
	}

	const minus1 = () => updateScore(-1);
	const plus1 = () => updateScore(1);
	const plus3 = () => updateScore(3);

	/**
	 * Remove saved game state from local storage.
	 *
	 * Go to end game screen.
	 */
	function endGame() {
		clearGameState();
		goto(`${base}/end`);
	}

	onMount(() => {
		settingsFromLocalStorage();
		timer = $settings.turnDuration;
		if (!loadGameState()) {
			resetDefaults();
			getNewWords();
		}
		startRound();
	});

	onDestroy(() => {
		clearInterval(interval);
	});
</script>

<div class="flex min-h-full flex-col items-center justify-around sm:w-4/5">
	<div>
		<div class="inline-flex space-x-8 pb-4">
			<p class={currentTeam === 1 ? 'activeTeam' : ''}>
				<strong>Team Glad:</strong>
				{$scores.teamGlad}
			</p>
			<p class={currentTeam === 2 ? 'activeTeam' : ''}>
				<strong>Team Mad:</strong>
				{$scores.teamMad}
			</p>
		</div>

		<div class="py-4 text-center">
			{#if wordList.length <= 0}
				<strong>OUT OF CARDS!</strong>
			{:else if timer === 0}
				<p class="py-2 text-xl"><strong>Out of Time!</strong></p>
				<p>Pass to Team {otherTeam}</p>
			{:else}
				<p>Time remaining: {timer}s</p>
			{/if}
		</div>
	</div>

	<div class="flex w-full flex-col gap-2">
		<p class="wordP">
			1 point: <strong class="readable text-4xl sm:text-6xl">{currentWord1}</strong>
		</p>
		<p class="wordP">
			3 point: <strong class="readable text-4xl sm:text-6xl">{currentWord3}</strong>
		</p>
	</div>

	<div class="flex w-full flex-col gap-4 pt-4 sm:flex-row">
		<button class="minus1 sm:flex-1" on:click={minus1}>-1</button>
		<button class="plus1 sm:flex-1" on:click={plus1}>+1</button>
		<button class="plus3 sm:flex-1" on:click={plus3}>+3</button>
	</div>
	{#if timer === 0 || wordList.length <= 0}
		<div class="flex flex-col gap-4 pt-8 sm:flex-row">
			<button on:click={switchTurn}>Start Turn</button>
			<button on:click={endGame}>End Game</button>
		</div>
	{/if}
</div>

<style>
	.readable {
		font-family: 'Roboto', sans-serif;
	}
	.minus1 {
		background-color: #e53935;
	}
	.plus1 {
		background-color: #a8e6a1;
	}
	.plus3 {
		background-color: #4caf50;
	}
	.activeTeam {
		text-decoration: underline;
		text-underline-offset: 4px;
	}
	button {
		width: auto;
		max-width: none;
	}
	.wordP {
		display: flex;
		width: 100%;
		flex-direction: column;
		align-items: center;
	}
	@media only screen and (min-width: 768px) {
		.wordP {
			flex-direction: row;
			align-items: center;
			gap: 2rem;
			text-align: start;
			align-items: center;
		}
	}
</style>
