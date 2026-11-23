/**
 * Carga del contenido de Biblia: secciones, libros, enseñanzas, temas y páginas fijas.
 *
 * Todo es JSON en content/<idioma>/ y se empaqueta en compilación con import.meta.glob. Los tipos
 * reflejan content/schema/*.json (DEC §5): si cambia un schema, cambia aquí. Las enseñanzas NO se
 * listan en el libro ni en el tema: se reúnen por `libro_id` y por `temas[]`, de modo que el enlace
 * se escribe una sola vez, en la enseñanza.
 */

export type Testamento = 'AT' | 'NT';
export type Acuerdo = 'consenso' | 'discusion';
export type EstadoFicha = 'esbozo' | 'completo';
export type TradicionLectura = 'judia' | 'catolica' | 'ortodoxa' | 'protestante' | 'comun';
export type TradicionFuente = 'judia' | 'catolica' | 'ortodoxa' | 'protestante' | 'critica' | 'literaria';
export type BloqueNT = 'evangelios' | 'hechos' | 'cartas-paulinas' | 'cartas-catolicas' | 'apocalipsis';

export interface Seccion {
  id: string;
  orden: number;
  nombre: string;
  testamento: Testamento;
  resumen: string;
  /** Un color por tema, AA en los dos (check-contraste.mjs). Las tradiciones no tienen color. */
  color_acento: { claro: string; oscuro: string };
}

export interface Fuente {
  titulo: string;
  autor: string;
  url?: string;
  tradicion: TradicionFuente;
}

export interface Postura { quien: string; texto: string }
export type EnfoqueAcademico = "literaria" | "feminista" | "liberacion" | "judaismo-academico" | "otra";

export interface Libro {
  id: string;
  seccion_id: string;
  orden: number;
  nombre: string;
  abreviatura: string;
  bloque?: BloqueNT;
  capitulos: number;
  deuterocanonico: boolean;
  adiciones_griegas?: string[];
  estado: EstadoFicha;
  resumen: string;
  presentacion?: string;
  autoria?: { tradicion: string; critica: string; acuerdo: Acuerdo };
  datacion?: {
    tradicion: string;
    critica: string;
    acuerdo: Acuerdo;
    /** Crítica: [desde, hasta], negativos = a. C. */
    rango: [number, number];
    /** Opcional: la datación de la tradición, para la segunda barra de `dataciones`. */
    rango_tradicion?: [number, number];
    /** Si `acuerdo` es discusion: quién sostiene qué (DEC §13.3). */
    posturas?: Postura[];
  };
  para_recordar?: string[];
  canon?: { judia: string; ortodoxa: string; protestante: string };
  pasajes_clave?: Array<{ pasaje: string; nota: string }>;
  fuentes?: Fuente[];
}

export interface Ensenanza {
  id: string;
  libro_id: string;
  orden: number;
  titulo: string;
  pasaje: string;
  que_dice: string;
  cita?: { texto: string; referencia: string; traduccion: string };
  lecturas: Array<{ tradicion: TradicionLectura; texto: string }>;
  /** Capa 3 (DEC §13.4): lecturas no confesionales con autor o escuela nombrados. */
  academica?: Array<{ enfoque: EnfoqueAcademico; autor: string; texto: string }>;
  critica: { texto: string; acuerdo: Acuerdo; posturas?: Postura[] };
  abierta?: boolean;
  temas: string[];
  fuentes: Fuente[];
}

export interface Tema {
  id: string;
  orden: number;
  nombre: string;
  estado: EstadoFicha;
  resumen: string;
  introduccion?: string;
  pasajes: string[];
  divergencias?: string;
  para_recordar?: string[];
  relacionados?: string[];
}

export interface PaginaFija {
  titulo: string;
  entradilla: string;
  secciones: Array<{ titulo: string; parrafos: string[] }>;
  tabla?: { titulo: string; columnas: string[]; filas: string[][] };
}

export interface Paginas {
  canon: PaginaFija;
  acerca: PaginaFija;
}

/**
 * Reel de un libro o de un tema. Lo escribe otra tarea (scripts/importar-reels.mjs) en
 * content/reels.json; si el fichero no existe, no hay reels y nada falla.
 */
export interface Reel {
  libro?: string;
  libro_id?: string;
  tema?: string;
  titulo: string;
  descripcion?: string;
  fuentes?: string;
  transcripcion?: string[] | string;
  duracion?: number;
  /** Rutas relativas a public/. */
  video: string;
  poster?: string;
}

