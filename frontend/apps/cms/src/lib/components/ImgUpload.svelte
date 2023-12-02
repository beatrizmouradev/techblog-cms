
<script>
  import { ImageAPI } from '$lib/image-api'
	import { createEventDispatcher } from "svelte";

  const dispatch = createEventDispatcher();

  export let src = ''
  const inputId = Math.random().toString(36).slice(2, 8);

  /** @type {HTMLInputElement} */
  let fileInput = null

  /** @type {Array<File>} */
  let files = []

  function onSelectImage() {
    if (!fileInput) return

    fileInput.click()
  }

  $: {
    if (files && files[0]) {
        const binfile = files[0];
        const reader = new FileReader();
        reader.onload = async function(evt) {
          try {
            const result = await ImageAPI.upload({ base64: evt.target.result, id: inputId })
            dispatch('fileUpload', result)
          } catch (error) {
            console.error(error)
          }
        }
        reader.readAsDataURL(binfile);
    }
  }

</script>

<div class={`flex relative group justify-center items-center hover:cursor-pointer ${ $$props.class } ${ !src ? 'bg-black' : '' }`} on:click={onSelectImage}>
  <input type="file" accept="image/*" class="!hidden" bind:this={fileInput} bind:files />
  <img src={src} class={`w-full h-full bg-black overflow-hidden ${ !src ? '!hidden' : '' }`} alt="Upload" />

  <div class="absolute opacity-0 group-hover:opacity-100 transition-all translate-y-4 group-hover:translate-y-0 duration-300 text-white">
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
      <path stroke-linecap="round" stroke-linejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
    </svg>
  </div>

</div>

