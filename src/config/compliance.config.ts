import { nomeCompleto, profile, registroProfissional } from './profile.config';

export const compliance = {
  /** Se true, o build de produção falha enquanto houver "CONFIRMAR" em config/conteúdo. */
  bloquearDeploySeHouverConfirmar: true,

  avisoEmergencia:
    'Em caso de sangramento intenso, dor forte, febre alta, perda de líquido ou diminuição dos movimentos do bebê, procure imediatamente um pronto atendimento ou ligue 192 (SAMU). O WhatsApp não é canal de urgência.',

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

  avaliacao: {
    // Sem incentivo e sem filtro: o convite é o mesmo para qualquer paciente.
    texto:
      'Se quiser compartilhar como foi sua experiência, sua avaliação no Google ajuda outras pessoas a conhecer o consultório. É opcional e não há qualquer benefício vinculado.',
  },
} as const;
