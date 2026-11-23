# Biblia: el texto entero, por libros · Decisiones

Encargo e-31a5c8 · Tarea B2 (t-44637a) · 14-11-2026 · Base: `investigacion/INVESTIGACION.md` y los cinco ficheros por sección.

Este documento fija lo que **no se vuelve a discutir** en B4–B6. Si una ficha de ejecución choca con él, manda este documento; si este documento está mal, se corrige aquí primero (y se avisa a Sócrates), no en el código.

Las decisiones marcadas **(por defecto)** responden a preguntas abiertas de INVESTIGACION §7 que el humano aún no ha contestado. Se aplican así salvo que diga otra cosa en la revisión B3. Están reunidas en el §12.

---

## 1. Qué es el sitio

Un sitio divulgativo en español que recorre **los 73 libros del canon católico**, uno por uno, y cuenta de cada uno **qué enseña**, **cómo lo leen las distintas tradiciones** y **qué dice la crítica histórica**. Los **temas transversales** (alianza, perdón, extranjero…) cosen los libros entre sí.

- **Para quién:** un lector adulto curioso, creyente o no, que no es especialista. Debe salir sabiendo más sin que nadie le diga qué creer.
- **Postura (por defecto):** **neutral, con el canon católico como estructura**. El sitio no es catequesis ni polémica. Ordena los libros como la Biblia católica porque es el canon más amplio de Occidente que incluye a los demás, no porque sea el «correcto».
- **Solo español.** Ni inglés ni paridad de idiomas (ver §9).

## 2. Canon y deuterocanónicos

- **73 libros**: 46 del AT y 27 del NT, en el **orden de la Biblia católica española** (el de INVESTIGACION §1: Pentateuco → Históricos → Sapienciales → Profetas → NT).
- **Deuterocanónicos (7):** Tobías, Judit, 1 Macabeos, 2 Macabeos, Sabiduría, Eclesiástico (Sirácida) y Baruc (con la Carta de Jeremías, Bar 6). Llevan `"deuterocanonico": true`.
- **Adiciones griegas** a Ester y Daniel: el libro no es deuterocanónico, pero lleva `"adiciones_griegas"` con los pasajes (Est 10,4–16,24; Dn 3,24-90; Dn 13; Dn 14).
- **Cómo se marcan en pantalla** (siempre forma + texto, nunca solo color):
  - Insignia de texto «Deuterocanónico» junto al nombre, con un `title`/nota que lo explica en una frase.
  - En el mapa del canon (§7), los deuterocanónicos con **trama rayada** además del acento de su sección; las adiciones griegas con **borde discontinuo**.
  - En la ficha de libro, un bloque fijo **«En qué Biblias está»**: católica / ortodoxa / judía / protestante, con una línea cada una (datos de INVESTIGACION §2 y del campo `canon`).
- La palabra «apócrifo» solo se usa **atribuida** («las Biblias protestantes los llaman apócrifos»), nunca como etiqueta del sitio.
- Una página fija **«Qué es el canon»** explica la tabla de INVESTIGACION §2 (Trento, Hipona/Cartago, canon judío, Lutero, ortodoxos), sin tomar partido.

## 3. Pluralidad de lecturas

Regla de oro: **el sitio describe quién lee qué; no dictamina.**

- **Capas por enseñanza, siempre en este orden** (la 3 es opcional; decisión del humano, 16-11, ver §13.4):
  1. **Qué dice el texto** — paráfrasis fiel en español actual + pasaje + cita breve opcional (§4).
  2. **Cómo lo leen las tradiciones** — solo las que **difieren** de verdad en ese punto: judía, católica, ortodoxa, protestante (evangélica o liberal, si difieren entre sí). Si todas coinciden, una sola línea: «Lectura común a las tradiciones judía y cristianas: …». No se rellenan columnas por simetría.
  3. **Lecturas académicas** — lecturas no confesionales con escuela y autor nombrados (literaria, feminista, de la liberación, judaísmo académico…): Trible en Rut, Gutiérrez en Job, Levine en los evangelios. Campo `academica`; 0-2 por enseñanza. Ya no van dentro de `critica.texto`.
  4. **Qué dice la crítica histórica** — datación, redacción, contexto, con su **grado de acuerdo**. Si es `discusion`, sus posturas van en `critica.posturas` y se pintan en la caja de disputa (§13.3).
