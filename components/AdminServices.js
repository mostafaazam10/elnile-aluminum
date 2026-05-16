'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { FiTrash2, FiEdit2, FiPlus } from 'react-icons/fi'

const AdminServices = () => {
  const [services, setServices] = useState([
    {
      id: 1,
      title: 'شبابيك ألوميتال',
      description: 'شبابيك عصرية وآمنة بأعلى جودة وتصاميم متنوعة',
    },
    {
      id: 2,
      title: 'مطابخ ألوميتال',
      description: 'مطابخ فاخرة مع ألوميتال متين وتصاميم حديثة',
    },
    {
      id: 3,
      title: 'مطابخ خشب',
      description: 'مطابخ خشبية فخمة بجودة عالية وتشطيب احترافي',
    },
    {
      id: 4,
      title: 'Dressing Rooms',
      description: 'غرف ملابس فاخرة مع أنظمة تنظيم متقدمة',
    },
    {
      id: 5,
      title: 'أبواب وواجهات',
      description: 'أبواب وواجهات زجاجية بتصاميم عصرية وآمنة',
    },
  ])
  const [editingId, setEditingId] = useState(null)
  const [formData, setFormData] = useState({ title: '', description: '' })
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState('')

  const handleEdit = (service) => {
    setEditingId(service.id)
    setFormData({ title: service.title, description: service.description })
  }

  const handleSave = async () => {
    if (!formData.title.trim() || !formData.description.trim()) {
      return
    }

    setLoading(true)
    try {
      const res = await fetch('/api/admin/services', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: editingId,
          ...formData,
        }),
        credentials: 'include',
      })

      if (res.ok) {
        setServices(
          services.map((s) =>
            s.id === editingId ? { id: editingId, ...formData } : s
          )
        )
        setEditingId(null)
        setFormData({ title: '', description: '' })
        setSuccess('تم تحديث الخدمة')
        setTimeout(() => setSuccess(''), 3000)
      }
    } catch (error) {
      console.error('Error saving service')
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id) => {
    if (!confirm('هل تريد حذف هذه الخدمة؟')) return

    try {
      const res = await fetch(`/api/admin/services/${id}`, {
        method: 'DELETE',
        credentials: 'include',
      })

      if (res.ok) {
        setServices(services.filter((s) => s.id !== id))
        setSuccess('تم حذف الخدمة')
        setTimeout(() => setSuccess(''), 3000)
      }
    } catch (error) {
      console.error('Error deleting service')
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

      {services.map((service) => (
        <motion.div
          key={service.id}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="card space-y-4"
        >
          {editingId === service.id ? (
            <div className="space-y-4">
              <input
                type="text"
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
                className="w-full px-4 py-2 bg-dark border border-gold border-opacity-30 rounded-lg text-white focus:border-gold focus:outline-none"
                placeholder="اسم الخدمة"
              />
              <textarea
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                rows="3"
                className="w-full px-4 py-2 bg-dark border border-gold border-opacity-30 rounded-lg text-white focus:border-gold focus:outline-none"
                placeholder="وصف الخدمة"
              />
              <div className="flex gap-2">
                <button
                  onClick={handleSave}
                  disabled={loading}
                  className="flex-1 btn-gold font-bold py-2 disabled:opacity-50"
                >
                  {loading ? 'جاري الحفظ...' : 'حفظ'}
                </button>
                <button
                  onClick={() => setEditingId(null)}
                  className="flex-1 btn-outline font-bold py-2"
                >
                  إلغاء
                </button>
              </div>
            </div>
          ) : (
            <>
              <div>
                <h4 className="text-lg font-bold text-gold">{service.title}</h4>
                <p className="text-gray-300 mt-2">{service.description}</p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => handleEdit(service)}
                  className="flex-1 flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
                >
                  <FiEdit2 /> تعديل
                </button>
                <button
                  onClick={() => handleDelete(service.id)}
                  className="flex-1 flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors"
                >
                  <FiTrash2 /> حذف
                </button>
              </div>
            </>
          )}
        </motion.div>
      ))}
    </motion.div>
  )
}

export default AdminServices
