import React from 'react'
import { Button, Center, Text, VStack } from '@chakra-ui/react'
import { useApolloClient, useQuery, useReactiveVar } from '@apollo/client'
import MeQuery from '../../graphql/auth/me.graphql'
import { User } from '../../graphql/graphql.types'
import { isLoggedIn, lastUploadedImageUrl } from '../../graphql/cache'
import StorageService, { StorageTypes } from '../../services/storage'
import { UploadWidget } from 'components/uploadWidget'

interface MeQueryResponse {
  me: User
}

export const HomePage = () => {
  const apolloClient = useApolloClient()
  const { data, loading } = useQuery<MeQueryResponse>(MeQuery)
  const imgUrl = useReactiveVar(lastUploadedImageUrl)

  const logout = () => {
    isLoggedIn(false)
    StorageService.Instance.remove(StorageTypes.LOCAL_STORAGE, 'memories_token')
    apolloClient.resetStore()
  }

  if (loading) return <div>loading...</div>
  return (
    <Center minH="100vh">
      <VStack spacing={4}>
        <Text>{data?.me.email}</Text>
        <UploadWidget />
        <Text>URL IS: {imgUrl.join(', ')}</Text>
        <Button onClick={logout}>Logout</Button>
      </VStack>
    </Center>
  )
}
