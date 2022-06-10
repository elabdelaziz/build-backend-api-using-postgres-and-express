import Client from '../database'

export type Product = {
  id: number
  title: string
  price: string
  category: string
}

export class ProductStore {
  async index(): Promise<Product[]> {
    try {
      const conn = await Client.connect()
      const sql = 'SELECT * FROM products'
      const result = await conn.query(sql)
      conn.release()
      return result.rows
    } catch (err) {
      throw new Error(`cannot get products :( ${err}`)
    }
  }

  async create(p: Product): Promise<Product> {
    try {
      const conn = await Client.connect()
      const sql =
        'INSERT INTO products (title, price, category) VALUES($1, $2, $3) RETURNING *'

      const result = await conn.query(sql, [p.title, p.price, p.category])

      const product = result.rows[0]
      conn.release()
      return product
    } catch (err) {
      throw new Error(`unable create product (${p.title}): ${err}`)
    }
  }

  async getSingleProduct(id: string): Promise<Product> {
    try {
      const conn = await Client.connect()
      const sql = 'SELECT * FROM products WHERE id=($1)'
      const result = await conn.query(sql, [id])
      conn.release()
      return result.rows[0]
    } catch (err) {
      throw new Error(
        `Error at getting specific product${(err as Error).message}`
      )
    }
  }

  async updateSingleProduct(p: Product): Promise<Product> {
    try {
      const conn = await Client.connect()
      const sql = `UPDATE products SET title=$1, price=$2, category=$3 WHERE id=$4 RETURNING *`
      const result = await conn.query(sql, [p.title, p.price, p.category, p.id])
      conn.release()
      return result.rows[0]
    } catch (err) {
      throw new Error(`Cannot update single product${(err as Error).message}`)
    }
  }

  async deleteSingleProduct(id: string): Promise<Product> {
    try {
      const conn = await Client.connect()
      const sql = `DELETE FROM products WHERE id=($1) RETURNING *`
      const result = await conn.query(sql, [id])
      conn.release()
      return result.rows[0]
    } catch (err) {
      throw new Error(`Cannot delete single product${(err as Error).message}`)
    }
  }
}

export default ProductStore
