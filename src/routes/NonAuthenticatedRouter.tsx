import React from 'react'
import { Routes } from './Router'
import { Redirect, Route } from 'react-router-dom'
import { MainPage } from '../pages/MainPage'
import { ROUTES } from './routes'

const routes: Routes[] = [
  {
    path: ROUTES.MAIN_PAGE,
    component: MainPage,
    exact: true,
  },
]

export const NonAuthenticatedRouter: React.FC = () => {
  return (
    <>
      {routes.map(({ path, component, exact }, i) => (
        <Route
          path={path}
          component={component}
          exact={exact}
          key={`non_auth_router_${i + 1}`}
        />
      ))}
      <Redirect to={ROUTES.MAIN_PAGE} />
    </>
  )
}
