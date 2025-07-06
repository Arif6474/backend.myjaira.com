import { Router } from 'express'
import { createNewsletter } from '#controllers/newsletter/newsletterController.js'

const newsletterRoutes = Router()

newsletterRoutes.post('/', createNewsletter)

export default newsletterRoutes