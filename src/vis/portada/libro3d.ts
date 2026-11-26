/**
 * El libro abierto: el modelo CC0 de Quaternius como emblema, meciéndose despacio. No se
 * toca ni informa de nada: el índice del sitio va debajo, en HTML. Se le añaden renglones (rayas, no
 * letras) porque sin ellos las páginas lisas se leen como un fajo de papeles.
 *
 * Los colores del original (tapa roja y detalle dorado) se cambian por los de los tokens: el sitio no
 * es de ninguna confesión y no usa dorados.
 */

import { cargarModelo, crearEscena3D } from '../escena3d';

export interface DatosLibro {
  caja: HTMLElement;
  etiqueta: string;
  modelo: string;
  /** Color de cada material del modelo, por su nombre. */
  colores: Record<string, string>;
  renglon: string;
  alPerderContexto: () => void;
}

export async function crearLibroAbierto(d: DatosLibro): Promise<{ destruir(): void } | null> {
  const [THREE, modelo] = await Promise.all([import('three'), cargarModelo(d.modelo)]);
  if (!d.caja.isConnected) return null;

  const e = crearEscena3D(THREE, { caja: d.caja, etiqueta: d.etiqueta, fov: 28, alPerderContexto: d.alPerderContexto });
  const paginas: import('three').Object3D[] = [];
  modelo.traverse((o) => {
    if (!(o instanceof THREE.Mesh)) return;
    const m = o.material as import('three').MeshStandardMaterial;
    if (m.name === 'Beige') paginas.push(o);
    const color = d.colores[m.name];
    if (color) m.color.set(color);
    m.metalness = 0;
    m.roughness = 0.85;
    // Facetado a la vista, como es el modelo.
    m.flatShading = true;
  });

  // Centrado y a una anchura fija: el original viene con su propia escala.
  const caja = new THREE.Box3().setFromObject(modelo);
  const tam = caja.getSize(new THREE.Vector3());
  const centro = caja.getCenter(new THREE.Vector3());
  const escala = 2 / Math.max(tam.x, tam.y, tam.z);
  modelo.scale.multiplyScalar(escala);
  modelo.position.sub(centro.multiplyScalar(escala));
  const peana = new THREE.Group();
  peana.add(modelo);
  peana.add(renglones(THREE, paginas, new THREE.Box3().setFromObject(modelo), d.renglon));
  e.escena.add(peana);

  e.escena.add(new THREE.HemisphereLight(0xffffff, 0x4a4440, 1.9));
  // Luz rasante desde la izquierda: las dos páginas salen distintas y se ve el surco central.
  const sol = new THREE.DirectionalLight(0xffffff, 1.7);
  sol.position.set(-3, 2, 0.5);
  e.escena.add(sol);

  const GIRO = 0.26;
  const VAIVEN = 0.03;
  const extremos = new THREE.Box3().setFromObject(peana);
  const esquina = new THREE.Vector3();
  const eje = new THREE.Vector3(0, 1, 0);
  let encuadrado = 0;
  let distancia = 5;

  const colocar = (): void => {
    e.camara.position.set(0, distancia * 0.86, distancia * 0.51);
    e.camara.lookAt(0, 0, 0);
    e.camara.updateMatrixWorld();
  };
  /** Distancia a la que el libro cabe entero, girado hacia cualquiera de los dos lados. */
  function encuadrar(): void {
    for (let vuelta = 0; vuelta < 4; vuelta += 1) {
      colocar();
      let mayor = 0;
      for (const x of [extremos.min.x, extremos.max.x])
        for (const y of [extremos.min.y - VAIVEN, extremos.max.y + VAIVEN])
          for (const z of [extremos.min.z, extremos.max.z])
            for (const giro of [-GIRO, 0, GIRO]) {
              esquina.set(x, y, z).applyAxisAngle(eje, giro).project(e.camara);
              mayor = Math.max(mayor, Math.abs(esquina.x), Math.abs(esquina.y));
            }
      distancia *= mayor / 0.94;
    }
  }

  e.alPintar((t) => {
    if (encuadrado !== e.camara.aspect) { encuadrado = e.camara.aspect; encuadrar(); }
    colocar();
    peana.rotation.y = Math.sin(t * 0.45) * GIRO;
    peana.position.y = Math.sin(t * 0.9) * VAIVEN;
    return true;
  });

  return e;
}

/** Rayas que siguen la curva de cada página: se apoyan lanzando un rayo desde arriba. */
function renglones(
  THREE: typeof import('three'),
  paginas: import('three').Object3D[],
  caja: import('three').Box3,
  color: string,
): import('three').Mesh {
  const rayo = new THREE.Raycaster();
  const abajo = new THREE.Vector3(0, -1, 0);
  const desde = new THREE.Vector3();
  const puntos: number[] = [];
  const mx = caja.max.x;
  const mz = caja.max.z;
  const grueso = mz * 0.022;
  const FILAS = 9;
  const TRAMOS = 14;
  /** Márgenes de la página, en fracción de su anchura desde el lomo. */
  const DENTRO = 0.14;
  const FUERA = 0.8;
  for (const lado of [-1, 1]) {
    for (let fila = 0; fila < FILAS; fila += 1) {
      const z = mz * (-0.62 + (1.2 * fila) / (FILAS - 1));
      // La última raya de cada página, a medias, como un final de párrafo.
      const largo = (FUERA - DENTRO) * (fila === FILAS - 1 ? 0.55 : 1);
      // Cada renglón empieza a la izquierda, también en la página izquierda.
      const principio = lado < 0 ? -FUERA : DENTRO;
      let anterior: [number, number] | null = null;
      for (let k = 0; k <= TRAMOS; k += 1) {
        const x = mx * (principio + (largo * k) / TRAMOS);
        rayo.set(desde.set(x, caja.max.y + 1, z), abajo);
        const y = rayo.intersectObjects(paginas, false)[0]?.point.y;
        if (y === undefined) { anterior = null; continue; }
        if (anterior) {
          const [ax, ay] = anterior;
          const by = y + 0.006;
          puntos.push(ax, ay, z, ax, ay, z + grueso, x, by, z, x, by, z, ax, ay, z + grueso, x, by, z + grueso);
        }
        anterior = [x, y + 0.006];
      }
    }
  }
  const geometria = new THREE.BufferGeometry();
  geometria.setAttribute('position', new THREE.Float32BufferAttribute(puntos, 3));
  return new THREE.Mesh(geometria, new THREE.MeshBasicMaterial({ color, side: THREE.DoubleSide }));
}
