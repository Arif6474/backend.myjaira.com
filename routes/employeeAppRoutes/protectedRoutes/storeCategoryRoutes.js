import { Router } from 'express';

import {
    getAllStoreCategories,
    getSingleStoreCategory,
    createStoreCategory,
    updateStoreCategory,
    deleteStoreCategory,
    archiveStoreCategory,
    getStoreCategoryWithQuery,
} from '#controllers/storeCategoryController.js';

const router = Router();

router.get('/', getAllStoreCategories);
router.post('/', createStoreCategory);
router.get('/getStoreCategoryWithQuery', getStoreCategoryWithQuery);
router.get('/getSingleStoreCategory/:id', getSingleStoreCategory);
router.patch('/:id', updateStoreCategory);
router.delete('/:id', deleteStoreCategory);
router.patch('/archiveStoreCategory/:id', archiveStoreCategory);

export default router;
