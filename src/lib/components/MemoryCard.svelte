<script>
  export let memory;
  import "../../routes/styles.css";
</script>

<div class="card mb-4 shadow-sm">
  <a href={"/menue/memories/" + memory._id} class="text-decoration-none">
    <div class="card-img-top">
      <!-- svelte-ignore a11y_img_redundant_alt -->
      <img class="img-fluid fixed-height" src={memory.image} alt="Memory Image"/>
    </div>
    <div class="card-body">
      <h5 class="card-title">
        <span class="title-link text-dark">{memory.title}</span>
      </h5>
      <p class="card-text text-dark">
        <strong>Ort:</strong> {memory.location}
      </p>
      <p class="card-text text-dark">
        <strong>Jahr:</strong> {memory.year}
      </p>
    </div>
  </a>

  {#if memory.memory}
    <form method="POST" action="?/removeFromMemories" use:enhance>
      <input name="id" type="hidden" value="{memory._id}">
      <button class="btn btn-info w-100">Gemacht</button>
    </form>
  {:else}
    <form method="POST" action="?/addToMemories" use:enhance>
      <input name="id" type="hidden" value="{memory._id}">
      <button class="btn btn-warning w-100">nocht nicht gemacht</button>
    </form>
  {/if}
</div>