# Deploy do QR.APP 2.0

## Estado atual

- A branch `feature/qr-app-2.0` está sendo preparada para uma aplicação estática, hospedada na Vercel.
- A versão 2.0 gera QR Codes no navegador e não usa API, banco ou Storage para o fluxo principal.
- A produção existente na branch `main` e o serviço Render ligado a ela não foram alterados por esta entrega.
- A branch `legacy/qr-app-v1` preserva o código anterior de histórico e API. Os arquivos de backend também continuam neste checkout para transição; na branch v2, `backend/src/app.ts` não monta rotas de conteúdo.

## Configuração da v2 na Vercel

Após revisão e aprovação da branch:

| Campo | Valor |
| --- | --- |
| Root Directory | `frontend` |
| Build Command | `npm run build` |
| Output Directory | `dist` |
| Environment Variables | nenhuma necessária para o gerador |

`VITE_API_URL` não é necessária nesta arquitetura. As rotas de aplicação são reescritas para `index.html` por `frontend/vercel.json`.

Recomendo testar primeiro um preview da branch e confirmar geração/PNG/SVG antes de promovê-la para `main`. Este documento descreve a configuração pretendida; nenhum deploy foi executado nesta alteração.

## Render e Supabase existentes

`render.yaml` e as variáveis de Render/Supabase ainda representam a infraestrutura da versão anterior e continuam vinculados à produção atual. Não sincronizar uma mudança que remova recursos do Blueprint e não apagar banco, bucket ou dados neste passo. A decisão de desligar o serviço Render e manter, arquivar ou apagar os dados antigos exige uma etapa operacional separada, depois de a v2 estar validada.

Nenhuma variável, chave ou URL de conexão deve ser copiada para o frontend ou versionada. O gerador v2 não precisa delas.

## Comportamento de privacidade

- O conteúdo do QR Code é transformado em imagem no navegador.
- Não há login, histórico, armazenamento remoto nem envio do payload pelo frontend v2.
- QR Codes estáticos contêm o dado original; quem obtiver a imagem poderá decodificá-lo.
- O código de histórico/API da versão anterior está preservado em `legacy/qr-app-v1` e ainda há arquivos correspondentes neste checkout, embora não sejam expostos pelo app v2. Nenhum registro remoto foi apagado.
- Enquanto a versão antiga da `main` continuar publicada, o histórico público antigo também continuará sujeito ao comportamento daquela versão. A remoção efetiva da publicação depende de uma etapa futura de promoção/reconfiguração, que não faz parte deste trabalho.
