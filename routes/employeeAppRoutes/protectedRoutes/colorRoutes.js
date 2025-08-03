import { upload } from '#utils/storage.js';
import { Router } from 'express';

import {
    getAllColors,
    getSingleColor,
    createColor,
    updateColor,
    deleteColor,
    archiveColor,
    getColorWithQuery,
} from '#controllers/colorController.js';

const router = Router();
router.get('/', getAllColors);
router.post('/', upload.fields([{ name: 'image' }]), createColor);
router.get('/getColorWithQuery', getColorWithQuery);
router.get('/getSingleColor/:id', getSingleColor);
router.patch('/:id', upload.fields([{ name: 'image' }]), updateColor);
router.delete('/:id', deleteColor);
router.patch('/archiveColor/:id', archiveColor);

export default router;