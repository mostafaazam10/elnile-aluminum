'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'

const AdminInstallments = () => {
  const [installments, setInstallments] = useState([
    {
      duration: '12',
      interest: '0%',
      advance: '0%',
      admin: '0%',
    },
  ])
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState('')

  const handleSave = async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/admin/installments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ installments }),
        credentials: 'include',
      })

      if (res.ok) {
        setSuccess('تم حفظ خطط التقسيط')
        setTimeout(() => setSuccess(''), 3000)
      }
    } catch (error) {
      console.error('Error saving installments')
    } finally {
      setLoading(false)
    }
  }

  const updateInstallment = (idx, field, value) => {
    const updated = [...installments]
    updated[idx] = { ...updated[idx], [field]: value }
    setInstallments(updated)
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

      {installments.map((plan, idx) => (
        <motion.div
          key={idx}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="card space-y-4"
        >
          <h3 className="text-lg font-bold text-gold">خطة التقسيط {idx + 1}</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                المد�� (بالشهور)
              </label>
              <input
                type="text"
                value={plan.duration}
                onChange={(e) => updateInstallment(idx, 'duration', e.target.value)}
                className="w-full px-4 py-2 bg-dark border border-gold border-opacity-30 rounded-lg text-white focus:border-gold focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                الفوائد
              </label>
              <input
                type="text"
                value={plan.interest}
                onChange={(e) => updateInstallment(idx, 'interest', e.target.value)}
                className="w-full px-4 py-2 bg-dark border border-gold border-opacity-30 rounded-lg text-white focus:border-gold focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                المقدم
              </label>
              <input
                type="text"
                value={plan.advance}
                onChange={(e) => updateInstallment(idx, 'advance', e.target.value)}
                className="w-full px-4 py-2 bg-dark border border-gold border-opacity-30 rounded-lg text-white focus:border-gold focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                الرسوم الإدارية
              </label>
              <input
                type="text"
                value={plan.admin}
                onChange={(e) => updateInstallment(idx, 'admin', e.target.value)}
                className="w-full px-4 py-2 bg-dark border border-gold border-opacity-30 rounded-lg text-white focus:border-gold focus:outline-none"
              />
            </div>
          </div>
        </motion.div>
      ))}

      <button
        onClick={handleSave}
        disabled={loading}
        className="w-full btn-gold font-bold py-3 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? 'جاري الحفظ...' : 'حفظ خطط التقسيط'}
      </button>
    </motion.div>
  )
}

export default AdminInstallments
