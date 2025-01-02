<script>
    let pressesLeft = 25;
    let isSending = false;
    let message = "";
    let reloadMessage = "Tu was guten für deinen Partner und warte, bis er die Credits wieder auflädt.";

    async function triggerSendEmail() {
        isSending = true;
        try {
            const response = await fetch("/api/send-email", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({}),
            });
            const result = await response.json();
            if (response.ok) {
                message = "Email erfolgreich versendet!";
            } else {
                message = "Konnte diese Email nicht versenden: " + result.message;
            }
        } catch (error) {
            message = "Ein Fehler ist aufgetreten: " + error.message;
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

<div class="container mt-5">
    <div class="row justify-content-center">
        <div class="col-md-8">
            <div class="card">
                <div class="card-body text-center">
                    <h1 class="card-title mb-4">Hallo love, brauchst du einen Text mit Liebe?</h1>

                    {#if pressesLeft > 0}
                        <p class="card-text">Drücke auf den Knopf unten!</p>
                        <button class="btn btn-primary mb-3" on:click={handleButtonClick} disabled={isSending}>
                            {#if isSending}
                                Sendet...
                            {:else}
                                Liebestext bekommen
                            {/if}
                        </button>
                        <div class="counter mb-3">Du hast noch {pressesLeft} übrig</div>
                    {:else}
                        <p class="card-text">{reloadMessage}</p>
                    {/if}

                    {#if message}
                        <div class="alert alert-info mt-3">{message}</div>
                    {/if}
                </div>
            </div>
        </div>
    </div>
</div>