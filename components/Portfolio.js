'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { FiX } from 'react-icons/fi'

const Portfolio = () => {
  const [projects, setProjects] = useState([
    {
      id: 1,
      title: 'مشروع 1',
      category: 'windows',
      image: '/portfolio1.jpg',
      beforeImage: '/portfolio1-before.jpg',
    },
    {
      id: 2,
      title: 'مشروع 2',
      category: 'kitchen',
      image: '/portfolio2.jpg',
      beforeImage: '/portfolio2-before.jpg',
    },
    {
      id: 3,
      title: 'مشروع 3',
      category: 'dressing',
      image: '/portfolio3.jpg',
      beforeImage: '/portfolio3-before.jpg',
    },
  ])
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [selectedProject, setSelectedProject] = useState(null)

  const categories = [
    { id: 'all', label: 'الكل' },
    { id: 'windows', label: 'الشبابيك' },
    { id: 'kitchen', label: 'المطابخ' },
    { id: 'dressing', label: 'غرف الملابس' },
  ]

  const filteredProjects =
    selectedCategory === 'all'
      ? projects
      : projects.filter((p) => p.category === selectedCategory)

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
    <section id="portfolio" className="section bg-darkGray">
      <div className="max-w-7xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="section-title"
        >
          أعمالنا
        </motion.h2>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-4 mb-12"
        >
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-6 py-2 rounded-lg font-bold transition-all duration-300 ${
                selectedCategory === cat.id
                  ? 'btn-gold'
                  : 'btn-outline'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </motion.div>

        {/* Projects Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {filteredProjects.map((project) => (
            <motion.div
              key={project.id}
              variants={itemVariants}
              onClick={() => {
                setSelectedProject(project)
                setLightboxOpen(true)
              }}
              className="relative h-64 rounded-lg overflow-hidden group cursor-pointer"
            >
              <Image
                src={project.image}
                alt={project.title}
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-black bg-opacity-60 group-hover:bg-opacity-40 transition-all duration-300 flex items-center justify-center">
                <h3 className="text-white text-xl font-bold text-center">
                  {project.title}
                </h3>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Lightbox */}
      {lightboxOpen && selectedProject && (
        <div
          className="fixed inset-0 bg-black bg-opacity-95 z-50 flex items-center justify-center p-4"
          onClick={() => setLightboxOpen(false)}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            className="relative max-w-4xl w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setLightboxOpen(false)}
              className="absolute -top-12 -right-12 text-gold hover:text-white text-4xl transition-colors"
            >
              <FiX />
            </button>
            <div className="relative h-96 md:h-[500px] w-full rounded-lg overflow-hidden">
              <Image
                src={selectedProject.image}
                alt={selectedProject.title}
                fill
                className="object-cover"
              />
            </div>
          </motion.div>
        </div>
      )}
    </section>
  )
}

export default Portfolio
