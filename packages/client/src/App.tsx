import React from 'react'
import { ChakraProvider, CSSReset } from '@chakra-ui/react'
import { Router } from './routes'
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client'
import { Layout } from './shared/Layout'
import { theme } from './theme/theme'

import 'focus-visible/dist/focus-visible'

const client = new ApolloClient({
  uri: `http://${process.env.SERVER_HOST}:${process.env.SERVER_PORT}/graphql`,
  cache: new InMemoryCache(),
})

const App: React.FC = () => (
  <ApolloProvider client={client}>
    <ChakraProvider theme={theme}>
      <CSSReset />
      <Layout>
        <Router />
      </Layout>
    </ChakraProvider>
  </ApolloProvider>
)

export default App
