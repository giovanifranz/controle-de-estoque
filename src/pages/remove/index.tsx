import { FormRemove } from '@/components'
import { Product, productResource } from '@/utils/http'
import type { GetServerSideProps, NextPage } from 'next'
import { z } from 'zod'

type Props = {
  product: Product | null
}

const RemovePage: NextPage<Props> = ({ product }) => {
  if (product) {
    return <FormRemove initialValues={product} />
  }

  return <FormRemove />
}

export default RemovePage

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const { id } = query || {}

  try {
    const idSchema = z.string().nonempty().length(20)
    const idParsed = idSchema.parse(id)
    return {
      props: {
        product: await productResource.getProduct(idParsed),
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
