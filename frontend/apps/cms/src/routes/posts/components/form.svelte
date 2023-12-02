<script>
	import { SelectDropdown } from "$lib/components";
	import Button from "$lib/components/Button.svelte";
	import LabelInput from "$lib/components/LabelInput.svelte";
	import ImgUpload from "$lib/components/ImgUpload.svelte";
  import Editor from "cl-editor/src/Editor.svelte"
	import { createEventDispatcher } from "svelte";

  /** @type {import("$lib/post-api").Post} */
  export let post

  /** @type {import("$lib/category-api").Category[]} */
  export let categories

  /** @type {import("$lib/author-api").Author[]} */
  export let authors

  const dispatch = createEventDispatcher()

  function cancel() {
    dispatch('cancel')
  }

  function save() {
    dispatch('save')
  }
</script>

<div class="p-3 flex flex-col space-y-5">
  <h1 class="font-bold text-xl">Posts</h1>

  <LabelInput
    label='Titulo'
    bind:value={post.title}
    class='!w-3/4'
  />

  <div class="flex flex-col gap-1">
    <span class="label">Imagem</span>
    <ImgUpload src={post.image} class="w-3/4 h-32 bg-black" on:fileUpload={({ detail }) => post.image = detail} />
  </div>

  <div class="flex justify-between w-3/4">

    <SelectDropdown
      label='Categoria'
      placeholder="Selecione uma categoria"
      class='!w-full'
      data={categories}
      selected={categories.find(category => post.categoryId === category.id)}
      value="title"
      on:select={evt => post.categoryId = evt.detail.id}
    />

    <SelectDropdown
      label='Autor'
      placeholder="Selecione um autor"
      class='!w-full'
      data={authors}
      selected={authors.find(author => post.authorId === author.id)}
      value="name"
      on:select={evt => post.authorId = evt.detail.id}
    />
  </div>

  <div class="flex flex-col gap-1 w-3/4">
    <span class="label">Conteúdo</span>
    <!-- svelte-ignore -->
    <Editor html={post.content} on:change={(/** @type {CustomEvent<string>} */evt)=> post.content = evt.detail} class="rounded-lg"/>
  </div>

  <div class="flex justify-end gap-2 w-3/4">
    <Button on:click={cancel}>
      Cancelar
    </Button>

    <Button on:click={save}>
      Salvar
    </Button>
  </div>
</div>

<style scoped>
  :root {
    --theme-color-bg-input: #fff;
    --theme-color-primary: rgb(26,115,232);
    --theme-color-fg-primary: rgba(0,0,0,0.87);
    --theme-color-fg-secondary: rgba(0,0,0,0.55);
    --theme-color-fg-default-border: rgba(0, 0, 0, 0.12);
  }
  .label {
    color: var(--theme-color-fg-secondary);
    display: block;
    font-size: 13px;
  }
</style>
