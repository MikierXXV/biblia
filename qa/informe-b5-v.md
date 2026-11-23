# Informe B5.V · Fuentes, posturas anónimas y etiqueta de Brown (B5.1-B5.7)

Tarea t-58f87d. `node scripts/validar-contenido.mjs`: contenido válido, 319 fichas, 0 errores. No se ha corrido `npm run validar` completo ni build (RAM justa). Solo existe `content/es`. Las cartas no se han tocado.

**Estado honesto: parcial.** Se hicieron los puntos 2 (Mt, Lc, Jn, Ageo y 7 fichas más), 3 y 4. El punto 1 (cotejo de fuentes en catálogo) solo cubre las obras nuevas; la búsqueda web respondía mal y el resto sigue sin comprobar. Siguen con posturas anónimas **52 ficheros** (de ellos, B5.1-B5.7 completos salvo lo de abajo).

## 1. Fuentes y citas sin comprobar

| Qué había | Qué quedó | Dónde se comprobó |
|---|---|---|
| Saldarini, *Matthew's Christian-Jewish Community* (Chicago, 1994) | Añadida a `mateo-no-vine-a-abolir-la-ley` | ci.nii.ac.jp/ncid/BA22956149; press.uchicago.edu (1994 confirmado) |
| Stanton, *A Gospel for a New People* (T&T Clark, 1992) | Añadida a la misma ficha | Búsqueda web: ficha bibliográfica con T&T Clark 1992 |
| Ringe, *Jesus, Liberation, and the Biblical Jubilee* (Fortress, 1985) | Añadida a `lucas-el-espiritu-me-ha-ungido` | philpapers.org/rec/RINJLA; archive.org |
| Yoder, *The Politics of Jesus* (1972) | Solo en `quien` (límite de 3 fuentes por ficha) | Búsqueda web: reseñas que la ligan al jubileo de Lc 4 |
| Gray, *The Least of My Brothers* (1989) | Añadida a `mateo-tuve-hambre…` | Búsqueda web, fuente secundaria (17 de 21 comentaristas medievales ven cristianos en «los más pequeños») |
| Davies y Allison, *Matthew*, ICC 3 (1997) | Añadida a `mateo-tuve-hambre…` | **Solo referencia secundaria** (un autor de Biola dice que apoyan la lectura inclusiva). Cotejar en el volumen. |
| Whybray, Tsumura, Cross y Freedman, Mendenhall, O’Callaghan, Dillon, Jeremias, Betz, Dodd, Bultmann | Añadidas a `fuentes` o a `quien` | **No comprobadas en catálogo.** Obras que conozco; títulos y años por verificar. |
| Fitzmyer *Acts*, Pervo, Stendahl, Eisenbaum, Maccoby, Miranda (B5.7); las listas de B5.2, B5.5; Pesajim 7b-8a, Sof 3,17, Ag 2,7, Jerónimo sobre Ageo (B5.6); citas talmúdicas de B5.3-B5.5 | Sin cambios | **Pendientes.** No se han podido abrir catálogos. Proponer pasada con acceso a WorldCat u Open Library. |

## 2. Posturas anónimas nombradas

| Ficha | Antes | Después | Seguridad |
|---|---|---|---|
| mateo-no-vine-a-abolir-la-ley | Una parte / Otra parte | Saldarini (dentro del judaísmo) / Stanton (comunidad separada) | Alta |
| mateo-tuve-hambre… | ídem | Gray (lectura de discípulos, dominante en la exégesis medieval) / Davies y Allison (necesitados en general) | Media: cotejar Davies-Allison |
| lucas-el-espiritu-me-ha-ungido | ídem | Ringe y Yoder / Fitzmyer | Media: la postura de Fitzmyer la propuso el revisor, sin cotejar |
| lucas-los-discipulos-de-emaus | ídem | Richard Dillon (composición lucana) / Fitzmyer (tradición previa) | Media |
| juan-en-el-principio-era-el-verbo | ídem | Brown (sabiduría) / Dodd (helenismo) | Alta |
| juan-yo-soy-la-resurreccion… | ídem | Bultmann (fuente de signos, reelaborada) / Brown (tradición de Betania) | Media: texto de la primera postura ajustado |
| juan-amaos-unos-a-otros | ídem | Jeremias (Juan modifica la fecha) / Brown (Juan conserva la cronología) | Media |
| juan-el-espiritu-de-la-verdad | ídem | Brown (presencia de Jesús) / Betz (paráclito forense) | Media |
| ageo-zorobabel-sello | Buena parte de la crítica histórica | Carol y Eric Meyers (AB 25B, ya en fuentes) | Alta |
| isaias-siervo-sufriente | tres anónimas | Rashi / Whybray / Sellin; se quitó «o un rey como Joaquín» | Media |
| genesis-creacion-orden-bueno | dos anónimas | Sarna / Tsumura | Alta |
| deuteronomio-herem | Otra parte | Römer (ya en fuentes) | Media |
| numeros-balaan… | una anónima | Cross y Freedman (poemas arcaicos); la otra sigue anónima | Media |
| numeros-campamento… | una anónima | Mendenhall (*elef* = clan); la otra sigue anónima | Alta |
| baruc-carta-de-jeremias | Muchos críticos | O’Callaghan (7Q2 = Bar 6,43-44) | Alta |
| levitico-relaciones… | Otra parte | Milgrom (AB 3A, ya en fuentes) | Media |

**Siguen anónimas** (no encontré autor que pueda dar con seguridad): isaias-nino-emmanuel, ezequiel-cada-uno-responde, ezequiel-huesos-secos (2.ª), daniel-susana, daniel-hijo-de-hombre (2.ª), daniel-resurreccion (2.ª), lamentaciones (2), baruc-confesion (2.ª), jeremias (2.ª), las de B5.2 (reino partido, Naamán, Natán, Eliseo, Nabot, Jueces) y el resto de las 52. Propuesta: pasada con búsqueda para ellas, o dejarlas como «En discusión» sin nombre.

## 3. R. E. Brown

| Dónde | Antes | Después |
|---|---|---|
| `libros/mateo.json`, *Intro NT* | `catolica` | `catolica` |
| `libros/lucas.json`, *Intro NT* | `critica` | `catolica` |
| `libros/juan.json`, *Intro NT* | `critica` | `catolica` |
| AB 29-29A en Jn (4 enseñanzas y `juan.json`) | `catolica` | sin cambio |

Criterio: sacerdote católico y fuente de lectura católica, como Fitzmyer (también `catolica`). Esto cuenta como «fuente cristiana» para B6.

## 4. Detalles menores de B5.7

| Qué había | Qué quedó |
|---|---|
| Lázaro: «quinto domingo de Cuaresma» | «…del ciclo A» |
| `juan.json`: «siete signos» (resumen, presentación, para_recordar) | «una serie de signos que se suelen contar como siete» |
| P52 «confirma» | «indica» |
| Cornelio: «algo que un judío piadoso evitaba» | Atribuido a Pedro en Hch 10,28 |
