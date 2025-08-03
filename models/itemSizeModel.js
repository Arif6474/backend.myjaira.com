import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const itemSizeSchema = new Schema({
    item: {
        type: Schema.Types.ObjectId,
        ref: 'Item',
        required: true,
    },
    size: {
        type: Schema.Types.ObjectId,
        ref: 'Size',
    },
    isActive: {
        type: Boolean,
        default: true,
    },

}, { timestamps: true });

export default model('ItemSize', itemSizeSchema);