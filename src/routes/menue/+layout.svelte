<script>
  import "../styles.css";
  let { children } = $props();
</script>

<nav class="navbar navbar-expand-lg bg-body-tertiary bg-dark" data-bs-theme="dark">
  <div class="container-fluid">
    <a class="navbar-brand" href="/menue">Love Sender</a>
    <button
      class="navbar-toggler"
      type="button"
      data-bs-toggle="collapse"
      data-bs-target="#navbarNav"
      aria-controls="navbarNav"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarNav">
      <ul class="navbar-nav">
        <li class="nav-item">
          <a class="nav-link active" aria-current="page" href="/menue/getLove">Get Love</a>
        </li>
        <li class="nav-item">
          <a class="nav-link active" aria-current="page" href="/menue/memories">Memories</a>
        </li>
        <li class="nav-item">
          <a class="nav-link active" aria-current="page" href="/menue/categories">Kategorien</a>
        </li>
        <li class="nav-item dropdown">
          <a class="nav-link dropdown-toggle" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false" style="color: white">
              Gegen Langeweile
          </a>
          <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
              <li><a class="dropdown-item" href="/menue/noMoreBoredVideos">Videos</a></li>
              <li><a class="dropdown-item" href="/menue/noMoreBoredPhotos">Fotos</a></li>
          </ul>
      </li>
      </ul>
    </div>
  </div>
</nav>

<div class="container mt-3">
  {@render children()}
</div>
