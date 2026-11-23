#!/usr/bin/env node
/**
 * Importa los reels de `videos-cortos` a la ficha de su libro: los transcodifica a una versión
 * ligera para web, genera el póster y escribe `content/reels.json`.
 *
 * Se puede reejecutar: lo que no ha cambiado desde la última importación se salta. Necesita
 * `ffmpeg` y `ffprobe` en el PATH. Pesa (ffmpeg): no correrlo con poca RAM libre.
 *
 *   npm run importar-reels                 # importa lo nuevo o cambiado
 *   npm run importar-reels -- --forzar     # vuelve a transcodificar todo
 *   REELS_ORIGEN=D:/otra/carpeta npm run importar-reels
 *
 * El contenido va en datos (DEC §1): para añadir un reel se añade una entrada a REELS, no código.
 * La transcripción sale de `guion.json` (lo que dice la voz) y las fuentes se declaran aquí, con la
 * misma lista que `guion-fuentes.md` del reel.
 */
import { execFileSync } from 'node:child_process';
import { existsSync, mkdirSync, readFileSync, renameSync, statSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const RAIZ = join(dirname(fileURLToPath(import.meta.url)), '..');
const ORIGEN = process.env.REELS_ORIGEN ?? 'C:/Users/migue/videos-cortos/reel/reels';
const DESTINO = join(RAIZ, 'public', 'reels');
const MANIFIESTO = join(RAIZ, 'content', 'reels.json');
const FORZAR = process.argv.includes('--forzar');

/** Tope por vídeo. El bitrate se calcula a partir de la duración para no pasarlo. */
const PRESUPUESTO_BYTES = 6.5 * 1024 * 1024;
const AUDIO_KBPS = 96;
const VIDEO_KBPS_MAX = 1800;

/** Carpeta de origen → a qué libro (o tema) pertenece y con qué fuentes se publica. */
const REELS = {
  'rut-la-extranjera': {
    libro: 'rut',
    fuentes:
      'Rut 1-4; Dt 23,4; Mt 1,5; Esd 9-10; Neh 13,23-27. The Jewish Study Bible (Adele Berlin y Marc Z. Brettler, eds.); Edward F. Campbell, Ruth (Anchor Bible 7).',
  },
  'dos-relatos-de-la-creacion': {
    libro: 'genesis',
    fuentes:
      'Gn 1,1–2,4; Gn 2,4-25; Gn 1,26-28; Gn 2,7.21-22. Nahum M. Sarna, Genesis (JPS Torah Commentary); Jean-Louis Ska, Introducción a la lectura del Pentateuco; Comisión Bíblica Pontificia, La interpretación de la Biblia en la Iglesia (1993).',
  },
  'los-libros-que-tu-biblia-quiza-no-tiene': {
    libro: 'tobias',
    fuentes:
      'Tob 1-14; los siete libros: Tobías, Judit, Sabiduría, Eclesiástico, Baruc y 1-2 Macabeos. Joseph A. Fitzmyer, Tobit (Commentaries on Early Jewish Literature); David A. deSilva, Introducing the Apocrypha; Concilio de Trento, sesión IV (1546); Martín Lutero, prefacio a los apócrifos (1534).',
  },
  'job-la-pregunta-que-no-se-responde': {
    libro: 'job',
    fuentes:
      'Job 1-2; 4-5; 38,4; 42,3-7. Maimónides, Guía de perplejos III,23; Tomás de Aquino, Exposición literal sobre Job (hacia 1260); Gustavo Gutiérrez, Hablar de Dios desde el sufrimiento del inocente; Carol A. Newsom, The Book of Job; The Jewish Study Bible (Berlin y Brettler, eds.).',
  },
  'un-isaias-o-tres': {
    libro: 'isaias',
    fuentes:
      'Is 1-39; 40,1; 44,28; 45,1; 56-66. Joseph Blenkinsopp, Isaiah 1-39 (Anchor Bible 19); John N. Oswalt, The Book of Isaiah (NICOT); Brevard Childs, Isaiah (OTL); The Jewish Study Bible (Berlin y Brettler, eds.); Talmud, Baba Batra 15a; Abraham ibn Ezra, comentario a Isaías (siglo XII).',
  },
  'cuatro-evangelios-cuatro-retratos': {
    libro: 'mateo',
    fuentes:
      'Mc 16,8; Mt 5,17; Lc 10,25-37; 15,11-32; Jn 1,1. Raymond E. Brown, Introducción al Nuevo Testamento; Ulrich Luz, Matthew (Hermeneia); Joel Marcus, Mark (Anchor Bible 27); Joseph A. Fitzmyer, The Gospel According to Luke (Anchor Bible 28); The Jewish Annotated New Testament (Levine y Brettler, eds.); Ireneo de Lyon, Contra las herejías III,11,8.',
  },
};

const ffmpeg = (args) => execFileSync('ffmpeg', ['-hide_banner', '-loglevel', 'error', '-y', ...args], { stdio: 'inherit' });

function duracion(ruta) {
  const salida = execFileSync('ffprobe', ['-v', 'error', '-show_entries', 'format=duration', '-of', 'csv=p=0', ruta]).toString();
  return Number.parseFloat(salida);
}

const limpiar = (texto) => texto.replace(/\s+/g, ' ').trim();

function leerGuion(carpeta) {
  const guion = JSON.parse(readFileSync(join(carpeta, 'guion.json'), 'utf8'));
  return {
    titulo: limpiar(guion.titulo ?? ''),
    transcripcion: (guion.frases ?? []).map((f) => limpiar(f.texto ?? '')).filter(Boolean),
  };
}

function transcodificar(mp4, destino, segundos) {
  const totalKbps = (PRESUPUESTO_BYTES * 8) / 1000 / segundos;
  const videoKbps = Math.min(VIDEO_KBPS_MAX, Math.floor(totalKbps * 0.95 - AUDIO_KBPS));
  ffmpeg([
    '-i', mp4,
    '-vf', 'scale=720:1280:flags=lanczos,format=yuv420p',
    '-c:v', 'libx264', '-preset', 'slow', '-profile:v', 'high',
    '-crf', '23', '-maxrate', `${videoKbps}k`, '-bufsize', `${videoKbps * 2}k`,
    '-c:a', 'aac', '-b:a', `${AUDIO_KBPS}k`, '-ac', '2',
    // El índice al principio: el navegador empieza a reproducir sin descargar el archivo entero.
    '-movflags', '+faststart',
    destino,
  ]);
}

function poster(png, base) {
  ffmpeg(['-i', png, '-vf', 'scale=720:1280:flags=lanczos', '-c:v', 'libwebp', '-quality', '80', `${base}.webp`]);
}

const anterior = existsSync(MANIFIESTO) ? JSON.parse(readFileSync(MANIFIESTO, 'utf8')) : { reels: [] };
const previos = new Map(anterior.reels.map((r) => [r.id, r]));
mkdirSync(DESTINO, { recursive: true });

const reels = [];
const resumen = { nuevos: [], actualizados: [], iguales: [], pendientes: [] };

for (const [carpeta, datos] of Object.entries(REELS)) {
  const dir = join(ORIGEN, carpeta);
  const mp4 = join(dir, 'salida', `${carpeta}.mp4`);
  const png = join(dir, 'salida', `${carpeta}-portada.png`);

  if (!existsSync(mp4) || !existsSync(png) || !existsSync(join(dir, 'guion.json'))) {
    resumen.pendientes.push(carpeta);
    continue;
  }

  // Huella del origen: tamaño y fecha del mp4 y de la portada.
  const huella = [mp4, png].map((r) => {
    const s = statSync(r);
    return `${s.size}-${Math.round(s.mtimeMs)}`;
  }).join('|');

  const base = join(DESTINO, carpeta);
  const previo = previos.get(carpeta);
  const intactos = [`${base}.mp4`, `${base}.webp`].every(existsSync);
  const cambiado = FORZAR || !previo || previo.huella !== huella || !intactos;

  const segundos = duracion(mp4);
  if (cambiado) {
    process.stdout.write(`· ${carpeta} (${segundos.toFixed(1)} s)… `);
    const temporal = `${base}.tmp.mp4`;
    transcodificar(mp4, temporal, segundos);
    renameSync(temporal, `${base}.mp4`);
    poster(png, base);
    console.log(`${(statSync(`${base}.mp4`).size / 1024 / 1024).toFixed(1)} MB`);
    (previo ? resumen.actualizados : resumen.nuevos).push(carpeta);
  } else {
    resumen.iguales.push(carpeta);
  }

  const { libro, tema, fuentes } = datos;
  reels.push({
    id: carpeta,
    ...(libro ? { libro } : {}),
    ...(tema ? { tema } : {}),
    ...leerGuion(dir),
    fuentes,
    duracion: Math.round(segundos),
    video: `reels/${carpeta}.mp4`,
    poster: `reels/${carpeta}.webp`,
    bytes: statSync(`${base}.mp4`).size,
    huella,
  });
}

writeFileSync(MANIFIESTO, `${JSON.stringify({ nota: 'Generado por scripts/importar-reels.mjs; no se edita a mano.', reels }, null, 2)}\n`);

console.log(
  `\n✓ ${reels.length} reels en content/reels.json` +
    ` · nuevos: ${resumen.nuevos.length} · actualizados: ${resumen.actualizados.length} · sin cambios: ${resumen.iguales.length}` +
    (resumen.pendientes.length ? `\n  Aún no disponibles (${resumen.pendientes.length}): ${resumen.pendientes.join(', ')}` : ''),
);
