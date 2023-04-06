import { z } from 'zod'

import { publicProcedure, router } from '../trpc'

export const productsRouter = router({
  createProduct: publicProcedure
    .input(
      z.object({
        name: z.string(),
        quantity: z.number(),
      }),
    )
    .mutation(({ input, ctx }) =>
      ctx.productResource.createProduct({
        name: input.name,
        quantity: input.quantity,
      }),
    ),

  deleteProduct: publicProcedure
    .input(
      z.object({
        id: z.string(),
      }),
    )
    .mutation(({ input, ctx }) => ctx.productResource.deleteProduct(input.id)),

  getProduct: publicProcedure
    .input(
      z.object({
        id: z.string(),
      }),
    )
    .query(({ input, ctx }) => ctx.productResource.getProduct(input.id)),
})
