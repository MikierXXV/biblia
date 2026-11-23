# Biblia · Fichas de ejecución (B4 piloto y B5 lotes)

Encargo e-31a5c8 · Tarea B2 (t-44637a) · 14-11-2026

Cada ficha dice qué secciones de `DECISIONES.md` (en adelante **DEC**) tiene que leer quien la ejecute. **Leer solo esas**; la investigación, con Grep por libro (`## <Nombre>` en `investigacion/0X-*.md`), nunca entera.

Reglas comunes a todas las fichas:
- Rutas siempre absolutas bajo `C:/Users/migue/biblia` (o el scratchpad). Nada fuera.
- **Un build, render o navegador a la vez en la máquina**: antes de `npm run build`, `capturar`, `auditar` o un render de reel, `Get-Process node,chrome,firefox,ffmpeg` y esperar si hay otro trabajo pesado del equipo. Salida de comandos siempre recortada (`| tail -n 30`).
- Redacción de fichas: **sonnet u opus**, nunca haiku (ya generó relleno en otro proyecto). Haiku solo para lo mecánico (esbozos de datos, comprobar URL, contar).
- Sin `git push`, sin publicar, sin gastar: eso va a Sócrates con `necesita_humano`.
- Reclamar ficheros antes de tocarlos (`reclamar_ficheros`) y soltarlos al acabar.

---

## B4 · Piloto: el sitio arrancado + Rut completo

**Libro propuesto: Rut.** Por qué:
- **Corto** (4 capítulos): el esfuerzo se va en probar el modelo, no en resumir.
- **Ejercita la pluralidad entera**: lectura judía (se lee en Shavuot; Rut como modelo de quien se une al pueblo), cristiana (Rut en la genealogía de Jesús, Mt 1,5), crítica con **fecha en discusión** (monarquía temprana o s. V a. C., quizá réplica a Esdras-Nehemías sobre los matrimonios mixtos), y lectura feminista/literaria (Trible).
- **Toca tres temas transversales** de forma natural: extranjero y hospitalidad, mujeres y liderazgo, mesías y esperanza mesiánica (genealogía de David).
- Tiene un **reel claro** (DEC §10).
- Lo que Rut no prueba —un libro deuterocanónico— lo cubre el piloto con los **73 esbozos** y el mapa del canon, donde los 7 deuterocanónicos y las adiciones ya se marcan. *Alternativa si el humano prefiere estresar el canon: Tobías (deuterocanónico, dos recensiones griegas, Vulgata distinta), a costa de un piloto más lento.*

**Lee:** DEC entera (es el piloto que la pone a prueba). Investigación: INVESTIGACION.md §2-§6, `## Rut` en `02-historicos.md`, y las líneas de los 73 libros solo para los esbozos.

**Objetivo.** Un sitio que valida y se ve bien en local con: los 73 libros en esbozo, Rut completo (4-5 enseñanzas), 24 temas (3 completos y 21 en esbozo), las tres mecánicas SVG, la página del canon, 1 reel importado y el QA del piloto pasado. Demuestra que el modelo aguanta antes de escribir 72 libros más.

**Ficheros que crea:** todo el sitio en `C:/Users/migue/biblia/` (`package.json`, `src/`, `content/`, `design/`, `scripts/`, `docs/`, `qa/`, `public/reels/`).

**Qué no tocar:** `investigacion/`, `DECISIONES.md`, `FICHAS.md` (si algo de DEC no funciona, se propone el cambio a Sócrates; no se edita DEC a la vez que el código). `C:/Users/migue/plantilla-sitio` (solo lectura; los cambios que convengan a la plantilla se anotan en `docs/CAMBIOS-PLANTILLA.md`). En `videos-cortos`, solo la carpeta del reel nuevo.

### Pasos

**B4.1 Esqueleto** (DEC §8)
1. `node C:/Users/migue/plantilla-sitio/crear.mjs <scratchpad>/biblia-sitio --tipo app --titulo "Biblia, libro a libro" --descripcion "Los 73 libros de la Biblia: qué enseñan, cómo los leen las tradiciones y qué dice la crítica histórica."` (el título visible lo puede afinar el ejecutor; el del encargo es «Biblia: el texto entero, por libros»).
2. `cp -rn <scratchpad>/biblia-sitio/. C:/Users/migue/biblia/` — **`-n`**: no sobrescribe nada de lo que ya hay. Comprobar después que `DECISIONES.md`, `FICHAS.md` e `investigacion/` siguen intactos.
3. `npm install && npm run validar` **antes de cambiar nada**. Si falla, el problema es la plantilla: parar y avisar.
4. Quitar lo de la variante que no aplica (DEC §8): `content/en/`, favoritos (`src/app/favoritos.ts` y sus usos), `movimiento_id`, `generar-carteles`. `reglas.json` → `idiomas: ["es"]`, `paridad_idiomas: false`.

