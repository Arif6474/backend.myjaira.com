import { Router } from 'express';

import {
    getAllStoreItemCategories,
    getSingleStoreItemCategory,
    createStoreItemCategory,
    updateStoreItemCategory,
    deleteStoreItemCategory,
    archiveStoreItemCategory,
    getStoreItemCategoryWithQuery,
} from '#controllers/storeItemCategoryController.js';

const storeItemCategoryRoutes = Router();

storeItemCategoryRoutes.get('/', getAllStoreItemCategories);
storeItemCategoryRoutes.post('/', createStoreItemCategory);
storeItemCategoryRoutes.get('/getStoreItemCategoryWithQuery', getStoreItemCategoryWithQuery);
storeItemCategoryRoutes.get('/getSingleStoreItemCategory/:id', getSingleStoreItemCategory);
storeItemCategoryRoutes.patch('/:id', updateStoreItemCategory);
storeItemCategoryRoutes.delete('/:id', deleteStoreItemCategory);
storeItemCategoryRoutes.patch('/archiveStoreItemCategory/:id', archiveStoreItemCategory);

export default storeItemCategoryRoutes;
