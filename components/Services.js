'use client'

import { motion } from 'framer-motion'
import { FiMonitor, FiBox, FiHome, FiGrid, FiDoor } from 'react-icons/fi'
import { useState, useEffect } from 'react'

const Services = () => {
  const defaultServices = [
    {
      id: 1,
      title: 'شبابيك ألوميتال',
      description: 'شبابيك عصرية وآمنة بأعلى جودة وتصاميم متنوعة',
      icon: FiMonitor,
    },
    {
      id: 2,
      title: 'مطابخ ألوميتال',
      description: 'مطابخ فاخرة مع ألوميتال متين وتصاميم حديثة',
      icon: FiBox,
    },
    {
      id: 3,
      title: 'مطابخ خشب',
      description: 'مطابخ خشبية فخمة بجودة عالية وتشطيب احترافي',
      icon: FiHome,
    },
    {
      id: 4,
      title: 'Dressing Rooms',
      description: 'غرف ملابس فاخرة مع أنظمة تنظيم متقدمة',
      icon: FiGrid,
    },
    {
      id: 5,
      title: 'أبواب وواجهات',
      description: 'أبواب وواجهات زجاجية بتصاميم عصرية وآمنة',
      icon: FiDoor,
    },
  ]

  const [services, setServices] = useState(defaultServices)

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const res = await fetch('/api/services')
        const data = await res.json()
        if (data.services) setServices(data.services)
      } catch (error) {
        console.log('Using default services')
      }
    }

    fetchServices()
  }, [])

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
    <section id="services" className="section bg-dark">
      <div className="max-w-7xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="section-title"
        >
          خدماتنا المتميزة
        </motion.h2>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6"
        >
          {services.map((service) => {
            const Icon = service.icon || FiBox
            return (
              <motion.div
                key={service.id}
                variants={itemVariants}
                className="card card-hover group"
              >
                <div className="flex justify-center mb-4">
                  <Icon className="text-5xl text-gold group-hover:scale-110 transition-transform duration-300" />
                </div>
                <h3 className="text-xl font-bold text-center mb-3 text-gold group-hover:text-white transition-colors">
                  {service.title}
                </h3>
                <p className="text-gray-300 text-center text-sm">
                  {service.description}
                </p>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}

export default Services
