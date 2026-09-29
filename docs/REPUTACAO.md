# Reputação e Perfil da Empresa no Google

Guia operacional do consultório. Regras que valem para tudo abaixo:

- **Sem filtro:** o convite para avaliar vai para todas as pessoas atendidas, sem perguntar antes se gostaram. Selecionar só quem ficou satisfeito ("review gating") viola as políticas do Google.
- **Sem incentivo:** nenhum brinde, desconto, sorteio ou benefício em troca de avaliação. Isso viola as políticas do Google e as regras de publicidade médica do CFM (Res. 2.336/2023).
- **Sem depoimentos no site:** as avaliações ficam no Google. O site não exibe, cita nem responde a nenhuma delas.
- **Sigilo médico (Código de Ética Médica, art. 73):** a resposta pública nunca confirma que alguém é paciente e nunca menciona atendimento, datas, exames, diagnóstico ou tratamento, **mesmo que a própria pessoa tenha contado na avaliação**.
- **LGPD:** não peça nem registre dado de saúde pelo WhatsApp ou em respostas públicas.

---

## 1. Mensagem padrão pós-consulta (WhatsApp)

Enviar **a todas as pessoas atendidas**, no mesmo dia ou no dia seguinte, sempre com o mesmo texto. Não escolher quem recebe.

> Olá! Aqui é do consultório da Dra. Nicole V. Zanette. Obrigada pela visita.
> Se quiser contar como foi a sua experiência, você pode avaliar no Google por este link: **[domínio]/avaliar**
> É opcional. Se tiver qualquer dúvida sobre as orientações da consulta, é só ligar para o consultório: **[telefone]**.

- Troque `[domínio]` e `[telefone]` pelos valores de `profile.config.ts`.
- Não acrescente "se gostou", "5 estrelas", "ajude a gente a subir" nem nada que induza a nota.
- Não pergunte sobre sintomas nem sobre a evolução do quadro nessa mensagem.
- Se a pessoa responder com dúvida de saúde, oriente a ligar ou agendar retorno. Não responda questões clínicas pelo WhatsApp.

---

## 2. Modelos de resposta às avaliações do Google

Como usar:

- Responda **todas** as avaliações (positivas e negativas) em até 3 dias úteis, com o mesmo tom cordial.
- Os modelos **não confirmam** que a pessoa foi atendida. Evite "sua consulta", "seu exame", "quando você esteve aqui", "seu convênio", "seu retorno".
- Não discuta, não corrija a pessoa em público e não conte a versão do consultório.
- Personalize só o nome (se estiver público no perfil) e o telefone.

### 2.1 Crítica sobre tempo de consulta

> Olá, [nome]. Obrigada por compartilhar sua percepção. Levamos a sério os comentários sobre a organização dos atendimentos e o tempo dedicado a cada pessoa, e eles nos ajudam a revisar a forma como trabalhamos. Se quiser conversar diretamente, o consultório está à disposição pelo telefone [telefone].

### 2.2 Crítica sobre atendimento ou recepção

> Olá, [nome]. Agradecemos o seu retorno. Queremos que todas as pessoas que entram em contato com o consultório se sintam bem recebidas, e comentários como o seu são levados à equipe. Se preferir falar com a gente de forma reservada, ligue para [telefone].

### 2.3 Crítica sobre convênio

> Olá, [nome]. Obrigada pelo comentário. Sabemos que as regras de cada convênio podem gerar dúvidas, e procuramos informar com clareza as formas de atendimento disponíveis. Se quiser conversar sobre isso de forma reservada, estamos à disposição pelo telefone [telefone].

### 2.4 Avaliação positiva

> Olá, [nome]. Muito obrigada pelas palavras. Ficamos felizes com o seu retorno.

(Mesmo nas positivas, não cite nada do atendimento, como "que bom que o pré-natal está indo bem".)

### 2.5 Avaliação só com nota, sem texto

> Obrigada pela avaliação. Se quiser compartilhar algo com o consultório, estamos à disposição pelo telefone [telefone].

### 2.6 Avaliação que cita dado de saúde

