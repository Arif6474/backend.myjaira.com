import { Router } from "express"
import {
    inviteSeller,
    getAllInvites,
    getSingleInvite,
    deleteInvite
} from "#controllers/userControllers/sellerInviteController.js"
const sellerInviteRoutes = Router()

sellerInviteRoutes.route('/').get(getAllInvites).post(inviteSeller)
sellerInviteRoutes.get('/getSingleInvite/:id', getSingleInvite)
sellerInviteRoutes.delete('/:id', deleteInvite)

export default sellerInviteRoutes
