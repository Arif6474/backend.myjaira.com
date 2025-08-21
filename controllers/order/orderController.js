import Order from '#models/order/orderModel.js';
import Item from '#models/itemModel.js';
import SellerStore from '#models/sellerStoreModel.js';
import Customer from '#models/userModels/customerModel.js';
import { generateCustomOrderId } from '#utils/orderId.js';
import mongoose from 'mongoose';

// Create a new order
export const createOrder = async (req, res) => {
    try {
        const { sellerStoreId, totalAmount, paymentMethod, shippingDetails, products } = req.body;
        const customerId = req.customer._id;

        const customer = await Customer.findById(customerId);
        if (!customer) {
            return res.status(400).json({ message: 'Customer not found' });
        }

        const sellerStore = await SellerStore.findById(sellerStoreId);
        if (!sellerStore) {
            return res.status(400).json({ message: 'Seller store not found' });
        }

        // Validate products
        for (const product of products) {
            const item = await Item.findById(product.item);
            if (!item) {
                return res.status(400).json({ message: `Item with id ${product.item} not found` });
            }
        }

        // Create a new order document
        const newOrder = new Order({
            orderId: generateCustomOrderId(), // Generate a unique order ID
            customer: customerId,
            sellerStore: sellerStoreId,
            totalAmount,
            orderStatus: 'Pending', // Default status
            paymentStatus: 'Pending', // Default status
            paymentMethod,
            shippingDetails,
            products: products.map(product => ({
                item: product.item,
                quantity: product.quantity,
                unitPrice: product.unitPrice,
                totalPrice: product.totalPrice,
                variant: product.variant
            }))
        });

        // Save the new order
        await newOrder.save();

        return res.status(201).json({ message: 'Order created successfully', order: newOrder });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Server error' });
    }
};

// Get all orders (optionally filtered by customer or seller)
export const getOrders = async (req, res) => {
    try {
        const { customerId, sellerStoreId, orderStatus } = req.query;

        const filter = {};

        if (customerId) filter.customer = customerId;
        if (sellerStoreId) filter.sellerStore = sellerStoreId;
        if (orderStatus) filter.orderStatus = orderStatus;

        const orders = await Order.find(filter)
            .populate('customer', 'name email')  // Populate customer details
            .populate('sellerStore', 'storeName')  // Populate seller store details
            .populate('products.item', 'name price');  // Populate item details

        return res.status(200).json({ orders });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Server error' });
    }
};

// Get a single order by ID
export const getOrderById = async (req, res) => {
    try {
        const { orderId } = req.params;

        const order = await Order.findById(orderId)
            .populate('customer', 'name email')
            .populate('sellerStore', 'storeName')
            .populate('products.item', 'name price');

        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }

        return res.status(200).json({ order });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Server error' });
    }
};

// Update order status
export const updateOrderStatus = async (req, res) => {
    try {
        const { orderId } = req.params;
        const { orderStatus, paymentStatus } = req.body;

        // Ensure valid status values
        const validOrderStatuses = ['Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled', 'Returned', 'Completed'];
        const validPaymentStatuses = ['Pending', 'Completed', 'Failed'];

        if (orderStatus && !validOrderStatuses.includes(orderStatus)) {
            return res.status(400).json({ message: 'Invalid order status' });
        }

        if (paymentStatus && !validPaymentStatuses.includes(paymentStatus)) {
            return res.status(400).json({ message: 'Invalid payment status' });
        }

        const order = await Order.findByIdAndUpdate(orderId, {
            orderStatus: orderStatus || undefined,
            paymentStatus: paymentStatus || undefined
        }, { new: true });

        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }

        return res.status(200).json({ message: 'Order status updated successfully', order });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Server error' });
    }
};

// Delete an order
export const deleteOrder = async (req, res) => {
    try {
        const { orderId } = req.params;

        const order = await Order.findByIdAndDelete(orderId);

        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }

        return res.status(200).json({ message: 'Order deleted successfully' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Server error' });
    }
};

export const getMyAllOrders = async (req, res) => {
    try {
        const customerId = req.customer._id;

        const orders = await Order.find({ customer: customerId })
            .populate('sellerStore', 'storeName')
            .populate('products.item');

        if (!orders || orders.length === 0) {
            return res.status(404).json({ message: 'No orders found for this customer' });
        }

        return res.status(200).json({ orders });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Server error' });
    }
}

export const getMyOrderById = async (req, res) => {
    try {
        const orderId = req.params.orderId;
        const customerId = req.customer._id;

        const order = await Order.findOne({ _id: orderId, customer: customerId })
            .populate('sellerStore', 'storeName')
            .populate('products');

        if (!order) {
            return res.status(404).json({ message: 'Order not found for this customer' });
        }

        return res.status(200).json({ order });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Server error' });
    }
};


export const getSellerStoreOrderCountByStatus = async (req, res) => {
    try {
        // Access sellerStoreId from the request params
        const { sellerStoreId } = req.params;
        
        // Ensure sellerStoreId is an ObjectId (converting from string if necessary)
        const sellerStoreObjectId = new mongoose.Types.ObjectId(sellerStoreId); // No 'new' required

        // Aggregation to get order counts by status
        const orderCounts = await Order.aggregate([
            { $match: { sellerStore: sellerStoreObjectId } }, // Match orders for the sellerStore
            {
                $group: {
                    _id: '$orderStatus', // Group by order status
                    count: { $sum: 1 } // Count the number of orders per status
                }
            }
        ]);

        // Prepare the result object with order statuses as keys and counts as values
        const result = orderCounts.reduce((acc, curr) => {
            acc[curr._id] = curr.count;
            return acc;
        }, {});

        // Return the result
        return res.status(200).json({ orderCounts: result });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Server error' });
    }
};

export const getSellerStoreOrdersByStatus = async (req, res) => {
    try {
        const { sellerStoreId, orderStatus } = req.params;

        const orders = await Order.find({ sellerStore: sellerStoreId, orderStatus })
            .populate('customer')
            .populate('products.item')
            .sort({ createdAt: -1 }); // Sort by creation date, most recent first


        return res.status(200).json(orders);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Server error' });
    }
}

export const updateOrderStatusById = async (req, res) => {
    try {
        const { orderId } = req.params;
        const { orderStatus } = req.body;

        // Validate status values
        const validOrderStatuses = ['Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled', 'Returned', 'Completed'];
        const validPaymentStatuses = ['Pending', 'Completed', 'Failed'];

        if (orderStatus && !validOrderStatuses.includes(orderStatus)) {
            return res.status(400).json({ message: 'Invalid order status' });
        }

        // if (paymentStatus && !validPaymentStatuses.includes(paymentStatus)) {
        //     return res.status(400).json({ message: 'Invalid payment status' });
        // }

        const order = await Order.findByIdAndUpdate(orderId, {
            orderStatus: orderStatus || undefined
        }, { new: true });

        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }

        return res.status(200).json({ message: 'Order status updated successfully', order });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Server error' });
    }
};

export const getSingleOrder = async (req, res) => {
    try {   
        const { orderId } = req.params;

        const order = await Order.findById(orderId)
            .populate('customer',)
            .populate('sellerStore', 'storeName')
            .populate('products.item');

        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }

        return res.status(200).json({ order });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Server error' });
    }
};