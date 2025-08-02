import { Router } from 'express'
import { createOrder,  } from '#controllers/order/orderController.js'
import { createStoreFollower } from '#controllers/storeFollowerController.js'

const protectedRoutes = Router()
protectedRoutes.post('/createOrder', createOrder)
protectedRoutes.post('/createStoreFollower', createStoreFollower)


export default protectedRoutes
