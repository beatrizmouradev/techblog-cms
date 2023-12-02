<script>
	import { SelectDropdown } from "$lib/components";
	import Button from "$lib/components/Button.svelte";
  import ImgUpload from '$lib/components/ImgUpload.svelte'
	import LabelInput from "$lib/components/LabelInput.svelte";
	import { createEventDispatcher } from "svelte";

  /** @type {import("$lib/author-api").Post} */
  export let author

  const dispatch = createEventDispatcher()

  function cancel() {
    dispatch('cancel')
  }

  function save() {
    dispatch('save')
  }
</script>

<div class="flex h-full w-full items-center justify-center">
  <div class="bg-blue-200 rounded-lg shadow flex flex-col gap-4 p-8 w-1/2 h-1/2 items-center">
    <Button on:click={cancel} class="!bg-transparent mr-auto">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
        <path stroke-linecap="round" stroke-linejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
      </svg>
    </Button>

    <ImgUpload src={author.avatar} class="rounded-full overflow-hidden w-32 h-32" on:fileUpload />

    <LabelInput
      label='Nome'
      bind:value={author.name}
    />

    <div class="flex self-end mt-auto gap-2">
      <Button classes="flex self-end" on:click={save}>
        Salvar
      </Button>
    </div>

  </div>
</div>

