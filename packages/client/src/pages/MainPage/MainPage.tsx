import React, { FC } from 'react'
import { Button, Center, Heading, VStack } from '@chakra-ui/react'

interface MainPageProps {}

export const MainPage: FC<MainPageProps> = () => {
  return (
    <Center h="100vh">
      <VStack spacing={8}>
        <Heading color="white" size="4xl" fontFamily="Dancing Script">
          Memories
        </Heading>
        <Button variant="outline" colorScheme="pink" _hover={{ stroke: 'red' }}>
          Sign up
        </Button>
      </VStack>
    </Center>
  )
}
