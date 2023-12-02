import { MAX_CONTENT_LENGTH, postTable } from "../../services/schema"
import { PostModel } from "./model"

export class PostagensController {

    /**
     * Create post.
     *
     * @param {import("express").Request<null, typeof postTable.$inferSelect, typeof postTable.$inferInsert>} req
     * @param {import("express").Response} res
     */
    static create = async (req, res) => {
        try {
            const { content, title, image, categoryId, authorId } = req.body

            PostagensController.validate(req.body)

            const post = await PostModel.create({ content, title, image, categoryId, authorId })

            res.status(200).json(post)
        } catch (error) {
            res.status(400).send(error.message)
        }
    }

  static validate = (/** @type {typeof postTable.$inferInsert} */ { title, content, image, categoryId, authorId }) => {
    // Early return
    if (!title) throw new Error('Postagem sem titulo')

    if (!categoryId) throw new Error('Postagem sem categoria')

    if (!authorId) throw new Error('Postagem sem autor')

    if (!image?.length) throw new Error('Postagem com imagem vazia')

    if (!content?.length) throw new Error('Postagem com conteudo vazio')

    if (content.length > MAX_CONTENT_LENGTH) throw new Error(`Postagem com conteudo que ultrapassa limite de ${ MAX_CONTENT_LENGTH } caracteres.`)
  }


    /**
     * Listar posts.
     *
     * @param {import("express").Request<null, typeof postTable.$inferSelect[], null, { title: string }>} req
     * @param {import("express").Response} res
     */
    static list = async (req, res) => {
      try {
        const { query: { title = '' } } = req

        const list = await PostModel.list(title)

        res.status(200).json(list)
      } catch (error) {
        console.error(error)
        res.status(400).send(error.message)
      }
    }

    /**
     * Find categoria.
     *
     * @param {import("express").Request<{ id: number }>} req
     * @param {import("express").Response} res
     */
    static findById = async (req, res) => {
      try {
        const { params: { id } } = req

        const post = await PostModel.findById(id)

        res.status(200).json(post)
      } catch (error) {
        console.error(error)
        res.status(400).send(error.message)
      }
    }

    /**
     * Update categoria.
     *
     * @param {import("express").Request<{ id: number }, typeof postTable.$inferSelect, typeof postTable.$inferInsert>} req
     * @param {import("express").Response} res
     */
    static update = async (req, res) => {
        try {
            const { id } = req.params
            const { title, content, image, categoryId, authorId } = req.body

            if (!id) throw new Error('Post sem id para atualizar')

            PostagensController.validate(req.body)

            const post = await PostModel.update({ id, title, content, image, categoryId, authorId })

            res.status(200).json(post)
        } catch (error) {
            res.status(400).send(error.message)
        }
    }

    /**
     * Delete categoria.
     *
     * @param {import("express").Request<{ id: number }>} req
     * @param {import("express").Response} res
     */
    static delete = async (req, res) => {
        try {
            const { id } = req.params

            // Early return
            if (!id) throw new Error('Post sem id para deletar')

            await PostModel.delete({ id })

            res.status(200).send()
        } catch (error) {
            res.status(400).send(error.message)
        }
    }

    /**
     * Find by categoria.
     *
     * @param {import("express").Request<null, typeof postTable.$inferSelect, typeof postTable.$inferInsert>} req
     * @param {import("express").Response} res
     */
    static findByCategory = async (req, res) => {
        try {
            const { id: categoryId } = req.params

            // Early return
            if (!categoryId) throw new Error('Post sem id para procurar')

            const posts = await PostModel.findByCategory({ categoryId })

            res.status(200).send(posts)
        } catch (error) {
            console.error(error)
            res.status(400).send(error.message)
        }
    }
}
