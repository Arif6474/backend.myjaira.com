import mongoose from 'mongoose';
const { model, Schema } = mongoose;

const shipmentSchema = new Schema({
  courier: { type: String, default: 'ShopifyDeliveryAE' },
  awb: { type: String },
  labelPdf: { type: String },
  status: { type: String }, // Submitted, In Facility, OFD, Delivered, RTO, etc.
  lastStatusAt: { type: Date },
  activities: [{
    at: Date,
    status: String,
    details: String,
  }],
  forwardedAt: { type: Date },
}, { _id: false });

const orderSchema = Schema({
  orderId: { type: String, required: true, unique: true },
  customer: { type: Schema.Types.ObjectId, ref: 'Customer', required: true },
  sellerStore: { type: Schema.Types.ObjectId, ref: 'SellerStore', required: true },
  totalAmount: { type: Number, required: true },
  orderStatus: {
    type: String,
    enum: ['Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled', 'Returned', 'Completed'],
    default: 'Pending'
  },
  paymentStatus: {
    type: String,
    enum: ['Pending', 'Completed', 'Failed'],
    default: 'Pending'
  },
  paymentMethod: {
    type: String,
    enum: ['card', 'cod'],
    required: true
  },
  paymentDetails: {
    transactionId: { type: String },
    paymentDate: { type: Date },
    amountPaid: { type: Number }
  },
  shippingDetails: {
    address: { type: String, required: true },
    shippingMethod: { type: String, enum: ['Standard', 'Express'], required: true },
    trackingNumber: { type: String },

    // Optional recipient extras (helpful for courier payload)
    recipientName: { type: String },
    email: { type: String },
    phone: { type: String },
    city: { type: String },
    area: { type: String },
    country: { type: String, default: 'United Arab Emirates' },

    // New: Shopify Delivery shipment info
    shipment: shipmentSchema,
  },
  products: [
    {
      item: { type: Schema.Types.ObjectId, ref: 'Item', required: true },
      quantity: { type: Number, required: true },
      unitPrice: { type: Number, required: true },
      totalPrice: { type: Number, required: true },
      variant: { type: String },
    }
  ]
}, { timestamps: true });

export default model('Order', orderSchema);
