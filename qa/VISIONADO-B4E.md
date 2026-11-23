# Hoja de visionado B4-E · Rut con la lectura amena · 16-11-2026

Lo que hay que mirar antes de dar Rut por modelo de B5. El sitio se ve con
`npm run build && npx vite preview --port 4173` y abriendo `#/l/rut`. Capturas nuevas en `capturas/`
y las de antes en `qa/antes-b4e/`.

## 1. Qué mirar en `#/l/rut`

En escritorio y en móvil, con tema claro y con tema oscuro:

1. **El primer pantallazo.** Migas, rótulo de sección, título y la **entradilla en serif** (el
   resumen, en negro, no en gris). Debajo va «En esta página»: los cinco titulares seguidos deberían
   contar el libro. En móvil sale plegado.
2. **La presentación.** Son 3 párrafos cortos. Abre con la familia que huye del hambre, no con «Rut
   es un relato…».
3. **«Quién y cuándo».** Tradición y crítica en dos columnas, sin tarjetas. Las dos dataciones van
   en la caja «En discusión», con quién sostiene cada una. Debajo, la línea de dataciones.
4. **Las 5 enseñanzas.** Cada una lleva su número grande en el ocre de Históricos y su titular. Las
   capas no van en tarjetas: llevan un rótulo pequeño numerado y las lecturas, un filete fino gris.
   - La capa 3, «Lecturas académicas», aparece en la 1 (Trible) y en la 4 (Trible; Fewell y Gunn).
   - En la 2, la 3 y la 4 la crítica es una **caja de disputa** con posturas en lista. Es la única
     caja de cada enseñanza.
   - Las fuentes de cada enseñanza van plegadas en una línea, «Fuentes · n».
5. **«Para recordar»** del libro, al final: cinco frases con una marca a la izquierda.
6. **El reel** «Rut, la extranjera». En escritorio va el vídeo a la izquierda y las fuentes y la
   transcripción (plegada) a la derecha. En móvil va uno debajo del otro.
7. **«En qué Biblias está».** Ahora va después del contenido y en forma de tabla sin tarjetas.

En un tema (`#/t/extranjero-y-hospitalidad`): la introducción en párrafos serif, «Dónde divergen
las lecturas» en una caja y su «Para recordar».

## 2. Antes y después (DEC §13.5), ya en pantalla

**Antes** (`qa/antes-b4e/movil-claro-l-rut.png`): 12 432 px de alto en móvil, unas **16,8
pantallas**. Tarjetas dentro de tarjetas y párrafos de 15-20 líneas.

**Después** (`capturas/movil-claro-l-rut.png`): 12 448 px, otras **16,8 pantallas**. **No cumple
el listón de §13.6** (≤ 12 pantallas, 8880 px). En escritorio pasa de 8761 a 10 047 px, porque la
columna, ahora centrada a 68ch, es más estrecha que antes.

Por qué no baja, medido en móvil a 360 px:

| Bloque | Alto |
|---|---|
| Las 5 enseñanzas | 7982 px |
| — de eso, texto puro (7155 caracteres a ~43 por línea) | ~5500 px |
| — rótulos, huecos de §13.2 (`--e8` entre capas) y cajas | ~2500 px |
| Presentación | 509 px |
| Quién y cuándo | 750 px |
| Línea de dataciones | 198 px |
| Para recordar | 436 px |
| Reel (con el vídeo ya al 60 % del ancho) | 608 px |
| En qué Biblias | 505 px |
| Pasajes y fuentes | 464 px |

Solo el texto de las enseñanzas y el resto de bloques ya pasan de 8880 px. Llegar a 12 pantallas sin
plegar capas (§13.3 lo prohíbe) exige **quitar un 30 % del texto**, unos 3800 caracteres. Eso es
decisión de contenido y la he subido al jefe. Hay otras salidas:
- subir el listón a ~17 pantallas;
- plegar «En qué Biblias» y «Quién y cuándo» en móvil, que ahorra ~1000 px;
- bajar el presupuesto de `reglas.lectura` de 1800 a ~1200 caracteres por enseñanza.

