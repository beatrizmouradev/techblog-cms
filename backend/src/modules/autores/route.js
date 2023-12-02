import express from 'express'
import { AutoresController } from './controller'

const router = express.Router()

router.post('/', AutoresController.create)

router.get('/', AutoresController.list)
router.get('/:id', AutoresController.findById)

router.put('/:id', AutoresController.update)
router.delete('/:id', AutoresController.delete)

export default router
