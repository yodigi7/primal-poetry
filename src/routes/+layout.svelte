<script lang="ts">
	import { base } from '$app/paths';
	import '../app.css';
	let { children } = $props();
</script>

<header>
	<h1><a href={base}><strong>Primal Poetry</strong></a></h1>
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
		background-color: #ffd1a2;
	}

	div {
		width: 100%;
		height: 100%;
		display: flex;
		justify-content: center;
	}

	h1 {
		padding: 1.5rem;
		text-align: center;
		font-size: 1.5rem;
	}
</style>