**B4.2 Modelo de contenido** (DEC §5, skill `modelo-de-contenido`)
5. Schemas `seccion`, `libro`, `ensenanza`, `tema` en `content/schema/` (borrar `grupo` y `ficha`). Colecciones, referencias, orden y longitudes en `reglas.json`.
6. Los cuatro cambios del validador (DEC §5.6): referencia sobre campo lista, `cita_biblica`, `cobertura` (con `--estricto`) y `completo_exige`. Genéricos, leyendo de `reglas.json`. Probar cada uno con una ficha rota a propósito (y deshacerla).
7. **Prueba del modelo antes de escribir en serio** (skill `nuevo-sitio`, paso 2): escribir a mano 1 enseñanza de Rut, 1 de Gn 1, 1 de Is 53 (lectura judía/cristiana lado a lado) y 1 de 1 Cor 14,34-35 (`abierta`). Las cuatro deben probar además dos casos que DEC no resuelve del todo (ver Revisión B3, R1):
   - **una lectura académica no confesional** (en Rut, la lectura literaria/feminista de Trible): por defecto va dentro de `critica.texto`, atribuida por su nombre («La lectura literaria de Phyllis Trible…»), con su fuente `tradicion: "literaria"`;
   - **protestantes que difieren entre sí** (en Is 53 o 1 Cor 14): una sola entrada `protestante` que nombra las dos posturas («Para la lectura evangélica…; la protestante liberal…»).
   Si alguna no cabe en el schema, cambiar el schema **y avisar a Sócrates** para corregir DEC. Las tres que no son de Rut se guardan en **`C:/Users/migue/biblia/borradores/ensenanzas/`** (fuera de `content/`, el validador no las lee) y las retoman B5.1 (Gn 1), B5.5 (Is 53) y B5.8 (1 Cor 14): no se vuelven a escribir desde cero.

**B4.3 Contenido**
8. `secciones.json` (5) y **73 esbozos** de libro (haiku vale): `id`, `seccion_id`, `orden`, `nombre`, `abreviatura`, `bloque` (NT), `capitulos`, `deuterocanonico`, `adiciones_griegas`, `estado: "esbozo"`, `resumen` (de la investigación, reescrito con la voz de DEC §6). **`id`, `nombre`, `abreviatura`, `orden` y `capitulos` se copian del Anexo A** (no se inventan: de ellos dependen los nombres de fichero que reclaman las tandas de B5). **Revisar a mano** los capítulos contra la fuente de `docs/TRADUCCION.md`, el orden y los 7 deuterocanónicos.
9. **`docs/TRADUCCION.md`** (DEC §4): localizar una edición digital de Torres Amat verificable (URL, edición de origen, motivo del dominio público). Si no hay fuente fiable, apuntarlo y seguir con la opción B (sin `cita`).
10. **Rut completo** (sonnet u opus): libro con todos los campos + 4-5 enseñanzas (las de la investigación: *jésed* Rut 1,16-17; la moabita bisabuela de David 4,17; espigar y el *goel* 2-4; la iniciativa de las mujeres; opcional: Noemí y el lamento 1,20-21). Cada una con sus tres capas y 1-3 temas.
11. `temas.json`: los 24 de INVESTIGACION §3 en esbozo (nombre, resumen, pasajes), **con los `id` y el `orden` del Anexo B**. Los 4 «posibles añadidos» de INVESTIGACION §3 **no** se crean en esta fase. **Completos: `extranjero-y-hospitalidad`, `mujeres-y-liderazgo`, `mesias-y-esperanza-mesianica`**, con introducción, divergencias y relacionados. **Regla para toda introducción de tema (B4 y B5):** se escribe sobre el recorrido entero de la Biblia a partir de los `pasajes` de INVESTIGACION §3, no a partir de las enseñanzas que ya existan; por eso un tema se puede completar antes de que estén escritos todos sus libros. Sus enseñanzas enlazadas en el piloto serán solo las de Rut: es lo esperado.
12. Páginas fijas `#/canon` y `#/acerca` (textos en `content/es/`, no en el código).

**B4.4 Interfaz y visualizaciones** (DEC §5.7, §7; skills `sistema-visual`, `mecanica-de-visualizacion`)
13. Tokens: dos temas, 5 acentos por sección, serif de lectura; `npm run validar:contraste -- --sugerir` hasta que pase.
14. Rutas de DEC §5.7 sobre `rutas.ts`/`main.ts` de la variante; filtros `seccion`, `testamento`, `deuterocanonico`, `tema`, `estado`; buscador.
15. Ficha de libro con el orden de bloques de DEC §5.7 y las tres capas por enseñanza con el mismo peso visual (DEC §3); insignias de DEC §7.1; esbozos con «En preparación».
16. Mecánicas `mapa-canon`, `dataciones` (con Rut y los esbozos que no tengan `rango` simplemente ausentes) y `matriz-temas`, cada una con alternativa textual. `presupuesto_3d: 0`.
17. `presupuestos.json` → rutas de captura: `""`, `#/l/rut`, `#/l/tobias` (esbozo deuterocanónico), `#/t/extranjero-y-hospitalidad`, `#/temas`, `#/canon`.

**B4.5 Reel** (DEC §10)
18. Reel «Rut, la extranjera» en `C:/Users/migue/videos-cortos` con su skill `reel-divulgativo`: fuentes escritas antes de la voz, 45-60 s, cierre sin veredicto. La lectura de Rut como réplica a Esdras-Nehemías es **[D]** en la investigación: el guion la atribuye («para buena parte de la crítica, quizá…») y nombra la otra datación (monarquía temprana); no la da por hecha aunque DEC §10 la resuma así.
19. Copiar `scripts/importar-reels.mjs` de mentalista, adaptarlo (`libro`/`tema` en vez de `concepto`), importar a `content/reels.json` y `public/reels/`, y mostrarlo en la ficha de Rut.

