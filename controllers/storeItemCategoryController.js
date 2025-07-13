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
    // await getDocumentsWithQuery({ model: StoreItemCategory, req, res });
    const { search, page = 1, limit = 10 } = req.query;
    const filters = req.query.filters ? JSON.parse(req.query.filters) : {}
    const skip = (page - 1) * limit;
    const total = await StoreItemCategory.countDocuments(filters);
    const categories = await StoreItemCategory.find(filters)
        .skip(skip)
        .limit(Number(limit))
        .sort({ createdAt: -1 })
        .populate('category')
    res.status(200).json({
        totalItems: total,
        totalPages: Math.ceil(total / limit),
        currentPage: Number(page),
        pageSize: Number(limit),
        documents: categories
    });
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