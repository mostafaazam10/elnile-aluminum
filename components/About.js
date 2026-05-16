'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'

const About = () => {
  return (
    <section className="section bg-darkGray">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        {/* Image */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="relative h-96 rounded-lg overflow-hidden"
        >
          <Image
            src="/about.jpg"
            alt="عن الشركة"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-dark via-transparent to-transparent"></div>
        </motion.div>

        {/* Content */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="space-y-6"
        >
          <div>
            <h2 className="text-4xl font-bold text-gold mb-4">عن شركة النيل</h2>
            <p className="text-gray-300 leading-relaxed">
              شركة النيل للألوميتال متخصصة في تصنيع وتركيب أنظمة الألوميتال الحديثة
              بأعلى جودة وأسعار تنافسية. نتمتع بخبرة طويلة في المجال وفريق عمل
              محترف ومدرب على أعلى مستوى.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="bg-dark p-4 rounded-lg border border-gold border-opacity-20"
            >
              <p className="text-gold text-3xl font-bold">+500</p>
              <p className="text-gray-300">مشروع مكتمل</p>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="bg-dark p-4 rounded-lg border border-gold border-opacity-20"
            >
              <p className="text-gold text-3xl font-bold">15+</p>
              <p className="text-gray-300">سنة خبرة</p>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="bg-dark p-4 rounded-lg border border-gold border-opacity-20"
            >
              <p className="text-gold text-3xl font-bold">100%</p>
              <p className="text-gray-300">رضا العملاء</p>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="bg-dark p-4 rounded-lg border border-gold border-opacity-20"
            >
              <p className="text-gold text-3xl font-bold">24/7</p>
              <p className="text-gray-300">خدمة العملاء</p>
            </motion.div>
          </div>

          <button className="btn-gold w-full">
            اعرف أكثر عن خدماتنا
          </button>
        </motion.div>
      </div>
    </section>
  )
}

export default About
