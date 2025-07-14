import asyncHandler from 'express-async-handler'
import StoreItemSubcategory from '#models/storeItemSubcategoryModel.js'

import { archiveDocument, createDocument, deleteDocument, getAllDocuments, getDocumentsWithQuery, getSingleDocument, updateDocument } from '#crudServices/crudServices.js';

const getAllStoreItemSubcategories = asyncHandler(async (req, res) => {
    await getAllDocuments({ model: StoreItemSubcategory, req, res });
})

const getSingleStoreItemSubcategory = asyncHandler(async (req, res) => {
    await getSingleDocument({ model: StoreItemSubcategory, req, res });
})

const createStoreItemSubcategory = asyncHandler(async (req, res) => {
    await createDocument({ model: StoreItemSubcategory, req, res, folderName: 'images/storeItemSubcategory'  });
})

const updateStoreItemSubcategory = asyncHandler(async (req, res) => {
    await updateDocument({ model: StoreItemSubcategory, req, res, folderName: 'images/storeItemSubcategory'  });

});

const deleteStoreItemSubcategory = asyncHandler(async (req, res) => {
    await deleteDocument({ model: StoreItemSubcategory, req, res, fileFields: ['image']});
});

const archiveStoreItemSubcategory = asyncHandler(async (req, res) => {
    await archiveDocument({ model: StoreItemSubcategory, req, res });
});

const getStoreItemSubcategoryWithQuery = asyncHandler(async (req, res) => {
    // await getDocumentsWithQuery({ model: StoreItemSubcategory, req, res });
    const { search, page = 1, limit = 10 } = req.query;
    const filters = req.query.filters ? JSON.parse(req.query.filters) : {}
    const skip = (page - 1) * limit;
    const total = await StoreItemSubcategory.countDocuments(filters);
    const categories = await StoreItemSubcategory.find(filters).populate('category')
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
    getAllStoreItemSubcategories,
    getSingleStoreItemSubcategory,
    createStoreItemSubcategory,
    updateStoreItemSubcategory,
    deleteStoreItemSubcategory,
    archiveStoreItemSubcategory,
    getStoreItemSubcategoryWithQuery
}