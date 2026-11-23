# Informe B5.4 · Sapienciales

Autor: Biblia-Sapienciales. Alcance: Job, Salmos, Proverbios, Eclesiastés, Cantar de los Cantares, Sabiduría y Eclesiástico (Sirácida), con sus 32 enseñanzas, y los temas `sufrimiento-del-inocente-y-lamento`, `sabiduria-y-vida-buena`, `sentido-y-finitud` y `oracion`.

Resultado: `npm run validar` sin errores («Contenido válido: 226 fichas»). Los siete libros y los cuatro temas están en `completo`. El agente `revisor-de-contenido` pasó por los 7 libros, las enseñanzas y los 4 temas. Sus 7 ✗ y 5 ⚠ están resueltos, y también la mayoría de los puntos menores (§4). No se ha hecho build, navegador ni reel.

## 1. DEC §11 A-C, punto por punto

| Punto | Cómo se cumple |
|---|---|
| A. Opción B de traducción | Ninguna enseñanza lleva el campo `cita`. Las frases bíblicas van parafraseadas y con referencia, y no se presentan como traducción. Salmos con la numeración del sitio: la hebrea, con la griega entre paréntesis en la primera mención de cada ficha (Sal 23 (22)). También en `pasajes` de los temas. |
| A. Atribución | Las opiniones eruditas llevan autor o escuela (Newsom, Gutiérrez, Alter, Brueggemann, Zenger, Mowinckel, Wilson, Fox, Seow, Camp, Trible, Brenner, Winston, Collins, Levenson, Graetz/Lewis) o «una parte de la crítica». «Apócrifo» solo aparece atribuido a las Biblias protestantes. |
| B. Lo disputado como disputado | Las [D] de la investigación están todas como `acuerdo: discusion`, con 2-3 `posturas` (tabla a). Al escribir y al revisar surgieron otras. |
| B. Equilibrio entre tradiciones | El orden es judía, católica, ortodoxa y protestante, y después la crítica. Las lecturas de una sola voz van como `comun`. Hay lecturas ortodoxas en Job (Semana Santa), Salmos (*kathismata*) y Prov 8-9 (vísperas marianas), y protestantes en Salmos, Eclesiastés, Cantar, Sabiduría y Sirácida. Los textos incómodos van de frente: salmos imprecatorios (Sal 137 (136), 109 (108)), el Cantar erótico (las 4 enseñanzas `abierta`), las mujeres en Sir 25-26 y 42, y Canaán en Sab 12. |
| B. Deuterocanónicos | Sabiduría y Sirácida llevan el bloque `canon` («En qué Biblias está») con las posturas judía, ortodoxa y protestante. En Sabiduría se añade el Artículo VI anglicano. |
| C. Fuentes | Cada libro tiene 2-3 fuentes y cada enseñanza 1-3, con su tradición. Las de la capa académica también están en `fuentes` (Camp, Brueggemann, Zenger, Trible, Brenner). Se comprobaron en catálogo (tabla b). |
| C. Voz (§13) | Frases de 30 palabras como máximo, párrafos de 4 frases como máximo, enseñanzas de 1800 caracteres como máximo y cursivas con glosa. Frases vetadas: 0. Lo vigila el validador, y se hizo además un grep de «en realidad», «sin duda», «mito», etc., sin resultados. |

## 2. Recuento de enseñanzas por tema (solo tanda B5.4)

| Tema | Enseñanzas | Libros |
|---|---|---|
| sufrimiento-del-inocente-y-lamento | 9 | Job ×5, Sal ×2, Ecl, Sab |
| sabiduria-y-vida-buena | 9 | Prov ×3, Sir ×3, Job, Sal, Sab |
| sentido-y-finitud | 6 | Ecl ×5, Cant |
| oracion | 5 | Sal ×3, Job, Sir |
| resurreccion-y-vida-despues-de-la-muerte | 2 | Job (mi-redentor-vive), Sab (almas-de-los-justos) |
| alianza, creacion, justicia-social, ley-libertad-y-gracia, mujeres-y-liderazgo, violencia-guerra-y-paz | 2 cada uno | |
| culto-verdadero, esperanza-y-consuelo, imagen-de-dios, mesias, misericordia, poder-monarquia | 1 cada uno | |

