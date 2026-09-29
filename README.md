# Template-mãe: site de profissional de saúde

Site estático (Astro + TypeScript strict, CSS próprio, JS mínimo) para profissionais individuais de saúde. Foi feito para seguir a publicidade médica (CFM), a LGPD e o WCAG 2.2 AA desde o começo.

**Regra de ouro:** tudo o que é da pessoa (nome, registro, textos, cores, contatos, artigos, fotos) vive em `src/config/`, `src/content/` e `src/assets/`. **Não se edita componente para criar um novo site.**

- Node 22 e npm 10.9.7, fixados em `package.json` (`engines`, `packageManager`) e em `.nvmrc`.
- Hospedagem: Vercel (`vercel.json` já traz headers de segurança, cache e redirect de `www`).

---

## Criar o próximo profissional em 30 minutos

Antes de começar, tenha em mãos: nome completo, CRM/UF, RQE, especialidade, endereço, telefone, WhatsApp, horários, convênios, Instagram, links do Perfil da Empresa no Google (avaliar e perfil), domínio e uma foto.

### 1. Copiar (2 min)
```sh
git clone <este-repo> novo-site && cd novo-site
rm -rf .git && git init
nvm use            # Node 22
npm ci
```

### 2. Dados da pessoa: `src/config/profile.config.ts` (8 min)
- `nome`, `nomeCurto`, `tratamento`, `especialidade`, `subtitulo`
- `crm { numero, uf }`, `rqe []`
- `endereco`, `coordenadas`, `horarios` (ex.: `{ dias: ['Monday', 'Tuesday'], abre: '08:00', fecha: '12:00' }`)
- `telefone`, `whatsapp { ddi, numero, mensagemPadrao }` (a mensagem **nunca** pede sintoma)
- `instagram`, `googleBusiness { placeId, urlAvaliar, urlPerfil }`
- `convenios`, `atendeParticular`, `formacao`
- `dominio`: o domínio definitivo. Ele alimenta o `site` do Astro, o canonical, o sitemap, o `robots.txt`, o JSON-LD e o QR code.
- `retrato`: coloque a foto em `src/assets/retrato/` e informe o nome do arquivo. Use `tratamento: 'duotone'` para foto de baixa resolução e `'natural'` para foto profissional.

Não sabe algum dado? Deixe `CONFIRMAR`. O site funciona em desenvolvimento e em preview, mas **o deploy de produção fica bloqueado** até tudo ser preenchido.

### 3. Identidade visual: `src/config/theme.config.ts` (5 min)
- Troque a paleta (`cores.claro` e `cores.escuro`). O build confere o contraste AA de cada par declarado em `contraste` e falha se algum não passar.
- Fontes: troque os pacotes `@fontsource` em `src/styles/global.css` e os nomes em `tipografia`. Não use Google Fonts remoto.
- Não reaproveite a paleta nem a assinatura visual de outro cliente.

### 4. Textos e regras (8 min)
| Arquivo | O que revisar |
|---|---|
| `src/config/copy.pt-BR.ts` | hero, sobre, fases da Linha da Vida (`marcos`), "Como funciona a consulta", guia, convênios, SEO por página |
| `src/config/compliance.config.ts` | rótulo do responsável técnico, estabelecimento e diretor técnico, versões da política, termos vetados |
| `src/config/contato.config.ts` | destino do formulário (`whatsapp`, `mailto` ou `endpoint`), métricas (padrão `nenhum`), mapa, como chegar |
| `src/config/legal.pt-BR.ts` | encarregado, provedor de hospedagem, retenção, foro (revisão jurídica obrigatória) |
| `src/config/calendario.config.ts` | datas de conscientização da especialidade, cada uma ligada a um artigo |

### 5. Conteúdo (5 min para começar)
- **Artigos** em `src/content/artigos/*.md`. O frontmatter é obrigatório: `titulo`, `resumo`, `categoria`, `publicadoEm`, `revisadoEm`, `revisaoMedica`, `fontes[]` (nome, url e dataAcesso).
  - Só entram fontes de `compliance.fontesPermitidas`.
  - O texto precisa ter de 400 a 700 palavras.
  - Deixe `revisaoMedica: CONFIRMAR` até o profissional aprovar.
  - Apague os artigos de outra especialidade e ajuste as `categoria`s em `src/content.config.ts`.
- **FAQ** em `src/content/faq/*.md`.

### 6. Validar (2 min)
```sh
npm run check          # config, contraste, termos vetados, tipos
npm run pendencias     # lista tudo que ainda é CONFIRMAR em docs/PENDENCIAS.md
npm run build          # build + CSP + auditoria de conformidade
npm run impressos      # plaquinha A5 com QR (/avaliar) e og.png, a partir do config
npm run audit:a11y     # axe-core (precisa de Chromium: CHROMIUM_PATH)
npm run audit:lighthouse
```

