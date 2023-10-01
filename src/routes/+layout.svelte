<script>
	import Header from './Header.svelte';
	import '../app.css';
</script>

<div class="app">
	<Header />

	<main>
		<slot />
	</main>

	<footer class="bg-blue-200 py-4">
		<div class="container mx-auto">
			<div class="flex justify-between items-center">
				<p>
					© {new Date().getFullYear()} - PokéLab
				</p>
				<ul class="flex space-x-4">
					<li><a href="/" class="text-blue-500 hover:underline">Accueil</a></li>
					<li><a href="/iv-calculator" class="text-blue-500 hover:underline">IV Calculator</a></li>
					<li><a href="/pokemon-stats" class="text-blue-500 hover:underline">Pokemon Stats</a></li>
					<li>
						<a href="/mentions-legales" class="text-blue-500 hover:underline">Mentions légales</a>
					</li>
				</ul>
			</div>
		</div>
	</footer>
</div>
