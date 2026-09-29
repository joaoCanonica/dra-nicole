/**
 * Dados da profissional. Tudo que é específico da pessoa vive aqui.
 * Valores "CONFIRMAR" dependem da própria profissional e bloqueiam o deploy de produção
 * (ver compliance.config.ts → bloquearDeploySeHouverConfirmar).
 */
export const CONFIRMAR = 'CONFIRMAR' as const;

export type DiaSemana = 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday' | 'Sunday';

/** Ex.: { dias: ['Monday', 'Wednesday'], abre: '08:00', fecha: '12:00' }. Usado na página e no schema. */
export interface Horario {
  dias: DiaSemana[];
  abre: string;
  fecha: string;
}

export interface Profile {
  nome: string;
  nomeCurto: string;
  tratamento: 'Dra.' | 'Dr.' | 'Dre.' | '';
  especialidade: string;
  subtitulo: string;
  crm: { numero: string; uf: string };
  rqe: string[];
  endereco: {
    logradouro: string;
    complemento?: string;
    bairro: string;
    cidade: string;
    uf: string;
    cep: string;
    urlMapa: string;
  };
  coordenadas: { lat: number | null; lng: number | null };
  horarios: Horario[] | typeof CONFIRMAR;
  telefone: { exibicao: string; e164: string };
  /** WhatsApp: link final = https://wa.me/<ddi><numero>?text=<mensagemPadrao>. */
  whatsapp: { ddi: string; numero: string; mensagemPadrao: string };
  instagram: { usuario: string; url: string };
  email?: string;
  /** urlAvaliar: link "Escrever avaliação" do Perfil da Empresa (ex.: https://g.page/r/XXXX/review). */
  googleBusiness: { placeId: string; urlAvaliar: string; urlPerfil: string };
  convenios: string[] | typeof CONFIRMAR;
  atendeParticular: boolean | typeof CONFIRMAR;
  dominio: string;
  idioma: string;
  /**
   * Retrato. `arquivo` é o nome do arquivo em src/assets/retrato/ (null = usa a ilustração de linha).
   * Para trocar por uma foto profissional: substitua o arquivo e ajuste `tratamento`; o layout não muda.
   */
  /** Formação e atuação. Só publicar o que a profissional confirmar. */
  formacao: {
    graduacao: string;
    residencia: string;
    titulos: string[];
    sociedades: string[];
    areasAtuacao: string[];
  };
  retrato: {
    arquivo: string | null;
    alt: string;
    tratamento: 'duotone' | 'natural';
    /** Ampliação máxima em relação ao tamanho real do arquivo (evita upscale visível). */
    ampliacaoMax: number;
  };
}

export const profile: Profile = {
  nome: 'Nicole V. Zanette',
  nomeCurto: 'Nicole',
  tratamento: 'Dra.',
  especialidade: 'Ginecologia e Obstetrícia',
  subtitulo: 'Ginecologista e obstetra em Lages-SC',
  crm: { numero: CONFIRMAR, uf: 'SC' },
  rqe: [CONFIRMAR],
  endereco: {
    logradouro: CONFIRMAR,
    bairro: CONFIRMAR,
    cidade: 'Lages',
    uf: 'SC',
    cep: CONFIRMAR,
    urlMapa: CONFIRMAR,
  },
  coordenadas: { lat: null, lng: null },
  horarios: CONFIRMAR,
  telefone: { exibicao: CONFIRMAR, e164: CONFIRMAR },
  // A mensagem padrão NUNCA pede sintoma ou dado clínico (LGPD).
  whatsapp: {
    ddi: '55',
    numero: CONFIRMAR, // DDD + número, só dígitos (ex.: 49999999999)
    mensagemPadrao: 'Olá, gostaria de agendar uma consulta.',
  },
  instagram: { usuario: CONFIRMAR, url: CONFIRMAR },
  googleBusiness: { placeId: CONFIRMAR, urlAvaliar: CONFIRMAR, urlPerfil: CONFIRMAR },
  convenios: CONFIRMAR,
  atendeParticular: CONFIRMAR,
  dominio: 'https://example.com',
  idioma: 'pt-BR',
  formacao: {
    graduacao: `${CONFIRMAR}: curso, instituição e ano`,
    residencia: `${CONFIRMAR}: residência em Ginecologia e Obstetrícia, instituição e ano`,
    titulos: [`${CONFIRMAR}: título de especialista (ex.: TEGO/FEBRASGO), se houver`],
    sociedades: [`${CONFIRMAR}: sociedades das quais é membro`],
    areasAtuacao: [`${CONFIRMAR}: áreas de atuação registradas`],
  },
  retrato: {
    // Fonte atual: 150×150 px (baixa resolução) → duotone + grão, tamanho contido.
    arquivo: 'dra-nicole.jpg',
    alt: 'Retrato da Dra. Nicole V. Zanette',
    tratamento: 'duotone',
    ampliacaoMax: 1.5,
  },
};

export const nomeCompleto = [profile.tratamento, profile.nome].filter(Boolean).join(' ');
export const registroProfissional = `CRM-${profile.crm.uf} ${profile.crm.numero}${
  profile.rqe.length ? ` · RQE ${profile.rqe.join(', ')}` : ''
}`;
/** Link do WhatsApp com mensagem neutra (nunca inclui dado clínico). */
/** Enquanto o número não for preenchido, os botões levam para /contato/ em vez de gerar link quebrado. */
const SEM_NUMERO = '/contato/';
export function linkWhatsapp(mensagem: string = profile.whatsapp.mensagemPadrao): string {
  if (profile.whatsapp.numero === CONFIRMAR) return SEM_NUMERO;
  const numero = `${profile.whatsapp.ddi}${profile.whatsapp.numero}`.replace(/\D/g, '');
  return `https://wa.me/${numero}?text=${encodeURIComponent(mensagem)}`;
}
export const whatsappUrl = linkWhatsapp();
export const telefoneUrl =
  profile.telefone.e164 === CONFIRMAR ? SEM_NUMERO : `tel:${profile.telefone.e164.replace(/[^\d+]/g, '')}`;
