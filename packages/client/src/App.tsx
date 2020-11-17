import React from 'react'
import { ChakraProvider } from '@chakra-ui/react'
import { Router } from './routes'
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client'

const client = new ApolloClient({
  uri: `http://${process.env.SERVER_HOST}:${process.env.SERVER_PORT}/graphql`,
  cache: new InMemoryCache(),
})

const App: React.FC = () => (
  <ApolloProvider client={client}>
    <ChakraProvider>
      <Router />
    </ChakraProvider>
  </ApolloProvider>
)

export default App
