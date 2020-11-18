import { Box, Button, Center, Input, useToast, VStack } from '@chakra-ui/react'
import React, { FC, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useMutation } from '@apollo/client'
import { useHistory } from 'react-router-dom'
import loginMutation from '../../graphql/auth/login.graphql'
import { EMAIL_REG } from '../../constants/regexps'
import { Logo } from 'components/Logo'
import { paths } from '../../routes/paths'

interface LoginProps {}

export const Login: FC<LoginProps> = () => {
  const { register, handleSubmit, errors } = useForm()
  const toast = useToast()
  const history = useHistory()

  const saveToken = (data) => {
    const { token, expiresAt } = data.login.tokenData
    localStorage.setItem('token', token)
    localStorage.setItem('expiresAt', expiresAt)
    toast({
      title: 'Logged in!',
      status: 'success',
      duration: 2000,
      isClosable: true,
    })
    history.push(paths.MAIN_PAGE)
  }

  const [login] = useMutation(loginMutation, {
    onCompleted: saveToken,
  })

  // TODO: better toasts
  useEffect(() => {
    const hasError = Object.values(errors).length
    if (hasError) {
      toast({
        title: 'Please, check your input data.',
        status: 'error',
        duration: 2000,
        isClosable: true,
      })
    }
  }, [errors])

  const formSubmitHandler = (data) => {
    login({ variables: { ...data } })
  }

  return (
    <Center maxW="100%" h="100vh">
      <Box
        as="form"
        onSubmit={handleSubmit(formSubmitHandler)}
        bg="white"
        p="1rem"
        w="sm"
        borderRadius="lg"
      >
        <VStack spacing={4}>
          <Logo color="main.blue" size="4xl" />
          <Input
            type="text"
            placeholder="Email"
            name="email"
            ref={register({ pattern: EMAIL_REG })}
            isInvalid={errors.email}
          />
          <Input
            type="password"
            placeholder="Password"
            name="password"
            ref={register}
          />
          <Button type="submit">SUBMIT</Button>
        </VStack>
      </Box>
    </Center>
  )
}
