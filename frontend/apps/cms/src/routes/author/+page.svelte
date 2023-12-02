<script>

  
	/** @type {import('./$types').PageData} */
	export let data;

  $: author = { id: data.author.id, name: data.author.name, avatar: data.author.avatar }
</script>

<style>
  /* your styles go here */
</style>

<!-- markup (zero or more items) goes here -->

<div class="flex h-full w-full items-center justify-center">
  <div class="bg-blue-200 rounded-lg shadow flex flex-col gap-4 p-8 w-1/2 h-1/2 items-center">
    <img src={author.avatar} width={80} height={80} class="rounded-full" alt="Avatar"/>

    <input class="rounded-md px-2 py-1 !outline-none" bind:value={author.name} on:input={(evt) => author.name = evt.target.value} />
  </div>
</div>