**B4.6 QA** (DEC §11)
20. Copiar DEC §11 a `qa/QA.md` y pasarla entera sobre el piloto; `revisor-de-contenido` sobre Rut y los 3 temas; `auditor-visual` para `build` + `capturar` + `auditar` (uno a la vez; él mira las capturas).
21. `qa/informe-piloto.md` con ✓/✗ por punto y una sección **«Qué cambiaría del modelo antes de B5»**.
22. Relevo en memoria y `hecho` a Sócrates. **PARADA**: el humano valora el piloto antes de B5.

### Criterios de aceptación
- `npm run validar` y `npm run build` sin errores; `validar` avisa de 72 libros y 21 temas en esbozo (y nada más).
- 73 ficheros de libro; exactamente 7 con `deuterocanonico: true`; Ester y Daniel con adiciones.
- Rut: `estado: "completo"`, 4-5 enseñanzas con las tres capas; la fecha de composición como `discusion` con ≥ 2 posturas; la lectura judía y la cristiana de la genealogía, lado a lado.
- 3 temas completos que enlazan a las enseñanzas de Rut y estas a ellos (en los dos sentidos).
- Mapa del canon con los 73, trama en deuterocanónicos y conmutador de tradición; dataciones con Rut; matriz con los 3 temas.
- `docs/TRADUCCION.md` con fuente verificada **o** decisión explícita de opción B.
- Reel importado y visible en `#/l/rut`.
- `qa/informe-piloto.md` sin ✗ abiertos (o con ✗ justificados que Sócrates acepta).

### Cómo comprobarlo
`npm run validar | tail -n 30`; `ls content/es/libros | wc -l` = 73; `grep -lE '"deuterocanonico": *true' content/es/libros/*.json | wc -l` = 7; grep de las frases prohibidas de DEC §11 B sobre `content/es` = 0; informe del `auditor-visual`; lectura de `qa/informe-piloto.md`.

---

## B4-E · Rut con la lectura amena: voz, estilos, capa académica, reel e informe

**Lee:** DEC §13 entera, §3 y las tablas de §5.4 y §5.3. Nada más de DEC. De software-engineer, solo como referencia de forma: `src/app/bloques.ts` (pasos, caja de error, «Para recordar») y sus capturas. **No copiar su contenido ni escribir en esa carpeta.**

**Objetivo.** `#/l/rut` y los 3 temas completos se leen como pide el humano: escena primero, frases cortas, sin tarjetas anidadas, disputa en caja y «Para recordar». Con la capa académica, el reel importado y `npm run validar` en verde. Es el modelo que copiarán las tandas de B5.

**Antes de empezar.** `npm run validar` falla hoy con 54 errores, todos en Rut y en sus 3 temas: es la lista de trabajo de esta ficha. Reclama `content/es/ensenanzas/rut-*.json`, `content/es/libros/rut.json`, `content/es/temas.json`, `content/schema/*.json`, `content/es/ui.json`, `src/main.ts`, `src/app/textos.ts`, `src/estilos/app.css`, `content/reels.json`, `public/reels/**` y `scripts/importar-reels.mjs`.

### Pasos

**E1 · Esquema** (skill `modelo-de-contenido`)
1. `ensenanza.schema.json`: añadir `academica` (lista de `{enfoque, autor, texto}`, con el `enfoque` en enum de DEC §5.4) y `critica.posturas` (lista de `{quien, texto}`).
2. `libro.schema.json`: añadir `para_recordar` ([str]) y `datacion.posturas`. `tema.schema.json`: añadir `para_recordar`.
3. Las longitudes por elemento las mide `reglas.lectura.listas`; no hace falta duplicarlas en el schema, que no admite `minItems`.

**E2 · Texto** (sonnet u opus, nunca haiku)
4. Reescribir las 5 enseñanzas, `rut.json` y los 3 temas completos con la voz de DEC §13.1. El `que_dice` de `rut-lealtad-jesed` ya está escrito en DEC §13.5: se copia tal cual.
5. Pasar a `academica` la lectura de Phyllis Trible que hoy está en `critica.texto` (`rut-lealtad-jesed` y las demás donde aparezca), con `enfoque: "feminista"` o `"literaria"`. La crítica histórica se queda con lo histórico.
6. En las 3 enseñanzas con `critica.acuerdo: "discusion"` y en `rut.datacion`: escribir 2-4 `posturas` con quién la sostiene. `critica.texto` queda como una frase de entrada. **Ninguna postura puede desaparecer al partir el texto**: compara antes y después, una por una.
7. `para_recordar` de Rut (3-5) y de cada tema (2-4), con atribución en lo que esté en discusión.
8. Lo que no cambia: tradiciones presentes, verbos de atribución, `acuerdo`, `abierta`, temas y fuentes. Si al acortar se cae una lectura, el texto está mal, no la regla.

**E3 · Estilos y plantilla de la ficha** (DEC §13.2 y §13.3; skill `sistema-visual`)
9. `md()`: cortar en `<p>` por línea en blanco y pintar como `<ol>`/`<ul>` las líneas que empiezan por `1. ` o `- `. Hoy cada campo se envuelve en un único `<p>`.
10. `pintarLibro`, en el orden de §13.2: entradilla en serif, «En esta página», «Quién y cuándo», «Para recordar», reel y luego «En qué Biblias está» en tabla. En `pintarTema`, su «Para recordar».
11. `ensenanzaHtml`: las capas sin tarjeta, la capa 3 «Lecturas académicas», la caja de disputa con posturas, el aviso de interpretación abierta como banda y las fuentes en una línea plegada. Todo rótulo nuevo, en `ui.json` (lo vigila `check-idiomas`).
12. `app.css`: quitar borde y fondo de `.capa`, `.biblias > div` y `.dos-lecturas > div`. Contenido en serif a `--t-base`, columna centrada a `--medida-texto` y espaciados de §13.2. Una sola clase de caja (`.caja`) para disputa y «Para recordar». Ningún valor suelto: solo tokens.
13. `npm run validar` en verde y `tsc --noEmit`.