### 7. Publicar na Vercel (poucos minutos)
1. Importe o repositório na Vercel. O `vercel.json` já define framework, `npm ci`, `npm run build` e `dist`.
2. Em **Settings → Domains**, adicione o domínio e o `www.` (o `vercel.json` redireciona `www` para o domínio principal).
3. O deploy de **preview** fica verde mesmo com pendências. O de **produção** (`VERCEL_ENV=production`) só passa sem nenhum `CONFIRMAR`, sem termo vetado e com o domínio definitivo.
4. Depois do primeiro deploy: rode o Rich Results Test, envie o sitemap ao Search Console e teste no celular.

---

## O que bloqueia o deploy de produção

`npm run build` roda, nesta ordem:
1. `scripts/validate-config.ts --build`: campos obrigatórios, contraste AA, termos vetados, campos do formulário, número do WhatsApp, link de avaliação do Google, domínio e **qualquer `CONFIRMAR`** (este último só em produção).
2. `astro build`.
3. `scripts/gerar-csp.ts`: injeta uma Content-Security-Policy com o hash de cada script inline.
4. `scripts/audit-compliance.ts`: varre o HTML final (termos vetados, identificação CFM em toda página, recursos de terceiros sem consentimento, campos de formulário, CSP presente).

## Comandos

| Comando | Para quê |
|---|---|
| `npm run dev` | desenvolvimento |
| `npm run check` | validação + `astro check` |
| `npm run build` | build completo com as auditorias |
| `npm run validate:prod` | simula a validação de produção |
| `npm run pendencias` | gera `docs/PENDENCIAS.md` |
| `npm run impressos` | gera a plaquinha (`print/`) e o `public/og.png` |
| `npm run audit:compliance` | auditoria do HTML gerado |
| `npm run audit:a11y` | axe-core em 3 cenários → `docs/A11Y.md` |
| `npm run audit:lighthouse` | Lighthouse mobile + peso do JS → `docs/PERFORMANCE.md` |

## Estrutura

```
src/
  config/        profile, theme, compliance, copy, contato, calendario, legal  ← tudo da pessoa
  content/       artigos/ e faq/ (content collections, schema em content.config.ts)
  assets/        retrato/ e mapa/ (imagens processadas pelo astro:assets → AVIF/WebP)
  components/    componentes sem texto nem cor fixos
  layouts/       BaseLayout (head, SEO, rodapé CFM, barra de contato, consentimento)
  lib/           linha (Linha da Vida), schema (JSON-LD), termos (vetados), color (contraste)
  pages/         /, /contato, /leitura, /avaliar, /privacidade, /termos, robots.txt, favicon.svg
  styles/        tokens gerados do theme.config + global.css
scripts/         validate-config, gerar-csp, audit-compliance, audit-a11y, audit-lighthouse, gerar-impressos
docs/            COMPLIANCE, PENDENCIAS, REPUTACAO, CALENDARIO_INSTAGRAM, A11Y, PERFORMANCE
print/           plaquinha de avaliação (SVG + PDF A5)
```

## Assinatura visual: Linha da Vida
- `src/lib/linha.ts` define a geometria (`inicio`, `onda`, `ventre`, `fim`). Todo trecho entra e sai no centro da trilha, então os trechos se emendam numa linha contínua.
- `<Trecho>` vai no slot `trilha` de `<Section trilha>`. A linha é desenhada com o scroll usando CSS scroll-driven, com fallback em IntersectionObserver. Com `prefers-reduced-motion` ela aparece estática e completa.

## Retrato
`<PortraitFrame>` calcula a largura exibida a partir da resolução real do arquivo (limitada por `ampliacaoMax`), então a foto nunca é ampliada de forma visível. A saída é AVIF + WebP com `srcset`. Com `arquivo: null`, entra a ilustração de linha.

## Privacidade, cookies e métricas
- Por padrão não há métricas, cookie de terceiro nem banner.
- Com `contato.analytics` configurado:
  - aparece o banner com Aceitar, Recusar e Personalizar, todos com o mesmo peso;
  - nada é carregado antes do aceite;
  - os eventos são anônimos (`evento`, `origem`, `caminho`);
  - a origem do serviço entra automaticamente no CSP.

## Reputação e SEO local
- `/avaliar`: um toque até o Google, sem filtro nem incentivo, com `noindex`.
- `docs/REPUTACAO.md` traz a mensagem pós-consulta, os modelos de resposta com sigilo médico e a política de moderação.
- JSON-LD `Physician` + `MedicalBusiness`, `BreadcrumbList`, `MedicalWebPage` + `Article`, sitemap e `robots.txt`.
- Não crie páginas por bairro sem conteúdo próprio (páginas-doorway).
