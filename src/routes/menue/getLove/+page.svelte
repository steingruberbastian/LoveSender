<script>
    let pressesLeft = 24;
    let reloadMessage = "Do something good for your partner and wait until he reloads the credits :)";

    async function triggerSendEmail() {
        isSending = true;
        message = "";
        try {
            const response = await fetch("$routes/api/send-email", {method: "POST"});
            const result = await response.json();
            if (result.success) {
                message = result.message;
            } else {
                message = "Failed to send email: " + result.message;
            }
        } catch (error) {
            message = "An error occurred: " + error.message;
        } finally {
            isSending = false;
        }
    }

    function handleButtonClick() {
        if (pressesLeft > 0) {
            pressesLeft--;
            triggerSendEmail();
        }
    }
</script>

<div class="container mt-5" style="width: 600px;">
    <div class="row justify-content-center">
        <div class="col-md-8">
            <div class="card">
                <div class="card-body text-center">
                    <h1 class="mb-4">Hallo love, brauchst du einen Text mit Liebe?</h1>

                    {#if pressesLeft > 0}
                        <p>Drücke den Knopf unten!</p>
                        <button class="btn btn-primary mb-3" on:click={handleButtonClick}>Liebestext bekommen</button>
                        <div class="counter mb-3">Du hast noch {pressesLeft} credits</div>
                    {:else}
                        <p>{reloadMessage}</p>
                    {/if}
                </div>
            </div>
        </div>
    </div>
</div>

<style>
    .container {
        text-align: center;
    }
</style>