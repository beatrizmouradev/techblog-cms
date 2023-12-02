<script>
	import AddIcon from "$lib/assets/img/Plus.svelte";
	import DeleteIcon from "$lib/assets/img/Delete.svelte";
	import EditIcon from "$lib/assets/img/Edit.svelte";
	import Button from "$lib/components/Button.svelte";
	import { goto, invalidateAll } from '$app/navigation';
	import { AuthorAPI } from "$lib/author-api";

  const onEdit = (/** @type {import('$lib/author-api').Author} */ author) => {
    goto(`/authors/edit/${ author.id }`)
  }

  const onCreate = () =>
    goto(`/authors/edit/create`)

  async function onDelete(/** @type {import('$lib/author-api').Author} */ author) {
    const procceed = confirm('Tem certeza que deseja remover?')
    if (!procceed) return

    await AuthorAPI.delete(author)
    invalidateAll()
  }

	/** @type {import('./$types').PageData} */
	export let data;
</script>

<div class="p-3 flex flex-col space-y-5">
  <h1 class="font-bold text-xl">Autores</h1>

  <Button on:click={onCreate} classes="self-end">
    <span>Adicionar</span>
    <AddIcon classes="w-4" />
  </Button>

  <span class="font-bold text-xl flex self-center">Listagem</span>

  <hr class="w-1/4 flex self-center border" />

  <div class="flex flex-col">
    {#each data.authors as author}
      <div class="flex justify-between border-b border-gray-200 items-center w-full bg-blue-50 hover:bg-blue-200 transition-all duration-300 rounded-sm px-2 py-2 group">
        <div class="flex gap-2 items-center">
          <img class="w-8 h-8 rounded-full" src={author.avatar} alt="Avatar"/>
          <span class="font-bold">{ author.name }</span>
        </div>
        <div class="flex self-end gap-2">
          <Button on:click={() => onEdit(author)} type='simple' classes='hover:!text-blue-800 group-hover:text-white'>
            <EditIcon />
          </Button>
          <Button on:click={() => onDelete(author)} type='simple' classes='hover:!text-blue-800 group-hover:text-white'>
            <DeleteIcon />
          </Button>
        </div>
      </div>
    {/each}
  </div>
</div>
