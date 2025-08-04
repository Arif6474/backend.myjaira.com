import { Router } from 'express';

import {
    getAllItemSizes,
    getSingleItemSize,
    createItemSize,
    updateItemSize,
    deleteItemSize,
    archiveItemSize,
    getItemSizeWithQuery,
} from '#controllers/itemSizeController.js';

const router = Router();

router.get('/', getAllItemSizes);
router.post('/', createItemSize);
router.get('/getItemSizeWithQuery', getItemSizeWithQuery);
router.get('/getSingleItemSize/:id', getSingleItemSize);
router.patch('/:id', updateItemSize);
router.delete('/:id', deleteItemSize);
router.patch('/archiveItemSize/:id', archiveItemSize);

export default router;