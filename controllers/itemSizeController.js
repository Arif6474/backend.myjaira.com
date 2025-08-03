import asyncHandler from 'express-async-handler'
import ItemSize from '#models/itemSizeModel.js'

import { archiveDocument, createDocument, deleteDocument, getAllDocuments, getDocumentsWithQuery, getSingleDocument, updateDocument } from '#crudServices/crudServices.js';

const getAllItemSizes = asyncHandler(async (req, res) => {
    await getAllDocuments({ model: ItemSize, req, res });
})
const getSingleItemSize = asyncHandler(async (req, res) => {
    await getSingleDocument({ model: ItemSize, req, res });
})
const createItemSize = asyncHandler(async (req, res) => {
    await createDocument({ model: ItemSize, req, res, folderName: 'images/itemSize' });
})

const updateItemSize = asyncHandler(async (req, res) => {
    await updateDocument({ model: ItemSize, req, res, folderName: 'images/itemSize' });
});

const deleteItemSize = asyncHandler(async (req, res) => {
    await deleteDocument({ model: ItemSize, req, res, fileFields: ['image'] });
});

const archiveItemSize = asyncHandler(async (req, res) => {
    await archiveDocument({ model: ItemSize, req, res });
});

const getItemSizeWithQuery = asyncHandler(async (req, res) => {
    await getDocumentsWithQuery({ model: ItemSize, req, res });
});

export {

    getAllItemSizes,
    getSingleItemSize,
    createItemSize,
    updateItemSize,
    deleteItemSize,
    archiveItemSize,
    getItemSizeWithQuery
}   