**E4 · Reel** (el humano aprobó el piloto el 16-11, reel incluido)
14. Importar `rut-la-extranjera` con `scripts/importar-reels.mjs` (ya adaptado en B4) a `content/reels.json` y `public/reels/`, con póster, transcripción y fuentes. Debe verse en `#/l/rut`, en el sitio que le da §13.2.

**E5 · Comprobación** (una sola vez y con RAM: `Get-Process node,chrome,ffmpeg` antes; si hay menos de 1,5 GB libres, se para y se avisa a Sócrates)
15. `npm run build && npx vite preview --port 4173`, luego `npm run capturar` y `npm run auditar`, mediante el agente `auditor-visual`.
16. Las capturas de `#/l/rut` y de un tema las mira un subagente **sonnet**, en una hoja de contacto (ffmpeg: franjas en `hstack`). Debe juzgar los criterios de DEC §13.6 y comparar con la hoja de B4-D: primer pantallazo, cajas, muros de texto y número de pantallas en móvil.
17. `revisor-de-contenido` sobre Rut y los 3 temas: que al acortar no se haya perdido ninguna atribución ni ninguna postura.
18. Hoja de visionado `qa/VISIONADO-B4E.md` para el humano: qué mirar en `#/l/rut` (escritorio y móvil, claro y oscuro), el antes y el después de DEC §13.5 ya en pantalla, el reel en la ficha, y lo que siga abierto (Q1 Shavuot y Q4 del reel).

### Criterios de aceptación
- `npm run validar` sin errores; los avisos, solo los esbozos (72 libros y 21 temas). `npm run build` sin errores.
- Rut: 5 enseñanzas, cada una ≤ 1800 car.; `academica` con Trible donde corresponda; `posturas` en toda disputa; `para_recordar` en el libro y en los 3 temas.
- `#/l/rut` en móvil ≤ 12 pantallas; ninguna tarjeta dentro de otra; ninguna capa plegada; la entradilla en serif en el primer pantallazo.
- Reel visible en `#/l/rut`, con transcripción y fuentes.
- Informe del revisor sin pérdidas de pluralidad; `qa/VISIONADO-B4E.md` escrita.

### Cómo comprobarlo
`npm run validar | tail -n 30`; alto de `capturas/movil-claro-l-rut.png` con `ffprobe` (≤ 8880 px); `grep -c '"academica"' content/es/ensenanzas/rut-*.json`; veredicto del subagente sonnet; informe del revisor.

---

## B5 · Lotes por sección (8 tandas + cierre de temas B5.9)

Empieza solo después de la PARADA del piloto y con los cambios de modelo que salgan de ella ya en DEC.

### Ficha común a todas las tandas

**Lee:** DEC §3 (pluralidad), §4 (citas y numeración), §5.3-§5.5 (campos de libro, enseñanza y tema), §6 (voz), **§13 (lectura amena: manda sobre §6)** y §11 A-C (QA de contenido). La Rut que sirve de modelo es la de después de B4-E. La tanda de reel lee además §10. `qa/informe-piloto.md` («Qué cambiaría»). La ficha de Rut (`content/es/libros/rut.json` y `content/es/ensenanzas/rut-*.json`) como **modelo de formato**. De la investigación, solo los `## <Libro>` de su tanda, con Grep.

**Objetivo.** Pasar de `esbozo` a `completo` todos los libros de la tanda, con sus enseñanzas enlazadas a temas, sin romper nada de lo que ya hay.

**Pasos.**
1. Reclamar los ficheros de la tanda: `content/es/libros/<libro>.json` y `content/es/ensenanzas/<libro>-*.json` de sus libros, y `content/es/temas.json` solo si va a completar temas (ver «Temas» abajo).
2. Por cada libro (sonnet u opus): campos completos del libro + 3-6 enseñanzas con las tres capas; datos de la investigación, **comprobando** cada afirmación `[D]` y cada fuente (autor, título, año, editorial) contra una fuente abierta (catálogo de la editorial, WorldCat o similar); si no se puede comprobar, se dice «En discusión» y se nombra quién sostiene qué, o se quita. Si hay borrador en `borradores/ensenanzas/` (B4 paso 7) para un libro de la tanda, se parte de él.
3. Citas: solo Torres Amat (o ninguna, si se aplicó la opción B), ≤ 40 palabras, cotejadas con la fuente de `docs/TRADUCCION.md`. Ojo: Torres Amat sigue la Vulgata también en los **nombres y capítulos**: llama «1-2 Reyes» a 1-2 Samuel, «3-4 Reyes» a 1-2 Reyes, «Paralipómenos» a Crónicas y «1-2 Esdras» a Esdras-Nehemías, y Joel y Malaquías tienen otra división de capítulos. `pasaje` va siempre en la numeración del sitio (Anexo A); `cita.referencia`, en la de la fuente (DEC §4).
4. Temas: cada enseñanza con 1-3 temas del Anexo B. Los temas de la columna «Temas que completa» los completa **esa** tanda, tenga las enseñanzas que tenga (la introducción se escribe con la regla de B4 paso 11); el recuento de enseñanzas por tema va al informe y el umbral (≥ 3 de ≥ 2 libros) lo cierra B5.9, no cada tanda.
5. `npm run validar | tail -n 30` sin errores (los avisos de esbozos de otras tandas son normales).
6. `revisor-de-contenido` sobre los ficheros de la tanda; resolver sus ✗.
7. `qa/informe-<tanda>.md` con DEC §11 A-C punto por punto, recuento de enseñanzas por tema, y cualquier enseñanza cambiada respecto a la investigación con su motivo. Para que §11 B-C se pueda comprobar, el informe lleva tres tablas: **(a)** cada `[D]` de los `## <Libro>` de la tanda → fichero y campo donde quedó como `discusion` (o por qué se quitó); **(b)** cada fuente → URL o catálogo donde se comprobó; **(c)** cada `cita` → URL de la fuente de `docs/TRADUCCION.md` donde se cotejó.
8. Soltar ficheros, relevo en memoria, `hecho` a Sócrates.

