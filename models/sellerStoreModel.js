import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const sellerStoreSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
    image: {
        type: String,
    },
    seller: {
        type: Schema.Types.ObjectId,
        ref: 'Seller',
        required: true,
    },
    storeCategory: {
        type: Schema.Types.ObjectId,
        ref: 'StoreCategory',
    },
    location: {
        type: String,
    },
    email: {
        type: String,
    },
    phone: {
        type: String,
        required: true,
    },
    isFeatured: {
        type: Boolean,
        default: false,
    },
    serial:{
        type: Number,
    },
    isActive: {
        type: Boolean,
        default: true,
    },
}, { timestamps: true });

export default model('SellerStore', sellerStoreSchema);
