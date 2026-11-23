# Informe B5.5 · Profetas mayores

Tarea t-62ff6b. Isaías, Jeremías, Lamentaciones, Baruc (con la Carta de Jeremías), Ezequiel y Daniel (con las adiciones griegas) pasan de `esbozo` a `completo`. Sin reel, sin build, sin navegador. `npm run validar`: 0 errores.

Total: 6 libros y 28 enseñanzas (Isaías 5, Jeremías 5, Lamentaciones 4, Baruc 4, Ezequiel 5, Daniel 5).

## 1. DEC §11 A-C, punto por punto

| Punto | Cómo se cumple |
|---|---|
| A. Opción B de traducción | Ninguna enseñanza lleva campo `cita`. Pasajes en la numeración del sitio; en Daniel se evitaron números de versículo en Dn 4 y 6 (varían entre Vulgata y hebreo). |
| A. Atribución | Las opiniones eruditas nombran autor o escuela (Blenkinsopp, Williamson, Sweeney, Oswalt, Bright, Lundbom, Carroll, McKane, Tov, Heschel, Berlin, Linafelt, O'Connor, Greenberg, Block, Zimmerli, Levenson, Collins, Baldwin, Moore, deSilva, Nickelsburg). Quedan posturas anónimas («Una parte de la crítica») en 11 fichas; ver §4. |
| B. Lo disputado como disputado | Autoría de Isaías (3 posturas), dos formas del texto de Jeremías, autoría y datación de Jeremías, datación de Ezequiel y Daniel, Is 7,14 y 53, Dn 7 y 12: `discusion` con 2-3 posturas. Las lecturas abiertas llevan `abierta`. |
| B. Equilibrio entre tradiciones | Orden judía, católica, ortodoxa, protestante, crítica. Is 7,14 e Is 53 con lecturas judía y cristiana lado a lado. Baruc y adiciones de Daniel con «En qué Biblias está» (campo `canon`). |
| C. Fuentes | 2-3 por libro y 1-4 por enseñanza (máx. 3 por regla), con tradición. Ver tabla (b) y sus salvedades. |
| C. Voz (§13) | Frases ≤30 palabras, párrafos ≤4 frases, ≤1800 caracteres, cursivas glosadas: lo comprueba el validador, 0 errores. |

## 2. Enseñanzas por tema (solo B5.5)

| Tema | Enseñanzas |
|---|---|
| profecia-y-llamada (completado) | 5: isaias-vocacion-en-el-templo, jeremias-llamada-de-un-profeta-reacio, jeremias-confesiones-un-profeta-acusa-a-dios, jeremias-carta-a-los-desterrados, ezequiel-dios-en-babilonia |
| esperanza-y-consuelo (completado) | 8: isaias-consuelo-a-los-desterrados, jeremias-carta-a-los-desterrados, jeremias-nueva-alianza-en-el-corazon, lamentaciones-la-misericordia-no-se-acaba, baruc-consuelo-a-jerusalen, ezequiel-huesos-secos, ezequiel-templo-nuevo-y-rio, daniel-resurreccion-de-los-justos |
| mesias-y-esperanza-mesianica | 4: isaias-nino-emmanuel, isaias-siervo-sufriente, ezequiel-pastores-y-rebano, daniel-hijo-de-hombre |
| resurreccion-y-vida-despues-de-la-muerte | 2 (antes sin libros): ezequiel-huesos-secos, daniel-resurreccion-de-los-justos |

**`mesias-y-esperanza-mesianica`, no reescrito.** Solo se añadieron a `pasajes` «Ez 34» y «Dn 7». Su introducción y sus divergencias **no chocan** con lo escrito sobre Isaías: dicen que hay consenso en que Is 7,14 hablaba en origen de un niño de tiempos de Ajaz, y la ficha `isaias-nino-emmanuel` lo presenta como discusión con lectura judía, cristiana y crítica lado a lado. Observación menor: la introducción del tema afirma el consenso sobre Ajaz sin mencionar que una postura crítica propone a Ezequías; no es contradicción.

## 3. Cambios respecto a la investigación (04-profetas.md)

| Cambio | Motivo |
|---|---|
| Jeremías: la segunda postura sobre las dos formas del texto queda como «Otros críticos», sin nombre | No pude verificar el nombre del autor (se pensó en Georg Fischer) y §3 prefiere anónimo a atribución dudosa. |
| Daniel: Susana como enseñanza propia, con Julio Africano en `critica` | Las adiciones griegas son parte del libro en las Biblias católica y ortodoxa y ilustran el canon. |
| Ezequiel: Ez 40-48 como enseñanza `abierta` con 3 posturas | Es la lectura más disputada del libro (plan, símbolo, utopía, dispensacionalismo). |
| Libros de Isaías y Daniel: datación como `discusion` con rango amplio | Reflejan tres partes (Isaías) y la fecha del siglo VI frente a la de 165 a. C. (Daniel). |

## 4. Revisión editorial (revisor-de-contenido)

Primera pasada: 5 ✗ y 7 menores. Resueltos los 5: baruc-la-sabiduria-es-la-ley (quién pregunta en Bar 3,10), daniel-susana (Africano fuera de la lectura judía), daniel-hijo-de-hombre (postura confesional fuera de `critica`), daniel-fidelidad-bajo-presion (`consenso`→`discusion`), libros/jeremias (autoría `discusion`). También: Lutero 1534 (reformulado), Baruc y Lamentaciones (`presentacion`), Ezequiel (orden canónico), Génesis Rabá 2,4 con su lista de reinos.

Segunda pasada: 5 anteriores resueltos y 2 ✗ nuevos, corregidos: daniel-dios-cambia-los-imperios (postura confesional → Baldwin, con BAL en fuentes) y jeremias-nueva-alianza (se quitó la ambientación de «Jerusalén ha caído», que el texto no dice). También se corrigieron: «primer texto claro» → «más claro» en Daniel, la cronología del tema esperanza-y-consuelo y la nota de que Baruc no está en el canon judío ni protestante.

**Verificación final.** Tras los últimos ajustes no hice una tercera pasada completa del revisor: confirmé con `npm run validar` (0 errores) y con las correcciones puntuales que pidió. Queda, por tanto, sin segunda confirmación del revisor el último retoque (2 ✗ de la segunda pasada).

**Pendientes que dejo a decisión editorial (⚠, no ✗):**
- 11 fichas con `posturas` anónimas («Una parte / Otra parte / Otros críticos»): isaias-nino-emmanuel, isaias-siervo-sufriente, ezequiel-cada-uno-responde, ezequiel-huesos-secos, daniel-susana, daniel-hijo-de-hombre, daniel-resurreccion-de-los-justos, lamentaciones-la-misericordia-no-se-acaba, lamentaciones-oracion-sin-respuesta, baruc-carta-de-jeremias, baruc-confesion-colectiva. §3 pide nombrar quién sostiene cada una.
- libros/lamentaciones: `autoria` como `consenso` mezcla anonimato (consenso) con varios autores (opinión frecuente).
- isaias-justicia-como-culto-verdadero: `consenso` con fecha de Is 58 que depende de la división tripartita.
- isaias-nino-emmanuel: falta nombrar la objeción cronológica a la lectura de Ezequías.
- ezequiel-dios-en-babilonia (`consenso` con lectura teológica), jeremias (627 a. C. como admitida; Holladay propone 609), ezequiel-huesos-secos («sábado de Pascua» depende del rito), baruc-carta-de-jeremias (Lutero).

## Tabla (a) · cada [D] de las secciones `## <Libro>` → dónde quedó como `discusion`

| [D] | Fichero / campo |
|---|---|
| Isaías, tres partes | libros/isaias.json `autoria` (3 posturas); isaias-consuelo-a-los-desterrados `critica` |
| Is 7,14 | isaias-nino-emmanuel `critica` y `lecturas` |
| Is 53, siervo | isaias-siervo-sufriente `critica` y `lecturas` |
| Jeremías, dos formas del texto | libros/jeremias.json `datacion` (Tov frente a otros) |
| Jeremías, prosa del profeta o de los editores | libros/jeremias.json `autoria` (texto, sin `posturas`: el campo no existe en autoría) |
| Jeremías, quejas | jeremias-confesiones `critica` y `academica` (Heschel) |
| Lamentaciones, culpa y protesta | lamentaciones-dios-como-enemigo `critica` (Provan, Linafelt) |
| Lamentaciones, quién es el «hombre» de Lam 3 | lamentaciones-la-misericordia-no-se-acaba `critica` |
| Baruc, original hebreo y 7Q2 | baruc-confesion-colectiva y baruc-carta-de-jeremias `critica` |
| Ezequiel, unidad y capas | libros/ezequiel.json `autoria` y `datacion` |
| Ez 34, «David» | ezequiel-pastores-y-rebano `critica` |
| Ez 37, resurrección | ezequiel-huesos-secos `critica` |
| Ez 40-48 | ezequiel-templo-nuevo-y-rio `critica` (3 posturas) |
| Daniel, fecha | libros/daniel.json `datacion` |
| Cuatro reinos | daniel-dios-cambia-los-imperios `critica` |
| «Hijo de hombre» | daniel-hijo-de-hombre `critica` |
| Dn 12, origen de la resurrección | daniel-resurreccion-de-los-justos `critica` |
| Susana, original semítico | daniel-susana `critica` |

## Tabla (b) · fuentes → dónde se comprobaron

**No se pudo consultar el catálogo ni la web en esta tanda**: las fuentes se citan por conocimiento del autor y por coincidir con las del informe de investigación. Cada una lleva tradición. Hay que contrastarlas con el catálogo antes de dar el contenido por cerrado.

| Fuente | Uso |
|---|---|
| The Jewish Study Bible, 2.ª ed. (Berlin y Brettler) | Lecturas judías en casi todas las fichas |
| Blenkinsopp, Isaiah (AB 19, 19A); Oswalt (NICOT); Sweeney (FOTL 16); Williamson, The Book Called Isaiah | Isaías |
| Brueggemann, Jeremiah (Eerdmans 1998); Lundbom (AB 21A); Bright (AB 21); Carroll (OTL); Tov, Textual Criticism 3.ª ed. y Septuagint Translation of Jeremiah and Baruch; Heschel, The Prophets | Jeremías |
| Berlin (OTL); Provan (NCBC); Linafelt, Surviving Lamentations; O'Connor, Lamentations and the Tears of the World; Brueggemann, Message of the Psalms | Lamentaciones |
| deSilva, Introducing the Apocrypha 2.ª ed.; Nickelsburg 2.ª ed.; Moore (AB 44) | Baruc y adiciones de Daniel |
| Greenberg (AB 22, 22A); Block (NICOT); Zimmerli (Hermeneia); Levenson, Resurrection and the Restoration of Israel | Ezequiel y resurrección |
| Collins (Hermeneia); Baldwin (Tyndale) | Daniel |

Referencias talmúdicas y litúrgicas, **dadas por conocimiento**; el revisor confirmó que son correctas: Baba Batra 15a, Yebamot 49b, Yomá 9b, Meguilá 29a, Pesajim 53b, Sanedrín 38b y 92b, Makot 24a, Shabat 13b, Menajot 45a, Jaguigá 2,1, Sanedrín 10,1, Génesis Rabá 1,1 y 2,4; lecturas de Vigilia Pascual (Bar 3), Adviento C (Bar 5), Cuaresma (Ez 37, Ez 18, Dn 13) y 9 de Av. Brueggemann aparece en Lamentaciones solo con *Message of the Psalms*, y su texto lo dice así.

## Tabla (c) · citas → URL

Opción B: no hay ninguna `cita` en la tanda, así que no hay URL que verificar.
