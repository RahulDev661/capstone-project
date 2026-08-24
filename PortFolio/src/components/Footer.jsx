export default function Footer() {
  return (
    <footer className="border-t border-line">
      <div className="container-px py-8 max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
        <p className="font-mono text-xs text-faint">
          © {new Date().getFullYear()} Rahul Dev. Built with React, Vite & Tailwind CSS.
        </p>
        <a
          href="#home"
          className="text-xs text-muted hover:text-accent transition-colors"
        >
          Back to top
        </a>
      </div>
    </footer>
  )
}
