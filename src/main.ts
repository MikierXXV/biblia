/**
 * Biblia, libro a libro: portada con el mapa del canon, secciones, fichas de libro, temas, canon y
 * «Acerca de».
 *
 * Una sola página que se repinta al cambiar la ruta. No hay framework: es un catálogo de 73 fichas y
 * unas pocas páginas de lectura, y para eso el DOM basta. Dos reglas mandan:
 *
 *  1. **Todo lo visible sale de ui.json** (o del contenido JSON), nunca de un literal aquí; lo vigila
 *     `scripts/check-idiomas.mjs`.
 *  2. **El sitio describe quién lee qué, no dictamina** (DEC §3): las tres capas de cada enseñanza
 *     tienen el mismo peso, las tradiciones van por su rótulo y ninguna tiene color propio.
 *
 * Las visualizaciones (mapa del canon, dataciones, matriz de temas) son mecánicas SVG que se cargan
 * con import() dinámico desde src/vis/registro.ts: la portada no descarga más que lo que dibuja.
 */

import './estilos/sitio.css';
import './estilos/app.css';
import './estilos/portada3d.css';
import {
  ENSENANZAS, LIBROS, cargarEnsenanzas, ensenanzasListas, PAGINAS, SECCIONES, TEMAS, ensenanzasDeLibro, ensenanzasDeTema, libroPorId, librosDeSeccion,
  reelDe, seccionPorId, temaPorId, temasDeLibro, vecinosEnCanon,
  type Ensenanza, type Libro, type PaginaFija, type Postura, type TradicionLectura,
} from './app/contenido';
import {
  alCambiarRuta, enlace, enlaceLibro, enlaceSeccion, enlaceTema, irA, rutaActual, type Ruta,
} from './app/rutas';
import { alCambiarTema, cambiarTema, temaActual } from './app/tema';
import { t } from './app/textos';
import { registrarAcentos } from './vis/lenguaje';
import { montarPortada3d, portada3dHtml } from './vis/portada';
import { crearVisualizacion } from './vis/registro';

registrarAcentos(Object.fromEntries(SECCIONES.map((s) => [s.id, s.color_acento])));

const cabeceraEl = document.querySelector<HTMLElement>('#cabecera')!;
const portadaEl = document.querySelector<HTMLElement>('.portada')!;
const sitio = document.querySelector<HTMLElement>('#app')!;
const base = import.meta.env.BASE_URL;

/** Las visualizaciones vivas de la pantalla; se destruyen al repintar para no acumular oyentes. */
let vivas: Array<{ destruir(): void }> = [];

/* ------------------------------------------------------------------ utilidades -- */

const escapar = (s: string): string =>
  s.replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c]!);

/** Texto del contenido: se escapa y `*palabra*` pasa a cursiva (términos hebreos y griegos, DEC §6). */
const md = (s: string): string => escapar(s).replace(/\*([^*\n]+)\*/g, '<em>$1</em>');

/**
 * Texto en bloques (DEC §13.1 y §13.3): un `<p>` por línea en blanco, y las líneas que empiezan por
 * `1. ` o `- ` se pintan como lista numerada o con viñetas.
 */
function parrafos(s: string): string {
  const salida: string[] = [];
  for (const bloque of s.split(/\n{2,}/)) {
    let prosa: string[] = [];
    let lista: { tipo: 'ol' | 'ul'; items: string[] } | null = null;
    const cerrarProsa = () => { if (prosa.length) salida.push(`<p>${md(prosa.join(' '))}</p>`); prosa = []; };
    const cerrarLista = () => { if (lista) salida.push(`<${lista.tipo}>${lista.items.map((i) => `<li>${md(i)}</li>`).join('')}</${lista.tipo}>`); lista = null; };
    for (const linea of bloque.split('\n')) {
      const num = /^\d+\.\s+(.*)$/.exec(linea);
      const vin = /^-\s+(.*)$/.exec(linea);
      const item = num ?? vin;
      if (item) {
        cerrarProsa();
        const tipo = num ? 'ol' : 'ul';
        if (lista && lista.tipo !== tipo) cerrarLista();
        lista ??= { tipo, items: [] };
        lista.items.push(item[1] ?? '');
      } else {
        cerrarLista();
        prosa.push(linea);
      }
    }
    cerrarProsa();
    cerrarLista();
  }
  return salida.join('');
}

const plantilla = (texto: string, valores: Record<string, string | number>): string =>
  Object.entries(valores).reduce((acc, [k, v]) => acc.replaceAll(`{${k}}`, String(v)), texto);

const normalizar = (s: string): string => s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();

const acentoDe = (seccionId: string): string | undefined => seccionPorId(seccionId)?.color_acento[temaActual()];
const estiloAcento = (seccionId: string): string => (acentoDe(seccionId) ? `style="--acento: ${acentoDe(seccionId)}"` : '');

type Insignia = 'deuterocanonico' | 'adiciones' | 'consenso' | 'discusion' | 'abierta' | 'preparacion';

/**
 * Insignia: SIEMPRE texto + forma (la forma la dibuja el CSS según `data-tipo`); el color solo
 * refuerza. Las que necesitan explicación llevan además un `title`.
 */
function insignia(tipo: Insignia): string {
  const nota = tipo === 'deuterocanonico' || tipo === 'adiciones' ? ` title="${escapar(t(`insignias.${tipo}_nota`))}"` : '';
  return `<span class="ins" data-tipo="${tipo}"${nota}>${escapar(t(`insignias.${tipo}`))}</span>`;
}

const insigniasDeLibro = (l: Libro): string =>
  [
    l.deuterocanonico ? insignia('deuterocanonico') : '',
    l.adiciones_griegas?.length ? insignia('adiciones') : '',
    l.estado === 'esbozo' ? insignia('preparacion') : '',
  ].join('');

const insigniaAcuerdo = (a: 'consenso' | 'discusion'): string => insignia(a);

/** Monta una mecánica de src/vis/ en un hueco y la apunta para destruirla al cambiar de pantalla. */
async function montar(id: string, mecanica: string, parametros: unknown, hueco: HTMLElement | null): Promise<void> {
  if (!hueco) return;
  try {
    const v = await crearVisualizacion(id, { mecanica, parametros }, hueco);
    // Si mientras cargaba se cambió de pantalla, el hueco ya no está en el documento: se libera.
    if (!hueco.isConnected) v.destruir();
    else vivas.push(v);
  } catch (error) {
    console.error(error);
    hueco.textContent = t('vis.error');
  }
}

