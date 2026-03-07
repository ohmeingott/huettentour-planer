'use client'

import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'

const navLinks = [
  { label: "So funktioniert's", anchor: '#how-it-works' },
  { label: 'FAQ', anchor: '#faq' },
]

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 0)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false)
  }, [pathname])

  const resolveHref = (anchor: string) => {
    if (pathname !== '/') {
      return `/${anchor}`
    }
    return anchor
  }

  return (
    <header
      className={`sticky top-0 z-50 h-16 bg-white/80 backdrop-blur-md border-b border-stone-200/60 transition-shadow duration-200 ${
        scrolled ? 'shadow-sm' : ''
      }`}
    >
      <div className="max-w-6xl mx-auto h-full px-4 sm:px-6 flex items-center justify-between">
        {/* Left side: Logo + title */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <Image
            src="/logo.png"
            alt="Hüttentour Planer Logo"
            width={32}
            height={32}
            className="h-8 w-auto"
          />
          <span className="font-display text-xl text-stone-900 tracking-tight">
            Hüttentour Planer
          </span>
        </Link>

        {/* Right side: Desktop nav */}
        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <a
              key={link.anchor}
              href={resolveHref(link.anchor)}
              className="text-sm text-stone-600 hover:text-stone-900 transition-colors"
            >
              {link.label}
            </a>
          ))}
          <a
            href={resolveHref('#map')}
            className="bg-alpine-600 text-white rounded-lg px-4 py-2 text-sm font-medium hover:bg-alpine-700 transition-colors"
          >
            Tour planen
          </a>
        </nav>

        {/* Right side: Mobile hamburger */}
        <button
          type="button"
          className="md:hidden p-2 -mr-2 text-stone-600 hover:text-stone-900 transition-colors"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label={mobileMenuOpen ? 'Menü schließen' : 'Menü öffnen'}
          aria-expanded={mobileMenuOpen}
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            {mobileMenuOpen ? (
              <>
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </>
            ) : (
              <>
                <line x1="4" y1="6" x2="20" y2="6" />
                <line x1="4" y1="12" x2="20" y2="12" />
                <line x1="4" y1="18" x2="20" y2="18" />
              </>
            )}
          </svg>
        </button>
      </div>

      {/* Mobile dropdown menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white/95 backdrop-blur-md border-b border-stone-200/60 shadow-sm">
          <nav className="max-w-6xl mx-auto px-4 sm:px-6 py-4 flex flex-col gap-3">
            {navLinks.map((link) => (
              <a
                key={link.anchor}
                href={resolveHref(link.anchor)}
                className="text-sm text-stone-600 hover:text-stone-900 transition-colors py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.label}
              </a>
            ))}
            <a
              href={resolveHref('#map')}
              className="bg-alpine-600 text-white rounded-lg px-4 py-2.5 text-sm font-medium hover:bg-alpine-700 transition-colors text-center mt-1"
              onClick={() => setMobileMenuOpen(false)}
            >
              Tour planen
            </a>
          </nav>
        </div>
      )}
    </header>
  )
}
