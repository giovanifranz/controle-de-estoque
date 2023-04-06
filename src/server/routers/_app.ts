import { mergeRouters } from '../trpc'

import { productsRouter } from './products'

export const appRouter = mergeRouters(productsRouter)

export type AppRouter = typeof appRouter
