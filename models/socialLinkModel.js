import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const socialLinkSchema = Schema({
    name: {
        type: String,
        required: true,

    },
    visibility: {
        type: Boolean,
        required: true
    },
    link: {
        type: String,
        required: true,

    }
},{ timestamps: true })

export default model('SocialLink', socialLinkSchema)