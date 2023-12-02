<script>
	import { goto } from '$app/navigation';
	import { PostAPI } from '$lib/post-api';
	import Form from '../../components/form.svelte';


	/** @type {import('./$types').PageData} */
	export let data;

  $: post = { id: data.post.id, title: data.post.title, content: data.post.content, image: data.post.image, categoryId: data.post.categoryId, authorId: data.post.authorId }

  const goBack = () => {
    goto('/posts')
  }

  const onSave = async () => {
    if (post.id === -1) post.id = await PostAPI.create(post)
    else if (post.title !== data.post.title || post.content !== data.post.content || post.image !== data.post.image || post.categoryId !== data.post.categoryId || post.authorId !== data.post.authorId) await PostAPI.update(post)

    goBack()
  }

</script>

<Form post={post} categories={data.categories} authors={data.authors} on:save={onSave} on:cancel={goBack} />
