import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const itemSizeSchema = new Schema({
    item: {
        type: Schema.Types.ObjectId,
        ref: 'Item',
        required: true,
    },
    itemSize: {
        type: Schema.Types.ObjectId,
        ref: 'Size',
    },
    // name: {
    //     type: String,
    //     // required: true,
    // },
    isActive: {
        type: Boolean,
        default: true,
    },

}, { timestamps: true });

export default model('ItemSize', itemSizeSchema);