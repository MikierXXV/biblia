# B6.T · JS crítico, objetivos táctiles y auditor (Rendimiento-biblia, 22-11-2026)

## Cambios
- `src/app/contenido.ts`: las 306 enseñanzas se cargan a demanda (`cargarEnsenanzas()`, import.meta.glob sin eager). Si la descarga falla, se reintenta en la siguiente navegación.
- `vite.config.ts`: manualChunks `ensenanzas` (un chunk, no 306).
- `src/main.ts`: `cuandoListas()` las pide solo en libro / tema / temas, al buscar, al filtrar por tema o al abrir el panel de filtros. Mientras tanto se muestra «Cargando…» (`vis.cargando`); si falla, `vis.error`.
- Objetivos táctiles: bloque `@media (pointer: coarse), (max-width: 40rem)` al final de `src/estilos/app.css`; `MIN_TACTIL_DEDO_PX` (44 px) en `src/vis/lenguaje.ts` para el mapa y la matriz. En escritorio no cambia nada.
- `src/vis/mecanicas/matriz-temas.ts`: en móvil, cada etiqueta va en su propia línea y los nodos debajo (con nodos de 44 px la columna de etiquetas se quedaba en ~10 caracteres). Área de toque en toda la fila.

## Medidas
| | Antes | Después |
|---|---|---|
| Chunk de entrada | 1.058 kB (334 kB gz) | 432 kB (129 kB gz) |
| Chunk de enseñanzas | (dentro) | 650 kB (210 kB gz), diferido |
| JS crítico (auditar) | 329,9 kB ✗ | 129,1 kB ✓ |
| LCP móvil de gama baja | 2308 ms | 1520 / 2340 ms con la máquina más tranquila; 4352 / 3976 ms con CPU al 43 % (✗) |
| LCP escritorio | — | 436 / 556 ms; 1172 ms con carga |
| Objetivos < 44 px a 360 px | marca, tradición, tema, mapa, nodos, Fuentes, índice | 0 (salvo el enlace de salto, que está fuera de pantalla hasta recibir el foco) |
| capturar | limpio | limpio (0 avisos) |

PENDIENTE PARA EL QA FINAL (lo decidió Sócrates el 23-11, opción b): repetir `auditar` con la máquina libre para dar el veredicto del LCP en móvil. En reposo dio 1520/2340 ms (✓) y con carga ~4 s (✗). Entre la pasada buena y la mala solo cambió la matriz de #/temas, que no está en la portada. Se cerró sin esa medida porque el turno pesado se quedó colgado y la RAM estaba al límite (0,2-0,4 GB).

Los objetivos táctiles los mide un guion propio (Playwright a 360 px, isMobile): ni capturar ni auditar los comprueban. Ojo: en headless, isMobile no activa `pointer: coarse`; por eso está también el `max-width`.

## Enlaces en frío (comprobado)
`#/l/rut/2` pinta las 5 enseñanzas y baja a la 2.ª; `#/?q=espigadora` da 1 libro; 0 errores de página.

## Menores, de antes (no los toca esta tarea)
- Portada a 360 px: el placeholder del buscador se corta («…o una en»).
- #/temas a 360 px: las etiquetas quedan a ~4 px del borde izquierdo; la nota y la última columna, contra el borde derecho.

## Capturas
qa/b6t-movil-temas.png · qa/b6t-movil-portada-{1,2,3}.png · qa/b6t-movil-libro-frio.png · qa/b6t-capturar-movil-claro.png · qa/b6t-capturar-escritorio-oscuro.png

## B7.1 · LCP en reposo y retoques (Publica-biblia, 23-11-2026)
- Retoque buscador: a ≤40rem el campo baja a 13 px (`app.css`, bloque tras `.buscador input::placeholder`). Texto 257 px sobre 274 disponibles a 360 px: cabe entero.
- Retoque #/temas: `matriz-temas.ts` usa un margen de 16 px reales (16/escala en unidades del viewBox) en vez de 8 unidades (~4 px). Etiquetas a 32 px del borde de pantalla, última columna a 326 de 344 (SVG 16–344).
- Medidas (máquina en reposo, build servido en :4180 porque :4173 lo ocupaba otro proyecto): LCP móvil 1320 ms (≤2500 ✓), escritorio 472 ms; JS crítico 129,1 kB ✓; CLS 0,043 ✓; WebGL 0 ✓. capturar: 0 avisos. No hizo falta preload.
