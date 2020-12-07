import React from 'react'
import { Container, List, ListIcon, ListItem } from '@chakra-ui/react'
import { IoIosArrowDroprightCircle } from 'react-icons/all'
import { Logo } from 'components/Logo'
import { UserInfo } from 'components/Menu/UserInfo'
import { Logout } from 'components/auth'

export const Menu = () => {
  return (
    <Container
      w="250px"
      minH="100vh"
      h="100%"
      borderRight="1px"
      borderColor="main.darkblue"
      borderStyle="solid"
      p="1rem"
      boxShadow="0 0 3px 2px rgba(0,0,0,0.2)"
      centerContent
      position="sticky"
      top="0"
    >
      <Logo size="40px" color="main.darkblue" />
      <UserInfo />
      <List spacing={3} width="100%" mb="1rem">
        <ListItem>
          <ListIcon as={IoIosArrowDroprightCircle} color="main.darkblue" />
          Main page
        </ListItem>
        <ListItem>
          <ListIcon as={IoIosArrowDroprightCircle} color="main.darkblue" />
          Other page
        </ListItem>
      </List>
      <Logout />
    </Container>
  )
}
