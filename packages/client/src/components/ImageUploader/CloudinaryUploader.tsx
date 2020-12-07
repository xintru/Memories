import React, { ChangeEvent, ForwardedRef, useContext } from 'react'
import { useToast } from '@chakra-ui/react'
import { lastUploadedImageUrl } from '../../graphql/cache'
import { cloudinaryUploadService } from 'components/ImageUploader/upload-api.service'
import { UploadContext } from 'components/ImageUploader/ImageUploader'

interface CloudinaryUploaderProps {
  multiple: boolean
}

const TWO_MEGABYTES = 2097152

export const CloudinaryUploader = React.forwardRef(
  (
    { multiple }: CloudinaryUploaderProps,
    ref: ForwardedRef<HTMLInputElement>,
  ) => {
    const { setIsPending } = useContext(UploadContext)
    const toast = useToast()

    const onFileUpload = async (evt: ChangeEvent<HTMLInputElement>) => {
      setIsPending(true)
      lastUploadedImageUrl([])
      const files = [...evt.target.files]
      if (files.length > 9) {
        setIsPending(false)
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
        setIsPending(false)
      } else {
        setIsPending(false)
        return toast({
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
          ref={ref}
          onChange={onFileUpload}
          multiple={multiple}
          accept=".jpg,.png,.jpeg,.webp"
        />
      </div>
    )
  },
)
