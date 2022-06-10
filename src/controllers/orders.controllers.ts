import { NextFunction, Request, Response } from 'express'
import orderStore from '../models/order'
import config from '../config'

const OrderModel = new orderStore()

export const create = async (req: Request, res: Response) => {
  try {
    const orders = await OrderModel.create(req.body)
    res.json({
      status: 'success',
      data: { ...orders },
      message: 'created single order successfully',
    })
  } catch (err) {
    throw new Error(`cannot create order${err}`)
  }
}

export const index = async (req: Request, res: Response) => {
  try {
    const orders = await OrderModel.index()
    res.json({
      status: 'success',
      data: { ...orders },
      message: 'displaying all orders successfully',
    })
  } catch (err) {
    throw new Error(`cannot get all orders${err}`)
  }
}

export const getOne = async (req: Request, res: Response) => {
  const userId = req.params.userId
  // console.log(req.params)
  try {
    const order = await OrderModel.getOne(userId as unknown as number)
    res.json({
      status: 'success',
      data: { ...order },
      message: 'displaying all orders successfully',
    })
  } catch (err) {
    throw new Error(`cannot get all orders${err}`)
  }
}

export const updateOne = async (req: Request, res: Response) => {
  const userId = req.params.userId
  try {
    const order = await OrderModel.updateOne(
      req.body,
      userId as unknown as number
    )
    res.json({
      status: 'success',
      data: { ...order },
      message: 'updated single order successfully',
    })
  } catch (err) {
    throw new Error(`cannot update order${err}`)
  }
}

export const deleteOne = async (req: Request, res: Response) => {
  try {
    const order = await OrderModel.deleteOne(
      req.params.orderId as unknown as number
    )
    res.json({
      status: 'success',
      data: { ...order },
      message: 'deleted single order successfully',
    })
  } catch (err) {
    throw new Error(`cannot delete order${err}`)
  }
}

export const addProduct = async (_req: Request, res: Response) => {
  const orderId: string = _req.params.id
  const productId: string = _req.body.productId
  const quantity: number = parseInt(_req.body.quantity)
  try {
    const addedProduct = await OrderModel.addProduct(
      quantity,
      orderId,
      productId
    )
    res.json(addedProduct)
  } catch (err) {
    throw new Error(`cannot get all orders${err}`)
  }
}
