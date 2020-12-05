import React from 'react'
import { ChakraProvider, CSSReset } from '@chakra-ui/react'
import { Router } from './routes'
import { Layout } from './shared/Layout'
import { theme } from './theme/theme'
import { ApolloConfig } from './graphql/ApolloConfig'
import { CloudinaryContext } from 'cloudinary-react'

import 'focus-visible/dist/focus-visible'

const App: React.FC = () => (
  <ChakraProvider theme={theme}>
    <ApolloConfig>
      <CloudinaryContext cloudName={process.env.CLOUDINARY_NAME}>
        <CSSReset />
        <Layout>
          <Router />
        </Layout>
      </CloudinaryContext>
    </ApolloConfig>
  </ChakraProvider>
)

export default App
