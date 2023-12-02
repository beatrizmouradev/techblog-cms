import { PostAPI, CategoryAPI } from 'lib-api';

/** @type {import('./$types').PageLoad} */
export async function load() {
  const categories = await CategoryAPI.list()

  const categoriesWithPosts = await Promise.all(
    categories.map(async category =>
      ({ ...category, posts: await PostAPI.listByCategory(category.id) })
    )
  )

  return { categoriesWithPosts }
}
