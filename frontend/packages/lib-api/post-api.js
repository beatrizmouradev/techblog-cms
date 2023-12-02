/**
 * @typedef Post
 * @type {{ id: number, content: string, title: string, image: string, categoryId: number, authorId: number }}
 */

/**
 * @typedef NewPost
 * @type {Omit<Post, 'id'>}
 */

export class PostAPI {

    /**
     * Realiza criação de um post na api.
     *
     * @param {NewPost} newPost
     * @returns {Promise<number>} retorna o id salvo no bd
     */
    static create = async (newPost) => {
        const response = await fetch('http://localhost:3001/postagens/', {
            method: 'POST',
            body: JSON.stringify(newPost),
            headers: {
                'Content-type': 'application/json'
            }
        })

        if (!response.ok) throw new Error('Erro ao salvar post')

        const [{ insertId }] = await response.json()

        return insertId
    }

    /**
     * Realiza edição de uma postagem na api.
     *
     * @param {Post} post
     */
    static update = async (post) => {
        const response = await fetch(`http://localhost:3001/postagens/${ post.id }`, {
            method: 'PUT',
            body: JSON.stringify(post),
            headers: {
                'Content-type': 'application/json'
            }
        })

        if (!response.ok) throw new Error('Erro ao salvar postagens')

        return response.json()
    }

  /** @returns {Promise<Post[]>} */
  static list = async () => {
        const response = await fetch('http://localhost:3001/postagens/', {
            method: 'GET',
            headers: {
                'Content-type': 'application/json'
            }
        })

        if (!response.ok) throw new Error('Erro ao listar postagem')

        return response.json()
  }

  static findById = async (/** @type {number} */ postId) => {
        const response = await fetch(`http://localhost:3001/postagens/${ postId }`, {
            method: 'GET',
            headers: {
                'Content-type': 'application/json'
            }
        })

        if (!response.ok) throw new Error('Erro ao buscar postagem')

        return response.json()
  }

  static listByCategory = async (/** @type {number} */ categoryId) => {
        const response = await fetch(`http://localhost:3001/postagens/categoria/${ categoryId }`, {
            method: 'GET',
            headers: {
                'Content-type': 'application/json'
            }
        })

        if (!response.ok) throw new Error('Erro ao buscar postagens por categoria')

        return response.json()
  }

  static delete = async (/** @type {Post} */ post) => {
        const response = await fetch(`http://localhost:3001/postagens/${ post.id }`, {
            method: 'DELETE',
            headers: {
                'Content-type': 'application/json'
            }
        })

        if (!response.ok) throw new Error('Erro ao deleter postagem')
  }
}
