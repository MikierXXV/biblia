# Revisión del plan (B3 · t-126e24)

Revisión-biblia · 14-11-2026. Revisa `FICHAS.md` contra `DECISIONES.md` (DEC) e `investigacion/INVESTIGACION.md`.

## 1. Ya aplicado en FICHAS.md

Los cambios cuyo arreglo estaba claro ya están hechos en `FICHAS.md`. La lista está en su sección final **«Revisión B3»**, y hay dos anexos nuevos: A (los 73 libros) y B (los 24 temas). Quien hizo B2 no tiene que reaplicarlos, solo leerlos.

## 2. Propuestas para DEC (las decide quien lleva DEC; no son erratas, así que no las he tocado)

| # | DEC | Problema | Propuesta |
|---|---|---|---|
| R1 | §5.4 `lecturas.tradicion` | El enum (judia, catolica, ortodoxa, protestante, comun) no tiene sitio para las lecturas académicas no confesionales que la propia investigación usa: feminista o literaria (Trible, Rut y Jonás), de la liberación (Gutiérrez, Job) o judía del NT (Levine). Tampoco para dos lecturas protestantes que difieren, que §3 sí prevé. | Hasta el piloto, por defecto: las académicas van en `critica.texto`, atribuidas, y las protestantes van juntas en una sola entrada (FICHAS B4 paso 7). Tras el piloto, si se ve forzado, hay dos opciones: añadir `academica` al enum (texto que nombra la escuela) o dejar que `protestante` se repita con un `matiz` (`evangelica` \| `liberal`). Depende de la pregunta 1 al humano. |
| R2 | §4 Numeración | Solo fija la numeración de Salmos, Ester y Daniel. Joel (3 o 4 capítulos) y Malaquías (3 o 4) también cambian entre Vulgata/Torres Amat y las Biblias actuales, igual que los nombres de libro en Torres Amat (1-4 Reyes, Paralipómenos, 1-2 Esdras). | Añadir una línea: «Capítulos y nombres: los de las Biblias católicas españolas actuales (Anexo A de FICHAS); `cita.referencia` en la de la fuente». |
| R3 | §11 B frases prohibidas | «mito» = 0 resultados choca con la crítica histórica, que usa «mito» como término de género («el mito babilónico del diluvio», Enuma Elish). | Mantener prohibido «los mitos de la Biblia» y cualquier «mito» en voz del sitio, pero permitirlo **atribuido** a la crítica o a otra obra. El grep de «mito» pasa a ser revisión a mano, no «= 0». |
| R4 | §10, reel del piloto | «crítica: respuesta a Esdras y Nehemías» resume como cerrado algo que la investigación marca **[D]** («quizá»). | Reescribir: «parte de la crítica lo lee como réplica a Esdras y Nehemías; otros lo datan en la monarquía». (En FICHAS B4 paso 18 ya se dice cómo tratarlo en el guion.) |
| R5 | §11 A, último punto | «Cada tema tiene ≥ 3 enseñanzas de 2 libros» no tiene responsable antes de B6. | Remitir a la nueva B5.9 de FICHAS (cierre de temas). |
| R6 | §5.1 | «24 temas (+ 4 posibles)»: nadie decide si se crean los 4. | Decir «24; los 4 posibles quedan fuera de esta fase» (como ya aplica FICHAS B4 paso 11). |

## 3. Comprobaciones hechas (sin cambios)

- **Cobertura:** B4 con Rut + B5.1 5 + B5.2 6 + B5.3 9 + B5.4 7 + B5.5 6 + B5.6 12 + B5.7 5 + B5.8 22 = 73, ningún libro repetido ni olvidado. Coincide con los recuentos por fichero de INVESTIGACION §1 (5 + 16 + 7 + 18 + 27).
- **Deuterocanónicos:** los 7 de DEC §2 están en B5.3 (Tob, Jdt, 1-2 Mac), B5.4 (Sab, Sir) y B5.5 (Bar), y las tandas los marcan en negrita. Las adiciones de Est y Dn están en B5.3 y B5.5.
- **Temas:** cada uno de los 24 se completa en una sola tanda. El único solape era Mesías (B4 + «revisar» en B5.5), y ya está resuelto.
- **Reels:** 6, uno por sección. El de Históricos va en B5.3, no en B5.2, y está bien porque es el de los deuterocanónicos.
- **Paralelo:** la regla de reclamar `temas.json` basta. Las enseñanzas llevan los enlaces a temas en sus propios ficheros, que no se comparten entre tandas, salvo en B5.9, que va sola.

## 4. Preguntas para el humano

Las mismas dos de FICHAS «Revisión B3»: (1) si las lecturas académicas no confesionales tienen capa propia y (2) qué hacer con un tema que no llegue al umbral.
