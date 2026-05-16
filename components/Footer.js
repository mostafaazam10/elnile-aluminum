'use client'

import Link from 'next/link'
import { FaFacebook, FaPhone, FaMapMarkerAlt } from 'react-icons/fa'
import { useState, useEffect } from 'react'

const Footer = () => {
  const [phoneNumbers, setPhoneNumbers] = useState([
    '01150008855',
    '01099724612',
    '01111768954',
    '01020606300',
    '01101043475',
    '01220002097',
  ])
  const [socialLinks, setSocialLinks] = useState({
    facebook: 'https://www.facebook.com/share/1ZE1EWNhxQ/',
  })

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('/api/settings/contact')
        const data = await res.json()
        if (data.phoneNumbers) setPhoneNumbers(data.phoneNumbers)
        if (data.socialLinks) setSocialLinks(data.socialLinks)
      } catch (error) {
        console.log('Using default contact info')
      }
    }

    fetchData()
  }, [])

  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-darkGray border-t border-gold border-opacity-20 mt-20">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {/* About */}
          <div>
            <h3 className="text-gold text-xl font-bold mb-4">عن الشركة</h3>
            <p className="text-gray-300 leading-relaxed">
              شركة النيل للألوميتال متخصصة في تصنيع وتركيب أنظمة الألوميتال الحديثة بأعلى جودة وأسعار تنافسية.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-gold text-xl font-bold mb-4">روابط سريعة</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-300 hover:text-gold transition-colors">
                  الرئيسية
                </Link>
              </li>
              <li>
                <Link href="#services" className="text-gray-300 hover:text-gold transition-colors">
                  الخدمات
                </Link>
              </li>
              <li>
                <Link href="#portfolio" className="text-gray-300 hover:text-gold transition-colors">
                  أعمالنا
                </Link>
              </li>
              <li>
                <Link href="#installments" className="text-gray-300 hover:text-gold transition-colors">
                  التقسيط
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-gold text-xl font-bold mb-4">تواصل معنا</h3>
            <div className="space-y-3">
              {phoneNumbers.slice(0, 3).map((phone, idx) => (
                <a
                  key={idx}
                  href={`tel:${phone}`}
                  className="flex items-center gap-2 text-gray-300 hover:text-gold transition-colors"
                >
                  <FaPhone className="text-gold" />
                  {phone}
                </a>
              ))}
              {socialLinks.facebook && (
                <a
                  href={socialLinks.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-gray-300 hover:text-gold transition-colors"
                >
                  <FaFacebook className="text-gold" />
                  تابعنا على فيسبوك
                </a>
              )}
            </div>
          </div>
        </div>

        <div className="border-t border-gold border-opacity-20 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            © {currentYear} ELNILE Aluminum. جميع الحقوق محفوظة.
          </p>
          <p className="text-gray-400 text-sm mt-4 md:mt-0">
            تم التطوير بواسطة <span className="text-gold">Professional Team</span>
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
