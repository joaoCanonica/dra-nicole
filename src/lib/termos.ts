import { compliance } from '../config/compliance.config';

export interface Ocorrencia { termo: string; motivo: string; trecho: string }

const regexes = compliance.termosVetados.map(({ termo, motivo }) => {
  if (termo.startsWith('re:')) return { termo, motivo, re: new RegExp(termo.slice(3), 'iu') };
  const prefixo = termo.endsWith('*');
  const base = termo.replace(/\*$/, '').replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  return { termo, motivo, re: new RegExp(`(^|[^\\p{L}\\d])${base}${prefixo ? '' : '(?![\\p{L}\\d])'}`, 'iu') };
});

/** Retorna os termos vetados encontrados no texto (vazio = ok). */
export function termosVetados(texto: string): Ocorrencia[] {
  const achados: Ocorrencia[] = [];
  for (const { termo, motivo, re } of regexes) {
    const m = re.exec(texto);
    if (m) {
      const i = Math.max(0, m.index - 40);
      achados.push({ termo, motivo, trecho: texto.slice(i, m.index + m[0].length + 40).replace(/\s+/g, ' ').trim() });
    }
  }
  return achados;
}
