/**
 * @typedef Category
 * @type {{ id: number, title: string, parent?: number }}
 */

/**
 * @typedef ParentCategory
 * @type {Omit<Category, 'parent'> & { subcategories: Category[] }}
 */

export class CategoryAPI {

    /**
     * Realiza criação de uma categoria na api.
     *
     * @param {Omit<Category, 'id'>} newCategory
     * @returns {Promise<number>} retorna o id salvo no bd
     */
    static create = async (newCategory) => {
        const response = await fetch('http://localhost:3001/categorias/', {
            method: 'POST',
            body: JSON.stringify(newCategory),
            headers: {
                'Content-type': 'application/json'
            }
        })

        if (!response.ok) throw new Error('Erro ao salvar categoria')

        const [{ insertId }] = await response.json()

        return insertId
    }

    /**
     * Realiza edição de uma categoria na api.
     *
     * @param {Category} category
     * @returns {Promise<Category>} retorna o id salvo no bd
     */
    static update = async (category) => {
        const response = await fetch(`http://localhost:3001/categorias/${ category.id }`, {
            method: 'PUT',
            body: JSON.stringify(category),
            headers: {
                'Content-type': 'application/json'
            }
        })

        if (!response.ok) throw new Error('Erro ao salvar categoria')

        return response.json()
    }

    /**
     * Realiza deleção de uma categoria na api.
     *
     * @param {Category} category
     * @returns {Promise<void>} retorna o id salvo no bd
     */
    static delete = async (category) => {
        const response = await fetch(`http://localhost:3001/categorias/${ category.id }`, {
            method: 'DELETE',
            headers: {
                'Content-type': 'application/json'
            }
        })

        if (!response.ok) throw new Error('Erro ao deletar categoria')
    }

  /**
   * @returns {Promise<(ParentCategory | Category)[]>}
   */
  static list = async () => {
        const response = await fetch('http://localhost:3001/categorias/', {
            method: 'GET',
            headers: {
                'Content-type': 'application/json'
            }
        })

        if (!response.ok) throw new Error('Erro ao listar categorias')

        return response.json()
  }

  /**
   * @returns {Promise<ParentCategory>}
   */
  static findById = async (/** @type {number} */ categoryId) => {
        const response = await fetch(`http://localhost:3001/categorias/${ categoryId }`, {
            method: 'GET',
            headers: {
                'Content-type': 'application/json'
            }
        })

        if (!response.ok) throw new Error('Erro ao buscar categoria')

        return response.json()
  }

  /** @type {(category: Category | ParentCategory) => category is ParentCategory} */
  static isParentCategory = (category) =>
    !/** @type {Category} */(category).parent
}
