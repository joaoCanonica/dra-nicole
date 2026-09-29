import { theme, type Paleta } from '../config/theme.config';

const kebab = (s: string) => s.replace(/[A-Z]/g, (m) => `-${m.toLowerCase()}`);
const VP_MIN = 22.5; // 360px em rem
const VP_MAX = 80; // 1280px em rem

function fluido([min, max]: readonly [number, number]): string {
  const inclinacao = (max - min) / (VP_MAX - VP_MIN);
  const base = min - inclinacao * VP_MIN;
  return `clamp(${min}rem, ${base.toFixed(4)}rem + ${(inclinacao * 100).toFixed(4)}vw, ${max}rem)`;
}

const cores = (p: Paleta) =>
  Object.entries(p)
    .map(([k, v]) => `--cor-${kebab(k)}: ${v};`)
    .join('');

/** Gera todas as CSS custom properties a partir do theme.config. */
export function gerarTokensCss(): string {
  const t = theme;
  const escala = Object.entries(t.tipografia.escala)
    .map(([k, v]) => `--fs-${k.replace('-', 'n')}: ${fluido(v)};`)
    .join('');
  const espacos = Array.from({ length: t.espacamento.passos }, (_, i) => {
    const valor = t.espacamento.base * t.espacamento.razao ** i;
    return `--esp-${i + 1}: ${valor.toFixed(3)}rem;`;
  }).join('');
  const raios = Object.entries(t.raios).map(([k, v]) => `--raio-${k}: ${v};`).join('');
  const sombras = Object.entries(t.sombras).map(([k, v]) => `--sombra-${k}: ${v};`).join('');
  const mov = Object.entries(t.movimento).map(([k, v]) => `--mov-${k}: ${v};`).join('');

  const base = `
    --fonte-display: ${t.tipografia.display};
    --fonte-texto: ${t.tipografia.texto};
    --fonte-manuscrita: ${t.tipografia.manuscrita};
    --lh-justa: ${t.tipografia.alturaLinha.justa};
    --lh-titulo: ${t.tipografia.alturaLinha.titulo};
    --lh-texto: ${t.tipografia.alturaLinha.texto};
    --medida-texto: ${t.tipografia.medidaTexto};
    --grade-colunas: ${t.grade.colunas};
    --grade-gutter: ${t.grade.gutter};
    --largura-max: ${t.grade.larguraMax};
    --margem-pagina: ${t.grade.margem};
    --duo-escuro: ${t.retrato.duoEscuro};
    --duo-claro: ${t.retrato.duoClaro};
    --linha-espessura: ${t.linha.espessura};
    --trilha: ${t.linha.larguraTrilhaMobile};
    --trilha-desktop: ${t.linha.larguraTrilhaDesktop};
    ${escala}${espacos}${raios}${sombras}${mov}`;

  return `:root{color-scheme:light dark;${base}${cores(t.cores.claro)}}
@media (prefers-color-scheme: dark){:root:not([data-tema="claro"]){${cores(t.cores.escuro)}}}
:root[data-tema="escuro"]{${cores(t.cores.escuro)}}
@media (prefers-reduced-motion: reduce){:root{--mov-rapido:0ms;--mov-medio:0ms;--mov-lento:0ms;}}`;
}
