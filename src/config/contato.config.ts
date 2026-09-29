import { CONFIRMAR } from './profile.config';

/**
 * Funil de contato. Nada aqui coleta dado de saúde.
 * - formulario.destino: 'whatsapp' (monta a mensagem e abre o WhatsApp; precisa de JS),
 *   'mailto' (abre o e-mail do visitante; funciona sem JS) ou 'endpoint' (POST para um serviço
 *   de formulários configurado aqui; funciona sem JS). Não há backend próprio.
 * - analytics: 'nenhum' por padrão. Com outro tipo, aparece o pedido de consentimento e nada é
 *   carregado ou enviado antes do "Aceitar". Eventos são anônimos (nome do evento + caminho da página).
 */
export type Analytics =
  | { tipo: 'nenhum' }
  | { tipo: 'beacon'; endpoint: string }
  | { tipo: 'plausible'; script: string; dominio: string };

export const contato = {
  formulario: {
    habilitado: true,
    destino: 'whatsapp' as 'whatsapp' | 'mailto' | 'endpoint',
    email: '' as string, // para 'mailto'
    endpoint: '' as string, // para 'endpoint' (ex.: serviço de formulários com DPA/LGPD)
  },
  analytics: { tipo: 'nenhum' } as Analytics,
  mapa: {
    /** Imagem estática do mapa em src/assets/mapa/ (self-hosted). null = cartão ilustrado. */
    imagem: null as string | null,
    urlGoogleMaps: CONFIRMAR as string,
  },
  comoChegar: `${CONFIRMAR}: ponto de localização (ex.: próximo a…), andar/sala, entrada.`,
  estacionamento: `${CONFIRMAR}: há estacionamento próprio, conveniado ou na rua?`,
  acessibilidade: `${CONFIRMAR}: acesso para cadeira de rodas, elevador, banheiro adaptado.`,
};
