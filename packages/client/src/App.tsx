import React from 'react'
import { ChakraProvider, CSSReset } from '@chakra-ui/react'
import { Router } from './routes'
import { Layout } from './shared/Layout'
import { theme } from './theme/theme'
import { ApolloConfig } from './graphql/ApolloConfig'

import 'focus-visible/dist/focus-visible'

const App: React.FC = () => (
  <ChakraProvider theme={theme}>
    <ApolloConfig>
      <CSSReset />
      <Layout>
        <Router />
      </Layout>
    </ApolloConfig>
  </ChakraProvider>
)

export default App
