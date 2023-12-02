import { PostAPI, CategoryAPI } from 'lib-api';

/** @type {import('./$types').PageLoad} */
export async function load({ params }) {
  const category = await CategoryAPI.findById(params.id)

  const posts = await PostAPI.listByCategory(category.id)


  return { posts, category }
}