/** La alternativa textual de cada visualización viene en la propia pieza; el hueco solo la contiene. */
const hueco = (clave: string, extra = ''): string => `<div class="vis-hueco" data-vis="${clave}" ${extra}></div>`;

/* ------------------------------------------------------------------- catálogo -- */

/** Texto buscable de cada libro: nombre, abreviatura, resumen y títulos de sus enseñanzas. */
let BUSCABLE = new Map<string, string>();
const reconstruirBuscable = (): void => {
  BUSCABLE = new Map(
    LIBROS.map((l) => [
      l.id,
      normalizar([l.nombre, l.abreviatura, l.resumen, ...ensenanzasDeLibro(l.id).map((e) => e.titulo)].join(' ')),
    ]),
  );
};
reconstruirBuscable();

/* Las enseñanzas se descargan a demanda (no en la portada): hacen falta para buscar por título, para
   filtrar por tema y en las vistas de libro y de tema. */
const necesitaEnsenanzas = (ruta: Ruta): boolean =>
  ['libro', 'tema', 'temas'].includes(ruta.vista) || !!(ruta.busqueda ?? '').trim() || (ruta.filtros.tema ?? []).length > 0;

function cuandoListas(necesita: boolean, hacer: () => void): void {
  if (!necesita || ensenanzasListas()) { hacer(); return; }
  // Mientras llega el chunk: en frío (enlace directo a #/l/… o #/t/…) un aviso en el hueco; si ya hay
  // catálogo pintado, el recuento de resultados (role=status) dice que está cargando.
  sitio.setAttribute('aria-busy', 'true');
  const cuenta = sitio.querySelector<HTMLElement>('.barra-resultados>.cuenta');
  if (cuenta) cuenta.textContent = t('vis.cargando');
  else if (!sitio.firstElementChild) sitio.innerHTML = `<p class="pagina cargando" role="status">${escapar(t('vis.cargando'))}</p>`;
  cargarEnsenanzas()
    .then(() => { reconstruirBuscable(); hacer(); })
    .catch(() => {
      sitio.innerHTML = `<p class="pagina cargando" role="alert">${escapar(t('vis.error'))}</p>`;
      pintada = '';
    })
    .finally(() => sitio.removeAttribute('aria-busy'));
}

const VALORES: Record<string, (l: Libro) => string[]> = {
  seccion: (l) => [l.seccion_id],
  testamento: (l) => [seccionPorId(l.seccion_id)?.testamento ?? ''],
  deuterocanonico: (l) => (l.deuterocanonico ? ['si'] : []),
  tema: (l) => temasDeLibro(l.id),
  estado: (l) => [l.estado],
};

function coincide(l: Libro, ruta: Ruta, salvo?: string): boolean {
  const q = normalizar((ruta.busqueda ?? '').trim());
  if (q && !q.split(/\s+/).every((palabra) => BUSCABLE.get(l.id)?.includes(palabra))) return false;
  for (const [campo, valores] of Object.entries(ruta.filtros)) {
    if (campo === salvo || !valores.length) continue;
    if (!valores.some((v) => VALORES[campo]?.(l).includes(v))) return false;
  }
  return true;
}

/* Qué facetas hay, en qué orden y cómo se nombra cada valor. */
const FACETAS = [
  { campo: 'seccion', valores: () => SECCIONES.map((s) => s.id), nombre: (v: string) => seccionPorId(v)?.nombre ?? v, punto: true, buscable: false },
  { campo: 'testamento', valores: () => ['AT', 'NT'], nombre: (v: string) => t(`catalogo.testamento.${v}`), punto: false, buscable: false },
  { campo: 'deuterocanonico', valores: () => ['si'], nombre: () => t('catalogo.deuterocanonico.si'), punto: false, buscable: false },
  { campo: 'tema', valores: () => TEMAS.map((x) => x.id), nombre: (v: string) => temaPorId(v)?.nombre ?? v, punto: false, buscable: true },
  { campo: 'estado', valores: () => ['completo', 'esbozo'], nombre: (v: string) => t(`catalogo.estado.${v}`), punto: false, buscable: false },
];

const desplegadas = new Set<string>(['seccion']);
let panelAbierto = false;

function tarjeta(l: Libro): string {
  return `
    <li class="tarjeta" ${estiloAcento(l.seccion_id)}>
      <a href="${enlaceLibro(l.id)}">
        <span class="t-nombre">${escapar(l.nombre)}</span>
        <span class="t-meta">${escapar(plantilla(t('catalogo.capitulos'), { n: l.capitulos }))}</span>
        <span class="t-resumen">${escapar(l.resumen)}</span>
        ${insigniasDeLibro(l) ? `<span class="insignias">${insigniasDeLibro(l)}</span>` : ''}
      </a>
    </li>`;
}

