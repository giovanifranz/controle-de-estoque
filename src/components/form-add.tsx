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
import { useCallback } from 'react'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { trpc } from '@/utils/trpc'

const inputSchema = z.object({
  name: z.string().nonempty('Nome é obrigatório'),
})

type FormValues = z.input<typeof inputSchema>

export function FormAdd() {
  const { mutateAsync: createProduct } = trpc.createProduct.useMutation()
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    mode: 'all',
    defaultValues: {
      name: '',
    },
    resolver: zodResolver(inputSchema),
  })

  const onSubmit = useCallback(
    async (values: FormValues) => {
      try {
        await createProduct(values)
        reset()
      } catch (error) {
        console.error(error)
      }
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
          <FormControl
            isInvalid={Boolean(errors.name)}
            color="white"
            display="flex"
            flexDir="column"
            gap={4}
          >
            <Box>
              <FormLabel>Nome:</FormLabel>
              <Input
                color="black"
                bg="white"
                type="text"
                {...register('name')}
              />
              {errors.name ? (
                <FormErrorMessage>{errors.name.message}</FormErrorMessage>
              ) : (
                <FormHelperText color="white">
                  Nome é obrigatório
                </FormHelperText>
              )}
            </Box>
            <Button type="submit" bg="green.300" isLoading={isSubmitting}>
              Adicionar
            </Button>
          </FormControl>
        </form>
      </AbsoluteCenter>
    </Container>
  )
}
