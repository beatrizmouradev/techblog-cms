import express from 'express'
import { PostagensController } from './controller'

const router = express.Router()

router.post('/', PostagensController.create)

router.get('/', PostagensController.list)
router.get('/:id', PostagensController.findById)
router.get('/categoria/:id', PostagensController.findByCategory)

router.put('/:id', PostagensController.update)
router.delete('/:id', PostagensController.delete)

export default router
