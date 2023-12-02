
<script>
  export let title = ''
  export let subTitle = ''
</script>

<div class={`header ${ $$props.small ? 'small-header' : 'full-header' } flex flex-col gap-3 justify-center items-center text-white p-12 pb-0`}>
  <h1 class="text-5xl font-black text-white">{ title }</h1>
  <p class="font-regular">{ subTitle }</p>
  <slot />
</div>

<style scoped>
  .header {
    background: rgb(2,0,36);
    background: linear-gradient(171deg, rgba(2,0,36,1) 0%, rgba(107,9,121,1) 64%, rgba(0,212,255,1) 100%);
    @apply h-2/5;
  }
  .header.small-header::after {
    height: 10em;
  }
  .header.full-header::after {
    height: 25em;
  }
  * {
    z-index: 1;
  }
  .header::after {
    background-color: whitesmoke;
    transform: skewY(-3deg) translateY(70%);
    font-size: 1rem;
    content: '';
    width: 100lvw;
    left: 0;
    position: static;
    z-index: 0;
  }

</style>
