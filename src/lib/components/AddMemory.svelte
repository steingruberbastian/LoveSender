<script>
    function handleSubmit(event) {
        event.preventDefault();
        const formData = new FormData(event.target);
        const memory = {
            title: formData.get('title'),
            location: formData.get('location'),
            year: formData.get('year')
        };

        return memory;
    }

    function redirectToMenue() {
        setTimeout(() => {
            window.location.href = "/menue/memories";
        }, 100);
    }
</script>
<a href="/menue/memories">Back</a>
<h1>Neue Memory erstellen</h1>
<form method="POST" action="?/create" onsubmit={redirectToMenue()}>
    <div class="mb-3">
        <label for="" class="form-label">Name</label>
        <input type="text" name="title" class="form-control" placeholder="Gib ein Titel ein" required/>
    </div>

    <div class="mb-3">
        <label for="" class="form-label">Ort</label>
        <input type="text" name="location" class="form-control" placeholder="Gib ein Ort ein" required/>
    </div>

    <div class="mb-3">
        <label for="" class="form-label">Jahr</label>
        <input type="number" name="year" class="form-control" placeholder="Gib ein Jahr ein" required/>
    </div>

    <div class="mb-3">
        <label for="" class="form-label">Kategorie</label>
        <input type="text" name="category" class="form-control" placeholder="Gib eine Kategorie an" required/>
    </div>
    
    <button type="submit" class="btn btn-primary">Memory hinzufügen</button>
  </form>