import { Box, Button, Input, useToast, VStack } from '@chakra-ui/react'
import React, { FC, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useMutation } from '@apollo/client'
import loginMutation from 'graphql/auth/login.graphql'
import { EMAIL_REG } from '../../constants/regexps'
import StorageService, { StorageTypes } from '../../services/storage'
import { isLoggedIn } from 'graphql/cache'
import { AuthReturnData } from 'graphql/graphql.types'

interface LoginMutationParams {
  email: string
  password: string
}

interface LoginMutationResponse {
  login: AuthReturnData
}

interface LoginProps {
  onClose: () => void
}

export const Login: FC<LoginProps> = ({ onClose }) => {
  const { register, handleSubmit, errors } = useForm()
  const toast = useToast()

  const loginSuccess = (data: LoginMutationResponse) => {
    const { token, expiresAt } = data.login.tokenData
    const storage = StorageService.Instance

    storage.set(StorageTypes.LOCAL_STORAGE, 'memories_token', token)
    storage.set(StorageTypes.LOCAL_STORAGE, 'expiresAt', expiresAt)
    toast({
      title: 'Logged in!',
      status: 'success',
      duration: 2000,
    })
    isLoggedIn(true)
    onClose()
  }

  const [login] = useMutation<LoginMutationResponse, LoginMutationParams>(
    loginMutation,
    {
      onCompleted: loginSuccess,
    },
  )

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

  const formSubmitHandler = async (data: LoginMutationParams) =>
    await login({ variables: data })

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
