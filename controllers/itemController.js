import asyncHandler from 'express-async-handler'
import Item from '#models/itemModel.js'

import { archiveDocument, createDocument, deleteDocument, getAllDocuments, getDocumentsWithQuery, getSingleDocument, updateDocument } from '#crudServices/crudServices.js';

const getAllItems = asyncHandler(async (req, res) => {
    await getAllDocuments({ model: Item, req, res });
})

const getSingleItem = asyncHandler(async (req, res) => {
    await getSingleDocument({ model: Item, req, res });
})

const createItem = asyncHandler(async (req, res) => {
    await createDocument({ model: Item, req, res, folderName: 'images/item' });
})

const updateItem = asyncHandler(async (req, res) => {
    await updateDocument({ model: Item, req, res, folderName: 'images/item' });

});

const deleteItem = asyncHandler(async (req, res) => {
    await deleteDocument({ model: Item, req, res, fileFields: ['image',]});
});

const archiveItem = asyncHandler(async (req, res) => {
    await archiveDocument({ model: Item, req, res });
});

const getItemWithQuery = asyncHandler(async (req, res) => {
    await getDocumentsWithQuery({ model: Item, req, res });
})

export {

    getAllItems,
    getSingleItem,
    createItem,
    updateItem,
    deleteItem,
    archiveItem,
    getItemWithQuery
}