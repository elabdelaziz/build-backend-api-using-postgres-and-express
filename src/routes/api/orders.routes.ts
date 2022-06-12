import { Router } from 'express'
import * as controllers from '../../controllers/orders.controllers'
import verifyAuthToken from '../../middleware/verifyToken'

const routes = Router()

routes.route('/').get(verifyAuthToken, controllers.index).post(verifyAuthToken, controllers.create)
routes.route('/:id/products').post(verifyAuthToken, controllers.addProduct)

routes
  .route('/:userId')
  .get(verifyAuthToken, controllers.getOne)
  .put(verifyAuthToken, controllers.updateOne)
routes.route('/:orderId').delete(verifyAuthToken, controllers.deleteOne)

export default routes
