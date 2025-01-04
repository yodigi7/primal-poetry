<script>
	import { onMount } from 'svelte';
	import { base } from '$app/paths';
	import { scores, loadGameState } from '../../stores/scoreStore';

	onMount(() => {
		loadGameState();
	});
</script>

<strong class="container">
	{#if $scores.teamGlad !== undefined && $scores.teamMad !== undefined}
		<div class="inline-flex space-x-8 pb-4">
			<p><strong>Team Glad:</strong> {$scores.teamGlad}</p>
			<p><strong>Team Mad:</strong> {$scores.teamMad}</p>
		</div>
		<div class="text-center text-6xl">
			{#if $scores.teamGlad > $scores.teamMad}
				Team Glad Wins!
			{:else if $scores.teamMad > $scores.teamGlad}
				Team Mad Wins!
			{:else}
				It's a tie...
			{/if}
		</div>
	{/if}
	<a class="home-link" href={base}>Home</a>
</strong>

<style>
	.container {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: space-around;
		height: 100%;
		width: 100%;
	}

	.home-link:hover {
		background-color: #f0f0f0;
	}

	.home-link {
		text-align: center;
		border: 2px solid darkslategray;
		border-radius: 0.25rem;
		padding: 1rem 2rem;
	}
</style>
