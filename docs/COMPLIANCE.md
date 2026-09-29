# Relatório de conformidade

Estado em 29/09/2026. Legenda: ✅ implementado e verificado · 🟡 implementado, precisa de validação humana · ⛔ pendente (bloqueia o go-live).

Verificações automáticas:

| Comando | O que faz | Resultado atual |
|---|---|---|
| `npm run validate` | campos obrigatórios, contraste AA, termos vetados no config/conteúdo, campos do formulário, lista de `CONFIRMAR` | ✅ passa (69 pendências `CONFIRMAR`, em `docs/PENDENCIAS.md`) |
| `npm run build` | validate → `astro build` → `audit:compliance` | ✅ passa |
| `npm run audit:compliance` | varre o HTML gerado: termos vetados, identificação CFM em toda página, terceiros sem consentimento, campos de formulário | ✅ 14 páginas, 0 problemas |
| `npm run audit:a11y` | axe-core (WCAG 2.0/2.1/2.2 A e AA) em 7 páginas × 3 cenários (desktop claro, mobile escuro, reduced-motion) + alvos de toque | ✅ 0 violações (relatório em `docs/A11Y.md`) |
| `VERCEL_ENV=production npm run build` | igual ao build, mas `CONFIRMAR` vira erro | ⛔ falha enquanto houver pendências (esperado) |

---

## 1. Publicidade médica (CFM, Res. 2.336/2023)

| Item | Status | Onde |
|---|---|---|
| Nome, CRM/UF, RQE e especialidade em todas as páginas (rodapé) | ✅ verificado pelo `audit:compliance` | `RodapeLegal.astro` |
| Número do CRM e do RQE | ⛔ `CONFIRMAR` | `profile.crm`, `profile.rqe` |
| Estabelecimento, CNPJ, inscrição no CRM e diretor técnico | ⛔ `CONFIRMAR`; se for consultório de pessoa física, usar `estabelecimento: null` | `compliance.cfm` |
| Sem superlativos, promessa de resultado, preço, promoção, sorteio, "antes e depois", depoimentos | ✅ varredura no config, no conteúdo e no HTML final; o build falha se aparecerem | `compliance.termosVetados`, `scripts/audit-compliance.ts` |
| Lista de termos vetados alinhada ao texto vigente da resolução | 🟡 **conferir o texto atual da Res. CFM 2.336/2023 (e eventuais alterações) antes do go-live** e ajustar a lista | `compliance.termosVetados` |
| Sem imagem identificável de paciente ou recém-nascido | ✅ o site só usa o retrato da Dra. e ilustrações | — |
| Sem depoimentos e sem exibir avaliações | ✅ `/avaliar` só encaminha ao Google | `src/pages/avaliar.astro` |
| Conteúdo educativo com fonte, data e aviso | ✅ o schema exige fontes de órgãos oficiais | `src/content.config.ts` |
| Revisão médica de cada artigo | ⛔ 8 artigos com `revisaoMedica: CONFIRMAR` | `src/content/artigos/*.md` |
| Título do hero e texto do "Sobre" | ⛔ aprovação da Dra. | `copy.hero`, `copy.sobre` |
| Cadastro do site ou dos perfis no CRM-SC, se o regional exigir | 🟡 verificar com o CRM-SC | — |

**Decisões sobre a lista de termos:**
- "resultado" é vetado apenas em construções de promessa ("resultado garantido", "resultados comprovados"…). "Resultado de exame" é informação legítima e aparece nos artigos.
- "gratuito" não é vetado. Os artigos informam que vacinas e exames são gratuitos no SUS, o que não é promoção do consultório.
- Títulos e URLs das fontes citadas não passam pela varredura. São citações de órgãos oficiais (ex.: "Ministério da Saúde garante acesso a mamografia…").

## 2. LGPD

| Item | Status | Onde |
|---|---|---|
| Política de privacidade: controlador, dados, finalidades, bases legais, compartilhamento, transferência internacional, retenção, direitos (art. 18), como exercer, cookies, menores, segurança, versão | ✅ texto completo | `/privacidade`, `src/config/legal.pt-BR.ts` |
| Canal do encarregado ou contato do titular | ⛔ `CONFIRMAR` | `compliance.politicaPrivacidade.contatoEncarregado` |
| Nome do provedor de hospedagem e países de transferência | ⛔ `CONFIRMAR` | `legal.pt-BR.ts` |
| Prazo de retenção de contatos | ⛔ `CONFIRMAR` | `legal.pt-BR.ts` |
| Data de vigência da política e dos termos | ⛔ `CONFIRMAR` | `compliance.politicaPrivacidade`, `compliance.termosUso` |
| Termos de uso (informativo, não é canal de urgência, agendamento, propriedade intelectual, links, lei aplicável) | ✅ (foro ⛔ `CONFIRMAR`) | `/termos` |
| Nenhum dado clínico coletado | ✅ o formulário só aceita nome, telefone, período e consentimento; o validador e a auditoria falham com outro campo ou com textarea | `FormContato.astro` |
| Mensagem do WhatsApp sem dado clínico | ✅ o validador bloqueia termos clínicos na mensagem padrão | `profile.whatsapp.mensagemPadrao` |
| Consentimento específico no formulário | ✅ caixa obrigatória, não pré-marcada | `compliance.consentimentoFormulario` |
| Banner: Aceitar / Recusar / Personalizar com o mesmo peso | ✅ medido: os três botões com 103×44 px, mesma cor e peso, nos modos claro e escuro | `Consentimento.astro` |
| Categorias (essenciais sempre ativas, estatística desligada por padrão) | ✅ | `compliance.cookies.categorias` |
| Consentimento registrado no cliente (versão + data + categorias) e revogável | ✅ `localStorage`; o link "Preferências de cookies" no rodapé reabre o banner; mudar `versaoConsentimento` pede o consentimento de novo | — |
| Sem "cookie wall" e sem pré-marcação | ✅ o banner não bloqueia a navegação | — |
| Terceiros só depois do aceite | ✅ zero requisições externas antes do aceite; depois do aceite, só `{evento, origem, caminho}` | testado com Playwright |
| Fontes self-hosted | ✅ a auditoria falha se aparecer Google Fonts | — |
| Mapa sem iframe | ✅ link para o Google Maps, carregado só quando clicado | `/contato` |
| Métricas | ✅ desligadas por padrão (`contato.analytics.tipo: 'nenhum'`); sem métricas, o site não precisa de banner | `contato.config.ts` |
| Revisão jurídica da política e dos termos | 🟡 **advogado(a)** | — |
| Política de privacidade do atendimento presencial (prontuário, secretária, WhatsApp da recepção) | 🟡 fora do escopo do site; recomendável ter uma política própria do consultório | — |
| Registro das operações de tratamento (art. 37) | 🟡 responsabilidade do consultório | — |

