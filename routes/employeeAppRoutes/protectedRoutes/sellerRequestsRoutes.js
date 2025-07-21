import { Router } from 'express';
import {

    getAllSellerRequests,
    getSingleSellerRequest,
    createSellerRequest,
    updateSellerRequest,
    deleteSellerRequest,
    archiveSellerRequest,
    getSellerRequestWithQuery
} from '#controllers/sellerRequestController.js';
import { upload } from '#utils/storage.js';

const router = Router();
router.get('/', getAllSellerRequests);
router.post('/', upload.fields([{ name: 'image' }]), createSellerRequest);
router.get('/getSellerRequestWithQuery', getSellerRequestWithQuery);
router.get('/getSingleSellerRequest/:id', getSingleSellerRequest);
router.patch('/:id', upload.fields([{ name: 'image' }]), updateSellerRequest);
router.delete('/:id', deleteSellerRequest);
router.patch('/archiveSellerRequest/:id', archiveSellerRequest);


export default router;