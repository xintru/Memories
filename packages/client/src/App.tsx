import React from 'react'
import { ChakraProvider, CSSReset } from '@chakra-ui/react'
import { Router } from './routes'
import { ApolloClient, ApolloProvider, createHttpLink } from '@apollo/client'
import { Layout } from './shared/Layout'
import { theme } from './theme/theme'

import 'focus-visible/dist/focus-visible'
import { setContext } from '@apollo/client/link/context'
import StorageService, { StorageTypes } from './services/storage'
import { initCache } from './graphql/cache'

const httpLink = createHttpLink({
  uri: `http://${process.env.SERVER_HOST}:${process.env.SERVER_PORT}/graphql`,
})

const authLink = setContext((_, { headers }) => {
  const storage = StorageService.Instance
  const token = storage.get(StorageTypes.LOCAL_STORAGE, 'memories_token')
  return {
    headers: {
      ...headers,
      Authorization: token ? `Bearer ${token}` : '',
    },
  }
})

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: initCache(),
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
