import { Route, Routes } from 'react-router-dom'
import { LoginPage } from '../Pages/LoginPage'
import { RegisterPage } from '../Pages/RegisterPage'
import { DashboardPage } from '../Pages/DashboardPage'
import { ProtectedRoutes } from './protectedRoutes'
import { ProfilePage } from '../Pages/ProfilePage'

export const RoutesPages = () => {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route element={<ProtectedRoutes />}>
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/profile" element={<ProfilePage />} />
      </Route>
    </Routes>
  )
}
