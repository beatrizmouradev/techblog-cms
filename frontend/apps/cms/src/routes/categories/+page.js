import { CategoryAPI } from '$lib/category-api';

/** @type {import('./$types').PageLoad} */
export async function load() {
  const categories = await CategoryAPI.list()

  return { categories }
}
