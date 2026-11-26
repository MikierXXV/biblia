/**
 * La pieza 3D de la portada: un libro abierto que se mece, como emblema. No informa de nada.
 *
 * El HTML se pinta con el resto de la página y funciona solo, con una imagen fija. La escena
 * Three.js se descarga DESPUÉS del primer pintado y se pone encima. Sin WebGL o con «reducir
 * movimiento» no se descarga nada.
 */

import { temaActual } from '../../app/tema';
import { t } from '../../app/textos';
import { puedeHaber3D } from '../escena3d';

const base = import.meta.env.BASE_URL;
/** La imagen fija es una por tema: `<esto><tema>.webp`. La genera scripts/carteles-portada.mjs. */
const CARTEL = 'portada/libro-';

const escapar = (s: string): string =>
  s.replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c]!);

export function portada3dHtml(): string {
  return `
    <section class="p3d" data-estado="fijo" aria-labelledby="h-p3d">
      <h2 id="h-p3d" class="solo-lector">${escapar(t('portada3d.titulo'))}</h2>
      <div class="p3d-caja"><img class="p3d-cartel" src="${base}${CARTEL}${temaActual()}.webp" alt="" width="640" height="400" decoding="async" /></div>
      <p class="solo-lector">${escapar(t('portada3d.alternativa'))}</p>
    </section>`;
}

/** Espera a que la página esté pintada y ociosa: la escena nunca compite con el primer pintado. */
function despuesDePintar(): Promise<void> {
  return new Promise((listo) => {
    const ocioso = (): void => {
      if ('requestIdleCallback' in window) window.requestIdleCallback(() => listo(), { timeout: 1500 });
      else setTimeout(listo, 200);
    };
    if (document.readyState === 'complete') requestAnimationFrame(ocioso);
    else addEventListener('load', ocioso, { once: true });
  });
}

/** Colores de la escena, que salen de design/tokens.css. */
const token = (nombre: string): string => getComputedStyle(document.documentElement).getPropertyValue(nombre).trim();

export function montarPortada3d(seccion: HTMLElement | null): { destruir(): void } {
  if (!seccion) return { destruir() {} };
  const caja = seccion.querySelector<HTMLElement>('.p3d-caja')!;
  let escena: { destruir(): void } | null = null;
  let destruida = false;

  const quedarFija = (): void => {
    escena?.destruir();
    escena = null;
    seccion.dataset.estado = 'fijo';
  };

  async function arrancar(): Promise<void> {
    if (!puedeHaber3D()) return;
    seccion!.dataset.estado = 'cargando';
    await despuesDePintar();
    if (destruida) return;
    const { crearLibroAbierto } = await import('./libro3d');
    if (destruida) return;
    escena = await crearLibroAbierto({
      caja,
      etiqueta: t('portada3d.etiqueta'),
      alPerderContexto: quedarFija,
      modelo: `${base}modelos/libro-abierto.glb`,
      colores: { Beige: token('--p3d-papel'), DarkRed: token('--p3d-cubierta'), Golden: token('--p3d-detalle') },
      renglon: token('--p3d-detalle'),
    });
    // Se pudo cambiar de pantalla mientras se montaba: se libera en el acto.
    if (destruida) { escena?.destruir(); escena = null; return; }
    if (escena) seccion!.dataset.estado = '3d';
  }

  arrancar().catch((error) => {
    console.error(error);
    quedarFija();
  });

  return {
    destruir() {
      destruida = true;
      escena?.destruir();
      escena = null;
    },
  };
}
