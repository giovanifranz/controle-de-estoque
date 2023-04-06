import { FormRemove } from '@/components'
import { Product, productResource } from '@/utils/http'
import type { GetServerSideProps, NextPage } from 'next'

type Props = {
  product: Product | null
}

const RemovePage: NextPage<Props> = ({ product }) => {
  if (product) {
    return <FormRemove initialValues={{ ...product }} />
  }

  return <FormRemove />
}

export default RemovePage

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const { id } = query || {}

  if (typeof id === 'string' && id.trim().length > 0) {
    try {
      const response = await productResource.getProduct(id)

      return {
        props: {
          product: { ...response },
        },
      }
    } catch (error) {
      console.error(error)
    }
  }
  return {
    props: {
      product: null,
    },
  }
}
