# Informe B5.1 · Pentateuco

Autora: Biblia-Pentateuco. Alcance: Génesis, Éxodo, Levítico, Números y Deuteronomio, con sus 23 enseñanzas, y los temas `creacion-y-cuidado-del-mundo`, `imagen-de-dios-y-dignidad-humana`, `alianza` y `ley-libertad-y-gracia`. Sin reel.

Resultado: `npm run validar` sin errores en lo de esta tanda (última pasada: «Contenido válido, 154 fichas»). Los cinco libros y los cuatro temas están en `completo`.

## 1. DEC §11 A-C, punto por punto

| Punto | Cómo se cumple |
|---|---|
| A. Opción B de traducción | Ninguna enseñanza lleva campo `cita` ni comillas que hagan pasar paráfrasis por traducción. Los pasajes se dan como referencia, en la numeración del sitio (Anexo A). Se evitaron versículos de numeración dudosa (Éx 22, Gn 31-32, Nm 16-17, Nm 30, Dt 13). |
| A. Atribución | Toda opinión erudita lleva autor o escuela (Sarna, Ska, Römer, Perlitt, Kitchen, Finkelstein-Silberman, Milgrom, Olyan, Younger…) o «la mayoría de críticos». Las lecturas de tradición citan texto (Misná, Talmud, Sifra, Rashi, Orígenes, Catecismo) solo si se comprobó. |
| B. Lo disputado se presenta como disputado | Las seis [D] de la investigación están como `acuerdo: discusion` con 2-3 `posturas` (tabla a). Lo consensuado va como `consenso`. |
| B. Equilibrio entre tradiciones | Se escribe `lecturas` solo donde las tradiciones difieren. En Gn 3,15, Lv 18,22 y Dt 20 (herem) se ponen lado a lado, sin ordenar por valor. Las dos enseñanzas con tema sensible (Lv 18,22; Dt herem) llevan `abierta: true`. |
| C. Fuentes | Cada libro y cada enseñanza declara fuentes con tradición. Todas comprobadas (tabla b). Se corrigieron fechas de la investigación: Römer es de 2005; Ska en español es de Verbo Divino (2010-2012). |
| C. Voz (§13) | Gancho concreto, frases ≤30 palabras, párrafos ≤4 frases, titulares que afirman, cursivas con glosa. Frases vetadas: 0 (las vigila el validador). Presupuesto ≤1800 caracteres por enseñanza. |

## 2. Recuento de enseñanzas por tema (solo tanda B5.1)

| Tema | Enseñanzas | Cuáles |
|---|---|---|
| alianza | 5 | deuteronomio-elige-la-vida, deuteronomio-escucha-israel, exodo-alianza-del-sinai, genesis-promesa-a-abrahan, numeros-campamento-en-orden |
| ley-libertad-y-gracia | 5 | deuteronomio-elige-la-vida, deuteronomio-memoria-de-la-esclavitud, exodo-alianza-del-sinai, exodo-decalogo-carta-de-libertad, levitico-relaciones-entre-varones |
| creacion-y-cuidado-del-mundo | 2 | genesis-creacion-orden-bueno, genesis-imagen-de-dios |
| imagen-de-dios-y-dignidad-humana | 1 | genesis-imagen-de-dios |

Otros temas tocados (los completarán otras tandas): justicia-social 6, profecia-y-llamada 3, amor-al-projimo 2, extranjero-y-hospitalidad 2, misericordia 2, perdon-y-reconciliacion 2, y 1 cada uno en violencia-guerra-y-paz, sentido-y-finitud, culto-verdadero-y-sacrificio, oracion y espiritu-de-dios.

Aviso: `imagen-de-dios-y-dignidad-humana` queda con una sola enseñanza de esta tanda. Los demás textos del tema (Sal 8, Sab 2,23, Sant 3,9) los traerán otras tandas.

Recuento por libro: Génesis 5, Éxodo 4, Levítico 4, Números 5, Deuteronomio 5.

## 3. Enseñanzas cambiadas respecto a la investigación

