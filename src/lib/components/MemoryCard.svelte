<script>
  export let memory;
</script>

<style>
  .title-link {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    display: block;
  }
</style>

<div class="card mb-4 shadow-sm">
  <div class="card-img-top">
    <!-- svelte-ignore a11y_img_redundant_alt -->
    <img class="img-fluid" src={memory.image} alt="Memory Image"/>
  </div>
  <div class="card-body">
    <h5 class="card-title">
      <a href={"/menue/memories/" + memory._id} class="title-link text-decoration-none text-dark">{memory.title}</a>
    </h5>
    <p class="card-text">
      <strong>Ort:</strong> {memory.location}
    </p>
    <p class="card-text">
      <strong>Jahr:</strong> {memory.year}
    </p>

    {#if memory.memory}
      <form method="POST" action="?/removeFromMemories" use:enhance>
        <input name="id" type="hidden" value="{memory._id}">
        <button class="btn btn-success w-100">Als To Do markieren</button>
      </form>
    {:else}
      <form method="POST" action="?/addToMemories" use:enhance>
        <input name="id" type="hidden" value="{memory._id}">
        <button class="btn btn-danger w-100">Als gemacht markieren</button>
      </form>
    {/if}
  </div>
</div>