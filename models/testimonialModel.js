import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const testimonialSchema = Schema({
    name: {
        type: String,
        required: true,
    },
    designation: {
        type: String,
        required: true,
    },
    testimonial: {
        type: String,
        required: true
    },
    precedence: {
        type: Number,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    isActive: {
        type: Boolean,
        default: true

    },
}, { timestamps: true })

export default model('Testimonial', testimonialSchema)