
import categoryModel from '#models/categoryModel.js'
import itemModel from '#models/itemModel.js';
import sellerStoreModel from '#models/sellerStoreModel.js';
import storeCategoryModel from '#models/storeCategoryModel.js';
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
const getAllStores = asyncHandler(async (req, res) => {
    const stores = await sellerStoreModel.find({ isActive: true }).sort({ serial: 1 })
    res.status(200).json(stores)
})


const getStoreBySlug = asyncHandler(async (req, res) => {
    const { slug } = req.params;

    // 1. Get the store
    const store = await sellerStoreModel.findOne({ slug });
    if (!store) {
        return res.status(404).json({ message: "Store not found" });
    }

    // 2. Get all items for this store
    const items = await itemModel.find({ sellerStore: store._id });

    // 3. Get unique category IDs from those items
    const categoryIds = [...new Set(items.map(item => item.category?.toString()))].filter(Boolean);

    // 4. (Optional) Populate full category info
    const categories = await categoryModel.find({ _id: { $in: categoryIds } });

    res.status(200).json({
        store,
        categories, // Full category objects (name, slug, etc.)
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

    const singleStoreItems = await itemModel.find({ sellerStore: singleStore._id, category: category._id }).populate('category').sort({ createdAt: -1 });

    res.status(200).json({
        singleStore,
        category,
        items: singleStoreItems
    });
});

export {
    getHomePageData,
    getAllStores,
    getStoreBySlug,
    getStoreBySlugWithCategories
}