# Template-mãe — site de profissional de saúde (Astro)

Tudo o que é específico da pessoa vive em `src/config/` e `src/content/`. Os componentes não têm texto, cor nem dado fixo.

| Arquivo | Conteúdo |
|---|---|
| `src/config/profile.config.ts` | nome, CRM/RQE, endereço, contatos, Google Business, convênios, domínio |
| `src/config/theme.config.ts` | paleta clara/escura, pares de contraste, tipografia, escalas, raios, sombras, movimento |
| `src/config/compliance.config.ts` | avisos legais, emergência, rodapé CFM, versões da política, `bloquearDeploySeHouverConfirmar` |
| `src/config/copy.pt-BR.ts` | todos os textos do site |
| `src/content/artigos`, `src/content/faq` | content collections (schema em `src/content.config.ts`) |

`CONFIRMAR` marca informação que depende da profissional. Fora de produção gera aviso; em produção (`VERCEL_ENV=production` ou `SITE_ENV=production`) **falha o build**.

```sh
npm run validate       # campos obrigatórios + contraste AA + lista de CONFIRMAR
npm run validate:prod  # igual, mas CONFIRMAR vira erro
npm run check          # validate + astro check (TS strictest)
npm run build          # validate (--build) + astro build
```

Node 22 e npm 10 estão fixados em `engines`, `packageManager` e `.nvmrc`.

## Assinatura visual: Linha da Vida

- `src/lib/linha.ts` define a geometria de cada trecho (`inicio`, `onda`, `ventre`, `fim`). Todo trecho entra e sai no centro da trilha, na vertical, então os trechos se emendam numa linha contínua.
- `src/components/linha/Trecho.astro` vai no slot `trilha` de `<Section trilha>`. Com CSS scroll-driven (`view-timeline`) a linha se desenha com o scroll. Sem suporte, entra um fallback com IntersectionObserver. Sem JS ou com `prefers-reduced-motion`, a linha aparece inteira e estática.
- Os marcos das seções vêm de `copy.marcos.itens`. A gestação usa a curva de ventre.

## Retrato

`<PortraitFrame>` lê `profile.retrato`. O arquivo fica em `src/assets/retrato/`. A largura exibida é calculada a partir da resolução real do arquivo, limitada por `ampliacaoMax`, para a foto nunca ser ampliada de forma visível. Para usar uma foto profissional, basta trocar o arquivo e usar `tratamento: 'natural'`, sem mexer no layout. Com `arquivo: null`, aparece a ilustração de linha.
