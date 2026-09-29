/**
 * Calendário de cuidado: datas de conscientização pertinentes à especialidade.
 * `artigo` = id (nome do arquivo sem extensão) em src/content/artigos. O validador confere se existe.
 */
export interface DataCuidado {
  id: string;
  nome: string;
  mes: number; // 1–12
  dia?: number; // ausente = o mês todo
  tema: string;
  artigo: string | null;
  cor: 'lilas' | 'amarelo' | 'rosa' | 'dourado' | 'agua';
}

export const calendario: DataCuidado[] = [
  { id: 'dia-mulher', nome: 'Dia Internacional da Mulher', mes: 3, dia: 8, tema: 'Saúde da mulher em todas as fases', artigo: 'menopausa-e-climaterio', cor: 'agua' },
  { id: 'marco-lilas', nome: 'Março Lilás', mes: 3, tema: 'Prevenção do câncer do colo do útero', artigo: 'prevencao-cancer-colo-do-utero', cor: 'lilas' },
  { id: 'marco-amarelo', nome: 'Março Amarelo', mes: 3, tema: 'Conscientização sobre a endometriose', artigo: 'endometriose', cor: 'amarelo' },
  { id: 'dia-obstetra', nome: 'Dia do Obstetra', mes: 4, dia: 12, tema: 'Acompanhamento da gestação', artigo: 'pre-natal-o-que-esperar', cor: 'agua' },
  { id: 'mortalidade-materna', nome: 'Dia Nacional de Redução da Mortalidade Materna', mes: 5, dia: 28, tema: 'Cuidado no pós-parto', artigo: 'cuidados-no-puerperio', cor: 'rosa' },
  { id: 'agosto-dourado', nome: 'Agosto Dourado', mes: 8, tema: 'Aleitamento materno', artigo: 'cuidados-no-puerperio', cor: 'dourado' },
  { id: 'outubro-rosa', nome: 'Outubro Rosa', mes: 10, tema: 'Detecção precoce do câncer de mama', artigo: 'saude-mamaria-e-rastreamento', cor: 'rosa' },
  { id: 'dia-menopausa', nome: 'Dia Mundial da Menopausa', mes: 10, dia: 18, tema: 'Climatério e menopausa', artigo: 'menopausa-e-climaterio', cor: 'lilas' },
];
