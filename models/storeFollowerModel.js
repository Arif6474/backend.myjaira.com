import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const storeFollowerSchema = new Schema({
    store: {
        type: Schema.Types.ObjectId,
        ref: 'Store',
        required: true,
    },
    follower: {
        type: Schema.Types.ObjectId,
        ref: 'Customer',
        required: true,
    },
    isActive: {
        type: Boolean,
        default: true,
    },
}, { timestamps: true });

export default model('StoreFollower', storeFollowerSchema);