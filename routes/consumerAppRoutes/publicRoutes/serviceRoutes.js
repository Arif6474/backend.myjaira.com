import { Router } from 'express'
import {
    getAllServicesByCategory,
    getServiceBySlug,

} from '#controllers/service/serviceController.js'

const serviceRoutes = Router()

serviceRoutes.route('/:categorySlug').get(getAllServicesByCategory)
serviceRoutes.route('/getSingleService/:slug').get(getServiceBySlug)

export default serviceRoutes
