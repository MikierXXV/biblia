# Informe B5.8a · Cartas paulinas (Rom, 1-2 Cor, Gál, Ef, Flp, Col, 1-2 Tes, 1-2 Tim, Tit, Flm)

Estado: los 13 libros pasan a `completo`, con **54 enseñanzas** (Rom 6, 1 Cor 6, 2 Cor 4, Gál 5, Ef 5, Flp 4, Col 4, 1 Tes 3, 2 Tes 3, 1 Tim 5, 2 Tim 3, Tit 3, Flm 3). `node scripts/validar-contenido.mjs`: 0 errores (408 fichas). Frases vetadas: 0. Sin build ni navegador. No se ha tocado `temas.json` (esta tanda no completa ningún tema). Sin `cita` (opción B).

## 1. DEC §11 A-C
- **A. Cobertura:** ✓ 13/13 `completo`, 3-6 enseñanzas cada uno, Flm con 3.
- **B. Pluralidad:** ✓ Deuteropaulinas (Ef, Col, 2 Tes, 1-2 Tim, Tit) con `autoria.acuerdo: discusion` y posturas con nombre. `abierta: true` en Rom 1,26-27, Rom 13, 1 Cor 14,34-35, 1 Tim 2 y además 1 Tes 4 (difuntos), 2 Tes 2, 2 Cor 12, Ef código doméstico y Flm 15-16. Fe y obras (Rom 3, Gál 2-3, Ef 2, Tit 3) sin dar por hecho conflicto con Santiago. AT leído en clave cristiana con lectura judía al lado.
- **C. Revisión:** `revisor-de-contenido` pasó una vez (12 puntos + 6 menores). Aplicados 1-10 y 12; el 11 en parte. Retirada la fuente O'Brien (*Ephesians*, Pillar), retirada por la editorial en 2016; sustituida por Hoehner.

## 2. Enseñanzas por tema (solo las de este lote)
ley-libertad-y-gracia 12 · esperanza-y-consuelo 10 · espiritu-de-dios 9 · amor-al-projimo-y-a-los-enemigos 9 · justicia-social-y-defensa-del-pobre 8 · alianza 7 · imagen-de-dios-y-dignidad-humana 7 · perdon-y-reconciliacion 6 · sabiduria-y-vida-buena 5 · mujeres-y-liderazgo 5 · poder-monarquia-y-critica-politica 4 · misericordia-y-compasion-de-dios 4 · sufrimiento-del-inocente-y-lamento 3 · extranjero-y-hospitalidad 3 · culto-verdadero-y-sacrificio 2 · resurreccion-y-vida-despues-de-la-muerte 2 · oracion 2 · mesias-y-esperanza-mesianica 2 · sentido-y-finitud 1 · creacion-y-cuidado-del-mundo 1 · violencia-guerra-y-paz 1. El umbral lo cierra B5.9.

## 3. Cambios respecto a la investigación
- Ef: sin enseñanza de la armadura (6,10-18); queda en la presentación. Tito: «responsables comunitarios» (1,5-9) fundido en 1 Tim 3 (Tito, 3). Col: enseñanza propia sobre 3,18-4,1. Detalle en las tablas de cada grupo.

## 4. Pendientes honestos
- **Atribuciones de memoria o por reseña**, sin comprobar en la obra: Dunn (¿Pablo «perdió» en Antioquía?), Brooten, Segal, Theissen, Pearson, Lohse, MacDonald, Käsemann, Koester, Welborn, Odell-Scott, Talbert, Keener, Bruce. Documentos eclesiales sin cotejar en texto: Trento (comprobado por el revisor), *Lumen gentium*, Catecismo 2242 y 2402-2406, Epifanio/Crisóstomo/Basilio.
- 1 Tes 2,13-16: dos de las tres posturas sin autor. 1 Cor 11,2-16 solo de pasada. 1 Tim 3,11 (diaconisas): sin postura nombrada.
- 2 Tes: `datacion.rango` [51, 100] es una cota amplia, no una tesis de ningún autor.
- Brown, *Introducción al NT*: `catolica` en los 13.
- Las fuentes se comprobaron en catálogo con búsqueda web: ver (b) en cada parcial. Quedan sin abrir: Boswell, Nanos, Longenecker, Bruce, Sanders, Yoder (solo como postura).
- El cuadro de cada grupo pasó los ficheros por scripts Node en la fase de correcciones: mismo formato (sangría 2).

## 5. Tablas (a) [D] → fichero/campo, (b) fuentes → dónde se comprobó, (c) citas
Las tres tablas, por grupo, están en los informes parciales (cada uno con su sección «Correcciones de revisión editorial»):
- `qa/b5-8a-parcial-A.md` — Rom, Gál, Flm
- `qa/b5-8a-parcial-B.md` — 1-2 Cor, 1-2 Tes
- `qa/b5-8a-parcial-C.md` — Ef, Col, Flp
- `qa/b5-8a-parcial-D.md` — 1-2 Tim, Tit

(c) Citas bíblicas: ninguna (opción B).
