import { Router } from 'express'
import authRoutes from './authRoutes/authRoutes.js'

const publicRoutes = Router()

publicRoutes.use('/auth', authRoutes)

export default publicRoutes