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

type Props = {
  id?: string | string[]
}

export function Form({ id = '' }: Props) {
  return (
    <Container as="main" position="relative" maxW="container.lg" h="100vh">
      <AbsoluteCenter>
        <Heading my={4} textAlign="center">
          Novo Produto
        </Heading>
        <FormControl color="white" display="flex" flexDir="column" gap={4}>
          <Box>
            <FormLabel>Código:</FormLabel>
            <Input color="black" bg="white" type="text" value={id} />
          </Box>
          <Box>
            <FormLabel>Nome:</FormLabel>
            <Input bg="white" type="text" />
          </Box>
          <Box>
            <FormLabel>Quantidade: </FormLabel>
            <NumberInput bg="white" min={1}>
              <NumberInputField />
              <NumberInputStepper>
                <NumberIncrementStepper bg="gray.100" />
                <NumberDecrementStepper bg="gray.100" />
              </NumberInputStepper>
            </NumberInput>
          </Box>
          <Button type="submit" bg="green.300">
            Salvar
          </Button>
        </FormControl>
      </AbsoluteCenter>
    </Container>
  )
}
