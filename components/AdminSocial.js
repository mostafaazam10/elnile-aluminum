'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { FaFacebook } from 'react-icons/fa'

const AdminSocial = () => {
  const [facebook, setFacebook] = useState('https://www.facebook.com/share/1ZE1EWNhxQ/')
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState('')

  const handleSave = async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/admin/social', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          socialLinks: {
            facebook,
          },
        }),
        credentials: 'include',
      })

      if (res.ok) {
        setSuccess('تم حفظ روابط التواصل الاجتماعي')
        setTimeout(() => setSuccess(''), 3000)
      }
    } catch (error) {
      console.error('Error saving social links')
    } finally {
      setLoading(false)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      {success && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="p-4 bg-green-500 bg-opacity-20 border border-green-500 rounded-lg text-green-400 text-center"
        >
          {success}
        </motion.div>
      )}

      <div className="card">
        <div className="flex items-center gap-3 mb-6">
          <FaFacebook className="text-4xl text-blue-600" />
          <h3 className="text-2xl font-bold text-gold">فيسبوك</h3>
        </div>
        <input
          type="url"
          value={facebook}
          onChange={(e) => setFacebook(e.target.value)}
          placeholder="أدخل رابط صفحة فيسبوك"
          className="w-full px-4 py-2 bg-dark border border-gold border-opacity-30 rounded-lg text-white focus:border-gold focus:outline-none mb-4"
        />
        <button
          onClick={handleSave}
          disabled={loading}
          className="w-full btn-gold font-bold py-3 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? 'جاري الحفظ...' : 'حفظ'}
        </button>
      </div>
    </motion.div>
  )
}

export default AdminSocial
