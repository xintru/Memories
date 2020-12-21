import { extendTheme } from '@chakra-ui/react'
import { Button } from './Button.theme'
import { palette } from './palette'

export const theme = extendTheme({
  // @ts-ignore
  colors: {
    ...palette,
  },
  components: {
    Button,
  },
})
