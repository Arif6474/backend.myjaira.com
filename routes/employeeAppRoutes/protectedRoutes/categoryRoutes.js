import { Router } from 'express';
import {
    getAllCategories,
    getSingleCategory,
    createCategory,
    updateCategory,
    deleteCategory,
    archiveCategory,
    getCategoryWithQuery,
} from '#controllers/categoryController.js';

const router = Router();
router.get('/', getAllCategories);
router.post('/', createCategory);
router.get('/getCategoryWithQuery', getCategoryWithQuery);
router.get('/getSingleCategory/:id', getSingleCategory);
router.patch('/:id', updateCategory);
router.delete('/:id', deleteCategory);
router.patch('/archiveCategory/:id', archiveCategory);

export default router;