/**
 * Mecánica `dataciones`: dos barras sobre un mismo eje de tiempo, la datación de la tradición y la
 * de la crítica histórica, para ver de un vistazo dónde coinciden y dónde no (DEC §7.2).
 *
 * El trazo de la barra de la crítica es DISCONTINUO cuando el acuerdo es «en discusión»: la forma
 * lo dice aunque no se distinga el color. Las dos barras usan el acento de la sección y se
 * distinguen por su rótulo y su posición, no por un color por tradición (DEC §3).
 *
 * Alternativa textual: las frases de `datacion` del libro. Un libro sin `datacion` no monta esta
 * pieza (lo decide quien la llama).
 */

import { alAjustarEscala, crearSvg, nodo, paletaDe, resolver, alternativaTextual, t, temaActual, type Visualizacion } from '../lenguaje';

export interface ParametrosDataciones {
  seccionId: string;
  /** Datación de la crítica: [desde, hasta], negativos = a. C. */
  rango: [number, number];
  rangoTradicion?: [number, number];
  acuerdo: 'consenso' | 'discusion';
  /** Las frases de `datacion.tradicion` y `datacion.critica`, que son la alternativa textual. */
  frases: { tradicion: string; critica: string };
  /** Nombre del libro, para la etiqueta accesible. */
  libro: string;
}

const ANCHO = 700;
/* Más alto que la proporción única: dos filas con su nota y el eje no caben en 300 con rótulos de 15 px reales. */
const ALTO = 340;

/** «1000 a. C.», «90 d. C.». */
function anio(n: number): string {
  return n < 0 ? t('vis.dataciones.anio_ac').replace('{n}', String(-n)) : t('vis.dataciones.anio_dc').replace('{n}', String(n));
}

function rangoTexto(r: [number, number]): string {
  const [a, b] = r;
  // Si los dos son a. C. (o d. C.), la abreviatura va solo al final: «1000–400 a. C.».
  if ((a < 0) === (b < 0)) {
    return `${Math.abs(a)}–${anio(b)}`;
  }
  return `${anio(a)} – ${anio(b)}`;
}

/** Paso de las marcas del eje: el menor de 50/100/200/500/1000/2000 que deje a lo sumo `max` marcas. */
function paso(span: number, max: number): number {
  for (const p of [50, 100, 200, 500, 1000, 2000]) if (span / p <= max) return p;
  return 2000;
}

export function crearDataciones(contenedor: HTMLElement, p: ParametrosDataciones): Visualizacion {
  const svg = crearSvg(contenedor, t('vis.dataciones.etiqueta').replace('{libro}', p.libro), ANCHO, ALTO);
  const acento = paletaDe(p.seccionId, temaActual()).acento;
  let tam = 15;

  const todos = [...p.rango, ...(p.rangoTradicion ?? [])];
  const minimo = Math.min(...todos);
  const maximo = Math.max(...todos);
  const margen = Math.max((maximo - minimo) * 0.12, 20);
  const desde = minimo - margen;
  const hasta = maximo + margen;
  const izq = 24;
  const der = ANCHO - 24;
  const x = (anioN: number): number => izq + ((anioN - desde) / (hasta - desde)) * (der - izq);

  function dibujar(): void {
    svg.replaceChildren();
    const yEjeReal = ALTO - tam * 2.6;
    // Rejilla y marcas del eje. Cuántas caben lo decide el ancho del rótulo en pantalla.
    const eje = nodo('g', { class: 'dat-eje' });
    const maxMarcas = Math.max(2, Math.floor((der - izq) / (10 * 0.58 * tam * 1.2)));
    const pasoAnios = paso(hasta - desde, maxMarcas);
    for (let a = Math.ceil(desde / pasoAnios) * pasoAnios; a <= hasta; a += pasoAnios) {
      eje.append(nodo('line', { x1: x(a), y1: 20, x2: x(a), y2: yEjeReal, class: 'dat-rejilla' }));
      const txt = nodo('text', { x: Math.min(Math.max(x(a), izq + 40), der - 40), y: yEjeReal + tam * 1.5, class: 'vis-rotulo', 'text-anchor': 'middle' });
      txt.textContent = anio(a);
      eje.append(txt);
    }
    eje.append(nodo('line', { x1: izq, y1: yEjeReal, x2: der, y2: yEjeReal, class: 'dat-linea' }));
    svg.append(eje);

    const barra = (rango: [number, number], y: number, rotulo: string, discontinua: boolean, nota?: string): void => {
      const x1 = x(rango[0]);
      const x2 = x(rango[1]);
      const txt = nodo('text', { x: izq, y: y - 8, class: 'vis-rotulo vis-rotulo-enfasis' });
      txt.textContent = `${rotulo} · ${rangoTexto(rango)}`;
      svg.append(txt);
      const r = nodo('rect', {
        x: x1, y, width: Math.max(x2 - x1, 4), height: 30, rx: 4, class: 'dat-barra',
        'stroke-dasharray': discontinua ? '7 5' : 'none',
      });
      r.style.setProperty('--acento', acento);
      svg.append(r);
      if (nota) {
        const n = nodo('text', { x: izq, y: y + 30 + tam * 1.25, class: 'vis-rotulo' });
        n.textContent = nota;
        svg.append(n);
      }
    };

    const filaAlto = 30 + tam * 2.9;
    const y0 = tam * 1.4 + 8;
    if (p.rangoTradicion) barra(p.rangoTradicion, y0, t('vis.dataciones.fila_tradicion'), false);
    barra(p.rango, p.rangoTradicion ? y0 + filaAlto : y0 + 4, t('vis.dataciones.fila_critica'), p.acuerdo === 'discusion',
      p.acuerdo === 'discusion' ? t('insignias.discusion') : t('insignias.consenso'));
  }

  const baja = alAjustarEscala(svg, (e) => {
    if (Math.abs(e.tamRotulo - tam) < 0.5) return;
    tam = e.tamRotulo;
    dibujar();
  });
  dibujar();

  alternativaTextual(contenedor, `${t('vis.dataciones.fila_tradicion')}: ${p.frases.tradicion} ${t('vis.dataciones.fila_critica')}: ${p.frases.critica}`);

  // La resolución: qué se supone que se ha entendido.
  if (p.rangoTradicion) {
    const solapan = p.rangoTradicion[0] <= p.rango[1] && p.rango[0] <= p.rangoTradicion[1];
    resolver(contenedor, t(solapan ? 'vis.dataciones.resolucion_solapa' : 'vis.dataciones.resolucion_aparte'));
  } else {
    resolver(contenedor, t('vis.dataciones.resolucion_sin_tradicion'));
  }

  return {
    destruir() {
      baja();
      contenedor.replaceChildren();
    },
  };
}
