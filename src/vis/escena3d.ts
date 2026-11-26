/**
 * Andamiaje común de las escenas Three.js (adaptado de la plantilla a la portada de Biblia).
 *
 * LA REGLA DEL PROYECTO —un solo contexto WebGL vivo a la vez, y ninguno al salir de la portada— SE
 * CUMPLE AQUÍ: `destruir()` libera geometrías, materiales y texturas y fuerza la pérdida del
 * contexto. Lo comprueba scripts/auditar.mjs sobre el sitio compilado.
 *
 * Three.js solo entra por `import()`: este fichero puede estar en el paquete inicial sin arrastrarlo.
 */

import { movimientoReducido } from './lenguaje';

/** Sin WebGL 2 o con «reducir movimiento», no hay escena: se queda la imagen fija. */
export function puedeHaber3D(): boolean {
  if (movimientoReducido()) return false;
  try {
    const gl = document.createElement('canvas').getContext('webgl2');
    // La sonda también es un contexto: se suelta en el acto.
    gl?.getExtension('WEBGL_lose_context')?.loseContext();
    return Boolean(gl);
  } catch {
    return false;
  }
}

/**
 * Carga un GLB preparado por scripts/optimizar-modelo.mjs. Registra el decodificador de meshopt, sin
 * el cual el error de carga no dice lo que pasa.
 */
export async function cargarModelo(url: string): Promise<import('three').Group> {
  const [{ GLTFLoader }, { MeshoptDecoder }] = await Promise.all([
    import('three/examples/jsm/loaders/GLTFLoader.js'),
    import('three/examples/jsm/libs/meshopt_decoder.module.js'),
  ]);
  const loader = new GLTFLoader();
  loader.setMeshoptDecoder(MeshoptDecoder);
  return (await loader.loadAsync(url)).scene;
}

export interface Escena3D {
  THREE: typeof import('three');
  escena: import('three').Scene;
  camara: import('three').PerspectiveCamera;
  lienzo: HTMLCanvasElement;
  /** Pide un fotograma. Para una escena quieta, que solo repinta cuando algo cambia. */
  pedir(): void;
  /**
   * Qué hacer antes de cada fotograma; `t` y `dt` en segundos. Si devuelve `true`, se pide otro:
   * una animación que ha terminado devuelve `false` y el bucle se para solo.
   */
  alPintar(paso: (t: number, dt: number) => boolean): void;
  destruir(): void;
}

export interface OpcionesEscena {
  /** Caja que contiene el lienzo; su tamaño manda (la proporción la fija el CSS). */
  caja: HTMLElement;
  /** Etiqueta accesible del lienzo. */
  etiqueta: string;
  fov: number;
  /** Si el navegador tira el contexto, quien llama vuelve a la imagen fija. */
  alPerderContexto: () => void;
}

export function crearEscena3D(THREE: typeof import('three'), op: OpcionesEscena): Escena3D {
  const escena = new THREE.Scene();
  const camara = new THREE.PerspectiveCamera(op.fov, 1, 0.1, 100);
  // `low-power`: no hace falta la GPU discreta. Fondo transparente: no hay rectángulo que delatar.
  const render = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'low-power' });
  render.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  render.setClearColor(0x000000, 0);
  const lienzo = render.domElement;
  lienzo.className = 'p3d-canvas';
  lienzo.setAttribute('role', 'img');
  lienzo.setAttribute('aria-label', op.etiqueta);
  op.caja.append(lienzo);

  let paso: (t: number, dt: number) => boolean = () => false;
  let pendiente = 0;
  let visible = true;
  let anterior = 0;
  const inicio = performance.now();

  function dibujar(ahora: number): void {
    pendiente = 0;
    // Un salto largo (pestaña oculta, fuera de pantalla) no debe avanzar la animación de golpe.
    const dt = anterior ? Math.min(0.05, (ahora - anterior) / 1000) : 0;
    const sigue = paso((ahora - inicio) / 1000, dt);
    anterior = sigue ? ahora : 0;
    render.render(escena, camara);
    if (sigue) pedir();
  }
  function pedir(): void {
    if (!pendiente && visible) pendiente = requestAnimationFrame(dibujar);
  }

  function redimensionar(): void {
    const ancho = op.caja.clientWidth;
    const alto = op.caja.clientHeight;
    if (!ancho || !alto) return;
    render.setSize(ancho, alto, false);
    camara.aspect = ancho / alto;
    camara.updateProjectionMatrix();
    // setSize borra el lienzo: se repinta ya, sin esperar al siguiente fotograma.
    paso((performance.now() - inicio) / 1000, 0);
    render.render(escena, camara);
    pedir();
  }
  const medidor = new ResizeObserver(redimensionar);
  medidor.observe(op.caja);

  // Fuera de pantalla no se pinta: es batería gastada en algo que nadie ve.
  const mirador = new IntersectionObserver(([e]) => {
    visible = e?.isIntersecting ?? true;
    if (visible) pedir();
    else if (pendiente) { cancelAnimationFrame(pendiente); pendiente = 0; anterior = 0; }
  });
  mirador.observe(op.caja);

  const perdido = (e: Event): void => { e.preventDefault(); op.alPerderContexto(); };
  lienzo.addEventListener('webglcontextlost', perdido);

  /** Imagen fija a partir de la escena: la usa scripts/carteles-portada.mjs. */
  const foto = (e: Event): void => {
    render.render(escena, camara);
    (e as CustomEvent<{ url?: string }>).detail.url = lienzo.toDataURL('image/webp', 0.86);
  };
  op.caja.addEventListener('p3d:foto', foto);

  return {
    THREE, escena, camara, lienzo, pedir,
    alPintar(f) { paso = f; redimensionar(); },
    destruir() {
      visible = false;
      cancelAnimationFrame(pendiente);
      medidor.disconnect();
      mirador.disconnect();
      op.caja.removeEventListener('p3d:foto', foto);
      // Antes de forzar la pérdida: la nuestra no es una avería.
      lienzo.removeEventListener('webglcontextlost', perdido);
      escena.traverse((o) => {
        if (!(o instanceof THREE.Mesh)) return;
        o.geometry.dispose();
        for (const m of Array.isArray(o.material) ? o.material : [o.material]) {
          // Las texturas aparte: dispose() del material no las arrastra.
          for (const v of Object.values(m)) if (v instanceof THREE.Texture) v.dispose();
          m.dispose();
        }
      });
      render.dispose();
      render.forceContextLoss();
      lienzo.remove();
    },
  };
}
