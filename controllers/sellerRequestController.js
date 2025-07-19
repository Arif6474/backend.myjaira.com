import asyncHandler from 'express-async-handler'
import SellerRequest from '#models/sellerRequestModel.js'

import { archiveDocument, deleteDocument, getAllDocuments, getDocumentsWithQuery, getSingleDocument, updateDocument } from '#crudServices/crudServices.js';

const getAllSellerRequests = asyncHandler(async (req, res) => {
    await getAllDocuments({ model: SellerRequest, req, res });
})

const getSingleSellerRequest = asyncHandler(async (req, res) => {
    await getSingleDocument({ model: SellerRequest, req, res });
})

const createSellerRequest = asyncHandler(async (req, res) => {
    const { name, email, phone, message } = req.body;
    if (!name || !email || !phone) {
        res.status(400);
        throw new Error('Please fill all the fields');
    }
    const sellerRequest = await SellerRequest.create({
        name,
        email,
        phone,
        message,
    });
    
    res.status(201).json(sellerRequest);

})

const updateSellerRequest = asyncHandler(async (req, res) => {
    await updateDocument({ model: SellerRequest, req, res, folderName: 'images/sellerRequest' });

});

const deleteSellerRequest = asyncHandler(async (req, res) => {
    await deleteDocument({ model: SellerRequest, req, res, fileFields: ['image',]});
});

const archiveSellerRequest = asyncHandler(async (req, res) => {
    await archiveDocument({ model: SellerRequest, req, res });
});

const getSellerRequestWithQuery = asyncHandler(async (req, res) => {
    await getDocumentsWithQuery({ model: SellerRequest, req, res });
})

export {

    getAllSellerRequests,
    getSingleSellerRequest,
    createSellerRequest,
    updateSellerRequest,
    deleteSellerRequest,
    archiveSellerRequest,
    getSellerRequestWithQuery
}