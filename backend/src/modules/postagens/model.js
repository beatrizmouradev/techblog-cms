import { eq, like, sql } from "drizzle-orm"
import { database } from "../../services/database"
import { postTable } from "../../services/schema"

export class PostModel {
    static create = async (/** @type {typeof postTable.$inferInsert} */ { content, title, image, categoryId, authorId }) => {
        const result = await database
            .insert(postTable)
            .values({ content, title, image, authorId, categoryId })

        return /** @type {typeof postTable.$inferSelect} */ (result)
    }

  static update = async (/** @type {typeof postTable.$inferSelect} */ { id, title, content, image, categoryId, authorId }) =>
    /** @type {typeof postTable.$inferSelect} */ (
      database
      .update(postTable)
      .set({ title, content, image, categoryId, authorId })
      .where(eq(postTable.id, id))
    )

  static delete = async (/** @type {typeof postTable.$inferSelect} */ { id }) =>
    /** @type {typeof postTable.$inferInsert} */ (
      database
      .delete(postTable)
      .where(eq(postTable.id, id))
    )

  /** @returns {Promise<typeof postTable.$inferSelect[]>} */
  static list = async (/** @type {string} */ title = '') => {
    const result = await database
      .select()
      .from(postTable)
      .where(like(sql`lower(${ postTable.title })`, `%${ title.toLowerCase() }%`))

    return result
  }

  static findById = async (/** @type {number} */ postId) => {
    if (!postId) return

    return database
      .query
      .postTable
      .findFirst({
        where: eq(postTable.id, postId)
      })
  }

  static findByCategory = async (/** @type {typeof postTable.$inferSelect} */ { categoryId }) =>
     await database
      .query
      .postTable
      .findMany({
        where: eq(postTable.categoryId, categoryId)
      })
}
