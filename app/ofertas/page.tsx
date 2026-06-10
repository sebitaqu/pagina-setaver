import type { Metadata } from 'next'
import { getOfferProducts } from '@/lib/products'
import ProductCard from '@/components/ProductCard'

export const metadata: Metadata = {
  title: 'Ofertas',
  description: 'Selección especial de prendas a precio reducido en Setaver.',
}

export default function OfertasPage() {
  const products = getOfferProducts()

  return (
    <div className="min-h-screen pt-14">
      <div className="max-w-[1280px] mx-auto px-6 py-12">
        <h1 className="font-display text-4xl md:text-5xl font-light">
          Selección especial
        </h1>
        <p className="mt-3 text-sm text-sv-muted font-light">
          Prendas seleccionadas a precio reducido. Sin estridencias.
        </p>
      </div>

      <div className="max-w-[1280px] mx-auto px-6 pb-24">
        {products.length === 0 ? (
          <div className="py-24 text-center">
            <p className="text-sm text-sv-muted font-light">
              Sin ofertas disponibles por ahora.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {products.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
