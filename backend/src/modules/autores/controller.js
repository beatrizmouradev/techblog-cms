import { authorTable } from "../../services/schema"
import { AutorModel } from "./model"

export class AutoresController {

    /**
     * Create author.
     *
     * @param {import("express").Request<null, typeof authorTable.$inferSelect, typeof authorTable.$inferInsert>} req
     * @param {import("express").Response} res
     */
    static create = async (req, res) => {
        try {
            const { name, avatar } = req.body

            AutoresController.validate(req.body)

            const author = await AutorModel.create({ name, avatar })

            res.status(200).json(author)
        } catch (error) {
            res.status(400).send(error.message)
        }
    }

  static validate = (/** @type {typeof authorTable.$inferInsert} */ { name, avatar }) => {
    // Early return
    if (!name) throw new Error('Autor sem nome')

    if (!avatar?.length) throw new Error('Autor sem avatar')
  }


    /**
     * Listar autores.
     *
     * @param {import("express").Request<null, typeof authorTable.$inferSelect[], null, { name: string }>} req
     * @param {import("express").Response} res
     */
    static list = async (req, res) => {
      try {
        const { query: { name = '' } } = req

        const list = await AutorModel.list(name)

        res.status(200).json(list)
      } catch (error) {
        console.error(error)
        res.status(400).send(error.message)
      }
    }

    /**
     * Find autor.
     *
     * @param {import("express").Request<{ id: number }>} req
     * @param {import("express").Response} res
     */
    static findById = async (req, res) => {
      try {
        const { params: { id } } = req

        const author = await AutorModel.findById(id)

        res.status(200).json(author)
      } catch (error) {
        console.error(error)
        res.status(400).send(error.message)
      }
    }

    /**
     * Update autor.
     *
     * @param {import("express").Request<{ id: number }, typeof authorTable.$inferSelect, typeof authorTable.$inferInsert>} req
     * @param {import("express").Response} res
     */
    static update = async (req, res) => {
        try {
            const { id } = req.params
            const { name, avatar } = req.body

            // Early return
            if (!name) throw new Error('Autor sem nome')


            if (!id) throw new Error('Autor sem id para atualizar')

            const author = await AutorModel.update({ id, name, avatar })

            res.status(200).json(author)
        } catch (error) {
            res.status(400).send(error.message)
        }
    }
  
    /**
     * Delete autor.
     *
     * @param {import("express").Request<{ id: number }>} req
     * @param {import("express").Response} res
     */
    static delete = async (req, res) => {
        try {
            const { id } = req.params

            // Early return
            if (!id) throw new Error('Autor sem id para deletar')

            await AutorModel.delete({ id })

            res.status(200).send()
        } catch (error) {
            res.status(400).send(error.message)
        }
    }


}
