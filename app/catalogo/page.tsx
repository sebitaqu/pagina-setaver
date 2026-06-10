import type { Metadata } from 'next'
import { getAllProducts } from '@/lib/products'
import CatalogClient from '@/components/CatalogClient'

export const metadata: Metadata = {
  title: 'Catálogo',
  description: 'Todas las prendas disponibles en Setaver. Filtrar por género, categoría, marca y disponibilidad.',
}

export default function CatalogoPage() {
  const products = getAllProducts()
  return <CatalogClient products={products} />
}
