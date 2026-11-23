# Informe del piloto (B4) · estado a 15-11-2026

Estado: **parcial**. Contenido, modelo y código hechos y compilados. Falta todo lo que necesita RAM (navegador, reel con voz y render, auditor visual): hay ~0,66 GB libres y el umbral es 1,5 GB.

## Puntos de DEC §11
| Punto | Estado |
|---|---|
| 73 libros, 7 deuterocanónicos, 5 secciones, 24 temas | ✓ (validado) |
| Rut completo con 5 enseñanzas, tres capas | ✓ |
| 3 temas completos enlazados desde Rut | ✓ |
| `validar` sin errores; avisos solo 72 libros / 21 temas | ✓ |
| `tsc --noEmit`, `build` | ✓ (por el subagente de interfaz, antes de los últimos retoques de contenido) |
| Revisión de contenido (revisor-de-contenido) | ✓ pasada; 12 problemas altos/medios, **los de Rut y los temas están corregidos**; los de los 3 borradores **no** (ver abajo) |
| Frases prohibidas (§11 B) | ✓ 0 resultados; «mito» no aparece |
| Mapa del canon, dataciones, matriz | ◻ compiladas, **no vistas en navegador** |
| auditor-visual (capturar + auditar) | ✗ pendiente (RAM) |
| Reel Rut: guion + fuentes | ✓ escritos |
| Reel Rut: voz, escena, render, importación | ✗ pendiente (RAM y cuota de voz) |

## Pendiente en borradores (no tocados, son de B3)
- Gn 1: «no explica cómo, sino quién y para qué» está con la voz del sitio; la pregunta de Rabí Isaac se atribuye a Rashi.
- Is 53: etiqueta `catolica` con texto «la tradición cristiana».
- 1 Cor 14,34-35: una sola fuente (Fitzmyer, que defiende la autoría paulina); añadir Fee; precisar testigos occidentales; «Pablo escribe» → «el texto dice».

## Qué cambiaría del modelo antes de B5
1. Un valor de tradición para «común a las cristianas» (hoy `comun` se entiende como judía+cristianas y engaña).
2. Campo propio para lecturas académicas/literarias (hoy van dentro de `critica.texto`).
3. `datacion.rango_tradicion` opcional: oficializarlo en DEC.
4. Decidir numeración de versículos (hebrea o Torres Amat) y las fuentes sin editorial/año (§11 C lo exige).
5. Regla de `validar`: ya no usa `--completo`; temas sin `exigir_uso`.
6. Mostrar «En qué Biblias» también en esbozos si se quiere coherencia.
7. Fuentes: no verificadas una a una (de memoria); comprobar antes de publicar. Torres Amat no verificado: opción B (parafrasear, sin cita).

## Preguntas abiertas para el humano
- Pregunta 1 de Revisión B3 (no resuelta por mí).
- Qué hacer con la RAM: el reel y el auditor necesitan ≥1,5 GB libres.

---
## Actualización 16-11-2026

**Revisión de contenido:** corregidos Rut, los 3 temas y los 3 borradores.

**Auditoría visual** (build ✓, auditar ✓: JS crítico 38,8 kB, LCP escritorio 576 ms, **LCP móvil 2276 ms de 2500 (poco margen)**, CLS ≤0,006, WebGL 0; capturar ✗ solo escritorio).
- ✓ arreglado: `capturar-sitio.mjs` buscaba `data-pieza` y el sitio emite `data-vis`.
- ✓ arreglado: cabecera móvil desbordaba (scroll horizontal a 360 px, marca en 3 líneas) → `flex-wrap` y marca sin salto en `app.css`. **Sin volver a capturar.**
- ✓ arreglado: recuadro de foco permanente en los h1.
- ✗ pendiente: mapa del canon: libros cortos sin rótulo (Abd, Flm, 2-3 Jn, Jds…, más en móvil); muestras de la leyenda «trama rayada»/«borde discontinuo» salen como bloques negros; texto de la leyenda recortado en móvil.
- ✗ pendiente: tabla de tradiciones del canon en móvil, columnas muy estrechas.
- Sin mirar: escritorio oscuro de canon/Rut/dataciones, móvil de Rut y tema, escritorio claro de tema y matriz.

**Reel de Rut:** renderizado (65,4 s). **Incumple DECISIONES §10 (45-60 s)**: hay que recortar ≥5,4 s. QA estricta ✗: Q1 («Shavuot» oído como «Shabot»), Q4 sin medir, Q5 (cajas <24 px y x>930 en transiciones), Q6 (brillo borde derecho), «extranjeras.» 100 ms. Rótulo «Sígueme para más Biblia» no está en guion-fuentes. atempo 1 frente a 1,1 de DECISIONES.

## Actualización final 16-11-2026
Reel recortado y renderizado: 52,6 s (✓ §10). QA estricta: ✗ Q1 (Shavuot/«Shabuot») y Q4 sin medir; el resto ✓. Sitio recapturado en escritorio y móvil sin errores; auditar ✓ (LCP móvil 1324 ms). Arreglos del canon, leyenda, tabla y cabecera comprobados en móvil. Reel aún no importado a #/l/rut. Hoja para el humano: qa/VISIONADO-PILOTO.md.
