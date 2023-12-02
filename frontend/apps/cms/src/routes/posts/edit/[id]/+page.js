import { AuthorAPI } from '$lib/author-api';
import { CategoryAPI } from '$lib/category-api';
import { PostAPI } from '$lib/post-api';

/** @type {import('./$types').PageLoad<{ post: import('$lib/post-api').Post, categories: import('$lib/category-api').Category[], authors: import('$lib/author-api').Author[] }>} */
export async function load({ params }) {
  const { id: rawId } = params

  const categories = await CategoryAPI.list()

  const authors = await AuthorAPI.list()

  if (rawId === 'create') return { post: { id: -1, title: '', content: '', image: '', categoryId: -1, authorId: -1 }, categories, authors }

  const id = Number(rawId)

  const post = await PostAPI.findById(id)

  return { post, categories, authors }
}
