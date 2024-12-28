<script>
    let { data } = $props();

    function redirectToMenu() {
        // Prevent the default form action temporarily
        setTimeout(() => {
            window.location.href = "/menue/memories";
        }, 100); // Delay to ensure form submission is processed
    }
</script>
<a href="/menue/memories">Zurück</a>
<div>
    <h1>{data.memory.title}</h1>
    <div style="display: flex; align-items: flex-start;">
        <img class="img-fluid" src={data.memory.image} alt="" style="max-width: 300px; margin-right: 20px;" />
        <div>
            <p>Ort: {data.memory.location}</p>
            <p>Jahr: {data.memory.year}</p>
            <form method="POST" action="?/removeMemory" use:enhance onsubmit={redirectToMenu()}>
                <input name="id" type="hidden" value="{data.memory._id}">
                <button class="btn btn-danger">Löschen</button>
            </form>
        </div>
    </div>
</div>