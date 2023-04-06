import axios, { AxiosInstance } from 'axios'

export type Product = {
  id: string
  name: string
  quantity: number
}

export class ProductResource {
  private http: AxiosInstance = axios.create({
    baseURL: 'http://localhost:3000/api',
  })

  async getProduct(id: string) {
    const { data } = await this.http.get<Product>(`/get-product/${id}`)
    return data
  }

  async deleteProduct(id: string) {
    await this.http.delete(`/delete-product/${id}`)
  }

  async createProduct({ name, quantity }: Omit<Product, 'id'>) {
    const { data } = await this.http.post<Product>(`/create-product`, {
      name,
      quantity,
    })
    return data
  }
}

export const productResource = new ProductResource()