Libros: Job 5, Salmos 5, Proverbios 4, Eclesiastés 5, Cantar 4, Sabiduría 4, Eclesiástico 5. Son 32 en total, dentro del rango 3-6. Los cuatro temas de la tanda ya pasan el umbral de 3 enseñanzas de 2 libros. Con Sab 3 y Job 19, `resurreccion-y-vida-despues-de-la-muerte` llega a 3 libros (con 2 Mac).

## 3. Enseñanzas cambiadas respecto a la investigación

| Libro | Cambio y motivo |
|---|---|
| Job | Cinco enseñanzas. Se añade «mi-redentor-vive» (Job 19,25-27) por su lectura discutida y por el enlace con el tema de resurrección. |
| Salmos | Se añade «salmos-que-piden-castigo» (imprecatorios), que pedía la fila B5.4, y «el-rey-y-el-mesías», para la [D] de «de David». |
| Proverbios | Se añade «treinta dichos» (Prov 22,17-24,22 y Amenemope), para tratar de frente el paralelo egipcio. |
| Eclesiastés | «justicia-que-no-llega» recoge la discusión sobre las glosas de juicio (3,17; 11,9), y «recuerda-a-tu-creador», la [D] del epílogo. |
| Cantar | La cuarta enseñanza trata el debate canónico (Yadayim 3,5) y las lecturas alegóricas, porque la fila pedía la lectura alegórica junto a la de amor humano. |
| Sabiduría | «dios-ama-todo-lo-que-creo» trata Sab 11-12 y Canaán, en lugar de una enseñanza solo sobre el Éxodo. |
| Eclesiástico | La «misericordia con el pobre» de la investigación (Sir 4; 29) se fusiona con amistad y dinero, y la visión de la mujer va en una enseñanza propia por su [D]. |

## 4. Revisión editorial (revisor-de-contenido) y resolución

| Punto | Resolución |
|---|---|
| ✗ «Ben Sira, único autor bíblico que firma su libro» (presentación, autoría y `para_recordar`) | Acotado a los libros sapienciales: Pablo y Juan (Ap 1,9) también firman. |
| ✗ Datación de Eclesiastés como consenso, contra Seow | Pasada a `discusion`, rango [-450,-200], con las posturas de Seow (época persa) y Fox (s. III). |
| ✗ Resh Lakish en Baba Batra 15a; Abraham en la lista de épocas | Corregido a «un maestro»; épocas: Jacob, Moisés, jueces, regreso del exilio. |
| ✗ Yavne como «lectura tradicional» | Reescrito como hipótesis de Graetz (s. XIX), descartada desde J. P. Lewis (1964); `consenso`. |
| ✗ Prov 8,22: la postura «no fue hecha» era dogma | Las posturas pasan a ser «Septuaginta, NRSV, NJPS: me creó» y «Áquila, Vulgata: me adquirió». El debate teológico se sitúa en tiempos de Arrio. |
| ✗ Autoría de Job como consenso | Pasada a `discusion`: una sola mano o añadidos (Elihú, Job 28). |
| ✗ Numeración de salmos sin la griega | Añadida en la primera mención de cada ficha, en `pasajes` y en los textos de los temas, y también en el breviario: 58 (57), 83 (82), 109 (108). |
| ⚠ Limosna como `comun` | Separada en judía (Baba Batra 10a), católica (Sir 3,30; Tob 12,9) y protestante (los reformadores rechazan la limosna expiatoria). |
| ⚠ Tradición judía aplanada (Job, Sir) | Tema sufrimiento: «el Talmud está dividido (Baba Batra 15b-16a)» y Wiesel como lector moderno. En Sir se cita Sanedrín 100b; en los amigos de Job, Baba Batra 16b. |
| ⚠ Levenson citado contra su tesis | Reescrito: la mayoría ve tardía la resurrección explícita, y Levenson le busca raíces más antiguas. |
| ⚠ Posturas de los salmos reales que no respondían | Tres posturas: «de David» como dedicatoria, Mowinckel (entronización) y Wilson (lectura canónica posexílica). |
| ⚠ Sin lecturas ortodoxas; autores sin fuente; Trible con dos etiquetas | Se añaden lecturas ortodoxas (Job, Sal, Prov), Camp y Brueggemann a `fuentes`, y Trible pasa a `feminista` en las dos enseñanzas. |
| Menores | Qumrán 11QPsa (Salmos, abierto aún en el s. I d. C.); Baba Batra 14b empieza los Escritos por Rut; Sal 39 (38) también sin consuelo; «se inspiró en»; «día de la expiación» quitado de Sir 50; Akiba «negó que se discutiera»; Orígenes «fijó»; Shabat 152a sin detalle anatómico; Sucot como costumbre de «muchas comunidades»; Jerónimo dudó de la autoría de Sabiduría; Filón como contexto, sin comentar el libro. |

