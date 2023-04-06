import { productResource } from '@/utils/http'
import type { inferAsyncReturnType } from '@trpc/server'

export async function createContext() {
  return {
    productResource,
  }
}

export type Context = inferAsyncReturnType<typeof createContext>
