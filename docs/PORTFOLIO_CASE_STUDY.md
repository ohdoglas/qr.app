# QR.APP — estudo de caso

## Contexto

QR.APP é uma ferramenta web para criar QR Codes estáticos sem conta. A versão 2.0 está sendo revitalizada para demonstrar decisões de frontend e backend com escopo adequado a uma ferramenta simples.

## Problema e proposta

Um fluxo de geração precisa ser rápido, claro e confiável, sem exigir cadastro ou enviar conteúdo sensível a um servidor. A proposta atual gera e pré-visualiza os códigos no browser, com formatos comuns e exportação de imagem.

## Desafios técnicos observados

- Serializar conteúdo heterogêneo em formatos que leitores de QR reconheçam.
- Validar entrada e preservar caracteres/escapes de cada payload.
- Ajudar a manter contraste e margem adequados para leitura.
- Separar o gerador local do backend histórico, que tem persistência e modos de armazenamento distintos.
- Comunicar com clareza a diferença entre códigos estáticos e redirecionáveis.

## Arquitetura e escolhas

- React, TypeScript e Vite compõem a aplicação de página única.
- A pasta `frontend/src/features/generator/` separa tipos, validação, serialização, contraste e criação PNG/SVG.
- A biblioteca `qrcode` realiza a codificação local.
- Um backend Express/TypeScript com Prisma e PostgreSQL continua no repositório para os fluxos legados de geração/histórico. Ele não participa do fluxo principal atual.
- A API mantém modo de armazenamento local para desenvolvimento e integração Supabase Storage configurável. O deploy remoto não está incluído nesta entrega.

## Funcionalidades verificadas no código

- Oito formatos: URL, texto, Wi-Fi, e-mail, telefone, SMS, WhatsApp e vCard.
- Controles de cor, margem, correção de erro e largura PNG; exportação PNG e SVG.
- Biblioteca de exemplos que encaminha ao gerador sem reutilizar valores de exemplo como dados preenchidos.
- Histórico legado público com carregamento sob ação do usuário.

Lint e builds locais foram executados para a versão de trabalho durante a entrega E08. Eles confirmam qualidade estática e compilação, mas não comprovam a leitura de todos os payloads em câmeras ou leitores reais. A integração contínua acompanha lint/build; não existe suíte automatizada de testes nos manifests atuais.

## Resultados verificáveis

- A geração do fluxo principal usa o pacote `qrcode` no browser.
- O backend não é chamado pelo fluxo do gerador do frontend.
- O build local produziu bundle Vite; os números medidos são registrados no relatório da entrega, não são métricas de produção.
- Não há URL pública confirmada da v2, métricas de uso, resultados Lighthouse ou validação completa de acessibilidade para relatar.

## Próximos passos

1. Capturar screenshots finais das telas em estado real e adicioná-las aqui ao README.
2. Revisar formatos e combinações de personalização com decodificadores independentes e dispositivos móveis.
3. Fazer uma revisão WCAG com ferramentas e testes de teclado/leitor de tela.
4. Escolher licença, destino de hospedagem e política para o backend legado.
5. Publicar apenas após aprovação explícita da configuração e do ambiente remoto.