## 3. Acessibilidade (WCAG 2.2 AA)

| Item | Status | Como foi verificado |
|---|---|---|
| axe-core sem violações | ✅ 0 violações (inclusive moderadas) em 7 páginas × 3 cenários, e no banner de cookies aberto (claro e escuro) | `npm run audit:a11y` |
| Skip link | ✅ primeiro Tab em todas as páginas, visível ao receber foco, leva a `#conteudo` | Playwright |
| Foco visível | ✅ contorno de 3 px em todos os elementos focáveis (40 Tabs por página) | Playwright |
| Landmarks | ✅ `header`, `nav` (com rótulos), `main` único, `footer`; `h1` único em cada página (corrigido em `/contato` e `/leitura`) | Playwright |
| Alt text | ✅ o retrato tem alt vindo do config; ilustrações decorativas com `aria-hidden` | axe |
| Contraste AA | ✅ 13 pares de cores conferidos no build, nos modos claro e escuro, além do axe | `theme.contraste` |
| Alvo de toque | ✅ nenhum alvo abaixo de 24 px (WCAG 2.5.8); botões, links do menu, rodapé, barra fixa e formulário com 44 px. 🟡 62 links entre 24 e 44 px (trilha de navegação, índice das páginas legais, links do calendário), aceitos pelo AA | `audit:a11y` |
| `prefers-reduced-motion` | ✅ Linha da Vida estática, entrada do hero e transições desligadas | cenário "reduced-motion" |
| `prefers-color-scheme` | ✅ tema escuro com tokens próprios e contraste verificado | cenário "mobile-escuro" |
| Textos menores legíveis | ✅ o menor texto é 0,84 rem (~13,4 px), com contraste AA; o texto corrido tem ≥ 16 px | tokens |
| Idioma da página | ✅ `lang="pt-BR"` | — |
| Guia interativo sem JS | ✅ radios reais, operáveis por teclado | — |
| Teste com leitor de tela | 🟡 **não feito aqui (sem leitor de tela no ambiente).** Testar com NVDA (Windows), VoiceOver (iOS/macOS) e TalkBack (Android): menu, guia "Qual consulta?", formulário, banner de cookies, `/avaliar` | humano |
| Anúncio da troca de painel no guia | 🟡 sem JavaScript, o leitor de tela não anuncia o painel que aparece; os painéis vêm logo depois das opções | limitação conhecida |
| Zoom a 200% / reflow a 320 px | 🟡 layout fluido; conferir manualmente | humano |

## 4. Pendências para validação humana

**Dra. Nicole**
- [ ] CRM, RQE, endereço, telefone, WhatsApp, horários, convênios, Instagram, links do Google (`docs/PENDENCIAS.md`).
- [ ] Estabelecimento ou pessoa física, CNPJ, inscrição no CRM e diretor técnico.
- [ ] Título do hero, texto do "Sobre", fases atendidas (faz partos? em qual hospital?).
- [ ] "Como funciona a consulta": duração, acolhimento, o que é examinado, como saem as orientações, retorno.
- [ ] Respostas do FAQ que dependem dela (remarcação, atraso, acompanhante, adolescentes, retorno, acessibilidade).
- [ ] Revisar e aprovar os 8 artigos (`revisaoMedica: aprovada`) e conferir os links das fontes.

**CRM-SC**
- [ ] Conferir o texto vigente da Res. CFM 2.336/2023 e ajustar `compliance.termosVetados`.
- [ ] Verificar se o regional exige comunicação ou cadastro de sites e perfis.

**Advogado(a)**
- [ ] Revisar `/privacidade` e `/termos`: encarregado, retenção, provedores, transferência internacional, foro.
- [ ] Validar o texto de consentimento do formulário.
- [ ] Orientar sobre a política de privacidade do atendimento presencial e sobre o registro de operações.

**Técnico, antes do go-live**
- [ ] Definir `profile.dominio` e rodar `npm run impressos` (a plaquinha e o `og.png` hoje apontam para `example.com`).
- [ ] Rodar `VERCEL_ENV=production npm run build` e confirmar que passa (sem `CONFIRMAR`).
- [ ] Testar com leitor de tela, zoom de 200% e um celular real.
- [ ] Validar o JSON-LD no Rich Results Test depois do deploy.
