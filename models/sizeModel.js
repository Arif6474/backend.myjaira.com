import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const sizeSchema = new Schema({
    name: {
        type: String,
        required: true,
    },

    serial: {
        type: Number,

    },
    isActive: {
        type: Boolean,
        default: true,
    },
}, { timestamps: true });

export default model('Size', sizeSchema);