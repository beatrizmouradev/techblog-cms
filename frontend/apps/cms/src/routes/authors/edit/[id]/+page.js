import { AuthorAPI } from '$lib/author-api';

/** @type {import('./$types').PageLoad<{ author: import('$lib/author-api').Author }>} */
export async function load({ params }) {
  const { id: rawId } = params

  if (rawId === 'create') return { author: { id: -1, name: '', avatar: '' } }

  const id = Number(rawId)

  const author = await AuthorAPI.findById(id)

  return { author }
}
