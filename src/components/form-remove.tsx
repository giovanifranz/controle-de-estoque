import {
  AbsoluteCenter,
  Box,
  Button,
  Container,
  FormControl,
  FormLabel,
  Heading,
  Input,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
} from '@chakra-ui/react'
import { useCallback } from 'react'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { trpc } from '@/utils/trpc'

import { Product } from '@/utils/http'

type Props = {
  initialValues?: Product
}

const inputSchema = z.object({
  id: z.string(),
  name: z.string(),
  quantity: z.number(),
})

type FormValues = z.infer<typeof inputSchema>

const defaultValues = {
  id: '',
  name: '',
  quantity: 0,
}

export function FormRemove({ initialValues = defaultValues }: Props) {
  const { mutateAsync: deleteProduct } = trpc.deleteProduct.useMutation()
  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm<FormValues>({
    defaultValues: initialValues,
    resolver: zodResolver(inputSchema),
  })

  const onSubmit = useCallback(
    async ({ id }: FormValues) => {
      await deleteProduct({ id })
      reset()
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
          <FormControl color="white" display="flex" flexDir="column" gap={4}>
            <Box>
              <FormLabel>ID do Produto:</FormLabel>
              <Input
                color="black"
                bg="white"
                type="text"
                id="id"
                {...register('id')}
              />
            </Box>
            <Box>
              <FormLabel>Nome:</FormLabel>
              <Input
                color="black"
                bg="white"
                type="text"
                {...register('name')}
              />
            </Box>
            <Box>
              <FormLabel>Quantidade: </FormLabel>
              <NumberInput color="black" bg="white">
                <NumberInputField {...register('quantity', { min: 1 })} />
                <NumberInputStepper>
                  <NumberIncrementStepper bg="gray.100" />
                  <NumberDecrementStepper bg="gray.100" />
                </NumberInputStepper>
              </NumberInput>
            </Box>
            <Button type="submit" bg="red.300" disabled={isSubmitting}>
              Remover
            </Button>
          </FormControl>
        </form>
      </AbsoluteCenter>
    </Container>
  )
}
