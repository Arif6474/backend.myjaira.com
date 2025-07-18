import { Router } from 'express'
import {
    getAllNewsletters,
    getSingleNewsletter,
    updateNewsletter,
    deleteNewsletter,
    archiveNewsletter,
    getNewsletterWithQuery
} from '#controllers/newsletter/newsletterController.js'

const newsletterRoutes = Router()

newsletterRoutes.get('/', getAllNewsletters)
newsletterRoutes.get('/getSingleNewsletter/:id', getSingleNewsletter)
newsletterRoutes.patch('/:id', updateNewsletter)
newsletterRoutes.delete('/:id', deleteNewsletter)
newsletterRoutes.patch('/archiveNewsletter/:id', archiveNewsletter)
newsletterRoutes.get('/getNewsletterWithQuery', getNewsletterWithQuery)

export default newsletterRoutes