<script>
	import { base } from '$app/paths';
	import settingSvg from '../images/setting-5-svgrepo-com.svg';
</script>

<div class="mt-auto flex max-h-96 flex-col justify-between space-y-12 pb-20">
	<a class="text-center" href="{base}/game"><strong>Start Game</strong></a>
	<a class="text-center" href="https://www.youtube.com/watch?v=hpbqepbvoJ8" target="_blank"
		><strong>How to Play</strong></a
	>
	<!-- TODO: add in a settings page -->
	<!-- <a class="invisible inline-flex items-center justify-center text-center" href="{base}/settings"
		><strong>Settings</strong><img
			src={settingSvg}
			alt="settings"
			class="ml-4 mr-[-12px] h-8 w-8"
		/></a
	> -->
</div>

<style>
	a {
		text-align: center;
		border: 2px solid darkslategray;
		border-radius: 0.25rem;
		padding: 1rem 2rem;
	}

	a:hover {
		background-color: #f0f0f0e0;
	}
</style>
