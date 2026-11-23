# Informe B5.6 · Profetas menores

Tarea t-d23507. Los 12 profetas menores están en `completo`. Oseas, Joel y Amós ya lo estaban; en esta tanda se completan Abdías, Jonás, Miqueas, Nahúm, Habacuc, Sofonías, Ageo, Zacarías y Malaquías, con 3 enseñanzas cada uno (27 nuevas, 36 en total en los Doce). También pasan a `completo` 3 temas: `justicia-social-y-defensa-del-pobre`, `misericordia-y-compasion-de-dios` y `culto-verdadero-y-sacrificio`. No hay reel, ni build, ni navegador.

`npm run validar`: contenido válido (319 fichas), 62/62 en contraste AA y ningún texto en el código.

## 1. DEC §11 A-C

| Punto | Estado |
|---|---|
| A. Cobertura | 12/12 libros en `completo`, cada uno con 3 enseñanzas, `autoria`, `datacion` (con `rango`), `canon` y 2-3 `fuentes`. ✓ |
| A. Temas | justicia social: 26 enseñanzas de 21 libros; misericordia: 14 de 11; culto verdadero: 22 de 19. ✓ |
| B. Atribución y vetadas | Lo comprueba el validador: 0 errores. ✓ |
| B. Cada [D] como `discusion` | Jonás (historicidad), Miqueas 4-7 (datación, 3 posturas), Nahúm (ética del tono vengativo: Robertson frente a O'Brien, y Sweeney), Zacarías 9-14 (autoría y datación: Duhm, Hanson, Harrison), Malaquías (nombre o título; Mal 2,16 con Hugenberger, LXX/Vulgata, Glazier-McDonald y Petersen). Además: Abd 15-21 (Barton frente a Raabe), Miq 4,1-4 frente a Is 2 (Wolff frente a Wildberger), Hab 2,4 (Andersen, LXX y 1QpHab), Sof 3,14-20 (Ben Zvi frente a Robertson) y Ag 2,23 (frente a Rose). ✓ |
| B. AT leído por judíos y cristianos lado a lado | Miq 5,1 (Belén / Mt 2,6), Zac 9,9 (Sanedrín 98a / Mt 21,5), Mal 3,23-24 (copa de Elías / Juan Bautista), Hab 2,4 (Makkot 24a / Rom 1,17 y Lutero), Jonás (Yom Kipur / señal de Jonás). ✓ |
| B. Textos incómodos | La venganza en Nahúm, el odio a Edom en Abdías y el divorcio en Mal 2,16 están tratados. ✓ |
| C. Fuentes | Las atribuciones escritas de memoria las revisó el revisor de contenido. Las corregidas se ven en el §2. ⚠ Quedan sin cotejar en catálogo (para B5.V): Pesajim 7b-8a (Sof 1,12), Sof 3,17 en la liturgia judía, Ag 2,7 en plural en la tradición judía, Jerónimo sobre Ageo, la división 15a/16-21 de Barton, Ben Zvi y Mede. |
| C. Citas bíblicas | Opción B: ningún campo `cita` y la paráfrasis va sin comillas. ✓ |

## 2. Revisión editorial (revisor-de-contenido)

Una pasada: 6 ✗, 6 ⚠ y 7 menores, **todos corregidos**:
- Hugenberger sobre Mal 2,16 estaba mal atribuido; ahora el sujeto es el marido.
- La inscripción de la ONU es de Is 2,4, no de Miqueas.
- La «opción preferencial por los pobres» se data en Medellín y Puebla, no en el siglo XIX.
- La disputa de Nahúm no enfrentaba a nadie; ahora pone a O'Brien frente a Robertson.
- Abdías: se unificaron los versículos de Barton y Raabe sostiene la otra postura.
- Jonás: Sasson sale de la postura de ficción; entran Trible, Wolff y, enfrente, Stuart.

También se añadieron lecturas judías donde faltaban (el *pésher* de Nahúm 4Q169, Sof 1,12, Sof 3,17, Ag 2,7 y Ag 2,23) y `comun` dejó de usarse para lecturas solo cristianas. Se unificó la numeración de las visiones de Zacarías y se pasó de «rey niño» a «rey joven» (Josías).

No hubo segunda pasada completa del revisor. La verificación final es el validador, con 0 errores.

## 3. Pendiente (⚠, para B5.V)
- `ageo-zorobabel-sello`: la postura de la esperanza davídica sigue anónima («Buena parte de la crítica histórica»).
- Las verificaciones de fuentes del §1 C.
- `nombre` de Nahúm: estaba como «Nahún» y se corrigió a «Nahúm».
