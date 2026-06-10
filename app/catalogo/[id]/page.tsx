import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import {
  getAllProducts,
  getProductById,
  getRelatedProducts,
} from '@/lib/products'
import ProductDetailClient from '@/components/ProductDetailClient'

type Props = {
  params: { id: string }
}

export function generateStaticParams() {
  return getAllProducts().map(p => ({ id: p.id }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const product = getProductById(params.id)
  if (!product) return {}
  return {
    title: `${product.name} — ${product.brand}`,
    description: product.description,
  }
}

export default function ProductPage({ params }: Props) {
  const product = getProductById(params.id)
  if (!product) notFound()

  const related = getRelatedProducts(product)

  return <ProductDetailClient product={product} related={related} />
}
