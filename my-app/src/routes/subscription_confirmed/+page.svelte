<script>
    import { Button } from '$lib/components/ui/button';
    import * as Card from "$lib/components/ui/card";


    function gmailSniper() {
		window.location.href = "https://mail.google.com/mail/u/0/#search/subject:(Conferma la tua iscrizione a Ytanalytics!)";
	}
</script>

<section class="mx-auto my-auto">
    <Card.Root>
        <Card.Header>
          <Card.Title class="text-center">Grande, ce l'hai fatta!</Card.Title>
          <Card.Description></Card.Description>
        </Card.Header>
        <Card.Content class="text-center">
          <p>Dovresti aver ricevuto una mail di conferma, clicca sul link che trovi al suo interno così potrai proseguire.</p>
          <Button class="mt-8" on:click={gmailSniper}>
            Cicca qui se usi Gmail
        </Button>
        </Card.Content>
        <Card.Footer>
        </Card.Footer>
      </Card.Root>
</section>