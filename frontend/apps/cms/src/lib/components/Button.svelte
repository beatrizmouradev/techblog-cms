<script>
  export let classes = ''
  /** @type {'simple' | 'border'} */
  export let type = 'border'

  const commonClasses = `flex duration-300 transition-all px-2 py-1 gap-2 rounded-md justify-center items-center w-fit ${ classes } `

  const styles = commonClasses.concat(type === 'simple' ? 'text-blue-500' : 'bg-blue-500 text-white border border-transparent hover:text-blue-500 hover:bg-white hover:border-blue-500')
</script>


<button class={styles} {...$$props} on:click>
  <slot />
</button>
