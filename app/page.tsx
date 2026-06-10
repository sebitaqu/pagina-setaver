import Link from 'next/link'
import { getFeaturedProducts } from '@/lib/products'
import ProductCard from '@/components/ProductCard'
import HeroSection from '@/components/HeroSection'

export default function HomePage() {
  const featured = getFeaturedProducts()

  return (
    <>
      <HeroSection />

      {/* Editorial */}
      <section className="max-w-[640px] mx-auto px-6 py-20 md:py-28 text-center">
        <p className="font-display text-2xl md:text-3xl font-light leading-[1.5] text-sv-text">
          No vendemos ropa usada.
          <br />
          Curamos prendas únicas con historia.
        </p>
        <p className="mt-6 text-sm text-sv-muted leading-relaxed font-light max-w-sm mx-auto">
          Cada pieza pasa por nuestra selección. Marcas que duran, estado que
          importa, precio que tiene sentido.
        </p>
      </section>

      {/* Featured products */}
      <section className="max-w-[1280px] mx-auto px-6 pb-20 md:pb-28">
        <div className="flex items-baseline justify-between mb-10">
          <h2 className="font-display text-2xl md:text-3xl font-light">
            Recién llegados
          </h2>
          <Link
            href="/catalogo"
            className="text-[11px] tracking-[0.12em] uppercase text-sv-muted hover:text-sv-text transition-colors"
          >
            Ver todo
          </Link>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {featured.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Value proposition */}
      <section className="border-t border-sv-border bg-sv-surface">
        <div className="max-w-[1280px] mx-auto px-6 py-7">
          <p className="text-center text-[10px] tracking-[0.2em] uppercase text-sv-muted">
            Prendas únicas &nbsp;·&nbsp; Curaduría experta &nbsp;·&nbsp; Retiro
            en Quilicura &nbsp;·&nbsp; Envíos a todo Chile
          </p>
        </div>
      </section>

      {/* Instagram strip */}
      <section className="max-w-[1280px] mx-auto px-6 py-16 text-center">
        <p className="text-[11px] tracking-[0.15em] uppercase text-sv-muted mb-5">
          Seguinos en Instagram
        </p>
        <a
          href="https://instagram.com/setavercl"
          target="_blank"
          rel="noopener noreferrer"
          className="font-display text-2xl font-light tracking-[0.1em] hover:opacity-50 transition-opacity"
        >
          @setavercl ↗
        </a>
      </section>
    </>
  )
}