**Qué no tocar.** Libros de otras tandas; `src/`, `design/`, `scripts/`, `content/schema/`, `content/reglas.json` (si el modelo no da, se propone a Sócrates; no se cambia el schema a mitad de B5). `DECISIONES.md`, `FICHAS.md`, `investigacion/`. Nada de build ni navegador en las tandas de contenido (el visual se comprueba en B6), **salvo** la tanda de reel, que solo renderiza el reel.

**Criterios de aceptación (todas).** Todos los libros de la tanda en `completo`; 3-6 enseñanzas cada uno con tres capas; `validar` sin errores; DEC §11 B-C en ✓; toda `[D]` de la investigación de esos libros recogida como `discusion`; frases prohibidas = 0; informe escrito.

**Cómo comprobarlo.** `npm run validar | tail -n 30`; `grep -L '"estado": "completo"'` sobre los libros de la tanda = vacío; contar `content/es/ensenanzas/<libro>-*.json` por libro; grep de frases prohibidas; leer el informe y el veredicto del `revisor-de-contenido`.

**Reel de la sección** (en la tanda marcada con ★): guion con fuentes antes de la voz, render en `videos-cortos` (uno a la vez en la máquina), importar con `scripts/importar-reels.mjs`, QA de reels (DEC §10). Si el render no cabe en la tanda por RAM o cupo, se separa en una subtarea y la tanda se cierra sin él.

### Las tandas

| Tanda | Sección | Libros (n) | Deutero / delicado | Reel | Temas que completa |
|---|---|---|---|---|---|
| **B5.1** | Pentateuco | Gn, Éx, Lv, Nm, Dt (5) | Hipótesis documentaria y sucesoras (`discusion` fuerte); Gn 1-3: lectura cristiana de Gn 3,15 («protoevangelio») con la judía al lado; herem en Dt | ★ Dos relatos de la creación | creacion-y-cuidado-del-mundo, imagen-de-dios-y-dignidad-humana, alianza, ley-libertad-y-gracia |
| **B5.2** | Históricos I | Jos, Jue, 1 Sm, 2 Sm, 1 Re, 2 Re (6) | Violencia y herem (Jos); arqueología: más de dos posturas (cronología baja de Finkelstein; Mazar y Dever en posiciones intermedias; lecturas maximalistas como Kitchen), sin reducirlo a «crítica contra conservadores»; 2 Sm 7: lectura mesiánica judía y cristiana lado a lado. *Rut ya está hecho en B4: no es de esta tanda* | — | poder-monarquia-y-critica-politica, violencia-guerra-y-paz |
| **B5.3** | Históricos II | 1 Cr, 2 Cr, Esd, Neh, **Tob, Jdt**, Est (+adiciones), **1 Mac, 2 Mac** (9) | 4 deuterocanónicos + adiciones de Ester: bloque «En qué Biblias está» con cuidado; recensiones de Tobías; 2 Mac 7 y 12 (resurrección, oración por los difuntos: lectura católica/protestante enfrentada) | ★ Los libros que tu Biblia quizá no tiene (enlace del reel: `libro: "tobias"`; la ficha `#/canon` lo menciona en texto) | exilio-y-retorno, resurreccion-y-vida-despues-de-la-muerte |
| **B5.4** | Sapienciales | Job, Sal, Prov, Ecl, Cant, **Sab, Sir** (7) | Numeración de salmos (DEC §4); Cantar `abierta` (amor humano/alegoría); salmos imprecatorios | ★ Job: la pregunta que no se responde | sufrimiento-del-inocente-y-lamento, sabiduria-y-vida-buena, sentido-y-finitud, oracion |
| **B5.5** | Profetas mayores | Is, Jr, Lam, **Bar** (+Carta de Jeremías), Ez, Dn (+adiciones) (6) | Is en tres partes; Is 7,14 y 53 lado a lado (judía/cristiana); Dn macabeo; Jr con dos formas textuales | ★ ¿Un Isaías o tres? | profecia-y-llamada, esperanza-y-consuelo. *No reescribe* `mesias-y-esperanza-mesianica` (lo completó B4): solo añade a sus `pasajes` lo que falte y anota en el informe si la introducción choca con lo escrito de Is |
| **B5.6** | Profetas menores | Os, Jl, Am, Abd, Jon, Miq, Nah, Hab, Sof, Ag, Zac, Mal (12) | Libros cortos: 3 enseñanzas suelen bastar; Jon (género), Miq 5,1 y Zac 9,9 lado a lado; numeración de Jl (4 cap.) y Mal (3 cap.) del Anexo A, distinta de la de Torres Amat | — | justicia-social-y-defensa-del-pobre, culto-verdadero-y-sacrificio, misericordia-y-compasion-de-dios |
| **B5.7** | Evangelios y Hechos | Mt, Mc, Lc, Jn, Hch (5) | Problema sinóptico; Jesús histórico vs. Cristo de la fe (`discusion`); lectura judía del NT (Levine) | ★ Cuatro evangelios, cuatro retratos | reino-de-dios, amor-al-projimo-y-a-los-enemigos, perdon-y-reconciliacion, espiritu-de-dios |
| **B5.8** | Cartas y Apocalipsis | Rom, 1-2 Cor, Gál, Ef, Flp, Col, 1-2 Tes, 1-2 Tim, Tit, Flm, Heb, Sant, 1-2 Pe, 1-3 Jn, Jds, Ap (22) | Deuteropaulinas (`discusion`); Rom 1,26-27, 1 Cor 14,34-35, 1 Tim 2, Rom 13 (`abierta`, textos incómodos); Santiago y Pablo sobre fe y obras: ¿contradicción o complementariedad? (Lutero, lectura católica, crítica), sin dar por hecho el conflicto; Ap | — (el de la sección va en B5.7) | ninguno (los 24 ya están repartidos; el repaso es B5.9) |

