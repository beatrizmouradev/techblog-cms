
<script>
	import { createEventDispatcher } from "svelte";
	import LabelInput from "./LabelInput.svelte";
  const dispatcher = createEventDispatcher()

  export let label = ''
  export let value = ''

  /** @type {any} */
  export let selected

  /** @type {Array<typeof selected>} */
  export let data

  let isFocused = false
  let query = selected && selected[value] || ''

  function splitText(/** @type {string} */ value = '') {
    return value.toLowerCase().trim().replace(/\s{2,}/g, ' ').split(' ').filter(Boolean)
  }

  $: querySplit = splitText(query)

  $: filtered = data.filter(item =>
    !query ||
    querySplit.some(matchingText =>
      splitText(item[value]).some(matchingSearch => matchingSearch.includes(matchingText))
    )
  )

  function onSelect(/** @type {typeof selected} */ item) {
    isFocused = false
    query = ''
    dispatcher('select', item)
  }

  const classes = '!shadow-[0_3px_0px_-2px_#0000001f]'
</script>
<div class={`${ $$props.class || '' } relative cursor-pointer`}>
  {#if !isFocused && selected}
    <LabelInput
      label={label}
      type="text"
      value={selected[value]}
      placeholder={$$props.placeholder}
      class={classes}
      on:focus={() => isFocused = true}
      />
  {:else}
    <LabelInput
      label={label}
      type="text"
      autofocus
      class={classes}
      placeholder={$$props.placeholder}
      bind:value={query}
      on:focus={() => isFocused = true}
      on:blur={() => setTimeout(() => isFocused = false, 300)}
      disabled={!data.length}
    />
  {/if}
  <svg 
    class={isFocused ? '!hidden' : 'w-4 h-4 absolute right-2 bottom-1'}
    xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="lightgray">
    <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
  </svg>

  <div class={isFocused ? 'flex absolute ml-1 z-50 rounded-md bg-gray-200 w-full' : 'hidden'}>
    <ul class="max-h-[150px] overflow-y-auto overflow-x-hidden w-full">
      {#each filtered as item}
        <li
          class="cursor-pointer hover:text-black select-none hover:bg-blue-50 w-full !px-2 !py-1"
          on:click={() => onSelect(item)}
        >{item[value]}</li>
      {/each}
    </ul>
    {#if filtered.length > 5}
     <p class="absolute w-full h-3 bottom-0 !bg-gradient-to-t !from-gray-100"></p>
    {/if}
  </div>
</div>

<style scoped>
  li {
    align-items: center;
    background: #0000;
    border-radius: 2px;
    display: -moz-flex;
    display: -ms-flex;
    display: -o-flex;
    display: flex;
    margin-bottom: 6px;
    padding: 4px;
    transition: all 0.3s;
  }
::-webkit-scrollbar {
  width: 2px !important;
  height: 6px !important;
}

::-webkit-scrollbar-track {
  background-color: transparent;
}

::-webkit-scrollbar-thumb {
  background-color: rgba(29, 29, 29, 0.1) !important;
  border-radius: 1px;
  opacity: 0.5 !important;
}

::-webkit-scrollbar-thumb:hover {
  background-color: #a8bbbf !important;
}


*:hover::-webkit-scrollbar-thumb {
  background-color: rgba(29, 29, 29, 0.1) !important;
  border-radius: 1px;
  opacity: 0.5 !important;
}

*:hover::-webkit-scrollbar-thumb:hover {
  background-color: #a8bbbf !important;
}
</style>
