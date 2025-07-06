import { Router } from 'express'
import { createConsultancyRequest } from '#controllers/consultancyRequest/consultancyRequestController.js'

const consultancyRequestRoutes = Router()

consultancyRequestRoutes.post('/', createConsultancyRequest)


export default consultancyRequestRoutes