import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const newsletterSchema = Schema({
    email: {
        type: String,
        required: true,
    },

    isActive: {
        type: Boolean,
        default: true
      
    },
  
},{ timestamps: true })

export default model('Newsletter', newsletterSchema)