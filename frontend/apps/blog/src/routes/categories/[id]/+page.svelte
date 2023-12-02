
<script>
	import Header from "$lib/components/Header.svelte";
	import PostList from "$lib/components/PostList.svelte";
	import GoBackButton from "$lib/components/GoBackButton.svelte";
  import { goto } from '$app/navigation'

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
    title={data.category.title}
  >
  </Header>

  <PostList posts={data.posts} />
</div>

<style>
  * {
    position: relative;
    z-index: 1
  }
</style>
