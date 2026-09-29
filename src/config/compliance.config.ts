import { nomeCompleto, profile, registroProfissional } from './profile.config';

export const compliance = {
  /** Se true, o build de produção falha enquanto houver "CONFIRMAR" em config/conteúdo. */
  bloquearDeploySeHouverConfirmar: true,

  avisoEmergenciaTitulo: 'Sinais de urgência',
  avisoEmergencia:
    'Sangramento intenso, dor forte, febre, redução de movimentos do bebê ou qualquer sinal de urgência: procure um pronto atendimento ou ligue 192 (SAMU). Este site não substitui atendimento.',
  samu: { rotulo: 'Ligar 192 (SAMU)', tel: '192' },

  avisoConteudo:
    'Conteúdo informativo e educativo. Não substitui consulta médica, diagnóstico ou tratamento individualizado.',

  rodapeCfm: `${nomeCompleto} · ${profile.especialidade} · ${registroProfissional} · Responsável técnica`,

  avisoWhatsapp:
    'Por segurança e privacidade, não envie sintomas, exames ou informações de saúde pelo WhatsApp. Esse canal é apenas para agendamento.',

  politicaPrivacidade: {
    versao: '0.1.0',
    vigenteDesde: 'CONFIRMAR',
    controlador: nomeCompleto,
    contatoEncarregado: 'CONFIRMAR',
  },

  termosUso: { versao: '0.1.0', vigenteDesde: 'CONFIRMAR' },

  /** Nenhum script de terceiros carrega antes do consentimento. */
  cookies: { usaNaoEssenciais: false },

  guia: {
    aviso:
      'Este guia só ajuda a se preparar para a consulta. Ele não faz triagem, não indica diagnóstico nem tratamento, e nada do que você escolhe aqui é enviado ou guardado.',
  },

  /** Termos proibidos em copy e conteúdo (Res. CFM 2.336/2023). O validador falha se aparecerem. */
  termosProibidos: [
    'melhor', 'melhores', 'referência', 'líder', 'renomad', 'excelência', 'garant', '100%',
    'cura definitiva', 'sem dor', 'depoimento', 'resultado garantido', 'promoção', 'desconto', 'sorteio', 'antes e depois',
  ],

  avaliacao: {
    // Sem incentivo e sem filtro: o convite é o mesmo para qualquer paciente.
    texto:
      'Se quiser compartilhar como foi sua experiência, sua avaliação no Google ajuda outras pessoas a conhecer o consultório. É opcional e não há qualquer benefício vinculado.',
  },
} as const;
