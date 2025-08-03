import { Router } from 'express'
import { checkStoreFollowStatus, createStoreFollower } from '#controllers/storeFollowerController.js'


const storeFollowerRoutes = Router()
storeFollowerRoutes.post('/toggleFollowStore', createStoreFollower)
storeFollowerRoutes.get('/checkStoreFollowStatus', checkStoreFollowStatus)

export default storeFollowerRoutes