**B5.8 es la tanda grande.** Si la carga lo pide, se parte en **B5.8a** (las 13 paulinas, Rom–Flm) y **B5.8b** (Heb, católicas y Ap, 9), con la misma ficha. Las cartas breves (Flm, 2-3 Jn, Jds) llevan 3 enseñanzas.

**Orden recomendado:** B5.1 → B5.3 (prueba pronto los deuterocanónicos) → B5.4 → B5.5 → B5.2 → B5.6 → B5.7 → B5.8 → **B5.9** (siempre la última, sola). Se pueden llevar **dos tandas en paralelo** como mucho (RAM: dos ayudantes), siempre que no compartan temas por completar en el mismo momento: el `temas.json` es un solo fichero y se reclama.

**Cobertura de libros (Revisión B3):** B4 (Rut) + 5 + 6 + 9 + 7 + 6 + 12 + 5 + 22 = **73**, cada libro una sola vez. Deuterocanónicos: Tob, Jdt, 1-2 Mac (B5.3), Sab, Sir (B5.4), Bar (B5.5) = 7; adiciones: Est (B5.3), Dn (B5.5). Temas: B4 3 + B5.1 4 + B5.2 2 + B5.3 2 + B5.4 4 + B5.5 2 + B5.6 3 + B5.7 4 = **24**, cada uno completado por una sola tanda.

### B5.9 · Cierre de temas (después de todas las tandas, antes de B6)

**Lee:** DEC §3, §5.4-§5.5, §6, §13; los `qa/informe-*.md` (recuentos por tema); Anexo B.
**Pasos.** 1) Reclamar `content/es/temas.json` y `content/es/ensenanzas/*.json`. 2) Contar enseñanzas por tema; para cada tema con < 3 enseñanzas o de < 2 libros, añadir su `id` al campo `temas[]` de enseñanzas ya escritas que de verdad lo traten (máximo 3 temas por enseñanza; **no** se toca ningún otro campo ni se escriben enseñanzas nuevas). Si aun así no llega, se informa a Sócrates (recortar o fusionar el tema lo decide el humano). 3) Releer las 24 introducciones contra las enseñanzas enlazadas: que no se contradigan ni den por cerrado lo que una enseñanza marca `discusion`; ajustar `pasajes` y `relacionados`. 4) `npm run validar | tail -n 30`; `qa/informe-temas.md` con la tabla tema → nº de enseñanzas → libros. Sin build ni navegador.
**Aceptación.** 24 temas `completo` con ≥ 3 enseñanzas de ≥ 2 libros (o la excepción aceptada por el humano); `validar` sin errores; informe escrito.

**Al acabar B5** (lo comprueba B6, no B5): 73/73 completos, 24 temas completos con ≥ 3 enseñanzas de ≥ 2 libros, `validar -- --estricto` sin errores, y la pasada visual de DEC §11 D.

---

## Anexo A · Los 73 libros: id, nombre, abreviatura y capítulos (Revisión B3)

Numeración del sitio: la de las Biblias católicas españolas actuales (capítulos hebreos), salvo Ester y Daniel, que siguen la Vulgata con las adiciones (DEC §4). Salmos: hebrea con la griega entre paréntesis. `id` = nombre en kebab-case sin tildes ni paréntesis. Comprobar los capítulos contra la fuente al crear los esbozos (B4 paso 8); si alguno no cuadra, se corrige aquí y se avisa.

