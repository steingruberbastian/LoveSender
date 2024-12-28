<script>
    let { data } = $props();
</script>
<a href="/menue/memories">Zurück</a>
<h1>{data.memory.title}</h1>
<div>
    <div style="display: flex; align-items: flex-start;">
        <img class="img-fluid" src={data.memory.image} alt="" style="max-width: 300px; margin-right: 20px;" />
        <div>
            <p>Ort: {data.memory.location}</p>
            <p>Jahr: {data.memory.year}</p>
        </div>
    </div>
</div>