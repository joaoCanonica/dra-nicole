/**
 * Textos de /privacidade e /termos. Gerados a partir do config para o template servir a qualquer profissional.
 * Itens com CONFIRMAR precisam de validação humana (profissional + advogado) antes do go-live.
 */
import { compliance } from './compliance.config';
import { contato } from './contato.config';
import { CONFIRMAR, nomeCompleto, profile, registroProfissional } from './profile.config';

export interface SecaoLegal { id: string; titulo: string; paragrafos?: string[]; lista?: string[]; tabela?: { cabecalho: string[]; linhas: string[][] } }

const e = profile.endereco;
const endereco = [e.logradouro, e.complemento, e.bairro, `${e.cidade}-${e.uf}`, e.cep].filter(Boolean).join(', ');
const pp = compliance.politicaPrivacidade;
const temMetricas = contato.analytics.tipo !== 'nenhum';
const destinoForm = contato.formulario.destino;

export const privacidade = {
  titulo: 'Política de privacidade',
  resumo: `Como ${nomeCompleto} trata dados pessoais neste site, de acordo com a Lei Geral de Proteção de Dados (Lei nº 13.709/2018).`,
  versao: pp.versao,
  vigenteDesde: pp.vigenteDesde,
  secoes: [
    {
      id: 'resumo',
      titulo: 'Em resumo',
      lista: [
        'Este site não coleta dados de saúde. Não há campo para sintomas, exames ou motivo da consulta.',
        'Você pode navegar sem informar nenhum dado pessoal.',
        temMetricas
          ? 'Métricas anônimas só são ativadas se você aceitar. Recusar não muda nada no uso do site.'
          : 'O site não usa cookies de estatística, publicidade ou rastreamento.',
        'Não vendemos nem compartilhamos dados para publicidade.',
      ],
    },
    {
      id: 'controlador',
      titulo: 'Quem é a controladora dos dados',
      paragrafos: [
        `${pp.controlador}, ${profile.especialidade}, ${registroProfissional}.`,
        `Endereço: ${endereco}.`,
        `Contato para assuntos de privacidade (encarregado/canal do titular): ${pp.contatoEncarregado}.`,
      ],
    },
    {
      id: 'dados',
      titulo: 'Quais dados são tratados, para quê e com qual base legal',
      tabela: {
        cabecalho: ['Situação', 'Dados', 'Finalidade', 'Base legal (LGPD)'],
        linhas: [
          ['Navegação no site', 'Endereço IP, data e hora, navegador e página acessada, registrados automaticamente pela hospedagem', 'Segurança e funcionamento do site', 'Legítimo interesse (art. 7º, IX)'],
          ['Formulário "Prefere que o consultório entre em contato?"', 'Nome, telefone e período de preferência', 'Retornar o contato para agendamento', 'Consentimento (art. 7º, I)'],
          ['Botão ou link do WhatsApp', 'Os dados que você enviar na conversa', 'Agendamento', 'Consentimento (art. 7º, I) e procedimentos preliminares a contrato (art. 7º, V)'],
          ['Escolha sobre cookies', 'Sua preferência e a data da escolha, guardadas só no seu navegador', 'Lembrar a sua escolha', 'Legítimo interesse (art. 7º, IX)'],
          ...(temMetricas ? [['Estatística (só se você aceitar)', 'Nome do botão clicado e página, sem identificação', 'Entender quais canais de contato são usados', 'Consentimento (art. 7º, I)']] : []),
        ],
      },
      paragrafos: [
        'Dados de saúde são dados sensíveis (art. 5º, II). Eles não são coletados por este site. Informações de saúde são tratadas apenas no atendimento, conforme o sigilo médico e as normas do Conselho Federal de Medicina.',
      ],
    },
    {
      id: 'compartilhamento',
      titulo: 'Com quem os dados podem ser compartilhados',
      lista: [
        `Provedor de hospedagem do site (${CONFIRMAR}: nome do provedor, ex.: Vercel Inc.), que registra dados técnicos de acesso.`,
        'WhatsApp (Meta): quando você decide abrir uma conversa, o tratamento segue também a política de privacidade do WhatsApp.',
        'Google Maps: só quando você clica em "Abrir no Google Maps". O mapa não é carregado dentro deste site.',
        ...(destinoForm === 'endpoint' ? [`Serviço de formulários (${CONFIRMAR}: nome do serviço), que recebe os dados do formulário.`] : []),
        ...(temMetricas ? [`Serviço de métricas (${CONFIRMAR}: nome do serviço), apenas com o seu consentimento.`] : []),
        'Autoridades públicas, quando houver obrigação legal ou ordem judicial.',
      ],
      paragrafos: [
        `Alguns desses fornecedores podem armazenar dados fora do Brasil. Nesses casos, a transferência segue o art. 33 da LGPD. ${CONFIRMAR}: confirmar os países e as salvaguardas contratuais de cada fornecedor.`,
      ],
    },
    {
      id: 'retencao',
      titulo: 'Por quanto tempo',
      lista: [
        `Contatos do formulário e do WhatsApp: ${CONFIRMAR}: prazo (ex.: até 6 meses após o último contato, se não houver atendimento).`,
        'Registros técnicos de acesso: pelo prazo do provedor de hospedagem e, no mínimo, pelo exigido pelo Marco Civil da Internet (art. 15), quando aplicável.',
        'Preferência de cookies: fica no seu navegador até você apagar os dados de navegação.',
      ],
    },
    {
      id: 'direitos',
      titulo: 'Seus direitos',
      paragrafos: ['Pelo art. 18 da LGPD, você pode, a qualquer momento e sem custo:'],
      lista: [
        'confirmar se tratamos dados seus e ter acesso a eles;',
        'corrigir dados incompletos, inexatos ou desatualizados;',
        'pedir anonimização, bloqueio ou eliminação de dados desnecessários ou tratados em desacordo com a lei;',
        'pedir a portabilidade dos dados;',
        'pedir a eliminação dos dados tratados com base no consentimento;',
        'saber com quem compartilhamos dados;',
        'revogar o consentimento, inclusive o de cookies, pelo link "Preferências de cookies" no rodapé;',
        'reclamar à Autoridade Nacional de Proteção de Dados (ANPD).',
      ],
    },
    {
      id: 'exercer',
      titulo: 'Como exercer seus direitos',
      paragrafos: [
        `Envie seu pedido para ${pp.contatoEncarregado}. Para proteger você, podemos pedir uma forma de confirmar a sua identidade. A resposta será dada em até 15 dias (art. 19, II).`,
      ],
    },
    {
      id: 'cookies',
      titulo: 'Cookies e armazenamento no navegador',
      paragrafos: [
        temMetricas
          ? 'Usamos apenas o armazenamento essencial para lembrar a sua escolha. As métricas anônimas só são ativadas se você aceitar a categoria Estatística.'
          : 'Usamos apenas o armazenamento essencial para lembrar escolhas no navegador. Não há cookies de estatística, publicidade ou rastreamento.',
        'As fontes do site são hospedadas no próprio site, sem chamadas ao Google Fonts.',
      ],
      tabela: {
        cabecalho: ['Categoria', 'Item', 'Tipo', 'Duração'],
        linhas: compliance.cookies.categorias
          .filter((c) => c.obrigatoria || temMetricas)
          .flatMap((c) => c.itens.map((i) => [c.titulo, i.nome, i.tipo, i.duracao])),
      },
    },
    {
      id: 'menores',
      titulo: 'Crianças e adolescentes',
      paragrafos: [
        'O site não é direcionado à coleta de dados de crianças. Adolescentes que queiram agendar devem fazê-lo com um responsável, conforme a regra do consultório.',
      ],
    },
    {
      id: 'seguranca',
      titulo: 'Segurança',
      paragrafos: ['O site é estático, servido por conexão segura (HTTPS), não tem área de login e não guarda dados em banco próprio.'],
    },
    {
      id: 'alteracoes',
      titulo: 'Alterações desta política',
      paragrafos: [`Versão ${pp.versao}, vigente desde ${pp.vigenteDesde}. Mudanças relevantes serão publicadas nesta página, e o aviso de cookies aparecerá de novo quando a mudança afetar o consentimento.`],
    },
  ] satisfies SecaoLegal[],
};

