import React from 'react'
import {
  Box,
  Button,
  Center,
  FormControl,
  FormHelperText,
  FormLabel,
  Heading,
  Input,
  useToast,
  VStack,
} from '@chakra-ui/react'
import { ImageUploader } from 'components/ImageUploader'
import { useForm } from 'react-hook-form'
import EditProfileQuery from 'graphql/user/editProfileQuery.graphql'
import EditProfileMutation from 'graphql/user/editProfileMutation.graphql'
import { useMutation, useQuery } from '@apollo/client'
import { lastUploadedImageUrl } from 'graphql/cache'

interface IEditForm {
  name: string
  email: string
}

interface EditProfileParams {
  name: string
  email: string
  avatar_url: string
}

export const EditProfile: React.FC = () => {
  const { register, handleSubmit } = useForm()
  const { data, refetch } = useQuery(EditProfileQuery)
  const toast = useToast()

  const editProfileSuccess = () => {
    refetch()
    toast({
      title: 'Successfully changed you profile info!',
      status: 'success',
      duration: 2000,
    })
    lastUploadedImageUrl([])
  }

  const [editProfile] = useMutation<boolean, EditProfileParams>(
    EditProfileMutation,
    {
      onCompleted: editProfileSuccess,
    },
  )

  const submitEditProfile = ({ name, email }: IEditForm) => {
    editProfile({
      variables: {
        name,
        email,
        avatar_url: lastUploadedImageUrl()[0] || data?.me.avatar_url || '',
      },
    })
  }

  return (
    <Center minH="100vh">
      <Box w="600px" bg="white" p="1rem" borderRadius="0.25rem">
        <Heading mb="1.5rem">Edit profile</Heading>
        <VStack
          as="form"
          spacing={4}
          onSubmit={handleSubmit(submitEditProfile)}
        >
          <FormControl id="name" isRequired>
            <FormLabel>Name</FormLabel>
            <Input
              type="name"
              name="name"
              ref={register}
              defaultValue={data?.me.name}
            />
            <FormHelperText>2-16 symbols.</FormHelperText>
          </FormControl>
          <FormControl id="email" isRequired mb="1rem">
            <FormLabel>Email address</FormLabel>
            <Input
              type="email"
              name="email"
              ref={register}
              defaultValue={data?.me.email}
            />
            <FormHelperText>Be sure to use your real email.</FormHelperText>
          </FormControl>
          <Center w="100%">
            <ImageUploader w="50%" h="200px" />
          </Center>
          <Button type="submit">Save</Button>
        </VStack>
      </Box>
    </Center>
  )
}
