import { CONFIRMAR, nomeCompleto, profile } from './profile.config';

/** Todos os textos do site. Nada de texto solto em componente. */
export const copy = {
  meta: {
    tituloPadrao: `${nomeCompleto} · ${profile.subtitulo}`,
    separador: ' · ',
    descricao: `${nomeCompleto}, ${profile.especialidade.toLowerCase()} em ${profile.endereco.cidade}-${profile.endereco.uf}. Informações sobre a consulta, como agendar e conteúdos educativos com fonte.`,
  },
  a11y: {
    pularParaConteudo: 'Pular para o conteúdo',
    abreEmNovaAba: '(abre em nova aba)',
    menu: 'Menu principal',
  },
  nav: [
    { rotulo: 'Início', href: '/' },
    { rotulo: 'Como funciona a consulta', href: '/#consulta' },
    { rotulo: 'Artigos', href: '/artigos/' },
  ],
  hero: {
    eyebrow: 'Ginecologia & Obstetrícia',
    titulo: 'Cuidado ginecológico e obstétrico em todas as fases da vida',
    /** Remover o CONFIRMAR quando a Dra. aprovar o título. */
    revisaoTitulo: `${CONFIRMAR}: título aprovado pela Dra.`,
    texto: `Consultório individual em ${profile.endereco.cidade}-${profile.endereco.uf}. Veja como funciona a consulta, o que levar e agende pelo WhatsApp ou telefone.`,
    ctaPrimario: 'Agendar pelo WhatsApp',
    ctaSecundario: 'Como funciona a consulta',
    ctaSecundarioHref: '#consulta',
  },
  /** Os cinco marcos da Linha da Vida. Descrevem áreas de atuação, sem promessa de resultado. */
  marcos: {
    revisao: `${CONFIRMAR}: a Dra. atende todas as fases listadas? Realiza partos? Em qual hospital?`,
    itens: [
      {
        id: 'adolescencia',
        eyebrow: 'Fase 1',
        titulo: 'Adolescência e primeira consulta',
        texto: 'A primeira consulta ginecológica é um momento de conversa: ciclo menstrual, vacinação, dúvidas sobre o corpo e orientações para cuidar da saúde desde cedo.',
      },
      {
        id: 'prevencao',
        eyebrow: 'Fase 2',
        titulo: 'Vida adulta e prevenção',
        texto: 'Consultas de rotina, exame preventivo do colo do útero, planejamento reprodutivo e orientação sobre métodos contraceptivos.',
      },
      {
        id: 'gestacao',
        eyebrow: 'Fase 3',
        titulo: 'Gestação e pré-natal',
        texto: 'Do planejamento da gravidez ao acompanhamento pré-natal: consultas periódicas, exames de cada trimestre e orientações para cada etapa.',
      },
      {
        id: 'parto',
        eyebrow: 'Fase 4',
        titulo: 'Parto e puerpério',
        texto: 'Orientações sobre o parto e acompanhamento no pós-parto, período de muitas mudanças para a mulher e para a família.',
      },
      {
        id: 'climaterio',
        eyebrow: 'Fase 5',
        titulo: 'Climatério e maturidade',
        texto: 'Acompanhamento na transição para a menopausa e cuidados com a saúde nas fases seguintes da vida.',
      },
    ],
  },
  consulta: {
    eyebrow: 'Antes de vir',
    titulo: 'Como funciona a consulta',
    duracaoTitulo: 'Duração',
    duracao: CONFIRMAR,
    etapasTitulo: 'O que acontece',
    etapas: [CONFIRMAR],
    oQueLevarTitulo: 'O que levar',
    oQueLevar: [
      'Documento com foto',
      'Carteirinha do convênio, se for o caso',
      'Exames anteriores, se houver',
      'Lista de medicamentos em uso',
    ],
  },
  agendamento: {
    titulo: 'Agendamento',
    texto: 'O agendamento é feito pelo WhatsApp ou por telefone.',
    convenios: 'Convênios atendidos',
  },
  ctaFinal: {
    eyebrow: 'Agendamento',
    titulo: 'Quando quiser, é só chamar.',
    texto: 'O agendamento é feito pelo WhatsApp ou por telefone. A mensagem já vai pronta — não é preciso contar nada sobre sua saúde por lá.',
    ctaPrimario: 'Agendar pelo WhatsApp',
    ctaTelefone: 'Ligar para o consultório',
  },
  artigos: {
    titulo: 'Artigos',
    descricao: 'Conteúdos informativos com fontes citadas e data de revisão.',
    lerMais: 'Ler artigo',
    fontes: 'Fontes',
    revisadoEm: 'Revisado em',
    acessoEm: 'acesso em',
  },
  faq: { titulo: 'Perguntas frequentes' },
  rodape: { direitos: 'Todos os direitos reservados.', privacidade: 'Política de privacidade' },
} as const;
