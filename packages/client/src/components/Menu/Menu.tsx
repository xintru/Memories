import React from 'react'
import { Container, List, ListIcon, ListItem } from '@chakra-ui/react'
import { IoIosArrowDroprightCircle } from 'react-icons/io'
import { RiLogoutCircleRFill } from 'react-icons/ri'
import { BsGearFill } from 'react-icons/bs'
import { Logo } from 'components/Logo'
import { UserInfo } from 'components/Menu/UserInfo'
import { useApolloClient } from '@apollo/client'
import { isLoggedIn } from 'graphql/cache'
import StorageService, { StorageTypes } from '../../services/storage'
import { menuItemStyles } from 'components/Menu/style'
import { NavLink } from 'react-router-dom'
import { ROUTES } from '../../routes/routes'
import { MdAddAPhoto } from 'react-icons/md'

export const Menu = () => {
  const apolloClient = useApolloClient()

  const logout = () => {
    isLoggedIn(false)
    StorageService.Instance.remove(StorageTypes.LOCAL_STORAGE, 'memories_token')
    apolloClient.resetStore()
  }

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
      <Logo size="50px" color="main.darkblue" />
      <UserInfo />
      <List spacing={3} width="100%" mb="1rem">
        <ListItem as={NavLink} to={ROUTES.HOME_PAGE} {...menuItemStyles}>
          <ListIcon as={IoIosArrowDroprightCircle} color="main.darkblue" />
          Main page
        </ListItem>
        <ListItem as={NavLink} to={ROUTES.CAPTURE_MEMORY} {...menuItemStyles}>
          <ListIcon as={MdAddAPhoto} color="main.darkblue" />
          Capture new memory
        </ListItem>
        <ListItem as={NavLink} to={ROUTES.EDIT_PROFILE} {...menuItemStyles}>
          <ListIcon as={BsGearFill} color="main.darkblue" />
          Edit profile
        </ListItem>
        <ListItem onClick={logout} {...menuItemStyles}>
          <ListIcon as={RiLogoutCircleRFill} color="main.darkblue" />
          Logout
        </ListItem>
      </List>
    </Container>
  )
}
