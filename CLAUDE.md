# Página Setaver Oficial

Sitio web oficial de Setaver.

## Stack

- Framework: TBD
- Styling: TBD

## Design

- Usar skill `frontend-design` para todas las interfaces
- Usar skill `ui-ux-pro-max` para sistemas de diseño y paletas
- Priorizar diseños únicos, no genéricos
- Evitar patrones comunes de AI (Inter/Roboto, gradientes morados)

## Commands

- Dev server: TBD
- Build: TBD

## Skills instaladas

- `frontend-design` — interfaces web distintivas y production-grade
- `ui-ux-pro-max` — 57 estilos UI, 95 paletas, 56 pairings tipográficos, 24 tipos de charts

## Visión del Proyecto

**Setaver** es una marca chilena de moda circular premium. No es una tienda de ropa usada barata — es una curaduría experta de prendas únicas, cuidadosamente seleccionadas. La web debe reflejar eso en cada píxel: sofisticación, confianza y exclusividad.

> "La empresa que transformó la percepción de la ropa de segunda mano."

---

## Brand DNA (leer antes de escribir cualquier línea de código o copy)

**Personalidad:** Ambiciosa · Inteligente · Cercana · Transparente · Moderna · Elegante sin ser pretenciosa

**Sensaciones que debe transmitir:** Descubrimiento · Orgullo · Satisfacción · Confianza · Exclusividad · Pertenencia

**Estética visual:** Minimalismo sofisticado · Quiet luxury · Diseño editorial · Inspiración escandinava y japonesa · Mucho espacio negativo · Líneas limpias · Menos es más

**Evitar absolutamente:**
- Apariencia de feria americana o outlet barato
- Liquidaciones agresivas o estética de descuento
- Saturación visual o colores estridentes
- Sensación de ropa usada de baja calidad
- Diseño genérico "AI slop" (Inter/Roboto, gradientes púrpura, layouts cliché)

---

## Stack Tecnológico

- **Framework:** Next.js 14 (App Router)
- **Estilos:** Tailwind CSS
- **Datos:** JSON local en `/data/products.json` (sin backend complejo por ahora)
- **Imágenes:** `/public/images/products/` — usar `next/image` siempre
- **Deploy:** Vercel (gratuito)
- **Animaciones:** Framer Motion para transiciones de página y microinteracciones

---

## Paleta de Colores

```css
/* Paleta oficial Setaver — NO usar otros colores sin justificación */
--setaver-bg:        #F2F1EF;  /* Gris Setaver — fondo principal */
--setaver-surface:   #E8E7E4;  /* Superficie de tarjetas */
--setaver-border:    #D4D3CF;  /* Bordes sutiles */
--setaver-stone:     #C4BFB8;  /* Tono piedra — separadores */
--setaver-text:      #1A1A1A;  /* Negro profundo — texto principal */
--setaver-muted:     #6B6560;  /* Gris cálido — texto secundario */
--setaver-warm:      #F7F5F2;  /* Blanco cálido — fondos alternativos */
--setaver-accent:    #1A1A1A;  /* Negro — botones y CTAs principales */
--setaver-badge:     #C9A96E;  /* Dorado suave — badges premium */
```

**Regla de color:** La web es casi monocromática. El contraste viene de tipografía y espacio, no de colores llamativos.

---

## Tipografía

```css
/* Display / Títulos grandes */
font-family: 'Cormorant Garamond', serif;  /* Elegante, editorial, atemporal */
font-weight: 300 | 400;

/* UI / Navegación / Cuerpo */
font-family: 'Suisse Int\'l', 'DM Sans', sans-serif;  /* Limpio, moderno */
font-weight: 300 | 400;

/* Etiquetas / Badges / Precio */
font-family: 'Suisse Int\'l', 'DM Sans', sans-serif;
font-weight: 500;
letter-spacing: 0.08em;
text-transform: uppercase;
```

**Referencias tipográficas:** Inspirarse en Aesop, Cos, Arket — no en H&M ni Falabella.

---

## Estructura de Datos — Producto

`/data/products.json`

```json
{
  "id": "setaver-001",
  "name": "Chaqueta Harrington Kappa",
  "brand": "Kappa",
  "category": "chaquetas",
  "gender": "hombre",
  "type": "segunda",
  "style": ["urbano", "casual"],
  "price": 18990,
  "originalPrice": null,
  "size": "M",
  "available": true,
  "isOffer": false,
  "featured": true,
  "condition": "Excelente estado",
  "images": {
    "main": "/images/products/setaver-001-main.jpg",
    "label": "/images/products/setaver-001-label.jpg"
  },
  "description": "Pieza icónica en perfecto estado. Talla M holgada.",
  "createdAt": "2025-01-15"
}
```

**Reglas de datos:**
- Cuando una prenda se vende → `"available": false` (nunca eliminar)
- `originalPrice` solo se llena si `isOffer: true`
- `size` es string único (cada prenda es una unidad irrepetible)
- `featured: true` aparece en el home

---

## Páginas y Rutas

### `/` — Home
- Hero de pantalla completa: fondo gris Setaver, nombre **SETAVER** en Cormorant Garamond tamaño enorme, tagline pequeño debajo
- Texto editorial corto sobre la filosofía de la marca (2-3 líneas)
- Sección "Recién llegados" — grid 2col mobile / 4col desktop
- Banner sutil de propuesta de valor: "Prendas únicas · Curaduría experta · Retiro en Quilicura · Envíos a todo Chile"
- Link a Instagram

