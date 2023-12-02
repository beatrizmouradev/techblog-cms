import { eq, like, sql } from "drizzle-orm"
import { database } from "../../services/database"
import { authorTable } from "../../services/schema"

export class AutorModel {
    static create = async (/** @type {typeof authorTable.$inferInsert} */ { name, avatar }) =>
    /** @type {typeof authorTable.$inferInsert} */ (
      database
      .insert(authorTable)
      .values({ name, avatar })
    )

  static update = async (/** @type {typeof authorTable.$inferSelect} */ { id, name, avatar }) =>
    /** @type {typeof authorTable.$inferSelect} */ (
      database
      .update(authorTable)
      .set({ name, avatar })
      .where(eq(authorTable.id, id))
    )

  static delete = async (/** @type {typeof authorTable.$inferSelect} */ { id }) =>
    /** @type {typeof authorTable.$inferInsert} */ (
      database
      .delete(authorTable)
      .where(eq(authorTable.id, id))
    )

  /** @returns {Promise<typeof authorTable.$inferSelect[]>} */
  static list = async (/** @type {string} */ name = '') => {
    const result = await database
      .select()
      .from(authorTable)
      .where(like(sql`lower(${ authorTable.name })`, `%${ name.toLowerCase() }%`))

    return result
  }

  static findById = async (/** @type {number} */ authorId) => {
    if (!authorId) return

    return database
      .query
      .authorTable
      .findFirst({
        where: eq(authorTable.id, authorId)
      })
  }

}
