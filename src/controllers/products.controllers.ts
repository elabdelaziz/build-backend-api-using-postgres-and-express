import { NextFunction, Request, Response } from 'express'
import ProductStore from '../models/product'
import config from '../config'

const ProductModel = new ProductStore()

export const index = async (req: Request, res: Response) => {
  try {
    const products = await ProductModel.index()
    res.json({
      status: 'success',
      data: { ...products },
      message: 'displaying all products successfully',
    })
  } catch (err) {
    throw new Error(`cannot get all products${err}`)
  }
}

export const create = async (req: Request, res: Response) => {
  try {
    const product = await ProductModel.create(req.body)
    res.json({
      status: 'success',
      data: { ...product },
      message: 'product created successfully',
    })
  } catch (err) {
    console.log(err)
  }
}

export const getSingleProduct = async (req: Request, res: Response) => {
  try {
    const product = await ProductModel.getSingleProduct(req.params.id as string)
    res.json({
      status: 'success',
      data: { ...product },
      message: 'displaying single product',
    })
  } catch (err) {
    console.log(err)
  }
}

export const updateSingleProduct = async (req: Request, res: Response) => {
  try {
    const product = await ProductModel.updateSingleProduct(req.body)
    res.json({
      status: 'success',
      data: { ...product },
      message: 'product updated successfully',
    })
  } catch (err) {
    console.log(err)
  }
}

export const deleteSingleProduct = async (req: Request, res: Response) => {
  try {
    const product = await ProductModel.deleteSingleProduct(
      req.params.id as string
    )
    res.json({
      status: 'success',
      data: { ...product },
      message: 'product deleted successfully',
    })
  } catch (err) {
    console.log(err)
  }
}
