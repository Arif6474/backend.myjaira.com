import { Router } from 'express'
import newsletterRoutes from './newsletterRoutes.js'

import { getHomePageData } from '#controllers/publicController.js'


const publicRoutes = Router()

publicRoutes.use('/newsletter', newsletterRoutes)

publicRoutes.get('/getHomePageData', getHomePageData)

export default publicRoutes