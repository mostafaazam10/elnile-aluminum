'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'

const AdminSettings = () => {
  const [siteName, setSiteName] = useState('ELNILE Aluminum')
  const [siteDescription, setSiteDescription] = useState('')
  const [logo, setLogo] = useState(null)
  const [logoPreview, setLogoPreview] = useState('/logo.png')
  const [favicon, setFavicon] = useState(null)
  const [faviconPreview, setFaviconPreview] = useState('/favicon.ico')
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState('')
  const [error, setError] = useState('')

  useEffect(() => {
    // Fetch current settings
    const fetchSettings = async () => {
      try {
        const res = await fetch('/api/admin/settings', {
          credentials: 'include',
        })
        if (res.ok) {
          const data = await res.json()
          setSiteName(data.siteName || siteName)
          setSiteDescription(data.siteDescription || '')
          setLogoPreview(data.logo || logoPreview)
          setFaviconPreview(data.favicon || faviconPreview)
        }
      } catch (error) {
        console.log('Failed to fetch settings')
      }
    }

    fetchSettings()
  }, [])

  const handleLogoChange = (e) => {
    const file = e.target.files?.[0]
    if (file) {
      setLogo(file)
      const reader = new FileReader()
      reader.onloadend = () => setLogoPreview(reader.result)
      reader.readAsDataURL(file)
    }
  }

  const handleFaviconChange = (e) => {
    const file = e.target.files?.[0]
    if (file) {
      setFavicon(file)
      const reader = new FileReader()
      reader.onloadend = () => setFaviconPreview(reader.result)
      reader.readAsDataURL(file)
    }
  }

  const handleSave = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    setSuccess('')

    try {
      const formData = new FormData()
      formData.append('siteName', siteName)
      formData.append('siteDescription', siteDescription)
      if (logo) formData.append('logo', logo)
      if (favicon) formData.append('favicon', favicon)

      const res = await fetch('/api/admin/settings', {
        method: 'POST',
        body: formData,
        credentials: 'include',
      })

      if (res.ok) {
        setSuccess('تم حفظ الإعدادات بنجاح')
        setLogo(null)
        setFavicon(null)
      } else {
        setError('فشل حفظ الإعدادات')
      }
    } catch (error) {
      setError('حدث خطأ أثناء حفظ الإعدادات')
    } finally {
      setLoading(false)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-8"
    >
      <form onSubmit={handleSave} className="space-y-6">
        {/* Site Name */}
        <div className="card">
          <label className="block text-sm font-medium text-gold mb-2">
            اسم الموقع
          </label>
          <input
            type="text"
            value={siteName}
            onChange={(e) => setSiteName(e.target.value)}
            className="w-full px-4 py-2 bg-dark border border-gold border-opacity-30 rounded-lg text-white focus:border-gold focus:outline-none"
            placeholder="اسم الموقع"
          />
        </div>

        {/* Site Description */}
        <div className="card">
          <label className="block text-sm font-medium text-gold mb-2">
            وصف الموقع
          </label>
          <textarea
            value={siteDescription}
            onChange={(e) => setSiteDescription(e.target.value)}
            rows="4"
            className="w-full px-4 py-2 bg-dark border border-gold border-opacity-30 rounded-lg text-white focus:border-gold focus:outline-none"
            placeholder="وصف موقعك هنا"
          />
        </div>

        {/* Logo */}
        <div className="card">
          <label className="block text-sm font-medium text-gold mb-4">
            شعار الموقع (Logo)
          </label>
          <div className="flex gap-6 items-start">
            <div className="flex-1">
              <input
                type="file"
                accept="image/*"
                onChange={handleLogoChange}
                className="w-full px-4 py-2 bg-dark border border-gold border-opacity-30 rounded-lg text-gray-400 focus:outline-none"
              />
              <p className="text-xs text-gray-400 mt-2">صيغ مدعومة: PNG, JPG, SVG</p>
            </div>
            <div className="w-24 h-24 relative flex-shrink-0 bg-dark rounded-lg border border-gold border-opacity-20">
              <Image
                src={logoPreview}
                alt="Logo Preview"
                fill
                className="object-contain p-2"
              />
            </div>
          </div>
        </div>

        {/* Favicon */}
        <div className="card">
          <label className="block text-sm font-medium text-gold mb-4">
            أيقونة الموقع (Favicon)
          </label>
          <div className="flex gap-6 items-start">
            <div className="flex-1">
              <input
                type="file"
                accept="image/*"
                onChange={handleFaviconChange}
                className="w-full px-4 py-2 bg-dark border border-gold border-opacity-30 rounded-lg text-gray-400 focus:outline-none"
              />
              <p className="text-xs text-gray-400 mt-2">صيغ مدعومة: ICO, PNG, SVG</p>
            </div>
            <div className="w-12 h-12 relative flex-shrink-0 bg-dark rounded-lg border border-gold border-opacity-20">
              <Image
                src={faviconPreview}
                alt="Favicon Preview"
                fill
                className="object-contain p-1"
              />
            </div>
          </div>
        </div>

        {/* Messages */}
        {error && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="p-4 bg-red-500 bg-opacity-20 border border-red-500 rounded-lg text-red-400 text-center"
          >
            {error}
          </motion.div>
        )}

        {success && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="p-4 bg-green-500 bg-opacity-20 border border-green-500 rounded-lg text-green-400 text-center"
          >
            {success}
          </motion.div>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full btn-gold font-bold py-3 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? 'جاري الحفظ...' : 'حفظ الإعدادات'}
        </button>
      </form>
    </motion.div>
  )
}

export default AdminSettings
