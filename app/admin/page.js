'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import AdminLogin from '@/components/AdminLogin'
import AdminDashboard from '@/components/AdminDashboard'

const AdminPage = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await fetch('/api/admin/auth/check', {
          credentials: 'include',
        })
        if (res.ok) {
          setIsAuthenticated(true)
        }
      } catch (error) {
        console.log('Not authenticated')
      } finally {
        setLoading(false)
      }
    }

    checkAuth()
  }, [])

  if (loading) {
    return (
      <div className="h-screen bg-dark flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-gold mx-auto mb-4"></div>
          <p className="text-gold">جاري التحميل...</p>
        </div>
      </div>
    )
  }

  return isAuthenticated ? (
    <AdminDashboard />
  ) : (
    <AdminLogin setIsAuthenticated={setIsAuthenticated} />
  )
}

export default AdminPage
