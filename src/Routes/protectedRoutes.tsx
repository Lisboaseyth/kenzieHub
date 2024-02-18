import { useEffect } from "react"
import { Navigate, Outlet } from "react-router-dom"

export const ProtectedRoutes = () => {

  const token = localStorage.getItem('@hub:token')

  useEffect(() => {
    !token && (
      localStorage.removeItem('@hub:token')
    )
  }, [token])

  return (
    <>
      {
        token ? (
          <Outlet />
        ) : (
          <Navigate to={'/'} />
        )
      }
    </>
  )
}
