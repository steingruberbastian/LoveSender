<script>
    import "../../styles.css";
    import { onMount } from "svelte";

    let imageUrls = [];

    async function fetchImages() {
        const response = await fetch("/api/images");
        const data = await response.json();
        imageUrls = shuffle(data);
    }

    function shuffle(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    onMount(async () => {
        await fetchImages();
    });

    function getImageClass(imageUrl) {
        const img = new Image();
        img.src = imageUrl;
        if (img.width > img.height) {
            return 'landscape';
        } else {
            return 'portrait';
        }
    }
</script>

<div class="container text-center my-5">
    <h1>Lass dich fallen, in die Welt der Geschichten</h1>
    <div id="carouselExample" class="carousel slide" data-bs-ride="carousel" data-bs-intervall="5000">
        <div class="carousel-inner">
            {#each imageUrls as imageUrl, index}
                <div class="carousel-item {index === 0 ? 'active' : ''}">
                    <img src={imageUrl} class="d-block w-100 {getImageClass(imageUrl)}" alt="...">
                </div>
            {/each}
        </div>
    </div>
</div>

<button class="btn w-100" on:click={() => document.getElementById('myAudio').play()}>
    Mit Musik
</button>
<button class="btn w-100 mt-2" on:click={() => document.getElementById('myAudio').pause()}>
    Musik stoppen
</button>

<audio id="myAudio" loop>
    <source src="/music/OtroAtardecer.mp3" type="audio/mpeg">
    Dein Browser kann diese Musik gerade nicht abspielen.
</audio>