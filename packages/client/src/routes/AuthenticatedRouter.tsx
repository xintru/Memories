import React from 'react'
import { Routes } from './Router'
import { HomePage } from '../pages/HomePage'
import { Route } from 'react-router-dom'
import { ROUTES } from './routes'
import { EditProfile } from '../pages/EditProfile'

const routes: Routes[] = [
  {
    path: ROUTES.EDIT_PROFILE,
    component: EditProfile,
    exact: false,
  },
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
      {/*<Redirect to={ROUTES.HOME_PAGE} />*/}
    </>
  )
}
