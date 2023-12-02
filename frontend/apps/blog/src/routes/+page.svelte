<script>
	import Header from "$lib/components/Header.svelte";
	import PostList from "$lib/components/PostList.svelte";

	/** @type {import('./$types').PageData} */
	export let data;

  $: console.log('data', data)

</script>

<div class="h-full w-full flex flex-col gap-3">
  <Header 
    title="Artigos"
    subTitle="Selecione uma categoria para saber mais sobre a comunidade tech 🤓."
  >
    <nav class="w-fit rounded-md h-fit bg-white shadow-lg shadow-blue-500/50">
      <ul class="flex gap-3 justify-around !divide-x !divide-white">

        {#each data.categoriesWithPosts as category}
          <li class="transition-all duration-300 p-5 text-black">
            <a class="text-blue-800 font-bold hover:text-blue-500" href={`/categories/${ category.id }`}>{ category.title }</a>
          </li>
        {/each}

      </ul>
    </nav>
    
  </Header>
  
  <ul class="flex flex-col md:mb-0 gap-16">
    {#each data.categoriesWithPosts as category}
      <li class="flex flex-col gap-8 px-8">
        <h1 class="text-4xl font-black flex gap-4 text-purple-800 items-center">
          <span>{ category.title }</span>
          <a href={`/categories/${ category.id }`}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="3" stroke="currentColor" class="w-6 h-6 animate-rebounce">
              <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>
          </a>
        </h1>
        <PostList posts={category.posts} />
      </li>
    {/each}
  </ul>
</div>

<style scoped>
  * {
    z-index: 1;
  }
</style>
