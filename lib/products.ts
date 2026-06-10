import productsData from '@/data/products.json'

export type Product = {
  id: string
  name: string
  brand: string
  category: string
  gender: string
  type: string
  style: string[]
  price: number
  originalPrice: number | null
  size: string
  available: boolean
  isOffer: boolean
  featured: boolean
  condition: string
  images: {
    main: string
    label: string
  }
  description: string
  createdAt: string
}

const products = productsData as Product[]

export function getAllProducts(): Product[] {
  return products
}

export function getFeaturedProducts(): Product[] {
  return products.filter(p => p.featured)
}

export function getProductById(id: string): Product | undefined {
  return products.find(p => p.id === id)
}

export function getOfferProducts(): Product[] {
  return products.filter(p => p.isOffer)
}

export function getRelatedProducts(product: Product, limit = 4): Product[] {
  return products
    .filter(
      p =>
        p.id !== product.id &&
        (p.category === product.category || p.brand === product.brand)
    )
    .slice(0, limit)
}

export function formatPrice(price: number): string {
  const formatted = price
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, '.')
  return `$${formatted} CLP`
}
