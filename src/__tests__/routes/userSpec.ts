import UserStore, { User } from '../../models/user'
import supertest from 'supertest'
import app from '../../server'
import db from '../../database'

const userModel = new UserStore()

const request = supertest(app)

let token = ''

describe('user Endpoints tests', () => {
  const user = {
    email: 'abxd@gmail.com',
    user_name: 'usernnammee',
    first_name: 'firstname',
    last_name: 'lastname',
    password: 'abc1234',
  } as User

  beforeAll(async () => {
    const createdUser = await userModel.create(user)
    user.id = createdUser.id
  })

  afterAll(async () => {
    const conn = await db.connect()
    const sql = 'DELETE FROM users;'
    await conn.query(sql)
    conn.release()
  })

  it('should get token', async () => {
    const res = await request.post('/api/users/auth').send({
      email: 'abxd@gmail.com',
      password: 'abc1234',
    })
    expect(res.status).toBe(200)
    const { email, token: userToken } = res.body.data
    expect(email).toBe('abxd@gmail.com')
    token = userToken
  })

  it('should create new user', async () => {
    const res = await request
      .post('/api/users/')
      .send({
        email: 'email@mail.com',
        user_name: 'nameuser',
        first_name: 'namefirst',
        last_name: 'namelast',
        password: 'pass123',
      } as User)
    expect(res.status).toBe(200)
    const { user_name } = res.body.data
    expect(user_name).toBe('nameuser')
  })

  it('should get all users', async () => {
    const res = await request
      .get('/api/users/')
      .set('Authorization', `Bearer ${token}`)
    expect(res.status).toBe(200)
    expect(res.body.status).toBe('success')
  })

  it('should get user', async () => {
    const res = await request
      .get(`/api/users/${user.id}`)
      .set('Authorization', `Bearer ${token}`)
    expect(res.status).toBe(200)
    expect(res.body.data.user_name).toBe('usernnammee')
  })

  it('should update user', async () => {
    const res = await request
      .patch(`/api/users/${user.id}`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        ...user,
        user_name: 'zizo',
        first_name: 'zizoo',
        last_name: 'omar',
      })
    expect(res.status).toBe(200)
  })

  it('should delete user', async () => {
    const res = await request
      .delete(`/api/users/${user.id}`)
      .set('Authorization', `Bearer ${token}`)
    expect(res.body.data.user_name).toBe('zizo')
  })
})
