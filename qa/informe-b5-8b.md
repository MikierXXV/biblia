# Informe B5.8b · Hebreos, cartas católicas y Apocalipsis (9 libros)

Estado: Heb, Sant, 1 Pe, 2 Pe, 1 Jn, 2 Jn, 3 Jn, Jds y Ap pasan a `completo`, con 35 enseñanzas: Heb 4, Sant 4, 1 Pe 4, 2 Pe 4, 1 Jn 4, 2 Jn 3, 3 Jn 3, Jds 3, Ap 6. `node scripts/validar-contenido.mjs`: 0 ✗ (397 fichas); queda solo el aviso de 3 libros sin completar (de otra tanda, B5.8a). Frases prohibidas: 0. Sin build ni navegador. Esta tanda no completa ningún tema ni toca `temas.json`.

## 1. DEC §11 A-C

- **A. Cobertura:** 9/9 libros `completo`; 3-6 enseñanzas cada uno (2-3 Jn y Jds, 3); autoría, datación con `rango`, canon y 2-3 fuentes.
- **B. Pluralidad:** tres capas en cada enseñanza. Fe y obras (Sant 2) con Lutero, lectura católica y la crítica en dos posturas enfrentadas (Allison frente a Johnson y otros), sin dar por hecho el conflicto con Pablo. Textos incómodos tratados: 1 Pe 2,18-3,7 (`abierta`) y violencia del Apocalipsis. Mil años de Ap 20 como `abierta`.
- **C. Revisión:** `revisor-de-contenido` pasó una vez: 12 ✗ y 6 menores, todos aplicados (ver §5).

## 2. Enseñanzas por tema (de este lote; el umbral lo cierra B5.9)

esperanza-y-consuelo 9 · ley-libertad-y-gracia 5 · amor-al-projimo-y-a-los-enemigos 5 · sufrimiento-del-inocente-y-lamento 4 · sabiduria-y-vida-buena 4 · violencia-guerra-y-paz 3 · profecia-y-llamada 3 · extranjero-y-hospitalidad 3 · reino-de-dios 2 · poder-monarquia-y-critica-politica 2 · misericordia-y-compasion-de-dios 2 · mesias-y-esperanza-mesianica 2 · justicia-social-y-defensa-del-pobre 2 · espiritu-de-dios 2 · alianza 2 · perdon-y-reconciliacion 1 · oracion 1 · mujeres-y-liderazgo 1 · imagen-de-dios-y-dignidad-humana 1 · culto-verdadero-y-sacrificio 1 · creacion-y-cuidado-del-mundo 1.

## 3. Cada [D] de la investigación → dónde quedó

| [D] | Fichero · campo |
|---|---|
| Hebreos: destinatarios | `hebreos-sumo-sacerdote-sacrificio` · `critica.posturas` |
| Hebreos: lectura supersesionista (añadido) | `hebreos-alianza-mejor` · `critica.posturas` y lecturas |
| Santiago: autoría | `libros/santiago` · `autoria`, `datacion.posturas` |
| Santiago y Pablo (Lutero) | `santiago-fe-y-obras` · lecturas y `critica.posturas` |
| 1 Pedro: autoría/fecha | `libros/1-pedro` · `autoria`, `datacion.posturas` |
| 2 Pedro: pseudonimia [C], fecha en disputa | `libros/2-pedro` · `datacion.posturas` |
| Judas: autoría/fecha | `libros/judas` · `autoria`, `datacion.posturas` |
| Diótrefes (no era [D]; lo trata como disputa) | `3-juan-diotrefes-quiere-mandar` · `critica.posturas` |
| Ap: fecha Nerón/Domiciano | `libros/apocalipsis` · `datacion.posturas` |
| Ap: dispensacionalismo y premilenarismo | `apocalipsis-mil-anos` · `lecturas` (`abierta`) |
| Ap: violencia | `apocalipsis-violencia-del-libro` · `lecturas`, `critica.posturas` |

## 4. Fuentes → comprobación

Comprobadas en catálogo Open Library (autor, título, año/editorial): Attridge *Hebrews* (Hermeneia 1989); Levine-Brettler *JANT* (OUP 2011); Lane *Hebrews* (WBC 1991); Allison *James* (ICC 2013); McKnight *James* (NICNT 2011); Bauckham *James* (1999) y *Jude, 2 Peter* (1983); Dibelius *James*; L. T. Johnson *The Letter of James* (AB 1995); Elliott *1 Peter* (AYB) y *A Home for the Homeless*; Jobes *1 Peter* (BECNT 2005); Feldmeier (Mohr 1992); Achtemeier (Hermeneia 1996); Schüssler Fiorenza *In Memory of Her* (1983), *En memoria de ella* (DDB 1989) y *Justice and Judgment*; Brown *Introducción al NT* (Trotta 2002); Collins *Crisis and Catharsis* (1984); Aune *Revelation* (WBC); Pippin *Death and Desire* (1992); Lindsey *Late Great Planet Earth*; Robinson *Redating the NT* (1976).

Comprobación parcial o ausente (pendiente de ojos humanos):
- Brown, *The Epistles of John*: el catálogo da 1995, no confirma 1982 ni la editorial.
- Balch, *Let Wives Be Submissive*: el catálogo da 1975; la edición de 1981 va de memoria.
- Scofield Reference Bible (1909) y Agustín, *La ciudad de Dios*: solo indirecta o sin catálogo.
- Bauckham, *La teología del libro del Apocalipsis* (Trotta): no aparece; se dejó la edición inglesa.
- Käsemann, «Ketzer und Zeuge», ZThK 48 (1951): artículo, no está en catálogo; de memoria.

## 5. Cambios respecto a la investigación y a la primera redacción

- 1 Pe: «Humildad ante los pastores» sale para dejar sitio a «Esclavos y mujeres» (textos incómodos) y «Forasteros y pueblo escogido» (Elliott frente a Jobes, Feldmeier).
- Judas: la doxología se sustituye por la dependencia 2 Pe-Judas. 2 Pe: añade «falsos maestros» y «Pablo como Escritura». 2 Jn: funde verdad y amor y añade «el Anciano». Ap: 6 enseñanzas (funde nueva creación y lágrima; añade violencia y mil años).
- Quitados por no poder atribuirlos: Dunn sobre Santiago; Eisenbaum sobre Hebreos; las siete cartas como siete eras (Scofield); una lectura pacifista menonita sin autor.
- Revisión: Allison en Sant 2 corregido (sí ve respuesta a Pablo); Jobes sobre Silvano y «forasteros» corregido; Lindsey y Scofield de crítica a lecturas confesionales; 2 Pe fecha en `discusion` (Bauckham 80-90, Brown hacia 130); «común a judía y cristianas» quitado de Hebreos; canon protestante de Ap (Lutero y Zwinglio dudaron).
- Pendiente honesto: `apocalipsis-mil-anos` quedó con `critica.acuerdo: consenso` por falta de una segunda postura verificable. La postura A de `hebreos-alianza-mejor` es «una parte de la crítica» sin autor. Las posturas de Bauckham, Brown, Collins, Käsemann y Attridge están resumidas de su tesis conocida, sin libro delante: conviene una lectura humana. No se aplicó la muestra de lectura humana de §11 B.