| Investigación | En el sitio | Motivo |
|---|---|---|
| Gn (1) mundo bueno e imagen de Dios | Se dividió en `genesis-creacion-orden-bueno` y `genesis-imagen-de-dios` | Son dos ideas con lecturas y temas distintos; juntas pasaban de presupuesto. |
| Gn (2) fragilidad: Gn 3; 4; 11 | Solo Gn 3 | Presupuesto y gancho: Caín y Babel quedan para fichas futuras. |
| Gn (4) fe probada (Gn 15,6; 22) | No incluida | Presupuesto de 5 por libro; Gn 22 exige un tratamiento propio y la numeración de Gn 15 es estable pero el tema es denso. |
| Éx (5) culto y santuario (Éx 25-40) | No incluida | Presupuesto: cabía en 4. Queda como propuesta. |
| Lv (3) amor al prójimo y justicia con el extranjero | Fundida en `levitico-santidad-en-la-vida-diaria` (Lv 19,1-18) | Es el mismo pasaje que la santidad (1). El extranjero (19,33-34) queda en el tema extranjero-y-hospitalidad. |
| Lv (5) pureza ritual | Sustituida por `levitico-relaciones-entre-varones` (Lv 18,22; 20,13) | Lo pide la fila B5.1 de FICHAS.md; la pureza se menciona en la presentación del libro. |
| Nm (1) y (2) campamento y murmuración | `numeros-campamento-en-orden` y `numeros-pueblo-prefiere-volver-a-egipto` | Se separan: el censo trae la [D] de *elef*, la queja trae el esquema del desierto. |
| Dt (4) sabático y remisión de deudas | Fundida en `deuteronomio-memoria-de-la-esclavitud` (Dt 15,12-15) | Misma motivación (memoria de la esclavitud). |
| (no estaba) | `deuteronomio-herem` | Lo pide la fila B5.1; es el pasaje más incómodo del libro. |

## 4. Tablas

### (a) Cada [D] → fichero y campo donde queda como `discusion`

| [D] de la investigación | Fichero | Campo |
|---|---|---|
| Pentateuco: cuántos documentos y cuándo (documentaria, bloques, conservadores) | `libros/genesis.json` | `datacion` (`acuerdo: discusion`, 3 posturas) y `autoria` |
| Patriarcas no verificables, con matices de escuela | `ensenanzas/genesis-promesa-a-abrahan.json` | `critica` (Finkelstein-Silberman frente a Kitchen) |
| Éxodo: fecha y ruta (Ramsés II u otras) | `libros/exodo.json` | `datacion` (2 posturas); también `ensenanzas/exodo-dios-oye-al-oprimido.json` → `critica` |
| Código de Santidad (Lv 17-26), posiblemente anterior | `libros/levitico.json` | `datacion` (3 posturas) |
| Cifras del censo: interpretación de *elef* | `ensenanzas/numeros-campamento-en-orden.json` | `critica` (2 posturas); `libros/numeros.json` → `datacion` para la forma final |
| Deuteronomio: modelos de redacción de la historia deuteronomista | `libros/deuteronomio.json` | `datacion` (3 posturas: Noth, Cross-Römer, Kitchen) |

Además quedan como `discusion` otras que la investigación no marcaba: Azazel (`levitico-yom-kipur`), Lv 18,22 (`levitico-relaciones-entre-varones`), fecha de los poemas de Balaán (`numeros-balaan-profeta-extranjero`), herem (`deuteronomio-herem`), Shemá monoteísmo/monolatría (`deuteronomio-escucha-israel`), Enuma Elish (`genesis-creacion-orden-bueno`), Perlitt frente a Kitchen en el Sinaí (`exodo-alianza-del-sinai`).

### (b) Cada fuente → dónde se comprobó

La comprobación se hizo en el catálogo de Open Library (búsqueda por título y autor, respuestas guardadas) o, cuando no estaba allí, con búsqueda web. Los ficheros de respuesta son temporales y no se versionan.