- **Grado de acuerdo**, traducido de las marcas de la investigación: `[C]` → etiqueta **«Consenso amplio»**; `[D]` → **«En discusión»**, y entonces se dan **las dos (o más) posturas principales con quién las sostiene**. Nada marcado `[D]` se escribe en indicativo cerrado.
- **Verbos de atribución obligatorios** en las capas 2 y 3: «la tradición judía lee…», «la mayoría de críticos data…», «para la lectura católica…». Prohibido: «en realidad», «lo cierto es», «la verdadera interpretación», «sin duda».
- **Mismo peso visual** para todas las lecturas: mismas tipografías y tamaño; ninguna va primero «por importancia». Orden fijo de las tradiciones: **judía, católica, ortodoxa, protestante** (cronológico de formación) y luego **crítica histórica**.
- **AT leído por judíos y cristianos (por defecto: lado a lado).** Donde el cristianismo lee un texto del AT como profecía de Cristo (Is 7,14; Is 53; Sal 22; Gn 3,15…), se muestran **ambas lecturas en paralelo** con la crítica después. Nunca se presenta la lectura cristiana como «cumplimiento» en voz del sitio.
- **Textos incómodos (por defecto: sí, explícitos).** Herem, esclavitud, violencia, textos sobre mujeres, Rom 1,26-27, salmos imprecatorios: se tratan con su contexto y con cómo los leen hoy las tradiciones y la crítica. No se omiten ni se suavizan.
- **Interpretaciones abiertas:** una enseñanza con `"abierta": true` muestra un aviso visible «Interpretación abierta» y la capa 2 o 3 da al menos dos lecturas enfrentadas. Se usa cuando el sentido mismo del texto se discute (no solo la fecha): p. ej. Cantar (amor humano / alegoría), Is 53, 1 Cor 14,34-35, Rom 13.

## 4. Traducción de referencia y citas

- **Traducción de referencia: Torres Amat** (1823-1825; Félix Torres Amat, †1847). Católica, **73 libros, dominio público**. Es la única candidata completa y libre que dio la investigación (INVESTIGACION §4, opción A).
- **Sin texto paralelo de la Reina-Valera 1909** (descartado: duplica trabajo y le faltan los deuterocanónicos).
- **Requisito previo, en B4:** localizar una edición digital de Torres Amat **sin notas ni modernizaciones con autor propio**, y apuntar en `docs/TRADUCCION.md` la URL, la edición de origen y por qué es de dominio público. **Si no se encuentra una fuente verificable, se aplica la opción B**: el sitio no reproduce texto bíblico, solo pasaje + paráfrasis propia (el modelo de fichas ya funciona así; la cita es opcional).
- **Cómo se cita:**
  - La **paráfrasis propia** en español actual es lo principal (`que_dice`). La cita textual es **opcional y breve**: máximo **40 palabras**, una por enseñanza, con `"traduccion": "Torres Amat"` y su referencia.
  - El español del s. XIX se respeta tal cual (ortografía modernizada solo en tildes, si la fuente lo hace); no se «corrige» el texto.
  - Ningún otro texto bíblico se copia, de ninguna traducción protegida (BJ, CEE, RV60, NVI…), ni siquiera en citas breves: evita mezclar regímenes de derechos.
  - Las citas de autores (Rashi, Agustín, Lutero, exégetas modernos) siguen la regla de la plantilla: **≤ 15 palabras**, con el autor nombrado y, si la atribución es solo tradicional o dudosa, dicho en la frase.
- **Numeración (por defecto):**
  - Referencias con el formato español **«Libro capítulo,versículo-versículo»**: `Rut 1,16-17`, `Gn 1,26-28`, `1 Cor 13`. Abreviaturas de la tabla `content/es/libros/*.json` (`abreviatura`), una sola forma por libro.
  - **Salmos: numeración hebrea, con la griega/Vulgata entre paréntesis cuando difiera**: `Sal 23 (22)`. Es lo que encuentra hoy el lector en la mayoría de Biblias y en Internet.
  - **Ester y Daniel:** numeración de la Vulgata para las adiciones (`Est 10,4–16,24`, `Dn 13`, `Dn 14`), que es la de Torres Amat.
  - Cuando la cita de Torres Amat esté en otra numeración (salmos), el campo `cita.referencia` lleva la de la fuente y `pasaje` la del sitio.

## 5. Modelo de contenido

Se construye sobre la **variante `app` de la plantilla, sin módulo `figura`** (§8). Todo el contenido es JSON en `content/es/`, validado por `scripts/validar-contenido.mjs` con las reglas de `content/reglas.json`. Ningún texto visible vive en el código (`check-idiomas.mjs`).

### 5.1 Colecciones

| Colección | Dónde | Unidad | Cuántas |
|---|---|---|---|
| `secciones` | `content/es/secciones.json` (lista) | sección del canon | 5 |
| `libros` | `content/es/libros/<id>.json` | un libro | 73 |
| `ensenanzas` | `content/es/ensenanzas/<libro>-<slug>.json` | una enseñanza de un libro | 3-6 por libro (≈ 330) |
| `temas` | `content/es/temas.json` (lista) | tema transversal | 24 (+ 4 posibles) |

Los `id` son kebab-case sin tildes ni eñes: `genesis`, `1-samuel`, `cantar-de-los-cantares`, `eclesiastico`; enseñanzas `rut-lealtad-jesed`; temas `extranjero-y-hospitalidad`. El directorio de enseñanzas es **plano** (el validador no lee subcarpetas): el prefijo del libro en el nombre de fichero hace de carpeta.

### 5.2 Sección (`seccion.schema.json`, sustituye a `grupo`)

```json
{ "id": "historicos", "orden": 2, "nombre": "Libros históricos", "testamento": "AT",
  "resumen": "40-300 car.", "acento": "<token de color, §7>" }
```
Las 5 secciones: `pentateuco`, `historicos`, `sapienciales`, `profetas`, `nuevo-testamento`. El NT se subdivide con el campo `bloque` del libro (evangelios, hechos, cartas-paulinas, cartas-catolicas, apocalipsis), no con más secciones.

