import { Route, Switch } from 'react-router-dom'
import React, { FC } from 'react'
import { MainPage } from '../pages/MainPage'
import { paths } from './paths'

interface RouterProps {}

export const Router: FC<RouterProps> = () => {
  return (
    <Switch>
      <Route exact path={paths.MAIN_PAGE} component={MainPage} />
    </Switch>
  )
}
