import { Box, Button, Input, useToast, VStack } from '@chakra-ui/react'
import React, { FC, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useMutation } from '@apollo/client'
import loginMutation from '../../graphql/auth/login.graphql'
import { EMAIL_REG } from '../../constants/regexps'
import StorageService, { StorageTypes } from '../../services/storage'

interface LoginProps {
  onClose: () => void
}

export const Login: FC<LoginProps> = ({ onClose }) => {
  const { register, handleSubmit, errors } = useForm()
  const toast = useToast()

  const loginSuccess = (data) => {
    const { token, expiresAt } = data.login.tokenData
    const storage = StorageService.Instance
    storage.set(StorageTypes.LOCAL_STORAGE, 'token', token)
    storage.set(StorageTypes.LOCAL_STORAGE, 'expiresAt', expiresAt)
    toast({
      title: 'Logged in!',
      status: 'success',
      duration: 2000,
    })
    onClose()
  }

  const loginFailed = (err) => {
    toast({
      title: err.message,
      status: 'error',
      duration: 2000,
    })
  }

  const [login] = useMutation(loginMutation, {
    onCompleted: loginSuccess,
    onError: loginFailed,
  })

  // TODO: better toasts
  useEffect(() => {
    const hasError = Object.values(errors).length
    if (hasError) {
      toast({
        title: 'Please, use a correct email address to login.',
        status: 'error',
        duration: 2000,
      })
    }
  }, [errors])

  const formSubmitHandler = async (data) =>
    await login({ variables: { ...data } })

  return (
    <Box
      as="form"
      onSubmit={handleSubmit(formSubmitHandler)}
      bg="white"
      w="sm"
      borderRadius="lg"
    >
      <VStack spacing={4}>
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
  )
}
