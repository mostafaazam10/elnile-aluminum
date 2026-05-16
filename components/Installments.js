'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import {
  FaCreditCard,
  FaBank,
  FaShieldAlt,
  FaSmile,
  FaPhone,
  FaTruck,
} from 'react-icons/fa'

const Installments = () => {
  const banks = [
    { id: 1, name: 'البنك الأهلي', icon: FaBank, color: 'bg-red-600' },
    { id: 2, name: 'بنك مصر', icon: FaBank, color: 'bg-blue-600' },
    { id: 3, name: 'CIB', icon: FaBank, color: 'bg-purple-600' },
    { id: 4, name: 'QNB', icon: FaBank, color: 'bg-green-600' },
  ]

  const installmentPlans = [
    { duration: '12', interest: '0%', advance: '0%', admin: '0%' },
  ]

  const paymentMethods = [
    { name: 'فاليو', icon: FaCreditCard },
    { name: 'أمان', icon: FaShieldAlt },
    { name: 'سهولة', icon: FaSmile },
    { name: 'حالا', icon: FaTruck },
    { name: 'كونتكت', icon: FaPhone },
    { name: 'موجو', icon: FaCreditCard },
  ]

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
    <section id="installments" className="section bg-dark">
      <div className="max-w-7xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="section-title"
        >
          خدمات التقسيط
        </motion.h2>

        {/* Visa Plans */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h3 className="text-2xl font-bold text-gold text-center mb-8">
            بفيزا المشتريات
          </h3>
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {banks.map((bank) => {
              const Icon = bank.icon
              return (
                <motion.div
                  key={bank.id}
                  variants={itemVariants}
                  className="card card-hover flex flex-col items-center"
                >
                  <div className={`${bank.color} p-4 rounded-full mb-4`}>
                    <Icon className="text-white text-3xl" />
                  </div>
                  <h4 className="text-lg font-bold text-center text-white">
                    {bank.name}
                  </h4>
                </motion.div>
              )
            })}
          </motion.div>
        </motion.div>

        {/* Installation Plans */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h3 className="text-2xl font-bold text-gold text-center mb-8">
            شروط التقسيط
          </h3>
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {installmentPlans.map((plan, idx) => (
              <motion.div key={idx} variants={itemVariants} className="card">
                <div className="text-center space-y-4">
                  <div>
                    <p className="text-gray-400 mb-2">مدة التقسيط</p>
                    <p className="text-4xl font-bold text-gold">
                      {plan.duration} شهر
                    </p>
                  </div>
                  <div className="border-t border-gold border-opacity-30 pt-4">
                    <div className="grid grid-cols-3 gap-4">
                      <div>
                        <p className="text-xs text-gray-400">الفوائد</p>
                        <p className="text-xl font-bold text-green-500">
                          {plan.interest}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-400">المقدم</p>
                        <p className="text-xl font-bold text-green-500">
                          {plan.advance}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-400">الرسوم</p>
                        <p className="text-xl font-bold text-green-500">
                          {plan.admin}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Payment Methods */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h3 className="text-2xl font-bold text-gold text-center mb-8">
            طرق الدفع المدعومة
          </h3>
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {paymentMethods.map((method, idx) => {
              const Icon = method.icon
              return (
                <motion.div
                  key={idx}
                  variants={itemVariants}
                  className="card card-hover flex items-center justify-center gap-4"
                >
                  <Icon className="text-4xl text-gold" />
                  <span className="text-lg font-bold text-white">
                    {method.name}
                  </span>
                </motion.div>
              )
            })}
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

export default Installments
