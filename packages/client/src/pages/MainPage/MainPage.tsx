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
  Text,
  useDisclosure,
  VStack,
} from '@chakra-ui/react'
import { Login, Signup } from 'components/auth'

interface MainPageProps {}

export const MainPage: FC<MainPageProps> = () => {
  const { onOpen, isOpen, onClose } = useDisclosure()
  const [isLogin, setIsLogin] = useState(false)

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
        <Box
          mt="1rem"
          mb="3rem"
          fontFamily="Lato"
          fontSize="1.75rem"
          color="white"
          fontWeight="bold"
        >
          <Text>
            A place to store your bright memories and share them with close
            people.
          </Text>
        </Box>
        <HStack spacing={4}>
          <Button variant="outline" size="lg" onClick={openSignupModal}>
            Sign up
          </Button>
          <Button variant="outline" size="lg" onClick={openLoginModal}>
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
