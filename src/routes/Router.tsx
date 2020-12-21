import { Switch } from 'react-router-dom'
import React, { FC } from 'react'
import { useReactiveVar } from '@apollo/client'
import { isLoggedIn } from 'graphql/cache'
import { AuthenticatedRouter } from './AuthenticatedRouter'
import { NonAuthenticatedRouter } from './NonAuthenticatedRouter'
import { ROUTES } from './routes'

export interface Routes {
  path: ROUTES
  component: any
  exact: boolean
}

interface RouterProps {}

export const Router: FC<RouterProps> = () => {
  const isUserLoggedIn = useReactiveVar(isLoggedIn)
  return (
    <Switch>
      {isUserLoggedIn ? <AuthenticatedRouter /> : <NonAuthenticatedRouter />}
    </Switch>
  )
}
