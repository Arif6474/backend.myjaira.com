import asyncHandler from 'express-async-handler'
import ItemImage from '#models/itemImageModel.js'

import { archiveDocument, createDocument, deleteDocument, getAllDocuments, getDocumentsWithQuery, getSingleDocument, updateDocument } from '#crudServices/crudServices.js';

const getAllItemImages = asyncHandler(async (req, res) => {
    await getAllDocuments({ model: ItemImage, req, res });
})
const getSingleItemImage = asyncHandler(async (req, res) => {
    await getSingleDocument({ model: ItemImage, req, res });
})
const createItemImage = asyncHandler(async (req, res) => {
    await createDocument({ model: ItemImage, req, res, folderName: 'images/itemImage' });
})  

const updateItemImage = asyncHandler(async (req, res) => {
    await updateDocument({ model: ItemImage, req, res, folderName: 'images/itemImage' });
});

const deleteItemImage = asyncHandler(async (req, res) => {
    await deleteDocument({ model: ItemImage, req, res, fileFields: ['image'] });
});

const archiveItemImage = asyncHandler(async (req, res) => {
    await archiveDocument({ model: ItemImage, req, res });
});

const getItemImageWithQuery = asyncHandler(async (req, res) => {
    await getDocumentsWithQuery({ model: ItemImage, req, res });
})

export {

    getAllItemImages,
    getSingleItemImage,
    createItemImage,
    updateItemImage,
    deleteItemImage,
    archiveItemImage,
    getItemImageWithQuery
}