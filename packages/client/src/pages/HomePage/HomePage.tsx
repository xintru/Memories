import React from 'react'
import { Button, Center, Text, VStack } from '@chakra-ui/react'
import { useQuery } from '@apollo/client'
import MeQuery from '../../graphql/auth/me.graphql'
import { User } from '../../graphql/graphql.types'
import { isLoggedIn } from '../../graphql/cache'
import StorageService, { StorageTypes } from '../../services/storage'

interface MeQueryResponse {
  me: User
}

export const HomePage = () => {
  const { data, loading } = useQuery<MeQueryResponse>(MeQuery)

  const logout = () => {
    isLoggedIn(false)
    StorageService.Instance.remove(StorageTypes.LOCAL_STORAGE, 'memories_token')
  }

  if (loading) return <div>loading...</div>
  return (
    <Center minH="100vh">
      <VStack spacing={4}>
        <Text>{data?.me.email}</Text>
        <Button onClick={logout}>Logout</Button>
      </VStack>
    </Center>
  )
}
