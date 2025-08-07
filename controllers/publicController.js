
import categoryModel from '#models/categoryModel.js'
import itemImageModel from '#models/itemImageModel.js';
import itemModel from '#models/itemModel.js';
import itemSizeModel from '#models/itemSizeModel.js';
import sellerStoreModel from '#models/sellerStoreModel.js';
import storeCategoryModel from '#models/storeCategoryModel.js';
import StoreFollower from '#models/storeFollowerModel.js';
import storeItemSubcategoryModel from '#models/storeItemSubcategoryModel.js';
import Testimonial from '#models/testimonialModel.js'
import asyncHandler from 'express-async-handler'

const getHomePageData = asyncHandler(async (req, res) => {
    const testimonials = await Testimonial.find({ isActive: true }).sort({ createdAt: -1 })
    const featuredCategories = await categoryModel.find({ isFeatured: true, isActive: true })
    const featuredSellerStores = await sellerStoreModel.find({ isFeatured: true, isActive: true }).sort({ serial: 1 })
    const featuredStoreCategories = await storeCategoryModel.find({ isActive: true }).sort({ serial: 1 })


    res.status(200).json({
        testimonials,
        featuredCategories,
        featuredSellerStores,
        featuredStoreCategories

    })
})
// const getAllStores = asyncHandler(async (req, res) => {
//     const { itemCategory, storeCategory } = req.query;

//     if(itemCategory !== undefined && itemCategory !== '' && itemCategory !== 'null') {
//         const category = await categoryModel.findOne({ slug: itemCategory });
//         const items = await itemModel.find({ category: category._id }).populate('sellerStore');
//         const storeIds = [...new Set(items.map(item => item.sellerStore?._id))];
//         const stores =  await sellerStoreModel.find({ _id: { $in: storeIds }, isActive: true }).sort({ serial: 1 });
//         return res.status(200).json(stores);
//     }
//     if(storeCategory !== undefined && storeCategory !== '' && storeCategory !== 'null') {
//         const category = await storeCategoryModel.findOne({ slug: storeCategory });

//         const storeItemSubcategories = await storeItemSubcategoryModel.find({storeCategory : category._id, isActive: true })
//         const categoryIds = [...new Set(storeItemSubcategories.map(subcategory => subcategory.category))]
//         const items =await itemModel.find({ category: { $in: categoryIds } })
//         const sellerStoreIds = [...new Set(items.map(store => store.sellerStore))];
//         const stores = await sellerStoreModel.find({ _id: { $in: sellerStoreIds }, isActive: true }).sort({ serial: 1 });

//         return res.status(200).json(stores);
//     }
//     const stores = await sellerStoreModel.find({ isActive: true }).sort({ serial: 1 })
//     res.status(200).json(stores)
// })
const getAllStores = asyncHandler(async (req, res) => {
    const { itemCategory, storeCategory } = req.query;

    const isValidQuery = (value) =>
        value !== undefined && value !== '' && value !== 'null';

    // 🟡 Filter by itemCategory
    if (isValidQuery(itemCategory)) {
        const category = await categoryModel.findOne({ slug: itemCategory });
        if (!category) return res.status(200).json([]);

        const items = await itemModel.find({ category: category._id }).populate('sellerStore');
        const storeIds = [
            ...new Set(items.map((item) => item.sellerStore?._id).filter(Boolean)),
        ];

        const stores = await sellerStoreModel
            .find({ _id: { $in: storeIds }, isActive: true })
            .sort({ serial: 1 });

        return res.status(200).json(stores);
    }

    // 🟡 Filter by storeCategory
    if (isValidQuery(storeCategory)) {
        const category = await storeCategoryModel.findOne({ slug: storeCategory });
        if (!category) return res.status(200).json([]);

        const subcategories = await storeItemSubcategoryModel.find({
            storeCategory: category._id,
            isActive: true,
        });

        const categoryIds = [...new Set(subcategories.map((sc) => sc.category).filter(Boolean))];

        const items = await itemModel.find({ category: { $in: categoryIds } });
        const sellerStoreIds = [...new Set(items.map((item) => item.sellerStore).filter(Boolean))];

        const stores = await sellerStoreModel
            .find({ _id: { $in: sellerStoreIds }, isActive: true })
            .sort({ serial: 1 });

        return res.status(200).json(stores);
    }

    // 🟡 Default: All active stores
    const stores = await sellerStoreModel.find({ isActive: true }).sort({ serial: 1 });
    res.status(200).json(stores);
});


