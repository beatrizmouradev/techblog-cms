<script>
	import AddIcon from "$lib/assets/img/Plus.svelte";
	import DeleteIcon from "$lib/assets/img/Delete.svelte";
	import EditIcon from "$lib/assets/img/Edit.svelte";
	import Button from "$lib/components/Button.svelte";
	import { goto, invalidateAll } from '$app/navigation';
	import { PostAPI } from "$lib/post-api";

  const onEdit = (/** @type {import('$lib/post-api').Post} */ post) => {
    goto(`/posts/edit/${ post.id }`)
  }

  const onCreate = () =>
    goto(`/posts/edit/create`)

  async function onDelete(/** @type {import('$lib/post-api').Post} */ post) {
    const procceed = confirm('Tem certeza que deseja remover?')
    if (!procceed) return

    await PostAPI.delete(post)
    invalidateAll()
  }

	/** @type {import('./$types').PageData} */
	export let data;
</script>

<div class="p-3 flex flex-col space-y-5">
  <h1 class="font-bold text-xl">Posts</h1>

  <Button on:click={onCreate} classes="self-end">
    <span>Adicionar</span>
    <AddIcon classes="w-4" />
  </Button>

  <span class="font-bold text-xl flex self-center">Listagem</span>

  <hr class="w-1/4 flex self-center border" />

  <div class="flex flex-col">
    {#each data.posts as post}
      <div class="flex justify-between border-b border-gray-200 items-center w-full bg-blue-50 hover:bg-blue-200 transition-all duration-300 rounded-sm px-2 py-1 group">
        <div class="flex gap-1">
          <span class="font-bold">{ post.title }</span>
        </div>
        <div class="flex self-end gap-2">
          <Button on:click={() => onEdit(post)} type='simple' classes='hover:!text-blue-800 group-hover:text-white'>
            <EditIcon />
          </Button>
          <Button on:click={() => onDelete(post)} type='simple' classes='hover:!text-blue-800 group-hover:text-white'>
            <DeleteIcon />
          </Button>
        </div>
      </div>
    {/each}
  </div>
</div>
