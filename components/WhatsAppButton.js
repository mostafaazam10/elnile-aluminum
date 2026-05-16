'use client'

import { FaWhatsapp } from 'react-icons/fa'
import { useState, useEffect } from 'react'

const WhatsAppButton = () => {
  const [phoneNumber, setPhoneNumber] = useState('201150008855')
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 100)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const fetchPhone = async () => {
      try {
        const res = await fetch('/api/settings/contact')
        const data = await res.json()
        if (data.phoneNumbers && data.phoneNumbers[0]) {
          setPhoneNumber(data.phoneNumbers[0].replace(/^0/, '20'))
        }
      } catch (error) {
        console.log('Using default phone')
      }
    }

    fetchPhone()
  }, [])

  const whatsappLink = `https://wa.me/${phoneNumber}?text=مرحباً، أود الاستفسار عن خدماتكم`

  return (
    <a
      href={whatsappLink}
      target="_blank"
      rel="noopener noreferrer"
      className={`fixed bottom-8 right-8 bg-green-500 hover:bg-green-600 text-white rounded-full p-4 shadow-lg hover:shadow-xl transition-all duration-300 z-40 ${
        isVisible ? 'scale-100' : 'scale-0'
      }`}
      title="تواصل معنا عبر واتساب"
    >
      <FaWhatsapp className="text-3xl" />
    </a>
  )
}

export default WhatsAppButton
