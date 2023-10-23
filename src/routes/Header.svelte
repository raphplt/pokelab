<script>
	// @ts-nocheck

	import { page } from '$app/stores';
	import pokeball from '$lib/images/pokeball.png';
	import { onMount } from 'svelte';
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
			handleResize(); // Appeler une fois pour définir la valeur initiale
			return () => {
				window.removeEventListener('resize', handleResize);
			};
		}
	});
		function closeMenu() {
			if (
				typeof window !== 'undefined' &&
				window.innerWidth < 640
			)
		showMenu.set(false);
	}

</script>

<header
	class="flex justify-center sm:flex-row flex-col gap-20 sm:gap-0 z-10 bg-blue-800 text-white py-3 top-0 sm:justify-around sm:items-center w-[100vw] fixed"
>
	<div class="flex justify-between w-11/12 mx-auto sm:w-fit sm:mx-0">
		<a
			href="/"
			class="hover:underline hover:font-semibold underline-offset-2 flex items-center flex-col gap-1"
		>
			<a href="/" class="w-1/12 h-1/12 block cursor-pointer ml-6" on:click={closeMenu}>
				<img src={pokeball} alt="home" />
			</a>
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
			class="flex gap-20 text-xl sm:text-[16px] bg-blue-800 sm:gap-20 sm:flex-row flex-col h-[100vh] sm:h-fit w-[100wv] items-center sm:items-start"
		>
			<li aria-current={$page.url.pathname === '/' ? 'page' : undefined}>
				<a href="/" class="font-semibold" on:click={closeMenu}>Accueil</a>
			</li>
			<li aria-current={$page.url.pathname === '/about' ? 'page' : undefined}>
				<a href="/pokemon-stats" class="font-semibold" on:click={closeMenu}>Pokémon stats</a>
			</li>
			<li aria-current={$page.url.pathname.startsWith('/iv-calculator') ? 'page' : undefined}>
				<a href="/iv-calculator" class="font-semibold" on:click={closeMenu}>Iv calculator</a>
			</li>
		</div>
	{/if}
</header>