import { Router } from 'express'

import publicRoutes from './publicRoutes/publicRoutes.js'
import protectedRoutes from './protectedRoutes/protectedRoutes.js'
import { protectForEmployee } from '#middlewares/authMiddleware.js'


const employeeAppRoutes = Router()

employeeAppRoutes.use('/public', publicRoutes)
employeeAppRoutes.use('/protected',protectForEmployee, protectedRoutes)
// employeeAppRoutes.use('/protected', protectedRoutes)


export default employeeAppRoutes