import asyncHandler from 'express-async-handler'
import Seller from '#models/sellerModel.js'

import { archiveDocument, createDocument, deleteDocument, getAllDocuments, getDocumentsWithQuery, getSingleDocument, updateDocument } from '#crudServices/crudServices.js';

const getAllSellers = asyncHandler(async (req, res) => {
    await getAllDocuments({ model: Seller, req, res });
})

const getSingleSeller = asyncHandler(async (req, res) => {
    await getSingleDocument({ model: Seller, req, res });
})

const createSeller = asyncHandler(async (req, res) => {
    await createDocument({ model: Seller, req, res, folderName: 'images/seller' });
})

const updateSeller = asyncHandler(async (req, res) => {
    await updateDocument({ model: Seller, req, res, folderName: 'images/seller' });

});

const deleteSeller = asyncHandler(async (req, res) => {
    await deleteDocument({ model: Seller, req, res, fileFields: ['image',]});
});

const archiveSeller = asyncHandler(async (req, res) => {
    await archiveDocument({ model: Seller, req, res });
});

const getSellerWithQuery = asyncHandler(async (req, res) => {
    await getDocumentsWithQuery({ model: Seller, req, res });
})

export {

    getAllSellers,
    getSingleSeller,
    createSeller,
    updateSeller,
    deleteSeller,
    archiveSeller,
    getSellerWithQuery
}