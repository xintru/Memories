import React, { FC } from 'react'
import { Box, Button, Center, Heading, HStack, VStack } from '@chakra-ui/react'
import { useHistory } from 'react-router-dom'
import { paths } from '../../routes/paths'

interface MainPageProps {}

export const MainPage: FC<MainPageProps> = () => {
  const history = useHistory()

  const goToSignUpHandler = () => history.push(paths.SIGN_UP)
  const goToLoginHandler = () => history.push(paths.LOGIN)

  return (
    <Center h="100vh">
      <VStack>
        <Box>
          <Heading
            color="white"
            fontSize="8rem"
            fontFamily="Dancing Script"
            css={{
              'line-height': '9.6rem !important',
            }}
          >
            Memories
          </Heading>
        </Box>
        <HStack spacing={4}>
          <Button
            variant="outline"
            colorScheme="pink"
            size="lg"
            onClick={goToSignUpHandler}
          >
            Sign up
          </Button>
          <Button
            variant="outline"
            colorScheme="pink"
            size="lg"
            onClick={goToLoginHandler}
          >
            Log in
          </Button>
        </HStack>
      </VStack>
    </Center>
  )
}