### 5.3 Libro (`libro.schema.json`, sustituye a `ficha`)

| Campo | Tipo | Obligatorio | Qué es |
|---|---|---|---|
| `id`, `seccion_id`, `orden` | str, str, int | sí | `orden` 1..n dentro de la sección, sin huecos |
| `nombre` | str 3-80 | sí | «1 Samuel», «Eclesiástico (Sirácida)» |
| `abreviatura` | str | sí | «1 Sm», «Sir» |
| `bloque` | enum | solo NT | ver §5.2 |
| `capitulos` | int | sí | en la numeración del sitio |
| `deuterocanonico` | bool | sí | §2 |
| `adiciones_griegas` | [str] | no | pasajes, solo Ester y Daniel |
| `estado` | `esbozo` \| `completo` | sí | `esbozo` = solo datos básicos y resumen; se ve «En preparación» |
| `resumen` | str 40-300 | sí | de qué va el libro, en dos frases |
| `presentacion` | str 400-1300, ≥ 2 párrafos | si completo | el libro en su conjunto: género, estructura, por qué importa |
| `autoria` | `{tradicion, critica, acuerdo}` | si completo | `acuerdo`: `consenso` \| `discusion` |
| `datacion` | `{tradicion, critica, acuerdo, rango}` | si completo | `rango`: `[desde, hasta]` en años (negativos = a. C.), alimenta la línea temporal (§7) |
| `canon` | `{judia, ortodoxa, protestante}` | si completo | una línea cada una; la católica se da por supuesta |
| `pasajes_clave` | [`{pasaje, nota}`] | no | 2-5 versículos que conviene conocer |
| `para_recordar` | [str] | si completo | 3-5 frases de ≤ 140 car. (§13.3); también en tema (2-4) |
| `datacion.posturas` | [`{quien, texto}`] | si `acuerdo: discusion` | 2-4 posturas de la fecha en disputa (§13.3) |
| `fuentes` | [`{titulo, autor, url?, tradicion}`] | si completo | 2-3; `tradicion`: `judia` \| `catolica` \| `ortodoxa` \| `protestante` \| `critica` \| `literaria` |

Las enseñanzas **no se listan en el libro**: el libro las reúne por `libro_id` + `orden`. Una sola fuente de verdad para el enlace.

### 5.4 Enseñanza (`ensenanza.schema.json`, nueva)

| Campo | Tipo | Obligatorio | Qué es |
|---|---|---|---|
| `id`, `libro_id`, `orden` | str, str, int | sí | `orden` 1..n dentro del libro |
| `titulo` | str 12-70 | sí | la enseñanza en una frase que afirma algo (§13.1): «La lealtad que va más allá del deber» |
| `pasaje` | str | sí | «Rut 1,16-17» |
| `que_dice` | str 200-700 | sí | capa 1: empieza por la escena (§13.1); 1-2 párrafos separados por línea en blanco |
| `cita` | `{texto, referencia, traduccion}` | no | ≤ 40 palabras, Torres Amat (§4) |
| `lecturas` | [`{tradicion, texto}`] | sí, ≥ 1 | capa 2; `tradicion`: `judia` \| `catolica` \| `ortodoxa` \| `protestante` \| `comun`; texto 80-420 |
| `academica` | [`{enfoque, autor, texto}`] | no, 0-2 | capa 3 (§3, §13.4); `enfoque`: `literaria` \| `feminista` \| `liberacion` \| `judaismo-academico` \| `otra`; texto 80-420 |
| `critica` | `{texto, acuerdo, posturas?}` | sí | capa 4; texto 80-420; `acuerdo`: `consenso` \| `discusion`; `posturas`: [`{quien, texto}`] 2-4, **obligatorio si `discusion`** |
| `abierta` | bool | no | §3, interpretación abierta |
| `temas` | [id de tema] | sí, 1-3 | enlaces al índice de temas |
| `fuentes` | [`{titulo, autor, url?, tradicion}`] | sí, ≥ 1 | de la clave de INVESTIGACION §6 |

Regla: si `lecturas` tiene una sola entrada, debe ser `comun`. **Matiz (QA B6, 22-11):** en el AT, una lectura solo cristiana no es `comun` (se etiqueta `catolica`/`protestante`/`ortodoxa` según quién la sostenga, y se añade la judía si existe); en el NT, `comun` significa «común a las tradiciones cristianas». Si `critica.acuerdo` es `discusion`, el texto nombra al menos dos posturas.

### 5.5 Tema (`tema.schema.json`, nueva)

| Campo | Tipo | Obligatorio | Qué es |
|---|---|---|---|
| `id`, `orden` | str, int | sí | orden de INVESTIGACION §3 |
| `nombre` | str 3-80 | sí | «Extranjero, migrante y hospitalidad» |
| `estado` | `esbozo` \| `completo` | sí | |
| `resumen` | str 40-300 | sí | |
| `introduccion` | str 400-1300, ≥ 2 párrafos | si completo | cómo evoluciona el tema a lo largo de la Biblia, de libro en libro |
| `pasajes` | [str] | sí | pasajes clave de INVESTIGACION §3 |
| `divergencias` | str 80-700 | no | dónde se leen distinto judíos, cristianos y crítica |
| `relacionados` | [id de tema] | no | 0-4 |