function cuerpoCatalogo(ruta: Ruta): string {
  const lista = LIBROS.filter((l) => coincide(l, ruta));
  const puestos = Object.entries(ruta.filtros).flatMap(([campo, vs]) => vs.map((v) => [campo, v] as [string, string]));

  const cuantasCon = (campo: string, valor: string): number =>
    LIBROS.filter((l) => coincide(l, ruta, campo) && (VALORES[campo]?.(l) ?? []).includes(valor)).length;

  const faceta = (f: (typeof FACETAS)[number]): string => {
    const marcados = ruta.filtros[f.campo] ?? [];
    const opciones = f.valores().map((v) => {
      const n = cuantasCon(f.campo, v);
      const nombre = f.nombre(v);
      const acento = f.punto ? acentoDe(v) : undefined;
      return `<li><label data-vacia="${n ? 'no' : 'si'}" data-texto="${escapar(normalizar(nombre))}">
        <input type="checkbox" data-campo="${f.campo}" data-valor="${escapar(v)}" ${marcados.includes(v) ? 'checked' : ''} />
        ${acento ? `<span class="punto" style="--acento-chip: ${acento}"></span>` : ''}
        <span class="nombre">${escapar(nombre)}</span>
        <span class="cuantas">${n}</span>
      </label></li>`;
    }).join('');
    return `
      <details class="faceta" data-faceta="${f.campo}" ${desplegadas.has(f.campo) ? 'open' : ''}>
        <summary>${escapar(t(`catalogo.campo.${f.campo}`))}${marcados.length ? `<span class="contador">${marcados.length}</span>` : ''}</summary>
        ${f.buscable ? `<input class="buscar-faceta" type="search" data-filtra="${f.campo}" placeholder="${escapar(t('catalogo.buscar_en'))}" aria-label="${escapar(t('catalogo.buscar_en'))}" />` : ''}
        <ul class="opciones${f.valores().length > 8 ? ' larga' : ''}">${opciones}</ul>
      </details>`;
  };

  const bloques = SECCIONES.map((s) => {
    const libros = lista.filter((l) => l.seccion_id === s.id);
    if (!libros.length) return '';
    return `
      <section class="seccion-bloque" ${estiloAcento(s.id)} aria-labelledby="sec-${s.id}">
        <header>
          <h3 id="sec-${s.id}"><a href="${enlaceSeccion(s.id)}">${escapar(s.nombre)}</a></h3>
          <span class="cuenta">${escapar(plantilla(t('catalogo.libros'), { n: libros.length }))}</span>
        </header>
        <p class="sec-resumen">${escapar(s.resumen)}</p>
        <ul class="rejilla">${libros.map(tarjeta).join('')}</ul>
      </section>`;
  }).join('');

  return `
    <dialog class="panel" id="panel-filtros" aria-label="${escapar(t('catalogo.filtros'))}">
      <div class="panel-cabeza">
        <h2>${escapar(t('catalogo.filtros'))}</h2>
        <button type="button" class="boton plano" data-accion="cerrar-filtros" aria-label="${escapar(t('catalogo.cerrar'))}">
          <span class="icono" aria-hidden="true">✕</span>
        </button>
      </div>
      <div class="panel-grupos">${FACETAS.map(faceta).join('')}</div>
      <div class="panel-pie">
        <button type="button" class="boton principal" data-accion="cerrar-filtros">
          ${escapar(plantilla(t('catalogo.ver_resultados'), { n: lista.length }))}
        </button>
      </div>
    </dialog>
    <div class="resultados">
      <form class="buscador" role="search">
        <label class="oculto" for="q">${escapar(t('catalogo.buscar'))}</label>
        <input id="q" type="search" name="q" value="${escapar(ruta.busqueda ?? '')}" placeholder="${escapar(t('catalogo.buscar'))}" />
      </form>
      <div class="barra-resultados">
        <button type="button" class="boton abrir-filtros" data-accion="abrir-filtros">
          <span class="icono" aria-hidden="true">≡</span>${escapar(t('catalogo.filtrar'))}
          ${puestos.length ? `<span class="contador">${puestos.length}</span>` : ''}
        </button>
        <p class="cuenta" role="status">${escapar(plantilla(t('catalogo.resultados'), { n: lista.length }))}</p>
      </div>
      <div class="activos">
        ${puestos.map(([campo, valor]) => {
          const cual = FACETAS.find((x) => x.campo === campo);
          const nombre = cual ? cual.nombre(valor) : valor;
          return `<button type="button" class="quitar" data-campo="${campo}" data-valor="${escapar(valor)}"
                    aria-label="${escapar(plantilla(t('catalogo.quitar'), { valor: nombre }))}">
            ${escapar(nombre)}<span class="icono" aria-hidden="true">✕</span>
          </button>`;
        }).join('')}
        ${puestos.length || ruta.busqueda ? `<button type="button" class="boton plano" data-accion="limpiar">${escapar(t('catalogo.limpiar'))}</button>` : ''}
      </div>
      <div id="libros" tabindex="-1">
        ${lista.length ? bloques : `<div class="vacio"><p>${escapar(t('catalogo.sin_resultados'))}</p>
          <a class="boton" href="${enlace({ vista: 'portada', filtros: {} })}">${escapar(t('catalogo.limpiar'))}</a></div>`}
      </div>
    </div>`;
}

/** Repinta solo el catálogo (buscador, filtros y libros): el mapa del canon no se toca al teclear. */
function repintarCatalogo(ruta: Ruta): void {
  const reparto = sitio.querySelector<HTMLElement>('.reparto')!;
  reparto.innerHTML = cuerpoCatalogo(ruta);
  enlazarCatalogo(ruta, reparto);
  if (panelAbierto) abrirPanel();
}

function enlazarCatalogo(ruta: Ruta, reparto: HTMLElement): void {
  const buscador = reparto.querySelector<HTMLInputElement>('#q')!;
  let temporizador = 0;
  buscador.addEventListener('input', () => {
    // Se espera a que pare de teclear: cada pulsación cambia la ruta, y sin esto el historial se
    // llena de una entrada por letra.
    clearTimeout(temporizador);
    temporizador = window.setTimeout(() => {
      const donde = buscador.selectionStart;
      history.replaceState(null, '', enlace({ ...rutaActual(), busqueda: buscador.value }));
      cuandoListas(true, () => {
        repintarCatalogo(rutaActual());
        const nuevo = sitio.querySelector<HTMLInputElement>('#q')!;
        nuevo.focus();
        nuevo.setSelectionRange(donde ?? nuevo.value.length, donde ?? nuevo.value.length);
      });
    }, 250);
  });
  buscador.form?.addEventListener('submit', (e) => e.preventDefault());

  reparto.querySelectorAll<HTMLInputElement>('.opciones input').forEach((casilla) => {
    casilla.addEventListener('change', () => {
      const { campo, valor } = casilla.dataset as { campo: string; valor: string };
      const actuales = ruta.filtros[campo] ?? [];
      const siguientes = casilla.checked ? [...actuales, valor] : actuales.filter((v) => v !== valor);
      irA({ ...ruta, filtros: { ...ruta.filtros, [campo]: siguientes } });
    });
  });

  reparto.querySelectorAll<HTMLDetailsElement>('.faceta').forEach((det) => {
    det.addEventListener('toggle', () => {
      const campo = det.dataset.faceta!;
      if (det.open) desplegadas.add(campo);
      else desplegadas.delete(campo);
    });
  });

  // Buscar dentro de una faceta esconde opciones SIN repintar: cada letra no puede quitar el foco.
  reparto.querySelectorAll<HTMLInputElement>('.buscar-faceta').forEach((campo) => {
    campo.addEventListener('input', () => {
      const q = normalizar(campo.value.trim());
      campo.closest('.faceta')!.querySelectorAll<HTMLElement>('.opciones label').forEach((op) => {
        (op.parentElement as HTMLElement).hidden = q !== '' && !(op.dataset.texto ?? '').includes(q);
      });
    });
  });
}

const panelEl = (): HTMLDialogElement | null => sitio.querySelector<HTMLDialogElement>('#panel-filtros');

