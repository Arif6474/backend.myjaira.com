
import { getAllServiceCategories, getServiceCategoryBySlug } from '#controllers/serviceCategory/serviceCategoryController.js'
import { Router } from 'express'


const serviceCategoryRoutes = Router()

serviceCategoryRoutes.route('/').get(getAllServiceCategories)
serviceCategoryRoutes.route('/:slug').get(getServiceCategoryBySlug)

export default serviceCategoryRoutes
