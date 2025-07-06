import { Router } from "express"
import { deleteInvite, getAllInvites,getSingleInvite, inviteEmployee } from "#controllers/userControllers/employeeInviteController.js"

const employeeInviteRoutes = Router()

employeeInviteRoutes.route('/').get(getAllInvites).post(inviteEmployee)
employeeInviteRoutes.get('/getSingleInvite/:id', getSingleInvite)
employeeInviteRoutes.delete('/:id', deleteInvite)

export default employeeInviteRoutes
