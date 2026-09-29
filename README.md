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

## Reputação e materiais impressos

- `/avaliar` é o alvo do QR code. A página agradece e leva ao formulário do Google (`profile.googleBusiness.urlAvaliar`) em um toque. Não tem filtro de satisfação, não oferece benefício, fica fora do sitemap e tem `noindex`.
- `npm run impressos` gera `print/plaquinha-avaliacao.svg` (A5, fontes embutidas), `print/plaquinha-avaliacao.pdf` e `public/og.png` (1200×630), tudo a partir do config. Rode de novo sempre que o domínio, o nome ou o CRM/RQE mudarem. O PDF e a imagem OG precisam de Chromium (`CHROMIUM_PATH`).
- `docs/REPUTACAO.md` traz a mensagem pós-consulta, os modelos de resposta com sigilo médico, o checklist do Perfil da Empresa e a política de moderação.

## SEO local

- JSON-LD `Physician` + `MedicalBusiness` na home e em `/contato` (`src/lib/schema.ts`). Campos com `CONFIRMAR` ficam de fora até serem preenchidos.
- `BreadcrumbList` (visível e em JSON-LD) em `/contato`, `/leitura` e nos artigos. Os artigos também têm `MedicalWebPage` e `Article`.
- Título e descrição por página em `copy.seo`. `sitemap-index.xml` é gerado pelo `@astrojs/sitemap` e `robots.txt` por `src/pages/robots.txt.ts`.
- Não há páginas por bairro ou cidade vizinha. Elas só devem ser criadas se tiverem conteúdo próprio de verdade, para não virar página-doorway.

## Retrato

`<PortraitFrame>` lê `profile.retrato`. O arquivo fica em `src/assets/retrato/`. A largura exibida é calculada a partir da resolução real do arquivo, limitada por `ampliacaoMax`, para a foto nunca ser ampliada de forma visível. Para usar uma foto profissional, basta trocar o arquivo e usar `tratamento: 'natural'`, sem mexer no layout. Com `arquivo: null`, aparece a ilustração de linha.
