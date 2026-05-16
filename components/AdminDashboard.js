'use client'

import { useState, useCallback } from 'react'
import { motion } from 'framer-motion'
import {
  FiLogOut,
  FiSettings,
  FiImage,
  FiPhone,
  FiDollarSign,
  FiShare2,
  FiEdit,
  FiGlobe,
} from 'react-icons/fi'
import AdminSettings from './AdminSettings'
import AdminImages from './AdminImages'
import AdminServices from './AdminServices'
import AdminContact from './AdminContact'
import AdminInstallments from './AdminInstallments'
import AdminSocial from './AdminSocial'
import { useRouter } from 'next/navigation'

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('settings')
  const router = useRouter()

  const handleLogout = async () => {
    try {
      await fetch('/api/admin/auth/logout', { method: 'POST', credentials: 'include' })
      localStorage.removeItem('adminToken')
      router.refresh()
    } catch (error) {
      console.error('Logout failed')
    }
  }

  const tabs = [
    { id: 'settings', label: 'الإعدادات', icon: FiSettings, component: AdminSettings },
    { id: 'images', label: 'إدارة الصور', icon: FiImage, component: AdminImages },
    { id: 'services', label: 'الخدمات', icon: FiEdit, component: AdminServices },
    { id: 'contact', label: 'التواصل', icon: FiPhone, component: AdminContact },
    { id: 'installments', label: 'التقسيط', icon: FiDollarSign, component: AdminInstallments },
    { id: 'social', label: 'وسائل التواصل', icon: FiShare2, component: AdminSocial },
  ]

  const activeTabData = tabs.find((tab) => tab.id === activeTab)
  const ActiveComponent = activeTabData?.component

  return (
    <div className="min-h-screen bg-dark pt-20">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex justify-between items-center mb-8"
        >
          <div>
            <h1 className="text-4xl font-bold text-gold">لوحة التحكم</h1>
            <p className="text-gray-400 mt-2">إدارة محتوى الموقع</p>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg transition-colors"
          >
            <FiLogOut /> تسجيل الخروج
          </button>
        </motion.div>

        {/* Navigation Tabs */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="flex gap-2 mb-8 overflow-x-auto pb-4 border-b border-gold border-opacity-20"
        >
          {tabs.map((tab) => {
            const Icon = tab.icon
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'btn-gold'
                    : 'text-gray-400 hover:text-gold border border-gold border-opacity-20'
                }`}
              >
                <Icon /> {tab.label}
              </button>
            )
          })}
        </motion.div>

        {/* Content */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
        >
          {ActiveComponent && <ActiveComponent />}
        </motion.div>
      </div>
    </div>
  )
}

export default AdminDashboard
