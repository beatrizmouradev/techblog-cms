<script>
  import AddIcon from '$lib/assets/img/Plus.svelte'
  import EditIcon from '$lib/assets/img/Edit.svelte'
  import DeleteIcon from '$lib/assets/img/Delete.svelte'
	import { Button } from '$lib/components';
	import { goto, invalidateAll } from '$app/navigation';
	import { CategoryAPI } from '$lib/category-api';

  const onEdit = (/** @type {import('$lib/category-api').Category} */ category) => {
    goto(`/categories/edit/${ category.id }`)
  }

  const onCreate = () =>
    goto(`/categories/edit/create`)

  async function onDelete(/** @type {import('$lib/category-api').ParentCategory} */ category) {
    const procceed = confirm('Tem certeza que deseja remover? Isso removerá todas as subcategorias')
    if (!procceed) return

    await Promise.all(
      category.subcategories.map(CategoryAPI.delete)
    )
    await CategoryAPI.delete(category)

    invalidateAll()
  }

  $: parentCategories = data.categories.filter(CategoryAPI.isParentCategory)

	/** @type {import('./$types').PageData} */
	export let data;
</script>

<div class="p-3 flex flex-col space-y-5">
  <h1 class="font-bold text-xl">Categorias</h1>

  <Button on:click={onCreate} classes="self-end">
    <span>Adicionar</span>
    <AddIcon classes="w-4" />
  </Button>

  <span class="font-bold text-xl flex self-center">Listagem</span>

  <hr class="w-1/4 flex self-center border" />

  <div class="flex flex-col">
    {#each parentCategories as category}
      <div class="flex justify-between border-b border-gray-200 items-center w-full bg-blue-50 hover:bg-blue-200 transition-all duration-300 rounded-sm px-2 py-1 group">
        <div class="flex gap-1">
          <span class="font-bold">{ category.title }</span>

          {#each category.subcategories.slice(0, 3) as subcategory, index}
            <span class="text-black/50">{ index === 0 ? ':' : '/' } { subcategory.title } </span>
          {/each}

          {#if category.subcategories.length > 3}
            <span class="text-black/50">/ ... </span>
          {/if}

        </div>
        <div class="flex self-end gap-2">
          <Button on:click={() => onEdit(category)} type='simple' classes='hover:!text-blue-800 group-hover:text-white'>
            <EditIcon />
          </Button>
          <Button on:click={() => onDelete(category)} type='simple' classes='hover:!text-blue-800 group-hover:text-white'>
            <DeleteIcon />
          </Button>
        </div>
      </div>
    {/each}
  </div>
</div>
