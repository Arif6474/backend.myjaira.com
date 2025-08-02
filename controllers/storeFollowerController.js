import asyncHandler from 'express-async-handler'
import StoreFollower from '#models/storeFollowerModel.js'

import { archiveDocument, createDocument, deleteDocument, getAllDocuments, getDocumentsWithQuery, getSingleDocument, updateDocument } from '#crudServices/crudServices.js';

const getAllStoreFollowers = asyncHandler(async (req, res) => {
    await getAllDocuments({ model: StoreFollower, req, res });
})

const getSingleStoreFollower = asyncHandler(async (req, res) => {
    await getSingleDocument({ model: StoreFollower, req, res });
})

const createStoreFollower = asyncHandler(async (req, res) => {
    await createDocument({ model: StoreFollower, req, res, folderName: 'images/storeFollower' });
})

const updateStoreFollower = asyncHandler(async (req, res) => {
    await updateDocument({ model: StoreFollower, req, res, folderName: 'images/storeFollower' });

});

const deleteStoreFollower = asyncHandler(async (req, res) => {
    await deleteDocument({ model: StoreFollower, req, res, fileFields: ['image',]});
});

const archiveStoreFollower = asyncHandler(async (req, res) => {
    await archiveDocument({ model: StoreFollower, req, res });
});

const getStoreFollowerWithQuery = asyncHandler(async (req, res) => {
    await getDocumentsWithQuery({ model: StoreFollower, req, res });
})
const getStoreFollowerByStoreId = asyncHandler(async (req, res) => {
    const { storeId } = req.params;
    const followers = await StoreFollower.find({ store: storeId }).populate('user');
    
    if (!followers) {
        return res.status(404).json({ message: 'No followers found for this store' });
    }
    
    res.status(200).json(followers);
})

const getStoreFollowerByUserId = asyncHandler(async (req, res) => {
    const { userId } = req.params;
    const followers = await StoreFollower.find({ user: userId }).populate('store');
    
    if (!followers) {
        return res.status(404).json({ message: 'No followers found for this user' });
    }
    
    res.status(200).json(followers);
})

export {

    getAllStoreFollowers,
    getSingleStoreFollower,
    createStoreFollower,
    updateStoreFollower,
    deleteStoreFollower,
    archiveStoreFollower,
    getStoreFollowerWithQuery,
    getStoreFollowerByStoreId,
    getStoreFollowerByUserId
}