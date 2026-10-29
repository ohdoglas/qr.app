# Desenvolvimento local do QR.APP 2.0

O QR.APP 2.0 é um frontend estático. A geração, pré-visualização e exportação de QR Codes acontecem no navegador. Não é necessário iniciar backend, banco de dados, Supabase ou configurar variáveis de ambiente.

## Requisitos

- Node.js 20.19+ ou 22.12+.
- npm.

## Instalar e iniciar

No PowerShell:

```powershell
cd C:\Users\multivac\Desktop\Git\qr.app\frontend
npm ci
npm run dev -- --host 127.0.0.1
```

Abra `http://127.0.0.1:5173`. As rotas disponíveis são `/`, `/generator`, `/templates` e `/about`.

Para validar uma build local:

```powershell
npm run lint
npm run build
```

## Privacidade e legado

O gerador não transmite o conteúdo inserido nem mantém histórico no servidor. Os dados que formam o QR Code permanecem na página até ela ser fechada ou atualizada.

A implementação anterior completa permanece na branch `legacy/qr-app-v1`. Este checkout ainda contém arquivos de backend para a transição, mas o app desta branch monta somente `/healthz`; o frontend não chama a API. O backend configurado para a produção atual não é necessário para executar esta versão. A branch `main` e os dados remotos não são alterados por estes comandos.
