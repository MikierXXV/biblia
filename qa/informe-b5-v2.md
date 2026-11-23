# Informe B5.V2 · Segunda pasada de fuentes y posturas anónimas

Tarea t-f80f90. `node scripts/validar-contenido.mjs`: contenido válido, 408 fichas, 0 errores. Sin build ni navegador. `reglas.json` intacto; ningún acuerdo cambiado a `consenso`.

## Recuento de posturas anónimas
Había 86 coincidencias de «postura sin nombre» en 57 fichas (2 eran falsos positivos ya nombrados).

| Resultado | Nº |
|---|---|
| Nombradas | 12 (+1 corrección de atribución) |
| Quitadas o fundidas | 5 |
| **Pendientes de lectura humana** (quedan anónimas) | **67**, en 45 fichas |

Criterio: nombre solo con seguridad alta. Si quedaban ≥2 posturas, se quitó la anónima. Si quedaría 1 o 0, se dejó sin tocar. Las seguridades salen del conocimiento previo y de las obras que ya cita la ficha. **Open Library comprueba que la obra existe, no que defienda esa tesis**: conviene una lectura humana de las filas «media».

## Cambios en posturas

| Ficha | Antes | Después | Seguridad |
|---|---|---|---|
| 1-reyes-el-reino-se-parte-por-los-impuestos | Una parte de la crítica | Mordechai Cogan (AB 10, ya en fuentes) | Media-alta |
| 2-macabeos-creacion-de-la-nada | Otra parte de la crítica | Gerhard May y David Winston (*Schöpfung aus dem Nichts*, 1978, confirmado en OL) | Alta |
| baruc-carta-de-jeremias | José O’Callaghan | Maurice Baillet y José O’Callaghan: Baillet publicó 7Q2 = Ep Jer 43-44 (DJD III, 1962); O’Callaghan la aceptó | Alta (corrección) |
| daniel-hijo-de-hombre | Otros críticos | Martin Noth y T. W. Manson (lectura colectiva) | Media-alta |
| hebreos-alianza-mejor | Una parte de la crítica | William L. Lane (WBC) | Media-alta |
| isaias-consuelo-a-los-desterrados | La mayoría de la crítica | Bernhard Duhm, Blenkinsopp y la mayoría (igual que en `libros/isaias`) | Alta |
| rut-moabita-bisabuela-de-david · libros/rut | Una parte de la crítica | Edward F. Campbell (AB 7, ya en fuentes) | Alta |
| rut-iniciativa-de-las-mujeres | Una parte de los críticos | Danna Fewell y David Gunn (*Compromising Redemption*, ya en fuentes) | Media |
| marcos-final-abierto | La mayoría de críticos | Joel Marcus (AB 27A, ya en fuentes) | Media-alta |
| marcos-final-abierto | Otros críticos | Bruce M. Metzger (*Textual Commentary*, ya en fuentes) | Alta |
| eclesiastes-recuerda-a-tu-creador | Una parte de la crítica | Choon-Leong Seow (AB 18C, epílogo de otra mano) | Media-alta |
| nehemias-lectura-publica-de-la-ley | Otra parte | Joseph Blenkinsopp (OTL; Neh 8 seguía a Esd 7-8) | Alta |
| libros/jueces | Una parte de la crítica (caps. 17-21 apéndice) | Fundida en la postura de Martin Noth | Media-alta |
| 1-reyes-elias-y-el-susurro | Una parte de los comentaristas | Quitada (quedan 2 con autor) | — |
| josue-rahab-la-cananea… | Una parte de la crítica literaria | Quitada (quedan 2 con autor) | — |
| rut-moabita-bisabuela-de-david | Algunos críticos | Quitada | — |
| salmos-el-rey-y-el-mesias | Una parte de la crítica | Quitada (quedan 2 con autor) | — |
| libros/1-tesalonicenses (pasaje 2,13-16) | «otros: autoridades de Judea o polémica interna» | «otros, como Malherbe y Wanamaker, lo defienden como de Pablo»; Pearson (HTR 64, 1971) se mantiene | Alta |

