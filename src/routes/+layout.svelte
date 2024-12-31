<script lang="ts">
	import '../app.css';
	let { children } = $props();
</script>

<header>
	<h1><strong>Primal Poetry</strong></h1>
</header>

<div>
	{@render children()}
</div>

<style>
    :global(body) {
        height: 100vh;
        margin: 0;
        display: flex;
        flex-direction: column;
		background-color: #FFD1A2;
    }

	div {
		width: 100%;
		height: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	h1 {
		padding: 1.5rem;
		text-align: center;
		font-size: 1.5rem;
	}
</style>
