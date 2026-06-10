'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import Link from 'next/link'

export default function HeroSection() {
  return (
    <section className="min-h-screen flex flex-col items-center justify-center px-6 text-center relative overflow-hidden">
      {/* Background image */}
      <Image
        src="/images/header/hero.png"
        alt=""
        fill
        priority
        className="object-cover object-top"
        sizes="100vw"
      />

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/45" />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center">
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="font-display font-light tracking-[0.18em] uppercase leading-none"
          style={{ fontSize: 'clamp(3.5rem, 14vw, 13rem)', color: '#F7F5F2' }}
        >
          Setaver
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.35, ease: 'easeOut' }}
          className="mt-6 text-[12px] tracking-[0.25em] uppercase"
          style={{ color: '#F7F5F2', opacity: 0.75 }}
        >
          Moda circular premium · Chile
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.7 }}
          className="mt-14"
        >
          <Link
            href="/catalogo"
            className="text-[11px] tracking-[0.18em] uppercase border-b pb-0.5 hover:opacity-40 transition-opacity"
            style={{ color: '#F7F5F2', borderColor: '#F7F5F2' }}
          >
            Ver catálogo
          </Link>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 1.2 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10"
      >
        <div className="w-px h-8 mx-auto" style={{ backgroundColor: '#F7F5F2', opacity: 0.5 }} />
      </motion.div>
    </section>
  )
}
