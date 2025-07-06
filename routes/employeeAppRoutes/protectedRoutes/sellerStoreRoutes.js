import { upload } from '#utils/storage.js';
import { Router } from 'express';

import {
    getAllSellerStores,
    getSingleSellerStore,
    createSellerStore,
    updateSellerStore,
    deleteSellerStore,
    archiveSellerStore,
    getSellerStoreWithQuery,
} from '#controllers/sellerStoreController.js';

const sellerStoreRoutes = Router();

sellerStoreRoutes.get('/', getAllSellerStores);
sellerStoreRoutes.post('/', upload.fields([{ name: 'image' }]), createSellerStore);
sellerStoreRoutes.get('/getSellerStoreWithQuery', getSellerStoreWithQuery);
sellerStoreRoutes.get('/getSingleSellerStore/:id', getSingleSellerStore);
sellerStoreRoutes.patch('/:id', upload.fields([{ name: 'image' }]), updateSellerStore);
sellerStoreRoutes.delete('/:id', deleteSellerStore);
sellerStoreRoutes.patch('/archiveSellerStore/:id', archiveSellerStore);

export default sellerStoreRoutes;
