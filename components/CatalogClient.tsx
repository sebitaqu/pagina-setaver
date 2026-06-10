'use client'

import { useState, useMemo } from 'react'
import { type Product } from '@/lib/products'
import ProductCard from './ProductCard'

type Filters = {
  search: string
  gender: string
  category: string
  brand: string
  available: string
}

const initialFilters: Filters = {
  search: '',
  gender: '',
  category: '',
  brand: '',
  available: 'all',
}

export default function CatalogClient({ products }: { products: Product[] }) {
  const [filters, setFilters] = useState<Filters>(initialFilters)
  const [drawerOpen, setDrawerOpen] = useState(false)

  const brands = useMemo(
    () => [...new Set(products.map(p => p.brand))].sort(),
    [products]
  )
  const categories = useMemo(
    () => [...new Set(products.map(p => p.category))].sort(),
    [products]
  )

  const filtered = useMemo(() => {
    return products.filter(p => {
      if (filters.search) {
        const q = filters.search.toLowerCase()
        if (
          !p.name.toLowerCase().includes(q) &&
          !p.brand.toLowerCase().includes(q)
        )
          return false
      }
      if (filters.gender && p.gender !== filters.gender) return false
      if (filters.category && p.category !== filters.category) return false
      if (filters.brand && p.brand !== filters.brand) return false
      if (filters.available === 'available' && !p.available) return false
      if (filters.available === 'sold' && p.available) return false
      return true
    })
  }, [products, filters])

  const update = (key: keyof Filters, value: string) =>
    setFilters(prev => ({ ...prev, [key]: value }))

  const clear = () => setFilters(initialFilters)

  const activeCount = Object.entries(filters).filter(
    ([k, v]) => v !== '' && v !== 'all' && k !== 'search'
  ).length + (filters.search ? 1 : 0)

  return (
    <div className="min-h-screen pt-14">
      <div className="max-w-[1280px] mx-auto px-6 py-12 pb-6">
        <h1 className="font-display text-4xl md:text-5xl font-light">
          Catálogo
        </h1>
      </div>

      {/* Search bar */}
      <div className="max-w-[1280px] mx-auto px-6 pb-8 flex items-center gap-3">
        <div className="relative flex-1 max-w-md">
          <input
            type="text"
            placeholder="Buscar por nombre o marca…"
            value={filters.search}
            onChange={e => update('search', e.target.value)}
            className="w-full h-10 pl-4 pr-10 bg-sv-surface border border-sv-border text-sm placeholder:text-sv-stone focus:outline-none focus:border-sv-muted transition-colors"
          />
          {filters.search && (
            <button
              onClick={() => update('search', '')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-sv-stone hover:text-sv-text"
            >
              ✕
            </button>
          )}
        </div>
        <button
          onClick={() => setDrawerOpen(true)}
          className="lg:hidden h-10 px-4 border border-sv-border text-[10px] tracking-[0.12em] uppercase text-sv-muted hover:text-sv-text transition-colors"
        >
          Filtros{activeCount > 0 ? ` (${activeCount})` : ''}
        </button>
        {activeCount > 0 && (
          <button
            onClick={clear}
            className="hidden lg:block text-[10px] tracking-[0.12em] uppercase text-sv-muted hover:text-sv-text transition-colors"
          >
            Limpiar
          </button>
        )}
      </div>

      <div className="max-w-[1280px] mx-auto px-6 pb-24 flex gap-14">
        {/* Desktop filter sidebar */}
        <aside className="hidden lg:block w-44 shrink-0 pt-1">
          <FilterPanel
            filters={filters}
            update={update}
            brands={brands}
            categories={categories}
            onClear={clear}
            hasFilters={activeCount > 0}
          />
        </aside>

        {/* Product grid */}
        <div className="flex-1 min-w-0">
          <p className="text-[10px] tracking-[0.12em] uppercase text-sv-stone mb-7">
            {filtered.length} {filtered.length === 1 ? 'prenda' : 'prendas'}
          </p>

          {filtered.length === 0 ? (
            <div className="py-24 text-center">
              <p className="text-sm text-sv-muted font-light">
                Sin resultados para esos filtros.
              </p>
              <button
                onClick={clear}
                className="mt-5 text-[10px] tracking-[0.15em] uppercase border-b border-sv-text pb-0.5 hover:opacity-50 transition-opacity"
              >
                Limpiar filtros
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
              {filtered.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Mobile filter drawer */}
      {drawerOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="absolute inset-0 bg-sv-text/20"
            onClick={() => setDrawerOpen(false)}
          />
          <div className="absolute right-0 top-0 bottom-0 w-80 bg-sv-warm overflow-y-auto flex flex-col">
            <div className="flex items-center justify-between px-8 py-6 border-b border-sv-border">
              <h3 className="text-[11px] tracking-[0.15em] uppercase">Filtros</h3>
              <button
                onClick={() => setDrawerOpen(false)}
                className="text-sv-muted hover:text-sv-text transition-colors text-sm"
              >
                ✕
              </button>
            </div>
            <div className="flex-1 px-8 py-6">
              <FilterPanel
                filters={filters}
                update={update}
                brands={brands}
                categories={categories}
                onClear={clear}
                hasFilters={activeCount > 0}
              />
            </div>
            <div className="px-8 pb-8">
              <button
                onClick={() => setDrawerOpen(false)}
                className="w-full h-12 bg-sv-text text-sv-warm text-[10px] tracking-[0.15em] uppercase hover:opacity-80 transition-opacity"
              >
                Ver {filtered.length} prendas
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

function FilterPanel({
  filters,
  update,
  brands,
  categories,
  onClear,
  hasFilters,
}: {
  filters: Filters
  update: (key: keyof Filters, value: string) => void
  brands: string[]
  categories: string[]
  onClear: () => void
  hasFilters: boolean
}) {
  return (
    <div className="space-y-8">
      <FilterGroup label="Género">
        {[
          { v: '', l: 'Todos' },
          { v: 'hombre', l: 'Hombre' },
          { v: 'mujer', l: 'Mujer' },
        ].map(({ v, l }) => (
          <FilterOption
            key={v}
            active={filters.gender === v}
            onClick={() => update('gender', v)}
          >
            {l}
          </FilterOption>
        ))}
      </FilterGroup>

      <FilterGroup label="Categoría">
        {[{ v: '', l: 'Todas' }, ...categories.map(c => ({ v: c, l: cap(c) }))].map(
          ({ v, l }) => (
            <FilterOption
              key={v}
              active={filters.category === v}
              onClick={() => update('category', v)}
            >
              {l}
            </FilterOption>
          )
        )}
      </FilterGroup>

      <FilterGroup label="Marca">
        {[{ v: '', l: 'Todas' }, ...brands.map(b => ({ v: b, l: b }))].map(
          ({ v, l }) => (
            <FilterOption
              key={v}
              active={filters.brand === v}
              onClick={() => update('brand', v)}
            >
              {l}
            </FilterOption>
          )
        )}
      </FilterGroup>

      <FilterGroup label="Disponibilidad">
        {[
          { v: 'all', l: 'Todas' },
          { v: 'available', l: 'Disponibles' },
          { v: 'sold', l: 'Vendidas' },
        ].map(({ v, l }) => (
          <FilterOption
            key={v}
            active={filters.available === v}
            onClick={() => update('available', v)}
          >
            {l}
          </FilterOption>
        ))}
      </FilterGroup>

      {hasFilters && (
        <button
          onClick={onClear}
          className="text-[10px] tracking-[0.12em] uppercase text-sv-stone hover:text-sv-muted transition-colors"
        >
          Limpiar filtros
        </button>
      )}
    </div>
  )
}

function FilterGroup({
  label,
  children,
}: {
  label: string
  children: React.ReactNode
}) {
  return (
    <div>
      <p className="text-[10px] tracking-[0.15em] uppercase text-sv-stone mb-3">
        {label}
      </p>
      <div className="space-y-2.5">{children}</div>
    </div>
  )
}

function FilterOption({
  active,
  onClick,
  children,
}: {
  active: boolean
  onClick: () => void
  children: React.ReactNode
}) {
  return (
    <button
      onClick={onClick}
      className={`block text-[12px] transition-colors text-left ${
        active ? 'text-sv-text font-medium' : 'text-sv-muted hover:text-sv-text'
      }`}
    >
      {children}
    </button>
  )
}

function cap(s: string): string {
  return s.charAt(0).toUpperCase() + s.slice(1)
}
