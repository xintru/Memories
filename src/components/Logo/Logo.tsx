import React, { FC } from 'react'
import { Heading } from '@chakra-ui/react'

interface LogoProps {
  color?: string
  size: string
}

export const Logo: FC<LogoProps> = ({ color = 'white', size = '2xl' }) => {
  return (
    <Heading
      color={color}
      fontSize={size}
      fontFamily="Dancing Script"
      marginBottom="1rem"
    >
      Memories
    </Heading>
  )
}