## Pendientes de lectura humana (siguen anónimas)
Fichas con una o más posturas anónimas: 1-cronicas-promesa, 1-macabeos-dinastia, 2-cronicas-pascuas, 2-macabeos (difuntos ×2, siete hermanos), 2-reyes (Eliseo, Naamán ×2), 2-samuel-natan, baruc (carta, confesión), cantar (voz femenina, libro ×2), daniel (resurrección, Susana ×2), eclesiastés (justicia ×2, tiempo, aliento), eclesiástico (antepasados ×2, mujeres ×2), esdras (ley ×2, matrimonios ×2, cartas ×2), ester ×2, ezequiel (responde ×2, huesos), isaías-emmanuel ×3, job (amigos ×2, tormenta ×2, marco ×2, redentor ×2), lamentaciones (×3), lucas-reino, nehemías (1), números (Balaán, campamento), proverbios ×2, rut (espigar ×2, iniciativa, moabita, libro), sabiduría ×2, salmos-castigo ×2, jeremías (libro). `investigacion/` casi no nombra autores para estos puntos.
Además, 1 Tim 3,11 (diaconisas o esposas): la ficha lo plantea sin postura ni autor; no he podido nombrar con seguridad a quién sostiene cada lectura.

## Fuentes: cotejo con Open Library y Sefaria
Se cotejaron las 257 fuentes distintas del catálogo (autor + título) con `openlibrary.org/search.json`: 233 coinciden. De las 24 restantes, se confirmó a mano el resto salvo lo anotado:

| Fuente | Resultado |
|---|---|
| Skehan-Di Lella, Greenberg, Fitzmyer *Luke*, Marcus, Luz, Zimmerli, Aune, Davies-Allison, Brown *Birth of the Messiah* | Confirmadas en OL (título y año) |
| Mendenhall, JBL 77 (1958); Barclay, NTS 37 (1991); Lewis (1991); Barkay et al., BASOR 334 (2004) | Confirmadas en Crossref |
| Keener, «Interpreting 1 Timothy 2:8-15» | Confirmada en galaxie.com (Priscilla Papers) |
| **Dunn, «The Incident at Antioch»** | **Corregido:** JSNT **5.18** (1983), no «18» a secas (Crossref) |
| May, *Schöpfung aus dem Nichts* | Confirmada en OL (1978; ed. inglesa 1994) |
| Sweeney FOTL 16, Allison *James* ICC (confirmada antes en B5.8b), Ska, O’Callaghan BAC 1974, Brown *Jesus and Elisha*, Käsemann ZThK 48 (1951), Olyan JHS 5 (1994), Exum (1985) | **Sin confirmación en catálogo**: obras reales de memoria, falta mirar el volumen |

Siguen **sin comprobar en el volumen**, por no estar en catálogo en abierto, las **atribuciones de tesis** (no la existencia de la obra): Brooten, Segal, Theissen, Lohse, MacDonald, Koester, Welborn, Odell-Scott, Talbert, Bruce, Boswell, Nanos, Longenecker, Sanders y los documentos eclesiales (Lumen gentium, Catecismo 2242 y 2402-2406, Epifanio, Crisóstomo, Basilio). Open Library no abre las páginas de los libros. Nada se quitó por esto: las atribuciones de tesis ya se habían contrastado con reseñas y siguen marcadas como pendientes de lectura humana.

**Citas talmúdicas (Sefaria API):** las 61 referencias únicas (Shabat, Berajot, Sanedrín, Yoma, Meguilá, Pesajim, etc.) existen y el contenido encaja en 54 con palabra clave. En 7 se comprobó a mano: Shab 13b (Ananías ben Ezequías y Ezequiel), Ber 30a, Ber 10b (sunamita, «hombre santo»), Ber 60a (médico), Yoma 9b (idolatría, inmoralidad, sangre), Pes 7b-8a (luz de la lámpara y Sof 1,12 en 8a) y Sanedrín 96b-97a (*bar nifli* y Am 9,11; la ficha cita 96b y el pasaje cruza a 97a). Todas correctas. Sof 3,17 y Ag 2,7 (liturgia) no son citas talmúdicas y no se tocaron.

## No hecho
- Atribuciones de tesis de la lista anterior (arriba).
- Jerónimo sobre Ageo y los documentos eclesiales no tienen API abierta.
