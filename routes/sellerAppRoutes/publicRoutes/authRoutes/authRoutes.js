import { Router } from 'express'
import{  getAllSellerWithQuery,
    loginSeller,
    registerSeller,
    changeSellerPassword,
    forgotSellerPassword,
    resetSellerPassword,
    getEmailFromToken,
} from '#controllers/userControllers/sellerController.js'

const authRoutes = Router()

authRoutes.post('/login', loginSeller);
authRoutes.post('/register', registerSeller);
authRoutes.post('/forgotSellerPassword', forgotSellerPassword);
authRoutes.patch('/resetSellerPassword', resetSellerPassword);
authRoutes.get('/getEmailFromToken/:token', getEmailFromToken)

export default authRoutes