Pendiente de segunda verificación contra los textos: el revisor comprobó de memoria las citas talmúdicas, midrásicas y litúrgicas (Baba Batra 14b-16b, Meguilá 10b y 15b, Shabat 30b, Berajot 7a y 60a, Sanedrín 100b, Yadayim 3,5, Génesis Rabá 1,1, Pirké Avot 3,17, Tosefta Sanedrín 12,10, Guía III,23, De doctrina christiana II,40, Institución I,11,8). Las dio por correctas salvo las corregidas arriba. Las lecturas ortodoxas añadidas (Job en Semana Santa, *kathismata*, Prov 9 en vísperas marianas) y la mención de Laudato si' a Sab 11,24 van de conocimiento y no se contrastaron en línea.

## Tabla (a) · cada [D] de las secciones `## <Libro>` → dónde quedó como `discusion`

| [D] de la investigación | Fichero y campo |
|---|---|
| Job: prólogo y epílogo de un cuento antiguo | `ensenanzas/job-justo-sin-culpa-que-sufre.json` → `critica.posturas` |
| Job: Elihú (32-37) como adición | `ensenanzas/job-amigos-reprendidos.json` → `critica.posturas`; `libros/job.json` → `autoria.acuerdo: discusion` |
| Job: poema de Job 28 como adición | `ensenanzas/job-dios-responde-desde-la-tormenta.json` → `critica.posturas` |
| Salmos: «de David» | `libros/salmos.json` → `autoria.acuerdo: discusion`; `ensenanzas/salmos-el-rey-y-el-mesias.json` → `critica.posturas` (la autoría no admite `posturas`) |
| Eclesiastés: epílogo (12,9-14) de un redactor | `ensenanzas/eclesiastes-recuerda-a-tu-creador.json` → `critica.posturas` |
| Cantar: datación (V-III a. C. o más antiguo) | `libros/cantar-de-los-cantares.json` → `datacion.acuerdo: discusion` con `posturas` |
| Sirácida: valoración de la mujer | `ensenanzas/eclesiastico-mujeres-visiones-divididas.json` → `critica.posturas` |

Otras discusiones introducidas al escribir o al revisar, que no eran [D] de la investigación: Job 13,15 (ketiv/qere), Job 19,25 (vindicación o resurrección), imprecatorios, Prov 8,22, los dos pobres de Proverbios, *hebel*, *olam*, glosas de juicio en Ecl, fecha de Eclesiastés (Seow/Fox), «llama de Yah», voz femenina del Cantar, inmortalidad en Sab 3 (Winston/Collins), Canaán en Sab 12, Sir 38,15 (hebreo/griego) y el canon en Sir 44-50.

