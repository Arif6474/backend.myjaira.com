import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const storeItemSubcategorySchema = new Schema({
    storeCategory: {
        type: Schema.Types.ObjectId,
        ref: 'StoreCategory',
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

export default model('StoreItemSubcategory', storeItemSubcategorySchema);
