<script>
	import { goto } from '$app/navigation';
	import { CategoryAPI } from '$lib/category-api';
	import Form from '../../components/form.svelte';


	/** @type {import('./$types').PageData} */
	export let data;

  $: subcategories = structuredClone(data.category.subcategories)
  $: category = { id: data.category.id, title: data.category.title, subcategories }

  const goBack = () => {
    goto('/categories')
  }

  const onSave = async () => {
    if (category.id === -1) category.id = await CategoryAPI.create({ title: category.title })
    else if (category.title !== data.category.title) await CategoryAPI.update(category)

    category.subcategories = await Promise.all(
      category.subcategories.map(async subcategory => {
        if (subcategory.id === -1) {
          subcategory.id = await CategoryAPI.create({ title: subcategory.title, parent: category.id })

          return subcategory
        }

        const existentSubCategory = data.category.subcategories.find(sub => sub.id === subcategory.id)
        if (!existentSubCategory) return subcategory

        if (subcategory.title !== existentSubCategory.title)
          return CategoryAPI.update(subcategory)

        return subcategory
      })
    )

    goBack()
  }

  const onRemoveSubCategory = async (/** @type {CustomEvent<import('$lib/category-api').Category>} */ { detail: subcategory }) => {
    if (subcategory.id === -1) return

    const procceed = confirm('Tem certeza que deseja remover?')

    if (!procceed) return

    await CategoryAPI.delete(subcategory)
  }
</script>

<Form category={category} on:save={onSave} on:delete-subcategory={onRemoveSubCategory} on:cancel={goBack} />
