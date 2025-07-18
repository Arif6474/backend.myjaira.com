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
import { upload } from '#utils/storage.js';

const router = Router();

router.get('/', getAllStoreCategories);
router.post('/', upload.fields([{ name: 'image' }]), createStoreCategory);
router.get('/getStoreCategoryWithQuery', getStoreCategoryWithQuery);
router.get('/getSingleStoreCategory/:id', getSingleStoreCategory);
router.patch('/:id', upload.fields([{ name: 'image' }]), updateStoreCategory);
router.delete('/:id', deleteStoreCategory);
router.patch('/archiveStoreCategory/:id', archiveStoreCategory);

export default router;
