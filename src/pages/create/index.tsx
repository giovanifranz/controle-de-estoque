import { FormAdd } from '@/components'
import { z } from 'zod'

import type { GetServerSideProps, NextPage } from 'next'

const productSchema = z.object({
  name: z.string(),
  quantity: z.string().transform((value) => Number(value)),
})

type Props = {
  product: z.output<typeof productSchema> | null
}

const CreatePage: NextPage<Props> = ({ product }) => {
  if (product) {
    return <FormAdd initialValues={product} />
  }

  return <FormAdd />
}

export default CreatePage

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const { name, quantity } = query || {}

  try {
    const result = productSchema.parse({ name, quantity })
    return {
      props: {
        product: { ...result },
      },
    }
  } catch (error) {
    console.error(error)
    return {
      props: {
        product: null,
      },
    }
  }
}
