import { Router } from 'express'
import * as controllers from '../../controllers/orders.controllers'
import verifyAuthToken from '../../middleware/verifyToken'

const routes = Router()

routes.route('/').get(controllers.index).post(controllers.create)
routes.route('/:id/products').post(controllers.addProduct)

routes
  .route('/:userId')
  .get(verifyAuthToken, controllers.getOne)
  .put(verifyAuthToken, controllers.updateOne)
routes.route('/:orderId').delete(controllers.deleteOne)

export default routes
