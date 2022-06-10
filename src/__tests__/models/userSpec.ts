import UserStore, { User } from '../../models/user'
import db from '../../database'

const userStore = new UserStore()

describe('Tests for User store', () => {
  const user = {
    email: 'abx@test.com',
    user_name: 'username',
    first_name: 'user jr',
    last_name: 'user',
    password: 'xyz123',
  } as User

  beforeAll(async () => {
    const createdUser = await userStore.create(user)
    user.id = createdUser.id
  })

  it('should create a user', async () => {
    const user = {
      email: 'manga2@gmail.com',
      user_name: 'manga54',
      first_name: 'manga',
      last_name: 'sayed',
      password: 'manga123',
    } as User
    const createdUser = await userStore.create(user)
    user.id = createdUser.id

    expect(createdUser.first_name).toEqual('manga')
  })

  afterAll(async () => {
    const connection = await db.connect()
    const sql = 'DELETE FROM users;'
    await connection.query(sql)
    connection.release()
  })

  it('index should be defined', () => {
    expect(userStore.getAll).toBeDefined()
  })

  it('should show all users', async () => {
    const index = await userStore.getAll()
    expect(index.length).toEqual(2)
  })

  it('should show a specific user', async () => {
    const returnedUser = await userStore.getSingleUser(
      user.id as unknown as string
    )
    expect(returnedUser.id).toBe(user.id)
  })

  it('should update user', async () => {
    const data = await userStore.updateSingleUser({
      ...user,
      user_name: 'hey',
    })
    expect(data.id).toBe(user.id)
    expect(data.email).toBe(user.email)
  })

  it('Should delete single user', async () => {
    const data = await userStore.deleteSingleUser(user.id as unknown as string)
    expect(data.id).toBe(user.id)
  })
})
