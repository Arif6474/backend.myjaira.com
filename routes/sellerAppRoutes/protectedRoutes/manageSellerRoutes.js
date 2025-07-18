
import { getAllSellerWithQuery } from "#controllers/userControllers/sellerController.js"
import { Router } from "express"

const manageSellerRoutes = Router()

manageSellerRoutes.get('/getAllEmployeesWithQuery', getAllSellerWithQuery)

export default manageSellerRoutes