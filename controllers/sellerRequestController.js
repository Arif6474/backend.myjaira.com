import jwt from 'jsonwebtoken'
const { sign } = jwt

import asyncHandler from 'express-async-handler'
import SellerRequest from '#models/sellerRequestModel.js'
import { archiveDocument, deleteDocument, getAllDocuments, getDocumentsWithQuery, getSingleDocument } from '#crudServices/crudServices.js';
import { sendSellerConfirmationEmail } from '#config/email/emailFormats/sendMail.js';
function generateToken(id) {
    return sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d'
    })
}

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

    const { id } = req.params;
    const sellerRequest = await SellerRequest.findById(id);
    if (!sellerRequest) {
        res.status(404);
        throw new Error('Seller Request not found');
    }
    if (sellerRequest.isVerified) {
        res.status(400);
        throw new Error('Seller Request is already verified');
    } {
        const updatedSellerRequest = await SellerRequest.findByIdAndUpdate(id, { isVerified: true }, { new: true });

        const link = `${process.env.SELLER_APP_LINK}auth/register/${generateToken(updatedSellerRequest._id)}`;
        await sendSellerConfirmationEmail(updatedSellerRequest.email, updatedSellerRequest.name, link);

        res.status(200).json(updatedSellerRequest);
    }


});

const deleteSellerRequest = asyncHandler(async (req, res) => {
    await deleteDocument({ model: SellerRequest, req, res, fileFields: ['image',] });
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