| Sección | orden | id | nombre | abrev. | cap. | deutero / bloque |
|---|---|---|---|---|---|---|
| pentateuco | 1 | genesis | Génesis | Gn | 50 | |
| pentateuco | 2 | exodo | Éxodo | Éx | 40 | |
| pentateuco | 3 | levitico | Levítico | Lv | 27 | |
| pentateuco | 4 | numeros | Números | Nm | 36 | |
| pentateuco | 5 | deuteronomio | Deuteronomio | Dt | 34 | |
| historicos | 1 | josue | Josué | Jos | 24 | |
| historicos | 2 | jueces | Jueces | Jue | 21 | |
| historicos | 3 | rut | Rut | Rut | 4 | |
| historicos | 4 | 1-samuel | 1 Samuel | 1 Sm | 31 | |
| historicos | 5 | 2-samuel | 2 Samuel | 2 Sm | 24 | |
| historicos | 6 | 1-reyes | 1 Reyes | 1 Re | 22 | |
| historicos | 7 | 2-reyes | 2 Reyes | 2 Re | 25 | |
| historicos | 8 | 1-cronicas | 1 Crónicas | 1 Cr | 29 | |
| historicos | 9 | 2-cronicas | 2 Crónicas | 2 Cr | 36 | |
| historicos | 10 | esdras | Esdras | Esd | 10 | |
| historicos | 11 | nehemias | Nehemías | Neh | 13 | |
| historicos | 12 | tobias | Tobías | Tob | 14 | deuterocanónico |
| historicos | 13 | judit | Judit | Jdt | 16 | deuterocanónico |
| historicos | 14 | ester | Ester | Est | 16 | adiciones griegas |
| historicos | 15 | 1-macabeos | 1 Macabeos | 1 Mac | 16 | deuterocanónico |
| historicos | 16 | 2-macabeos | 2 Macabeos | 2 Mac | 15 | deuterocanónico |
| sapienciales | 1 | job | Job | Job | 42 | |
| sapienciales | 2 | salmos | Salmos | Sal | 150 | |
| sapienciales | 3 | proverbios | Proverbios | Prov | 31 | |
| sapienciales | 4 | eclesiastes | Eclesiastés | Ecl | 12 | |
| sapienciales | 5 | cantar-de-los-cantares | Cantar de los Cantares | Cant | 8 | |
| sapienciales | 6 | sabiduria | Sabiduría | Sab | 19 | deuterocanónico |
| sapienciales | 7 | eclesiastico | Eclesiástico (Sirácida) | Sir | 51 | deuterocanónico |
| profetas | 1 | isaias | Isaías | Is | 66 | |
| profetas | 2 | jeremias | Jeremías | Jr | 52 | |
| profetas | 3 | lamentaciones | Lamentaciones | Lam | 5 | |
| profetas | 4 | baruc | Baruc | Bar | 6 | deuterocanónico (cap. 6 = Carta de Jeremías) |
| profetas | 5 | ezequiel | Ezequiel | Ez | 48 | |
| profetas | 6 | daniel | Daniel | Dn | 14 | adiciones griegas |
| profetas | 7 | oseas | Oseas | Os | 14 | |
| profetas | 8 | joel | Joel | Jl | 4 | |
| profetas | 9 | amos | Amós | Am | 9 | |
| profetas | 10 | abdias | Abdías | Abd | 1 | |
| profetas | 11 | jonas | Jonás | Jon | 4 | |
| profetas | 12 | miqueas | Miqueas | Miq | 7 | |
| profetas | 13 | nahum | Nahún | Nah | 3 | |
| profetas | 14 | habacuc | Habacuc | Hab | 3 | |
| profetas | 15 | sofonias | Sofonías | Sof | 3 | |
| profetas | 16 | ageo | Ageo | Ag | 2 | |
| profetas | 17 | zacarias | Zacarías | Zac | 14 | |
| profetas | 18 | malaquias | Malaquías | Mal | 3 | |
| nuevo-testamento | 1 | mateo | Mateo | Mt | 28 | evangelios |
| nuevo-testamento | 2 | marcos | Marcos | Mc | 16 | evangelios |
| nuevo-testamento | 3 | lucas | Lucas | Lc | 24 | evangelios |
| nuevo-testamento | 4 | juan | Juan | Jn | 21 | evangelios |
| nuevo-testamento | 5 | hechos | Hechos de los Apóstoles | Hch | 28 | hechos |
| nuevo-testamento | 6 | romanos | Romanos | Rom | 16 | cartas-paulinas |
| nuevo-testamento | 7 | 1-corintios | 1 Corintios | 1 Cor | 16 | cartas-paulinas |
| nuevo-testamento | 8 | 2-corintios | 2 Corintios | 2 Cor | 13 | cartas-paulinas |
| nuevo-testamento | 9 | galatas | Gálatas | Gál | 6 | cartas-paulinas |
| nuevo-testamento | 10 | efesios | Efesios | Ef | 6 | cartas-paulinas |
| nuevo-testamento | 11 | filipenses | Filipenses | Flp | 4 | cartas-paulinas |
| nuevo-testamento | 12 | colosenses | Colosenses | Col | 4 | cartas-paulinas |
| nuevo-testamento | 13 | 1-tesalonicenses | 1 Tesalonicenses | 1 Tes | 5 | cartas-paulinas |
| nuevo-testamento | 14 | 2-tesalonicenses | 2 Tesalonicenses | 2 Tes | 3 | cartas-paulinas |
| nuevo-testamento | 15 | 1-timoteo | 1 Timoteo | 1 Tim | 6 | cartas-paulinas |
| nuevo-testamento | 16 | 2-timoteo | 2 Timoteo | 2 Tim | 4 | cartas-paulinas |
| nuevo-testamento | 17 | tito | Tito | Tit | 3 | cartas-paulinas |
| nuevo-testamento | 18 | filemon | Filemón | Flm | 1 | cartas-paulinas |
| nuevo-testamento | 19 | hebreos | Hebreos | Heb | 13 | cartas-catolicas |
| nuevo-testamento | 20 | santiago | Santiago | Sant | 5 | cartas-catolicas |
| nuevo-testamento | 21 | 1-pedro | 1 Pedro | 1 Pe | 5 | cartas-catolicas |
| nuevo-testamento | 22 | 2-pedro | 2 Pedro | 2 Pe | 3 | cartas-catolicas |
| nuevo-testamento | 23 | 1-juan | 1 Juan | 1 Jn | 5 | cartas-catolicas |
| nuevo-testamento | 24 | 2-juan | 2 Juan | 2 Jn | 1 | cartas-catolicas |
| nuevo-testamento | 25 | 3-juan | 3 Juan | 3 Jn | 1 | cartas-catolicas |
| nuevo-testamento | 26 | judas | Judas | Jds | 1 | cartas-catolicas |
| nuevo-testamento | 27 | apocalipsis | Apocalipsis | Ap | 22 | apocalipsis |

