import { Box, Button, Input, useToast, VStack } from '@chakra-ui/react'
import React, { FC, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useMutation } from '@apollo/client'
import signupMutation from 'graphql/auth/signup.graphql'
import { EMAIL_REG } from '../../constants/regexps'
import StorageService, { StorageTypes } from '../../services/storage'
import { isLoggedIn } from 'graphql/cache'
import { AuthReturnData } from 'graphql/user/user.interfaces'

interface SignupMutationParams {
  email: string
  password: string
  confirmPassword: string
}

interface SignupMutationResponse {
  signup: AuthReturnData
}

interface SignupProps {
  onClose: () => void
}

export const Signup: FC<SignupProps> = ({ onClose }) => {
  const { register, handleSubmit, errors } = useForm()
  const toast = useToast()

  const signupSuccess = (data: SignupMutationResponse) => {
    const { token, expiresAt } = data.signup.tokenData
    const storage = StorageService.Instance

    storage.set(StorageTypes.LOCAL_STORAGE, 'memories_token', token)
    storage.set(StorageTypes.LOCAL_STORAGE, 'expiresAt', expiresAt)
    toast({
      title: 'Signed up!',
      status: 'success',
      duration: 2000,
    })
    isLoggedIn(true)
    onClose()
  }

  const [signup] = useMutation<SignupMutationResponse, SignupMutationParams>(
    signupMutation,
    {
      onCompleted: signupSuccess,
    },
  )

  // TODO: better toasts
  useEffect(() => {
    const hasError = Object.values(errors).length
    if (hasError) {
      toast({
        title: 'Please, use a correct email address to sign up.',
        status: 'error',
        duration: 2000,
      })
    }
  }, [errors])

  const formSubmitHandler = async (data: SignupMutationParams) =>
    await signup({ variables: { ...data } })

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
        <Input
          type="password"
          placeholder="Confirm password"
          name="confirmPassword"
          ref={register}
        />
        <Button type="submit">SUBMIT</Button>
      </VStack>
    </Box>
  )
}
