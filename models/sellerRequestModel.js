import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const sellerRequestSchema = new Schema({
    name: {
        type: String,
    },
    email: {
        type: String,
        unique: true,
    },

    phone: {
        type: String,
    },
    message: {
        type: String,
    },
    isVerified: {
        type: Boolean,
        default: false,
    },
    isActive: {
        type: Boolean,
        default: true,
    },
}, { timestamps: true });

export default model('SellerRequest', sellerRequestSchema);
