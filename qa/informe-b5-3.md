# Informe B5.3 · Históricos II

Autor: Biblia-Historicos. Alcance: 1 Crónicas, 2 Crónicas, Esdras, Nehemías, Tobías, Judit, Ester (con adiciones griegas), 1 Macabeos y 2 Macabeos, con sus 36 enseñanzas, y los temas `exilio-y-retorno` y `resurreccion-y-vida-despues-de-la-muerte`.

Resultado: `npm run validar` sin errores en lo de esta tanda. Los nueve libros y los dos temas están en `completo`. El agente `revisor-de-contenido` pasó por los 47 ficheros; sus ✗ (12 puntos) están resueltos (§4). No se ha hecho build ni navegador ni reel.

## 1. DEC §11 A-C, punto por punto

| Punto | Cómo se cumple |
|---|---|
| A. Opción B de traducción | Ninguna enseñanza lleva campo `cita` ni comillas que hagan pasar paráfrasis por traducción. Pasajes en la numeración del sitio; para Ester, adiciones griegas como Est 10,4–16,24 (Vulgata, que sigue Torres Amat). |
| A. Atribución | Toda opinión erudita lleva autor o escuela (Japhet, Williamson, Noth, Blenkinsopp, Hayes, Eskenazi, Fitzmyer, Craven, Moore, Fox, Bickerman, Tcherikover, Goldstein, Doran, Levenson) o «la mayoría de la crítica». «Apócrifo» solo aparece atribuido a las Biblias protestantes. |
| B. Lo disputado como disputado | Las cuatro [D] de la investigación, y otras seis que surgieron al escribir, están como `acuerdo: discusion` con 2 `posturas` (tabla a). Lo consensuado va como `consenso`. |
| B. Equilibrio entre tradiciones | Orden fijo judía, católica, ortodoxa, protestante, y después la crítica. Solo se escribe `lecturas` donde las tradiciones difieren; las de una sola voz van como `comun`. Textos incómodos de frente: violencia de Est 9, decapitación de Jdt 13, exclusión de Esd 9-10, juicio de Lutero sobre Ester y 2 Mac. |
| C. Fuentes | Cada libro tiene 2-3 fuentes y cada enseñanza 1-3, con tradición. Verificadas en catálogo (tabla b), con las excepciones anotadas. |
| C. Voz (§13) | Frases ≤30 palabras, párrafos ≤4 frases, ≤1800 caracteres por enseñanza, cursivas con glosa, frases vetadas: 0 (lo vigila el validador). |

## 2. Recuento de enseñanzas por tema (solo tanda B5.3)

| Tema | Enseñanzas | Libros |
|---|---|---|
| exilio-y-retorno | 7 | 1 Cr (genealogias-identidad), 2 Cr (edicto-de-ciro, retribucion-manases), Esd (edicto-de-ciro-y-regreso, matrimonios-mixtos, templo-entre-cartas-y-profetas), Neh (oracion-y-renovacion-de-la-alianza) |
| resurreccion-y-vida-despues-de-la-muerte | 3 | solo 2 Mac (siete-hermanos-y-su-madre, oracion-por-los-difuntos, creacion-de-la-nada) |
| oracion | 8 | 1 Cr, 2 Cr, Neh, Tob ×3, Jdt, Est |

El umbral de «≥3 enseñanzas de ≥2 libros» se cierra en B5.9. Para `resurreccion-y-vida-despues-de-la-muerte` esta tanda aporta un solo libro: faltan Sabiduría, Daniel o el Nuevo Testamento. `exilio-y-retorno` (4 libros) pasa el umbral.

Libros: 4 enseñanzas cada uno, 36 en total (rango válido 3-6).

## 3. Enseñanzas cambiadas respecto a la investigación

