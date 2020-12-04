import React from 'react'
import { Routes } from './Router'
import { Route } from 'react-router-dom'
import { MainPage } from '../pages/MainPage'

const routes: Routes[] = [
  {
    path: '/',
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
    </>
  )
}
