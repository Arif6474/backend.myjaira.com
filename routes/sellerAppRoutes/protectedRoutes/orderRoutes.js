import { Router } from 'express'
import { getSellerStoreOrderCountByStatus, getSellerStoreOrdersByStatus, getSingleOrder, updateOrderStatusById } from '#controllers/order/orderController.js'


const orderRoutes = Router()

orderRoutes.get('/getSellerStoreOrderCountByStatus/:sellerStoreId', getSellerStoreOrderCountByStatus)
orderRoutes.get('/getSellerStoreOrdersByStatus/:sellerStoreId/:orderStatus', getSellerStoreOrdersByStatus)
orderRoutes.patch('/updateOrderStatusById/:orderId', updateOrderStatusById)
orderRoutes.get('/getSingleOrder/:orderId', getSingleOrder)


export default orderRoutes