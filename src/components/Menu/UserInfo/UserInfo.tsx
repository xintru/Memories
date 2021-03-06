import React from 'react'
import {
  Avatar,
  Box,
  Container,
  HStack,
  Skeleton,
  Text,
} from '@chakra-ui/react'
import { useQuery } from '@apollo/client'
import UserInfoQuery from 'graphql/user/userInfoQuery.graphql'
import { User } from 'graphql/user/user.interfaces'

interface UserInfoQueryResponse {
  me: {
    avatar_url: User['avatar_url']
    name: User['name']
    email: User['email']
  }
}

export const UserInfo = () => {
  const { data, loading } = useQuery<UserInfoQueryResponse>(UserInfoQuery)

  if (loading) return <Skeleton height="48px" />
  return (
    <Container w="100%" mb="1.25rem">
      <HStack>
        <Avatar src={data.me.avatar_url} name={data.me.name} size="lg" />
        <Box>
          <Text fontSize="1.5rem" fontFamily="Lato">
            {data.me.name}
          </Text>
          <Text fontSize="1rem" fontFamily="Lato">
            {data.me.email}
          </Text>
        </Box>
      </HStack>
    </Container>
  )
}
