"use client"

import { useEffect, useState } from "react"
import DashboardPage from "./components/dashboard/dashboard-page"
import LoginModal from "./components/auth/login-modal"


export default function Home() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [showLoginModal, setShowLoginModal] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // JWT 토큰 확인
    const token = localStorage.getItem("jwt_token")
    setIsAuthenticated(!!token)
    setIsLoading(false)
  }, [])

  const handleLoginRequired = () => {
    setShowLoginModal(true)
  }

  const handleLoginSuccess = () => {
    setIsAuthenticated(true)
    setShowLoginModal(false)
  }

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="h-14 w-14 animate-spin rounded-full border-4 border-blue-600 border-t-transparent mx-auto"></div>
          <p className="mt-5 text-xl font-bold text-gray-700">로딩 중...</p>
        </div>
      </div>
    )
  }

  return (
    <>
      <DashboardPage
        isAuthenticated={isAuthenticated}
        onLoginRequired={handleLoginRequired}
        onLogout={() => setIsAuthenticated(false)}
      />
      <LoginModal
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
        onLoginSuccess={handleLoginSuccess}
      />
    </>
  )
}
