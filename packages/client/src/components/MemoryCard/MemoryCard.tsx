import { Box, Center, Heading, Text } from '@chakra-ui/react'
import React from 'react'
import { HomePageMemory } from '../../pages/HomePage/HomePage'

interface MemoryCardProps {
  memory: HomePageMemory
}

export const MemoryCard: React.FC<MemoryCardProps> = ({ memory }) => {
  return (
    <Box
      h="450px"
      border="1px solid"
      borderColor="main.darkblue"
      borderRadius="0.5rem"
      bg="white"
      p="1rem"
    >
      <Center border="1px solid black" h="300px">
        Carousel here
      </Center>
      <Box>
        <Heading size="lg" mt="0.25rem">
          {memory.name}
        </Heading>
        <Text>{memory.description}</Text>
        <Text>{memory.user.map((user) => user.name)}</Text>
      </Box>
    </Box>
  )
}
