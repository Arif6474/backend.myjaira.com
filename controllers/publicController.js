
import Testimonial from '#models/testimonialModel.js'
import asyncHandler from 'express-async-handler'

const getHomePageData = asyncHandler(async (req, res) => {
    const testimonials = await Testimonial.find({isActive: true}).sort({ createdAt: -1 })

    

    res.status(200).json({
        testimonials,

    })
})

export { getHomePageData }