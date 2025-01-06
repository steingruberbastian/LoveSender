<script context="module">
    export async function load({ fetch }) {
      const response = await fetch('/api/categories');
      const categories = await response.json();
      return { categories };
    }
</script>
  
<script>
    import AddMemory from "$lib/components/AddMemory.svelte";
    export let data;
</script>
  
<AddMemory {data} />