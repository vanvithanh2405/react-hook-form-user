import React from 'react'
import { Navigate } from 'react-router';

function AuthRoute({ children }: React.PropsWithChildren) {
  const access_token = window.localStorage.getItem('access_token');

  if (!access_token) {
    // window.location.href = '/login';
    // return
    return <Navigate to="/login" />
  }

  return (
    <>{children}</>
  )
}

export default AuthRoute