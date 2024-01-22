import { Router } from "express";
import controller from '../controllers/product'

const router = Router()

router.post('/create', controller.createProduct)
router.get('/get', controller.getAllProducts)
router.get('/get/:productId', controller.getProductById)

export default router