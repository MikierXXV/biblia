# Cambios respecto a la plantilla

Lista de lo que este proyecto cambió en la plantilla (`C:/Users/migue/plantilla-sitio`) para que se pueda
devolver a ella lo que sea general y descartar lo que sea de Biblia.

## 1. `scripts/validar-contenido.mjs` (validador genérico, reglas en `content/reglas.json`)

1. **Referencia sobre campo lista.** Una regla de `referencias` acepta que `campo` sea un id o una
   lista de ids (`ensenanzas.temas`, `temas.relacionados`); cada elemento se comprueba y cuenta para
   `exigir_uso`.
2. **`cita_biblica`** `{coleccion, campo, max_palabras, traducciones}`: el campo es un objeto
   `{texto, referencia, traduccion}`; falla si el texto pasa de `max_palabras` o la traducción no está
   en la lista (aquí: 40 palabras, solo «Torres Amat»).
3. **`cobertura`** `[{coleccion, campo, valor, esperados?}]`: avisa con un solo resumen por colección
   («72 sin completar») y con `--estricto` falla si queda algo sin completar o hay menos que `esperados`.
4. **`completo_exige`** `[{coleccion, campo, valor, exige: [...]}]`: cuando `campo == valor`, la ficha
   debe traer los campos de `exige` (un libro `completo` exige presentación, autoría, datación, canon y
   fuentes; un esbozo puede omitirlos).
5. **`conteo_hijos`** `[{coleccion, hijos, campo_hijo, si?, min, max}]`: nº de hijos por padre (un libro
   completo tiene entre 3 y 6 enseñanzas).
6. **`minItems` / `maxItems`** soportados en el mini-validador de schemas.

## 2. Lo que cambié en la plantilla para la variante `app` de Biblia

- **Quitado:** favoritos (`src/app/favoritos.ts`, claves `favoritos.*` y estilos), escena 3D
  (`src/vis/escena3d.ts`), la mecánica `eje`, el módulo figura en la app (`movimientos/grupos/fichas`),
  los ejemplos de ejercicios y sus rutas en `presupuestos.json` (`rutas_3d` vacío, contextos WebGL 0).
- **Reescrito:** `src/app/contenido.ts`, `src/app/rutas.ts` (`#/s/…`, `#/l/…/n`, `#/t/…`, `#/canon`,
  `#/acerca`; filtros seccion, testamento, deuterocanonico, tema, estado), `src/main.ts`,
  `src/vis/registro.ts` (mapa-canon, dataciones, matriz-temas), `content/es/ui.json`.
- **Ampliado:** `src/vis/lenguaje.ts` con `crearSvg(..., altoPropio)`, `fijarAlto` y `alternativaLista`
  (lista desplegable como alternativa textual de una pieza). `design/tokens.json` y `tokens.css` con
  dos temas nuevos (papel cálido apagado / tinta azul-negra, sin dorados), serif de lectura y sans
  de interfaz; los enlaces y acciones van en tinta.
- **Acentos de sección:** `color_acento: {claro, oscuro}` en `secciones.json` y su schema (la plantilla
  tenía un solo `acento`); `check-contraste` pasa sin sugerencias.
- **`index.html`:** el script de tema sigue `prefers-color-scheme` si no hay preferencia guardada;
  titular y entradilla de portada propios.
- **Pendiente de decidir:** `three`/`@types/three` y los scripts de modelo siguen en `package.json` y
  `vite.config.ts` (`manualChunks`) aunque este sitio no los importa; no entran en el bundle.
