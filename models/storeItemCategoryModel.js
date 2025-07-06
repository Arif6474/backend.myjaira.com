import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const storeItemCategorySchema = new Schema({
    sellerStore: {
        type: Schema.Types.ObjectId,
        ref: 'SellerStore',
    },
    category: {
        type: Schema.Types.ObjectId,
        ref: 'Category',
    },
    isActive: {
        type: Boolean,
        default: true,
    },
}, { timestamps: true });

export default model('StoreItemCategory', storeItemCategorySchema);
