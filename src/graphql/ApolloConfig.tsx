import React from 'react'
import {
  ApolloClient,
  ApolloProvider,
  createHttpLink,
  from,
} from '@apollo/client'
import { setContext } from '@apollo/client/link/context'
import StorageService, { StorageTypes } from '../services/storage'
import { onError } from '@apollo/client/link/error'
import { cache } from './cache'
import { useToast } from '@chakra-ui/react'

export const ApolloConfig: React.FC = ({ children }) => {
  const toast = useToast()

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

  const errorLink = onError(({ graphQLErrors, networkError }) => {
    if (graphQLErrors)
      graphQLErrors.map(({ message }) =>
        toast({
          title: message,
          status: 'error',
          duration: 2000,
        }),
      )

    if (networkError) {
      toast({
        title: networkError.message,
        status: 'error',
        duration: 2000,
      })
    }
  })

  const link = from([errorLink, authLink, httpLink])

  const client = new ApolloClient({
    link,
    cache,
  })

  return <ApolloProvider client={client}>{children}</ApolloProvider>
}
