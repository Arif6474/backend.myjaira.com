import { Router } from 'express'
import { getSellerStoreOrderCountByStatus, getSellerStoreOrdersByStatus, updateOrderStatusById } from '#controllers/order/orderController.js'


const orderRoutes = Router()

orderRoutes.get('/getSellerStoreOrderCountByStatus/:sellerStoreId', getSellerStoreOrderCountByStatus)
orderRoutes.get('/getSellerStoreOrdersByStatus/:sellerStoreId/:orderStatus', getSellerStoreOrdersByStatus)
orderRoutes.patch('/updateOrderStatusById/:orderId', updateOrderStatusById)


export default orderRoutes