import { Route, Switch } from 'react-router-dom'
import React, { FC } from 'react'
import { Login } from '../pages/auth'
import { paths } from './paths'

interface RouterProps {}

export const Router: FC<RouterProps> = () => {
  return (
    <Switch>
      <Route path={paths.LOGIN}>
        <Login />
      </Route>
    </Switch>
  )
}
