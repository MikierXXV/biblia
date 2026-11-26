#!/usr/bin/env node
/**
 * Genera la imagen fija de la pieza 3D de la portada, en los dos temas:
 * public/portada/libro-<tema>.webp. Es lo que se ve mientras carga, sin WebGL y con «reducir
 * movimiento». Sale de la propia escena, así que hay que repetirlo al cambiar modelo, medidas o colores.
 *
 *   npm run build && npx vite preview --port 4173
 *   npm run carteles:portada        (URL_BASE=… si el puerto es otro)
 *   npm run build                   (para que las imágenes nuevas entren en dist/)
 */

import { mkdir, writeFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { chromium } from 'playwright';

const RAIZ = join(dirname(fileURLToPath(import.meta.url)), '..');
const BASE = process.env.URL_BASE ?? 'http://localhost:4173/';
const DESTINO = join(RAIZ, 'public', 'portada');
/** Ancho en píxeles de CSS de la caja; con densidad 2 sale una imagen de 640 px. */
const ANCHO = 320;

await mkdir(DESTINO, { recursive: true });
const navegador = await chromium.launch({ args: ['--use-angle=d3d11', '--enable-gpu', '--ignore-gpu-blocklist'] });
try {
  for (const tema of ['claro', 'oscuro']) {
    const contexto = await navegador.newContext({ viewport: { width: 1280, height: 900 }, deviceScaleFactor: 2 });
    const pagina = await contexto.newPage();
    await pagina.addInitScript((t) => localStorage.setItem('tema', t), tema);
    await pagina.goto(BASE, { waitUntil: 'networkidle', timeout: 60000 });
    await pagina.addStyleTag({ content: `.p3d-caja { width: ${ANCHO}px !important; }` });
    await pagina.waitForSelector('.p3d[data-estado="3d"]', { timeout: 30000 });
    await pagina.waitForTimeout(400);
    const url = await pagina.evaluate(() => {
      const detail = {};
      document.querySelector('.p3d-caja').dispatchEvent(new CustomEvent('p3d:foto', { detail }));
      return detail.url;
    });
    const datos = Buffer.from(url.split(',')[1], 'base64');
    await writeFile(join(DESTINO, `libro-${tema}.webp`), datos);
    console.log(`  libro-${tema}.webp  ${(datos.length / 1024).toFixed(0)} kB`);
    await contexto.close();
  }
} finally {
  await navegador.close();
}
