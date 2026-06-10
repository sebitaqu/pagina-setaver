import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="border-t border-sv-border bg-sv-bg">
      <div className="max-w-[1280px] mx-auto px-6 py-14">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div>
            <p className="font-display text-2xl font-light tracking-[0.2em] uppercase">
              Setaver
            </p>
            <p className="mt-2 text-[11px] tracking-[0.1em] uppercase text-sv-muted">
              Moda circular premium · Chile
            </p>
          </div>

          <div className="space-y-3">
            <p className="text-[10px] tracking-[0.15em] uppercase text-sv-stone">Navegar</p>
            {[
              { href: '/catalogo', label: 'Catálogo' },
              { href: '/ofertas', label: 'Ofertas' },
              { href: '/nosotros', label: 'Nosotros' },
            ].map(link => (
              <div key={link.href}>
                <Link
                  href={link.href}
                  className="text-[12px] tracking-wide text-sv-muted hover:text-sv-text transition-colors"
                >
                  {link.label}
                </Link>
              </div>
            ))}
          </div>

          <div className="space-y-3">
            <p className="text-[10px] tracking-[0.15em] uppercase text-sv-stone">Contacto</p>
            <div>
              <a
                href="https://instagram.com/setavercl"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[12px] tracking-wide text-sv-muted hover:text-sv-text transition-colors"
              >
                Instagram @setavercl ↗
              </a>
            </div>
            <div>
              <a
                href="https://wa.me/56998613859"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[12px] tracking-wide text-sv-muted hover:text-sv-text transition-colors"
              >
                WhatsApp ↗
              </a>
            </div>
            <p className="text-[11px] text-sv-stone">
              Retiro: Plaza Metro Quilicura, Santiago
            </p>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-sv-border flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
          <p className="text-[10px] tracking-[0.1em] uppercase text-sv-stone">
            © 2025 Setaver
          </p>
          <p className="text-[10px] tracking-[0.1em] uppercase text-sv-stone">
            Envíos a todo Chile · Starken · Chilexpress
          </p>
        </div>
      </div>
    </footer>
  )
}
