import { Router } from 'express'
import { forgotEmployeePassword, getEmailFromToken, loginEmployee, registerEmployee, resetEmployeePassword } from '#controllers/userControllers/employeeController.js';

const authRoutes = Router()

authRoutes.post('/login', loginEmployee);
authRoutes.post('/register', registerEmployee);
authRoutes.post('/forgotEmployeePassword', forgotEmployeePassword);
authRoutes.patch('/resetEmployeePassword', resetEmployeePassword);
authRoutes.get('/getEmailFromToken/:token', getEmailFromToken)

export default authRoutes