function abrirPanel(): void {
  const el = panelEl();
  // `showModal` sobre un diálogo ya abierto lanza una excepción; tras repintar el elemento es otro.
  if (el && !el.open) el.showModal();
  panelAbierto = true;
  // Los recuentos por tema salen de las enseñanzas: al abrir el panel se descargan y se repinta.
  if (!ensenanzasListas()) {
    cuandoListas(true, () => {
      if (sitio.querySelector('.reparto')) repintarCatalogo(rutaActual());
    });
  }
}

function cerrarPanel(): void {
  panelEl()?.close();
  panelAbierto = false;
}

/* --------------------------------------------------------------------- portada -- */

function pintarPortada(ruta: Ruta): void {
  ponerPortada(t('sitio.titular'), t('sitio.entradilla'));
  sitio.innerHTML = `
    <a class="saltar boton" href="#libros">${escapar(t('catalogo.saltar'))}</a>
    ${portada3dHtml()}
    <section class="mapa" aria-labelledby="h-mapa">
      <h2 id="h-mapa">${escapar(t('portada.mapa_titulo'))}</h2>
      <p class="intro">${escapar(t('portada.mapa_intro'))} <a href="${enlace({ vista: 'canon', filtros: {} })}">${escapar(t('portada.mapa_canon'))}</a></p>
      ${hueco('mapa')}
    </section>
    <section aria-labelledby="h-libros">
      <h2 id="h-libros">${escapar(t('portada.libros_titulo'))}</h2>
      <div class="reparto">${cuerpoCatalogo(ruta)}</div>
    </section>
    ${pie()}`;
  enlazarCatalogo(ruta, sitio.querySelector<HTMLElement>('.reparto')!);
  if (panelAbierto) abrirPanel();
  void montar('portada-mapa', 'mapa-canon', parametrosMapa(), sitio.querySelector<HTMLElement>('[data-vis="mapa"]'));
  vivas.push(montarPortada3d(sitio.querySelector<HTMLElement>('.p3d')));
}

const parametrosMapa = () => ({ secciones: SECCIONES, libros: LIBROS, enlace: (id: string) => enlaceLibro(id) });

/* ---------------------------------------------------------------------- sección -- */

function pintarSeccion(ruta: Ruta): void {
  const s = seccionPorId(ruta.id!);
  if (!s) { irA({ vista: 'portada', filtros: {} }); return; }
  portadaEl.hidden = true;
  const libros = librosDeSeccion(s.id);
  const completos = libros.filter((l) => l.estado === 'completo').length;
  titulo(s.nombre);
  sitio.innerHTML = `
    <article class="pagina" ${estiloAcento(s.id)}>
      <nav class="migas" aria-label="${escapar(t('ui.migas'))}"><a href="${enlace({ vista: 'portada', filtros: {} })}"><span class="icono" aria-hidden="true">←</span>${escapar(t('ficha.volver'))}</a></nav>
      <header class="cab-pagina">
        <p class="rotulo-seccion">${escapar(t(`catalogo.testamento.${s.testamento}`))}</p>
        <h1 id="titulo-pagina" tabindex="-1">${escapar(s.nombre)}</h1>
        <p class="entradilla">${escapar(s.resumen)}</p>
        <p class="meta-pagina">${escapar(plantilla(t('seccion.cuenta'), { libros: libros.length, completos }))}</p>
      </header>
      <ul class="rejilla">${libros.map(tarjeta).join('')}</ul>
    </article>
    ${pie()}`;
}

/* ------------------------------------------------------------------ ficha de libro -- */

const ROTULO_LECTURA: Record<TradicionLectura, string> = {
  judia: 'ficha.lectura.judia',
  catolica: 'ficha.lectura.catolica',
  ortodoxa: 'ficha.lectura.ortodoxa',
  protestante: 'ficha.lectura.protestante',
  comun: 'ficha.lectura.comun',
};

/** Caja de disputa (DEC §13.3): rótulo «En discusión», frase de entrada y posturas con quién las sostiene. */
function cajaDisputa(entrada: string, posturas: Postura[] | undefined): string {
  return `
        <div class="caja disputa" role="group" aria-label="${escapar(t('ficha.en_discusion'))}">
          <p class="caja-rotulo">${insigniaAcuerdo('discusion')}</p>
          ${entrada ? parrafos(entrada) : ""}
          ${posturas?.length ? `<ul class="posturas">${posturas.map((p) => `<li><strong>${md(p.quien)}.</strong> ${md(p.texto)}</li>`).join('')}</ul>` : ''}
        </div>`;
}

/** «Para recordar» (DEC §13.3): caja con una marca a la izquierda, al final del libro y del tema. */
function paraRecordar(items: string[], id: string): string {
  return `
      <section class="bloque caja recordar" aria-labelledby="${id}">
        <h2 id="${id}">${escapar(t("ficha.para_recordar"))}</h2>
        <ul>${items.map((i) => `<li>${md(i)}</li>`).join("")}</ul>
      </section>`;
}

/** Las capas no son tarjetas: cada una es una sección con su rótulo numerado (DEC §13.3). */
function capaHtml(e: Ensenanza, n: number, rotulo: string, cuerpo: string): string {
  return `
        <section class="capa" aria-labelledby="ens-${e.orden}-c${n}">
          <h4 id="ens-${e.orden}-c${n}"><span class="capa-n" aria-hidden="true">${n}</span>${escapar(rotulo)}</h4>
          ${cuerpo}
        </section>`;
}

