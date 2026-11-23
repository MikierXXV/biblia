/**
 * Mecánica `mapa-canon`: los libros del canon como bloques, en orden canónico y agrupados por sección.
 *
 * QUÉ DICE. Cuántos libros hay, cómo se reparten y cuáles tiene cada tradición. El conmutador
 * «Ver el canon de…» ATENÚA los libros que la tradición elegida no tiene; no los quita, porque el
 * mapa es el mismo para todos y lo que cambia es qué parte de él reconoce cada cual (DEC §2, §7.2).
 *
 * ANCHO DE LOS BLOQUES: RAÍZ CUADRADA DE LOS CAPÍTULOS, con un mínimo. Con anchura estrictamente
 * proporcional, Salmos (150) mediría 150 veces lo que Abdías, Filemón o 2 Juan (1): estos últimos
 * quedarían en un píxel y no se podrían tocar, y Salmos se comería una fila entera. La raíz conserva
 * el orden de tamaños y comprime los extremos (Salmos 12,2 frente a 1); el mínimo, que sale del
 * objetivo táctil de lenguaje.ts, garantiza que todo bloque se pueda pulsar. Los bloques se reparten
 * en filas dentro de su sección, así que el alto crece en vez de estrechar los libros.
 *
 * COLOR: solo el acento de su sección. Las tradiciones NO tienen color (DEC §3, §7.1): el
 * conmutador cambia qué se atenúa, no de qué color es nada. Deuterocanónicos = trama rayada;
 * adiciones griegas = borde discontinuo. La atenuación se aplica a la FORMA, nunca al rótulo.
 */

import type { Libro, Seccion } from '../../app/contenido';
import {
  alAjustarEscala, alternativaLista, crearSvg, fijarAlto, nodo, paletaDe, t, temaActual,
  type Visualizacion,
} from '../lenguaje';

export interface ParametrosMapa {
  secciones: Seccion[];
  libros: Libro[];
  /** Enlace de cada bloque a su libro. */
  enlace: (libroId: string) => string;
}

type Tradicion = 'catolica' | 'ortodoxa' | 'judia' | 'protestante';
const TRADICIONES: Tradicion[] = ['catolica', 'ortodoxa', 'judia', 'protestante'];

/** Anchura de un bloque por capítulo-raíz, en unidades del viewBox (ver arriba). */
const ANCHO_POR_RAIZ = 18;
const HUECO = 4;
const MARGEN = 6;
const ANCHO = 700;

let contador = 0;

/**
 * Qué libros tiene cada canon.
 *  - católico y ortodoxo: todos los del sitio (73);
 *  - protestante: sin deuterocanónicos (ni adiciones griegas, que se avisan aparte);
 *  - judío: el Antiguo Testamento sin deuterocanónicos (Tanaj), y nada del Nuevo.
 */
function enCanon(tradicion: Tradicion, libro: Libro, seccion: Seccion | undefined): boolean {
  if (tradicion === 'protestante') return !libro.deuterocanonico;
  if (tradicion === 'judia') return seccion?.testamento === 'AT' && !libro.deuterocanonico;
  return true;
}

const sinAdiciones = (tradicion: Tradicion, libro: Libro): boolean =>
  Boolean(libro.adiciones_griegas?.length) && (tradicion === 'protestante' || tradicion === 'judia');

