<script>
    import { createEventDispatcher } from 'svelte';

    let youtube_link = '';
    let youtube_id = '';

    const dispatch = createEventDispatcher();
    
 /*   async function link_regulator() {
     youtube_id = youtube_link.replace("^.*(?:\\.be)/([^?&]*)\\?*.*", "$1");
     console.log('ecco id:' + youtube_id )
    }
 */

 function link_regulator() {
    const regex = /(?:\.be\/|\/(?:watch\?v=|embed\/|v\/|watch\?.+&v=))([^&?\/]+)/;
    const match = youtube_link.match(regex);
    if (match) {
        youtube_id = match[1];
    } else {
        youtube_id = 'Non è stato possibile estrarre l\'ID del video';
    }
    dispatch('youtubeId', { id: youtube_id }); // Invia l'ID del video come evento
}
    
</script>

<div>
    <h2>Inserisci il link del video youtube</h2>
<form on:submit={link_regulator}>
    <input type="text" bind:value={youtube_link}>
    <button type="submit">Ottieni report</button>
</form>
<h2>questo è il link del video: {youtube_link}</h2>
</div>