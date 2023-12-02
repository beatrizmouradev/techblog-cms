import { eq, like, sql } from "drizzle-orm"
import { database } from "../../services/database"
import { categoryTable } from "../../services/schema"

/**
 * @typedef CategoryWithParent
 * @type {Omit<typeof categoryTable.$inferSelect, 'parent'> & { parent: CategoryWithParent } }
 */

export class CategoriaModel {
  static create = async (/** @type {typeof categoryTable.$inferInsert} */ { title, parent }) =>
    /** @type {typeof categoryTable.$inferInsert} */ (
      database
      .insert(categoryTable)
      .values({ title, parent })
    )

  static update = async (/** @type {typeof categoryTable.$inferSelect} */ { id, title }) =>
    /** @type {typeof categoryTable.$inferSelect} */ (
      database
      .update(categoryTable)
      .set({ title })
      .where(eq(categoryTable.id, id))
    )

  static delete = async (/** @type {typeof categoryTable.$inferSelect} */ { id }) =>
    /** @type {typeof categoryTable.$inferInsert} */ (
      database
      .delete(categoryTable)
      .where(eq(categoryTable.id, id))
    )

  /** @returns {Promise<CategoryWithParent[]>} */
  static list = async (/** @type {string} */ title = '') => {
    const result = await database
      .select()
      .from(categoryTable)
      .where(like(sql`lower(${ categoryTable.title })`, `%${ title.toLowerCase() }%`))

    return Promise.all(result.map(CategoriaModel.fetchChilds))
  }

  static findById = async (/** @type {number} */ categoryId) => {
    if (!categoryId) return

    return database
      .query
      .categoryTable
      .findFirst({
        where: eq(categoryTable.id, categoryId)
      }).then(CategoriaModel.fetchChilds)
  }

  /** @returns {Promise<CategoryWithParent>} */
  static fetchChilds = async (/** @type {typeof categoryTable.$inferSelect} */ category) =>
    Object.assign(category, {
      subcategories: await database
        .query
        .categoryTable
        .findMany({
          where: eq(categoryTable.parent, category.id)
        })
    })
}
