import React, { FC } from 'react'
import { Box, Flex } from '@chakra-ui/react'
import { Menu } from 'components/Menu'
import { useReactiveVar } from '@apollo/client'
import { isLoggedIn } from '../../graphql/cache'

interface LayoutProps {}

export const Layout: FC<LayoutProps> = ({ children }) => {
  const isUserLoggedIn = useReactiveVar(isLoggedIn)
  return (
    <Box bg="main.pink" minW="100vw" minH="100vh">
      <Flex align="flex-start">
        {isUserLoggedIn && <Menu />}
        {children}
      </Flex>
    </Box>
  )
}