| Fuente | Dónde |
|---|---|
| Sarna, *Genesis* y *Exodus* (JPS Torah Commentary) | Open Library: openlibrary.org/search.json?q=title:Genesis+JPS+Torah+Commentary+author:Sarna (y Exodus) |
| Sarna, *Understanding Genesis* | Open Library, búsqueda title:Genesis author:Sarna |
| Milgrom, *Leviticus 1-16*, *17-22*, *23-27* (Anchor Bible) | Open Library, búsqueda title:Leviticus author:Milgrom |
| Milgrom, *Numbers* (JPS Torah Commentary) | Open Library, búsqueda por título «Numbers» |
| Ska, *Introduzione alla lettura del Pentateuco* (ed. española, Verbo Divino) | Open Library, búsqueda title:pentateuco author:Ska |
| *The Jewish Study Bible* | Open Library, búsqueda por título |
| *Nuevo Comentario Bíblico San Jerónimo* | Open Library, búsqueda por título |
| Weinfeld, *Deuteronomy 1-11* (Anchor Bible 5) | Open Library, búsqueda por título |
| Römer, *The So-Called Deuteronomistic History* | Open Library, búsqueda por título (fecha corregida: 2005) |
| Trible, *God and the Rhetoric of Sexuality* | Open Library, búsqueda por título |
| Finkelstein y Silberman, *La Biblia desenterrada* | Open Library, búsqueda por título |
| Kitchen, *On the Reliability of the Old Testament* | Open Library, búsqueda por título |
| Gutiérrez, *Teología de la liberación. Perspectivas* | Open Library, búsqueda por título |
| Perlitt, *Bundestheologie im Alten Testament* | Open Library, búsqueda por título |
| Younger, *Ancient Conquest Accounts* | Open Library, búsqueda por título |
| Olyan, «And with a Male You Shall Not Lie…» (JHS 5, 1994) | Búsqueda web |
| Barkay, Lundberg, Vaughn y Zuckerman, «The Amulets from Ketef Hinnom» (BASOR 334, 2004) | Búsqueda web |
| Orígenes, *Homilías sobre los Números* y alegoría de la conquista | Open Library (edición de las obras de Orígenes) |
| Misná, Talmud, Sifra, Sifre, Rashi, Maimónides, Catecismo (2357-2358) | Referencias clásicas por tratado; se evitó dar versículo o página que no se comprobó. La frase de Makot 23b se reformuló para no atribuir al Talmud lo que es posterior. |

Descartado por no poder comprobarlo: Mendenhall (paralelos hititas); se usa Kitchen.

### (c) Cada cita → URL

Ninguna cita, opción B.

## 5. Pendiente y propuestas

- Propuesta a Sócrates: enseñanza del santuario (Éx 25-40), Gn 22 y Gn 4/11 si se amplía el cupo por libro.
- Los errores que `validar` muestra ahora fuera de esta tanda (Judit, Tobías) no son de B5.1.

## 6. Revisión editorial (revisor-de-contenido)

Primera pasada: 7 ✗ y varios avisos. Los 7 ✗ están corregidos:

1. `genesis-jose-perdona-a-sus-hermanos`: ya no dice que Dios no interviene (46,2-4); lo sapiencial se atribuye a von Rad.
2. `deuteronomio-herem`: la conclusión de que los pueblos no son identificables se atribuye a Maimónides, apoyado en Yadayim 4,4.
3. Tema `alianza`: Jeremías, «en vísperas del exilio».
4. Tema `alianza`: *Nostra aetate* y Juan Pablo II, bien atribuidos.
5. `exodo`: fecha del éxodo con dos posturas (XV y XIII a. C.); la cronología tradicional se matiza en los cuatro libros del Génesis a Números.
6. `numeros-balaan-profeta-extranjero`: lectura mesiánica judía de Nm 24,17 añadida; la relación con Mt 2 se atribuye a Justino y Orígenes.
7. `numeros` → `para_recordar`: las cifras del censo, atribuidas a «la mayoría de críticos».

Además, se matizaron las frases teológicas del tema `ley-libertad-y-gracia` y del de creación, y se puso la numeración griega de los Salmos 104 y 119 en los temas. `validar`: «Contenido válido, 166 fichas».

**Avisos no resueltos (propuestos como segunda pasada):**
- Falta fuente cristiana (p. ej. NCBSJ) en doce enseñanzas y en `deuteronomio.json`; Weinfeld y Kitchen llevan etiqueta de tradición discutible.
- `genesis-creacion-orden-bueno`: añadir una frase sobre creación desde la nada y citar la Comisión Bíblica Pontificia en `fuentes`.
- `exodo-decalogo-carta-de-libertad`: dar las dos posturas judías sobre la primera palabra (Maimónides y Najmánides frente a Halajot Guedolot y Crescas).
- Posturas sin nombre («una parte de la crítica») en seis enseñanzas; `levitico-yom-kipur` pone a Rashi en la capa crítica.
- `genesis-desobediencia-y-fragilidad`: falta la divergencia sobre el pecado original.
- Otros menores: Sal 8 y «ángeles» (Heb 2,7), «cuatro excusas» de Moisés (suelen contarse cinco), Lutero y la bendición, Baba Batra 14b-15a.