function ensenanzaHtml(e: Ensenanza): string {
  const lecturas = e.lecturas.map((lec) => `
          <div class="lectura" data-tradicion="${lec.tradicion}">
            <h5>${escapar(t(ROTULO_LECTURA[lec.tradicion]))}</h5>
            ${parrafos(lec.texto)}
          </div>`).join('');
  const academicas = (e.academica ?? []).map((a) => `
          <div class="lectura" data-enfoque="${a.enfoque}">
            <h5>${escapar(t(`ficha.enfoque.${a.enfoque}`))} · ${escapar(a.autor)}</h5>
            ${parrafos(a.texto)}
          </div>`).join('');
  const fuentes = e.fuentes.map(fuenteHtml).join('');
  const disputa = e.critica.acuerdo === 'discusion';
  let n = 3;
  const capas = [
    capaHtml(e, 1, t('ficha.capa1'), `${parrafos(e.que_dice)}${e.cita ? `<blockquote class="cita"><p>${md(e.cita.texto)}</p>
            <footer>${escapar(e.cita.referencia)} · ${escapar(e.cita.traduccion)}</footer></blockquote>` : ''}`),
    capaHtml(e, 2, t('ficha.capa2'), lecturas),
    academicas ? capaHtml(e, n++, t('ficha.capa3'), academicas) : '',
    capaHtml(e, n, t('ficha.capa4'), disputa ? cajaDisputa(e.critica.texto, e.critica.posturas) : `<p class="rotulo-acuerdo">${insigniaAcuerdo(e.critica.acuerdo)}</p>${parrafos(e.critica.texto)}`),
  ].join('');
  return `
    <article class="ensenanza" id="ensenanza-${e.orden}" aria-labelledby="ens-${e.orden}-t">
      <header>
        <p class="ens-num" aria-hidden="true">${e.orden}</p>
        <div class="ens-cab">
          <p class="solo-lector">${escapar(plantilla(t('ficha.ensenanza_n'), { n: e.orden }))}</p>
          <h3 id="ens-${e.orden}-t" tabindex="-1">${md(e.titulo)}</h3>
          <p class="ens-pasaje">${escapar(e.pasaje)}</p>
        </div>
        ${e.abierta ? `<p class="aviso-abierta" role="note">${insignia('abierta')} <span>${escapar(t('ficha.abierta_aviso'))}</span></p>` : ''}
      </header>
      <div class="capas">${capas}
      </div>
      <footer class="ens-pie">
        <ul class="etiquetas" aria-label="${escapar(t('ficha.temas'))}">
          ${e.temas.map((id) => `<li><a class="etiqueta" href="${enlaceTema(id)}">${escapar(temaPorId(id)?.nombre ?? id)}</a></li>`).join('')}
        </ul>
        <details class="fuentes-ens"><summary>${escapar(plantilla(t('ficha.fuentes_n'), { n: e.fuentes.length }))}</summary><ul class="fuentes">${fuentes}</ul></details>
      </footer>
    </article>`;
}

function fuenteHtml(f: { titulo: string; autor: string; url?: string; tradicion: string }): string {
  const titulo = f.url ? `<a href="${escapar(f.url)}" rel="noreferrer">${escapar(f.titulo)}</a>` : escapar(f.titulo);
  return `<li>${titulo} · ${escapar(f.autor)} <span class="fuente-tradicion">(${escapar(t(`ficha.fuente_tradicion.${f.tradicion}`))})</span></li>`;
}

/** El bloque fijo «En qué Biblias está» (DEC §2). La católica se da por supuesta: «Canónico». */
function biblias(l: Libro): string {
  const catolica = [
    t('ficha.biblias.canonico'),
    l.deuterocanonico ? t('ficha.biblias.deuterocanonico') : '',
    l.adiciones_griegas?.length ? plantilla(t('ficha.biblias.adiciones'), { pasajes: l.adiciones_griegas.join('; ') }) : '',
  ].filter(Boolean).join(' ');
  const c = l.canon!;
  const filas: Array<[string, string]> = [
    [t('tradiciones.catolica'), catolica],
    [t('tradiciones.ortodoxa'), c.ortodoxa],
    [t('tradiciones.judia'), c.judia],
    [t('tradiciones.protestante'), c.protestante],
  ];
  return `
    <section class="bloque bloque-biblias" aria-labelledby="h-biblias">
      <h2 id="h-biblias">${escapar(t('ficha.biblias.titulo'))}</h2>
      <dl class="biblias">${filas.map(([k, v]) => `<div><dt>${escapar(k)}</dt><dd>${md(v)}</dd></div>`).join('')}</dl>
    </section>`;
}

function reelHtml(l: Libro): string {
  const r = reelDe({ libro: l.id });
  if (!r) return '';
  const lineas = Array.isArray(r.transcripcion) ? r.transcripcion : r.transcripcion ? [r.transcripcion] : [];
  return `
    <section class="bloque reel" aria-labelledby="h-reel">
      <h2 id="h-reel">${escapar(t('ficha.reel'))}</h2>
      <div class="reel-cols">
      <figure>
        <video controls preload="none" playsinline ${r.poster ? `poster="${escapar(base + r.poster)}"` : ''} src="${escapar(base + r.video)}"></video>
        <figcaption>${escapar(r.titulo)}</figcaption>
      </figure>
      <div class="reel-texto">
      ${r.fuentes ? `<p class="reel-fuentes"><strong>${escapar(t('ficha.reel_fuentes'))}</strong> ${escapar(r.fuentes)}</p>` : ''}
      ${lineas.length ? `<details class="transcripcion" id="transcripcion"><summary>${escapar(t('ficha.reel_transcripcion'))}</summary>
        ${lineas.map((x) => `<p>${escapar(x)}</p>`).join('')}</details>` : ''}
      </div>
      </div>
    </section>`;
}

function vecinosHtml(l: Libro): string {
  const { anterior, siguiente } = vecinosEnCanon(l.id);
  if (!anterior && !siguiente) return '';
  const lado = (x: Libro, flecha: string, clave: string) =>
    `<a class="boton" href="${enlaceLibro(x.id)}" rel="${clave}">
       <span class="icono" aria-hidden="true">${flecha}</span><span class="vecino-texto"><small>${escapar(t(`ficha.${clave}`))}</small>${escapar(x.nombre)}</span></a>`;
  return `<nav class="vecinos" aria-label="${escapar(t('ficha.vecinos'))}">
    ${anterior ? lado(anterior, '←', 'prev') : '<span></span>'}
    ${siguiente ? lado(siguiente, '→', 'next') : ''}
  </nav>`;
}

