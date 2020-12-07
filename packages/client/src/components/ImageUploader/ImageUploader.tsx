import React, { useRef, useState } from 'react'
import { useReactiveVar } from '@apollo/client'
import { lastUploadedImageUrl } from '../../graphql/cache'
import {
  Box,
  Center,
  ChakraComponent,
  CircularProgress,
  Grid,
  Text,
  VStack,
} from '@chakra-ui/react'
import { MdImage } from 'react-icons/md'
import { CloudinaryUploader } from 'components/ImageUploader/CloudinaryUploader'
import { ImgPreview } from 'components/ImageUploader/ImgPreview'

interface ImageUploaderProps {
  multiple?: boolean
}

export const UploadContext = React.createContext<{
  isPending: boolean
  setIsPending: (pending: boolean) => void
}>({
  isPending: false,
  setIsPending: () => {},
})

export const ImageUploader: ChakraComponent<'div', ImageUploaderProps> = ({
  multiple,
  ...other
}) => {
  const images = useReactiveVar(lastUploadedImageUrl)
  const [isPending, setIsPending] = useState<boolean>(false)
  const inputRef = useRef<HTMLInputElement>(null)

  const openInputModal = () => {
    inputRef.current.click()
  }

  return (
    // @ts-ignore
    <Box
      border="2px"
      borderStyle="dashed"
      borderColor="main.darkblue"
      cursor="pointer"
      {...other}
    >
      <UploadContext.Provider
        value={{
          isPending,
          setIsPending,
        }}
      >
        <CloudinaryUploader ref={inputRef} multiple={multiple} />
        {!images.length && !isPending && (
          <Center onClick={openInputModal} h="100%">
            <VStack spacing={2}>
              <MdImage size="40px" />
              <Text>Select an image to upload</Text>
            </VStack>
          </Center>
        )}
        {!images.length && isPending && (
          <Center h="100%">
            <VStack spacing={2}>
              <CircularProgress isIndeterminate color="main.darkblue" />
              <Text>Uploading...</Text>
            </VStack>
          </Center>
        )}
        {images.length === 1 && (
          <Center
            h="100%"
            border="4px solid rgba(0, 0, 0, 0)"
            overflow="hidden"
          >
            <ImgPreview
              src={images[0]}
              alt="uploaded_image"
              isMultiple={false}
            />
          </Center>
        )}
        {images.length > 1 && (
          <Grid p="4" templateColumns="repeat(3, 1fr)" gap={4}>
            {images.map((image, i) => (
              <ImgPreview
                src={image}
                key={`uploaded_image_${i}`}
                alt={`uploaded_image_${i}`}
                isMultiple={true}
                index={i}
              />
            ))}
          </Grid>
        )}
      </UploadContext.Provider>
    </Box>
  )
}
