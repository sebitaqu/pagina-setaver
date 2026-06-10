'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'

const navLinks = [
  { href: '/catalogo', label: 'Catálogo' },
  { href: '/ofertas', label: 'Ofertas' },
  { href: '/nosotros', label: 'Nosotros' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setMenuOpen(false)
  }, [pathname])

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled || menuOpen
            ? 'bg-sv-bg border-b border-sv-border'
            : 'bg-sv-bg/80 backdrop-blur-sm'
        }`}
      >
        <nav className="max-w-[1280px] mx-auto px-6 h-14 flex items-center justify-between">
          <Link
            href="/"
            className="font-display text-xl font-light tracking-[0.25em] uppercase hover:opacity-60 transition-opacity"
          >
            Setaver
          </Link>

          <div className="hidden md:flex items-center gap-10">
            {navLinks.map(link => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-[11px] tracking-[0.12em] uppercase transition-opacity ${
                  pathname.startsWith(link.href)
                    ? 'text-sv-text opacity-100'
                    : 'text-sv-muted hover:text-sv-text hover:opacity-100'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="hidden md:flex items-center">
            <a
              href="https://instagram.com/setavercl"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[11px] tracking-[0.12em] uppercase text-sv-muted hover:text-sv-text transition-colors"
            >
              Instagram ↗
            </a>
          </div>

          <button
            className="md:hidden p-2 -mr-2 flex flex-col gap-[5px] w-8 items-end"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'}
          >
            <span
              className={`block h-px bg-sv-text transition-all duration-300 origin-center ${
                menuOpen ? 'rotate-45 translate-y-[5px] w-5' : 'w-5'
              }`}
            />
            <span
              className={`block h-px bg-sv-text transition-all duration-300 ${
                menuOpen ? 'opacity-0 w-3' : 'w-3'
              }`}
            />
            <span
              className={`block h-px bg-sv-text transition-all duration-300 origin-center ${
                menuOpen ? '-rotate-45 -translate-y-[5px] w-5' : 'w-5'
              }`}
            />
          </button>
        </nav>
      </header>

      <AnimatePresence>
        {menuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-sv-text/20 z-40 md:hidden"
              onClick={() => setMenuOpen(false)}
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ duration: 0.35, ease: [0.32, 0.72, 0, 1] }}
              className="fixed top-0 right-0 bottom-0 w-72 bg-sv-warm z-40 md:hidden flex flex-col pt-20 px-8 pb-10"
            >
              <nav className="flex flex-col gap-7">
                {navLinks.map(link => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`text-[13px] tracking-[0.15em] uppercase transition-opacity ${
                      pathname.startsWith(link.href)
                        ? 'text-sv-text'
                        : 'text-sv-muted'
                    }`}
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>
              <div className="mt-auto pt-8 border-t border-sv-border">
                <a
                  href="https://instagram.com/setavercl"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[11px] tracking-[0.12em] uppercase text-sv-muted"
                >
                  @setavercl ↗
                </a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
