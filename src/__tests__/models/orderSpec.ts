import OrderStore, { Order } from '../../models/order'
import UserStore, { User } from '../../models/user'
import ProductStore, { Product } from '../../models/product'
import db from '../../database'

const orderStore = new OrderStore()
const userStore = new UserStore()
const productStore = new ProductStore()

describe('Tests for Order store', () => {
  const newUser = {
    email: 'agww@gmail.com',
    user_name: 'username 2',
    first_name: 'user',
    last_name: 'user parent',
    password: 'xyz123',
  } as User

  const newOrder = {
    status: 'available',
  } as Order

  const newProduct = {
    title: 'The power of habit',
    price: '23',
    category: 'self dev',
  } as Product

  beforeAll(async () => {
    const createdUser = await userStore.create(newUser)
    newUser.id = createdUser.id

    newOrder.user_id = newUser.id
    const createOrder = await orderStore.create(newOrder)
    newOrder.id = createOrder.id

    const createProduct = await productStore.create(newProduct)
    newProduct.id = createProduct.id
  })

  afterAll(async () => {
    const connection = await db.connect()
    const sql = 'DELETE FROM order_products;'
    await connection.query(sql)

    const sql2 = 'DELETE FROM orders;'
    await connection.query(sql2)

    const sql3 = 'DELETE FROM users;'
    await connection.query(sql3)

    connection.release()
  })

  it('Should create a new order', async () => {
    const order = {
      status: 'available',
      user_id: newUser.id,
    } as Order
    const data = await orderStore.create(order)
    expect(data.status).toBeDefined()
  })

  it('should show all orders', async () => {
    const index = await orderStore.index()
    expect(index.length).toEqual(2)
  })

  it('should show a specific order', async () => {
    const data = await orderStore.getOne(newOrder.user_id)
    expect(data.id).toBe(newOrder.id)
  })

  it('should update order', async () => {
    const updatedorder = await orderStore.updateOne(
      {
        ...newOrder,
        status: 'not available',
      },
      newOrder.user_id
    )

    expect(updatedorder.id).toBe(newOrder.id)
  })

  it('should add products to orders', async () => {
    const type = {
      quantity: 1,
      orderId: newOrder.id,
      productId: newProduct.id,
    }
    const data = await orderStore.addProduct(
      1,
      newOrder.id as unknown as string,
      newProduct.id as unknown as string
    )
    expect(data).toBeTruthy
  })

  it('Should delete from order_products', async () => {
    const data = await orderStore.deleteOne(newOrder.id)
    expect(data).toBeFalsy()
  })
})
