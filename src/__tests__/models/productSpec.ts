import ProductStore, { Product } from '../../models/product'
import db from '../../database'

const productStore = new ProductStore()

describe('Tests for Product store', () => {
  const product = {
    title: 'The power of habit',
    price: '23',
    category: 'self dev',
  } as Product

  beforeAll(async () => {
    const newProduct = await productStore.create(product)
    product.id = newProduct.id
  })

  afterAll(async () => {
    const connection = await db.connect()
    const sql = 'DELETE FROM products;'
    await connection.query(sql)
    connection.release()
  })

  it('should create a product', async () => {
    const product = {
      title: 'The power of habit part 2',
      price: '55',
      category: 'self dev',
    } as Product
    const data = await productStore.create(product)
    expect(data).toBeTruthy()
  })

  it('should show all products', async () => {
    const index = await productStore.index()
    expect(index.length).toEqual(3)
  })

  it('should show a specific product', async () => {
    const data = await productStore.getSingleProduct(
      product.id as unknown as string
    )
    expect(data.id).toBe(product.id)
  })

  it('should update product', async () => {
    const updatedproduct = await productStore.updateSingleProduct({
      ...product,
      title: 'Android development',
      price: '11',
      category: 'science',
    })
    expect(updatedproduct.id).toBe(product.id)
    expect(updatedproduct.title).toBe('Android development')
  })

  it('Should delete single product', async () => {
    const data = await productStore.deleteSingleProduct(
      product.id as unknown as string
    )
    expect(data.id).toBe(product.id)
  })
})
