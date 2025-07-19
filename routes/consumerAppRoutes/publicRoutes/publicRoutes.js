import { Router } from 'express'
import newsletterRoutes from './newsletterRoutes.js'

import { getAllStores, getHomePageData, getStoreBySlug, getStoreBySlugWithCategories, getAllStoreCategories, getAllItemCategories } from '#controllers/publicController.js'
import authRoutes from './authRoutes/authRoutes.js'
import { createSellerRequest } from '#controllers/sellerRequestController.js'


const publicRoutes = Router()
publicRoutes.use('/auth', authRoutes)
publicRoutes.use('/newsletter', newsletterRoutes)

publicRoutes.post('/sellerRequest', createSellerRequest)
publicRoutes.get('/getHomePageData', getHomePageData)
publicRoutes.get('/getAllStores', getAllStores)
publicRoutes.get('/getStoreBySlug/:slug', getStoreBySlug)
publicRoutes.get('/getAllStoreCategories', getAllStoreCategories)
publicRoutes.get('/getAllItemCategories', getAllItemCategories)
publicRoutes.get('/getStoreBySlugWithCategories/:storeSlug/:categorySlug', getStoreBySlugWithCategories)

export default publicRoutes 