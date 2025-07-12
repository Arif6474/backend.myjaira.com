import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const itemSchema = new Schema({
    sellerStore: {
        type: Schema.Types.ObjectId,
        ref: 'SellerStore',
    },
    category: {
        type: Schema.Types.ObjectId,
        ref: 'Category',
    },
    title: {
        type: String,
    },
    slug: {
        type: String,
        unique: true,
    },
    description: {
        type: String,
    },
    inStock: {
        type: Boolean,
        default: true,
    },
    price: {
        type: Number,
    },
    image: {
        type: String,
    },
    isAffiliateItem: {
        type: Boolean,
        default: false,
    },
    link: {
        type: String,
    },
    serial:{
        type: Number,
    },
    isActive: {
        type: Boolean,
        default: true,
    },
}, { timestamps: true });

export default model('Item', itemSchema);
