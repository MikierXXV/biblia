/**
 * Mecánica `matriz-temas`: temas en filas, secciones en columnas, una celda marcada donde hay
 * enseñanzas ligadas al tema (DEC §7.2). Cada celda marcada enlaza a la página del tema.
 *
 * La marca es una FORMA llena con el número de enseñanzas dentro; la celda vacía es un punto
 * pequeño. El color de la sección refuerza, pero la diferencia marcada/vacía no depende de él.
 *
 * Las filas se alturan por el objetivo táctil y por las líneas del nombre del tema: a 360 px los
 * nombres largos pasan a dos líneas en vez de empujar las columnas fuera del dibujo.
 */

import type { Seccion, Tema } from '../../app/contenido';
import {
  alAjustarEscala, alternativaLista, crearSvg, fijarAlto, nodo, paletaDe, resolver, t, temaActual,
  type Visualizacion,
} from '../lenguaje';

export interface ParametrosMatriz {
  temas: Tema[];
  secciones: Seccion[];
  /** celdas[tema][seccion] = número de enseñanzas; `libros[tema]` = nombres de los libros. */
  celdas: Record<string, Record<string, number>>;
  libros: Record<string, string[]>;
  enlace: (temaId: string) => string;
}

const ANCHO = 700;

/** Parte un nombre en un máximo de dos líneas de `max` caracteres, por palabras. */
function partir(texto: string, max: number): string[] {
  if (texto.length <= max) return [texto];
  const palabras = texto.split(' ');
  const l1: string[] = [];
  while (palabras.length && (l1.join(' ') + ' ' + palabras[0]).trim().length <= max) l1.push(palabras.shift()!);
  const resto = palabras.join(' ');
  return [l1.join(' '), resto.length > max ? `${resto.slice(0, max - 1)}…` : resto].filter(Boolean);
}

