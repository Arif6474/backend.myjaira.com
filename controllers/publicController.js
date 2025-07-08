
import categoryModel from '#models/categoryModel.js'
import sellerStoreModel from '#models/sellerStoreModel.js';
import Testimonial from '#models/testimonialModel.js'
import asyncHandler from 'express-async-handler'

const getHomePageData = asyncHandler(async (req, res) => {
    const testimonials = await Testimonial.find({isActive: true}).sort({ createdAt: -1 })
    const featuredCategories = await categoryModel.find({ isFeatured: true, isActive: true })
    const featuredSellerStores = await sellerStoreModel.find({ isFeatured: true, isActive: true }).sort({ serial: 1 })
    

    res.status(200).json({
        testimonials,
        featuredCategories,
        featuredSellerStores

    })
})

export { getHomePageData }