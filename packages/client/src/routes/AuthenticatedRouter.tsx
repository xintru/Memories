import React from 'react'
import { Routes } from './Router'
import { HomePage } from '../pages/HomePage'
import { Route } from 'react-router-dom'

const routes: Routes[] = [
  {
    path: '/',
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
    </>
  )
}
