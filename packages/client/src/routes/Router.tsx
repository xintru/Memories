import { Route, Switch } from 'react-router-dom'
import React, { FC } from 'react'
import { MainPage } from '../pages/MainPage'
import { paths } from './paths'
import { useReactiveVar } from '@apollo/client'
import { isLoggedIn } from '../graphql/cache'
import { HomePage } from '../pages/HomePage'

interface RouterProps {}

export const Router: FC<RouterProps> = () => {
  const isUserLoggedIn = useReactiveVar(isLoggedIn)
  return (
    <Switch>
      {isUserLoggedIn ? (
        <Route exact path={paths.MAIN_PAGE} component={HomePage} />
      ) : (
        <Route exact path={paths.MAIN_PAGE} component={MainPage} />
      )}
    </Switch>
  )
}
