import { Button, Input } from '@chakra-ui/react'
import React, { FC } from 'react'
import { useForm } from 'react-hook-form'
import { useMutation } from '@apollo/client'
import loginMutation from '../../graphql/auth/login.graphql'

interface LoginProps {}

export const Login: FC<LoginProps> = () => {
  const { register, handleSubmit } = useForm()
  const [login, { data }] = useMutation(loginMutation)

  return (
    <form onSubmit={handleSubmit(login)}>
      <Input placeholder="Email" name="email" ref={register} />
      <Input placeholder="Password" name="password" ref={register} />
      <Button type="submit">SUBMIT</Button>
      <div>{data?.login?.tokenData?.token || 'NO DATA'}</div>
    </form>
  )
}
