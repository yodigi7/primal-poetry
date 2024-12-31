<script>
	// Import the $page store
	import { page } from '$app/state';
	import { base } from '$app/paths';

	/**
	 * @type {number | undefined}
	 */
    let scoreTeamHappy = $state(undefined);
	/**
	 * @type {number | undefined}
	 */
    let scoreTeamMad = $state(undefined);
    $effect.pre(() => {
        scoreTeamHappy = parseInt(page.url.searchParams.get('teamHappy') ?? "0");
        scoreTeamMad = parseInt(page.url.searchParams.get('teamMad') ?? "0");
    });
</script>

<strong class="container">
    {#if scoreTeamHappy !== undefined && scoreTeamMad !== undefined}
        <div class="text-center result">
        {#if scoreTeamHappy > scoreTeamMad}
            Team Happy Wins!
        {:else if scoreTeamMad > scoreTeamHappy}
            Team Mad Wins!
        {:else}
            It's a tie...
        {/if}
        </div>
    {/if}
    <a class="home-link" href="{base}">Home</a>
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
        border: 2px solid black;
        padding: 1rem 2rem;
        text-decoration: none;
        color: black;
    }
</style>
