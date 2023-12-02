import express from 'express'
import { ImagensController } from './controller'

const router = express.Router()

router.post('/', ImagensController.uploadImageFromBase64)

//router.get('/', ImagensController.list)
//router.get('/:id', ImagensController.findById)

//router.put('/:id', ImagensController.update)
//router.delete('/:id', ImagensController.delete)

export default router

