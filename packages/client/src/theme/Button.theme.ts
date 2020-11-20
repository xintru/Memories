import { palette } from './palette'

export const Button = {
  baseStyle: {
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
  sizes: {
    sm: {
      fontSize: '12px',
      padding: '16px',
    },
    md: {
      fontSize: '16px',
      padding: '24px',
    },
  },
  variants: {
    outline: {
      border: '1px solid',
      borderColor: palette.main.blue,
      color: palette.main.blue,
      _hover: {
        bg: palette.main.hoverblue,
      },
    },
    solid: {
      bg: palette.main.blue,
      color: 'white',
    },
  },
  defaultProps: {
    size: 'md',
    variant: 'outline',
  },
}
