import Image from 'next/image'

const footerLinks = [
  { label: "So funktioniert's", href: '/#how-it-works' },
  { label: 'FAQ', href: '/#faq' },
]

export default function Footer() {
  return (
    <footer className="bg-stone-900 text-stone-300">
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="flex flex-col sm:flex-row justify-between gap-8">
          {/* Left column: Logo + brand */}
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-2.5">
              <Image
                src="/logo.png"
                alt="Hüttentour Planer Logo"
                width={24}
                height={24}
                className="h-6 w-auto invert"
              />
              <span className="font-display text-lg text-stone-100 tracking-tight">
                Hüttentour Planer
              </span>
            </div>
            <p className="text-sm text-stone-500">
              Plane deine Mehrtages-Hüttentour in den Alpen.
            </p>
          </div>

          {/* Right column: Links */}
          <div className="flex flex-col gap-2">
            <span className="text-xs uppercase tracking-wider text-stone-500 font-medium mb-1">
              Navigation
            </span>
            {footerLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm text-stone-400 hover:text-white transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>

        {/* Bottom separator + copyright */}
        <div className="border-t border-stone-800 mt-10 pt-6 text-xs text-stone-500">
          &copy; 2026 Hüttentour Planer
        </div>
      </div>
    </footer>
  )
}
