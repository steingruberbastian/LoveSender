<script context="module">
    export async function load({ fetch }) {
      const response = await fetch('/api/categories');
      const categories = await response.json();
      return { categories };
    }
  </script>
  
  <script>
    import CategoryCard from "$lib/components/CategoryCard.svelte";
    export let data;
  </script>
  
  <div class="container mt-5">
    <h3 class="text-center mb-4">Alle Kategorien</h3>
    <div class="row justify-content-center">
      {#each data.categories as category}
        <div class="col-sm-6 col-md-4 col-lg-3 mb-4">
          <CategoryCard {category}></CategoryCard>
        </div>
      {/each}
    </div>
  </div>