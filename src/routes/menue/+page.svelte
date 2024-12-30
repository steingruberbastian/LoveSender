<script>
    import { onMount } from 'svelte';
    let randomImage = '';
    let images = [
      'cancun.jpg',
      'einsiedeln.jpg',
      'paris.jpg'
    ];
  
    onMount(() => {
      if (images.length > 0) {
        randomImage = images[Math.floor(Math.random() * images.length)];
      }
    });
  </script>
  
  <div class="d-flex flex-column align-items-center vh-100">
    <h1 class="text-center mt-5">Willkommen zuhause, bei Love Sender</h1>
    {#if randomImage}
      <!-- svelte-ignore a11y_img_redundant_alt -->
      <img src={"/images/" + randomImage} class="img-fluid mt-4" alt="Random Image" style="max-width: 300px;">
    {/if}
  </div>