function pintarLibro(ruta: Ruta): void {
  const l = libroPorId(ruta.id!);
  if (!l) { irA({ vista: 'portada', filtros: {} }); return; }
  portadaEl.hidden = true;
  const s = seccionPorId(l.seccion_id)!;
  const ensenanzas = ensenanzasDeLibro(l.id);
  titulo(l.nombre);

  const cabecera = `
    <nav class="migas" aria-label="${escapar(t('ui.migas'))}"><a href="${enlaceSeccion(s.id)}"><span class="icono" aria-hidden="true">←</span>${escapar(s.nombre)}</a></nav>
    <header class="cab-pagina">
      <p class="rotulo-seccion">${escapar(s.nombre)} · ${escapar(plantilla(t('catalogo.capitulos'), { n: l.capitulos }))}</p>
      <h1 id="titulo-pagina" tabindex="-1">${escapar(l.nombre)}</h1>
      <p class="insignias">${insigniasDeLibro(l)}</p>
    </header>`;

  let cuerpo: string;
  if (l.estado === 'esbozo') {
    // Un esbozo muestra nombre, resumen y «En preparación». No se inventa nada más.
    cuerpo = `
      <p class="resumen-libro">${md(l.resumen)}</p>
      <p class="aviso-preparacion" role="note">${insignia('preparacion')} <span>${escapar(t('ficha.en_preparacion'))}</span></p>`;
  } else {
    const a = l.autoria!;
    const d = l.datacion!;
    const lista = l.estado === 'completo' ? ensenanzas : [];
    cuerpo = `
      <p class="resumen-libro">${md(l.resumen)}</p>
      ${lista.length ? `
      <details class="en-pagina" ${window.matchMedia('(min-width: 48rem)').matches ? 'open' : ''}>
        <summary>${escapar(t('ficha.en_esta_pagina'))}</summary>
        <ol>${lista.map((e) => `<li><a href="${enlaceLibro(l.id, e.orden)}">${md(e.titulo)}</a></li>`).join('')}</ol>
      </details>` : ''}
      <section class="bloque" aria-labelledby="h-presentacion">
        <h2 id="h-presentacion" class="solo-lector">${escapar(t('ficha.presentacion'))}</h2>
        <div class="lectura-larga">${parrafos(l.presentacion!)}</div>
      </section>
      <section class="bloque quien-cuando" aria-labelledby="h-autoria">
        <h2 id="h-autoria">${escapar(t('ficha.quien_cuando'))}</h2>
        <h3>${escapar(t('ficha.autoria'))}</h3>
        <dl class="dos-lecturas">
          <div><dt>${escapar(t('ficha.segun_tradicion'))}</dt><dd>${md(a.tradicion)}</dd></div>
          <div><dt>${escapar(t('ficha.segun_critica'))} ${insigniaAcuerdo(a.acuerdo)}</dt><dd>${md(a.critica)}</dd></div>
        </dl>
        <h3>${escapar(t('ficha.datacion'))}</h3>
        <dl class="dos-lecturas">
          <div><dt>${escapar(t('ficha.segun_tradicion'))}</dt><dd>${md(d.tradicion)}</dd></div>
          <div><dt>${escapar(t('ficha.segun_critica'))} ${d.acuerdo === 'discusion' ? '' : insigniaAcuerdo(d.acuerdo)}</dt><dd>${md(d.critica)}</dd></div>
        </dl>
        ${d.acuerdo === 'discusion' && d.posturas?.length ? cajaDisputa('', d.posturas) : ''}
      </section>
      <div class="bloque bloque-vis">${hueco('dataciones')}</div>
      ${ensenanzas.length ? `
      <section class="bloque ensenanzas" aria-labelledby="h-ensenanzas">
        <h2 id="h-ensenanzas" class="solo-lector">${escapar(t('ficha.ensenanzas'))}</h2>
        ${ensenanzas.map(ensenanzaHtml).join('')}
      </section>` : ''}
      ${l.para_recordar?.length ? paraRecordar(l.para_recordar, 'h-recordar') : ''}
      ${reelHtml(l)}
      ${biblias(l)}
      ${l.pasajes_clave?.length ? `
      <section class="bloque" aria-labelledby="h-pasajes">
        <h2 id="h-pasajes">${escapar(t('ficha.pasajes'))}</h2>
        <ul class="pasajes-clave">${l.pasajes_clave.map((p) => `<li><strong>${escapar(p.pasaje)}</strong> ${md(p.nota)}</li>`).join('')}</ul>
      </section>` : ''}
      ${l.fuentes?.length ? `
      <section class="bloque" aria-labelledby="h-fuentes">
        <h2 id="h-fuentes">${escapar(t('ficha.fuentes'))}</h2>
        <ul class="fuentes">${l.fuentes.slice(0, 3).map(fuenteHtml).join('')}</ul>
      </section>` : ''}`;
  }

  sitio.innerHTML = `<article class="pagina ficha" ${estiloAcento(s.id)}>${cabecera}${cuerpo}${vecinosHtml(l)}</article>${pie()}`;

  if (l.estado === 'completo' && l.datacion) {
    const d = l.datacion;
    void montar(`dataciones-${l.id}`, 'dataciones', {
      seccionId: l.seccion_id,
      rango: d.rango,
      rangoTradicion: d.rango_tradicion,
      acuerdo: d.acuerdo,
      frases: { tradicion: d.tradicion, critica: d.critica },
      libro: l.nombre,
    }, sitio.querySelector<HTMLElement>('[data-vis="dataciones"]'));
  }
}

/* ------------------------------------------------------------------------ temas -- */

/** Cuántas enseñanzas de cada sección cuelgan de cada tema, y los libros implicados. */
function datosMatriz() {
  const celdas: Record<string, Record<string, number>> = {};
  const libros: Record<string, string[]> = {};
  for (const e of ENSENANZAS) {
    const l = libroPorId(e.libro_id);
    if (!l) continue;
    for (const tema of e.temas) {
      celdas[tema] ??= {};
      celdas[tema][l.seccion_id] = (celdas[tema][l.seccion_id] ?? 0) + 1;
      libros[tema] ??= [];
      if (!libros[tema].includes(l.nombre)) libros[tema].push(l.nombre);
    }
  }
  return { celdas, libros };
}

function pintarTemas(): void {
  portadaEl.hidden = true;
  titulo(t('temas.titulo'));
  sitio.innerHTML = `
    <article class="pagina">
      <header class="cab-pagina">
        <h1 id="titulo-pagina" tabindex="-1">${escapar(t('temas.titulo'))}</h1>
        <p class="entradilla">${escapar(t('temas.entradilla'))}</p>
      </header>
      <section class="bloque" aria-labelledby="h-matriz">
        <h2 id="h-matriz">${escapar(t('temas.matriz_titulo'))}</h2>
        ${hueco('matriz')}
      </section>
      <section class="bloque" aria-labelledby="h-lista-temas">
        <h2 id="h-lista-temas">${escapar(t('temas.lista_titulo'))}</h2>
        <ul class="rejilla temas">
          ${TEMAS.map((x) => {
            const n = ensenanzasDeTema(x.id).length;
            return `<li class="tarjeta"><a href="${enlaceTema(x.id)}">
              <span class="t-nombre">${escapar(x.nombre)}</span>
              <span class="t-resumen">${escapar(x.resumen)}</span>
              <span class="insignias">${x.estado === 'esbozo' ? insignia('preparacion') : ''}<span class="t-meta">${escapar(plantilla(t(n === 1 ? 'temas.una_ensenanza' : 'temas.n_ensenanzas'), { n }))}</span></span>
            </a></li>`;
          }).join('')}
        </ul>
      </section>
    </article>
    ${pie()}`;
  const { celdas, libros } = datosMatriz();
  void montar('temas-matriz', 'matriz-temas', {
    temas: TEMAS, secciones: SECCIONES, celdas, libros, enlace: (id: string) => enlaceTema(id),
  }, sitio.querySelector<HTMLElement>('[data-vis="matriz"]'));
}