export const termos = {
  titulo: 'Termos de uso',
  resumo: `Regras de uso do site de ${nomeCompleto}.`,
  versao: compliance.termosUso.versao,
  vigenteDesde: compliance.termosUso.vigenteDesde,
  secoes: [
    { id: 'objeto', titulo: 'Sobre este site', paragrafos: [`Este site apresenta o consultório de ${nomeCompleto} (${registroProfissional}), informa como funciona o atendimento e oferece conteúdo educativo sobre saúde da mulher.`] },
    {
      id: 'informativo',
      titulo: 'Conteúdo informativo',
      paragrafos: [
        compliance.avisoConteudo,
        'Os textos citam fontes oficiais e têm data de revisão. Diretrizes de saúde mudam com o tempo; confira a data de revisão de cada texto.',
      ],
    },
    { id: 'urgencia', titulo: 'Não é canal de urgência', paragrafos: [compliance.avisoEmergencia, 'O WhatsApp e o formulário servem apenas para agendamento e não são monitorados de forma contínua.'] },
    { id: 'agendamento', titulo: 'Agendamento', paragrafos: ['Enviar uma mensagem ou o formulário não reserva horário. A consulta só está marcada depois da confirmação do consultório.'] },
    { id: 'propriedade', titulo: 'Propriedade intelectual', paragrafos: ['Textos, imagens e identidade visual pertencem ao consultório ou são usados com autorização. Você pode compartilhar links livremente; reprodução integral depende de autorização.'] },
    { id: 'links', titulo: 'Links externos', paragrafos: ['Links para Google, WhatsApp e fontes oficiais levam a sites de terceiros, com regras e políticas próprias.'] },
    { id: 'privacidade', titulo: 'Privacidade', paragrafos: ['O tratamento de dados pessoais está descrito na Política de privacidade.'] },
    { id: 'lei', titulo: 'Lei aplicável', paragrafos: [`Estes termos seguem a legislação brasileira. Fica eleito o foro da comarca de ${CONFIRMAR}: comarca (ex.: ${e.cidade}-${e.uf}), respeitados os direitos do consumidor.`] },
  ] satisfies SecaoLegal[],
};
