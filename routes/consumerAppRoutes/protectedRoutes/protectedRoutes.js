import { Router } from 'express'
import { createOrder,  } from '#controllers/order/orderController.js'
import storeFollowerRoutes from './storeFollowerRoutes.js'
import { updateProfile } from '#controllers/userControllers/userController.js'


const protectedRoutes = Router()
protectedRoutes.post('/createOrder', createOrder)
protectedRoutes.patch('/updateProfile', updateProfile)
protectedRoutes.use('/storeFollower', storeFollowerRoutes)




export default protectedRoutes