const ficherosSecciones = import.meta.glob<{ default: { secciones: Seccion[] } }>('../../content/*/secciones.json', { eager: true });
const ficherosLibros = import.meta.glob<{ default: Libro }>('../../content/*/libros/*.json', { eager: true });
// Las enseñanzas son ~2/3 del contenido: van en su propio chunk, con carga diferida (JS crítico ≤ 200 kB).
const ficherosEnsenanzas = import.meta.glob<{ default: Ensenanza }>('../../content/*/ensenanzas/*.json');
const ficherosTemas = import.meta.glob<{ default: { temas: Tema[] } }>('../../content/*/temas.json', { eager: true });
const ficherosPaginas = import.meta.glob<{ default: Paginas }>('../../content/*/paginas.json', { eager: true });
// Opcional: un import directo de un fichero ausente sería un error de compilación; el glob, una lista vacía.
const ficherosReels = import.meta.glob<{ default: { reels: Reel[] } }>('../../content/reels.json', { eager: true });

const idioma = () => document.documentElement.lang || 'es';
const delIdioma = <T>(ficheros: Record<string, { default: T }>): T[] =>
  Object.entries(ficheros).filter(([ruta]) => ruta.includes(`/${idioma()}/`)).map(([, m]) => m.default);

export const SECCIONES: Seccion[] = (delIdioma(ficherosSecciones)[0]?.secciones ?? []).slice().sort((a, b) => a.orden - b.orden);

const ordenSeccion = (id: string): number => SECCIONES.find((s) => s.id === id)?.orden ?? Number.MAX_SAFE_INTEGER;

/* Orden del canon: primero la sección, después el libro dentro de ella. Solo con `orden` empatarían
   libros de secciones distintas. */
export const LIBROS: Libro[] = delIdioma(ficherosLibros)
  .slice()
  .sort((a, b) => (ordenSeccion(a.seccion_id) - ordenSeccion(b.seccion_id)) || (a.orden - b.orden));

const posicion = new Map(LIBROS.map((l, n) => [l.id, n]));

/* Enseñanzas por orden canónico del libro y, dentro de él, por `orden`. Se rellena (misma referencia)
   al terminar `cargarEnsenanzas()`: hasta entonces está vacío. */
export const ENSENANZAS: Ensenanza[] = [];
let cargadas = false;
let carga: Promise<void> | undefined;

export const ensenanzasListas = (): boolean => cargadas;

export function cargarEnsenanzas(): Promise<void> {
  carga ??= (async () => {
    const entradas = Object.entries(ficherosEnsenanzas).filter(([ruta]) => ruta.includes(`/${idioma()}/`));
    const todas = await Promise.all(entradas.map(([, cargar]) => cargar().then((m) => m.default)));
    ENSENANZAS.push(
      ...todas.sort((a, b) => ((posicion.get(a.libro_id) ?? 0) - (posicion.get(b.libro_id) ?? 0)) || (a.orden - b.orden)),
    );
    cargadas = true;
  })();
  // Si falla (red caída), se olvida la promesa: la siguiente navegación lo reintenta.
  carga.catch(() => { carga = undefined; });
  return carga;
}

export const TEMAS: Tema[] = (delIdioma(ficherosTemas)[0]?.temas ?? []).slice().sort((a, b) => a.orden - b.orden);

export const PAGINAS: Paginas = delIdioma(ficherosPaginas)[0]!;

export const REELS: Reel[] = Object.values(ficherosReels)[0]?.default.reels ?? [];

export const libroPorId = (id: string): Libro | undefined => LIBROS.find((l) => l.id === id);
export const seccionPorId = (id: string): Seccion | undefined => SECCIONES.find((s) => s.id === id);
export const temaPorId = (id: string): Tema | undefined => TEMAS.find((t) => t.id === id);
export const librosDeSeccion = (id: string): Libro[] => LIBROS.filter((l) => l.seccion_id === id);
export const ensenanzasDeLibro = (id: string): Ensenanza[] => ENSENANZAS.filter((e) => e.libro_id === id);
export const ensenanzasDeTema = (id: string): Ensenanza[] => ENSENANZAS.filter((e) => e.temas.includes(id));
export const reelDe = (clave: { libro?: string; tema?: string }): Reel | undefined =>
  REELS.find((r) => (clave.libro && (r.libro ?? r.libro_id) === clave.libro) || (clave.tema && r.tema === clave.tema));

/** El libro anterior y el siguiente en el canon (cruzan de una sección a otra). */
export function vecinosEnCanon(id: string): { anterior?: Libro; siguiente?: Libro } {
  const n = posicion.get(id);
  if (n === undefined) return {};
  return { anterior: LIBROS[n - 1], siguiente: LIBROS[n + 1] };
}

/** Los temas de un libro (por sus enseñanzas), sin repetir, en el orden de los temas. */
export function temasDeLibro(id: string): string[] {
  const vistos = new Set(ensenanzasDeLibro(id).flatMap((e) => e.temas));
  return TEMAS.filter((t) => vistos.has(t.id)).map((t) => t.id);
}
