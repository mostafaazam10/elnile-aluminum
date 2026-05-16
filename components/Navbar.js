'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { FiMenu, FiX } from 'react-icons/fi'

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [logo, setLogo] = useState('/logo.png')

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    // Fetch logo from admin settings
    const fetchLogo = async () => {
      try {
        const res = await fetch('/api/settings/logo')
        const data = await res.json()
        if (data.logo) setLogo(data.logo)
      } catch (error) {
        console.log('Logo not found')
      }
    }

    fetchLogo()
  }, [])

  const navLinks = [
    { label: 'الرئيسية', href: '/' },
    { label: 'الخدمات', href: '#services' },
    { label: 'أعمالنا', href: '#portfolio' },
    { label: 'التقسيط', href: '#installments' },
    { label: 'تواصل معنا', href: '#contact' },
  ]

  return (
    <nav
      className={`fixed top-0 right-0 left-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-dark bg-opacity-95 backdrop-blur-md shadow-lg'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="w-12 h-12 relative">
              <Image
                src={logo}
                alt="ELNILE Logo"
                fill
                className="object-contain"
              />
            </div>
            <span className="hidden md:inline text-xl font-bold bg-gradient-to-l from-gold to-white bg-clip-text text-transparent">
              ELNILE
            </span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex gap-8 items-center">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-white hover:text-gold transition-colors duration-300 font-medium"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/admin"
              className="btn-gold text-sm"
            >
              لوحة التحكم
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden text-gold text-2xl"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <FiX /> : <FiMenu />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden pb-6 border-t border-gold border-opacity-20">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="block py-3 text-white hover:text-gold transition-colors duration-300 font-medium"
                onClick={() => setIsOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/admin"
              className="block py-3 text-gold font-bold"
              onClick={() => setIsOpen(false)}
            >
              لوحة التحكم
            </Link>
          </div>
        )}
      </div>
    </nav>
  )
}

export default Navbar
