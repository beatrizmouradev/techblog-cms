
<script>
	import Header from "$lib/components/Header.svelte";
	import GoBackButton from "$lib/components/GoBackButton.svelte";

	/** @type {import('./$types').PageData} */
	export let data;

  $: console.log('data', data)
  function goHome() {
    history.back()
  }
</script>

<div class="flex flex-col gap-5">
  <GoBackButton 
    class="text-white absolute z-50 p-4"
    on:click={goHome} 
  />

  <Header 
    small
    title={data.post.title}
  >
    <nav class="w-fit rounded-md h-fit bg-white shadow-lg shadow-blue-500/50">
      <ul class="flex gap-3 justify-around !divide-x !divide-white">
        
        <li class="transition-all duration-300 p-5 text-black">
          <a class="text-blue-800 font-bold hover:text-blue-500" href={`/categories/${ data.category.id }`}># { data.category.title }</a>
        </li>

      </ul>
    </nav>
  </Header>

  <div class="flex flex-col gap-4 bg-gray-200 p-5">
    <div class="flex items-center gap-5">
      <img src={data.author.avatar} class="w-12 h-12 rounded-full" />

      <span class="font-bold text-md">{ data.author.name }</span>
    </div>
  </div>

  <img src={data.post.image} class="h-[20rem] m-auto"/>

  <ul class="flex flex-col">
    {@html data.post.content}
  </ul>
</div>

<style>
  * {
    position: relative;
    z-index: 1
  }
</style>
