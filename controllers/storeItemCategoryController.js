import asyncHandler from 'express-async-handler'
import StoreItemCategory from '#models/storeItemCategoryModel.js'

import { archiveDocument, createDocument, deleteDocument, getAllDocuments, getDocumentsWithQuery, getSingleDocument, updateDocument } from '#crudServices/crudServices.js';

const getAllStoreItemCategories = asyncHandler(async (req, res) => {
    await getAllDocuments({ model: StoreItemCategory, req, res });
})

const getSingleStoreItemCategory = asyncHandler(async (req, res) => {
    await getSingleDocument({ model: StoreItemCategory, req, res });
})

const createStoreItemCategory = asyncHandler(async (req, res) => {
    await createDocument({ model: StoreItemCategory, req, res, folderName: 'images/storeItemCategory' });
})

const updateStoreItemCategory = asyncHandler(async (req, res) => {
    await updateDocument({ model: StoreItemCategory, req, res, folderName: 'images/storeItemCategory' });

});

const deleteStoreItemCategory = asyncHandler(async (req, res) => {
    await deleteDocument({ model: StoreItemCategory, req, res, fileFields: ['image',]});
});

const archiveStoreItemCategory = asyncHandler(async (req, res) => {
    await archiveDocument({ model: StoreItemCategory, req, res });
});

const getStoreItemCategoryWithQuery = asyncHandler(async (req, res) => {
    await getDocumentsWithQuery({ model: StoreItemCategory, req, res });
})

export {

    getAllStoreItemCategories,
    getSingleStoreItemCategory,
    createStoreItemCategory,
    updateStoreItemCategory,
    deleteStoreItemCategory,
    archiveStoreItemCategory,
    getStoreItemCategoryWithQuery
}       