Totales: 5 + 16 + 7 + 18 = 46 AT; 27 NT. Hebreos va en el bloque `cartas-catolicas` solo por agrupación (no es paulina ni «católica» en sentido estricto): la ficha del libro lo explica. Las abreviaturas de la investigación que no coinciden («Núm», «Mi») se normalizan a esta tabla.

## Anexo B · Los 24 temas: id, orden y quién los completa (Revisión B3)

| orden | id | completa |
|---|---|---|
| 1 | creacion-y-cuidado-del-mundo | B5.1 |
| 2 | imagen-de-dios-y-dignidad-humana | B5.1 |
| 3 | alianza | B5.1 |
| 4 | justicia-social-y-defensa-del-pobre | B5.6 |
| 5 | extranjero-y-hospitalidad | B4 |
| 6 | perdon-y-reconciliacion | B5.7 |
| 7 | misericordia-y-compasion-de-dios | B5.6 |
| 8 | amor-al-projimo-y-a-los-enemigos | B5.7 |
| 9 | sufrimiento-del-inocente-y-lamento | B5.4 |
| 10 | esperanza-y-consuelo | B5.5 |
| 11 | exilio-y-retorno | B5.3 |
| 12 | poder-monarquia-y-critica-politica | B5.2 |
| 13 | sabiduria-y-vida-buena | B5.4 |
| 14 | sentido-y-finitud | B5.4 |
| 15 | ley-libertad-y-gracia | B5.1 |
| 16 | culto-verdadero-y-sacrificio | B5.6 |
| 17 | profecia-y-llamada | B5.5 |
| 18 | mujeres-y-liderazgo | B4 |
| 19 | reino-de-dios | B5.7 |
| 20 | mesias-y-esperanza-mesianica | B4 |
| 21 | resurreccion-y-vida-despues-de-la-muerte | B5.3 |
| 22 | espiritu-de-dios | B5.7 |
| 23 | oracion | B5.4 |
| 24 | violencia-guerra-y-paz | B5.2 |

---

## Revisión B3

Revisión-biblia · t-126e24 · 14-11-2026. Detalle y propuestas para DEC en `REVISION-PLAN.md`.

**Comprobado y correcto:** los 73 libros están en un lote y solo en uno (Rut en B4, 72 en B5); los 7 deuterocanónicos y las adiciones de Ester y Daniel, marcados; los 24 temas, completados cada uno por una sola tanda; 6 reels (1 + 5), uno por sección.

**Cambiado en estas fichas:**
1. **Anexos A y B**: ids, abreviaturas, capítulos, bloque y orden de los 73 libros, e ids de los 24 temas. Antes cada ejecutor los inventaba, y de ellos dependen los ficheros que reclaman las tandas. Normaliza «Núm/Mi» y fija Jl en 4 capítulos y Mal en 3.
2. **Temas sin solape ni trabajo doble**: la introducción de un tema se escribe con el recorrido de INVESTIGACION §3, no con lo ya escrito, así que la tanda indicada lo completa sin esperar a nadie. Fuera el «lo propone para completar» (ambiguo), la reescritura de Mesías en B5.5 y el «temas que queden» de B5.8. Nueva **B5.9 · Cierre de temas** (umbral ≥ 3/≥ 2 y relectura de las 24 introducciones).
3. **Borradores del piloto** (Gn 1, Is 53, 1 Cor 14) con ruta fija `borradores/ensenanzas/` y tanda que los retoma: no se escriben dos veces.
4. **Pluralidad**: Gn 3,15 y 2 Sm 7 con la lectura judía al lado; arqueología con más de dos posturas; Santiago y Pablo sin dar por hecho el conflicto; el reel de Rut atribuye la réplica a Esdras-Nehemías (es [D]).
5. **Criterios comprobables**: el informe de cada tanda lleva tablas [D] → campo, fuente → dónde se comprobó y cita → dónde se cotejó. Aviso sobre nombres y capítulos de Torres Amat (Vulgata) para el cotejo. Grep de deuterocanónicos tolerante a espacios.
6. **Hueco del modelo que prueba el piloto** (B4 paso 7): dónde van las lecturas académicas no confesionales (Trible, Gutiérrez, Levine) y las dos protestantes. Por defecto, dentro de `critica.texto` y en una sola entrada `protestante`; si no basta, se cambia DEC.

**Preguntas para el humano (no bloquean B4):**
1. ¿Las lecturas feminista, literaria o de la liberación (Trible, Gutiérrez) merecen una capa visible propia, o basta con nombrarlas dentro de la crítica? Afecta al schema de enseñanza.
2. Si en B5.9 un tema no llega a 3 enseñanzas de 2 libros (candidatos: imagen de Dios, espíritu de Dios), ¿se fusiona, se recorta o se deja con menos?