const getStoreBySlug = asyncHandler(async (req, res) => {
    const { slug } = req.params;
    const { itemCategory } = req.query;

    // 1. Get the store
    const store = await sellerStoreModel.findOne({ slug });
    if (!store) {
        return res.status(404).json({ message: "Store not found" });
    }

    let categories = [];
    const isValidQuery = (value) => value !== undefined && value !== '' && value !== 'null';
    if (isValidQuery(itemCategory)) {
        categories = await categoryModel.find({ slug: itemCategory, isActive: true });
        res.status(200).json({
            store,
            categories, // Full category objects (name, slug, etc.)
            // If you just need IDs or names, you can adjust the return
        });
    }

    // 2. Get all items for this store
    const items = await itemModel.find({ sellerStore: store._id });

    // 3. Get unique category IDs from those items
    const categoryIds = [...new Set(items.map(item => item.category?.toString()))].filter(Boolean);

    const query = { _id: { $in: categoryIds }, isActive: true, };

    categories = await categoryModel.find(query).sort({ serial: 1 });

    const sellerStoreProductsCount = await itemModel.countDocuments({ sellerStore: store._id, isActive: true });

    res.status(200).json({
        store,
        categories, // Full category objects (name, slug, etc.)
        sellerStoreProductsCount, // Total number of products in this store
        items
        // If you just need IDs or names, you can adjust the return
    });
});

const getStoreBySlugWithCategories = asyncHandler(async (req, res) => {
    const { storeSlug, categorySlug } = req.params;
    const singleStore = await sellerStoreModel.findOne({ slug: storeSlug });

    if (!singleStore) {
        return res.status(404).json({ message: "Store not found" });
    }
    const category = await categoryModel.findOne({ slug: categorySlug });
    if (!category) {
        return res.status(404).json({ message: "Category not found" });
    }

    const singleStoreItems = await itemModel.find({ sellerStore: singleStore._id, category: category._id, isActive: true }).populate('category').sort({ serial: 1 });

    res.status(200).json({
        singleStore,
        category,
        items: singleStoreItems
    });
});

const getAllStoreCategories = asyncHandler(async (req, res) => {
    const storeCategories = await storeCategoryModel.find({ isActive: true }).sort({ serial: 1 });
    res.status(200).json(storeCategories);
})

const getAllItemCategories = asyncHandler(async (req, res) => {
    const categories = await categoryModel.find({ isActive: true }).sort({ serial: 1 });
    res.status(200).json(categories);
})

const getStoreFollowersByStoreId = asyncHandler(async (req, res) => {
    const { storeId } = req.params;
    const followerCount = await StoreFollower.countDocuments({ sellerStore: storeId });

    if (!followerCount) {
        return res.status(404).json({ message: 'No followers found for this store' });
    }
    res.status(200).json(followerCount);
})
const getSingleItemDetails = asyncHandler(async (req, res) => {
    const { itemId } = req.params;

    // Fetch the item details, populate 'sellerStore' and 'category'
    const item = await itemModel.findById(itemId).populate('sellerStore category').exec();

    if (!item) {
        return res.status(404).json({ message: 'Item not found' });
    }

    // Fetch item images, populate 'color', and sort by 'serial'
    const itemImages = await itemImageModel.find({ item: item._id, isActive: true }).populate('color').sort({ serial: 1 });

    // Fetch item sizes, populate 'itemSize', and sort by 'serial' from the Size model
    const itemSizes = await itemSizeModel.find({ item: item._id, isActive: true }).populate('itemSize');

    // Sort itemSizes array by the 'serial' field of the populated 'itemSize' field
    const sortedItemSizes = itemSizes.sort((a, b) => a.itemSize.serial - b.itemSize.serial);

    // Send the response with the item, item images, and sorted item sizes
    res.status(200).json({
        item,
        itemImages,
        itemSizes: sortedItemSizes,
    });
});

export {
    getHomePageData,
    getAllStores,
    getStoreBySlug,
    getStoreBySlugWithCategories,
    getAllStoreCategories,
    getAllItemCategories,
    getStoreFollowersByStoreId,
    getSingleItemDetails
}