Las **enseñanzas de un tema no se listan en el tema**: la página del tema las reúne buscando su `id` en `ensenanzas[].temas`, ordenadas por el orden canónico del libro. Así el enlace se escribe una vez, en la enseñanza.

### 5.6 Reglas de validación (`content/reglas.json`)

- `idiomas: ["es"]`, `paridad_idiomas: false`, `citas: null` (no hay campo de cita de autor: las de autores van dentro del texto, entre comillas, ≤ 15 palabras, y las revisa el QA §11 C; la cita bíblica tiene su propia regla, abajo), `escenografia: null`, `visualizacion: null`, `movimiento` fuera.
- **Referencias** (`exigir_uso` donde se indica):
  - `libros.seccion_id → secciones` (exigir uso)
  - `ensenanzas.libro_id → libros`
  - `ensenanzas.temas[] → temas` y `temas.relacionados[] → temas`
- **Orden sin huecos:** `libros` por `seccion_id`; `ensenanzas` por `libro_id`; `temas` global.
- **Longitudes** como en las tablas de arriba.
- **Cambios que necesita el validador (B4, mínimos y genéricos):**
  1. que una referencia acepte un **campo lista** (hoy solo compara un valor suelto);
  2. una regla `cita_biblica`: `max_palabras: 40` y `traducciones: ["Torres Amat"]`;
  3. una regla `cobertura`: cuenta libros por `estado` y **avisa** (no falla) mientras haya esbozos; con `--estricto` (lo usa B6) **falla** si hay menos de 73 completos o algún tema en esbozo;
  4. una regla `completo_exige`: si `estado` es `completo`, los campos marcados «si completo» son obligatorios.
  Se escriben genéricos (leen todo de `reglas.json`), y se anotan en `docs/CAMBIOS-PLANTILLA.md` para proponerlos luego a la plantilla.

### 5.7 Enlaces y rutas

Rutas en el fragmento (`#/…`), como la variante `app`:

| Ruta | Pantalla |
|---|---|
| `#/` | Portada: mapa del canon (§7) + las 5 secciones con sus libros + buscador |
| `#/s/<seccion>` | Una sección: presentación y sus libros |
| `#/l/<libro>` | Ficha de libro, en el orden de §13.2: cabecera con entradilla, «En esta página», presentación, «Quién y cuándo», enseñanzas, «Para recordar», reel, «En qué Biblias está», pasajes clave, fuentes |
| `#/l/<libro>/<n>` | Ancla a la enseñanza n dentro de la ficha (no hay página propia por enseñanza: se leen en su libro) |
| `#/temas` | Índice de temas |
| `#/t/<tema>` | Tema: introducción, divergencias, enseñanzas enlazadas agrupadas por libro, temas relacionados |
| `#/canon` | Página fija «Qué es el canon» (§2) |
| `#/acerca` | Método, traducción, fuentes, aviso de rigor |

- **Filtros del catálogo** (en la ruta, compartibles): `seccion`, `testamento`, `deuterocanonico`, `tema`, `estado`. Buscador sobre nombre, resumen y títulos de enseñanza.
- **Enlaces cruzados obligatorios:** cada enseñanza muestra sus temas como etiquetas que llevan a `#/t/…`; cada tema lleva a cada enseñanza (`#/l/libro/n`); cada libro lleva a su sección y a su anterior/siguiente en el canon.
- **Favoritos de la variante `app`: fuera** (no aportan aquí y añaden estado).

## 6. Voz

**Densa pero fácil**: mucha información por línea, sin jerga sin explicar. Referencia de tono: mentalista. **Lo concreto de la voz (gancho, límites medibles, titulares) está en §13.1, que manda sobre esta sección donde choquen.**

- Frases cortas, sujeto + verbo + lo que importa. Una idea por frase. Párrafos de 2-4 frases.
- **Cada término técnico se explica la primera vez** en la misma frase: «*goel*, el pariente que tenía el deber de rescatar a la familia». Palabras hebreas y griegas en cursiva, con transliteración simple.
- Datos concretos antes que adjetivos: «escrito probablemente en el s. V a. C.» y no «muy antiguo».
- **Tercera persona descriptiva** en el contenido; el sitio no tutea al lector en las fichas (sí en la interfaz: «Busca un libro»).
- Nada de tono piadoso ni irónico. Ni «la Palabra de Dios nos enseña», ni «los mitos de la Biblia».
- Fechas: «s. V a. C.», «hacia el 90 d. C.», «587 a. C.». Nombres en su forma española corriente (Moisés, Jesús, Pablo, Eclesiastés, Qohélet solo atribuido).
- Atribución siempre (§3). Las marcas `[C]`/`[D]` de la investigación **no se copian**: se convierten en `acuerdo` y en la redacción.

## 7. Estilo visual y visualizaciones

### 7.1 Sistema visual (skill `sistema-visual`)