export function crearMatrizTemas(contenedor: HTMLElement, p: ParametrosMatriz): Visualizacion {
  const svg = crearSvg(contenedor, t('vis.matriz.etiqueta'), ANCHO, 600);
  svg.setAttribute('role', 'group');
  let radio = 12;
  let tam = 15;
  let margen = 8;

  function dibujar(): void {
    svg.replaceChildren();
    const colAncho = Math.max(2 * radio + 6, 58);
    const colX0 = ANCHO - margen - colAncho * p.secciones.length;
    const etiquetaAncho = colX0 - margen - 4;
    // En móvil los nodos de 44 px dejan la columna de etiquetas en ~10 caracteres: «Misericordia» se
    // metía bajo la primera celda. Entonces la etiqueta va en su propia línea, a todo lo ancho, y los
    // nodos debajo.
    const apilado = Math.floor(etiquetaAncho / (0.56 * tam)) < 16;
    const maxCaracteres = apilado
      ? Math.floor((ANCHO - 2 * margen) / (0.56 * tam))
      : Math.max(12, Math.floor(etiquetaAncho / (0.56 * tam)));
    // Cabecera: los nombres cortos de las secciones, en vertical.
    const cabeceraAlto = Math.max(...p.secciones.map((s) => t(`vis.secciones_cortas.${s.id}`).length)) * 0.58 * tam + 10;

    p.secciones.forEach((s, c) => {
      const cx = colX0 + c * colAncho + colAncho / 2;
      const txt = nodo('text', {
        x: 0, y: 0, class: 'vis-rotulo vis-rotulo-enfasis',
        transform: `translate(${cx + tam * 0.35} ${cabeceraAlto - 6}) rotate(-90)`,
      });
      txt.style.fill = paletaDe(s.id, temaActual()).acento;
      txt.textContent = t(`vis.secciones_cortas.${s.id}`);
      svg.append(txt);
    });

    let y = cabeceraAlto + 4;
    p.temas.forEach((tema, n) => {
      const lineas = partir(tema.nombre, maxCaracteres);
      const altoEtiqueta = lineas.length * tam * 1.25 + 8;
      const altoNodos = 2 * radio + 4;
      const alto = apilado ? altoEtiqueta + altoNodos : Math.max(altoNodos, altoEtiqueta);
      // Centro vertical de la etiqueta y de los nodos.
      const yEtiqueta = apilado ? y + altoEtiqueta / 2 : y + alto / 2;
      const yNodos = apilado ? y + altoEtiqueta + altoNodos / 2 : y + alto / 2;
      if (n % 2 === 0) svg.append(nodo('rect', { x: 0, y, width: ANCHO, height: alto, class: 'mat-banda' }));

      const enlaceTema = nodo('a', { href: p.enlace(tema.id), class: 'mat-fila' });
      enlaceTema.setAttribute('aria-label', tema.nombre);
      // Área de toque: toda la fila de la etiqueta, no solo el texto (≥ 44 px en móvil, como los nodos).
      enlaceTema.append(nodo('rect', apilado
        ? { x: 0, y, width: ANCHO, height: Math.max(altoEtiqueta, altoNodos), fill: 'transparent' }
        : { x: 0, y, width: etiquetaAncho + 8, height: alto, fill: 'transparent' }));
      const txt = nodo('text', { x: margen, y: yEtiqueta - ((lineas.length - 1) * tam * 1.25) / 2, class: 'vis-rotulo', 'dominant-baseline': 'central' });
      lineas.forEach((linea, i) => {
        const ts = nodo('tspan', { x: margen, dy: i === 0 ? 0 : tam * 1.25 });
        ts.textContent = linea;
        txt.append(ts);
      });
      enlaceTema.append(txt);
      svg.append(enlaceTema);

      p.secciones.forEach((s, c) => {
        const cx = colX0 + c * colAncho + colAncho / 2;
        const cy = yNodos;
        const cuantas = p.celdas[tema.id]?.[s.id] ?? 0;
        if (!cuantas) {
          svg.append(nodo('circle', { cx, cy, r: 3, class: 'mat-vacia' }));
          return;
        }
        const a = nodo('a', { href: p.enlace(tema.id), class: 'mat-celda' });
        a.style.setProperty('--acento', paletaDe(s.id, temaActual()).acento);
        a.setAttribute('aria-label', t('vis.matriz.celda_aria').replace('{tema}', tema.nombre).replace('{seccion}', s.nombre).replace('{n}', String(cuantas)));
        a.append(nodo('rect', { x: cx - radio, y: cy - radio, width: 2 * radio, height: 2 * radio, rx: 4, class: 'forma' }));
        const num = nodo('text', { x: cx, y: cy, class: 'vis-rotulo mat-num', 'text-anchor': 'middle', 'dominant-baseline': 'central' });
        num.textContent = String(cuantas);
        a.append(num);
        svg.append(a);
      });
      y += alto;
    });
    fijarAlto(svg, y + 6);
  }

  const baja = alAjustarEscala(svg, (e) => {
    // Margen lateral de 16 px reales (no unidades del viewBox, que a 360 px valen ~0,47 px).
    const m = Math.max(8, 16 / e.escala);
    if (Math.abs(e.radioTactil - radio) < 0.5 && Math.abs(e.tamRotulo - tam) < 0.5 && Math.abs(m - margen) < 0.5) return;
    radio = e.radioTactil;
    tam = e.tamRotulo;
    margen = m;
    dibujar();
  });
  dibujar();

  resolver(contenedor, t('vis.matriz.resolucion'));

  // Alternativa textual: la lista de temas con sus libros.
  const lista = alternativaLista(contenedor, t('vis.matriz.lista'));
  for (const tema of p.temas) {
    const li = document.createElement('li');
    const a = document.createElement('a');
    a.href = p.enlace(tema.id);
    a.textContent = tema.nombre;
    li.append(a);
    const libros = p.libros[tema.id] ?? [];
    li.append(`: ${libros.length ? libros.join(', ') : t('vis.matriz.sin_libros')}`);
    lista.append(li);
  }

  return {
    destruir() {
      baja();
      contenedor.replaceChildren();
    },
  };
}
