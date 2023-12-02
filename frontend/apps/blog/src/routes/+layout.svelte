<script>
  import '../app.css'
</script>
<main>
  <div class="h-full w-full">
    <slot />
  </div>
</main>
  <!--  svelte-ignore css-unused-selector -->
<style global>
  main {
    display: flex;
    width: 100vw;
    height: 100vh;
    overflow-x: hidden;
    overflow-y: auto;
    background: whitesmoke;
  }
</style>

