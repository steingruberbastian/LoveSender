<script>
    import MemoryCard from "$lib/components/MemoryCard.svelte";

    let { data, memoryChecked = false, filterYear } = $props();
    let memories = $derived.by(() => {
        if (filterYear) {
            let memoriesFiltered = data.memories;
            memoriesFiltered = memoriesFiltered.filter(
                (memory) => memory.year === filterYear,
            );
            if (memoryChecked) {
                memoriesFiltered = memoriesFiltered.filter(
                    (memory) => memory.memory,
                );
            }
            return memoriesFiltered;
        }
        if (memoryChecked) {
            let memoriesFiltered = data.memories;
            memoriesFiltered = memoriesFiltered.filter(
                (memory) => memory.memory,
            );
            return memoriesFiltered;
        } else {
            return data.memories;
        }
    });
</script>

<a href="/menue/memories/create" class="btn btn-primary mb-3">Neue Memory hinzufügen</a>

<div class="form-check mt-3">
    <input
        class="form-check-input"
        type="checkbox"
        id="filter1"
        bind:checked={memoryChecked}/>
    <label class="form-check-label" for="filter">
        Nur schon gemachte Memories anzeigen
    </label>
</div>
<div class="form-check mt-3">
    <div style="display: flex; align-items: center;">
        <input
            class="form-control"
            type="number"
            placeholder="Jahr"
            id="filter2"
            bind:value={filterYear}
            style="width: 80px; margin-right: 10px;"/>
        <label class="form-check-label" for="filter">
            Nach dem Jahr filtern
        </label>
    </div>
</div>

<div class="row mt-3">
    {#each memories as memory}
        <div class="col-sm-6 col-md-4 col-lg-3 mb-2 gx-2">
            <MemoryCard {memory}></MemoryCard>
        </div>
    {/each}
</div>
