import axios, { AxiosInstance } from 'axios'

export type Product = {
  id: string
  name: string
}

export class ProductResource {
  private http: AxiosInstance = axios.create({
    baseURL: `${
      process.env.ENV_TYPE === 'development'
        ? 'http://localhost:3000'
        : `https://${process.env.VERCEL_URL}`
    } + /api`,
  })

  async getProduct(id: string) {
    const { data } = await this.http.get<Product>(`/get-product/${id}`)
    return data
  }

  async deleteProduct(id: string) {
    await this.http.delete(`/delete-product/${id}`)
  }

  async createProduct({ name }: Omit<Product, 'id'>) {
    const { data } = await this.http.post<Product>(`/create-product`, {
      name,
    })
    return data
  }
}

export const productResource = new ProductResource()
