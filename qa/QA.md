# QA del sitio Biblia (copia de DEC §11)

Copiada de DECISIONES.md §11 el 15-11-2026. Cada pasada deja qa/informe-<lote>.md con ✓/✗ por punto.

La usan B4 (sobre el piloto), cada tanda de B5 (sobre su lote) y B6 (sobre todo). Se copia a `qa/QA.md` en B4 y cada pasada deja `qa/informe-<lote>.md` con ✓/✗ por punto.

### A. Cobertura
- [ ] Los **73 libros** existen en `content/es/libros/`, en el orden canónico, con `orden` 1..n por sección sin huecos (`npm run validar`).
- [ ] Los **7 deuterocanónicos** tienen `deuterocanonico: true` y **ningún otro** lo tiene; Ester y Daniel tienen `adiciones_griegas`.
- [ ] Cada libro `completo` tiene **3-6 enseñanzas**, `autoria`, `datacion` (con `rango`), `canon` y 2-3 `fuentes`.
- [ ] En el lote: todos los libros pasan de `esbozo` a `completo`. En B6: `validar -- --estricto` sin errores (73/73, temas completos).
- [ ] Cada tema tiene al menos **3 enseñanzas de 2 libros distintos** enlazadas (en B6; en lotes, informar del recuento).

### B. Pluralidad
- [ ] Cada enseñanza tiene las tres capas (texto, lecturas, crítica).
- [ ] Ninguna lectura de tradición ni frase crítica sin **verbo de atribución**; búsqueda de «en realidad», «lo cierto», «sin duda», «verdadera interpretación», «mito», «la Palabra de Dios nos» = 0 resultados.
- [ ] Todo lo `[D]` de la investigación para ese libro aparece como `acuerdo: "discusion"` con ≥ 2 posturas.
- [ ] Los textos del AT con lectura cristológica muestran la lectura judía al lado (§3).
- [ ] Los textos incómodos del libro (si los hay) están tratados, no omitidos.
- [ ] Muestra de lectura humana: 1 de cada 5 enseñanzas, leída de principio a fin buscando juicio de valor del sitio.

### C. Fuentes, citas y enlaces
- [ ] Cada fuente existe (autor, título, editorial, año comprobados; la investigación avisa de que no se abrieron una a una). Las de INVESTIGACION §6 llevan sus datos completos.
- [ ] Cada `pasaje` es válido: el capítulo existe (≤ `capitulos` del libro) y la numeración sigue §4 (salmos con doble número cuando difiera).
- [ ] Cada `cita` bíblica: ≤ 40 palabras, Torres Amat, texto **cotejado** con la fuente digital apuntada en `docs/TRADUCCION.md`.
- [ ] Citas de autores ≤ 15 palabras con atribución.
- [ ] Todos los enlaces internos llevan a algo que existe (validador) y todas las URL externas responden (comprobar con un script de `fetch` HEAD, sin navegador).
- [ ] Agente `revisor-de-contenido` pasado sobre el lote, y sus ✗ resueltos o justificados.

### D. Visual (sin navegador en lotes de contenido; con navegador solo en B4 y B6, uno a la vez)
- [ ] `npm run validar` (contenido, contraste, textos en código) y `npm run build` sin errores.
- [ ] `npm run capturar`: 2 temas × 2 anchos sin errores mudos, sin huecos vacíos, sin desbordamiento horizontal, rótulos legibles y objetivos táctiles ≥ 44 px en móvil, en las rutas de `presupuestos.rutas` (portada, un libro completo, uno deuterocanónico, un tema, `#/temas`, `#/canon`).
- [ ] `npm run auditar`: presupuestos de carga cumplidos; 0 contextos WebGL.
- [ ] Las insignias (deuterocanónico, acuerdo, abierta) se entienden **sin color** (revisión de captura en escala de grises por un subagente).
- [ ] Cada visualización tiene su alternativa textual y funciona con teclado.
- [ ] Reels: se reproducen en la ficha, con póster, transcripción y fuentes visibles.
