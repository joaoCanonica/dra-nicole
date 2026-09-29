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
    { rotulo: 'Artigos', href: '/artigos/' },
  ],
  hero: {
    eyebrow: profile.especialidade,
    titulo: `Cuidado ginecológico e obstétrico, com orientação clara em cada etapa.`,
    detalheManuscrito: 'cuidado',
    texto: `Consultório individual em ${profile.endereco.cidade}-${profile.endereco.uf}. Aqui você encontra como funciona a consulta, o que levar e como agendar.`,
    ctaPrimario: 'Agendar pelo WhatsApp',
    ctaSecundario: 'Como é a consulta',
  },
  consulta: {
    eyebrow: 'Antes de vir',
    titulo: 'Como é a consulta',
    duracao: CONFIRMAR,
    etapas: [CONFIRMAR],
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