export function crearMapaCanon(contenedor: HTMLElement, parametros: ParametrosMapa): Visualizacion {
  const { secciones, libros, enlace } = parametros;
  const idUnico = `mapa-${++contador}`;
  let tradicion: Tradicion = 'catolica';
  let radio = 12;
  let tam = 15;
  const seccionDe = (libro: Libro) => secciones.find((s) => s.id === libro.seccion_id);

  /* ------------------------------------------------------------ conmutador -- */
  const conmutador = document.createElement('div');
  conmutador.className = 'mapa-conmutador';
  conmutador.setAttribute('role', 'group');
  conmutador.setAttribute('aria-label', t('vis.mapa.conmutador'));
  const rotuloConmutador = document.createElement('span');
  rotuloConmutador.className = 'mapa-conmutador-rotulo';
  rotuloConmutador.textContent = t('vis.mapa.conmutador');
  conmutador.append(rotuloConmutador);
  const botones = TRADICIONES.map((trad) => {
    const b = document.createElement('button');
    b.type = 'button';
    b.dataset.tradicion = trad;
    b.textContent = t(`vis.mapa.tradicion.${trad}`);
    b.setAttribute('aria-pressed', String(trad === tradicion));
    b.addEventListener('click', () => { tradicion = trad; actualizar(); });
    conmutador.append(b);
    return b;
  });
  contenedor.append(conmutador);

  const estado = document.createElement('p');
  estado.className = 'mapa-estado';
  estado.setAttribute('role', 'status');
  contenedor.append(estado);

  /* --------------------------------------------------------------- dibujo -- */
  // El alto real se calcula al colocar los bloques; este es solo el de partida.
  const svg = crearSvg(contenedor, t('vis.mapa.etiqueta'), ANCHO, 420);
  // role=img escondería los enlaces de dentro a los lectores de pantalla: aquí son el contenido.
  svg.setAttribute('role', 'group');
  svg.classList.add('mapa-svg');

  const pie = document.createElement('p');
  pie.className = 'mapa-pie';
  pie.setAttribute('aria-hidden', 'true');
  contenedor.append(pie);
  pie.textContent = t('vis.mapa.pista');

  const marcasDe = (l: Libro): string[] => [
    ...(l.deuterocanonico ? [t('insignias.deuterocanonico')] : []),
    ...(l.adiciones_griegas?.length ? [t('insignias.adiciones')] : []),
  ];

  function dibujar(): void {
    svg.replaceChildren();
    const defs = nodo('defs');
    for (const s of secciones) {
      const patron = nodo('pattern', { id: `${idUnico}-${s.id}`, width: 6, height: 6, patternUnits: 'userSpaceOnUse', patternTransform: 'rotate(45)' });
      patron.append(nodo('line', { x1: 0, y1: 0, x2: 0, y2: 6, stroke: paletaDe(s.id, temaActual()).acento, 'stroke-width': 2 }));
      defs.append(patron);
    }
    svg.append(defs);

    const alto = 2 * radio;
    const anchoMin = 2 * radio;
    let y = 4;
    for (const s of secciones) {
      const acento = paletaDe(s.id, temaActual()).acento;
      const rotulo = nodo('text', { x: MARGEN, y: y + tam, class: 'vis-rotulo vis-rotulo-enfasis' });
      rotulo.style.fill = acento;
      rotulo.textContent = s.nombre;
      svg.append(rotulo);
      y += tam * 1.6;

      let x = MARGEN;
      for (const libro of libros.filter((l) => l.seccion_id === s.id)) {
        // El rótulo manda sobre la proporción: ningún bloque es más estrecho que su abreviatura
        // (el rótulo mide 0,8 del cuerpo, igual que .mapa-abrev en CSS).
        const anchoRotulo = libro.abreviatura.length * 0.62 * tam * 0.8 + 8;
        const ancho = Math.max(anchoMin, anchoRotulo, ANCHO_POR_RAIZ * Math.sqrt(libro.capitulos));
        if (x > MARGEN && x + ancho > ANCHO - MARGEN) { x = MARGEN; y += alto + HUECO; }

        const a = nodo('a', { href: enlace(libro.id), class: 'mapa-bloque', 'data-id': libro.id });
        a.style.setProperty('--acento', acento);
        a.setAttribute('aria-label', `${t('vis.mapa.libro_aria').replace('{nombre}', libro.nombre).replace('{n}', String(libro.capitulos))}${marcasDe(libro).length ? `, ${marcasDe(libro).join(', ')}` : ''}`);
        if (libro.deuterocanonico) a.classList.add('deutero');
        if (libro.adiciones_griegas?.length) a.classList.add('adiciones');
        const forma = nodo('rect', { x, y, width: ancho, height: alto, rx: 3, class: 'forma' });
        a.append(forma);
        if (libro.deuterocanonico) {
          const trama = nodo('rect', { x, y, width: ancho, height: alto, rx: 3, class: 'trama', fill: `url(#${idUnico}-${s.id})` });
          a.append(trama);
        }
        // Todo bloque lleva su abreviatura (el ancho ya la garantiza); el nombre completo va en aria-label.
        const txt = nodo('text', { x: x + ancho / 2, y: y + alto / 2, class: 'vis-rotulo mapa-abrev', 'text-anchor': 'middle', 'dominant-baseline': 'central' });
        txt.textContent = libro.abreviatura;
        a.append(txt);
        const titulo = nodo('title');
        titulo.textContent = libro.nombre;
        a.append(titulo);

        const dicho = (): void => {
          const marcas = marcasDe(libro);
          pie.textContent = `${libro.nombre} · ${t('vis.mapa.capitulos').replace('{n}', String(libro.capitulos))}${marcas.length ? ` · ${marcas.join(' · ')}` : ''}`;
        };
        a.addEventListener('mouseenter', dicho);
        a.addEventListener('focus', dicho);
        const olvidar = (): void => { pie.textContent = t('vis.mapa.pista'); };
        a.addEventListener('mouseleave', olvidar);
        a.addEventListener('blur', olvidar);
        svg.append(a);
        x += ancho + HUECO;
      }
      y += alto + 14;
    }

    // Leyenda: la forma de cada marca, con su palabra al lado. Dos líneas, para que quepa a 360 px.
    const muestra = (cual: 'deutero' | 'adiciones', texto: string): void => {
      const g = nodo('g', { class: `mapa-leyenda ${cual}` });
      g.style.setProperty('--acento', paletaDe(secciones[0]!.id, temaActual()).neutro);
      const w = 2 * radio;
      const hMuestra = radio * 1.2;
      g.append(nodo('rect', { x: MARGEN, y, width: w, height: hMuestra, rx: 3, class: 'forma' }));
      if (cual === 'deutero') g.append(nodo('rect', { x: MARGEN, y, width: w, height: hMuestra, rx: 3, class: 'trama', fill: `url(#${idUnico}-leyenda)` }));
      // El texto SVG no salta de línea solo: se parte por palabras según el ancho que queda.
      const xTexto = MARGEN + w + 8;
      const maxCaracteres = Math.max(8, Math.floor((ANCHO - MARGEN - xTexto) / (0.56 * tam)));
      const lineas: string[] = [];
      let actual = '';
      for (const palabra of texto.split(/\s+/)) {
        if (actual && (actual + ' ' + palabra).length > maxCaracteres) { lineas.push(actual); actual = palabra; }
        else actual = actual ? `${actual} ${palabra}` : palabra;
      }
      if (actual) lineas.push(actual);
      const interlineado = tam * 1.3;
      const altoTexto = lineas.length * interlineado;
      const altoFila = Math.max(radio * 1.2, altoTexto);
      const txt = nodo('text', { x: xTexto, y, class: 'vis-rotulo', 'dominant-baseline': 'central' });
      lineas.forEach((linea, i) => {
        const ts = nodo('tspan', { x: xTexto, y: y + altoFila / 2 - altoTexto / 2 + interlineado * (i + 0.5) });
        ts.textContent = linea;
        txt.append(ts);
      });
      g.append(txt);
      svg.append(g);
      y += altoFila + 6;
    };
    const patronLeyenda = nodo('pattern', { id: `${idUnico}-leyenda`, width: 6, height: 6, patternUnits: 'userSpaceOnUse', patternTransform: 'rotate(45)' });
    patronLeyenda.append(nodo('line', { x1: 0, y1: 0, x2: 0, y2: 6, stroke: paletaDe(secciones[0]!.id, temaActual()).neutro, 'stroke-width': 2 }));
    defs.append(patronLeyenda);
    muestra('deutero', t('vis.mapa.leyenda_deuterocanonico'));
    muestra('adiciones', t('vis.mapa.leyenda_adiciones'));

    fijarAlto(svg, y + 2);
    actualizar();
  }

  /* ------------------------------------------- alternativa textual (lista) -- */
  const lista = alternativaLista(contenedor, t('vis.mapa.lista'));
  const items = new Map<string, HTMLLIElement>();
  for (const s of secciones) {
    const cabeza = document.createElement('li');
    cabeza.className = 'vis-lista-seccion';
    cabeza.textContent = s.nombre;
    const sub = document.createElement('ul');
    for (const libro of libros.filter((l) => l.seccion_id === s.id)) {
      const li = document.createElement('li');
      const a = document.createElement('a');
      a.href = enlace(libro.id);
      a.textContent = libro.nombre;
      li.append(a);
      const marcas = marcasDe(libro);
      if (marcas.length) li.append(` (${marcas.join(', ')})`);
      const fuera = document.createElement('span');
      fuera.className = 'vis-lista-fuera';
      li.append(fuera);
      sub.append(li);
      items.set(libro.id, li);
    }
    cabeza.append(sub);
    lista.append(cabeza);
  }

  /* ------------------------------------------------------------ actualizar -- */
  function actualizar(): void {
    let dentro = 0;
    let faltanAdiciones = false;
    for (const libro of libros) {
      const esta = enCanon(tradicion, libro, seccionDe(libro));
      if (esta) dentro += 1;
      if (esta && sinAdiciones(tradicion, libro)) faltanAdiciones = true;
      svg.querySelector<SVGElement>(`.mapa-bloque[data-id="${libro.id}"]`)?.setAttribute('data-fuera', esta ? 'no' : 'si');
      const fuera = items.get(libro.id)?.querySelector('.vis-lista-fuera');
      if (fuera) fuera.textContent = esta ? '' : ` · ${t('vis.mapa.no_figura')}`;
    }
    botones.forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.tradicion === tradicion)));
    const nombre = t(`vis.mapa.tradicion.${tradicion}`);
    estado.textContent = dentro === libros.length
      ? t('vis.mapa.estado_todos').replace('{tradicion}', nombre).replace('{n}', String(dentro))
      : t('vis.mapa.estado').replace('{tradicion}', nombre).replace('{n}', String(dentro)).replace('{fuera}', String(libros.length - dentro));
    if (faltanAdiciones) estado.textContent += ` ${t('vis.mapa.sin_adiciones')}`;
  }

  // Cada cambio de escala (ancho de pantalla) recoloca: el mínimo táctil y el rótulo se miden en píxeles.
  const baja = alAjustarEscala(svg, (e) => {
    if (Math.abs(e.radioTactil - radio) < 0.5 && Math.abs(e.tamRotulo - tam) < 0.5) return;
    radio = e.radioTactil;
    tam = e.tamRotulo;
    dibujar();
  });
  dibujar();

  return {
    destruir() {
      baja();
      contenedor.replaceChildren();
    },
  };
}
