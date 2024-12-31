<script>
	import { onDestroy, onMount } from 'svelte';
  import { goto } from '$app/navigation';
	import { base } from '$app/paths';
	/**
	 * @type {Array<[string, string]>}
	 */
	import fullWordList from '../../word-list.json';

	let wordList = fullWordList;
	// Randomize wordList to "shuffle deck"
	wordList.sort(() => Math.random() - 0.5);
	/**
	 * @type {string}
	 */
	let currentWord1;
	/**
	 * @type {string}
	 */
	let currentWord3;
	let turnDuration = 90; // Timer in seconds
	let timer = turnDuration;
	let scoreTeamHappy = 0; // Team Happy's score
	let scoreTeamMad = 0; // Team Mad's score
	let currentTeam = 1; // Track which team is playing (1 or 2)
	let otherTeam = 2;
	/**
	 * @type {number}
	 */
	let interval;

	/**
	 * Loads the game state from local storage
	 * @return {boolean} returns true if found game state, otherwise return false if starting fresh
	 */
	function loadGameState() {
		const gameStateString = localStorage.getItem('gameState');
		if (gameStateString) {
			const gameState = JSON.parse(gameStateString);
			({
				scoreTeamHappy,
				scoreTeamMad,
				timer,
				wordList,
				currentTeam,
				otherTeam,
				currentWord1,
				currentWord3
			} = gameState);
			return true;
		}
		return false;
	}

  /**
   * Save the current game state to local storage
   */
	function saveGameState() {
		const gameState = JSON.stringify({
			scoreTeamHappy,
			scoreTeamMad,
			timer,
			wordList,
			currentTeam,
			otherTeam,
			currentWord1,
			currentWord3
		});
		localStorage.setItem('gameState', gameState);
	}

	/**
	 * Start the game with a timer countdown
	 */
	function startRound() {
		interval = setInterval(() => {
			if (wordList.length <= 0) {
				clearInterval(interval);
				// Go to stop screen
			} else if (timer > 0) {
				timer--;
				saveGameState();
			} else {
				clearInterval(interval);
				// Go to stop screen
			}
		}, 1000);
	}

	/**
	 * Switch turns between teams
	 */
	function switchTurn() {
		if (currentTeam === 1) {
			currentTeam = 2;
			otherTeam = 1;
		} else {
			currentTeam = 1;
			otherTeam = 2;
		}
		// Reset the timer and start again
		timer = turnDuration;
		getNewWords();
		startRound();
	}

	/**
	 * Draw new words from the top of the deck, end game if no cards left
	 */
	function getNewWords() {
		let card = wordList.shift();
		if (card === undefined) {
			endGame();
		} else {
			currentWord1 = card[1];
			currentWord3 = card[3];
		}
	}

	/**
	 * Update score for the current team when the word is guessed correctly, will automatically draw
	 * new card if there is still time left on the timer
	 * @param {number} pointValue how many points to add to the current team's score
	 */
	function updateScore(pointValue) {
		if (currentTeam === 1) {
			scoreTeamHappy += pointValue; // Increment score for Team 1
		} else {
			scoreTeamMad += pointValue; // Increment score for Team 2
		}
		if (timer > 0) {
			getNewWords();
		}
	}

	let minus1 = () => updateScore(-1);
	let plus1 = () => updateScore(1);
	let plus3 = () => updateScore(3);

  /**
   * Remove saved game state from local storage.
   *
   * Go to end game screen.
   */
	function endGame() {
		localStorage.removeItem('gameState');
    goto(`${base}/end?teamHappy=${scoreTeamHappy}&teamMad=${scoreTeamMad}`)
	}

	onMount(() => {
		if (!loadGameState()) {
			getNewWords();
		}
		startRound();
	});

  onDestroy(() => {
    clearInterval(interval);
  })
</script>

<div class="root">
	<div class="inline-flex space-x-8 py-4">
		<p class={currentTeam === 1 ? 'activeTeam' : ''}><strong>Team Happy:</strong> {scoreTeamHappy}</p>
		<p class={currentTeam === 2 ? 'activeTeam' : ''}><strong>Team Mad:</strong> {scoreTeamMad}</p>
	</div>

	<div class="flex flex-col space-y-1">
		<p>Time remaining: {timer}s</p>
		<p>1 point: <strong>{currentWord1}</strong></p>
		<p>3 point: <strong>{currentWord3}</strong></p>
	</div>

	<div class="py-8">
		<button class="minus1" on:click={minus1}>-1</button>
		<button class="plus1" on:click={plus1}>+1</button>
		<button class="plus3" on:click={plus3}>+3</button>
	</div>

	{#if wordList.length <= 0}
		OUT OF CARDS!
	{/if}

	{#if timer === 0}
		<p>Out of Time!</p>
		<p>Pass to Team {otherTeam}</p>
		<div>
			<button on:click={switchTurn}>Start Next Turn</button>
			<button on:click={endGame}>End Game</button>
		</div>
	{/if}
</div>

<style>
	.root {
		display: flex;
		flex-direction: column;
		align-items: center;
	}
	.minus1 {
		background-color: red;
	}
	.plus1 {
		background-color: lightgreen;
	}
	.plus3 {
		background-color: green;
	}
	button {
		border: 2px solid darkslategray;
		border-radius: 0.125rem;
		padding: 5px 30px;
	}
	.activeTeam {
		text-decoration: underline;
		text-underline-offset: 4px;
	}
</style>
