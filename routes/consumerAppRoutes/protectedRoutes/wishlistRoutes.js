import { Router } from 'express'
import { checkItemWishlist, createWishlist, getMyWishlists } from '#controllers/wishlistController.js'

const wishlistRoutes = Router()
wishlistRoutes.post('/createWishlist', createWishlist)
wishlistRoutes.get('/checkItemWishlist', checkItemWishlist)
wishlistRoutes.get('/getMyWishlists', getMyWishlists)

export default wishlistRoutes