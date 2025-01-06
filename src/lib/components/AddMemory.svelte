<script>
    export let data = [];

    function redirectToMenue() {
      setTimeout(() => {
        window.location.href = "/menue/memories";
      }, 100);
    }
  </script>
  
  <div class="container mt-5">
    <a href="/menue/memories" class="btn btn-secondary mb-3">Zurück</a>
    <div class="card shadow-sm">
      <div class="card-body">
        <h1 class="card-title text-center mb-4">Neue Memory erstellen</h1>
        <form method="POST" action="?/create" onsubmit={redirectToMenue()} enctype="multipart/form-data">
          <div class="mb-3">
            <label for="title" class="form-label">Name</label>
            <input type="text" name="title" class="form-control" placeholder="Gib ein Titel ein" required />
          </div>
          <div class="mb-3">
            <label for="location" class="form-label">Ort</label>
            <input type="text" name="location" class="form-control" placeholder="Gib ein Ort ein" required />
          </div>
          <div class="mb-3">
            <label for="year" class="form-label">Jahr</label>
            <input type="number" name="year" class="form-control" placeholder="Gib ein Jahr ein" required />
          </div>
          <div class="mb-3">
            <label for="category" class="form-label">Kategorie</label>
            <select name="category" class="form-select" required>
              <option value="" disabled selected hidden>Wähle eine Kategorie</option>
              {#each data.categories as category}
                <option value={category.id}>{category.category}</option>
              {/each}
            </select>
          </div>
          <div class="mb-3">
            <input type="checkbox" name="memory" class="form-check-input" id="memory"/>
            <label for="memory" class="form-label">Memory schon gemacht</label>
          </div>
          <div class="mb-3">
            <label for="image" class="form-label">Memory Cover</label>
            <input 
              type="file" 
              class="form-control" 
              id="image" 
              name="image" 
              accept="image/*"
            />
          </div>
          <button type="submit" class="btn btn-primary w-100">Memory hinzufügen</button>
        </form>
      </div>
    </div>
  </div>