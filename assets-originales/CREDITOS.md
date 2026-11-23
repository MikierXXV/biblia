# Créditos de los modelos originales

Cada modelo descargado se anota aquí **antes** de convertirlo. Casi todos vienen con licencia CC BY,
que obliga a atribuir y a **declarar las modificaciones**: el comando de conversión que aparece en
cada entrada es esa declaración, y por eso se copia literal.

Los originales no se versionan (ver `.gitignore`): pesan megas y el que sirve el sitio es el
convertido, que sí está en `public/modelos/`.

## Plantilla de entrada

### `nombre-del-modelo.glb`

- **Autor:** …
- **Fuente:** https://…
- **Licencia:** CC BY 4.0
- **Modificaciones:** texturas descartadas, malla diezmada de 51.000 a 25.000 triángulos con métrica
  de error, geometría cuantizada y comprimida con meshopt.
- **Comando:**
  ```
  node scripts/optimizar-modelo.mjs assets-originales/nombre-del-modelo.glb public/modelos/nombre.glb --sin-texturas --triangulos 25000
  ```

## Tipografías

- **Inter**, de Rasmus Andersson — https://github.com/rsms/inter
- **Newsreader**, de Production Type — https://github.com/productiontype/Newsreader

Ambas con licencia SIL Open Font License 1.1, cuyo texto acompaña a los ficheros en
`public/fuentes/`. Se sirven desde el propio sitio, en variable y con el subconjunto latino, y **no**
desde un tercero: una hoja de fuentes ajena añade dos conexiones antes de la primera letra y le
cuenta a alguien quién visita el sitio.
