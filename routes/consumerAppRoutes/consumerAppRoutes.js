import { Router } from 'express'

import publicRoutes from './publicRoutes/publicRoutes.js'
import protectedRoutes from './protectedRoutes/protectedRoutes.js'

const consumerAppRoutes = Router()

consumerAppRoutes.use('/public', publicRoutes)
consumerAppRoutes.use('/protected', protectedRoutes)




export default consumerAppRoutes