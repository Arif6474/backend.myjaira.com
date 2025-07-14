import { Router } from 'express';

import {
    getAllStoreItemSubcategories,
    getSingleStoreItemSubcategory,
    createStoreItemSubcategory,
    updateStoreItemSubcategory,
    deleteStoreItemSubcategory,
    archiveStoreItemSubcategory,
    getStoreItemSubcategoryWithQuery,
} from '#controllers/storeItemSubcategoryController.js';

const storeItemSubcategoryRoutes = Router();

storeItemSubcategoryRoutes.get('/', getAllStoreItemSubcategories);
storeItemSubcategoryRoutes.post('/', createStoreItemSubcategory);
storeItemSubcategoryRoutes.get('/getStoreItemSubcategoryWithQuery', getStoreItemSubcategoryWithQuery);
storeItemSubcategoryRoutes.get('/getSingleStoreItemSubcategory/:id', getSingleStoreItemSubcategory);
storeItemSubcategoryRoutes.patch('/:id', updateStoreItemSubcategory);
storeItemSubcategoryRoutes.delete('/:id', deleteStoreItemSubcategory);
storeItemSubcategoryRoutes.patch('/archiveStoreItemSubcategory/:id', archiveStoreItemSubcategory);

export default storeItemSubcategoryRoutes;