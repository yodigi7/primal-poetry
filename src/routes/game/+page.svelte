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
	let otherTeam = currentTeam === 1 ? "Mad" : "Happy";
	/**
	 * @type {number}
	 */
	let interval;

	/**
	 * Loads the game state from local storage
	 * @return {boolean} returns true if found game state, otherwise return false if starting fresh
	 */
	function loadGameState() {
		const gameStateString = sessionStorage.getItem('gameState');
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
		sessionStorage.setItem('gameState', gameState);
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
			otherTeam = "Happy";
		} else {
			currentTeam = 1;
			otherTeam = "Mad";
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
		sessionStorage.removeItem('gameState');
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
  <div>
    <div class="inline-flex space-x-8 pb-4">
      <p class={currentTeam === 1 ? 'activeTeam' : ''}><strong>Team Happy:</strong> {scoreTeamHappy}</p>
      <p class={currentTeam === 2 ? 'activeTeam' : ''}><strong>Team Mad:</strong> {scoreTeamMad}</p>
    </div>
    <p class="text-center">Time remaining: {timer}s</p>
  </div>

	<div class="flex flex-col space-y-1">
		<p>1 point: <strong class="text-2xl">{currentWord1}</strong></p>
		<p>3 point: <strong class="text-2xl">{currentWord3}</strong></p>
	</div>

	<div class="py-8">
		<button class="minus1" on:click={minus1}>-1</button>
		<button class="plus1" on:click={plus1}>+1</button>
		<button class="plus3" on:click={plus3}>+3</button>
	</div>

	{#if wordList.length <= 0}
  <strong>OUT OF CARDS!</strong>
	{/if}

	{#if timer === 0}
		<p class="text-xl"><strong>Out of Time!</strong></p>
		<p>Pass to Team {otherTeam}</p>
		<div class="py-4">
			<button class="mr-4" on:click={switchTurn}>Start Turn</button>
			<button class="ml-4" on:click={endGame}>End Game</button>
		</div>
	{/if}
</div>

<style>
	.root {
		display: flex;
		flex-direction: column;
		align-items: center;
    height: 100%;
    justify-content: space-around;
	}
	.minus1 {
		background-color: #E53935;
	}
	.plus1 {
		background-color: #A8E6A1;
	}
	.plus3 {
		background-color: #4CAF50;
	}
	button {
		border: 2px solid darkslategray;
		border-radius: 0.25rem;
		padding: 5px 30px;
	}
	.activeTeam {
		text-decoration: underline;
		text-underline-offset: 4px;
	}
</style>
