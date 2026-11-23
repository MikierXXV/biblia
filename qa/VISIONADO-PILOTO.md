# Hoja de visionado del piloto Biblia (B4) · 16-11-2026

Lo que hay que mirar y escuchar antes de dar paso a B5. El sitio se ve con `npm run build && npx vite preview --port 4173` (o las capturas ya hechas en `capturas/`).

## 1. El reel · «Rut, la extranjera» (52,6 s)
`C:\Users\migue\videos-cortos\reel\reels\rut-la-extranjera\salida\rut-la-extranjera.mp4`
Hoja de fotogramas: `…\salida\rut-la-extranjera-fotogramas.png`.

**Escuchar:**
- La frase de Shavuot («Por eso se lee en Shavuot, la fiesta de las Semanas»): va pegada a la anterior y Whisper la oye «Shabuot». Hay que decidir a oído si vale.
- El ritmo (voz a atempo 0,95, no 1,1 de DECISIONES: con 1,1 era demasiado rápida).
- Que la réplica a Esdras y Nehemías suena a hipótesis atribuida («para buena parte de la crítica, quizá…») y que se nombra la otra datación; que el cierre no da veredicto.

**Estado de la QA estricta:** pasan formato, sonoridad (−14 LUFS), pico, subtítulos, alineado, Q2, Q3, Q5, Q6. Fallan Q1 (lo de Shavuot) y Q4 (sin medir). No está aprobado hasta que el humano lo escuche.
**No importado al sitio todavía:** el reel no aparece en `#/l/rut` (falta `content/reels.json` y copiar el mp4 a `public/reels/`). Se hace tras tu OK.
Pendiente de `guion-fuentes.md`: comprobar ediciones y años de las obras y el midrás Rut Rabá. CTA «Sígueme para más Biblia» adaptado de la skill.

## 2. El sitio (capturas en `C:\Users\migue\biblia\capturas\`)
Mirar, en claro/oscuro y móvil:
- `#/` portada · `#/canon` (mapa del canon: rótulos, leyenda, tabla de tradiciones) · `#/l/rut` (la ficha completa: tres capas, línea de dataciones, 5 enseñanzas) · `#/t/extranjero-y-hospitalidad` (tema con los tres enlaces de Rut) · matriz de temas.
- Medidas: build ✓, contraste 62/62 AA, auditar ✓ (JS crítico 39 kB, LCP escritorio 540 ms, LCP móvil 1324 ms, CLS ≤0,006, WebGL 0).
- No inspeccionado con detalle: Rut en escritorio oscuro y la sección de dataciones. Míralas tú.

## 3. Lo que hay que juzgar (contenido)
- Rut: ¿se siente equilibrado entre lecturas judía, cristiana y crítica? ¿La fecha en disputa y la réplica a Esdras-Nehemías van bien atribuidas?
- Los 3 temas (extranjero, mujeres, mesías) y los 3 borradores en `borradores/ensenanzas/`.
- Informe de revisión corregido en Rut/temas/borradores. Detalles en `qa/informe-piloto.md` («Qué cambiaría del modelo antes de B5»).

## 4. Preguntas para el humano
1. Pregunta 1 de «Revisión B3» (FICHAS.md) y pregunta 2 (tema bajo el umbral: no afecta al piloto).
2. ¿Valor de tradición para «común a las cristianas»? ¿Campo propio para lecturas académicas? ¿Se oficializa `datacion.rango_tradicion`?
3. Numeración de versículos (hebrea o Torres Amat) y fuentes con editorial/año: ¿se exigen ya?
4. ¿Aprobáis el piloto para pasar a B5?
