import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Nosotros',
  description:
    'La historia de Setaver: moda circular premium chilena con criterio, gusto y orgullo.',
}

const values = [
  {
    title: 'Curaduría',
    desc: 'Cada prenda es seleccionada a mano. Sin excepciones.',
  },
  {
    title: 'Transparencia',
    desc: 'El estado real de cada pieza, sin filtros ni sorpresas.',
  },
  {
    title: 'Exclusividad',
    desc: 'Una talla, una unidad. Nunca dos iguales.',
  },
  {
    title: 'Cercanía',
    desc: 'WhatsApp, retiro en Quilicura. Sin complicaciones.',
  },
]

export default function NosotrosPage() {
  return (
    <div className="min-h-screen pt-14">
      <div className="max-w-[800px] mx-auto px-6 py-16 md:py-24">
        <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-light mb-16">
          Nosotros
        </h1>

        <div className="space-y-16 md:space-y-20">
          {/* Story */}
          <section>
            <p className="text-[10px] tracking-[0.18em] uppercase text-sv-stone mb-5">
              Historia
            </p>
            <p className="font-display text-xl md:text-2xl font-light leading-[1.6]">
              Setaver nació de una convicción simple: la ropa de segunda mano
              puede ser —y debe ser— una decisión de estilo, no de necesidad.
            </p>
          </section>

          {/* Philosophy */}
          <section>
            <p className="text-[10px] tracking-[0.18em] uppercase text-sv-stone mb-5">
              Filosofía
            </p>
            <div className="space-y-5 text-[15px] text-sv-muted leading-relaxed font-light">
              <p>
                Cada prenda que llega a Setaver pasa por una selección rigurosa.
                No vendemos cualquier cosa — vendemos piezas que tienen algo que
                decir: una marca que vale, un estado que resiste, un precio que
                convence.
              </p>
              <p>
                Creemos que la moda circular no es una tendencia. Es la dirección
                correcta. Y creemos que se puede hacer con criterio, con gusto y
                con orgullo.
              </p>
            </div>
          </section>

          {/* Values */}
          <section>
            <p className="text-[10px] tracking-[0.18em] uppercase text-sv-stone mb-8">
              Valores
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {values.map(({ title, desc }) => (
                <div key={title} className="border-t border-sv-border pt-5">
                  <h3 className="text-sm font-medium tracking-wide">{title}</h3>
                  <p className="mt-2 text-sm text-sv-muted font-light leading-relaxed">
                    {desc}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* How to buy */}
          <section>
            <p className="text-[10px] tracking-[0.18em] uppercase text-sv-stone mb-5">
              Cómo comprar
            </p>
            <ol className="space-y-4">
              {[
                'Elegí tu prenda en el catálogo.',
                'Tocá "Lo quiero" — se abre WhatsApp con el mensaje listo.',
                'Coordinamos el pago: transferencia o retiro en Quilicura.',
                'Envíos a todo Chile por Starken o Chilexpress.',
              ].map((step, i) => (
                <li key={i} className="flex items-start gap-4">
                  <span className="text-[10px] tracking-[0.1em] text-sv-stone mt-0.5 w-4 shrink-0">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span className="text-[15px] text-sv-muted font-light">
                    {step}
                  </span>
                </li>
              ))}
            </ol>
          </section>

          {/* CTA */}
          <section className="border-t border-sv-border pt-10">
            <Link
              href="/catalogo"
              className="text-[11px] tracking-[0.18em] uppercase border-b border-sv-text pb-0.5 hover:opacity-40 transition-opacity"
            >
              Ver catálogo
            </Link>
          </section>
        </div>
      </div>
    </div>
  )
}
