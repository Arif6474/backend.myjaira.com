import { upload } from '#utils/storage.js';
import { Router } from 'express';

import {
    getAllItems,
    getSingleItem,
    createItem,
    updateItem,
    deleteItem,
    archiveItem,
    getItemWithQuery,
} from '#controllers/itemController.js';

const router = Router();

router.get('/', getAllItems);
router.post('/', upload.fields([{ name: 'image' }]), createItem);
router.get('/getItemWithQuery', getItemWithQuery);
router.get('/getSingleItem/:id', getSingleItem);
router.patch('/:id', upload.fields([{ name: 'image' }]), updateItem);
router.delete('/:id', deleteItem);
router.patch('/archiveItem/:id', archiveItem);

export default router;