- **Dos temas, claro y oscuro**, con contraste WCAG AA verificado (`check-contraste.mjs`).
- **Claro:** papel cálido apagado (no amarillo pergamino); **oscuro:** tinta azul-negra. Sin dorados, sin góticas, sin cruces ni símbolos religiosos de ninguna confesión en la interfaz: el sitio no es de ninguna.
- **Tipografía:** serif de lectura para el contenido y las citas bíblicas (p. ej. Source Serif 4 o Literata, Google Fonts); sans para interfaz y etiquetas (la de la plantilla). Las citas de Torres Amat, en cursiva serif con su referencia debajo.
- **Un acento por sección (5)**, repartidos en la rueda con ≥ 15° (skill `sistema-visual`, `--sugerir`). Orientativo: Pentateuco ocre, Históricos teja, Sapienciales verde oliva, Profetas azul, NT violeta. Las tradiciones **no** tienen color propio (evita que una «gane» visualmente): se distinguen por su rótulo.
- **Etiquetas fijas:** «Deuterocanónico», «Adiciones griegas», «Consenso amplio», «En discusión», «Interpretación abierta», «En preparación». Todas con texto; el color solo refuerza.

### 7.2 Visualizaciones (SVG, sin 3D)

Ningún contenido de este sitio depende de profundidad u oclusión: **cero escenas 3D** (`presupuesto_3d: 0`). Tres mecánicas en `src/vis/mecanicas/`, con el lenguaje de `src/vis/lenguaje.ts` (skill `mecanica-de-visualizacion`):

1. **`mapa-canon`** (portada y `#/canon`): los 73 libros como bloques en orden canónico, agrupados por sección, **ancho proporcional a los capítulos**; deuterocanónicos con trama, adiciones con borde discontinuo; un conmutador «Ver el canon de…» (católico / ortodoxo / judío / protestante) **atenúa** los libros que esa tradición no tiene (no los quita). Cada bloque es un enlace a su libro. Alternativa textual: la lista de libros con sus marcas.
2. **`dataciones`** (ficha de libro y una vista global en `#/acerca` o `#/canon`): para cada libro, **dos barras** en un eje de tiempo: la datación de la tradición y el intervalo `datacion.rango` de la crítica, con trazo discontinuo si `acuerdo` es `discusion`. Muestra de un vistazo dónde coinciden y dónde no. Alternativa textual: la frase de `datacion`.
3. **`matriz-temas`** (`#/temas`): temas en filas, secciones/libros en columnas, celda marcada donde hay enseñanzas enlazadas; tocar una celda lleva a las enseñanzas. Alternativa textual: la lista de temas con sus libros.

Nada de animación de scroll ni escenografía (la variante `app` no la tiene). Entradas discretas solo en la propia mecánica, respetando `prefers-reduced-motion`.

## 8. Forma técnica

- Plantilla `C:/Users/migue/plantilla-sitio`, **`--tipo app`, sin `--con figura`**: es un catálogo navegable de 73 fichas con filtros, buscador y rutas compartibles, no un recorrido de scroll de una pantalla. La variante trae rutas en el fragmento (válidas en GitHub Pages), catálogo y filtros.
- Lo que se quita de la variante: `content/en/`, favoritos, el campo `movimiento_id`, `scripts/generar-carteles.mjs` y su script, y las rutas de ejemplo de `presupuestos`.
- **`crear.mjs` no escribe en una carpeta existente.** Se crea en el scratchpad y se copia sin sobrescribir: `cp -rn <scratch>/biblia-sitio/. C:/Users/migue/biblia/`. Así `investigacion/`, `DECISIONES.md` y `FICHAS.md` no se tocan.
- Repositorio y publicación: solo con confirmación del humano (skill `publicar-sitio`; `gh` no está instalado, se usa el MCP de GitHub). Nada de push en B4/B5.
- RAM: un build, render o navegador a la vez en toda la máquina (pizarra). Antes de `npm run build`, `capturar` o `auditar`, comprobar con `Get-Process` que no hay otro en marcha.

## 9. Idioma

Todo en **español** de España, sin variante bilingüe: interfaz, contenido, alternativas textuales, metadatos, reels. `reglas.json` con `idiomas: ["es"]`. Las fuentes en otros idiomas se citan con su título original.

**Fuentes en español primero (por defecto):** cuando una obra de referencia tiene traducción española (NCBSJ, Brown, Ska, Finkelstein, Gutiérrez), se cita esa edición.

## 10. Reels

- **6 reels**: 1 en el piloto (B4) y **1 por sección** en B5 (5). Verticales 1080×1920, 45-60 s, **estilo divulgativo publicado** de `videos-cortos` (su skill de proyecto `reel-divulgativo`), con voz y rótulos.
- Se producen en `C:/Users/migue/videos-cortos` y se importan a este sitio como en mentalista: `content/reels.json` generado por `scripts/importar-reels.mjs` (copiado de mentalista y adaptado: el campo de enlace es `libro` o `tema` en vez de `concepto`), vídeos en `public/reels/`.
- **Cada reel cuenta una sola idea con dos lecturas**, y cierra sin veredicto. Fuentes del guion escritas **antes** de grabar la voz.
- Propuesta de temas (B4/B5 pueden afinarlos, no cambiar el criterio):

