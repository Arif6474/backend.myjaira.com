import { upload } from '#utils/storage.js';
import { Router } from 'express';

import {
    getAllItemImages,
    getSingleItemImage,
    createItemImage,
    updateItemImage,
    deleteItemImage,
    archiveItemImage,
    getItemImageWithQuery,
} from '#controllers/itemImageController.js';

const router = Router();

router.get('/', getAllItemImages);
router.post('/', upload.fields([{ name: 'image' }]), createItemImage);
router.get('/getItemImageWithQuery', getItemImageWithQuery);
router.get('/getSingleItemImage/:id', getSingleItemImage);
router.patch('/:id', upload.fields([{ name: 'image' }]), updateItemImage);
router.delete('/:id', deleteItemImage);
router.patch('/archiveItemImage/:id', archiveItemImage);

export default router;