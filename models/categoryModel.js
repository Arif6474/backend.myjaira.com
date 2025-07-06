import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const categorySchema = new Schema({
    name: {
        type: String,
    },
    slug: {
        type: String,
        unique: true,
    },
    description: {
        type: String,
    },
    isActive: {
        type: Boolean,
        default: true,
    },
}, { timestamps: true });

export default model('Category', categorySchema);
