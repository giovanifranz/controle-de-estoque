import type { AppType } from 'next/app'
import { ChakraProvider, CSSReset } from '@chakra-ui/react'
import theme from '@/styles/theme'
import { Analytics } from '@vercel/analytics/react'
import { trpc } from '@/utils/trpc'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

const App: AppType = ({ Component, pageProps }) => {
  return (
    <ChakraProvider theme={theme}>
      <CSSReset />
      <Component {...pageProps} />
      <Analytics />
      <ReactQueryDevtools />
    </ChakraProvider>
  )
}

export default trpc.withTRPC(App)
