<script>
    import MemoryDetails from "$lib/components/MemoryDetails.svelte";
    let { data } = $props();
</script>

<MemoryDetails data={data}></MemoryDetails>