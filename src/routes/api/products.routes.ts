import { Router } from 'express'
import * as controllers from '../../controllers/products.controllers'
import verifyAuthToken from '../../middleware/verifyToken'

const routes = Router()

routes
  .route('/')
  .get(controllers.index)
  .post(verifyAuthToken, controllers.create)
routes
  .route('/:id')
  .get(controllers.getSingleProduct)
  .patch(controllers.updateSingleProduct)
  .delete(controllers.deleteSingleProduct)

export default routes
