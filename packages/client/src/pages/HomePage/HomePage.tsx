import React from 'react'
import { Center, Text, VStack } from '@chakra-ui/react'
import { useQuery } from '@apollo/client'
import MyMemoriesQuery from '../../graphql/user/myMemoriesQuery.graphql'
import { User } from '../../graphql/graphql.types'

interface MeQueryResponse {
  me: {
    memories: User['memories']
  }
}

export const HomePage = () => {
  const { data, loading } = useQuery<MeQueryResponse>(MyMemoriesQuery)

  if (loading)
    return (
      <Center w="100%">
        <div>loading...</div>
      </Center>
    )
  return (
    <Center w="100%">
      <VStack spacing={4} mt="1rem" mb="1rem">
        {data.me.memories.map((memory) => (
          <Center
            h="300px"
            w="600px"
            border="2px solid"
            borderColor="main.darkblue"
            borderRadius="0.5rem"
          >
            <Text>{memory.name}</Text>
          </Center>
        ))}
      </VStack>
    </Center>
  )
}
