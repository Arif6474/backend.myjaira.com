import { Router } from 'express'
import { createOrder } from '#controllers/order/orderController.js'

const protectedRoutes = Router()
protectedRoutes.post('/createOrder', createOrder)

export default protectedRoutes
