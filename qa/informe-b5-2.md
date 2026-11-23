# Informe B5.2 · Históricos I (Jos, Jue, 1-2 Sm, 1-2 Re)

Estado: los 6 libros pasan a `completo`, con 31 enseñanzas, y los temas `poder-monarquia-y-critica-politica` y `violencia-guerra-y-paz` también. `npm run validar` sale con 0 ✗. El `revisor-de-contenido` pasó dos veces: 12 ✗ en la primera pasada (aplicados todos) y 11 en la segunda (aplicados todos). No se hizo una tercera pasada.

## 1. DEC §11 A-C

- **A. Voz y límites (§13):** cumplidos y validados por `reglas.json` (frases ≤30 palabras, párrafos ≤4 frases, cursivas con glosa, sin frases vetadas; grep de vetadas = 0). Opción B: no hay campo `cita` ni comillas que finjan traducción (el revisor las cazó y se quitaron). Abreviatura «a. C.» al final de frase fusiona frases en el validador: se reordenó donde ocurrió.
- **B. Textos difíciles tratados de frente:** herem de Josué (Orígenes, Agustín, Talmud de Jerusalén, Niditch, Copan, Lind, Seibert); Jefté; Gabaá; Rizpá y las ejecuciones; Amalec (1 Sm 15, añadido tras la primera revisión). Arqueología con cuatro posturas en Josué y tres en Salomón, sin «crítica contra conservadores». 2 Sm 7 con lecturas judía, católica y protestante lado a lado.
- **C. Atribución y orden:** cada postura lleva autor nombrado salvo los casos de abajo. Orden judía, católica, ortodoxa, protestante, crítica. Numeración Vulgata de Torres Amat explicada en los cuatro libros afectados (1-2 Sm = «1-2 Reyes»; 1-2 Re = «3-4 Reyes»).

Pendientes honestos:
- No hay lecturas ortodoxas separadas en ninguna de las 31 enseñanzas, ni fuentes católicas salvo R. E. Brown. Las patrísticas compartidas van como «católica».
- Quedan posturas con rótulo genérico («Una parte de la crítica» / «Otra parte» / «Otros estudiosos») en: Reino partido [0], Naamán [0-1], Natán [1], Eliseo [1], Jueces (libro, `datacion`) y Nabot. Ningún autor verificable disponible.
- Las dos Samuel y los dos Reyes dicen «Josías, hacia 620 a. C.» y 587 para la caída de Jerusalén; coincide con el resto del sitio.
- Kitchen, Hess y Block llevan `tradicion: protestante` en `fuentes` aunque defienden posturas de la capa crítica. Revisar si el esquema se mantiene.
- Singularidad de `lecturas`: algunas enseñanzas mezclan una lectura `judia` con otra `comun` o `comun` con una `judia` (Samaría y Jerusalén, Amalec, 1 Re 8). Es válido en el esquema, discutible en estilo.

## 2. Enseñanzas por tema

| Tema | Enseñanzas |
|---|---|
| poder-monarquia-y-critica-politica | 18 |
| violencia-guerra-y-paz | 11 |
| mujeres-y-liderazgo | 10 |
| profecia-y-llamada | 6 |
| alianza | 5 |
| extranjero-y-hospitalidad | 4 |
| justicia-social-y-defensa-del-pobre | 4 |
| exilio-y-retorno | 3 |
| culto-verdadero-y-sacrificio | 2 |
| oracion | 2 |
| mesias-y-esperanza-mesianica | 2 |
| perdon-y-reconciliacion | 2 |

Recuento hecho con un script sobre el campo `temas` de las 31 fichas (una ficha puede contar en varios temas).

## 3. Cambios respecto a la investigación

- Josué: 5 enseñanzas; la conquista arqueológica pasa a enseñanza propia con 4 posturas.
- Jueces: Sansón no tiene enseñanza propia; se añaden Jefté y su hija y Gabaá.
- 1 Samuel: 6 enseñanzas; Goliat recoge el problema textual (Elhanán, 2 Sm 21,19); Amalec (1 Sm 15) se añadió tras la primera revisión.
- 2 Samuel: se añade Rizpá (2 Sm 21,1-14), y la «historia de la sucesión» se trata como disputa.
- 1 Reyes: Salomón con arqueología multiposición (Finkelstein, Mazar, Kitchen); Elías con las traducciones de 19,12.
- 2 Reyes: Samaría y Jerusalén caen, con Becking (dos tomas), Römer y Finkelstein; Joaquín liberado.
- Rut no entra (es de B4).

## 4. Tablas

### (a) Cada [D] de la investigación → dónde quedó como `discusion`

