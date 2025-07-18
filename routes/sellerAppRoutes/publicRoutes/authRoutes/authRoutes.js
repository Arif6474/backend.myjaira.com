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
authRoutes.post('/forgotEmployeePassword', forgotSellerPassword);
authRoutes.patch('/resetEmployeePassword', resetSellerPassword);
authRoutes.get('/getEmailFromToken/:token', getEmailFromToken)

export default authRoutes