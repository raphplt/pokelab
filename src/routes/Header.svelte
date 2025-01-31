<script>
	// @ts-nocheck

	import { page } from '$app/stores';
	import logo from '$lib/images/Pokelab_transparent.png';
	import { onMount, onDestroy } from 'svelte';
	import { writable } from 'svelte/store';
	import { slide } from 'svelte/transition';

	let showMenu = writable(false);

	function toggleMenu() {
		showMenu.update((value) => !value);
	}

	function handleResize() {
		if (typeof window !== 'undefined') {
			showMenu.set(!(window.innerWidth < 640));
		}
	}

	onMount(() => {
		if (typeof window !== 'undefined') {
			window.addEventListener('resize', handleResize);
			handleResize();
			return () => {
				window.removeEventListener('resize', handleResize);
			};
		}
	});

	function closeMenu() {
		if (typeof window !== 'undefined' && window.innerWidth < 640) showMenu.set(false);
	}

	let isTop = true;

	const handleScroll = () => {
		if (typeof window !== 'undefined') {
			isTop = window.scrollY === 0;
		}
	};

	onMount(() => {
		if (typeof window !== 'undefined') {
			window.addEventListener('scroll', handleScroll);
			handleScroll(); // Initial check
		}
	});

	onDestroy(() => {
		if (typeof window !== 'undefined') {
			window.removeEventListener('scroll', handleScroll);
		}
	});
</script>

<header
	class="flex justify-center sm:flex-row flex-col gap-8 sm:gap-0 py-3 top-0 sm:justify-between sm:items-center w-full fixed px-12 z-50"
	style={`background-color: ${isTop ? '' : 'rgba(255, 255, 255, 0.3)'};
		backdrop-filter: ${isTop ? '' : 'blur(8px)'};

	`}
>
	<div class="flex justify-between w-full sm:w-auto mx-auto sm:mx-0">
		<a href="/" class="flex items-center gap-2" on:click={closeMenu}>
			<img src={logo} alt="home" width="40" />
			<p class="font-semibold">Pokélab</p>
		</a>

		<button
			class="flex flex-col h-12 w-12 rounded justify-center items-center group sm:hidden"
			on:click={toggleMenu}
		>
			{#if $showMenu}
				<div
					class="h-1 w-6 my-1 rounded-full bg-black rotate-45 translate-y-3 opacity-50 group-hover:opacity-100"
				/>
				<div class="h-1 w-6 my-1 rounded-full bg-black opacity-0" />
				<div
					class="h-1 w-6 my-1 rounded-full bg-black -rotate-45 -translate-y-3 opacity-50 group-hover:opacity-100"
				/>
			{:else}
				<div class="h-1 w-6 my-1 rounded-full bg-black opacity-50 group-hover:opacity-100" />
				<div class="h-1 w-6 my-1 rounded-full bg-black opacity-50 group-hover:opacity-100" />
				<div class="h-1 w-6 my-1 rounded-full bg-black opacity-50 group-hover:opacity-100" />
			{/if}
		</button>
	</div>

	{#if $showMenu}
		<div
			in:slide={{ y: 0, duration: 300 }}
			out:slide={{ y: -100, duration: 300 }}
			class="flex flex-col gap-10 font-semibold text-md sm:text-sm sm:flex-row sm:gap-20 sm:items-start items-center fixed top-0 left-0 w-full h-full bg-white sm:bg-transparent sm:w-auto sm:h-auto sm:relative sm:z-auto z-50"
		>
			<li aria-current={$page.url.pathname === '/' ? 'page' : undefined}>
				<a href="/" on:click={closeMenu}>Accueil</a>
			</li>
			<li aria-current={$page.url.pathname === '/pokemon-stats' ? 'page' : undefined}>
				<a href="/pokemon-stats" on:click={closeMenu}>Statistiques</a>
			</li>
			<li aria-current={$page.url.pathname.startsWith('/iv-calculator') ? 'page' : undefined}>
				<a href="/iv-calculator" on:click={closeMenu}>Calculateur d'IV</a>
			</li>
		</div>
	{/if}
</header>
