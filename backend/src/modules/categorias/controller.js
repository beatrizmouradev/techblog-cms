import { categoryTable } from "../../services/schema"
import { PostModel } from "../postagens/model"
import { CategoriaModel } from "./model"

export class CategoriasController {

    /**
     * Create categoria.
     *
     * @param {import("express").Request<null, typeof categoryTable.$inferSelect, typeof categoryTable.$inferInsert>} req
     * @param {import("express").Response} res
     */
    static create = async (req, res) => {
        try {
            const { title, parent } = req.body

            // Early return
            if (!title) throw new Error('Categoria sem titulo')

            const category = await CategoriaModel.create({ title, parent })

            res.status(200).json(category)
        } catch (error) {
            res.status(400).send(error.message)
        }
    }

    /**
     * Listar categorias.
     *
     * @param {import("express").Request<null, typeof categoryTable.$inferSelect[], null, { title: string }>} req
     * @param {import("express").Response} res
     */
    static list = async (req, res) => {
      try {
        const { query: { title = '' } } = req

        const list = await CategoriaModel.list(title)

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

        const category = await CategoriaModel.findById(id)

        res.status(200).json(category)
      } catch (error) {
        console.error(error)
        res.status(400).send(error.message)
      }
    }

    /**
     * Update categoria.
     *
     * @param {import("express").Request<{ id: number }, typeof categoryTable.$inferSelect, typeof categoryTable.$inferInsert>} req
     * @param {import("express").Response} res
     */
    static update = async (req, res) => {
        try {
            const { id } = req.params
            const { title } = req.body

            // Early return
            if (!title) throw new Error('Categoria sem titulo')

            if (!id) throw new Error('Categoria sem id para atualizar')

            const category = await CategoriaModel.update({ title, id })

            res.status(200).json(category)
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
            if (!id) throw new Error('Categoria sem id para deletar')

            const postsByCategory = await PostModel.findByCategory({ categoryId: id })
            await Promise.all(
              postsByCategory.map(async post =>
                PostModel.update({ ...post, categoryId: null })
              )
            )
            await CategoriaModel.delete({ id })

            res.status(200).send()
        } catch (error) {
            res.status(400).send(error.message)
        }
    }
}
