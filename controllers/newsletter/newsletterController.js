import asyncHandler from 'express-async-handler'
import Newsletter from '#models/newsletterModel.js'

import { archiveDocument,  createDocument,  deleteDocument, getAllDocuments, getDocumentsWithQuery, getSingleDocument, updateDocument } from '#crudServices/crudServices.js';

const getAllNewsletters = asyncHandler(async (req, res) => {
    await getAllDocuments({ model: Newsletter, req, res });
})  

const getSingleNewsletter = asyncHandler(async (req, res) => {
    await getSingleDocument({ model: Newsletter, req, res });
})  

const createNewsletter = asyncHandler(async (req, res) => {
    // await createDocument({ model: Newsletter, req, res });
    const { email } = req.body;
    if (!email) {
        return res.status(400).json({ message: 'Email is required' });
    }
    const isEmailAlreadyExists = await Newsletter.findOne({ email }).select('_id');
    if (isEmailAlreadyExists) {
        return res.status(400).json({ message: 'Already subscribed to this email' });
    }
    const newNewsletter = await Newsletter.create({
        email
    })
    res.status(201).json(newNewsletter);
})

const updateNewsletter = asyncHandler(async (req, res) => {
    await updateDocument({ model: Newsletter, req, res });

});

const deleteNewsletter = asyncHandler(async (req, res) => {
    await deleteDocument({ model: Newsletter, req, res });
});

const archiveNewsletter = asyncHandler(async (req, res) => {
    await archiveDocument({ model: Newsletter, req, res });
});

const getNewsletterWithQuery = asyncHandler(async (req, res) => {
    await getDocumentsWithQuery({ model: Newsletter, req, res });
})

export {

    getAllNewsletters,
    getSingleNewsletter,
    createNewsletter,
    updateNewsletter,
    deleteNewsletter,
    archiveNewsletter,
    getNewsletterWithQuery
}