### `/catalogo` — Catálogo completo
- Filtros laterales (mobile: drawer): Género · Categoría · Marca · Estilo · Disponibilidad
- Buscador por texto (nombre o marca) en la parte superior
- Grid: 2col mobile / 3col desktop
- **Efecto imagen:** al hacer hover (desktop) o tap (mobile), la imagen principal hace fade suave (~250ms) hacia la foto de la etiqueta del producto
- Badges sobre la tarjeta:
  - `2DA MANO` en tono piedra/dorado
  - `NUEVA` en negro
  - `OFERTA` en terracota suave
  - `VENDIDO` superpuesto con overlay semitransparente + texto tachado en el precio

### `/catalogo/[id]` — Detalle de producto
- Imagen principal grande + thumbnail de etiqueta (click para alternar)
- Información: nombre, marca, talla, estado, precio
- Si es oferta: precio original tachado + precio rebajado
- Descripción breve
- Botón principal: **"Lo quiero — escribir por WhatsApp"** (abre WhatsApp con mensaje prellenado)
- Mensaje prellenado WhatsApp:
  ```
  Hola Setaver! Me interesa: [nombre] ([talla]) — $[precio] CLP. ¿Está disponible?
  ```
- Productos relacionados al fondo (misma categoría o marca)

### `/ofertas` — Sección de ofertas
- Mismo grid que catálogo pero filtrado por `isOffer: true`
- Cada tarjeta muestra precio original tachado + precio rebajado
- Header editorial simple: "Selección especial" — sin estética de liquidación agresiva

### `/nosotros` — Acerca de Setaver
- Historia de la marca en tono editorial
- Valores y filosofía (extraer del Brand DNA)
- Foto o placeholder del equipo/espacio
- Sin fotos de stock genéricas — placeholders austeros si no hay imágenes reales

---

## Sistema de Compra

**No hay carrito ni pasarela de pago.** Flujo:

1. Cliente elige producto → click en "Lo quiero"
2. Se abre WhatsApp con mensaje prellenado
3. Coordinar pago:
   - **Con despacho:** Transferencia bancaria → envío por Starken o Chilexpress a todo Chile
   - **Retiro presencial:** Plaza Metro Quilicura — coordinar horario por WhatsApp

**WhatsApp business:** `+56 9 XXXX XXXX` ← ⚠️ REEMPLAZAR antes de publicar

---

## Navegación

```
SETAVER    [Catálogo]  [Ofertas]  [Nosotros]    [🔍]  [Instagram ↗]
```

- Mobile: hamburger menu
- Logo "SETAVER" en Cormorant Garamond, no como imagen
- Sin íconos de carrito (no hay carrito)
- Sticky navbar con fondo `--setaver-bg` al hacer scroll

---

## Diseño — Reglas Específicas

### Lo que SÍ hacer:
- Espaciado generoso — respirar entre elementos
- Tipografía como elemento de diseño (títulos grandes, tracking generoso en labels)
- Imágenes en formato portrait (3:4) para ropa
- Transiciones suaves y lentas (300-500ms ease)
- Hover states sutiles (cambio de opacidad, no de color)
- Grid asimétrico en el hero si aplica

### Lo que NO hacer:
- Banners de descuento con colores estridentes
- Botones redondeados pill-shape (preferir bordes rectos o levemente redondeados 2-4px)
- Sombras pesadas tipo "card elevation"
- Animaciones rápidas o llamativas
- Texto en mayúsculas en párrafos (solo en labels/badges)
- Más de 3 pesos tipográficos en una misma sección

---

## Responsive

- **Base:** 375px (iPhone SE) — mobile first
- **Breakpoints:** sm:640 / md:768 / lg:1024 / xl:1280
- Grid productos: 2col → 3col → 4col
- Imágenes: siempre `next/image` con `sizes` correctos
- Botón WhatsApp: siempre visible y fácil de tocar en mobile (mínimo 48px altura)
- Navbar mobile: hamburger → drawer lateral

---

## Información del Negocio (placeholders a completar)

| Campo | Valor | Estado |
|-------|-------|--------|
| Instagram | `@setavercl` | Completado |
| WhatsApp | `+56 9 9861 3859` | Completado |
| Punto de retiro | Plaza Metro Quilicura, Santiago | ✅ |
| Mercado | Solo Chile (CLP) | ✅ |
| Moneda | Peso chileno — formato `$XX.XXX CLP` | ✅ |

---

## Referencias de Inspiración Visual

- **Tienda Sako** (tiendasako.cl) — navegación por categorías, hover de imagen, badge "Nuevo", grid limpio
- **Sioux Jeans** (siouxjeans.cl) — menú detallado, sección "New In", estructura hombre/mujer
- **Marcas premium internacionales de referencia:** Aesop, COS, Arket, A.P.C.

**Anti-referencias (evitar):** Falabella, H&M Chile, plantillas Wix coloridas

---

## Frases que definen el proyecto

- *"Encontré una prenda única y tomé una decisión inteligente."*
- *"Esta marca sabe exactamente lo que hace."*
- *"Mobile first, desktop enhanced."*
- *"El cliente compra por WhatsApp, la web convence."*
- *"Menos es más — siempre."*