import { PostAPI } from 'lib-api';

/** @type {import('./$types').PageLoad} */
export async function load() {
  const posts = await PostAPI.list()

  return { posts }
}
