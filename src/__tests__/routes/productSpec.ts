import ProductStore, { Product } from '../../models/product'
import UserStore, { User } from '../../models/user'
import supertest from 'supertest'
import app from '../../server'
import db from '../../database'

const productStore = new ProductStore()
const userStore = new UserStore()

const request = supertest(app)

let token = ''

describe('product Endpoints tests', () => {
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

  beforeAll(async () => {
    const createdProduct = await productStore.create(product)
    product.id = createdProduct.id

    const createdUser = await userStore.create(user)
    user.id = createdUser.id
  })

  afterAll(async () => {
    const conn = await db.connect()
    const sql = 'DELETE FROM products;'
    await conn.query(sql)

    const sql2 = 'DELETE FROM users;'
    await conn.query(sql2)
    conn.release()
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

  it('should create a new product', async () => {
    const res = await request
      .post('/api/products/')
      .set('Content-type', 'application/json')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'the secret 3',
        price: '121',
        category: 'Self dev',
      } as Product)
    expect(res.status).toBe(200)
    const { price } = res.body.data
    expect(price).toBe(121)
  })

  it('should get all products', async () => {
    const res = await request
      .get('/api/products/')
      .set('Authorization', `Bearer ${token}`)
    expect(res.status).toBe(200)
    expect(res.body.status).toBe('success')
  })

  it('should get single product', async () => {
    const res = await request
      .get(`/api/users/${user.id}`)
      .set('Authorization', `Bearer ${token}`)
    expect(res.status).toBe(200)
    expect(res.body.data.user_name).toBe('testusername')
  })

  it('should update product', async () => {
    const res = await request
      .patch(`/api/products/${product.id}`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        ...product,
        title: 'the secret 4',
        price: '77',
        category: 'Self Dev',
      })
    expect(res.status).toBe(200)
  })

  it('should delete product', async () => {
    const res = await request
      .delete(`/api/products/${product.id}`)
      .set('Authorization', `Bearer ${token}`)
    expect(res.body.data.title).toBe('the secret 4')
  })
})