> Olá. Agradecemos o comentário. Por respeito à privacidade, não comentamos informações de saúde em espaço público. Se quiser conversar, o consultório está à disposição pelo telefone [telefone].

### Frases que nunca devem aparecer

- "Conforme seu prontuário…", "No dia da sua consulta…", "Seu exame mostrou…"
- "Você chegou atrasada / não trouxe os exames…"
- "Nunca atendemos essa pessoa." (também revela informação sobre quem é ou não é paciente)
- Qualquer oferta de compensação ("vamos te dar um retorno gratuito")

---

## 3. Checklist do Perfil da Empresa no Google

| Item | Como preencher | OK |
|---|---|---|
| Nome | Exatamente o nome profissional (`profile.nome` com o tratamento), sem palavras-chave extras | ☐ |
| Categoria principal | **Ginecologista** (ou "Obstetra"/"Ginecologista obstetra", conforme as opções disponíveis) | ☐ |
| Categorias secundárias | Só as que refletem a atuação real (ex.: Obstetra) | ☐ |
| Endereço | Igual ao do site, letra por letra (NAP consistente) | ☐ |
| Área de atendimento | Lages-SC e municípios de onde vêm as pacientes, se fizer sentido | ☐ |
| Telefone | O mesmo do site (`profile.telefone`) | ☐ |
| Site | Domínio do site (página inicial) | ☐ |
| Horários | Os mesmos de `profile.horarios`; horários especiais em feriados | ☐ |
| Serviços | Consulta ginecológica, pré-natal, acompanhamento pós-parto, climatério… (só o que a Dra. faz, **sem preço**) | ☐ |
| Descrição | Texto informativo, sem superlativo nem promessa (pode partir de `copy.sobre`) | ☐ |
| Fotos | Fachada, entrada, recepção, sala de espera, consultório vazio. **Sem pacientes e sem bebês** | ☐ |
| Logo/foto de perfil | Retrato profissional da Dra. ou marca | ☐ |
| Perguntas e respostas | Cadastrar as do FAQ do site (agendamento, convênios, endereço), sem conteúdo clínico | ☐ |
| Postagens | Semanais, reaproveitando `docs/CALENDARIO_INSTAGRAM.md` (link para o artigo da Sala de Leitura) | ☐ |
| Link de avaliação | Copiar o link "Pedir avaliações" para `profile.googleBusiness.urlAvaliar` | ☐ |
| Link do perfil | Copiar para `profile.googleBusiness.urlPerfil` (entra no `sameAs` do schema) | ☐ |
| Place ID | Copiar para `profile.googleBusiness.placeId` | ☐ |
| Mensagens pelo Google | Ativar só se alguém for responder; senão, deixar desativado | ☐ |

Depois de preencher `urlAvaliar` e o domínio, rode `npm run impressos` para gerar a plaquinha com o QR certo.

---

## 4. Política de moderação

**Denuncie apenas** avaliações que violem as [políticas de conteúdo do Google](https://support.google.com/contributionpolicy/answer/7400114), por exemplo:

- spam, conteúdo falso ou de quem nunca teve contato com o consultório (ex.: uma onda de avaliações sem relação com o serviço);
- conflito de interesses (concorrente, ex-funcionário avaliando o próprio local);
- conteúdo ofensivo, discriminatório, assédio ou ameaça;
- informação pessoal de terceiros (telefone, endereço, dados de saúde de outra pessoa);
- conteúdo fora do tema.

**Nunca:**

- pedir remoção de crítica legítima, mesmo que seja dura ou injusta na visão do consultório;
- pedir para a pessoa apagar ou mudar a avaliação, nem oferecer algo em troca;
- criar avaliações, pedir para familiares ou equipe avaliarem, ou comprar avaliações;
- responder com ameaça jurídica em público.

Crítica legítima se responde com o modelo adequado da seção 2 e vira **ação interna**: registre o tema (tempo, recepção, convênio, clareza das orientações) numa planilha simples, sem nomes, e revise a cada mês o que pode mudar no consultório.

Ao denunciar: use "Denunciar avaliação" no Perfil da Empresa, escolha o motivo correspondente e guarde a data. Se não for removida e continuar violando as regras, use o formulário de suporte do Google Business Profile.
