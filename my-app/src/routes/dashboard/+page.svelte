<script>
	let youtube_link = '';
	let youtube_id = '';
	let videos = []; // Array per memorizzare i video
	let userItems = []; // Array per memorizzare gli elementi dell'utente connesso

	import { Button } from '$lib/components/ui/button';
	import * as Table from '$lib/components/ui/table';
	import { Input } from '$lib/components/ui/input';

	import { supabase } from '$lib/supabaseClient';
	import { onMount } from 'svelte';

	// Dichiarazione della variabile export let youtubeStats = [];

	//async function fetchSupa() {
	//    try {
	//        let { data: youtube_stats, error } = await supabase
	//        .from('youtube_stats')
	//        .select('*')
	//        console.log(youtube_stats)
	//    } catch (error) {
	//        console.error('Errore durante la richiesta:', error);
	//    }
	//    }
	//
	//fetchSupa();

	export let youtubeStats = []; // Dichiarazione della variabile

	async function fetchSupa() { // Recupero video inseriti E filtrati per utente
        const { data: { user } } = await supabase.auth.getUser()
        if (user) { 
            const userId = user.id;
            try {
			const { data, error } = await supabase.from('youtube_stats').select('*').eq('created_by', userId);
			if (error) {
				console.error('Errore durante il recupero dei dati:', error.message);
			} else {
				youtubeStats = data;
				console.log('Dati recuperati con successo:', youtubeStats);
			}
		} catch (error) {
			console.error('Errore durante la richiesta:', error);
		} 
        }
		/*
        
        */
	}

	// Funzione per caricare gli elementi dell'utente corrente dal database
/*	async function loadUserItems() {
        const { data: { user } } = await supabase.auth.getUser()
		if (user) {
			// Ottenere l'ID dell'utente autenticato
			const userId = user.id;
            const userEmail = user.email;

			try {
				// Filtrare i dati del database in base all'ID dell'utente
				const { data, error } = await supabase
					.from('youtube_stats') // Sostituisci con il nome della tua tabella nel database
					.select('*')
					.eq('created_by', userId); // Assumi che ci sia un campo 'user_id' nel tuo schema che corrisponde all'ID dell'utente

				if (error) {
					console.error('Errore durante il recupero dei dati:', error.message);
				} else {
					userItems = data; // Memorizza gli elementi dell'utente corrente
                    console.log("ecco l'indirizzo email dell'utente loggato " + userEmail + "e questo è il suo id: " + userId)
				}
			} catch (error) {
				console.error('Errore durante la richiesta:', error);
			}
		}
	} */

			/* Esegui una query di test per verificare la connessione
const testQuery = async () => {
  try {
    let { data: youtube_stats, error } = await supabase
    .from('youtube_stats')
    .select('*')

    if (error) {
      console.error('Errore durante il recupero dei dati:', error.message);
    } else {
      console.log('Dati recuperati con successo:', youtube_stats);
    }
  } catch (error) {
    console.error('Errore durante la query:', error.message);
  }
};

Esegui la funzione di test
testQuery();

*/
	onMount(() => {
		const storedStats = localStorage.getItem('youtubeStats');
		if (storedStats) {
			youtubeStats = JSON.parse(storedStats);
		} else {
			fetchSupa();
		}
	});
    // loadUserItems();

	function link_regulator() {
		const regex = /(?:\.be\/|\/(?:watch\?v=|embed\/|v\/|watch\?.+&v=))([^&?\/]+)/;
		const match = youtube_link.match(regex);
		if (match) {
			youtube_id = match[1];
			// Aggiungi il nuovo video all'array

			async function fetchData() {
				try {
					const response = await fetch(
						`https://youtube.googleapis.com/youtube/v3/videos?part=id&part=snippet&part=statistics&id=${youtube_id}&key=AIzaSyDai-aOB7z7gZo9Os9CbfAkPkhInBhPzNE`
					);
					const data = await response.json();
					console.log('chiamata effettuata');
					const video_title = data.items[0].snippet.title;
					const video_views = data.items[0].statistics.viewCount;
					const video_likes = data.items[0].statistics.likeCount;
					const video_comments = data.items[0].statistics.commentCount;
					videos = [
						...videos,
						{
							id: youtube_id,
							title: video_title,
							views: video_views,
							likes: video_likes,
							comments: video_comments
						}
					];
					console.log(video_title);
					// Tentativo di insert dati su supabase
					const { input, error } = await supabase
						.from('youtube_stats')
						.insert([
							{
								video_id: youtube_id,
								title: video_title,
								views: video_views,
								likes: video_likes,
								comments: video_comments
							}
						])
						.select();
				} catch (error) {
					console.error('Errore durante la richiesta:', error);
				} finally {
					// Ricarica la pagina dopo aver eseguito la richiesta
					location.reload();
				}
			}
			fetchData();
			youtube_link = '';
		} else {
			youtube_id = "Non è stato possibile estrarre l'ID del video";
		}
	}

	// Aggiorna i dati all'avvio della pagina
	fetchSupa();
</script>

<svelte:head>
	<title>Dashboard</title>
	<meta name="description" content="Dashboard for this app" />
</svelte:head>

<section>
	<div class="flex flex-col">
		<h2 class="w-full pb-2">Inserisci il link del video youtube</h2>
		<form on:submit={link_regulator} class="flex w-full justify-between">
			<input
				class=" mr-2 w-full pl-4 text-primary"
				id="input_yt"
				type="text"
				bind:value={youtube_link}
			/>
			<Button
				type="submit"
				class="w-1/6 bg-secondary text-secondary-foreground hover:bg-secondary hover:underline"
				>Ottieni report</Button
			>
		</form>
	</div>
	<div class="mt-8">
		<Table.Root>
			<Table.Header>
				<Table.Row>
					<Table.Head class="text-bold w-[100px]">ID</Table.Head>
					<Table.Head class="text-bold">Titolo</Table.Head>
					<Table.Head class="text-bold">Views</Table.Head>
					<Table.Head class="text-bold">Likes</Table.Head>
					<Table.Head class="text-bold text-right">Comments</Table.Head>
				</Table.Row>
			</Table.Header>
			<Table.Body>
				{#each youtubeStats as stat}
					<Table.Row>
						<Table.Cell class="font-medium">{stat.id}</Table.Cell>
						<Table.Cell>{stat.title}</Table.Cell>
						<Table.Cell>{stat.views}</Table.Cell>
						<Table.Cell>{stat.likes}</Table.Cell>
						<Table.Cell class="text-right">{stat.comments}</Table.Cell>
					</Table.Row>
				{/each}
			</Table.Body>
		</Table.Root>
	</div>
</section>
