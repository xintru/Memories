import React, { FC, useState } from 'react'
import {
  Box,
  Button,
  Center,
  Heading,
  HStack,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
  VStack,
} from '@chakra-ui/react'
import { Login, Signup } from 'components/auth'
import { useQuery } from '@apollo/client'
import MeQuery from '../../graphql/auth/me.graphql'

interface MainPageProps {}

export const MainPage: FC<MainPageProps> = () => {
  const { onOpen, isOpen, onClose } = useDisclosure()
  const [isLogin, setIsLogin] = useState(false)
  const { data } = useQuery(MeQuery)
  // TODO work with this data
  console.log(data?.me.email)

  const openLoginModal = () => {
    setIsLogin(true)
    onOpen()
  }

  const openSignupModal = () => {
    setIsLogin(false)
    onOpen()
  }

  return (
    <Center h="100vh">
      <VStack>
        <Box>
          <Heading
            color="white"
            fontSize="8rem"
            fontFamily="Dancing Script"
            css={{
              lineHeight: '9.6rem !important',
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
            onClick={openSignupModal}
          >
            Sign up
          </Button>
          <Button
            variant="outline"
            colorScheme="pink"
            size="lg"
            onClick={openLoginModal}
          >
            Log in
          </Button>
        </HStack>
      </VStack>
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{isLogin ? 'Login' : 'Sign up'}</ModalHeader>
          <ModalBody>
            {isLogin ? (
              <Login onClose={onClose} />
            ) : (
              <Signup onClose={onClose} />
            )}
          </ModalBody>
        </ModalContent>
      </Modal>
    </Center>
  )
}