## Tabla (b) · fuentes → dónde se comprobaron

| Fuente | Comprobada en | Nota |
|---|---|---|
| Alter, *The Wisdom Books* (Norton, 2010) | ci.nii.ac.jp/ncid/BB05890030; catalog.princeton.edu; wwnorton.co.uk | ISBN 9780393068122 |
| Alter, *The Book of Psalms* (Norton, 2007) | catalog.princeton.edu/catalog/9952804323506421; reseña LRB v30/n02 | |
| Newsom, *The Book of Job: A Contest of Moral Imaginations* (Oxford, 2003) | Catálogos (libcat.scu.edu, cmu.marmot.org) | |
| Gutiérrez, *Hablar de Dios desde el sufrimiento del inocente* (Sígueme/CEP, 1986) | descubridor.uniclaretiana.edu.co; repository.usta.edu.co | Lima y Salamanca, 1986 |
| Mays, *Psalms* (Interpretation, John Knox, 1994) | library.usi.edu/record/269177; logos.com | |
| Zenger, *A God of Vengeance?* (Westminster John Knox, 1996) | wjkbooks.com | Año 1996 o 2004 según la edición |
| Brueggemann, *The Message of the Psalms* (Augsburg, 1984) | ci.nii.ac.jp/ncid/BA31397423; augsburgfortress.org | |
| Fox, *Proverbs 1-9* (AB 18A, 2000) y *Proverbs 10-31* (AB 18B, 2009) | CV de Fox; catalog.princeton.edu/catalog/99125358903906421 | |
| Murphy, *Proverbs* (WBC 22, 1998) | logos.com/product/1351; openlibrary.org | |
| Camp, *Wisdom and the Feminine in the Book of Proverbs* (Almond, 1985) | katalog.ub.uni-heidelberg.de/titel/3488905 | |
| Seow, *Ecclesiastes* (AB 18C, Doubleday, 1997) | catalog.princeton.edu; orion-bibliography.huji.ac.il | |
| Fox, *A Time to Tear Down and a Time to Build Up* (Eerdmans, 1999) | library.usi.edu/record/265984; reseña en Themelios | |
| Fox, *The Song of Songs and the Ancient Egyptian Love Songs* (Univ. of Wisconsin Press, 1985) | relbib.de/Record/024190802 | |
| Trible, *God and the Rhetoric of Sexuality* (Fortress, 1978) | fortresspress.com; reseña en Horizons (cambridge.org) | |
| Brenner, *The Song of Songs* (OT Guides, JSOT Press, 1989) | library.etf.edu/bib/4528; colectivo.uloyola.es | |
| Winston, *The Wisdom of Solomon* (AB 43, Doubleday, 1979) | openlibrary.org/books/OL21128661M | |
| Collins, *Jewish Wisdom in the Hellenistic Age* (OTL, Westminster John Knox, 1997) | ci.nii.ac.jp/ncid/BA33948732 | |
| Skehan y Di Lella, *The Wisdom of Ben Sira* (AB 39, Doubleday, 1987) | relbib.de/Record/1561922501; intertextual.bible | |
| Levenson, *Resurrection and the Restoration of Israel* (Yale, 2006) | Ya comprobada en B5.3 (muse.jhu.edu/book/45993) | |
| *The Jewish Study Bible* (Oxford, 2.ª ed. 2014) | **No buscada en esta pasada** | Pendiente heredado de B5.3: lo revisa B6. |

## Tabla (c) · citas → URL

No hay citas: es la opción B. Ninguna enseñanza lleva el campo `cita` ni texto entre comillas que se presente como traducción literal de un autor o de la Biblia. Las comillas del contenido son glosas de palabras («aliento», «llama de Yah», «me creó») o paráfrasis con referencia, sin atribuir una traducción.
