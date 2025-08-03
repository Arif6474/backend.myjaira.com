import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const colorSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    hexCode: {
        type: String,
        // required: true,
    },
    isActive: {
        type: Boolean,
        default: true,
    },
    serial: {
        type: Number,
        default: 0,
    },
}, { timestamps: true });

export default model('Color', colorSchema);