import {
  AbsoluteCenter,
  Box,
  Button,
  Container,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Heading,
  Input,
} from '@chakra-ui/react'
import { useCallback, useEffect } from 'react'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { trpc } from '@/utils/trpc'

import { Product } from '@/utils/http'

type Props = {
  initialValues?: Product
}

const inputSchema = z.object({
  id: z
    .string()
    .length(20, 'ID do produto tem que ter exatamente 20 caracteres'),
  name: z.string().nonempty('Nome é obrigatório'),
})

type FormValues = z.infer<typeof inputSchema>

const defaultValues = {
  id: '',
  name: '',
}

export function FormRemove({ initialValues = defaultValues }: Props) {
  const { mutateAsync: getProduct } = trpc.getProduct.useMutation()
  const { mutateAsync: deleteProduct } = trpc.deleteProduct.useMutation()
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    mode: 'all',
    defaultValues: initialValues,
    resolver: zodResolver(inputSchema),
  })

  const { id: productId } = watch()

  const handleProduct = useCallback(
    async (id: string) => {
      try {
        const product = await getProduct({ id })
        reset(product)
      } catch (error) {
        console.log(error)
      }
    },
    [getProduct, reset],
  )

  useEffect(() => {
    if (productId.length === 20) {
      handleProduct(productId)
    }
  }, [handleProduct, productId])

  const onSubmit = useCallback(
    async ({ id }: FormValues) => {
      try {
        await deleteProduct({ id })
        reset(defaultValues)
      } catch (error) {
        console.error(error)
      }
    },
    [deleteProduct, reset],
  )

  return (
    <Container as="main" position="relative" maxW="container.lg" h="100vh">
      <AbsoluteCenter>
        <Heading my={4} textAlign="center">
          Remover Produto
        </Heading>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormControl
            isInvalid={Boolean(errors.name) || Boolean(errors.id)}
            color="white"
            display="flex"
            flexDir="column"
            gap={4}
          >
            <Box>
              <FormLabel>ID do Produto:</FormLabel>
              <Input color="black" bg="white" type="text" {...register('id')} />
              {errors.id ? (
                <FormErrorMessage>{errors.id.message}</FormErrorMessage>
              ) : (
                <FormHelperText color="white">
                  ID do produto tem que ter exatamente 20 caracteres
                </FormHelperText>
              )}
            </Box>
            <Box>
              <FormLabel>Nome:</FormLabel>
              <Input color="black" bg="white" {...register('name')} disabled />
              {errors.name ? (
                <FormErrorMessage>{errors.name.message}</FormErrorMessage>
              ) : (
                <FormHelperText color="white">
                  Nome é obrigatório
                </FormHelperText>
              )}
            </Box>
            <Button type="submit" bg="red.300" isLoading={isSubmitting}>
              Remover
            </Button>
          </FormControl>
        </form>
      </AbsoluteCenter>
    </Container>
  )
}