function pintarTema(ruta: Ruta): void {
  const tema = temaPorId(ruta.id!);
  if (!tema) { irA({ vista: 'temas', filtros: {} }); return; }
  portadaEl.hidden = true;
  titulo(tema.nombre);
  const ens = ensenanzasDeTema(tema.id);

  // Enseñanzas agrupadas por libro, en el orden canónico del libro (ya vienen ordenadas).
  const porLibro = new Map<string, Ensenanza[]>();
  for (const e of ens) porLibro.set(e.libro_id, [...(porLibro.get(e.libro_id) ?? []), e]);
  const grupos = [...porLibro.entries()].map(([libroId, lista]) => {
    const l = libroPorId(libroId)!;
    return `
      <div class="grupo-libro" ${estiloAcento(l.seccion_id)}>
        <h3><a href="${enlaceLibro(l.id)}">${escapar(l.nombre)}</a></h3>
        <ul>${lista.map((e) => `<li><a href="${enlaceLibro(l.id, e.orden)}">${md(e.titulo)}</a> <span class="ens-pasaje">${escapar(e.pasaje)}</span>${e.abierta ? ` ${insignia('abierta')}` : ''}</li>`).join('')}</ul>
      </div>`;
  }).join('');

  const relacionados = (tema.relacionados ?? []).map((id) => temaPorId(id)).filter(Boolean);
  const completo = tema.estado === 'completo';

  sitio.innerHTML = `
    <article class="pagina">
      <nav class="migas" aria-label="${escapar(t('ui.migas'))}"><a href="${enlace({ vista: 'temas', filtros: {} })}"><span class="icono" aria-hidden="true">←</span>${escapar(t('temas.titulo'))}</a></nav>
      <header class="cab-pagina">
        <h1 id="titulo-pagina" tabindex="-1">${escapar(tema.nombre)}</h1>
        ${completo ? '' : `<p class="insignias">${insignia('preparacion')}</p>`}
        <p class="entradilla">${md(tema.resumen)}</p>
      </header>
      ${completo && tema.introduccion ? `<section class="bloque" aria-labelledby="h-intro"><h2 id="h-intro">${escapar(t('tema.introduccion'))}</h2><div class="lectura-larga">${parrafos(tema.introduccion)}</div></section>` : ''}
      ${completo && tema.divergencias ? `<section class="bloque caja divergencias" aria-labelledby="h-div"><h2 id="h-div">${escapar(t('tema.divergencias'))}</h2>${parrafos(tema.divergencias)}</section>` : ''}
      ${completo && tema.para_recordar?.length ? paraRecordar(tema.para_recordar, 'h-recordar-tema') : ''}
      <section class="bloque" aria-labelledby="h-pasajes-tema">
        <h2 id="h-pasajes-tema">${escapar(t('tema.pasajes'))}</h2>
        <ul class="pasajes-lista">${tema.pasajes.map((p) => `<li>${escapar(p)}</li>`).join('')}</ul>
      </section>
      <section class="bloque" aria-labelledby="h-ens-tema">
        <h2 id="h-ens-tema">${escapar(t('tema.ensenanzas'))}</h2>
        ${grupos || `<p class="vacio-texto">${escapar(t('tema.sin_ensenanzas'))}</p>`}
      </section>
      ${completo ? '' : `<p class="aviso-preparacion" role="note">${insignia('preparacion')} <span>${escapar(t('tema.en_preparacion'))}</span></p>`}
      ${relacionados.length ? `<section class="bloque" aria-labelledby="h-rel"><h2 id="h-rel">${escapar(t('tema.relacionados'))}</h2>
        <ul class="etiquetas">${relacionados.map((r) => `<li><a class="etiqueta" href="${enlaceTema(r!.id)}">${escapar(r!.nombre)}</a></li>`).join('')}</ul></section>` : ''}
    </article>
    ${pie()}`;
}

/* ------------------------------------------------------------- canon y «Acerca de» -- */

function paginaFija(p: PaginaFija, conMapa: boolean): string {
  return `
    <article class="pagina">
      <header class="cab-pagina">
        <h1 id="titulo-pagina" tabindex="-1">${escapar(p.titulo)}</h1>
        <p class="entradilla">${md(p.entradilla)}</p>
      </header>
      ${conMapa ? `<section class="bloque" aria-labelledby="h-mapa-canon"><h2 id="h-mapa-canon">${escapar(t('portada.mapa_titulo'))}</h2>${hueco('mapa')}</section>` : ''}
      ${p.secciones.map((s, n) => `
        <section class="bloque" aria-labelledby="h-p-${n}">
          <h2 id="h-p-${n}">${escapar(s.titulo)}</h2>
          ${s.parrafos.map((x) => `<p class="lectura-larga">${md(x)}</p>`).join('')}
        </section>`).join('')}
      ${p.tabla ? `
        <section class="bloque" aria-labelledby="h-tabla">
          <h2 id="h-tabla">${escapar(p.tabla.titulo)}</h2>
          <div class="tabla-caja" tabindex="0" role="region" aria-labelledby="h-tabla">
            <table>
              <thead><tr>${p.tabla.columnas.map((c) => `<th scope="col">${escapar(c)}</th>`).join('')}</tr></thead>
              <tbody>${p.tabla.filas.map((f) => `<tr>${f.map((c, i) => (i === 0 ? `<th scope="row">${md(c)}</th>` : `<td>${md(c)}</td>`)).join('')}</tr>`).join('')}</tbody>
            </table>
          </div>
        </section>` : ''}
    </article>
    ${pie()}`;
}

function pintarCanon(): void {
  portadaEl.hidden = true;
  titulo(PAGINAS.canon.titulo);
  sitio.innerHTML = paginaFija(PAGINAS.canon, true);
  void montar('canon-mapa', 'mapa-canon', parametrosMapa(), sitio.querySelector<HTMLElement>('[data-vis="mapa"]'));
}

