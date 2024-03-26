<script>
	import { page } from '$app/stores';
	import logo from '$lib/images/svelte-logo.svg';
	import github from '$lib/images/github.svg';
	import { supabase } from '$lib/supabaseClient';
	import { Button } from '$lib/components/ui/button';
	import { onMount } from 'svelte';

async function dashboardToggl() {	
	const { data: { user } } = await supabase.auth.getUser();
	const dashboardMenu = document.getElementById('dashboard_menu');
	const authMenu = document.getElementById('auth_menu');
 	const logOut = document.getElementById('logOut');
    if (dashboardMenu && authMenu && logOut) {    
	if (user) {
			dashboardMenu.style.visibility = 'visible';
			authMenu.style.visibility = 'collapse';
			logOut.style.visibility = 'collapse';
		} else {
			dashboardMenu.style.visibility = 'hidden';
        	authMenu.style.visibility = 'collapse';
			logOut.style.visibility = 'collapse';
		}
	}
	}

	async function signOut() {
			let { error } = await supabase.auth.signOut();
			if (error) {
			console.error('Errore durante il logout:', error.message);
			} else {
			console.log('Logout avvenuto con successo');
			window.location.href = '/auth';
								}
		}
	
	onMount(() => {
    dashboardToggl() });
	

</script>

<header>
	<div class="corner">
		<a href="https://kit.svelte.dev">
			<img src={logo} alt="SvelteKit" />
		</a>
	</div>

	<nav class="mx-auto">
		<svg viewBox="0 0 2 3" aria-hidden="true">
			<path d="M0,0 L1,2 C1.5,3 1.5,3 2,3 L2,0 Z" />
		</svg>
		<ul>
			<li aria-current={$page.url.pathname === '/' ? 'page' : undefined}>
				<a href="/">Home</a>
			</li>
			<li aria-current={$page.url.pathname === '/about' ? 'page' : undefined}>
				<a href="/about">About</a>
			</li>
			<li id="auth_menu" aria-current={$page.url.pathname.startsWith('/auth') ? 'page' : undefined} style="visibility: collapse;">
				<a href="/auth">Registrati</a>
			</li>
			<li id="dashboard_menu" aria-current={$page.url.pathname.startsWith('/dashboard') ? 'page' : undefined} style="visibility: collapse;">
				<a href="/dashboard">Dashboard</a>
			</li>
		</ul>
		<svg viewBox="0 0 2 3" aria-hidden="true">
			<path d="M0,0 L0,3 C0.5,3 0.5,3 1,2 L2,0 Z" />
		</svg>
	</nav>

	<div class="inline" id="logOut" hidden >
	<a class="corner p-8 h-full text-red-500 underline" href="/" on:click={signOut}>
		<span>Sign-out</span>
	</a>
</div>
	
</header>

<style>
	header {
		display: flex;
		justify-content: space-between;
	}

	.corner {
		width: 3em;
		height: 3em;
	}

	.corner a {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 100%;
		height: 100%;
	}

	.corner img {
		width: 2em;
		height: 2em;
		object-fit: contain;
	}

	nav {
		display: flex;
		justify-content: center;
		--background: rgba(255, 255, 255, 0.7);
	}

	svg {
		width: 2em;
		height: 3em;
		display: block;
	}

	path {
		fill: var(--background);
	}

	ul {
		position: relative;
		padding: 0;
		margin: 0;
		height: 3em;
		display: flex;
		justify-content: center;
		align-items: center;
		list-style: none;
		background: var(--background);
		background-size: contain;
	}

	li {
		position: relative;
		height: 100%;
	}

	li[aria-current='page']::before {
		--size: 6px;
		content: '';
		width: 0;
		height: 0;
		position: absolute;
		top: 0;
		left: calc(50% - var(--size));
		border: var(--size) solid transparent;
		border-top: var(--size) solid var(--color-theme-1);
	}

	nav a {
		display: flex;
		height: 100%;
		align-items: center;
		padding: 0 0.5rem;
		color: var(--color-text);
		font-weight: 700;
		font-size: 0.8rem;
		text-transform: uppercase;
		letter-spacing: 0.1em;
		text-decoration: none;
		transition: color 0.2s linear;
	}

	a:hover {
		color: var(--color-theme-1);
	}
</style>
