/**
 * Tokens de design. src/styles/tokens.ts converte isto em CSS custom properties.
 * Paleta ancorada no feed da Dra. Nicole: teal profundo, verde-água, lilás, creme quente, rosa-seco.
 * Pares texto/fundo declarados em `contraste` são verificados (WCAG AA) pelo validador.
 */
export type Paleta = Record<
  | 'fundo' | 'superficie' | 'superficieAlt' | 'texto' | 'textoSuave'
  | 'primaria' | 'primariaTexto' | 'primariaHover' | 'aguaSuave'
  | 'acento' | 'acentoTexto' | 'rosaSeco' | 'borda' | 'foco',
  string
>;

export const theme = {
  cores: {
    claro: {
      fundo: '#F8F3EA',
      superficie: '#FFFCF7',
      superficieAlt: '#E3F0EC',
      texto: '#14231F',
      textoSuave: '#3F514D',
      primaria: '#1D5752',
      primariaTexto: '#FFFCF7',
      primariaHover: '#153F3B',
      aguaSuave: '#CFE6E0',
      acento: '#8C74B4',
      acentoTexto: '#5A4386',
      rosaSeco: '#C9938F',
      borda: '#D9D0C1',
      foco: '#5A4386',
    },
    escuro: {
      fundo: '#0F1917',
      superficie: '#16231F',
      superficieAlt: '#1C2E2A',
      texto: '#E8EFEC',
      textoSuave: '#B3C2BE',
      primaria: '#86C9BF',
      primariaTexto: '#0F1917',
      primariaHover: '#A6DBD2',
      aguaSuave: '#244039',
      acento: '#B9A3DE',
      acentoTexto: '#CDBBEA',
      rosaSeco: '#D6A9A5',
      borda: '#2E433E',
      foco: '#CDBBEA',
    },
  } satisfies Record<'claro' | 'escuro', Paleta>,

  /** Pares [texto, fundo, mínimo] conferidos em ambos os modos. */
  contraste: [
    ['texto', 'fundo', 4.5],
    ['texto', 'superficie', 4.5],
    ['texto', 'superficieAlt', 4.5],
    ['textoSuave', 'fundo', 4.5],
    ['textoSuave', 'superficie', 4.5],
    ['primaria', 'fundo', 4.5],
    ['primaria', 'superficie', 4.5],
    ['primariaTexto', 'primaria', 4.5],
    ['primariaTexto', 'primariaHover', 4.5],
    ['acentoTexto', 'fundo', 4.5],
    ['acentoTexto', 'superficie', 4.5],
    ['texto', 'aguaSuave', 4.5],
    ['foco', 'fundo', 3],
  ] as const satisfies readonly (readonly [keyof Paleta, keyof Paleta, number])[],

  tipografia: {
    display: "'Cormorant Garamond', 'Iowan Old Style', 'Palatino Linotype', Georgia, serif",
    texto: "'Hanken Grotesk Variable', 'Segoe UI', system-ui, -apple-system, sans-serif",
    // Manuscrita: SOMENTE micro-detalhes decorativos (aria-hidden), nunca texto corrido.
    manuscrita: "'Great Vibes', cursive",
    /** Escala fluida: [min rem, max rem] entre viewport 360px e 1280px. */
    escala: {
      '-1': [0.84, 0.9],
      '0': [1, 1.0625],
      '1': [1.2, 1.35],
      '2': [1.44, 1.75],
      '3': [1.73, 2.3],
      '4': [2.07, 3.05],
      '5': [2.49, 4.1],
    },
    alturaLinha: { justa: 1.1, titulo: 1.2, texto: 1.6 },
    medidaTexto: '68ch',
  },

  /** Escala modular (razão 1.5) a partir de 0.25rem. */
  espacamento: { base: 0.25, razao: 1.5, passos: 10 },

  grade: { colunas: 12, gutter: 'clamp(1rem, 2.5vw, 2rem)', larguraMax: '75rem', margem: 'clamp(1rem, 5vw, 3rem)' },

  raios: { s: '0.375rem', m: '0.75rem', l: '1.5rem', pilula: '999px' },

  sombras: {
    s: '0 1px 2px rgb(20 35 31 / 0.06), 0 1px 1px rgb(20 35 31 / 0.04)',
    m: '0 6px 18px -6px rgb(20 35 31 / 0.14)',
    l: '0 18px 40px -12px rgb(20 35 31 / 0.18)',
  },

  /** Duotone do retrato: fixo nos dois modos, para a foto não inverter no tema escuro. */
  retrato: { duoEscuro: '#1D5752', duoClaro: '#F8F3EA' },

  /** Linha da Vida (assinatura visual). */
  linha: { espessura: 1.5, larguraTrilhaDesktop: '6rem', larguraTrilhaMobile: '2rem' },

  movimento: {
    rapido: '150ms',
    medio: '280ms',
    lento: '520ms',
    curva: 'cubic-bezier(0.22, 0.61, 0.36, 1)',
  },
} as const;

export type Theme = typeof theme;
