'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

const AdminContact = () => {
  const [phoneNumbers, setPhoneNumbers] = useState([
    '01150008855',
    '01099724612',
    '01111768954',
    '01020606300',
    '01101043475',
    '01220002097',
  ])
  const [newPhone, setNewPhone] = useState('')
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState('')

  const handleAddPhone = async () => {
    if (!newPhone.trim()) return

    setLoading(true)
    try {
      const res = await fetch('/api/admin/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          phoneNumbers: [...phoneNumbers, newPhone],
        }),
        credentials: 'include',
      })

      if (res.ok) {
        setPhoneNumbers([...phoneNumbers, newPhone])
        setNewPhone('')
        setSuccess('تم إضافة الرقم')
        setTimeout(() => setSuccess(''), 3000)
      }
    } catch (error) {
      console.error('Error adding phone')
    } finally {
      setLoading(false)
    }
  }

  const handleDeletePhone = async (phone) => {
    const updated = phoneNumbers.filter((p) => p !== phone)
    try {
      const res = await fetch('/api/admin/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phoneNumbers: updated }),
        credentials: 'include',
      })

      if (res.ok) {
        setPhoneNumbers(updated)
        setSuccess('تم حذف الرقم')
        setTimeout(() => setSuccess(''), 3000)
      }
    } catch (error) {
      console.error('Error deleting phone')
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

      {/* Add Phone */}
      <div className="card">
        <h3 className="text-2xl font-bold text-gold mb-6">إضافة رقم جديد</h3>
        <div className="flex gap-2">
          <input
            type="tel"
            value={newPhone}
            onChange={(e) => setNewPhone(e.target.value)}
            placeholder="أدخل رقم الهاتف"
            className="flex-1 px-4 py-2 bg-dark border border-gold border-opacity-30 rounded-lg text-white focus:border-gold focus:outline-none"
          />
          <button
            onClick={handleAddPhone}
            disabled={!newPhone || loading}
            className="btn-gold px-6 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'جاري...' : 'إضافة'}
          </button>
        </div>
      </div>

      {/* Phone List */}
      <div className="card">
        <h3 className="text-2xl font-bold text-gold mb-6">أرقام التواصل</h3>
        <div className="space-y-2">
          {phoneNumbers.map((phone, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex justify-between items-center p-3 bg-dark rounded-lg border border-gold border-opacity-20"
            >
              <span className="text-white font-medium">{phone}</span>
              <button
                onClick={() => handleDeletePhone(phone)}
                className="text-red-400 hover:text-red-300 transition-colors"
              >
                ✕
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  )
}

export default AdminContact
