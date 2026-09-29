/**
 * Geometria da Linha da Vida. Cada trecho ocupa uma seção inteira (viewBox 0 0 100 1000,
 * esticado com preserveAspectRatio="none"); todos entram e saem em x=50 na vertical,
 * então os trechos se emendam numa linha contínua. `a` = amplitude (0 = reta).
 */
export type FormaTrecho = 'inicio' | 'onda' | 'ventre' | 'fim';
export type Lado = 1 | -1;

const X = 50;
/** Todos os trechos seguem retos até aqui, para o marco (no topo da seção) pousar exatamente na linha. */
export const RETO_ATE = 300;
/** Onde a linha termina no trecho final (0–1000). */
export const FIM_EM = 640;

export function caminho(forma: FormaTrecho, lado: Lado, a: number): string {
  const d = (v: number) => (X + lado * v * a).toFixed(1);
  switch (forma) {
    case 'inicio':
      return `M${X} 120 L${X} ${RETO_ATE} C${X} 480 ${d(34)} 500 ${d(34)} 680 C${d(34)} 840 ${X} 860 ${X} 1000`;
    case 'onda':
      return `M${X} 0 L${X} ${RETO_ATE} C${X} 480 ${d(36)} 480 ${d(36)} 650 C${d(36)} 820 ${X} 840 ${X} 1000`;
    case 'ventre': {
      // Curva de ventre: sobe suave, arredonda para fora e volta — sempre com amplitude mínima no mobile.
      const v = (n: number) => (X + lado * n * Math.max(a, 0.55)).toFixed(1);
      return `M${X} 0 L${X} ${RETO_ATE} C${X} 360 ${v(8)} 390 ${v(18)} 420 C${v(46)} 480 ${v(46)} 700 ${v(18)} 770 C${v(6)} 800 ${X} 830 ${X} 1000`;
    }
    case 'fim':
      return `M${X} 0 L${X} ${RETO_ATE} C${X} 420 ${d(26)} 440 ${d(26)} 520 C${d(26)} 590 ${X} 600 ${X} ${FIM_EM}`;
  }
}
