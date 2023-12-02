import { AuthorAPI } from '$lib/author-api';

/** @type {import('./$types').PageLoad} */
export async function load() {
  const authors = await AuthorAPI.list()

  return { authors }
}
