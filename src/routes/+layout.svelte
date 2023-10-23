<script>
	// @ts-nocheck

	import Header from './Header.svelte';
	import '../app.css';
	import pokeball from '$lib/images/pokeball.png';
	import Analytics from "$lib/analytics/+page.svelte";
</script>

<div class="app">
	<Header />

	<Analytics />

	<main>
		<slot />
	</main>

	<footer class="bg-blue-800 text-white py-6 pb-8 bottom-0 w-full">
		<div class="container mx-auto">
			<div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5 mx-auto w-11/12">
				<div class="px-4 mt-2 flex flex-col gap-1">
					<h2 class="text-lg font-semibold mb-2">Pokélab</h2>
					<img src={pokeball} alt="home" class="w-1/4 h-1/12 block cursor-pointer" />
				</div>
				<div class="px-4">
					<h2 class="text-lg font-semibold mb-2">Pages</h2>
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
					<h2 class="text-lg font-semibold mb-2">Contact</h2>
					<ul class="list-disc sm:pl-2 flex flex-col gap-1 text-gray-300 mx-auto justify-center">
						<li class="transform hover:translate-x-2 transition-transform duration-300 ml-1">
							<div class="flex justify-center items-center gap-5">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 24 24"
									strokeWidth={1.5}
									stroke="currentColor"
									class="w-6 h-6 sm:w-10 sm:h-10"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
									/>
								</svg>

								<p>raphael.plassart@gmail.com</p>
							</div>
						</li>
						<li class="transform hover:translate-x-2 transition-transform duration-300">
							<a
								href="https://github.com/raphplt"
								target="_blank"
								class="flex gap-5 sm:ml-1 items-center"
							>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									x="0px"
									y="0px"
									width="40"
									height="40"
									viewBox="0 0 30 30"
									style="fill:#FFFFFF;"
									class=""
								>
									<path
										d="M15,3C8.373,3,3,8.373,3,15c0,5.623,3.872,10.328,9.092,11.63C12.036,26.468,12,26.28,12,26.047v-2.051 c-0.487,0-1.303,0-1.508,0c-0.821,0-1.551-0.353-1.905-1.009c-0.393-0.729-0.461-1.844-1.435-2.526 c-0.289-0.227-0.069-0.486,0.264-0.451c0.615,0.174,1.125,0.596,1.605,1.222c0.478,0.627,0.703,0.769,1.596,0.769 c0.433,0,1.081-0.025,1.691-0.121c0.328-0.833,0.895-1.6,1.588-1.962c-3.996-0.411-5.903-2.399-5.903-5.098 c0-1.162,0.495-2.286,1.336-3.233C9.053,10.647,8.706,8.73,9.435,8c1.798,0,2.885,1.166,3.146,1.481C13.477,9.174,14.461,9,15.495,9 c1.036,0,2.024,0.174,2.922,0.483C18.675,9.17,19.763,8,21.565,8c0.732,0.731,0.381,2.656,0.102,3.594 c0.836,0.945,1.328,2.066,1.328,3.226c0,2.697-1.904,4.684-5.894,5.097C18.199,20.49,19,22.1,19,23.313v2.734 c0,0.104-0.023,0.179-0.035,0.268C23.641,24.676,27,20.236,27,15C27,8.373,21.627,3,15,3z"
									/>
								</svg>
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
