import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const itemImageSchema = new Schema({
    item: {
        type: Schema.Types.ObjectId,
        ref: 'Item',
        required: true,
    },
    color: {
        type: Schema.Types.ObjectId,
        ref: 'Color',
    },
    isLinkOrImage: {
        type: String,
        enum: ['link', 'image'],
    },
    link: {
        type: String,
    },
    image: {
        type: String,
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

export default model('ItemImage', itemImageSchema);