import { CategoryAPI } from '$lib/category-api';

/** @type {import('./$types').PageLoad<{ category: import('$lib/category-api').ParentCategory }>} */
export async function load({ params }) {
  const { id: rawId } = params

  if (rawId === 'create') return { category: { id: -1, title: '', subcategories: [] }}

  const id = Number(rawId)

  const category = await CategoryAPI.findById(id)

  return { category }
}
