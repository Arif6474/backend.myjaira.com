import { Router } from 'express'
import { checkItemWishlist, createWishlist } from '#controllers/wishlistController.js'

const wishlistRoutes = Router()
wishlistRoutes.post('/createWishlist', createWishlist)
wishlistRoutes.get('/checkItemWishlist', checkItemWishlist)

export default wishlistRoutes