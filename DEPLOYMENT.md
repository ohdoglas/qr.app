# Deploy do QR.APP 2.0

## Arquitetura proposta

- **Frontend:** Vercel, projeto com diretório raiz `frontend`, build `npm run build` e saída `dist`.
- **API legado:** Render Web Service, definido em `render.yaml`, diretório raiz `backend`.
- **Banco e imagens da API:** projeto Supabase dedicado; o banco PostgreSQL é usado pelo Prisma e o bucket `qrappqrcodes` pelo upload legado.
- **QR Code principal:** continua sendo gerado localmente no navegador. A API, o banco e o Safe Browsing não são necessários para gerar ou exportar pelo fluxo principal.

## Ordem de configuração

1. Projeto Supabase dedicado `qrapp-production` criado na organização `ohdoglas`, região `sa-east-1` (São Paulo), estado informado como saudável. Não reutilizar projetos de outros sistemas.
2. Criar uma credencial de banco de dados exclusiva para Prisma e usar a URL do Supavisor em modo **Session** (porta 5432) como `DATABASE_URL`. Codificar caracteres especiais da senha na URL.
3. Criar o bucket `qrappqrcodes` para o fluxo legado. Ele fornece imagens públicas para os registros públicos do histórico; não salve dados sensíveis nessa API.
4. Criar o Web Service a partir de `render.yaml`, na região Virginia, com `main` como branch de deploy. O comando de início aplica as migrations do Prisma antes de iniciar o servidor.
5. Configurar no Render os segredos `DATABASE_URL`, `supabaseURL`, `supabaseKey`, `GOOGLE_SAFE_BROWSING_KEY` e a origem CORS `CORS_ORIGIN`. A chave Supabase deve permanecer no servidor; nunca a coloque em uma variável `VITE_*`.
6. Restringir a chave Google Cloud à API Safe Browsing e mantê-la exclusivamente no Render. A Safe Browsing API é destinada a uso não comercial; atividades comerciais exigem avaliar o Google Web Risk.
7. Criar/linkar o projeto Vercel com raiz `frontend` e definir `VITE_API_URL` como a URL pública do serviço Render. Configure `main` como production branch.
8. Validar uma prévia, migrations, CORS e `/history` antes de considerar a primeira versão pública.

## Variáveis

| Serviço | Variável | Uso |
| --- | --- | --- |
| Vercel | `VITE_API_URL` | URL base pública da API; utilizada pela tela de histórico legado. |
| Render | `PORT` | Injetada pela plataforma; o servidor também aceita `SERVER_PORT` localmente. |
| Render | `DATABASE_URL` | Supavisor Session para Prisma, migrations e consultas do backend. |
| Render | `CORS_ORIGIN` | Origem exata da aplicação Vercel, incluindo `https://`. |
| Render | `QR_STORAGE_PROVIDER` | Deve ser `supabase` no ambiente hospedado. |
| Render | `supabaseURL` | URL do projeto Supabase, somente backend. |
| Render | `supabaseKey` | Chave secreta de servidor para upload ao Supabase Storage. Nunca usar no frontend. |
| Render | `GOOGLE_SAFE_BROWSING_ENABLED` | `true` para verificar URLs enviadas à API legada. |
| Render | `GOOGLE_SAFE_BROWSING_KEY` | Chave da API Google Safe Browsing, somente backend. |

Os arquivos `.env` locais estão excluídos do Git. Os exemplos versionados não contêm credenciais. Não copie valores secretos para este documento, issues, logs ou commits.

## Limites e segurança operacional

- A página de histórico é pública e consulta a API somente após ação explícita do visitante.
- A API legada persiste registros no PostgreSQL e imagens no bucket. A flag `private` apenas remove registros da listagem pública; não a trate como mecanismo de controle de acesso para imagens.
- A rota `/healthz` é uma verificação de disponibilidade do processo; ela não confirma conectividade com PostgreSQL ou Storage.
- Google Safe Browsing só é acionado pela API legada. O gerador atual não envia o conteúdo para o servidor.
- O backend falha com erro quando a consulta Safe Browsing não está disponível, em vez de permitir silenciosamente a URL.
- Render usa o plano `free` no manifesto e pode suspender serviços ociosos. Nenhuma assinatura paga foi selecionada. O Vercel e Supabase devem ser revisados no painel antes de aceitar qualquer upgrade ou cobrança.
- O projeto Supabase não deve conter dados de produção de outros sistemas. Criar este projeto não significa importar ou acessar esses dados.

## Estado desta configuração

Arquivos de configuração versionáveis preparados. O projeto Supabase dedicado foi criado após confirmação explícita do proprietário para custo informado de US$ 0/mês. Ainda faltam configurar o bucket de Storage e inserir credenciais no provedor de hospedagem. O projeto Vercel ainda não está linkado; não houve deploy nem alteração de dados de aplicação.
