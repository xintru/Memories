import React from 'react'
import { Center, Grid } from '@chakra-ui/react'
import { useQuery } from '@apollo/client'
import AllMemoriesQuery from 'graphql/memories/allMemoriesQuery.graphql'
import { Memory, User } from 'graphql/graphql.types'
import { MemoryCard } from 'components/MemoryCard'

export interface HomePageMemory {
  name: Memory['name']
  description: Memory['description']
  user: {
    name: User['name']
  }[]
  created: Memory['created']
}

interface AllMemoriesResponse {
  allMemories: HomePageMemory[]
}

interface AllMemoriesParams {
  limit: number
  page: number
}

export const HomePage = () => {
  const { data, loading, refetch } = useQuery<
    AllMemoriesResponse,
    AllMemoriesParams
  >(AllMemoriesQuery, {
    variables: { limit: 0, page: 1 },
  })

  if (loading)
    return (
      <Center w="100%">
        <div>loading...</div>
      </Center>
    )
  return (
    <Center w="100%">
      <Grid
        templateColumns="repeat(3, 1fr)"
        p="3rem"
        gap={8}
        mt="1rem"
        mb="1rem"
        w="100%"
      >
        {data.allMemories.map((memory, i) => (
          <MemoryCard memory={memory} key={`home-memory_${i}`} />
        ))}
      </Grid>
    </Center>
  )
}
