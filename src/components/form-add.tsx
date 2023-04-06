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

const inputSchema = z.object({
  name: z.string(),
  quantity: z.number(),
})

type FormValues = z.infer<typeof inputSchema>

export function FormAdd() {
  const { mutateAsync: createProduct } = trpc.createProduct.useMutation()
  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm<FormValues>({
    defaultValues: {
      name: '',
      quantity: 0,
    },
    resolver: zodResolver(inputSchema),
  })

  const onSubmit = useCallback(
    async (values: FormValues) => {
      await createProduct(values)
      reset()
    },
    [createProduct, reset],
  )

  return (
    <Container as="main" position="relative" maxW="container.lg" h="100vh">
      <AbsoluteCenter>
        <Heading my={4} textAlign="center">
          Adicionar Produto
        </Heading>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormControl color="white" display="flex" flexDir="column" gap={4}>
            <Box>
              <FormLabel>Nome:</FormLabel>
              <Input
                color="black"
                bg="white"
                type="text"
                id="name"
                {...register('name')}
              />
            </Box>
            <Box>
              <FormLabel>Quantidade: </FormLabel>
              <NumberInput id="quantity" color="black" bg="white">
                <NumberInputField {...register('quantity', { min: 1 })} />
                <NumberInputStepper>
                  <NumberIncrementStepper bg="gray.100" />
                  <NumberDecrementStepper bg="gray.100" />
                </NumberInputStepper>
              </NumberInput>
            </Box>
            <Button type="submit" bg="green.300" disabled={isSubmitting}>
              Adicionar
            </Button>
          </FormControl>
        </form>
      </AbsoluteCenter>
    </Container>
  )
}
