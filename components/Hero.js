'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'

const Hero = () => {
  const [heroImages, setHeroImages] = useState([
    '/hero1.jpg',
    '/hero2.jpg',
    '/hero3.jpg',
  ])
  const [currentSlide, setCurrentSlide] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroImages.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [heroImages.length])

  useEffect(() => {
    const fetchHeroImages = async () => {
      try {
        const res = await fetch('/api/settings/hero-images')
        const data = await res.json()
        if (data.images) setHeroImages(data.images)
      } catch (error) {
        console.log('Using default hero images')
      }
    }

    fetchHeroImages()
  }, [])

  return (
    <div className="relative w-full h-screen overflow-hidden pt-20 bg-dark">
      {/* Background Images */}
      {heroImages.map((image, idx) => (
        <div
          key={idx}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            idx === currentSlide ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <Image
            src={image}
            alt={`Slide ${idx + 1}`}
            fill
            className="object-cover"
            priority={idx === 0}
          />
          <div className="absolute inset-0 bg-black bg-opacity-40"></div>
        </div>
      ))}

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="absolute inset-0 flex items-center justify-center text-center z-10"
      >
        <div className="px-4">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 drop-shadow-lg">
            <span className="bg-gradient-to-l from-gold to-white bg-clip-text text-transparent">
              ELNILE
            </span>
            <br />
            Aluminum
          </h1>
          <p className="text-xl md:text-2xl text-gray-200 mb-8 drop-shadow-lg max-w-3xl mx-auto">
            حلول ألوميتال عصرية وفاخرة لكل احتياجاتك
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <button className="btn-gold">
              استكشف خدماتنا
            </button>
            <button className="btn-outline">
              تواصل معنا
            </button>
          </div>
        </div>
      </motion.div>

      {/* Slide Indicators */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex gap-3 z-20">
        {heroImages.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentSlide(idx)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              idx === currentSlide
                ? 'bg-gold w-8'
                : 'bg-white bg-opacity-50 hover:bg-opacity-75'
            }`}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  )
}

export default Hero
