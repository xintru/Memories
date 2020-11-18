import React, { FC } from 'react'
import { Box } from '@chakra-ui/react'

interface LayoutProps {}

export const Layout: FC<LayoutProps> = ({ children }) => {
  return (
    <Box bg="main.pink" minW="100vw" minH="100vh" p="0 3rem">
      {children}
    </Box>
  )
}