| [D] | Fichero y campo |
|---|---|
| Jos: modelo de redacción dtr y conquista arqueológica | `ensenanzas/josue-la-conquista-y-la-arqueologia.json` (`critica.posturas`); `libros/josue.json` (`datacion.posturas`) |
| Jos: herem histórico o ideal | `ensenanzas/josue-jerico-y-el-herem.json` (`critica.posturas`) |
| Jue: Jue 5 antiguo | `ensenanzas/jueces-debora-jueza-profeta-y-yael.json` (`critica`); `libros/jueces.json` (`datacion.posturas`) |
| Jue: Jefté, voto y cumplimiento | `ensenanzas/jueces-jefte-y-su-hija.json` (`critica`) |
| 1 Sm: fuentes y fechas | `libros/1-samuel.json` (`datacion.posturas`); `ensenanzas/1-samuel-israel-pide-un-rey.json` (`critica`) |
| 1 Sm: Goliat y Elhanán | `ensenanzas/1-samuel-david-y-goliat.json` (`critica`) |
| 2 Sm: «propaganda davídica» / historia de la sucesión | `ensenanzas/2-samuel-tamar-y-absalon-la-casa-se-desangra.json` (`critica.posturas`: Rost, McCarter, Alter) |
| 2 Sm: núcleo de 2 Sm 7 | `ensenanzas/2-samuel-la-promesa-a-david.json` (`critica.posturas`) |
| 1-2 Re: ediciones bajo Josías y en el exilio | `libros/1-reyes.json`, `libros/2-reyes.json` (`datacion.posturas`) |
| 1 Re: cronología de Salomón | `ensenanzas/1-reyes-salomon-sabio-y-caido.json` (`critica.posturas`) |
| 2 Re: reformas de Ezequías y Josías | `ensenanzas/2-reyes-las-reformas-de-ezequias-y-josias.json` (`critica.posturas`) |

### (b) Fuentes → dónde se comprobó

**No se ha podido abrir ningún catálogo ni URL en esta sesión.** La existencia, el título y el autor de cada obra salen de la investigación previa y del `revisor-de-contenido`, que contrastó las citas talmúdicas y patrísticas de memoria y corrigió varias. Pendiente de comprobar en catálogo (WorldCat / editorial / Open Library) antes de publicar:

The Jewish Study Bible (OUP, 2004; pendiente heredado de B5.3/B5.4) · Römer, *The So-Called Deuteronomistic History* (T&T Clark, 2005) · Finkelstein y Silberman, *The Bible Unearthed* (Free Press, 2001) · Mazar, *Archaeology of the Land of the Bible* (Doubleday, 1990) · Dever, *What Did the Biblical Writers Know…* (Eerdmans, 2001) · Kitchen, *On the Reliability of the Old Testament* (Eerdmans, 2003) · Hess, *Joshua* (IVP, 1996) · Niditch, *War in the Hebrew Bible* (OUP, 1993) · Copan, *Is God a Moral Monster?* (Baker, 2011) · Lind, *Yahweh Is a Warrior* (Herald, 1980) · Block, *Judges, Ruth* (NAC 6, 1999) · Trible, *Texts of Terror* (Fortress, 1984) · Brettler, *The Book of Judges* (Routledge, 2002) · Alter, *The David Story* (Norton, 1999) · McCarter, *I Samuel* (AB 8, 1980) y *II Samuel* (AB 9, 1984) · Halpern, *David's Secret Demons* (Eerdmans, 2001) · Jennings, *Jacob's Wound* (Continuum, 2005) · Cogan, *1 Kings* (AB 10, 2000) · Cogan y Tadmor, *II Kings* (AB 11, 1988) · Sweeney, *I & II Kings* (WJK, 2007) · Brueggemann, *The Prophetic Imagination* (Fortress, 1978) · R. E. Brown, *Jesus and Elisha* (1971) · Cross, *Canaanite Myth and Hebrew Epic* (Harvard, 1973) · Noth, *The Deuteronomistic History* (JSOT, 1981) · Becking, *The Fall of Samaria* (Brill, 1992) · Gottwald, *The Tribes of Yahweh* (Orbis, 1979) · Seibert, *Disturbing Divine Behavior* (Fortress, 2009) · Exum, *Plotted, Shot, and Painted* (1996) · Bailey, *David in Love and War* (JSOT, 1990).

Avisos: Brettler aparece en la fuente como libro de 1989 en algunas notas de la investigación; la edición de Routledge es de 2002 (el artículo `JBL 108` es de 1989). Comprobar cuál se cita. Las referencias a Rofé, Veijola, Becker, Dumbrell, Na'aman, Herzog, Fried, Davidson, Abasili, Thompson y Zuckerman están en el texto como atribución de postura; el revisor las propuso con seguridad «media» en el caso de Becker y Dumbrell, y no están en `fuentes[]`.

### (c) Cada `cita` → URL

Opción B: no hay citas. Tabla vacía por diseño.

## 5. Qué falló en `npm run validar` por otras tandas

Nada de este lote. Al final salía 0 ✗, con avisos de cobertura de otros libros y «7 sin completar» temas de otras tandas.