La pega ya no es el alto en sí. Antes, esas 16,8 pantallas eran tarjetas dentro de tarjetas y
párrafos de 15-20 líneas. Ahora son capítulos con aire, de 4 frases por párrafo como mucho.

Hoja de contacto en `qa/hoja-b4e/`, con el antes a la izquierda y el después a la derecha:

| Hoja | Qué enseña |
|---|---|
| 1 | Móvil, el inicio |
| 2 | Móvil, las enseñanzas |
| 3 | Móvil oscuro, el final |
| 4 | Escritorio, el inicio |
| 5 | Escritorio oscuro, una enseñanza |
| 6 | El tema del extranjero en móvil |

El `que_dice` de la enseñanza 1 en pantalla:

> Tres viudas en el camino de Moab a Belén. Noemí ha perdido al marido y a sus dos hijos, y pide a
> sus nueras que vuelvan con sus familias. Orpá se despide con un beso. Rut se queda.
>
> Rut le promete ir adonde ella vaya y morir donde ella muera: su pueblo y su Dios serán los suyos
> (1,16-17). Nadie le pedía tanto. Ninguna ley obligaba a una nuera viuda a seguir a su suegra. El
> libro llama a esa lealtad *jésed*: la fidelidad generosa, la que nadie puede exigir (1,8; 2,20; 3,10).

**Veredicto de sonnet sobre la hoja de contacto**, según los criterios de §13.2-13.3. Lo que mira:

| Criterio | Resultado |
|---|---|
| Ninguna tarjeta dentro de otra; solo cajas de disputa y «Para recordar» | cumple |
| Capas como secciones numeradas, sin tarjeta | cumple |
| Lecturas con filete neutro y sin color propio | cumple |
| Número grande en el acento, titular serif y filete entre enseñanzas | cumple |
| Texto serif en color de texto; columna de 34-38 caracteres en móvil y centrada en escritorio | cumple |
| Entradilla serif e «En esta página» plegado en móvil, con triángulo | cumple |
| Sin texto cortado ni pisado, en claro ni en oscuro | cumple |
| Reel completo con su póster | cumple |

Su juicio: «se lee mucho mejor: de una pila de tarjetas a un flujo editorial».

Lo peor que queda, según sonnet. No lo he cambiado y lo apunto para quien lo vea:
- Los rótulos de capa en versalitas a `--t-micro` son lo menos legible de la página. Se podrían
  subir a `--t-pequeno`.
- En el gráfico de dataciones de móvil, las etiquetas «Crítica…» y «En discusión» quedan muy pegadas
  a las barras. Es la mecánica `dataciones` y no se ha tocado en B4-E.
- En escritorio, la lista de «En esta página» queda sangrada respecto a la columna.
- En el tema, «Pasajes del tema» sigue en lista gris pequeña: son metadatos, como manda §13.2.

## 3. Medidas

- `validar`: 0 errores (antes, 54). Los avisos son solo los esbozos: 72 libros y 21 temas. No se
  ha tocado `reglas.json`.
- `tsc --noEmit` limpio. Contraste: 62/62 en AA. Idiomas: ningún literal en el código.
- **build** en verde. **capturar**: sin errores en los dos temas y los dos anchos.
- **auditar**:

  | | Escritorio | Móvil de gama baja |
  |---|---|---|
  | JS crítico | 40,7 kB (presupuesto 200) | 40,7 kB |
  | LCP | 496 ms | **2812 ms** (presupuesto 2500) |
  | CLS | 0 | 0,001 |
  | WebGL | 0 contextos | 0 contextos |

  El LCP de móvil se pasa del presupuesto, pero `auditar` lo mide en la portada (`#/`), no en Rut, y
  B4-E no ha tocado la portada. Se ve si es de antes cuando se pase sobre una versión sin B4-E.
