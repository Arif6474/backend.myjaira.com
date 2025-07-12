import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const storeCategorySchema = new Schema({
    name: {
        type: String,
    },
    slug: {
        type: String,
        unique: true,
    },
    image: {
        type: String,
    },
    isFeatured: {
        type: Boolean,
        default: false,
    },
    description: {
        type: String,
    },
    serial: {
        type: Number,

    },
    isActive: {
        type: Boolean,
        default: true,
    },
}, { timestamps: true });

export default model('StoreCategory', storeCategorySchema);