| Enseñanza | Cambio y motivo |
|---|---|
| 1 Cr: «promesa-a-david» | Sustituye a «alegría del culto y la música»: tenía un tema propio mejor anclado (1 Cr 17) y una lectura crítica disputada. |
| 2 Cr: «edicto-de-ciro» | Añadida para cerrar el libro con 2 Cr 36,22-23 y recoger la [D] de unidad con Esd-Neh. |
| Esd: «templo-entre-cartas-y-profetas» | Cuarta enseñanza elegida para la reconstrucción del Templo, que recoge la [D] de los documentos persas. |
| Neh: «usura-y-esclavitud-por-deudas» | Se conservó Neh 5 por su ligazón con justicia social. |
| Tob: «rafael-y-las-tres-versiones» | Añade la discusión textual (GI corta, GII larga, Vulgata), que afecta a cómo se lee Torres Amat. |
| Jdt: «relato-con-errores-historicos» | Cuarta enseñanza dedicada a los errores deliberados, para decir qué clase de libro es. |
| Est: «dios-oculto-y-adiciones-griegas» | Reúne la ausencia del nombre de Dios y las adiciones, con las cuatro tradiciones en paralelo. |
| 2 Mac: «creacion-de-la-nada» | Cuarta enseñanza sobre 2 Mac 7,28, con la divergencia judía (Rashi y Maimónides) y católica (Letrán IV). |

## 4. Revisión editorial (revisor-de-contenido) y resolución

| ✗ | Resolución |
|---|---|
| 2 Mac «texto más claro sobre la resurrección» (libro, `para_recordar` y presentación) | Reformulado: «más explícito en el Antiguo Testamento católico y ortodoxo». |
| 2 Mac: «fiesta de Yizkor» | Corregido: Kadish durante el luto; Yizkor como oración de memoria en ciertas fiestas. |
| Tema resurrección: Sab 3 como apoyo de oración por los difuntos | Quitado. Católicos apoyan en 2 Mac 12,43-45; ortodoxos, en la práctica litúrgica. También en `para_recordar` de 2 Mac. |
| 1 Cr oración: «sábado» y «sin saber de dónde viene» | Corregido a «rezo matutino»; frase especulativa suprimida. |
| Esdras: Rut/Jonás como hecho; «se atribuye al Cronista» | Pasado a «algunos críticos leen…» y «se discute si…». |
| Fuentes ausentes (Niditch, fuente única en dos enseñanzas de Crónicas, Williamson/Noth, Bickerman/Tcherikover) | Retirado el bloque de Niditch; añadido JSB a las dos de Crónicas y Blenkinsopp a 2 Cr edicto. Los demás nombres van como posturas en la ficha, con la obra de referencia ya en `fuentes`. |
| Lutero, Tischreden | Presentado como comentario de sobremesa y no juicio publicado; quitado «reformadas». |
| ⚠ 2 Cr pascuas `consenso` con disputa | Pasado a `discusion` con dos posturas. |
| ⚠ 1 Mac: 1 Mac 8, Sadoc, Qumrán, «reformadores» | Matizados o quitados. |
| ⚠ Judit: «deliberados» y «comentarios católicos» | Matizado y quitado. |
| ⚠ Tobías: fecha del 29 sep y 8 nov | Añadido «desde 1969» y «calendario juliano». |
| ⚠ Esdras: Cilindro de Ciro; «muchos prefieren quedarse» | Reducido a «se discute cuánto prueba»; frase no apoyada por el texto, quitada. |
| ⚠ Nehemías: Baba Batra 15a | Solo atribuye su libro a Esdras; el resto, a comentaristas posteriores. |
| ⚠ Temas: exilio («cristianas»), resurrección («textos más antiguos») | Matizados (Sal 49 y 73; tradiciones cristianas «con matices propios»). |

Pendiente de segunda verificación contra los textos: citas talmúdicas y litúrgicas contrastadas por el revisor «de memoria» (Meguilá 7a/12b, Julín 139b, Baba Metziá 86b, Shabat 21b, Sanedrín 90a, 1 Clemente 55). El revisor las dio por correctas.

## Tabla (a) · cada [D] de las secciones `## <Libro>` → dónde quedó como `discusion`

