import { upload } from '#utils/storage.js';
import { Router } from 'express';

import {
    getAllSellers,
    getSingleSeller,
    createSeller,
    updateSeller,
    deleteSeller,
    archiveSeller,
    getSellerWithQuery,
} from '#controllers/sellerController.js';

const router = Router();

router.get('/', getAllSellers);
router.post('/', upload.fields([{ name: 'image' }]), createSeller);
router.get('/getSellerWithQuery', getSellerWithQuery);
router.get('/getSingleSeller/:id', getSingleSeller);
router.patch('/:id', upload.fields([{ name: 'image' }]), updateSeller);
router.delete('/:id', deleteSeller);
router.patch('/archiveSeller/:id', archiveSeller);

export default router;
