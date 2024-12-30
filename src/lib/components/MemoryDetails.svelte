<script>
    let { data } = $props();
</script>

<div class="container mt-5">
    <a href="/menue/memories" class="btn btn-secondary mb-3">Zurück</a>
    <div class="card shadow-sm">
        <div class="card-body">
            <h1 class="card-title">{data.memory.title}</h1>
            <div class="d-flex align-items-start">
                <img class="img-fluid me-3" src={data.memory.image} alt="" style="max-width: 300px;" />
                <div>
                    <p><strong>Ort:</strong> {data.memory.location}</p>
                    <p><strong>Jahr:</strong> {data.memory.year}</p>
                    <p><strong>Kategorie:</strong> {data.category}</p>
                    <form method="POST" action="?/removeMemory">
                        <input name="id" type="hidden" value="{data.memory._id}">
                        <button class="btn btn-danger">Löschen</button>
                    </form>
                </div>
            </div>
        </div>
    </div>
</div>