'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'

export default function Header() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/90 backdrop-blur-lg shadow-sm border-b border-stone-200/60'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <nav className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 rounded-xl bg-alpine-600 flex items-center justify-center shadow-sm group-hover:shadow-md transition-shadow">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="m8 3 4 8 5-5 2 15H2L8 3z"/>
              </svg>
            </div>
            <span className={`font-display text-xl tracking-tight transition-colors ${
              scrolled ? 'text-stone-900' : 'text-white'
            }`}>
              Hütten-Tour Planner
            </span>
          </Link>

          {/* Nav links */}
          <div className="hidden md:flex items-center gap-8">
            <a
              href="#features"
              className={`text-sm font-medium transition-colors hover:text-alpine-500 ${
                scrolled ? 'text-stone-600' : 'text-white/80'
              }`}
            >
              Features
            </a>
            <a
              href="#so-funktionierts"
              className={`text-sm font-medium transition-colors hover:text-alpine-500 ${
                scrolled ? 'text-stone-600' : 'text-white/80'
              }`}
            >
              So funktioniert&apos;s
            </a>
            <a
              href="#app"
              className={`text-sm font-medium transition-colors hover:text-alpine-500 ${
                scrolled ? 'text-stone-600' : 'text-white/80'
              }`}
            >
              Planer
            </a>
            <Link
              href="/planner"
              className="bg-alpine-600 hover:bg-alpine-700 text-white text-sm font-semibold px-5 py-2.5 rounded-full shadow-sm hover:shadow-md transition-all"
            >
              Tour planen
            </Link>
          </div>

          {/* Mobile CTA */}
          <Link
            href="/planner"
            className="md:hidden bg-alpine-600 hover:bg-alpine-700 text-white text-sm font-semibold px-4 py-2 rounded-full shadow-sm transition-all"
          >
            Tour planen
          </Link>
        </nav>
      </div>
    </header>
  )
}
