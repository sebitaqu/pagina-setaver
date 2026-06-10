'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { type Product, formatPrice } from '@/lib/products'

function SafeImage({
  src,
  alt,
  priority = false,
  sizes = '(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw',
}: {
  src: string
  alt: string
  priority?: boolean
  sizes?: string
}) {
  const [error, setError] = useState(false)

  if (error) {
    return (
      <div className="w-full h-full bg-sv-surface flex items-center justify-center">
        <span className="text-[9px] tracking-[0.2em] uppercase text-sv-stone">
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
      sizes={sizes}
      className="object-cover"
      onError={() => setError(true)}
      priority={priority}
    />
  )
}

export default function ProductCard({ product }: { product: Product }) {
  return (
    <Link href={`/catalogo/${product.id}`} className="group block">
      <div className="relative overflow-hidden bg-sv-surface aspect-[3/4]">
        {/* Main image — fades out on group-hover */}
        <div className="absolute inset-0 transition-opacity duration-[250ms] group-hover:opacity-0">
          <SafeImage src={product.images.main} alt={product.name} />
        </div>

        {/* Label image — fades in on group-hover */}
        <div className="absolute inset-0 opacity-0 transition-opacity duration-[250ms] group-hover:opacity-100">
          <SafeImage
            src={product.images.label}
            alt={`Etiqueta ${product.name}`}
          />
        </div>

        {/* Sold overlay */}
        {!product.available && (
          <div className="absolute inset-0 bg-sv-bg/70 flex items-center justify-center z-10">
            <span className="text-[10px] tracking-[0.2em] uppercase text-sv-muted">
              Vendido
            </span>
          </div>
        )}

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
          {product.isOffer && product.available && (
            <span className="px-2 py-0.5 text-[9px] font-medium tracking-[0.1em] uppercase bg-[#B85C38] text-white">
              Oferta
            </span>
          )}
          {product.type === 'nueva' && (
            <span className="px-2 py-0.5 text-[9px] font-medium tracking-[0.1em] uppercase bg-sv-text text-sv-warm">
              Nueva
            </span>
          )}
          {product.type === 'segunda' && product.available && (
            <span className="px-2 py-0.5 text-[9px] font-medium tracking-[0.1em] uppercase border border-sv-badge/60 text-sv-badge">
              2da Mano
            </span>
          )}
        </div>
      </div>

      {/* Info */}
      <div className="mt-3">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            <p className="text-[10px] font-medium tracking-[0.1em] uppercase text-sv-muted truncate">
              {product.brand}
            </p>
            <p className="text-sm text-sv-text mt-0.5 truncate leading-snug">
              {product.name}
            </p>
          </div>
          <span className="shrink-0 text-[10px] font-medium tracking-[0.06em] uppercase text-sv-muted pt-0.5">
            {product.size}
          </span>
        </div>

        <div className="mt-2 flex items-center gap-2">
          {product.isOffer && product.originalPrice != null && (
            <span className="text-[11px] text-sv-stone line-through">
              {formatPrice(product.originalPrice)}
            </span>
          )}
          <span
            className={`text-sm font-medium tracking-tight ${
              !product.available ? 'line-through text-sv-stone' : 'text-sv-text'
            }`}
          >
            {formatPrice(product.price)}
          </span>
        </div>
      </div>
    </Link>
  )
}