| Lote | Reel | Idea |
|---|---|---|
| B4 piloto | **Rut, la extranjera** | Una moabita es bisabuela del rey David: ¿por qué un libro tan corto molestaba tanto? (Lectura judía en Shavuot, cristiana en la genealogía de Jesús, crítica: respuesta a Esdras y Nehemías.) |
| Pentateuco | **Dos relatos de la creación** | Gn 1 y Gn 2 cuentan la creación dos veces y de forma distinta: qué hace con eso cada lectura. |
| Históricos | **Los libros que tu Biblia quizá no tiene** | Tobías, Judit, Macabeos…: por qué una Biblia católica tiene 73 libros y una protestante 66. |
| Sapienciales | **Job: la pregunta que no se responde** | El inocente que sufre y un Dios que contesta con otra pregunta. |
| Profetas | **¿Un Isaías o tres?** | Ibn Ezra ya lo sospechó en el s. XII: cómo se lee el libro según se vea uno o tres autores. |
| NT | **Cuatro evangelios, cuatro retratos** | Las mismas escenas contadas distinto: el problema sinóptico y qué hace la tradición con él. |

- QA de reels con la lista de `qa-reels.md` de mentalista adaptada + las comprobaciones de pluralidad del §11.

## 11. Lista de comprobación del QA

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

## 12. Pendiente del humano (no bloquea B4)

Aplicado **por defecto** en este documento; si el humano decide otra cosa en B3, se cambia aquí:

1. Traducción: Torres Amat, sin paralelo RV 1909; opción B si la fuente digital no se verifica (§4).
2. Postura: neutral con estructura católica (§1).
3. Profundidad: 3-6 enseñanzas, datación, canon, pasajes clave; sin mapas geográficos ni glosario aparte en esta fase.
4. Textos incómodos: explícitos (§3). **Sin ficha propia (QA B6, 22-11), pendientes de ficha futura:** Ez 16 y 23; Mt 27,25 y Mt 23; Jn 8,44; Mt 10,34; Gn 22; plagas y primogénitos de Egipto; Éx 32; Nm 5 y Nm 31; Pr 13,24, 23,13-14 y Sir 30,1-13; Eclo 42,14. No se han creado fichas nuevas.
5. AT judío y cristiano: lado a lado (§3).
6. Verificación: comprobación de fuentes y de cada `[D]` dentro de cada tanda de B5, no una pasada previa aparte (§11 C).
7. Fuentes en español primero (§9).
8. Salmos: numeración hebrea con la griega entre paréntesis (§4).
9. Enseñanzas: las de la investigación, ajustables por el ejecutor con motivo escrito en el informe de la tanda.

## 13. Lectura amena (B4-D, 16-11-2026)

Condición del humano al aprobar el piloto: «quiero que los textos sean agradables visualmente para el usuario y amenos». Esta sección lo traduce en reglas y **no se vuelve a discutir**. Manda sobre §6 y §7.1 donde choquen. **El rigor no se toca**: pluralidad, orden de tradiciones, atribución y disputas (§3) siguen igual. Lo ameno cambia la forma; nunca quita una lectura ni cierra lo que está en discusión.

Diagnóstico del piloto (capturas `capturas/*-l-rut.png`, revisadas por un subagente):
- El primer pantallazo no tiene gancho: título, abreviatura y un resumen en gris.
- La presentación ocupa un solo bloque de 883 car., que en móvil son 20 líneas.
- Cada capa va en su tarjeta con borde, y hay tarjetas dentro de tarjetas: el conjunto parece un **formulario**.
- Los rótulos de capa y de tradición pesan casi lo mismo que el texto.
- «En qué Biblias» y «Autoría y datación» gastan unas 3 pantallas antes de la primera enseñanza.
- Son unas **18 pantallas en móvil**, con cinco enseñanzas calcadas y sin pausa entre ellas.

### 13.1 Voz

1. **Empieza por lo concreto.** El primer párrafo de `que_dice`, de `presentacion` y de `introduccion` abre con una **escena, un personaje o una pregunta**: quién, dónde, qué pasa. Lo abstracto (el concepto, la lección) va después, nunca en la primera frase. Se escribe «Tres viudas en el camino de Moab a Belén», no «El libro de Rut presenta un modelo de lealtad».
2. **Frases cortas**: sujeto + verbo + lo que importa. **Máximo 30 palabras** por frase (validado), con una media de 12 a 20 y una subordinada como mucho. Antes que encadenar con punto y coma, se corta en dos.
3. **Párrafos de 2-4 frases y ≤ 420 caracteres** (validado). Cada párrafo, una idea. En el JSON se separan con una línea en blanco (`\n\n`).
4. **Un ejemplo por cada idea abstracta.** Si se dice «derecho de los pobres», se dice cuál: dejar sin segar los bordes del campo (Lv 19,9).
5. **Ninguna jerga sin explicar.** Todo término en cursiva lleva su glosa **pegada, en su primera aparición en la ficha**: tras coma, dos puntos, raya o paréntesis (validado: `glosa_cursiva`). Vale también para «deuteronomista», «Septuaginta» o «midrás» aunque no vayan en cursiva; eso lo mira el QA.
6. **Titulares que dicen algo.** El `titulo` de una enseñanza es una frase que afirma o pregunta, con verbo o con la tensión dentro: «Una moabita, bisabuela del rey David», «La lealtad que va más allá del deber». Nunca una etiqueta («La lealtad», «El *goel*»). Entre 12 y 70 caracteres (validado). Leídos seguidos en «En esta página», los titulares cuentan el libro.
7. **Relleno vetado** (validado, junto con las frases prohibidas de §11 B): «cabe destacar», «cabe señalar», «es importante señalar/destacar», «conviene señalar», «en este sentido», «a lo largo de la historia», «no es casualidad».
8. **Las capas 2-4 empiezan también por quién habla**: «La tradición judía lee…», «Para Phyllis Trible…», «Una parte de la crítica…». La atribución hace a la vez de rigor y de gancho: el lector sabe enseguida desde dónde se habla.

