import { PostAPI, CategoryAPI, AuthorAPI } from 'lib-api';

/** @type {import('./$types').PageLoad} */
export async function load({ params }) {
  const post = await PostAPI.findById(params.id)

  const category = await CategoryAPI.findById(post.categoryId)

  const author = await AuthorAPI.findById(post.authorId)

  return { post, category, author }
}
