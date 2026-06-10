'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { type Product, formatPrice } from '@/lib/products'
import ProductCard from './ProductCard'

const WA_NUMBER = '56998613859'

function buildWAMessage(p: Product): string {
  return encodeURIComponent(
    `Hola Setaver! Me interesa: ${p.name} (${p.size}) — ${formatPrice(p.price)}. ¿Está disponible?`
  )
}

function SafeImage({
  src,
  alt,
  priority = false,
}: {
  src: string
  alt: string
  priority?: boolean
}) {
  const [error, setError] = useState(false)

  if (error) {
    return (
      <div className="w-full h-full bg-sv-surface flex items-center justify-center">
        <span className="text-[10px] tracking-[0.2em] uppercase text-sv-stone">
          Setaver
        </span>
      </div>
    )
  }

  return (
    <Image
      src={src}
      alt={alt}
      fill
      sizes="(max-width: 768px) 100vw, 50vw"
      className="object-cover"
      onError={() => setError(true)}
      priority={priority}
    />
  )
}

export default function ProductDetailClient({
  product,
  related,
}: {
  product: Product
  related: Product[]
}) {
  const [showLabel, setShowLabel] = useState(false)
  const waUrl = `https://wa.me/${WA_NUMBER}?text=${buildWAMessage(product)}`

  return (
    <div className="min-h-screen pt-14">
      <div className="max-w-[1280px] mx-auto px-6 py-10 md:py-16">
        {/* Breadcrumb */}
        <nav className="mb-10 text-[10px] tracking-[0.12em] uppercase text-sv-muted flex items-center gap-3">
          <Link href="/catalogo" className="hover:text-sv-text transition-colors">
            Catálogo
          </Link>
          <span className="text-sv-border">·</span>
          <span className="text-sv-text truncate max-w-[200px]">{product.name}</span>
        </nav>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-20">
          {/* Images */}
          <div>
            {/* Main image with tap-to-toggle */}
            <div
              className="relative overflow-hidden bg-sv-surface aspect-[3/4] cursor-pointer"
              onClick={() => setShowLabel(v => !v)}
            >
              <div
                className="absolute inset-0 transition-opacity duration-[250ms]"
                style={{ opacity: showLabel ? 0 : 1 }}
              >
                <SafeImage src={product.images.main} alt={product.name} priority />
              </div>
              <div
                className="absolute inset-0 transition-opacity duration-[250ms]"
                style={{ opacity: showLabel ? 1 : 0 }}
              >
                <SafeImage
                  src={product.images.label}
                  alt={`Etiqueta ${product.name}`}
                />
              </div>

              {!product.available && (
                <div className="absolute inset-0 bg-sv-bg/70 flex items-center justify-center z-10">
                  <span className="text-[11px] tracking-[0.2em] uppercase text-sv-muted">
                    Vendido
                  </span>
                </div>
              )}
            </div>

            <p className="mt-3 text-center text-[10px] tracking-[0.12em] uppercase text-sv-stone">
              Toca para ver etiqueta
            </p>
          </div>

          {/* Product info */}
          <div className="flex flex-col gap-6 py-1">
            <div>
              <p className="text-[11px] tracking-[0.12em] uppercase text-sv-muted">
                {product.brand}
              </p>
              <h1 className="font-display text-3xl md:text-4xl font-light mt-2 leading-tight">
                {product.name}
              </h1>
            </div>

            {/* Type badges */}
            <div className="flex flex-wrap gap-2">
              {product.type === 'nueva' && (
                <span className="px-2 py-0.5 text-[10px] tracking-[0.1em] uppercase bg-sv-text text-sv-warm">
                  Nueva
                </span>
              )}
              {product.type === 'segunda' && (
                <span className="px-2 py-0.5 text-[10px] tracking-[0.1em] uppercase border border-sv-badge/60 text-sv-badge">
                  2da Mano
                </span>
              )}
              {product.isOffer && (
                <span className="px-2 py-0.5 text-[10px] tracking-[0.1em] uppercase bg-[#B85C38] text-white">
                  Oferta
                </span>
              )}
            </div>

            {/* Price */}
            <div>
              {product.isOffer && product.originalPrice != null && (
                <p className="text-sm text-sv-stone line-through mb-1">
                  {formatPrice(product.originalPrice)}
                </p>
              )}
              <p
                className={`text-2xl font-light tracking-tight ${
                  !product.available ? 'line-through text-sv-stone' : ''
                }`}
              >
                {formatPrice(product.price)}
              </p>
              {!product.available && (
                <p className="mt-1 text-sm text-sv-muted font-light">
                  Esta prenda ya fue vendida.
                </p>
              )}
            </div>

            {/* Details */}
            <div className="border-t border-sv-border pt-5 space-y-3.5">
              <Row label="Talla" value={product.size} />
              <Row label="Estado" value={product.condition} />
              <Row
                label="Categoría"
                value={product.category.charAt(0).toUpperCase() + product.category.slice(1)}
              />
              <Row label="Género" value={product.gender.charAt(0).toUpperCase() + product.gender.slice(1)} />
            </div>

            {/* Description */}
            {product.description && (
              <p className="text-sm text-sv-muted leading-relaxed font-light">
                {product.description}
              </p>
            )}

            {/* CTA */}
            {product.available ? (
              <a
                href={waUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-auto h-12 min-h-[48px] flex items-center justify-center bg-sv-text text-sv-warm text-[11px] tracking-[0.18em] uppercase hover:opacity-75 transition-opacity"
              >
                Lo quiero — escribir por WhatsApp
              </a>
            ) : (
              <div className="mt-auto h-12 min-h-[48px] flex items-center justify-center bg-sv-surface text-sv-stone text-[11px] tracking-[0.15em] uppercase cursor-not-allowed select-none">
                Prenda vendida
              </div>
            )}
          </div>
        </div>

        {/* Related products */}
        {related.length > 0 && (
          <div className="mt-20 md:mt-28 border-t border-sv-border pt-14">
            <h2 className="font-display text-2xl md:text-3xl font-light mb-10">
              También te puede interesar
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
              {related.map(p => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-[10px] tracking-[0.12em] uppercase text-sv-stone">
        {label}
      </span>
      <span className="text-sm text-sv-text">{value}</span>
    </div>
  )
}
