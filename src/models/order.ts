import Client from '../database'

export type Order = {
  id: number
  status: string
  user_id: number
}

export class OrderStore {
  async create(o: Order): Promise<Order> {
    try {
      const conn = await Client.connect()
      const sql =
        'insert into orders (status, user_id) values($1,$2)RETURNING *;'
      const result = await conn.query(sql, [o.status, o.user_id])
      conn.release()
      return result.rows[0]
    } catch (err) {
      throw new Error(`cannot add new order${err}`)
    }
  }

  async index(): Promise<Order[]> {
    try {
      const conn = await Client.connect()
      const sql = 'select * from orders;'
      const res = await conn.query(sql)
      conn.release()
      return res.rows
    } catch (err) {
      throw new Error(`cannot display orders${err}`)
    }
  }

  async getOne(userId: number): Promise<Order> {
    try {
      const conn = await Client.connect()
      const sql = 'select * from orders where user_id=($1);'
      const res = await conn.query(sql, [userId])
      conn.release()
      return res.rows[0]
    } catch (err) {
      throw new Error(`cannot display single order${err}`)
    }
  }

  async updateOne(o: Order, userId: number): Promise<Order> {
    try {
      const conn = await Client.connect()

      const sql = `UPDATE orders SET status=$1 WHERE user_id=$2 RETURNING *`
      const result = await conn.query(sql, [o.status, userId])
      conn.release()
      return result.rows[0]
    } catch (err) {
      throw new Error(`cannot update order${err}`)
    }
  }

  async deleteOne(id: number): Promise<Order> {
    // console.log(id)
    // console.log('test')
    // console.log(id)
    try {
      const conn = await Client.connect()
      const orderProductsSql = 'DELETE FROM order_products WHERE order_id=$1'

      await conn.query(orderProductsSql, [id])

      const sql = 'DELETE FROM orders WHERE id=$1'
      const result = await conn.query(sql, [id])
      const order = result.rows[0]
      // console.log(order)
      conn.release()
      return order
    } catch (err) {
      throw new Error(`cannot delete order${err}`)
    }
  }

  async addProduct(
    quantity: number,
    orderId: string,
    productId: string
  ): Promise<Order> {
    try {
      const sql =
        'INSERT INTO order_products (quantity, order_id, product_id) VALUES($1, $2, $3) RETURNING *'

      const conn = await Client.connect()

      const result = await conn.query(sql, [quantity, orderId, productId])

      const order = result.rows[0]

      conn.release()

      return order
    } catch (err) {
      throw new Error(
        `Could not add product ${productId} to order ${orderId}: ${err}`
      )
    }
  }
}

export default OrderStore
