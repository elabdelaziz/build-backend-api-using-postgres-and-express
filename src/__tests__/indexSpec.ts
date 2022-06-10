import supertest from 'supertest'
import app from '../server'

const req = supertest(app)

describe('test basic', () => {
  it('get the / endpoint', async () => {
    const response = await req.get('/')
    expect(response.status).toBe(200)
  })
})
