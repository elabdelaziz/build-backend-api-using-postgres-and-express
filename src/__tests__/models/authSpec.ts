// import UserStore, { User } from "../../models/user";
// import db from '../../database'

// const userStore = new UserStore()

// describe('test', () => {
//     it('auth method should be defined', () => {
//         expect(userStore.authenticate).toBeDefined
//     })

//     describe('test auth to equal', ()=>{
//         const user = {
//             email: 'manga2@gmail.com',
//             user_name: 'manga54',
//             first_name:'manga',
//             last_name:'sayed',
//             password:'manga123'
//         } as User;
//         beforeAll(async () => {
//             const createdUser = await userStore.create(user)
//             user.id = createdUser.id
//           })

//         afterAll(async () => {
//             const connection = await db.connect()
//             const sql = 'DELETE FROM users;'
//             await connection.query(sql)
//             connection.release()
//         })

//         it('Authenticate method should return the authenticated user', async () => {
//             const authenticatedUser = await userStore.authenticate(
//             user.email,
//             user.password as string
//         )
//             expect(authenticatedUser?.email).toBe(user.email)
//             expect(authenticatedUser?.first_name).toBe(user.first_name)
//         })
//     })
// })
