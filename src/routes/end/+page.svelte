<script>
	import { onMount } from 'svelte';
	import { base } from '$app/paths';
	import { scores, loadGameState } from '../../stores/scoreStore';

	onMount(() => {
		loadGameState();
	});
</script>

<div class="flex h-full w-full flex-col items-center justify-around gap-4">
	{#if $scores.teamGlad !== undefined && $scores.teamMad !== undefined}
		<div class="inline-flex gap-8">
			<p><strong>Team Glad: {$scores.teamGlad}</strong></p>
			<p><strong>Team Mad: {$scores.teamMad}</strong></p>
		</div>
		<div class="text-center text-6xl leading-snug">
			{#if $scores.teamGlad > $scores.teamMad}
				Team Glad Wins!
			{:else if $scores.teamMad > $scores.teamGlad}
				Team Mad Wins!
			{:else}
				It's a tie...
			{/if}
		</div>
	{/if}
	<a class="btn" href={base}>Home</a>
</div>
