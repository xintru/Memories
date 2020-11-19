import { Box, Button, Input, useToast, VStack } from '@chakra-ui/react'
import React, { FC, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useMutation } from '@apollo/client'
import signupMutation from '../../graphql/auth/signup.graphql'
import { EMAIL_REG } from '../../constants/regexps'
import StorageService, { StorageTypes } from '../../services/storage'

interface SignupProps {
  onClose: () => void
}

export const Signup: FC<SignupProps> = ({ onClose }) => {
  const { register, handleSubmit, errors } = useForm()
  const toast = useToast()

  const signupSuccess = (data) => {
    const { token, expiresAt } = data.signup.tokenData
    const storage = StorageService.Instance
    storage.set(StorageTypes.LOCAL_STORAGE, 'token', token)
    storage.set(StorageTypes.LOCAL_STORAGE, 'expiresAt', expiresAt)
    toast({
      title: 'Signed up!',
      status: 'success',
      duration: 2000,
    })
    onClose()
  }

  const signupFailed = (err) =>
    toast({
      title: err.message,
      status: 'error',
      duration: 2000,
    })

  const [signup] = useMutation(signupMutation, {
    onCompleted: signupSuccess,
    onError: signupFailed,
  })

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

  const formSubmitHandler = async (data) =>
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
