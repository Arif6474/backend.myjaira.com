import asyncHandler from 'express-async-handler'
import SellerStore from '#models/sellerStoreModel.js'

import { archiveDocument, createDocument, deleteDocument, getAllDocuments, getDocumentsWithQuery, getSingleDocument, updateDocument } from '#crudServices/crudServices.js';

const getAllSellerStores = asyncHandler(async (req, res) => {
    await getAllDocuments({ model: SellerStore, req, res });
})

const getSingleSellerStore = asyncHandler(async (req, res) => {
    await getSingleDocument({ model: SellerStore, req, res });
})

const createSellerStore = asyncHandler(async (req, res) => {
    await createDocument({ model: SellerStore, req, res, folderName: 'images/sellerStore' });
})

const updateSellerStore = asyncHandler(async (req, res) => {
    await updateDocument({ model: SellerStore, req, res, folderName: 'images/sellerStore' });

});

const deleteSellerStore = asyncHandler(async (req, res) => {
    await deleteDocument({ model: SellerStore, req, res, fileFields: ['image',]});
});

const archiveSellerStore = asyncHandler(async (req, res) => {
    await archiveDocument({ model: SellerStore, req, res });
});

const getSellerStoreWithQuery = asyncHandler(async (req, res) => {
    await getDocumentsWithQuery({ model: SellerStore, req, res });
})

export {

    getAllSellerStores,
    getSingleSellerStore,
    createSellerStore,
    updateSellerStore,
    deleteSellerStore,
    archiveSellerStore,
    getSellerStoreWithQuery
}