**Presupuestos** (validados en `reglas.json`, bloques `lectura` y `longitudes`):

| Bloque | Límite |
|---|---|
| `que_dice` | 200-700 car., 1-2 párrafos |
| cada lectura (`lecturas[]`, `academica[]`) | ≤ 420 car. (un párrafo) |
| `critica.texto` | ≤ 420 car. por párrafo; si es `discusion`, 2-4 `posturas` de ≤ 260 car. |
| **una enseñanza entera** (capas 1-4) | **≤ 1800 car.** |
| `presentacion`, `introduccion` de tema | 400-1300 car., **≥ 2 párrafos** |
| `para_recordar` | libro: 3-5 frases; tema: 2-4. Cada una ≤ 140 car. |

Hay tres cosas que no se miden y que revisa el QA en la muestra de lectura de §11 B: el gancho concreto (punto 1), el ejemplo (punto 4) y los titulares (punto 6).

### 13.2 Maquetación de la ficha de libro

Referencia: lo que gustó en software-engineer y en el piloto v2 de Sintergia (sintergia DEC §10). Es decir: **casi monocromo, bloques con forma en vez de párrafos seguidos, una sola columna de lectura, y cajas solo donde significan algo**. Se toma la forma, no el contenido.

**Orden** (sustituye al de §5.7):
1. **Cabecera**: migas → rótulo de sección · capítulos → título serif grande → insignias → **entradilla**. La entradilla es el `resumen`, en serif `--t-medio` y color `--texto` (no gris): es el gancho del primer pantallazo.
2. **«En esta página»**: los titulares de las enseñanzas como lista numerada de enlaces a `#/l/<libro>/<n>`. En móvil va plegada (`<details>`) tras la entradilla.
3. **Presentación**: 2-3 párrafos en serif.
4. **«Quién y cuándo»** (antes «Autoría y datación»): un solo bloque, con la tradición y la crítica en dos columnas **sin tarjetas** (filete fino a la izquierda) y la mecánica `dataciones` debajo. Si la fecha está en discusión, sus `posturas` van en la caja de disputa (§13.3).
5. **Enseñanzas** (§13.3).
6. **«Para recordar»** del libro.
7. **Reel**, si lo hay: vídeo y transcripción en dos columnas en escritorio, como en Sintergia v2.
8. **«En qué Biblias está»**: tabla de 4 filas sin tarjetas. En móvil, lista `dl` con el rótulo encima y el texto debajo. Va después del contenido porque es de consulta, y la insignia «Deuterocanónico» ya se ve en la cabecera.
9. Pasajes clave → fuentes del libro (3 visibles y el resto plegado) → anterior/siguiente.

**Tipografía y columna**
- El texto de contenido va en **serif** (`--fuente-titulo`, Newsreader) a `--t-base` (16-18 px), con interlineado 1.6. Interfaz, rótulos e insignias, en sans (Inter). Nada de contenido a `--t-pequeno` ni en `--texto-secundario`: el gris queda solo para metadatos.
- **Columna única de 60-68 caracteres** (`--medida-texto`), centrada en la página en escritorio, no pegada a la izquierda. Solo dos cosas salen a `--ancho-pagina`: las mecánicas y el «lado a lado» del AT leído por judíos y cristianos (§3), que a partir de 48rem va en dos columnas.
- **Móvil**: margen lateral de 16 px y nada de tarjetas con relleno que roben ancho (≥ 34 caracteres por línea). Sin dos columnas, y las citas a `--t-medio` como mucho.

**Jerarquía, de más a menos peso**:
1. Título del libro.
2. Titular de enseñanza: serif `--t-medio`, con el número grande en el acento de la sección.
3. Rótulo de capa: sans semibold en versalitas, con su número.
4. Rótulo de tradición o de autor: sans semibold `--t-pequeno`, color `--texto`.
5. Texto.
6. Metadatos: pasaje, fuentes, etiquetas.

**Ninguna tradición lleva color propio** (§7.1): mismo rótulo, mismo filete neutro y mismo tamaño para todas.

**Respiración**: `--e16` y un filete entre enseñanzas, `--e8` entre capas y `--e4` entre párrafos. Cada enseñanza es un capítulo, no una fila de una tabla.

### 13.3 Bloques con forma y cajas

