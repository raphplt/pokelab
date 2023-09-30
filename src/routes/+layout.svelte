<script>
	import Header from './Header.svelte';
	  import "../app.css";
</script>

<div class="app">
	<Header />

	<main>
		<slot />
	</main>

	<footer class="bg-blue-200">
		<p>visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to learn SvelteKit COUCOU</p>
	</footer>
</div>

