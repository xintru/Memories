import React from 'react'
import { ChakraProvider, CSSReset } from '@chakra-ui/react'
import { Router } from './routes'
import { Layout } from 'components/Layout'
import { theme } from './theme/theme'
import { ApolloConfig } from 'graphql/ApolloConfig'
import { IconContext } from 'react-icons'
import 'focus-visible/dist/focus-visible'

const App: React.FC = () => (
  <ChakraProvider theme={theme}>
    <ApolloConfig>
      <IconContext.Provider value={{ color: theme.colors.main.darkblue }}>
        <CSSReset />
        <Layout>
          <Router />
        </Layout>
      </IconContext.Provider>
    </ApolloConfig>
  </ChakraProvider>
)

export default App
