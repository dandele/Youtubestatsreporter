<script>
    import { Button } from "$lib/components/ui/button";
    import * as Alert from "$lib/components/ui/alert";
    import * as Card from "$lib/components/ui/card";
    import { supabase } from "$lib/supabaseClient";
    import { validate } from 'email-validator';


    let email = '';
    let password = '';
    let registrationMessage = ''; // Aggiungi questa variabile per contenere il messaggio di registrazione
    let errorMessage = '';
    let email_login = '';
    let password_login = '';
    
    // Gestione sign-up
    async function signUpNewUser() {
    const { data, error } = await supabase.auth.signUp({
            email: email,
            password: password,
            options: {
            emailRedirectTo: '/dashboard',
            },
            })
        if(validate(email)) {
            registrationMessage = 'La tua registrazione è avvenuta con successo, ti abbiamo mandato una mail di conferma!';
            window.location.href = '/subscription_confirmed';
            console.log('registrazione avvenuta con successo per la mail: ' + email )
        } else {
            errorMessage = "Sembra ci sia un problema con la tua email. Prova ad inserirla di nuovo per piacere!"
            console.log("c'è stato un errore con la registrazione")
        }
      
    }

    async function signInWithEmail() {
        const { data, error } = await supabase.auth.signInWithPassword({
            email: email_login,
            password: password_login,
        })
        console.log(data);
        window.location.href = '/dashboard';
    }

    async function signInWithNotion() {
        const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'notion',
  })
        console.log(data);
        window.location.href = '/dashboard';
}


</script>

<section class="flex items-center w-full h-full">
    <Card.Root class="w-2/3 mx-auto self-center">
        <Card.Header>
          <Card.Title class="mx-auto">Iscriviti o accedi</Card.Title>
        </Card.Header>
        <Card.Content>
            <div class="flex flex-col">
                <div class="mt-10">
                    <h2 class="w-full pb-2">Iscriviti</h2>
                    <form on:submit={signUpNewUser} class="w-full flex flex-col justify-between">
                        <input class=" w-full h-10 border-solid border-2 border-primary mr-2 text-foreground pl-4 mt-4 border-primary" id="input_yt" type="email" bind:value={email} placeholder="Email" required >
                        <input class=" w-full mr-2 text-foreground pl-4 mt-4" id="input_yt" type="text" bind:value={password} placeholder="Password" required>
                        <Button type="submit" class="w-full bg-secondary text-secondary-foreground hover:underline hover:bg-secondary mt-4">Iscriviti</Button>
                    </form>
                    {#if registrationMessage}
                    <Alert.Root class="bg-secondary text-primary mt-12">
                        <Alert.Title>Tutto ok, manca solo un passo!</Alert.Title>
                        <Alert.Description>
                          La tua registrazione è avvenuta con successo, ti abbiamo mandato una mail di conferma!
                        </Alert.Description>
                      </Alert.Root>
                    {/if}
                    {#if errorMessage}
                    <Alert.Root class="bg-secondary text-foreground mt-12">
                        <Alert.Title>Ehm, non so come dirtelo...</Alert.Title>
                        <Alert.Description>
                          {errorMessage}
                        </Alert.Description>
                      </Alert.Root>
                    {/if}
                </div>
                <div class="mt-10">
                    <h2 class="w-full pb-2">Accedi!</h2>
                    <form on:submit={signInWithEmail} class="w-full flex flex-col justify-between">
                        <input class=" w-full mr-2 text-foreground pl-4 mt-4" id="input_yt" type="text" bind:value={email_login} placeholder="Email" required >
                        <input class=" w-full mr-2 text-foreground pl-4 mt-4" id="input_yt" type="text" bind:value={password_login} placeholder="Password" required>
                        <Button type="submit" class="w-full bg-secondary text-secondary-foreground hover:underline hover:bg-secondary mt-4">Accedi</Button>
                    </form>
                    {#if registrationMessage}
                        <Alert.Root class="bg-secondary text-primary mt-12">
                            <Alert.Title>Tutto ok, ora puoi accedere!</Alert.Title>
                        </Alert.Root>
                    {/if}
                </div>  
            </div>
        </Card.Content>
        <Card.Footer class="mx-auto flex flex-col gap-4">
            <p>oppure</p>
            <Button on:click={signInWithNotion}>Accedi con Notion</Button>
            <Button>Accedi con Google</Button>
        </Card.Footer>
    </Card.Root>

</section>