**Regla de las cajas.** Una caja (fondo `--fondo-elevado` y borde) quiere decir «esto es distinto, detente aquí». Por eso **solo hay cuatro tipos**, **nunca una dentro de otra** y **como mucho una por enseñanza**, aparte de la cita:
1. **Caja de disputa**: cuando `critica.acuerdo` o `datacion.acuerdo` es `discusion`. Lleva el rótulo «En discusión» con icono y texto, una frase de entrada (`critica.texto`) y las `posturas` en lista, cada una con **quién la sostiene en negrita** y qué dice. Sustituye al párrafo que encadenaba «una parte… otra…».
2. **Aviso de interpretación abierta**, con `abierta: true`: una banda fina bajo el titular, no una caja grande. Si coincide con una disputa, se funde con la caja de disputa (rótulo doble).
3. **«Para recordar»**, al final del libro y del tema: 3-5 frases con una marca a la izquierda. Respetan la atribución como el resto («La crítica discute si…»): nunca presentan como hecho la tesis de una postura.
4. **Cita bíblica**, sin caja: serif cursiva a `--t-medio`, filete del acento a la izquierda, y la referencia y la traducción debajo en sans. Mientras no haya fuente Torres Amat verificada (opción B, §4) no se cita: la paráfrasis va en el texto, sin comillas que la hagan pasar por traducción.

**Las capas no van en tarjetas.** Cada capa es una sección con su rótulo numerado. Las lecturas de las capas 2 y 3 se separan con espacio y un filete neutro a la izquierda. **No se pliega ninguna capa ni ninguna lectura**: lo que hay que abrir pesa menos, y §3 exige el mismo peso para todas. Solo se pliegan las fuentes de cada enseñanza (en una línea de chips con su número) y la transcripción del reel.

**Pasos y listas.** Cuando el texto describe una secuencia (el procedimiento del *goel* en Rut 4, las etapas de una redacción), se escribe como lista en el JSON, con líneas que empiezan por `1. ` o `- `, y se pinta como lista numerada o con viñetas. Como mucho 5 elementos.

### 13.4 Capa «Lecturas académicas» (decisión del humano)

Las lecturas no confesionales tienen capa propia, entre las tradiciones y la crítica histórica: el campo `academica` [`{enfoque, autor, texto}`], con 0-2 por enseñanza. El rótulo de la capa es «Lecturas académicas», y cada lectura lleva su autor o escuela («Lectura literaria y feminista · Phyllis Trible») y su fuente en `fuentes` con `tradicion: "literaria"`. Tiene el mismo estilo y peso que una tradición. No se inventa ninguna por simetría: solo se añade si hay una lectura académica con nombre que diga algo distinto de la crítica histórica.

### 13.5 Antes y después: Rut, enseñanza 1 (`que_dice` de `rut-lealtad-jesed`)

**Antes**: 601 car. en 1 párrafo de 8 frases, que abre con la trama general.
> Noemí, viuda y sin hijos, decide volver de Moab a Belén y manda a sus dos nueras que regresen con sus familias. Una de ellas, Orpá, se despide. Rut no. Le responde con una promesa: irá adonde vaya Noemí, vivirá donde ella viva, su pueblo será el suyo y su Dios, el suyo. Morirá donde muera Noemí. Nadie le exigía nada de eso: la ley no obligaba a una nuera viuda a seguir a su suegra. El libro usa para este tipo de lealtad una palabra hebrea, *jésed* (1,8; 2,20; 3,10), que significa fidelidad generosa, la que se da sin que nadie pueda reclamarla. La promesa de 1,16-17 es su expresión más conocida.

**Después**: 2 párrafos de 4 frases. Abre con la escena, pega la glosa al término y quita la frase final, que repetía el pasaje del titular.
> Tres viudas en el camino de Moab a Belén. Noemí ha perdido al marido y a sus dos hijos, y pide a sus nueras que vuelvan con sus familias. Orpá se despide con un beso. Rut se queda.
>
> Rut le promete ir adonde ella vaya y morir donde ella muera: su pueblo y su Dios serán los suyos (1,16-17). Nadie le pedía tanto. Ninguna ley obligaba a una nuera viuda a seguir a su suegra. El libro llama a esa lealtad *jésed*: la fidelidad generosa, la que nadie puede exigir (1,8; 2,20; 3,10).

En pantalla deja de ser un párrafo gris dentro de una tarjeta con borde. Pasa a ser el texto serif de la capa 1 en la columna de lectura, bajo un titular con su número en el acento de Históricos.

### 13.6 Cómo se comprueba

- `npm run validar` comprueba `reglas.lectura` (frases, párrafos, presupuesto, cursivas, vetadas y listas) y `longitudes`. **Desde B4-D falla sobre Rut y sus 3 temas, con 54 errores**: es justo lo que reescribe B4-E. No afecta a ninguna otra ficha completa.
- En la muestra de lectura del QA (§11 B) se mira, además del juicio de valor, el gancho concreto, el ejemplo y los titulares (§13.1, puntos 1, 4 y 6).
- En la captura de `#/l/rut` en móvil (QA §11 D): **≤ 17 pantallas** (alto de página ≤ 17 × 740 px a 360 px de ancho; el humano subió el listón de 12 a 17 el 16-11: lo que cuenta es la forma, no recortar contenido), ninguna tarjeta dentro de otra, ninguna capa plegada y columna de ≥ 34 caracteres.
