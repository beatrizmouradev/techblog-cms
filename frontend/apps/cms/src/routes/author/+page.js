import { AuthorAPI } from '$lib/author-api';

/** @type {import('./$types').PageLoad} */
export async function load() {
  const [author] = await AuthorAPI.list()

  return { author }
}
