import { Router } from 'express'
import manageEmployeeRoutes from './manageEmployeeRoutes/manageEmployeeRoutes.js'
import employeeInviteRoutes from './employeeInviteRoutes/employeeInviteRoutes.js'
import testimonialRoutes from './testimonialRoutes.js'
import newsletterRoutes from './newsletterRoutes.js'
import sellerRoutes from './sellerRoutes.js'
import storeCategoryRoutes from './storeCategoryRoutes.js'
import storeItemCategoryRoutes from './storeItemCategoryRoutes.js'
import sellerStoreRoutes from './sellerStoreRoutes.js'
import categoryRoutes from './categoryRoutes.js'
import itemRoutes from './itemRoutes.js'
import storeItemSubcategoryRoutes from './storeItemSubcategoryRoutes.js'
import sellerRequestsRoutes from './sellerRequestsRoutes.js'
import itemImageRoutes from './itemImageRoutes.js'
import itemSizeRoutes from './itemSizeRoutes.js'
import colorRoutes from './colorRoutes.js'
import sizeRoutes from './sizeRoutes.js'



const protectedRoutes = Router()

protectedRoutes.use('/employees', manageEmployeeRoutes)
protectedRoutes.use('/inviteEmployees', employeeInviteRoutes)
protectedRoutes.use('/testimonials', testimonialRoutes)
protectedRoutes.use('/newsletters', newsletterRoutes)
protectedRoutes.use('/sellers', sellerRoutes)
protectedRoutes.use('/storeCategories', storeCategoryRoutes)
protectedRoutes.use('/sellerStores', sellerStoreRoutes)
protectedRoutes.use('/storeItemCategories', storeItemCategoryRoutes)
protectedRoutes.use('/categories', categoryRoutes)
protectedRoutes.use('/items', itemRoutes)
protectedRoutes.use('/storeItemSubcategories', storeItemSubcategoryRoutes)
protectedRoutes.use('/sellerRequests', sellerRequestsRoutes)
protectedRoutes.use('/itemImages', itemImageRoutes)
protectedRoutes.use('/itemSizes', itemSizeRoutes)
protectedRoutes.use('/colors', colorRoutes)
protectedRoutes.use('/sizes', sizeRoutes)



export default protectedRoutes