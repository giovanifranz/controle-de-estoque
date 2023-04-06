import { Form } from '@/components'
import type { GetServerSideProps, NextPage } from 'next'

type Props = {
  id?: string | string[]
}

const CreatePage: NextPage<Props> = ({ id }) => {
  return <Form id={id} />
}

export default CreatePage

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const { id } = params || {}
  return {
    props: { id },
  }
}
