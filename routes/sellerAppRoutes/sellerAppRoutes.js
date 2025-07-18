import { Router } from 'express'

import publicRoutes from './publicRoutes/publicRoutes.js'
import protectedRoutes from './protectedRoutes/protectedRoutes.js'
import { protectForSeller } from '#middlewares/authMiddleware.js'


const sellerAppRoutes = Router()

sellerAppRoutes.use('/public', publicRoutes)
sellerAppRoutes.use('/protected',protectForSeller, protectedRoutes)



export default sellerAppRoutes