- Arreglado tras la primera captura:
  - «En esta página» en móvil se veía como un rótulo suelto: con `display: flex`, el `<summary>`
    perdía el triángulo, y ya lo tiene;
  - el vídeo del reel ocupaba 583 px a todo el ancho y ahora se queda en el 60 %.
- **Revisor de contenido** (sonnet). No pudo leer el texto anterior porque le di mal la ruta, así
  que solo comprobó que cada lectura sigue en el texto actual. Siguen todas: Trible, Fewell y Gunn,
  Rut Rabá, Baba Batra 91a, Brown, Rashi y el Targum, las dos dataciones, la réplica a Esdras y
  Nehemías con su «quizá», las lecturas evangélica y liberal del *goel* y la ambigüedad de «a sus
  pies».
- **La comparación de antes y después, frase por frase, la hice yo** (Rut-amena), con el texto
  original a la vista. Encontré **tres pérdidas**, todas en la lectura judía de la enseñanza 2, y ya
  están repuestas:
  - «de David, *según la tradición*, vendrá el mesías»;
  - «una de las razones *que da la tradición* para leerlo en Shavuot: David nació y murió en esa
    fiesta». Sin la atribución, parecía un dato;
  - «el midrás Rut Rabá insiste en el valor de la conversión sincera».
- El revisor señaló además cinco cosas que había metido yo al reescribir, y ya están corregidas:
  - el sujeto de «En Is 7,14» queda en Rashi;
  - *diákonos* se glosa «servidora o diaconisa, y se discute si designa un cargo»;
  - el sentido espiritual de la extranjería se queda en 1 Pe 2,11, sin Mt 25;
  - vuelve «Ninguna de las dos posturas principales…»;
  - los `para_recordar`, con «según el libro» y «según 2 Sm 7».

  **Ya venía así del texto aprobado y no se ha tocado, porque cambiarlo es contenido, no forma.** Lo
  tiene que decidir el humano:
  - En el tema mesías, «la tradición judía no lee en Is 53 al mesías de los cristianos» convive con
    lecturas mesiánicas judías de Is 53. El Targum ya se cita, pero el `para_recordar` lo simplifica.
  - En Baba Batra 91a, la culpa de Elimélec es no ayudar a su pueblo en la hambruna, no solo irse.
  - El contraste vacío/plenitud se marca sobre todo con «llena/vacía» (1,21; 4,14-15), más que con el
    juego Noemí/Mará.
  - «Ya en el siglo VIII a. C.» para Is 11 y Mi 5: la fecha se discute.
  - Hay lecturas sin fuente en `fuentes`: «la tradición rabínica admira…» del *goel*, la lectura
    católica del lamento y «en lo esencial las demás cristianas».
  - En Rut 3,9: «que la tome como esposa» en la enseñanza 4 frente a «que la acoja como pariente
    redentor» en los pasajes clave.

## 4. Lo que cambió en el texto y conviene juzgar

- Tres titulares nuevos: «Una espigadora y el pariente que debía rescatarla» (enseñanza 3) y «Noemí
  vuelve vacía y culpa a Dios» (5). La 1, la 2 y la 4 conservan el suyo.
- Varias posturas no tienen nombre propio: «Una parte de la crítica», «Otra postura», «Algunos
  críticos». Así venían en el texto de antes. Ponerles autor (Campbell, Sasson…) exige comprobarlo
  en las fuentes, y no lo he inventado.
- Glosas añadidas: midrás (comentario antiguo), Padres de la Iglesia, la era, Rashi (comentarista
  judío medieval), Targum de Jonatán (traducción aramea antigua) y *diákonos* («servidora» o
  «ministra»).

## 5. Lo que sigue abierto

- **Q1 del reel (Shavuot):** la frase va pegada a la anterior y Whisper la oye «Shabuot». Se decide
  a oído.
- **Q4 del reel:** sin medir.
- `scripts/importar-reels.mjs` no existía en biblia y se ha escrito en B4-E a partir del de
  sintergia. Las fuentes del reel se declaran en el propio guion, con la lista de `guion-fuentes.md`.
