import { CONFIRMAR, nomeCompleto, profile } from './profile.config';

export const compliance = {
  /** Se true, o build de produção falha enquanto houver "CONFIRMAR" em config/conteúdo. */
  bloquearDeploySeHouverConfirmar: true,

  avisoEmergenciaTitulo: 'Sinais de urgência',
  avisoEmergencia:
    'Sangramento intenso, dor forte, febre, redução de movimentos do bebê ou qualquer sinal de urgência: procure um pronto atendimento ou ligue 192 (SAMU). Este site não substitui atendimento.',
  samu: { rotulo: 'Ligar 192 (SAMU)', tel: '192' },

  avisoConteudo:
    'Conteúdo informativo e educativo. Não substitui consulta médica, diagnóstico ou tratamento individualizado.',

  /**
   * Identificação exigida na publicidade médica (Res. CFM 2.336/2023): nome, CRM/UF, RQE e especialidade
   * vêm de profile.config. Estabelecimento e diretor técnico: preencher se houver pessoa jurídica
   * (clínica registrada no CRM); em consultório de pessoa física, use `estabelecimento: null`.
   */
  cfm: {
    rotuloResponsavel: 'Responsável técnica',
    estabelecimento: {
      nome: `${CONFIRMAR}: nome do estabelecimento (ou null se consultório de pessoa física)`,
      cnpj: CONFIRMAR as string | null,
      registroCrm: `${CONFIRMAR}: nº de inscrição do estabelecimento no CRM-${profile.crm.uf}`,
      diretorTecnico: `${CONFIRMAR}: nome e CRM do diretor técnico (pode ser a própria ${nomeCompleto})`,
    } as { nome: string; cnpj: string | null; registroCrm: string; diretorTecnico: string } | null,
  },

  avisoWhatsapp:
    'Por segurança e privacidade, não envie sintomas, exames ou informações de saúde pelo WhatsApp. Esse canal é apenas para agendamento.',

  politicaPrivacidade: {
    versao: '0.1.0',
    vigenteDesde: 'CONFIRMAR',
    controlador: nomeCompleto,
    contatoEncarregado: 'CONFIRMAR',
  },

  termosUso: { versao: '0.1.0', vigenteDesde: 'CONFIRMAR' },

  /**
   * Categorias de cookies/armazenamento. "estatistica" só vale se contato.analytics.tipo !== 'nenhum'.
   * Mudar `versaoConsentimento` faz o banner aparecer de novo para todos.
   */
  cookies: {
    versaoConsentimento: '1',
    chave: 'consentimento-cookies',
    categorias: [
      {
        id: 'essenciais',
        obrigatoria: true,
        titulo: 'Essenciais',
        descricao: 'Guardam apenas a sua escolha sobre cookies. Não identificam você e não são enviados a ninguém.',
        itens: [{ nome: 'consentimento-cookies', tipo: 'armazenamento local do navegador', duracao: 'até você limpar os dados do navegador' }],
      },
      {
        id: 'estatistica',
        obrigatoria: false,
        titulo: 'Estatística',
        descricao: 'Contam, de forma anônima, quantas pessoas clicam nos botões de contato. Não coletam dados de saúde nem identificam você.',
        itens: [{ nome: 'evento anônimo (sem cookie)', tipo: 'envio ao serviço de métricas configurado', duracao: 'não armazena nada no navegador' }],
      },
    ],
  },

  /** Texto de consentimento do formulário de contato (LGPD, art. 7º, I). */
  consentimentoFormulario:
    'Autorizo o uso do meu nome e telefone apenas para retorno sobre agendamento. Os dados não são usados para outra finalidade nem compartilhados.',

  guia: {
    aviso:
      'Este guia só ajuda a se preparar para a consulta. Ele não faz triagem, não indica diagnóstico nem tratamento, e nada do que você escolhe aqui é enviado ou guardado.',
  },

  /**
   * Fontes aceitas nos artigos (host termina com um destes domínios).
   * Ministério da Saúde e órgãos (gov.br, Fiocruz), INCA, FEBRASGO, SBP, OMS/OPAS, SBMFC, SBIm, SBM.
   */
  fontesPermitidas: [
    'gov.br', 'fiocruz.br', 'febrasgo.org.br', 'sbp.com.br', 'who.int', 'paho.org',
    'sbmfc.org.br', 'sbim.org.br', 'sbmastologia.com.br',
    'bvs.br', // BIREME/OPAS (Biblioteca Virtual em Saúde)
  ],

  artigos: {
    avisoPadrao: 'Conteúdo informativo; não substitui consulta.',
    palavrasMin: 400,
    palavrasMax: 700,
  },

  /**
   * Termos vetados (publicidade médica, Res. CFM 2.336/2023 + urgência artificial).
   * Formato: palavra inteira; "*" no fim = qualquer terminação; "re:" = expressão regular.
   * ANTES DO GO-LIVE: conferir o texto vigente da resolução e ajustar esta lista.
   * Títulos e URLs de fontes citadas (atributo data-citacao / linhas nome:/url:) não são verificados.
   */
  termosVetados: [
    { termo: 'melhor', motivo: 'superlativo' },
    { termo: 'melhores', motivo: 'superlativo' },
    { termo: 'referência', motivo: 'autopromoção' },
    { termo: 'líder', motivo: 'superlativo' },
    { termo: 'renomad*', motivo: 'autopromoção' },
    { termo: 'excelência', motivo: 'autopromoção' },
    { termo: 'número 1', motivo: 'superlativo' },
    { termo: 'garant*', motivo: 'promessa de resultado' },
    { termo: 're:resultados?\\s+(garantid|comprovad|imediat|definitiv|assegurad|cert[oa]s?\\b)', motivo: 'promessa de resultado' },
    { termo: '100%', motivo: 'promessa de resultado' },
    { termo: 'cura definitiva', motivo: 'promessa de resultado' },
    { termo: 'sem dor', motivo: 'promessa de resultado' },
    { termo: 'depoimento*', motivo: 'depoimento de paciente' },
    { termo: 'antes e depois', motivo: 'antes e depois' },
    { termo: 'promoç*', motivo: 'promoção' },
    { termo: 'promocional', motivo: 'promoção' },
    { termo: 'desconto*', motivo: 'promoção' },
    { termo: 'sorteio*', motivo: 'sorteio' },
    { termo: 'brinde*', motivo: 'incentivo' },
    { termo: 'preço*', motivo: 'preço' },
    { termo: 're:R\\$\\s?\\d', motivo: 'preço' },
    { termo: 'vagas limitadas', motivo: 'urgência artificial' },
    { termo: 'últimas vagas', motivo: 'urgência artificial' },
  ],

  avaliacao: {
    // Sem incentivo e sem filtro: o convite é o mesmo para qualquer paciente.
    texto:
      'Se quiser compartilhar como foi sua experiência, sua avaliação no Google ajuda outras pessoas a conhecer o consultório. É opcional e não há qualquer benefício vinculado.',
  },
} as const;
