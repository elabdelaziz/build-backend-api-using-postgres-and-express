import ProductStore, { Product } from '../../models/product'
import UserStore, { User } from '../../models/user'
import OrderStore, { Order } from '../../models/order'
import supertest from 'supertest'
import app from '../../server'
import db from '../../database'

const productStore = new ProductStore()
const userStore = new UserStore()
const orderStore = new OrderStore()

const request = supertest(app)

let token = ''

describe('order Endpoints tests', () => {
  const user = {
    email: 'testing@gmail.com',
    user_name: 'testusername',
    first_name: 'testname',
    last_name: 'testparent',
    password: 'abc1234',
  } as User

  const product = {
    title: 'the secret 2',
    price: '33',
    category: 'Self dev',
  } as Product

  const newOrder = {
    status: 'available',
  } as Order

  beforeAll(async () => {
    const createdUser = await userStore.create(user)
    user.id = createdUser.id

    const createdProduct = await productStore.create(product)
    product.id = createdProduct.id

    newOrder.user_id = user.id
    const createOrder = await orderStore.create(newOrder)
    newOrder.id = createOrder.id
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

  it('should get token', async () => {
    const res = await request.post('/api/users/auth').send({
      email: 'testing@gmail.com',
      password: 'abc1234',
    })
    expect(res.status).toBe(200)
    const { email, token: userToken } = res.body.data
    expect(email).toBe('testing@gmail.com')
    token = userToken
  })

  it('should create a new order', async () => {
    const res = await request.post('/api/orders/').send({
      status: 'Available',
    } as Order)
    expect(res.status).toBe(200)
  })

  it('should get all orders', async () => {
    const res = await request.get('/api/orders/')
    expect(res.status).toBe(200)
    expect(res.body.status).toBe('success')
  })

  it('should get single order', async () => {
    const res = await request
      .get(`/api/orders/${user.id}`)
      .set('Authorization', `Bearer ${token}`)
    expect(res.status).toBe(200)
    expect(res.body.data.status).toBe('available')
  })

  it('should update order', async () => {
    const res = await request
      .put(`/api/orders/${user.id}`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        ...newOrder,
        status: 'not available',
      })
    expect(res.status).toBe(200)
  })

  it('should delete order', async () => {
    const res = await request.delete(`/api/orders/${newOrder.id}`)
    expect(res.body.data).toBeTruthy()
  })
})
