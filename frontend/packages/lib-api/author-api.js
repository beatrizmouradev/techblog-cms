/**
 * @typedef Author
 * @type {{ id: number, name: string, avatar: string }}
 */

export class AuthorAPI {
    /**
     * Realiza criação de uma autor na api.
     *
     * @param {Omit<Author, 'id'>} newAuthor
     * @returns {Promise<number>} retorna o id salvo no bd
     */
    static create = async (newAuthor) => {
      const response = await fetch('http://localhost:3001/autores/', {
          method: 'POST',
          body: JSON.stringify(newAuthor),
          headers: {
              'Content-type': 'application/json'
          }
      })

      if (!response.ok) throw new Error('Erro ao salvar autor')

      const [{ insertId }] = await response.json()

      return insertId
    }

    /**
     * Realiza edição de uma autor na api.
     *
     * @param {Author} author
     * @returns {Promise<Author>} retorna o id salvo no bd
     */
    static update = async (author) => {
        const response = await fetch(`http://localhost:3001/autores/${ author.id }`, {
            method: 'PUT',
            body: JSON.stringify(author),
            headers: {
                'Content-type': 'application/json'
            }
        })

        if (!response.ok) throw new Error('Erro ao salvar autor')

        return response.json()
    }

  /**
   * @returns {Promise<Author[]>}
   */
  static list = async () => {
        const response = await fetch('http://localhost:3001/autores/', {
            method: 'GET',
            headers: {
                'Content-type': 'application/json'
            }
        })

        if (!response.ok) throw new Error('Erro ao listar autores')

        return response.json()
  }

  /**
   * @returns {Promise<Author>}
   */
  static findById = async (/** @type {number} */ authorId) => {
        const response = await fetch(`http://localhost:3001/autores/${ authorId }`, {
            method: 'GET',
            headers: {
                'Content-type': 'application/json'
            }
        })

        if (!response.ok) throw new Error('Erro ao buscar autor')

        return response.json()
  }

  /**
   * Realiza deleção de um autor na api.
   *
   * @param {Author} author
   * @returns {Promise<void>} retorna o id salvo no bd
   */
  static delete = async (author) => {
      const response = await fetch(`http://localhost:3001/autores/${ author.id }`, {
          method: 'DELETE',
          headers: {
              'Content-type': 'application/json'
          }
      })

      if (!response.ok) throw new Error('Erro ao deletar autor')
  }
}