| [D] de la investigación | Fichero y campo |
|---|---|
| Crónicas: unidad con Esd-Neh | `libros/1-cronicas.json` y `libros/2-cronicas.json` → `autoria.acuerdo: discusion`; `ensenanzas/2-cronicas-edicto-de-ciro.json` → `critica.posturas` (Japhet y Williamson frente a Noth y la lectura clásica). Autoria no admite `posturas`. |
| Esdras: fechas 458 o 398 a. C. | `libros/esdras.json` → `datacion.acuerdo: discusion` con `posturas` 458/398. |
| Esdras: documentos persas en arameo | `ensenanzas/esdras-templo-entre-cartas-y-profetas.json` → `critica.posturas`. |
| Esd 9-10: exclusivismo frente a Rut/Jonás | `ensenanzas/esdras-matrimonios-mixtos.json` (`abierta: true`) → `critica.posturas`. También en `divergencias` de `exilio-y-retorno`. |

Otras discusiones introducidas al escribir (no eran [D] de la investigación): la «ley» de Esdras (`esdras-esdras-lee-y-ensena-la-ley`), Neh 8 en su sitio (`nehemias-lectura-publica-de-la-ley`), versiones de Tobías (`tobias-rafael-y-las-tres-versiones`), violencia de Judit (`judit-cabeza-de-holofernes`), «otro lugar» en Est 4,14 y violencia de Est 9 (`ester-ester-arriesga-la-vida`, `ester-purim-y-la-violencia-del-capitulo-9`), edicto de Antíoco y legitimidad asmonea (`1-macabeos-antioco-prohibe-ser-judio`, `1-macabeos-dinastia-asmonea`), origen de la resurrección, oración por los difuntos y creación de la nada (tres de 2 Mac), promesa a David (`1-cronicas-promesa-a-david`) y Pascuas (`2-cronicas-pascuas-de-ezequias-y-josias`).

## Tabla (b) · fuentes → dónde se comprobaron

| Fuente | Comprobada en | Nota |
|---|---|---|
| Fitzmyer, *Tobit* (CEJL, de Gruyter, 2003) | degruyterbrill.com (doi 10.1515/9783110907032); LoC BS1725.53 .F58 2003 | Berlín, no Nueva York. |
| Japhet, *I & II Chronicles* (OTL, Westminster/John Knox, 1993) | Catálogos de biblioteca (ISBN 0664218458 / 0664226418) | |
| Doran, *2 Maccabees* (Hermeneia, Fortress, 2012) | orion-bibliography.huji.ac.il; abebooks | |
| Levenson, *Resurrection and the Restoration of Israel* (Yale, 2006) | muse.jhu.edu/book/45993; reseñas en Commentary y First Things | El año 2006 no aparecía en las búsquedas; mantenido por conocimiento. |
| Fox, *Character and Ideology in the Book of Esther* (Univ. of South Carolina Press, 1991; 2.ª ed. 2001) | Reseña en repository.upenn.edu; catálogos | |
| Moore, *Judith* (AB 40, Doubleday, 1985) | ci.nii.ac.jp/ncid/BB11785609; registro de biblioteca | |
| Goldstein, *I Maccabees* (AB 41, 1976) y *II Maccabees* (AB 41A, 1983) | intertextual.bible; ci.nii.ac.jp/ncid/BB11787116 | |
| Blenkinsopp, *Ezra–Nehemiah* (OTL, Westminster, 1988) | Reseña publicada (366 pp.) | |
| Eskenazi, *In an Age of Prose* (SBL Monograph 36, Scholars Press, 1988) | Reseña y bibliografía en JSTOR/Project MUSE | |
| Hayes, *Gentile Impurities and Jewish Identities* (Oxford, 2002); deSilva, *Introducing the Apocrypha* (Baker, 2.ª ed. 2018); Craven, *Artistry and Faith in the Book of Judith* (Scholars Press, 1983); *The Jewish Study Bible* (Oxford, 2.ª ed. 2014) | **No encontradas en esta pasada** | Datos de edición por conocimiento; comprobar en WorldCat o en la editorial antes de dar por cerrada la tabla. |

## Tabla (c) · citas → URL

No hay citas: opción B. Ninguna enseñanza lleva campo `cita` ni texto entre comillas que se presente como traducción de un autor o de la Biblia. Las pocas comillas del contenido son glosas de nombres (p. ej. «Dios sana», «la judía») o expresiones del propio texto bíblico, sin atribuir una traducción.
