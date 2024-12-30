<script>
    export let category;
</script>
  
<style>
    .title-link {
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      display: block;
    }
</style>
  
<div class="card mb-3 shadow-sm">
    <a href={"/menue/categories/" + category._id} class="text-decoration-none">
      <div class="card-img-top">
        <!-- svelte-ignore a11y_img_redundant_alt -->
        <img class="img-fluid" src={category.image} alt="category Image"/>
      </div>
      <div class="card-body">
        <h5 class="card-title">
          <span class="title-link text-dark">{category.category}</span>
      </div>
    </a>
</div>