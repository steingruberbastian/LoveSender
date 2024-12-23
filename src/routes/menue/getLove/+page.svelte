<script>
    let pressesLeft = 5;
    let reloadMessage = "Do something good for your partner and wait until he reload the presses.";

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

<div class="container">
    <h1>Hello love, do you need some love from your loved one?</h1>

    {#if pressesLeft > 0}
        <p>Press the button below.</p>
        <button on:click={handleButtonClick}>Send Love</button>
        <div class="counter">Presses left: {pressesLeft}</div>
    {:else}
        <p>{reloadMessage}</p>
    {/if}
</div>

<style>
    .container {
        text-align: center;
        margin-top: 50px;
    }
    button {
        margin: 10px;
        padding: 10px 20px;
        font-size: 16px;
        cursor: pointer;
    }
    .counter {
        margin-top: 10px;
        font-size: 18px;
    }
</style>
