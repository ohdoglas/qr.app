# QR.APP

QR.APP é um gerador de QR Codes estáticos, sem conta e com processamento local no navegador. Crie códigos para URL, texto, Wi-Fi, e-mail, telefone, SMS, WhatsApp e vCard; ajuste a aparência, confira a prévia e exporte PNG ou SVG.

> **Estado do projeto:** evolução local em andamento na branch `feat/qr-app-2.0`. Ainda não há demonstração pública desta versão. O gerador principal é client-side; `/history` permanece como uma integração legada separada.

## O que está disponível

- Oito formatos de conteúdo: URL, texto, Wi-Fi, e-mail, telefone, SMS, WhatsApp e vCard.
- Pré-visualização e geração no navegador com a biblioteca `qrcode`.
- Personalização de cores, margem, nível de correção de erros e dimensão do PNG.
- Verificação de contraste antes de gerar.
- Exportação PNG e SVG.
- Biblioteca de exemplos, sem pré-preencher ou salvar dados pessoais.
- Páginas responsivas Home, Generator, Templates, About e History.
- Sem cadastro e sem envio do payload do gerador ao backend.

O histórico público legado tem caminho de dados separado e consulta o backend somente após ação explícita na interface. Não é um histórico privado nem inclui automaticamente códigos gerados no navegador.

## Prévia local

Capturas feitas no navegador local para esta branch. A arte ilustrativa da Home é decorativa e não representa um QR Code funcional; a tela History está no estado inicial e não exibe registros.

| Home | Generator |
| --- | --- |
| ![QR.APP Home](docs/screenshots/home.png) | ![QR.APP Generator](docs/screenshots/generator.png) |

| Templates | About |
| --- | --- |
| ![QR.APP Templates](docs/screenshots/templates.png) | ![QR.APP About](docs/screenshots/about.png) |

History: [ver captura](docs/screenshots/history.png).

## Tecnologias

| Área | Tecnologias observadas |
| --- | --- |
| Frontend | React 19, TypeScript, Vite, React Router |
| Geração no navegador | `qrcode` |
| Backend legado | Node.js, Express, TypeScript, Prisma, PostgreSQL |
| Armazenamento do backend | modo local em disco ou integração opcional com Supabase Storage |

## Executar localmente

Requisitos: Node.js 20.19+ ou 22.12+ e npm. Siga [`LOCAL_DEVELOPMENT.md`](./LOCAL_DEVELOPMENT.md) para criar os ambientes `.env` e iniciar os serviços em terminais separados.

O frontend principal pode ser executado sem o backend. O backend é necessário apenas para a tela de histórico e a API legada. O modo local não precisa de credenciais Supabase.

```powershell
# Terminal 1 — API local (opcional para o gerador; necessário para History)
cd C:\Users\multivac\Desktop\Git\qr.app\backend
npm ci
npm run dev

# Terminal 2 — frontend
cd C:\Users\multivac\Desktop\Git\qr.app\frontend
npm ci
npm run dev -- --host 127.0.0.1
```

Abra `http://127.0.0.1:5173`. Não compartilhe nem versione arquivos `.env`.

## Qualidade e comandos

Executados na pasta `frontend`:

```powershell
npm run lint
npm run build
```

Executado na pasta `backend`:

```powershell
npm run build
```

Os manifests atuais não definem uma suíte automatizada de testes. A integração contínua executa lint e build do frontend e build TypeScript do backend; isso não substitui testes de fluxo nem validação de leitura dos QR Codes exportados.

## Arquitetura em resumo

```text
Browser
  ├─ React + Vite: rotas e interface
  ├─ features/generator: validação, serialização, contraste e QR
  └─ `qrcode`: criação local de PNG/SVG

API Express legada (opcional para o fluxo principal)
  ├─ POST /qrcode-generator
  └─ GET /history
      ├─ armazenamento local de desenvolvimento
      └─ Prisma/PostgreSQL e integração remota configurável
```

O fluxo atual do gerador não chama a API. A rota `/history` consulta registros públicos do backend legado. A opção de armazenamento remoto exige configuração própria e não é necessária para desenvolver ou usar localmente o gerador.

## Privacidade e limitações

- O conteúdo do gerador é convertido em QR Code no navegador e não é enviado à API por esse fluxo.
- QR Codes são estáticos: o conteúdo fica no próprio código e não pode ser editado ou revogado após alguém salvar a imagem.
- Wi-Fi QR Codes carregam SSID e, quando informada, senha em texto recuperável por leitores compatíveis. Compartilhe com cuidado.
- URLs são codificadas como destino; o gerador não verifica a segurança do site.
- A leitura depende também do tamanho impresso, contraste, quiet zone, câmera e leitor. Valide com dispositivos reais antes de imprimir em escala.
- História é uma lista pública legada, não uma área pessoal ou autenticada.
- Localização e eventos não fazem parte dos formatos implementados atualmente.

## Estrutura do repositório

- `frontend/src/features/generator/` — tipos, validação, serialização e geração dos QR Codes.
- `frontend/src/pages/` — páginas e componentes da interface.
- `frontend/src/css/` — estilos globais e por página.
- `backend/src/` — API Express e integração de armazenamento legada.
- `backend/prisma/` — schema e migrations do PostgreSQL.
- `concepts/` — referências e especificações de interface fornecidas para o projeto.
- [`LOCAL_DEVELOPMENT.md`](./LOCAL_DEVELOPMENT.md) — configuração e operação local.
- [`docs/PORTFOLIO_CASE_STUDY.md`](./docs/PORTFOLIO_CASE_STUDY.md) — estudo de caso com estado e limites verificados.

## Publicação, licença e contribuição

O deploy está sendo preparado em duas partes: frontend estático no Vercel e API Express legada no Render, usando Supabase para PostgreSQL e armazenamento de imagens. O gerador principal continua funcionando no navegador e não depende desses serviços. As configurações e variáveis necessárias estão em [`DEPLOYMENT.md`](./DEPLOYMENT.md), [`frontend/vercel.json`](./frontend/vercel.json) e [`render.yaml`](./render.yaml). A integração com as contas e o primeiro deploy ainda precisam ser concluídos; nenhum segredo deve ser versionado.

A licença ainda precisa ser definida pelo proprietário antes de autorizar reutilização.

Contribuições podem ser propostas por branch e pull request depois que o fluxo de revisão for definido. Não inclua dados pessoais, QR Codes reais, chaves ou arquivos `.env` em issues, screenshots ou commits.
