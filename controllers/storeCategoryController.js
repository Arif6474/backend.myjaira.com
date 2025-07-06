import asyncHandler from 'express-async-handler'
import StoreCategory from '#models/storeCategoryModel.js'

import { archiveDocument, createDocument, deleteDocument, getAllDocuments, getDocumentsWithQuery, getSingleDocument, updateDocument } from '#crudServices/crudServices.js';

const getAllStoreCategories = asyncHandler(async (req, res) => {
    await getAllDocuments({ model: StoreCategory, req, res });
})

const getSingleStoreCategory = asyncHandler(async (req, res) => {
    await getSingleDocument({ model: StoreCategory, req, res });
})

const createStoreCategory = asyncHandler(async (req, res) => {
    await createDocument({ model: StoreCategory, req, res, folderName: 'images/storeCategory' });
})

const updateStoreCategory = asyncHandler(async (req, res) => {
    await updateDocument({ model: StoreCategory, req, res, folderName: 'images/storeCategory' });

});

const deleteStoreCategory = asyncHandler(async (req, res) => {
    await deleteDocument({ model: StoreCategory, req, res, fileFields: ['image',]});
});

const archiveStoreCategory = asyncHandler(async (req, res) => {
    await archiveDocument({ model: StoreCategory, req, res });
});

const getStoreCategoryWithQuery = asyncHandler(async (req, res) => {
    await getDocumentsWithQuery({ model: StoreCategory, req, res });
})

export {

    getAllStoreCategories,
    getSingleStoreCategory,
    createStoreCategory,
    updateStoreCategory,
    deleteStoreCategory,
    archiveStoreCategory,
    getStoreCategoryWithQuery
}