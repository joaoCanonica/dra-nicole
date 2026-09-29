import { CONFIRMAR, nomeCompleto, profile } from './profile.config';

/**
 * Todos os textos do site. Nada de texto solto em componente.
 * Regras: sem promessa de resultado, sem superlativo, sem depoimento (o validador confere).
 * Tudo que depende da Dra. leva CONFIRMAR e aparece em docs/PENDENCIAS.md (npm run pendencias).
 */
export const copy = {
  meta: {
    tituloPadrao: `${nomeCompleto} · ${profile.subtitulo}`,
    separador: ' · ',
    descricao: `${nomeCompleto}, ${profile.especialidade.toLowerCase()} em ${profile.endereco.cidade}-${profile.endereco.uf}. Como funciona a consulta, o que levar, como agendar e conteúdos educativos com fonte.`,
  },
  a11y: {
    pularParaConteudo: 'Pular para o conteúdo',
    abreEmNovaAba: '(abre em nova aba)',
    menu: 'Menu principal',
    pendente: 'Pendente de confirmação',
  },
  nav: [
    { rotulo: 'Sobre', href: '/#sobre' },
    { rotulo: 'Antes da consulta', href: '/#consulta' },
    { rotulo: 'Qual consulta?', href: '/#guia' },
    { rotulo: 'Convênios', href: '/#convenios' },
    { rotulo: 'Sala de Leitura', href: '/leitura/' },
    { rotulo: 'Contato', href: '/contato/' },
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

  sobre: {
    eyebrow: 'Sobre',
    titulo: `Quem é a ${nomeCompleto}`,
    paragrafos: [
      `${nomeCompleto} é médica ginecologista e obstetra, com consultório individual em ${profile.endereco.cidade}-${profile.endereco.uf}.`,
      `${CONFIRMAR}: um ou dois parágrafos escritos ou aprovados pela Dra. sobre como ela conduz o atendimento. Sem adjetivos de autopromoção.`,
    ],
    rotulos: {
      registro: 'Registro profissional',
      graduacao: 'Graduação',
      residencia: 'Residência médica',
      titulos: 'Títulos',
      sociedades: 'Sociedades',
      areasAtuacao: 'Áreas de atuação',
    },
  },

  areas: {
    eyebrow: 'Áreas de cuidado',
    titulo: 'Acompanhamento em cada fase',
    texto: 'Cada fase da vida traz dúvidas diferentes. Estes são os assuntos mais comuns em cada uma delas.',
    rotuloLista: 'O que costuma ser acompanhado',
  },

  /** Os cinco marcos da Linha da Vida. Descrevem áreas de atuação, sem promessa de resultado. */
  marcos: {
    revisao: `${CONFIRMAR}: a Dra. atende todas as fases listadas? Realiza partos? Em qual hospital?`,
    itens: [
      {
        id: 'adolescencia',
        eyebrow: 'Fase 1',
        titulo: 'Adolescência e primeira consulta',
        texto: 'A primeira consulta ginecológica é, antes de tudo, uma conversa. Não é preciso ter um problema para marcar.',
        acompanha: ['Ciclo menstrual e cólicas', 'Vacinação', 'Dúvidas sobre o corpo e a sexualidade', 'Orientação sobre métodos contraceptivos'],
      },
      {
        id: 'prevencao',
        eyebrow: 'Fase 2',
        titulo: 'Vida adulta e prevenção',
        texto: 'Consultas de rotina para acompanhar a saúde ginecológica ao longo dos anos.',
        acompanha: ['Exame preventivo do colo do útero', 'Planejamento reprodutivo e contracepção', 'Alterações do ciclo e corrimentos', 'Pedido e revisão de exames de rotina'],
      },
      {
        id: 'gestacao',
        eyebrow: 'Fase 3',
        titulo: 'Gestação e pré-natal',
        texto: 'Do planejamento da gravidez ao acompanhamento pré-natal, com consultas periódicas em cada trimestre.',
        acompanha: ['Consulta antes de engravidar', 'Consultas e exames do pré-natal', 'Vacinas da gestação', 'Orientações para cada etapa'],
      },
      {
        id: 'parto',
        eyebrow: 'Fase 4',
        titulo: 'Parto e puerpério',
        texto: 'O período depois do parto também é acompanhado: é uma fase de muitas mudanças para a mulher e para a família.',
        acompanha: ['Conversa sobre o parto', 'Consulta de pós-parto', 'Amamentação e retorno do ciclo', 'Contracepção após o parto'],
      },
      {
        id: 'climaterio',
        eyebrow: 'Fase 5',
        titulo: 'Climatério e maturidade',
        texto: 'A transição para a menopausa acontece aos poucos, e cada mulher vive essa fase de um jeito.',
        acompanha: ['Mudanças do ciclo e sintomas da transição', 'Conversa sobre opções de tratamento, quando indicado', 'Exames de rotina desta fase', 'Saúde dos ossos e do coração'],
      },
    ],
  },

  consulta: {
    eyebrow: 'Antes da sua consulta',
    titulo: 'Como funciona a consulta',
    convite: 'Traga suas dúvidas anotadas.',
    conviteTexto: 'Na hora é comum esquecer. Uma lista no celular ou num papel ajuda a não deixar nada para trás.',
    duracaoRotulo: 'Duração aproximada',
    duracao: CONFIRMAR,
    passos: [
      {
        titulo: 'O que levar',
        itens: ['Documento com foto', 'Exames anteriores, se tiver', 'Lista de medicações em uso', 'Sua lista de dúvidas', 'Carteirinha do convênio, se for o caso'],
      },
      {
        titulo: 'Chegada e acolhimento',
        texto: `${CONFIRMAR}: como é a recepção (cadastro, tempo de espera, se pode vir acompanhada).`,
      },
      {
        titulo: 'A conversa',
        texto: 'A consulta começa ouvindo você: o motivo da visita, seu histórico de saúde, ciclo menstrual, gestações anteriores e medicações. É o momento de trazer suas dúvidas.',
      },
      {
        titulo: 'Exame físico, quando indicado',
        texto: `Nem toda consulta tem exame físico. Quando for necessário, o motivo é explicado antes e o exame só acontece com a sua concordância. ${CONFIRMAR}: o que costuma ser examinado em cada tipo de consulta.`,
      },
      {
        titulo: 'Orientações',
        texto: `Ao final, você sai sabendo o que foi avaliado e quais são os próximos passos. ${CONFIRMAR}: as orientações e pedidos de exame são entregues por escrito? Impressos ou digitais?`,
      },
      {
        titulo: 'Retorno',
        texto: `${CONFIRMAR}: quando há retorno (ex.: para mostrar exames), como agendar e se tem custo à parte.`,
      },
    ],
  },

  guia: {
    eyebrow: 'Qual consulta é para mim?',
    titulo: 'Um guia rápido para se preparar',
    legenda: 'Em que momento você está?',
    instrucao: 'Escolha uma opção para ver as sugestões.',
    rotulos: { tipo: 'Tipo de consulta', levar: 'O que levar', pergunta: 'Uma pergunta para fazer' },
    fases: [
      {
        id: 'prevencao',
        rotulo: 'Rotina e prevenção',
        tipo: 'Consulta ginecológica de rotina.',
        levar: ['Resultado do último preventivo, se tiver', 'Data da última menstruação', 'Método contraceptivo que usa'],
        pergunta: 'Quais exames de rotina fazem sentido para a minha idade?',
      },
      {
        id: 'gestacao',
        rotulo: 'Gestação ou planejando',
        tipo: 'Consulta pré-concepcional (se está planejando) ou consulta de pré-natal (se já está grávida).',
        levar: ['Teste ou exame de gravidez, se tiver', 'Carteira de vacinação', 'Exames recentes'],
        pergunta: 'Com que frequência serão as consultas e quais exames vêm primeiro?',
      },
      {
        id: 'posparto',
        rotulo: 'Pós-parto',
        tipo: 'Consulta de puerpério (pós-parto).',
        levar: ['Resumo de alta do hospital', 'Caderneta da gestante', 'Lista de medicações em uso'],
        pergunta: 'Que método contraceptivo é compatível com a amamentação?',
      },
      {
        id: 'menopausa',
        rotulo: 'Menopausa',
        tipo: 'Consulta de acompanhamento do climatério.',
        levar: ['Anotações sobre mudanças no ciclo', 'Exames recentes', 'Lista de medicações em uso'],
        pergunta: 'Quais são as opções para lidar com o que tenho sentido?',
      },
      {
        id: 'outra',
        rotulo: 'Outro motivo',
        tipo: 'Consulta ginecológica. Na mensagem de agendamento não é preciso explicar o motivo.',
        levar: ['Exames anteriores, se tiver', 'Lista de medicações em uso', 'Suas dúvidas anotadas'],
        pergunta: 'O que devo observar até a próxima consulta?',
      },
    ],
  },

  convenios: {
    eyebrow: 'Convênios e particular',
    titulo: 'Formas de atendimento',
    pendente: `${CONFIRMAR}: lista de convênios atendidos e se atende particular.`,
    rotuloLista: 'Convênios atendidos',
    comoAgendar: 'Para agendar pelo convênio, informe o nome do plano na mensagem.',
    particular: 'Também há atendimento particular.',
    somenteParticular: 'No momento, o atendimento é apenas particular.',
    somenteConvenio: 'No momento, o atendimento é apenas pelos convênios listados.',
    duvidas: 'Se o seu plano não está na lista, pergunte ao agendar.',
  },

  barraContato: {
    rotulo: 'Contato rápido',
    whatsapp: 'WhatsApp',
    ligar: 'Ligar',
  },

  agendar: {
    eyebrow: 'Como agendar',
    titulo: 'Agendar é simples',
    passos: [
      { titulo: 'Chame no WhatsApp', texto: 'A mensagem já vai pronta. Não é preciso explicar o motivo da consulta.' },
      { titulo: 'Combine dia e horário', texto: 'Você escolhe o período que combina com a sua rotina.' },
      { titulo: 'Receba a confirmação', texto: 'Junto com a confirmação, vão as orientações do que levar no dia.' },
    ],
    revisaoPassos: `${CONFIRMAR}: quem responde o WhatsApp e em quanto tempo? A confirmação inclui o que levar?`,
    cta: 'Chamar no WhatsApp',
    alternativa: 'Prefere ligar?',
    ctaTelefone: 'Ligar para o consultório',
    maisOpcoes: 'Endereço e outras formas de contato',
  },

  contato: {
    eyebrow: 'Contato',
    titulo: 'Como chegar e falar com o consultório',
    descricao: `Endereço, horários, telefone e WhatsApp do consultório em ${profile.endereco.cidade}-${profile.endereco.uf}.`,
    rotulos: {
      endereco: 'Endereço',
      horarios: 'Horários de atendimento',
      telefone: 'Telefone',
      whatsapp: 'WhatsApp',
      comoChegar: 'Como chegar',
      estacionamento: 'Estacionamento',
      acessibilidade: 'Acessibilidade',
    },
    abrirMapa: 'Abrir no Google Maps',
    mapaAlt: `Mapa com a localização do consultório em ${profile.endereco.cidade}-${profile.endereco.uf}`,
    mapaNota: 'O mapa abre no site do Google, fora deste site.',
  },

  formulario: {
    titulo: 'Prefere que o consultório entre em contato?',
    texto: 'Deixe só o seu nome, telefone e o período de preferência. Não peça nem envie informações de saúde por aqui.',
    nome: 'Nome',
    telefone: 'Telefone com DDD',
    telefoneAjuda: 'Ex.: (49) 99999-9999',
    periodo: 'Período de preferência para retorno',
    periodos: [
      { valor: 'manha', rotulo: 'Manhã' },
      { valor: 'tarde', rotulo: 'Tarde' },
      { valor: 'indiferente', rotulo: 'Tanto faz' },
    ],
    enviar: 'Enviar pelo WhatsApp',
    enviarEmail: 'Enviar por e-mail',
    enviarEndpoint: 'Enviar',
    semJs: 'Para enviar por aqui, é preciso JavaScript ativo. Você também pode usar o botão do WhatsApp ou ligar.',
    mensagem: (nome: string, telefone: string, periodo: string) =>
      `Olá, meu nome é ${nome}. Gostaria de agendar uma consulta. Meu telefone é ${telefone} e prefiro retorno no período: ${periodo}.`,
    assunto: 'Pedido de contato para agendamento',
  },

  diasSemana: {
    Monday: 'Segunda', Tuesday: 'Terça', Wednesday: 'Quarta', Thursday: 'Quinta',
    Friday: 'Sexta', Saturday: 'Sábado', Sunday: 'Domingo',
  },

  /** /avaliar: sem filtro de satisfação, sem incentivo, sem exibir avaliações. */
  avaliar: {
    titulo: 'Obrigada pela visita',
    texto: 'Se quiser, conte como foi a sua experiência no Google. Toda opinião é bem-vinda e ajuda o consultório a melhorar.',
    botao: 'Avaliar no Google',
    nota: 'O botão abre o Google. A avaliação é pública, opcional e não envolve nenhum benefício.',
    privacidade: 'Não escreva informações de saúde na avaliação: ela fica visível para qualquer pessoa.',
    contato: 'Prefere falar diretamente com o consultório?',
    contatoLink: 'Ver telefone e WhatsApp',
    meta: 'Deixe sua avaliação no Google sobre o consultório.',
  },

  plaquinha: {
    titulo: 'Sua opinião nos ajuda a melhorar.',
    subtitulo: 'Avalie no Google.',
    instrucao: 'Aponte a câmera do celular para o código.',
  },

  breadcrumbs: { inicio: 'Início' },

  seo: {
    /** Títulos e descrições por página (cidade + especialidade, sem superlativo). */
    home: {
      titulo: `${nomeCompleto} · Ginecologista e obstetra em ${profile.endereco.cidade}-${profile.endereco.uf}`,
      descricao: `Consultório de ginecologia e obstetrícia da ${nomeCompleto} em ${profile.endereco.cidade}-${profile.endereco.uf}. Como funciona a consulta, o que levar e como agendar pelo WhatsApp.`,
    },
    contato: {
      titulo: `Endereço e contato · Ginecologista em ${profile.endereco.cidade}-${profile.endereco.uf}`,
      descricao: `Endereço, horários, telefone e WhatsApp do consultório de ginecologia e obstetrícia da ${nomeCompleto} em ${profile.endereco.cidade}-${profile.endereco.uf}.`,
    },
    leitura: {
      titulo: `Sala de Leitura · Saúde da mulher com fonte`,
      descricao: `Textos informativos sobre ginecologia e gestação, com fontes oficiais e data de revisão. ${nomeCompleto}, ${profile.endereco.cidade}-${profile.endereco.uf}.`,
    },
    ogAlt: `${nomeCompleto} · Ginecologia e Obstetrícia · ${profile.endereco.cidade}-${profile.endereco.uf}`,
  },

  consentimento: {
    titulo: 'Sua privacidade',
    texto: 'Este site pode contar, de forma anônima, quantas pessoas clicam nos botões de contato. Nenhum dado de saúde é coletado. Você aceita?',
    aceitar: 'Aceitar',
    recusar: 'Recusar',
    preferencias: 'Preferências de privacidade',
  },

  ctaFinal: {
    eyebrow: 'Agendamento',
    titulo: 'Quando quiser, é só chamar.',
    texto: 'O agendamento é feito pelo WhatsApp ou por telefone. A mensagem já vai pronta — não é preciso contar nada sobre sua saúde por lá.',
    ctaPrimario: 'Agendar pelo WhatsApp',
    ctaTelefone: 'Ligar para o consultório',
  },
  leitura: {
    eyebrow: 'Sala de Leitura',
    titulo: 'Informação com fonte, em linguagem simples',
    descricao: 'Textos curtos sobre saúde da mulher, escritos a partir de fontes oficiais e com data de revisão. Não substituem a consulta.',
    lerMais: 'Ler artigo',
    tempoLeitura: 'min de leitura',
    publicadoEm: 'Publicado em',
    revisaoPendente: 'Revisão médica pendente',
    cta: 'Quer conversar sobre isso em consulta?',
    ctaBotao: 'Agende pelo WhatsApp',
    voltar: 'Voltar para a Sala de Leitura',
    fontes: 'Fontes',
    revisadoEm: 'Revisado em',
    acessoEm: 'acesso em',
  },
  calendario: {
    eyebrow: 'Calendário de cuidado',
    titulo: 'Datas de conscientização ao longo do ano',
    texto: 'Campanhas nacionais e internacionais ligadas à saúde da mulher. Cada uma leva a um texto da Sala de Leitura.',
    leia: 'Ler sobre o tema',
    meses: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
    mesTodo: 'o mês todo',
  },
  faq: { eyebrow: 'Dúvidas', titulo: 'Perguntas frequentes' },
  rodape: { direitos: 'Todos os direitos reservados.', privacidade: 'Política de privacidade' },
} as const;
