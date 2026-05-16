'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { FaStar } from 'react-icons/fa'

const Testimonials = () => {
  const [testimonials] = useState([
    {
      id: 1,
      name: 'أحمد محمد',
      text: 'عمل احترافي جداً وسريع. الجودة عالية جداً وأسعار مناسبة جداً. أنصح الجميع.',
      rating: 5,
      image: '/testimonial1.jpg',
    },
    {
      id: 2,
      name: 'فاطمة علي',
      text: 'فريق عمل رائع ومحترف. انجزوا العمل قبل الموعد المحدد. شكراً لكم.',
      rating: 5,
      image: '/testimonial2.jpg',
    },
    {
      id: 3,
      name: 'محمود حسن',
      text: 'أفضل شركة ألوميتال في مصر. الخدمة ممتازة والتقسيط سهل جداً.',
      rating: 5,
      image: '/testimonial3.jpg',
    },
  ])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  }

  return (
    <section className="section bg-dark">
      <div className="max-w-7xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="section-title"
        >
          آراء عملائنا
        </motion.h2>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {testimonials.map((testimonial) => (
            <motion.div
              key={testimonial.id}
              variants={itemVariants}
              className="card space-y-4"
            >
              <div className="flex gap-1 justify-center">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <FaStar key={i} className="text-gold text-lg" />
                ))}
              </div>
              <p className="text-gray-300 text-center italic">
                "{testimonial.text}"
              </p>
              <div className="text-center pt-4 border-t border-gold border-opacity-20">
                <p className="text-gold font-bold">{testimonial.name}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export default Testimonials
