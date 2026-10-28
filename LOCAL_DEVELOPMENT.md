# Desenvolvimento local

O fluxo do gerador `/generator` produz o QR Code no frontend. O backend permanece útil para a rota `/history` e para exercitar a API antiga, usando arquivos locais no modo de desenvolvimento. Nenhuma credencial Supabase é necessária no modo `local`.

## Requisitos

- Node.js compatível com Vite 6 (Node 20.19+ ou 22.12+ recomendado).
- npm.

## Configurar pela primeira vez (PowerShell)

```powershell
cd C:\Users\multivac\Desktop\Git\qr.app
Copy-Item backend\.env.example backend\.env
Copy-Item frontend\.env.example frontend\.env
cd backend
npm ci
cd ..\frontend
npm ci
```

Se os arquivos `.env` já existem, preserve-os e apenas confira que `QR_STORAGE_PROVIDER=local`, `GOOGLE_SAFE_BROWSING_ENABLED=false` e `VITE_API_URL=http://127.0.0.1:3000`. Não use configuração de produção para desenvolvimento local.

## Iniciar backend e frontend

Abra dois terminais PowerShell.

Terminal 1:

```powershell
cd C:\Users\multivac\Desktop\Git\qr.app\backend
npm run dev
```

Terminal 2:

```powershell
cd C:\Users\multivac\Desktop\Git\qr.app\frontend
npm run dev -- --host 127.0.0.1
```

Abra `http://127.0.0.1:5173/generator`. O gerador de URL no browser funciona sem o backend; o backend em `http://127.0.0.1:3000` é usado pelo histórico legado.

## Dados locais e teste manual

- Imagens da API: `backend/uploads/qrcodes/`.
- Registros da API: `backend/data/local-qrcodes.json`.
- Os diretórios de dados locais são ignorados pelo Git. Removê-los apaga os dados de teste.
- Para testar a tela principal: informar uma URL HTTP/HTTPS completa, gerar, conferir a prévia e baixar o PNG. Ler o arquivo baixado com câmera ou leitor de QR independente.
- Para testar a API legada: enviar `POST http://127.0.0.1:3000/qrcode-generator` com JSON `{"url":"https://example.com","isPrivate":false}`; consultar `GET http://127.0.0.1:3000/history`.

Os testes acima não acessam Supabase. A configuração remota só deve ser habilitada em etapa posterior, com revisão separada das políticas de acesso e variáveis do servidor.
