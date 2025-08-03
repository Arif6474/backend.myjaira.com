import { Router } from 'express'
import { createOrder,  } from '#controllers/order/orderController.js'
import storeFollowerRoutes from './storeFollowerRoutes.js'


const protectedRoutes = Router()
protectedRoutes.post('/createOrder', createOrder)
protectedRoutes.use('/storeFollower', storeFollowerRoutes)




export default protectedRoutes
