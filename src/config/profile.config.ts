/**
 * Dados da profissional. Tudo que é específico da pessoa vive aqui.
 * Valores "CONFIRMAR" dependem da própria profissional e bloqueiam o deploy de produção
 * (ver compliance.config.ts → bloquearDeploySeHouverConfirmar).
 */
export const CONFIRMAR = 'CONFIRMAR' as const;

export interface Horario {
  dias: string;
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
  whatsapp: { e164: string; mensagemPadrao: string };
  instagram: { usuario: string; url: string };
  email?: string;
  googleBusiness: { placeId: string; urlAvaliar: string };
  convenios: string[] | typeof CONFIRMAR;
  atendeParticular: boolean | typeof CONFIRMAR;
  dominio: string;
  idioma: string;
  /**
   * Retrato. `arquivo` é o nome do arquivo em src/assets/retrato/ (null = usa a ilustração de linha).
   * Para trocar por uma foto profissional: substitua o arquivo e ajuste `tratamento`; o layout não muda.
   */
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
    e164: CONFIRMAR,
    mensagemPadrao: 'Olá, gostaria de agendar uma consulta.',
  },
  instagram: { usuario: CONFIRMAR, url: CONFIRMAR },
  googleBusiness: { placeId: CONFIRMAR, urlAvaliar: CONFIRMAR },
  convenios: CONFIRMAR,
  atendeParticular: CONFIRMAR,
  dominio: 'https://example.com',
  idioma: 'pt-BR',
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
export const whatsappUrl = `https://wa.me/${profile.whatsapp.e164.replace(/\D/g, '')}?text=${encodeURIComponent(
  profile.whatsapp.mensagemPadrao,
)}`;
