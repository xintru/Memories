import React, { useRef } from 'react'
import { Button, useToast } from '@chakra-ui/react'
import { lastUploadedImageUrl } from '../../graphql/cache'
import { cloudinaryUploadService } from 'components/uploadWidget/uploadService'

interface UploadWidgetProps {
  multiple?: boolean
}

const TWO_MEGABYTES = 2097152

export const UploadWidget: React.FC<UploadWidgetProps> = ({ multiple }) => {
  const inputRef = useRef<HTMLInputElement>()
  const toast = useToast()

  const openInputModal = () => {
    inputRef.current.click()
  }

  const onFileUpload = async (evt) => {
    lastUploadedImageUrl([])
    const files = [...evt.target.files]
    if (files.length > 9) {
      return toast({
        title: 'Max amount of files is 9.',
        status: 'error',
        duration: 5000,
      })
    }
    const exceeding = files
      .map((file) => file.size > TWO_MEGABYTES)
      .reduce((acc, val) => acc && val, true)
    if (!exceeding) {
      const res: { secure_url: string }[] = await Promise.all(
        files.map((file) => cloudinaryUploadService(file)),
      )
      lastUploadedImageUrl(res.map((file) => file.secure_url))
    } else {
      toast({
        title:
          'Your file(s) exceeding 2MB limit. Please, choose a different file.',
        status: 'error',
        duration: 5000,
      })
    }
  }

  return (
    <div>
      <input
        type="file"
        style={{ display: 'none' }}
        ref={inputRef}
        onChange={onFileUpload}
        multiple={multiple}
        accept=".jpg,.png,.jpeg,.webp"
      />
      <Button onClick={openInputModal}>Upload</Button>
    </div>
  )
}
