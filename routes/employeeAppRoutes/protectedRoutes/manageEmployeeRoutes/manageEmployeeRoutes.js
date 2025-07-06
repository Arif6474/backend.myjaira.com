import { getAllEmployeesWithQuery } from "#controllers/userControllers/employeeController.js"
import { Router } from "express"

const manageEmployeeRoutes = Router()

manageEmployeeRoutes.get('/getAllEmployeesWithQuery', getAllEmployeesWithQuery)

export default manageEmployeeRoutes

