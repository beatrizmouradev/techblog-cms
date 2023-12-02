<script>
	import { goto } from '$app/navigation';
	import { AuthorAPI } from '$lib/author-api';
	import Form from '../../components/form.svelte';


	/** @type {import('./$types').PageData} */
	export let data;

  $: author = { id: data.author.id, name: data.author.name, avatar: data.author.avatar }

  const goBack = () => {
    goto('/authors')
  }

  const onSave = async () => {
    if (author.id === -1) author.id = await AuthorAPI.create(author)
    else if (author.name !== data.author.name || author.avatar !== data.author.avatar) await AuthorAPI.update(author)

    goBack()
  }

  const onFileUpload = async ({ detail: fileBuffer }) => {
    author.avatar = fileBuffer
  }

</script>

<Form author={author} on:save={onSave} on:cancel={goBack} on:fileUpload={onFileUpload} />
