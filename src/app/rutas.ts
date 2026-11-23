/**
 * Rutas de la app, en el fragmento (`#/...`). DEC §5.7.
 *
 * POR QUÉ EN EL FRAGMENTO Y NO CON History API: esto se publica en GitHub Pages, que sirve ficheros
 * estáticos. Con rutas normales, `/l/rut` recargado o compartido da un 404 del propio GitHub. El
 * fragmento no llega al servidor: la URL siempre existe.
 *
 * El estado del catálogo (búsqueda y filtros) también va en la ruta, así un catálogo filtrado se
 * puede compartir y el botón de atrás deshace un filtro.
 *
 *   #/                      portada
 *   #/s/<seccion>           una sección
 *   #/l/<libro>[/<n>]       ficha de libro; n ancla a la enseñanza n
 *   #/temas                 índice de temas (y matriz)
 *   #/t/<tema>              un tema
 *   #/canon   #/acerca      páginas fijas
 */

export type Vista = 'portada' | 'seccion' | 'libro' | 'temas' | 'tema' | 'canon' | 'acerca';

export interface Ruta {
  vista: Vista;
  id?: string;
  /** Número de enseñanza al que anclar dentro de la ficha de libro. */
  n?: number;
  busqueda?: string;
  filtros: Record<string, string[]>;
}

/** Filtros del catálogo que viajan en la ruta. `deuterocanonico` vale `si`. */
export const CAMPOS_FILTRO = ['seccion', 'testamento', 'deuterocanonico', 'tema', 'estado'] as const;

export function rutaActual(): Ruta {
  const bruto = location.hash.replace(/^#\/?/, '');
  const [camino, consulta] = bruto.split('?');
  const parametros = new URLSearchParams(consulta ?? '');
  const filtros: Record<string, string[]> = {};
  for (const campo of CAMPOS_FILTRO) {
    const valor = parametros.get(campo);
    if (valor) filtros[campo] = valor.split(',').filter(Boolean);
  }
  const busqueda = parametros.get('q') ?? '';

  const partes = (camino ?? '').split('/').filter(Boolean).map(decodeURIComponent);
  const [v, id, n] = partes;
  if (v === 's' && id) return { vista: 'seccion', id, filtros, busqueda };
  if (v === 'l' && id) {
    const num = Number(n);
    return { vista: 'libro', id, n: Number.isInteger(num) && num > 0 ? num : undefined, filtros, busqueda };
  }
  if (v === 'temas') return { vista: 'temas', filtros, busqueda };
  if (v === 't' && id) return { vista: 'tema', id, filtros, busqueda };
  if (v === 'canon') return { vista: 'canon', filtros };
  if (v === 'acerca') return { vista: 'acerca', filtros };
  return { vista: 'portada', busqueda, filtros };
}

export function enlace(ruta: Partial<Ruta> & { vista: Vista }): string {
  const parametros = new URLSearchParams();
  if (ruta.busqueda) parametros.set('q', ruta.busqueda);
  for (const [campo, valores] of Object.entries(ruta.filtros ?? {})) {
    if (valores.length) parametros.set(campo, valores.join(','));
  }
  const consulta = parametros.toString();
  const e = encodeURIComponent;
  const camino = {
    portada: '',
    seccion: `s/${e(ruta.id ?? '')}`,
    libro: `l/${e(ruta.id ?? '')}${ruta.n ? `/${ruta.n}` : ''}`,
    temas: 'temas',
    tema: `t/${e(ruta.id ?? '')}`,
    canon: 'canon',
    acerca: 'acerca',
  }[ruta.vista];
  return `#/${camino}${consulta ? `?${consulta}` : ''}`;
}

/** Atajos para los enlaces cruzados, que se escriben en muchos sitios. */
export const enlaceLibro = (id: string, n?: number): string => enlace({ vista: 'libro', id, n });
export const enlaceSeccion = (id: string): string => enlace({ vista: 'seccion', id });
export const enlaceTema = (id: string): string => enlace({ vista: 'tema', id });

export function irA(ruta: Partial<Ruta> & { vista: Vista }): void {
  location.hash = enlace(ruta);
}

export function alCambiarRuta(fn: (ruta: Ruta) => void): void {
  addEventListener('hashchange', () => fn(rutaActual()));
}
