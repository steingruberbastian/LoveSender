<script>
    import MemoryCard from "$lib/components/MemoryCard.svelte";
    let { data } = $props();
</script>

<div class="container mt-3">
    <a href="/menue/categories" class="btn btn-secondary mb-3">Zurück</a>
    <div class="row">
        {#if data.memories.length === 0}
            <div class="col">
                <p class="text-center">Keine Erinnerungen vorhanden</p>
            </div>
        {/if}
        {#each data.memories as memory}
            <div class="col-sm-6 col-md-4 col-lg-3 mb-2 gx-2">
                <MemoryCard {memory}></MemoryCard>
            </div>
        {/each}
    </div>
</div>