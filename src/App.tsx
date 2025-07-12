
import { Route, Routes } from "react-router"

import Dashboard from "./pages/Dashboard"
import Login from "./pages/Login"
import Register from "./pages/Register"
import AuthRoute from "./routes/AuthRoute"
import GuestRoute from "./routes/GuestRoute"
import React from "react"

function App() {
  const routes = [
    {
      path: '/',
      component: Dashboard,
      guard: AuthRoute
    },
    {
      path: '/login',
      component: Login,
      guard: GuestRoute
    },
     {
      path: '/register',
      component: Register,
    }
  ]
  return (
    <>
      <Routes>
        {routes.map(route => {
          const Guard = route.guard || React.Fragment;
          const Component = route.component || React.Fragment;
          return (
            <Route 
              key={route.path}
              path={route.path}
              element={
                <Guard>
                  <Component />
                </Guard>
              } 
            />
          )
        })}
      </Routes>
    </>
  )
}

export default App