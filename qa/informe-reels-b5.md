# Informe B5.R · reels de sección

Cinco reels vertical 1080×1920 (divulgativo v2, modelo `rut-la-extranjera`), importados a 720×1280 con `scripts/importar-reels.mjs`. Todos ≤ 5 MB. `npm run validar`: verde (exit 0). `content/reels.json`: 6 reels (los 5 + Rut).

| Reel | Libro | Duración | MB importado | QA estricta |
|---|---|---|---|---|
| dos-relatos-de-la-creacion | genesis | 52,1 s | 2,8 | Q4 (aceptado); Q1 f8: whisper oye «Pues, el del jardín…» |
| job-la-pregunta-que-no-se-responde | job | 58,0 s | 3,2 | solo Q4 (aceptado) |
| los-libros-que-tu-biblia-quiza-no-tiene | tobias | 51,9 s | 2,8 | Q4 (aceptado); Q1 f4: whisper oye «bíbleas» por «Biblia» |
| un-isaias-o-tres | isaias | 49,8 s | 2,7 | solo Q4 (aceptado) |
| cuatro-evangelios-cuatro-retratos | mateo | 55,1 s | 3,0 | Q4 (aceptado); Q1 f10 (variación «los lee dentro del mundo…»); aviso de alineado: «suyo.» 43 ms (última palabra, falso aviso) |

Comprobados en los cinco: formato h264 1080×1920 30 fps, −14 LUFS, pico ≤ −1,5 dBTP, subtítulos en zona segura y sin dos líneas, Q2, Q3, Q5 (cajas), Q6 (bordes).

## Avisos
- **Q1 rojos (3 reels):** diferencias de transcripción de whisper sobre el audio; no confirmadas a oído. Conviene escuchar f4 de «libros» («bíbleas»).
- **Q4 sin medir:** aceptado por Sócrates (el piloto también lo tenía).
- **Voz:** Gemini Orus, una llamada por reel (5 en total entre ayer y hoy). Las tomas salieron lentas (~2,8 pal/s) y se aceleraron con `atempo` ×1,12 (Job ×1,25) sobre la toma cacheada, sin llamadas extra; originales en `trabajo/toma-original-gemini.wav.bak`. Ritmo final ~3,0–3,2 pal/s.
- **Revisión visual:** hojas de contacto revisadas por un subagente; arreglados textos pequeños (Job, Isaías) y cajas pegadas. Los huecos entre piezas son relevos del lenguaje v2.
- **Pluralidad (DEC §10, §11):** ninguna pieza da veredicto; lecturas en tono neutro; cada rótulo tiene su fuente en `guion-fuentes.md` de su reel.

## Dónde
`videos-cortos/reel/reels/<id>/` (guion, fuentes, escena.js, salida/); motor común `reel/escena/motor-biblia.js`; importados en `public/reels/`.
