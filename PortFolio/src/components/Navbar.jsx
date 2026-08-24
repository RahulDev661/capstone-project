import { useEffect, useState } from 'react'
import { MenuIcon, CloseIcon } from './Icons.jsx'

const links = [
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Experience', href: '#experience' },
  { label: 'Contact', href: '#contact' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Lock body scroll while the mobile menu is open
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-shadow ${
        scrolled ? 'bg-paper/90 backdrop-blur border-b border-line' : 'bg-transparent'
      }`}
    >
      <nav className="container-px flex items-center justify-between h-16">
        <a
          href="#home"
          className="font-mono text-sm font-medium text-ink hover:text-accent transition-colors"
        >
          <span className="text-rose-950">Rahul Dev</span>
        </a>

        <ul className="hidden md:flex items-center gap-1 rounded">
          {links.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="px-3 py-2 rounded-md text-sm text-muted hover:text-ink hover:bg-surface transition-colors"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <a
          href="#contact"
          className="hidden md:inline-flex items-center rounded-md bg-ink text-paper text-sm font-medium px-4 py-2 hover:bg-accent transition-colors"
        >
          Let's talk
        </a>

        <button
          type="button"
          className="md:hidden inline-flex items-center justify-center w-10 h-10 rounded-md text-ink hover:bg-surface"
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <CloseIcon /> : <MenuIcon />}
        </button>
      </nav>

      {open && (
        <div
          id="mobile-menu"
          className="md:hidden absolute inset-x-0 top-16 bg-paper border-b border-line shadow-lg"
        >
          <ul className="container-px py-4 flex flex-col gap-1">
            {links.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="block px-2 py-3 text-base text-ink border-b border-line last:border-none"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  )
}
