<div class="flex flex-col p-5">
  <label for="" class="category-label">Categoria</label>
  <input type="text" class="category-input" bind:value={category.title} />

  <div class="flex ml-4 pt-7">
    <div class="vert-dots">
    </div>
    <div class="flex flex-col">
      {#each category.subcategories as subcategory}
        <div class="subcategory">
          <div class="add-field-plus">
            <div class="plus-dots"></div>
          </div>
          <div class="subcategory__label">
            <label for={`subcategory-input-${ subcategory.id }`} class="category-label">Subcategoria</label>
            <div class="flex gap-2">
              <input
                type="text" class="category-input"
                id={`subcategory-input-${ subcategory.id }`}
                bind:value={subcategory.title}
              />
              <Button on:click={() => deleteSubCategory(subcategory)} type='simple' classes='hover:!text-blue-800 group-hover:text-white'>
                <DeleteIcon />
              </Button>
            </div>
          </div>
        </div>
      {/each}
      <div class="flex flex-col">
        <div class="subcategory">
          <div class="add-field-plus">
            <div class="plus-dots"></div>
          </div>
          <PlusIcon classes="category-label flex relative -bottom-8 text-black/50 rounded-full border hover:text-black transition-all duration-300 cursor-pointer" on:click={addSubcategory} />
        </div>
      </div>
    </div>
  </div>

  <div class="flex self-end gap-2">
    <Button on:click={cancel}>
      Cancelar
    </Button>

    <Button classes="flex self-end" on:click={save}>
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
  .category-label {
    color: var(--theme-color-fg-secondary);
    display: block;
    font-size: 13px;
    padding-bottom: 8px;
  }
  .category-input {
    border: transparent;
    outline: 2px solid transparent;
    background: var(--theme-color-bg-input);
    border: 0;
    border-radius: 4px;
    box-sizing: border-box;
    color: var(--theme-color-fg-primary);
    font-size: 16px;
    font-weight: 400;
    line-height: 20px;
    margin: 0;
    max-width: 100%;
    padding: 8px;
    -webkit-transition: box-shadow .15s;
    transition: box-shadow .15s;
    vertical-align: middle;
    -webkit-appearance: none;
    box-shadow: 0 0 0 2px transparent inset,0 0 0 1px var(--theme-color-fg-default-border) inset;
    width: 390px;
    max-height: 36px;
  }
  .category-input:focus {
    box-shadow: 0 0 0 2px var(--theme-color-primary) inset,0 0 0 1px var(--theme-color-fg-default-border) inset;
  }
  .vert-dots {
    background-image: linear-gradient(to bottom, var(--theme-color-fg-default-border) 50%, transparent 0%);
    background-repeat: repeat-y;
    background-size: 2px 6px;
    margin: -28px 0 0 0;
    min-width: 2px;
    width: 2px;
  }
  .subcategory {
    display: flex;
    flex-flow: row;
  }
  .add-field-plus {
    display: flex;
    flex-flow: row
  }
  .plus-dots {
    background-image: linear-gradient(to right, var(--theme-color-fg-default-border) 50%, transparent 0%);
    background-position: bottom;
    background-repeat: repeat-x;
    background-size: 6px 2px;
    height: 46px;
    width: 16px;
    margin-right: 16px
  }
</style>
<script>
  import DeleteIcon from '$lib/assets/img/Delete.svelte'
	import PlusIcon from "$lib/assets/img/Plus.svelte";
	import Button from "$lib/components/Button.svelte";
	import { createEventDispatcher } from "svelte";

	const dispatch = createEventDispatcher();

  function cancel() {
    dispatch('cancel')
  }

  function deleteSubCategory(/** @type {import("$lib/category-api").Category} */ subcategory) {
    category.subcategories = category.subcategories.filter(({ id }) => id !== subcategory.id)
    dispatch('delete-subcategory', subcategory)
  }

	function addSubcategory() {
    category.subcategories = [ ...category.subcategories, { id: -1, title: '' } ]
	}

  function save() {
    dispatch('save')
  }

  /** @type {import("$lib/category-api").ParentCategory} */
  export let category
</script>
