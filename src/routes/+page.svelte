<script>
  import "./styles.css";
  let pwd = "";
  let errorMessage = "";

  async function checkPassword() {
    const response = await fetch("/check-password", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ password: pwd }),
    });

    const result = await response.json();
    if (result.success) {
      window.location.href = "/menue";
    } else {
      errorMessage = "Falsches Passwort.";
    }
  }
</script>

<div class="d-flex justify-content-center align-items-center vh-100">
  <div class="card p-4 shadow" style="width: 300px;">
    <h1 class="text-center mb-4">Gib dein persönliches Passwort ein</h1>
    <form on:submit|preventDefault={checkPassword}>
      <div class="mb-3">
        <input type="password" id="pwd" bind:value={pwd} class="form-control" placeholder="Passwort" />
      </div>
      {#if errorMessage}
        <div class="text-danger mb-3">{errorMessage}</div>
      {/if}
      <button type="submit" class="btn btn-primary w-100">Anmelden</button>
    </form>
  </div>
</div>