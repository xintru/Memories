import React from 'react'
import { Routes } from './Router'
import { HomePage } from '../pages/HomePage'
import { Redirect, Route } from 'react-router-dom'
import { ROUTES } from './routes'

const routes: Routes[] = [
  {
    path: ROUTES.HOME_PAGE,
    component: HomePage,
    exact: true,
  },
]

export const AuthenticatedRouter: React.FC = () => {
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
      <Redirect to={ROUTES.HOME_PAGE} />
    </>
  )
}
