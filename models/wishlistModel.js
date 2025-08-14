import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const wishlistSchema = new Schema({

    item: {
        type: Schema.Types.ObjectId,
        ref: 'Item',
        required: true,
    },
    customer: {
        type: Schema.Types.ObjectId,
        ref: 'Customer',
        required: true,
    },
    isActive: {
        type: Boolean,
        default: true,
    },
}, { timestamps: true });

export default model('Wishlist', wishlistSchema);