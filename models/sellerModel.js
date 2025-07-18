import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const sellerSchema = new Schema({
    name: {
        type: String,
    },
    email: {
        type: String,
        unique: true,
    },
    image: {
        type: String,
    },
    phone: {
        type: String,
    },
    isVerified: {
        type: Boolean,
        default: false,
    },
    password: {
        type: String,
    },
    level: {
        type: String,
        enum: ['superAdmin', 'admin', 'member'],
        required: [true, 'Please add a Level'],
        default: 'member',
    },
    isActive: {
        type: Boolean,
        default: true,
    },
}, { timestamps: true });

export default model('Seller', sellerSchema);
