<script>
	import Header from './Header.svelte';
	import '../app.css';
	import logo from '$lib/images/Pokelab.png';
	import Analytics from '$lib/analytics/+page.svelte';
	import Icon from '@iconify/svelte';
	import kofi from '$lib/images/kofi.webp';
</script>

<div class="app">
	<Header />

	<Analytics />

	<main>
		<slot />
	</main>

	<footer class="bg-gray-800 text-white py-6 pb-8 bottom-0 w-full">
		<div class="container mx-auto">
			<div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5 mx-auto w-11/12">
				<div class="px-4 mt-2 flex flex-col gap-5 items-start justify-start">
					<h2 class="text-lg">Pokelab</h2>
					<img src={logo} alt="home" class="block cursor-pointer" width="48" />

					<button class="" on:click={() => (window.location.href = 'https://ko-fi.com/raphplt')}>
						<img src={kofi} alt="kofi" class="w-48 block cursor-pointer mx-auto" />
					</button>
				</div>

				<div class="px-4">
					<h2 class="text-lg mb-2">Pages</h2>
					<ul class="list-disc pl-2 flex flex-col gap-1 text-gray-300">
						<li class="transform hover:translate-x-2 transition-transform duration-300">
							<a href="/">Accueil</a>
						</li>
						<li class="transform hover:translate-x-2 transition-transform duration-300">
							<a href="/pokemon-stats">Pokémon stats</a>
						</li>
						<li class="transform hover:translate-x-2 transition-transform duration-300">
							<a href="/iv-calculator">Iv calculator</a>
						</li>
					</ul>
				</div>
				<div class="px-4">
					<h2 class="text-lg font-semibold mb-2">Ressources</h2>
					<ul class="list-disc pl-2 flex flex-col gap-1 text-gray-300">
						<li class="transform hover:translate-x-2 transition-transform duration-300">
							<a href="/sitemap">Plan du site</a>
						</li>
						<li class="transform hover:translate-x-2 transition-transform duration-300">
							<a href="/mentions-legales">Mentions légales</a>
						</li>
						<li class="transform hover:translate-x-2 transition-transform duration-300">
							<a href="/cookies">Cookies</a>
						</li>
					</ul>
					<ul class="list-disc pl-3" />
				</div>
				<div class="px-4 flex flex-col gap-1">
					<h2 class="text-lg mb-2">Contact</h2>
					<ul class="list-disc sm:pl-2 flex flex-col gap-1 text-gray-300 mx-auto justify-center">
						<li class="transform hover:translate-x-2 transition-transform duration-300 ml-1">
							<div class="flex justify-center items-center gap-2">
								<Icon icon="mdi:email" width={20} />
								<p>raphael.plassart@gmail.com</p>
							</div>
						</li>
						<li class="transform hover:translate-x-2 transition-transform duration-300">
							<a
								href="https://github.com/raphplt"
								target="_blank"
								class="flex gap-2 sm:ml-1 items-center"
							>
								<Icon icon="akar-icons:github-fill" width={20} />
								<p>raphplt</p>
							</a>
						</li>
					</ul>
				</div>
			</div>

			<div class="flex justify-center mt-20 font-semibold">
				Created by Raphaël © {new Date().getFullYear()} - Pokémon and Pokémon character names are trademarks
				of Nintendo.
			</div>
		</div>
	</footer>
</div>
