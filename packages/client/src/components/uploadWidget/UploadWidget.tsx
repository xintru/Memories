import React, { useCallback, useMemo } from 'react'
import { Button } from '@chakra-ui/react'
import { lastUploadedImageUrl } from '../../graphql/cache'
import {
  UploadResult,
  WidgetSettings,
  WidgetSources,
} from 'components/uploadWidget/types'
import { widgetStyles } from 'components/uploadWidget/styles'

declare global {
  interface Window {
    cloudinary: {
      createUploadWidget(
        settings: WidgetSettings,
        res: (err: any, result: UploadResult) => void,
      ): { open: () => void }
    }
  }
}

export const UploadWidget = () => {
  const checkUploadResult = useCallback((resultEvent: UploadResult) => {
    if (resultEvent.event === 'success') {
      lastUploadedImageUrl(resultEvent.info.secure_url)
    }
  }, [])

  const widget = useMemo(
    () =>
      window.cloudinary.createUploadWidget(
        {
          cloudName: process.env.CLOUDINARY_NAME,
          uploadPreset: process.env.CLOUDINARY_PRESET,
          sources: [WidgetSources.LOCAL, WidgetSources.URL],
          ...widgetStyles,
        },
        (err, result) => checkUploadResult(result),
      ),
    [],
  )

  const showWidget = useCallback(() => {
    widget.open()
  }, [widget])

  return (
    <div>
      <Button onClick={showWidget}>Upload</Button>
    </div>
  )
}