function pintarAcerca(): void {
  portadaEl.hidden = true;
  titulo(PAGINAS.acerca.titulo);
  sitio.innerHTML = paginaFija(PAGINAS.acerca, false);
}

/* ------------------------------------------------------------------------ común -- */

const pie = (): string => `
  <footer class="pie">
    <p class="legal">
      <span>${escapar(plantilla(t('pie.derechos'), { anio: new Date().getFullYear() }))}</span>
      <a href="${enlace({ vista: 'acerca', filtros: {} })}">${escapar(t('pie.acerca'))}</a>
      <span class="creditos">${escapar(t('pie.creditos'))}</span>
    </p>
  </footer>`;

function cabecera(ruta: Ruta): string {
  const actual = (v: string) => (ruta.vista === v ? 'aria-current="page"' : '');
  return `
    <header class="barra">
      <div>
        <a class="marca" href="${enlace({ vista: 'portada', filtros: {} })}">${escapar(t('sitio.titulo'))}</a>
        <nav aria-label="${escapar(t('ui.principal'))}">
          <a href="${enlace({ vista: 'temas', filtros: {} })}" ${actual('temas')}>${escapar(t('nav.temas'))}</a>
          <a href="${enlace({ vista: 'canon', filtros: {} })}" ${actual('canon')}>${escapar(t('nav.canon'))}</a>
          <a href="${enlace({ vista: 'acerca', filtros: {} })}" ${actual('acerca')}>${escapar(t('nav.acerca'))}</a>
          <button type="button" data-accion="tema" aria-label="${escapar(t('ui.tema'))}">
            <span class="icono" aria-hidden="true">${temaActual() === 'oscuro' ? '☀' : '☾'}</span>
          </button>
        </nav>
      </div>
    </header>`;
}

/* El h1 de la portada vive en index.html y NO se reemplaza: solo se le cambia el texto (LCP). */
function ponerPortada(tit: string, entradilla: string): void {
  portadaEl.hidden = false;
  const h1 = portadaEl.querySelector('h1')!;
  const p = portadaEl.querySelector('p')!;
  if (h1.textContent !== tit) h1.textContent = tit;
  if (p.textContent !== entradilla) p.textContent = entradilla;
  p.hidden = entradilla === '';
  h1.tabIndex = -1;
  document.title = tit;
}

function titulo(nombre: string): void {
  document.title = `${nombre} · ${t('sitio.titulo')}`;
}

/** Qué pantalla estaba pintada, para mover el foco solo cuando se cambia de pantalla de verdad. */
let pintada = '';
let primera = true;

function pintar(): void {
  const ruta = rutaActual();
  if (necesitaEnsenanzas(ruta) && !ensenanzasListas()) cabeceraEl.innerHTML = cabecera(ruta);
  cuandoListas(necesitaEnsenanzas(ruta), pintarYa);
}

function pintarYa(): void {
  const ruta = rutaActual();
  const clave = `${ruta.vista}/${ruta.id ?? ''}`;
  const cambio = clave !== pintada;
  cabeceraEl.innerHTML = cabecera(ruta);
  vivas.forEach((v) => v.destruir());
  vivas = [];

  switch (ruta.vista) {
    case 'seccion': pintarSeccion(ruta); break;
    case 'libro': pintarLibro(ruta); break;
    case 'temas': pintarTemas(); break;
    case 'tema': pintarTema(ruta); break;
    case 'canon': pintarCanon(); break;
    case 'acerca': pintarAcerca(); break;
    default: pintarPortada(ruta);
  }
  pintada = clave;
  colocar(ruta, cambio);
}

/**
 * Foco y desplazamiento tras pintar. Al cambiar de pantalla, el foco va al titular (el lector de
 * pantalla anuncia dónde está) y se vuelve arriba; si la ruta trae una enseñanza (`#/l/rut/2`), se
 * baja a ella. No se hace en la primera carga ni al repintar por un cambio de tema.
 */
function colocar(ruta: Ruta, cambio: boolean): void {
  if (ruta.vista === 'libro' && ruta.n) {
    const dest = sitio.querySelector<HTMLElement>(`#ens-${ruta.n}-t`);
    if (dest) {
      dest.scrollIntoView({ block: 'start' });
      if (!primera) dest.focus({ preventScroll: true });
      primera = false;
      return;
    }
  }
  if (cambio && !primera) {
    window.scrollTo(0, 0);
    const h1 = ruta.vista === 'portada' ? portadaEl.querySelector<HTMLElement>('h1') : sitio.querySelector<HTMLElement>('#titulo-pagina');
    h1?.focus({ preventScroll: true });
  }
  primera = false;
}

function alPulsar(e: MouseEvent): void {
  const boton = (e.target as HTMLElement).closest<HTMLButtonElement>('button');
  if (!boton) return;
  if (boton.dataset.accion === 'limpiar') irA({ vista: rutaActual().vista, filtros: {} });
  if (boton.dataset.accion === 'abrir-filtros') abrirPanel();
  if (boton.dataset.accion === 'cerrar-filtros') cerrarPanel();
  if (boton.classList.contains('quitar')) {
    const { campo, valor } = boton.dataset as { campo: string; valor: string };
    const ruta = rutaActual();
    irA({ ...ruta, filtros: { ...ruta.filtros, [campo]: (ruta.filtros[campo] ?? []).filter((v) => v !== valor) } });
  }
  if (boton.dataset.accion === 'tema') {
    cambiarTema();
    // El repintado reemplaza la cabecera: el foco vuelve al botón que se acaba de pulsar.
    cabeceraEl.querySelector<HTMLElement>('[data-accion="tema"]')?.focus();
  }
}

/*
 * Un solo oyente por contenedor que sobrevive al repintado. La cabecera es hermana de `#app`, no
 * hija: necesita el suyo.
 */
sitio.addEventListener('click', alPulsar);
cabeceraEl.addEventListener('click', alPulsar);
alCambiarRuta((ruta) => {
  // Cambiar un filtro o la búsqueda en la portada repinta solo el catálogo, sin rehacer el mapa.
  if (ruta.vista === 'portada' && pintada === 'portada/' && sitio.querySelector('.reparto')) {
    cuandoListas(necesitaEnsenanzas(ruta), () => {
      const actual = rutaActual();
      cabeceraEl.innerHTML = cabecera(actual);
      repintarCatalogo(actual);
    });
    return;
  }
  pintar();
});
// El acento de la sección se resuelve en JavaScript: un cambio de tema pide repintar.
alCambiarTema(() => { pintada = ''; pintar(); });
pintar();
