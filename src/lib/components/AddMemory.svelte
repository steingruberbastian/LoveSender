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
</script>
<a href="/menue/memories">Back</a>
<h1>Add Movie</h1>
<form method="POST" action="?/create">
    <div class="mb-3">
        <label for="" class="form-label">Name</label>
        <input type="text" name="title" class="form-control" value="Gib ein Titel ein" />
    </div>

    <div class="mb-3">
        <label for="" class="form-label">Year</label>
        <input type="text" name="location" class="form-control" value="Gib ein Ort ein" />
    </div>

    <div class="mb-3">
        <label for="" class="form-label">Length</label>
        <input type="text" name="year" class="form-control" value=2000 />
    </div>
    
    <button type="submit" class="btn btn-primary">Memory hinzufügen</button>
  </form>