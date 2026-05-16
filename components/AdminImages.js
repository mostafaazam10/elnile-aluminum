'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { FiTrash2, FiUpload } from 'react-icons/fi'

const AdminImages = () => {
  const [heroImages, setHeroImages] = useState([
    { id: 1, url: '/hero1.jpg' },
    { id: 2, url: '/hero2.jpg' },
    { id: 3, url: '/hero3.jpg' },
  ])
  const [file, setFile] = useState(null)
  const [uploading, setUploading] = useState(false)
  const [success, setSuccess] = useState('')
  const [error, setError] = useState('')

  const handleFileChange = (e) => {
    const selectedFile = e.target.files?.[0]
    if (selectedFile) {
      setFile(selectedFile)
      setError('')
    }
  }

  const handleUpload = async (e) => {
    e.preventDefault()
    if (!file) {
      setError('يرجى اختيار صورة')
      return
    }

    setUploading(true)
    setError('')
    setSuccess('')

    try {
      const formData = new FormData()
      formData.append('image', file)
      formData.append('type', 'hero')

      const res = await fetch('/api/admin/images/upload', {
        method: 'POST',
        body: formData,
        credentials: 'include',
      })

      if (res.ok) {
        const data = await res.json()
        setHeroImages([...heroImages, { id: Date.now(), url: data.url }])
        setFile(null)
        setSuccess('تم تحميل الصورة بنجاح')
        setTimeout(() => setSuccess(''), 3000)
      } else {
        setError('فشل تحميل الصورة')
      }
    } catch (error) {
      setError('حدث خطأ أثناء التحميل')
    } finally {
      setUploading(false)
    }
  }

  const handleDelete = async (id) => {
    if (!confirm('هل تريد حذف هذه الصورة؟')) return

    try {
      const res = await fetch(`/api/admin/images/${id}`, {
        method: 'DELETE',
        credentials: 'include',
      })

      if (res.ok) {
        setHeroImages(heroImages.filter((img) => img.id !== id))
        setSuccess('تم حذف الصورة')
        setTimeout(() => setSuccess(''), 3000)
      }
    } catch (error) {
      setError('فشل حذف الصورة')
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-8"
    >
      {/* Upload Section */}
      <div className="card">
        <h3 className="text-2xl font-bold text-gold mb-6">تحميل صور جديدة</h3>
        <form onSubmit={handleUpload} className="space-y-4">
          <div className="border-2 border-dashed border-gold border-opacity-30 rounded-lg p-6 text-center hover:border-opacity-50 transition-colors">
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="hidden" id="file-input"
            />
            <label htmlFor="file-input" className="cursor-pointer block">
              <FiUpload className="mx-auto text-4xl text-gold mb-3" />
              <p className="text-white font-medium">
                {file ? file.name : 'اضغط لاختيار صورة'}
              </p>
              <p className="text-gray-400 text-sm mt-2">أو اسحب الصورة هنا</p>
            </label>
          </div>

          {error && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="p-3 bg-red-500 bg-opacity-20 border border-red-500 rounded-lg text-red-400 text-sm text-center"
            >
              {error}
            </motion.div>
          )}

          {success && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="p-3 bg-green-500 bg-opacity-20 border border-green-500 rounded-lg text-green-400 text-sm text-center"
            >
              {success}
            </motion.div>
          )}

          <button
            type="submit"
            disabled={!file || uploading}
            className="w-full btn-gold font-bold py-3 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {uploading ? 'جاري التحميل...' : 'تحميل الصورة'}
          </button>
        </form>
      </div>

      {/* Images Gallery */}
      <div className="card">
        <h3 className="text-2xl font-bold text-gold mb-6">صور الصفحة الرئيسية</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {heroImages.map((image) => (
            <motion.div
              key={image.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="relative h-48 rounded-lg overflow-hidden group"
            >
              <Image
                src={image.url}
                alt="Hero"
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-300"
              />
              <button
                onClick={() => handleDelete(image.id)}
                className="absolute top-2 right-2 bg-red-600 hover:bg-red-700 text-white p-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <FiTrash2 />
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  )
}

export default AdminImages
