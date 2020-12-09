import React from 'react'
import { useForm } from 'react-hook-form'
import {
  Box,
  Button,
  Center,
  FormControl,
  FormHelperText,
  FormLabel,
  Heading,
  Input,
  Textarea,
  useToast,
  VStack,
} from '@chakra-ui/react'
import { useHistory } from 'react-router-dom'
import captureMemoryMutation from 'graphql/memories/captureMemoryMutation.graphql'
import AllMemoriesQuery from 'graphql/memories/allMemoriesQuery.graphql'

import { useMutation } from '@apollo/client'
import { ROUTES } from '../../routes/routes'

interface INewMemory {
  name: string
  description: string
}

export const CaptureMemory = () => {
  const { register, handleSubmit } = useForm()
  const toast = useToast()
  const history = useHistory()

  const captureMemorySuccess = () => {
    toast({
      title: 'Memory captured!',
      status: 'success',
      duration: 2000,
    })
    history.push(ROUTES.HOME_PAGE)
  }

  const [captureMemory] = useMutation<INewMemory, INewMemory>(
    captureMemoryMutation,
    {
      onCompleted: captureMemorySuccess,
      refetchQueries: [
        { query: AllMemoriesQuery, variables: { limit: 0, page: 1 } },
      ],
    },
  )

  const submitNewMemory = (newMemory: INewMemory) => {
    captureMemory({ variables: newMemory })
  }

  return (
    <Center minH="100vh">
      <Box w="600px" bg="white" p="1rem" borderRadius="0.25rem">
        <Heading mb="1.5rem">Capture memory</Heading>
        <VStack as="form" spacing={4} onSubmit={handleSubmit(submitNewMemory)}>
          <FormControl id="name" isRequired>
            <FormLabel>Name</FormLabel>
            <Input type="name" name="name" ref={register} />
            <FormHelperText>2-24 symbols.</FormHelperText>
          </FormControl>
          <FormControl id="description" isRequired mb="1rem">
            <FormLabel>Description</FormLabel>
            <Textarea
              type="description"
              name="description"
              ref={register}
              resize="none"
              size="md"
            />
          </FormControl>
          <Button type="submit">Save</Button>
        </VStack>
      </Box>
    </Center>
  )
}
