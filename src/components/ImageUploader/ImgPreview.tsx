import { Center } from '@chakra-ui/react'
import React, { useState } from 'react'
import { MdDelete } from 'react-icons/md'
import { lastUploadedImageUrl } from 'graphql/cache'

interface ImgPreviewProps {
  src: string
  alt: string
  isMultiple: boolean
  index?: number
}

export const ImgPreview: React.FC<ImgPreviewProps> = ({
  src,
  alt,
  isMultiple,
  index,
}) => {
  const [showOverlay, setShowOverlay] = useState<boolean>(false)

  const handleShowOverlay = () => setShowOverlay(true)
  const handleHideOverlay = () => setShowOverlay(false)

  const handleDeletePreview = () => {
    if (isMultiple) {
      const prev = lastUploadedImageUrl()
      lastUploadedImageUrl(prev.slice(0, index).concat(prev.slice(index + 1)))
    } else {
      lastUploadedImageUrl([])
    }
  }

  return (
    <Center
      onMouseEnter={handleShowOverlay}
      onMouseLeave={handleHideOverlay}
      position="relative"
    >
      <img src={src} alt={alt} />
      {showOverlay && (
        <Center
          backgroundColor="rgba(0, 0, 0, 0.5)"
          position="absolute"
          h="100%"
          w="100%"
          zIndex="1001"
          onClick={handleDeletePreview}
        >
          <MdDelete color="white" size={isMultiple ? '30px' : '25px'} />
        </Center>
      )}
    </Center>
  )
}
