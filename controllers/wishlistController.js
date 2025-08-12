import asyncHandler from 'express-async-handler'
import Wishlist from '#models/wishlistModel.js'

import { archiveDocument, createDocument, deleteDocument, getAllDocuments, getDocumentsWithQuery, getSingleDocument, updateDocument } from '#crudServices/crudServices.js';

const getAllWishlists = asyncHandler(async (req, res) => {
    await getAllDocuments({ model: Wishlist, req, res });
})

const getSingleWishlist = asyncHandler(async (req, res) => {
    await getSingleDocument({ model: Wishlist, req, res });
})

const createWishlist = asyncHandler(async (req, res) => {
    const userId = req.customer._id;
    const { item } = req.body;
    const wishlist = await Wishlist.findOne({ customer: userId, item})

    if (wishlist) {
        // toggle follow/unfollow
        wishlist.isActive = !wishlist.isActive;
        await wishlist.save();
        return res.status(200).json({ message: wishlist.isActive ? "Favorited" : "Unfavorited" });
    }

    await Wishlist.create({customer: userId, item});
    res.status(201).json({ message: "Favorited" });
    
})

const updateWishlist = asyncHandler(async (req, res) => {
    await updateDocument({ model: Wishlist, req, res, folderName: 'images/wishlist' });

});

const deleteWishlist = asyncHandler(async (req, res) => {
    await deleteDocument({ model: Wishlist, req, res, fileFields: ['image',] });
});

const archiveWishlist = asyncHandler(async (req, res) => {
    await archiveDocument({ model: Wishlist, req, res });
});

const getWishlistWithQuery = asyncHandler(async (req, res) => {
    await getDocumentsWithQuery({ model: Wishlist, req, res });
})

const getWishlistByUserId = asyncHandler(async (req, res) => {
    const { userId } = req.params;
    const wishlists = await Wishlist.find({ user: userId }).populate('item');
    if (!wishlists) {
        return res.status(404).json({ message: 'No wishlists found for this user' });
    }
    res.status(200).json(wishlists);
})

const checkItemWishlist = asyncHandler(async(req, res) => {
    const { item } = req.query;
    const userId = req.customer._id;

    const existing = await Wishlist.findOne({ customer: userId, item: item, isActive: true });

    res.status(200).json({ isFavorited: !!existing });
})


export {
    getAllWishlists,
    getSingleWishlist,
    createWishlist,
    updateWishlist,
    deleteWishlist,
    archiveWishlist,
    getWishlistWithQuery,
    getWishlistByUserId,
    checkItemWishlist
}