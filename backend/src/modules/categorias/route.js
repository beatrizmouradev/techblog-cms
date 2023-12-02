import express from 'express'
import { CategoriasController } from './controller'

const router = express.Router()

router.post('/', CategoriasController.create)

router.get('/', CategoriasController.list)
router.get('/:id', CategoriasController.findById)

router.put('/:id', CategoriasController.update)
router.delete('/:id', CategoriasController.delete)

export default router
