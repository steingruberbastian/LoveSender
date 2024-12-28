<script>
    import { enhance } from "$app/forms";

  let { memory } = $props();
</script>

<div class="memory-card">
  <div>
    <img class="img-fluid" src={memory.image} alt=""/>
  </div>
  <div class="details">
    <div class="title">
      <a href={"/menue/memories/" + memory._id} class="title-link" style="color: white;">{memory.title}</a>
    </div>
    <div>
      Ort: {memory.location}
    </div>
    <div>
      Jahr: {memory.year}
    </div>
  </div>

  {#if memory.memory}
  <form method="POST" action="?/removeFromMemories" use:enhance>
    <input name="id" type="hidden" value="{memory._id}">
    <button class="btn btn-success">Als ToDo markieren</button>
  </form>
  {:else}
  <form method="POST" action="?/addToMemories" use:enhance>
    <input name="id" type="hidden" value="{memory._id}">
    <button class="btn btn-danger">Als gemacht markieren</button>
  </form>
  {/if}
</div>

<style>
  .memory-card {
    border: 1px solid #555;
    height: 100%;
    background-color: #444;
    color: white;
  }
  .details {
    padding: 0.5em;
  }
  .title {
    font-weight: bold;
  }
</style>
