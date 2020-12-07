import { isLoggedIn } from '../../graphql/cache'
import StorageService, { StorageTypes } from '../../services/storage'
import { useApolloClient } from '@apollo/client'
import { Button } from '@chakra-ui/react'
import React from 'react'

export const Logout = () => {
  const apolloClient = useApolloClient()

  const logout = () => {
    isLoggedIn(false)
    StorageService.Instance.remove(StorageTypes.LOCAL_STORAGE, 'memories_token')
    apolloClient.resetStore()
  }
  return (
    <Button size="sm" onClick={logout}>
      Logout
    </Button>
  )
}
