# QR.APP 2.0 — Especificação de Frontend, Design System e Experiência

> **Status:** proposta de design e implementação; não representa uma auditoria do código existente.
> **Destinatário:** Codex conectado ao repositório GitHub do QR.APP.
> **Escopo:** interface da página inicial, gerador de QR Codes, banco público e editor avançado.
> **Objetivo:** entregar uma aplicação responsiva, rápida, interativa, acessível, segura e apresentável no portfólio DEV.

## 0. Referências visuais (concepts)

| Arquivo | Tela | Intenção visual |
|---|---|---|
| `01_landing_page.png` | Landing page | Fundo escuro, hero expressivo, QR flutuante, categorias, CTA. |
| `02_gerador_qrcode.png` | Gerador rápido | Área de trabalho clara, entrada contextual, preview imediato. |
| `03_banco_publico.png` | Banco público | Galeria escura, busca, filtros e cards com QR. |
| `04_editor_personalizado.png` | Editor | Ferramentas à esquerda, QR em grande destaque e presets. |

As imagens são **referências conceituais**, não especificações pixel-perfect. Alguns microtextos e números presentes nos concepts são apenas ilustrativos; **não os reproduzir literalmente**. O frontend deve preservar coerência entre telas e funcionar em diferentes larguras, inclusive quando o conteúdo real divergir dos exemplos visuais.

### Princípios não negociáveis

1. **Funcionalidade antes de ornamentação:** criar um QR Code deve exigir o mínimo possível de ações.
2. **Design visual refinado e coeso:** mesmo sistema de espaçamento, cor, componentes, iconografia e motion em todas as rotas.
3. **Privacidade:** geração local por padrão, quando a arquitetura permitir; nenhuma publicação automática.
4. **Legibilidade do QR Code:** contraste, margem, correção de erro e verificações de decodificação precedem customização estética.
5. **Acessibilidade e responsividade:** WCAG 2.2 AA como objetivo; navegação por teclado e `prefers-reduced-motion`.
6. **Sem reescrita por moda:** primeiro inspecionar o repositório; conservar stack/código aproveitáveis.
7. **Sem funcionalidades falsas:** contadores, favoritos, busca pública, upload e botões precisam funcionar ou ficar visivelmente indisponíveis até a respectiva integração.

---

## 1. Direção visual e identidade

### 1.1 Personalidade

**QR.APP 2.0** deve combinar a simplicidade de uma ferramenta utilitária com a linguagem visual de um estúdio criativo. Referências: SaaS moderno, cards com bordas suaves, luz ambiente azul-violeta, microinterações precisas e alta clareza tipográfica. Evitar neon exagerado, animações contínuas por toda a página e excesso de glassmorphism.

- **Landing e banco público:** composição dark premium, com iluminação ambiental discreta.
- **Gerador e editor:** workspace prioritariamente claro, limpo e focado em uso prolongado.
- **Alternância de tema:** caso implementada, oferecer tema claro e escuro consistente para todas as rotas; a separação acima é uma sugestão de direção para os primeiros layouts, não uma regra inflexível.
- **Marca:** símbolo geométrico derivado de quatro módulos de QR, sem depender de fontes proprietárias.

### 1.2 Tokens sugeridos

```css
:root {
  --qr-brand-violet: #7447ff;
  --qr-brand-blue: #238bff;
  --qr-accent-cyan: #23d4ee;
  --qr-accent-pink: #ed50bb;
  --qr-success: #0d9f7d;
  --qr-warning: #c77608;
  --qr-danger: #d23f57;

  --qr-canvas-dark: #0a1120;
  --qr-surface-dark: #111d31;
  --qr-border-dark: #25324a;
  --qr-text-dark: #eff5ff;
  --qr-muted-dark: #aebdd2;

  --qr-canvas-light: #f5f7fc;
  --qr-surface-light: #ffffff;
  --qr-border-light: #e0e6f2;
  --qr-text-light: #14213a;
  --qr-muted-light: #52637c;

  --qr-gradient-brand: linear-gradient(110deg, #7447ff 0%, #238bff 100%);

  --qr-radius-sm: 10px;
  --qr-radius-md: 14px;
  --qr-radius-lg: 20px;
  --qr-radius-xl: 28px;
  --qr-radius-pill: 999px;

  --qr-shadow-soft: 0 12px 36px rgba(19, 33, 63, .09);
  --qr-shadow-hover: 0 20px 60px rgba(25, 31, 85, .16);

  --qr-space-1: 4px;
  --qr-space-2: 8px;
  --qr-space-3: 12px;
  --qr-space-4: 16px;
  --qr-space-6: 24px;
  --qr-space-8: 32px;
  --qr-space-12: 48px;
  --qr-space-16: 64px;

  --qr-motion-fast: 140ms;
  --qr-motion-normal: 240ms;
  --qr-motion-slow: 360ms;
  --qr-ease-out: cubic-bezier(.22, 1, .36, 1);
}
```

Os tokens acima são ponto de partida. **Verificar matematicamente o contraste** das combinações de cores antes de aprová-las; não presumir que os valores garantam WCAG AA em qualquer contexto.

### 1.3 Tipografia, ícones e grid

- Fonte de texto: `Inter` ou equivalente com boa renderização em português.
- Fonte para títulos: `Manrope` ou `Space Grotesk`, se o custo de download e a identidade fizerem sentido; até duas famílias no máximo.
- Escala fluida de títulos usando `clamp()`, com hierarquia clara.
- Ícones de uma única família, por exemplo Lucide, com espessura consistente; incluir texto nos botões importantes.
- Container máximo: 1280–1360 px, margens laterais fluídas (`clamp(16px, 4vw, 64px)`).
- Grid de 12 colunas em desktop, 6 em tablet e layout fluído de 1 coluna em mobile onde apropriado.
- Tamanho mínimo confortável de alvos interativos: perseguir 44×44 px; validar mínimo normativo e espaçamento conforme WCAG 2.2.

### 1.4 Linguagem de componentes

- Cards com raios de 14–20 px, borda sutil e hover com elevação controlada.
- Botão primário com gradiente e estados claros: default, hover, active, focus-visible, disabled e loading.
- Botões secundários outline/soft; evitar CTA primário em toda seção.
- Inputs com labels explícitos, texto de apoio, máscara/validação contextual e mensagens próximas ao campo.
- `segmented controls` para opções mutuamente exclusivas e tabs com teclado correto.
- Tooltips **não** como única fonte de informação.
- Skeleton loaders apenas quando dados realmente são assíncronos.
- Toasts com `aria-live` apropriado, sem interrupções desnecessárias; erros persistentes devem aparecer também no contexto da ação.

---

## 2. Arquitetura de informação e rotas

| Rota conceitual | Título | Finalidade |
|---|---|---|
| `/` | Início | Proposta de valor, tipos de QR, acesso imediato ao gerador. |
| `/gerador` | Gerador | Criar QR Code com formulário contextual e exportação rápida. |
| `/biblioteca` | Banco público | Explorar modelos e QRs **explicitamente públicos**, buscar e filtrar. |
| `/editor` | Editor | Edição visual avançada, presets, cores, módulos, bordas, logo e exportações. |
| `/sobre` *(opcional)* | Sobre | Contexto, documentação, privacidade, tecnologias e créditos. |

Ajustar nomenclatura de rotas ao roteador existente; evitar migrações desnecessárias. Compartilhar `Header`, `Footer`, `ThemeToggle`, `QRPreview`, `QRDownloadPanel`, `QRCodeCard` e controles de acessibilidade. Os conteúdos criados no gerador podem ser transferidos para o editor pelo estado local ou por payload serializado seguro, **sem publicar automaticamente** o dado em URL query string (pode conter dados sensíveis).

### Navegação principal

Logo QR.APP à esquerda; links `Início`, `Gerador`, `Explorar`, `Sobre` (este último opcional). À direita, seletor de tema e GitHub. Em mobile: header compacto com menu acionável e acessível, ou navegação curta quando couber. O indicador da rota ativa deve ser visível, não depender apenas da cor e informar `aria-current="page"`.

---

## 3. Concept 01 — Página inicial / Landing page

**Arquivo:** `01_landing_page.png`.

### Estrutura visual

1. **Header transparente/escuro**, com identidade e CTA discreto.
2. **Hero de duas colunas**: título forte à esquerda, ilustração CSS/SVG de QR inclinado e flutuante à direita.
3. **CTA principal:** `Criar meu QR Code`; secundário: `Explorar modelos`.
4. **Linha de benefícios:** `Sem cadastro`, `Geração no dispositivo` (somente se verdadeiro), `Exportação em alta qualidade`, `Personalização`.
5. **Cards de tipos:** URL, Texto, Wi-Fi, Contato, E-mail, Evento; cada card abre o gerador com tipo já selecionado.
6. **Seção curta de como funciona:** `Escolha`, `Personalize`, `Baixe`.
7. **Rodapé:** privacidade, sobre, repositório, créditos e links.

### Experiência e movimento

- QR hero com parallax **leve** restrito a desktop com ponteiro preciso, amplitude baixa (até ~8 px).
- 2–3 elementos decorativos flutuantes com animações lentas (6–10 s), desligadas no modo de movimento reduzido.
- Entrada do hero com fade/translate curto, sem bloquear a interação.
- Botões com brilho sob hover, *sem* animações pulsantes permanentes.
- Cards com hover lift de 2–4 px e mudança de borda; tecla Enter/Space devem ativar cards implementados como botões/links reais.
- O QR do hero é **decorativo**; não apresentá-lo como um código funcional se não for validamente decodificável.

### Responsividade

- Desktop: hero 55/45; CTA e categorias visíveis sem percursos longos.
- Tablet: ilustração reduzida, cards 2–3 colunas.
- Mobile: título, subtítulo, CTA e ilustração em sequência; cards de tipos em 2 colunas se couber, caso contrário 1 coluna. Sem scroll horizontal.

**Critério de aceite:** usuário chega ao gerador em um clique e identifica imediatamente o propósito da ferramenta.

---

## 4. Concept 02 — Gerador rápido

**Arquivo:** `02_gerador_qrcode.png`.

### Estrutura

Layout desktop com seleção de tipo à esquerda (sidebar ou tabs), formulário contextual ao centro e prévia/download à direita; não insistir em três colunas se o espaço útil for insuficiente. Em widths intermediárias, condensar seleção de tipo em tabs horizontais acessíveis.

**Tipos previstos, a validar pela auditoria:** URL, Texto, Wi-Fi, E-mail, Telefone, SMS, WhatsApp, vCard, Localização e Evento.

### Comportamento funcional

- Troca de tipo atualiza campos e ajuda contextual.
- Formulário com exemplos, validação e estados claros, sem submissão a servidor quando não necessária.
- Prévia atualizada com `debounce` curto (~150–250 ms) em entradas custosas; não exibir QR antigo como se representasse uma entrada inválida.
- Apresentar placeholder amigável antes da primeira entrada válida.
- Ações: `Baixar PNG`, `Baixar SVG` (quando biblioteca suportar), `Copiar imagem` quando API disponível, `Abrir no editor`.
- Compartilhamento só se Web Share API disponível e funcional, com fallback apropriado.
- Tamanho de exportação configurável de modo compreensível, sem confundir pixels com dimensões físicas de impressão.
- Campos sensíveis (ex.: senha Wi-Fi) sem telemetria de conteúdo e sem persistência automática.
- Se oferecer UTM, informar que se trata de parâmetros de URL; **não** denominar isso QR dinâmico.

### Detalhes UX

- QR preview em painel com contraste e botão principal claro.
- Controles de correção de erro avançados ficam recolhidos, com defaults conservadores.
- Feedback durante geração e exportação apenas quando existir atraso perceptível.
- Ao gerar, anunciar resultado em região `aria-live="polite"`, sem roubar o foco.
- Mensagem específica para dados insuficientes, tamanho excessivo e arquivo inválido.

**Critério de aceite:** gerar e baixar um QR estático de URL é simples, previsível, funciona sem login e resulta em arquivo decodificável.

---

## 5. Concept 03 — Banco público de QR Codes

**Arquivo:** `03_banco_publico.png`.

### Definição do recurso

O banco público é uma **galeria explorável** de QR Codes e modelos disponibilizados com autorização explícita. Ele não é o histórico privado do usuário. Antes de implementar publicação colaborativa, determinar existência de backend, autenticação, armazenamento, moderação, termos e segurança.

### Layout

- Header dark consistente.
- Título `Explore QR Codes criados pela comunidade` **apenas se realmente houver publicação comunitária**; caso contrário usar `Galeria de modelos de QR Codes`.
- Busca por nome, tags e categoria.
- Filtros em chips: `Todos`, `Links`, `Wi-Fi` (somente exemplos com dados não sensíveis), `Contatos`, `Redes sociais`, `Eventos`, `Negócios`.
- Ordenação `Recentes`, `Destaques` e `Populares` **somente quando as métricas existirem**.
- Grid responsivo de cards com QR legível, título, tipo, resumo seguro, autor (quando autorizado) e ações.
- Card abre detalhe/modal acessível, com visualização do destino **antes** de qualquer abertura externa.
- CTA `Usar como modelo` copia apenas parâmetros visuais e dados públicos conforme autorização do criador; não sobrescrever automaticamente dados do usuário.

### Cenários de maturidade

**MVP sem backend:** catálogo estático com modelos criados e verificados pelo projeto, sem simular comunidade, perfis, curtidas, autoria real, publicação nem números de visualizações.

**Evolução com backend:** publicações opt-in, papéis, autenticação para publicação, fila de moderação, denúncia, remoção, paginação, armazenamento confiável e proteção contra abuso. Anonimato público e dados privados precisam de uma decisão de produto explícita.

### Segurança/privacidade (crítico)

- **Nunca publicar automaticamente** QR gerado, histórico ou payload.
- Impedir publicação de segredos óbvios: senhas Wi-Fi, tokens, credenciais e dados privados. Detecção automática é falível e **não substitui moderação e consentimento**.
- Exibir domínio/URL resolvido em texto no detalhe, quando aplicável; avisar sobre destinos externos sem garantir que são seguros.
- Não executar conteúdo de payload, não renderizar HTML/SVG não confiável e não confiar na imagem como prova de benignidade.
- Evitar rastreamento de escaneamentos sem infraestrutura, transparência e base legítima.
- Link externo usando medidas de segurança (`rel="noopener noreferrer"` quando `target="_blank"`).

### Interações

- Card hover com zoom sutil da **moldura**, nunca um efeito que torne o QR instável ao apontar/ler.
- Busca com debounce e indicação clara de filtros ativos.
- Skeleton/empty state somente segundo comportamento real.
- Animação suave no rearranjo dos cards e transição de filtros, sem layout shifts excessivos.
- Modal fecha por Escape, devolve foco ao acionador e contém foco adequadamente.

**Critério de aceite:** biblioteca pública não expõe dados privados, tem filtros funcionais e permite visualizar destino e reutilizar estilos autorizados.

---

## 6. Concept 04 — Editor avançado de QR Codes

**Arquivo:** `04_editor_personalizado.png`.

### Estrutura visual

Um workspace semelhante a editor criativo, sem complexidade excessiva:

- Painel de ferramentas à esquerda: `Conteúdo`, `Estilo`, `Cores`, `Marcadores`, `Logo`, `Moldura`, `Templates`.
- Área central/direita de preview em grande dimensão.
- Presets de estilo junto da visualização, acessíveis por teclado.
- Ações persistentes: `Resetar`, `Copiar`, `PNG`, `SVG`, `Exportar`.
- Layout responsivo com ferramentas transformadas em acordeões/tabs; preview não deve sumir fora da tela.

### Ferramentas previstas

**Conteúdo:** editar payload, com validação apropriada ao tipo selecionado.
**Cores:** primeiro plano, fundo, presets e (apenas se biblioteca suportar corretamente) gradientes.
**Módulos:** quadrado, arredondado, pontos e formas alternativas avaliadas pela decodificação.
**Marcadores:** estilos dos padrões de localização; preservar função dos padrões.
**Logo:** upload local de PNG/JPEG/WebP com dimensão máxima e validação; recorte/redução em cliente quando possível. SVG de usuário desabilitado inicialmente, salvo pipeline seguro validado.
**Moldura:** molduras opcionais externas à quiet zone; texto opcional fora da área codificada.
**Templates:** combinações de estilos testadas em cenários realistas.
**Configurações avançadas:** tamanho, margem, nível de correção de erros; explicar limites e trade-offs.

### Ações e comportamentos

- Preview imediato com transições discretas nos **controles ao redor**, evitando morph do padrão QR durante download/escaneamento.
- `Desfazer`/`Refazer` somente se histórico real de comandos/estado estiver implementado; não exibir controles falsos.
- Preview do QR ampliável com zoom usando controles acessíveis.
- Atalho de teclado apenas quando não conflitar com edição de campos; fornecer ajuda dos atalhos.
- `Restaurar padrão` pede confirmação quando causar perda significativa de configurações.
- Exportar PNG/SVG preservando fidelidade do desenho e legibilidade.
- Avisar quando personalizações reduzirem o contraste/qualidade.
- Se houver teste automatizado de leitura do QR, mostrar `Validado` somente após verificação real. Caso contrário mostrar orientações de leitura, nunca selo enganoso.
- Sessão local opcional: exigir consentimento para persistir conteúdo sensível; priorizar apenas preferências visuais em armazenamento local.

### Mobile

Topo: preview e CTA de exportação. Abaixo: painéis de ajuste em acordeão; CTA sticky com `safe-area-inset-bottom` quando apropriado. Sem barras horizontais gigantes nem canvas que force pinch zoom.

**Critério de aceite:** usuário personaliza, visualiza e exporta QR legível sem sacrificar fluxo, acessibilidade ou desempenho.

---

## 7. Catálogo de interações e animações

O visual é interativo, **mas as animações nunca podem impedir tarefas**.

| Elemento | Comportamento | Duração alvo | Observações |
|---|---|---:|---|
| Botões | Hover luminoso, pequena mudança de elevação | 140–200 ms | `focus-visible` destacado e alternativa sem hover. |
| Cards | Elevação 2–4 px + borda realçada | 180–240 ms | Sem ampliar QR em card de modo que atrapalhe o leitor. |
| Mudança de tabs | Indicador deslizante + troca de conteúdo curta | 180–260 ms | Sem animação de altura brusca que mova o foco. |
| Sidebar/editor | Transição curta de painéis | 220–320 ms | Suportar abertura por teclado/aria. |
| Preview | Fade leve para novo estado validado | 120–200 ms | Não interpolar geometria do QR. |
| Toast | Entrada/saída com opacidade e deslocamento pequeno | 180–250 ms | Feedback acessível; sem múltiplas notificações iguais. |
| Hero ilustrativo | Float lento / ambient glow | 6–10 s | Suspenso ao reduzir movimento; preferir transform/opacity. |
| Filtros de galeria | Transição curta do layout | 180–280 ms | Evitar layout shift e preservar ordem de foco. |
| Menu mobile | Fade + slide de 8–12 px | 180–240 ms | Fechamento por Escape e clique externo apropriado. |
| Exportação | Feedback de sucesso breve | 200–300 ms | Só sinalizar sucesso após resultado efetivo. |

### Regras técnicas de motion

- Preferir `transform` e `opacity` em vez de animar dimensões e sombras pesadas continuamente.
- Desligar floating/parallax e grandes transições em `@media (prefers-reduced-motion: reduce)`.
- Não animar um QR Code validado durante captura, exportação ou escaneamento.
- Evitar scroll-jacking, efeitos com atraso para ações críticas, partículas pesadas e interações dependentes do cursor.
- Se Framer Motion/Motion já integrar a stack, aproveitar; caso contrário, começar com CSS transitions e Web Animations API antes de instalar novas bibliotecas.
- Efeitos 3D ou glow dinâmico devem usar progressive enhancement e respeitar dispositivos de baixo desempenho.

---

## 8. Design responsivo e estados

### Breakpoints indicativos (ajustáveis ao conteúdo)

- **Mobile estreito:** 320–479 px — 1 coluna; menu compacto; CTA full width quando necessário.
- **Mobile amplo:** 480–767 px — cards em 1–2 colunas; preview acima do formulário ou sticky bem testado.
- **Tablet:** 768–1023 px — 2 colunas onde possível; tabs compactas para seleção de tipo.
- **Laptop:** 1024–1439 px — workspace de 2 ou 3 colunas, conforme largura do preview.
- **Desktop amplo:** 1440 px ou mais — container limitado, sem esticar formulários indefinidamente.

Evitar breakpoints rígidos que quebrem em zoom de 200–400%. Testar orientação landscape, teclado virtual, conteúdo longo, nomes extensos e fontes aumentadas.

### Estados obrigatórios dos componentes

Para inputs, cards, botões, QR preview e ações:

- Empty/placeholder
- Loading (somente quando aplicável)
- Success
- Error com instrução recuperável
- Disabled explicado
- Focus-visible
- Hover (quando suporte ao ponteiro existir)
- Offline (para recursos que dependam de rede)

Em uma gallery real, prever `sem resultados`, `falha ao carregar`, `item removido`, `moderação pendente`. Em um gerador local, evitar loading remoto artificial.

---

## 9. Componentes e organização sugerida

**Não impor estes diretórios se o repositório atual tiver outra organização sustentável.** Exemplo para React/TypeScript:

```text
src/
  app/                 # rotas, providers e configuração
  components/
    layout/             # Header, Footer, MobileNav
    ui/                 # Button, Input, Tabs, Dialog, Toast, Tooltip
    qr/                 # QRPreview, QRTypeSelector, QRExportPanel
    gallery/            # QRGalleryCard, GalleryFilters, GalleryDetails
    editor/             # ColorControls, ShapeControls, LogoUpload, TemplatePicker
  features/
    generator/          # tipos, validações, payload builders
    gallery/            # consulta, filtro, catálogo e publicação (se existir)
    editor/             # estado, presets e lógica de personalização
  lib/
    qr/                 # geração, exportação, verificação de leitura
    validation/         # schemas e sanitização contextual
  styles/               # tokens, temas, estados, motion
  tests/                # unitários/integrados/end-to-end
```

Componentes de alto valor para reuso:

- `AppShell`, `Header`, `Footer`, `ThemeToggle`, `MobileNavigation`
- `PrimaryButton`, `IconButton`, `FormField`, `Tabs`, `Accordion`, `Dialog`, `Toast`
- `QRTypeSelector`, `QRFormRenderer`, `QRPreview`, `QRExportPanel`, `QRSafetyNotice`
- `QRStylePreset`, `QRColorPicker`, `QRLogoUploader`
- `GallerySearch`, `GalleryFilterChips`, `PublicQRCard`, `PublicQRDetails`

Separar **conteúdo codificado**, **configuração visual** e **estado da interface**. Nunca deixar o preview criar side effects de publicação ou armazenamento remoto.

### Exemplo de domínio (adapte à stack)

```ts
type QRContent =
  | { kind: 'url'; url: string }
  | { kind: 'text'; text: string }
  | { kind: 'wifi'; ssid: string; password?: string; encryption: 'WPA' | 'WEP' | 'nopass'; hidden?: boolean }
  | { kind: 'email'; to: string; subject?: string; body?: string }
  | { kind: 'phone'; phone: string }
  | { kind: 'vcard'; fullName: string; phone?: string; email?: string };

type QRStyle = {
  foreground: string;
  background: string;
  moduleStyle: 'square' | 'rounded' | 'dot';
  finderStyle: 'square' | 'rounded';
  marginModules: number;
  correctionLevel: 'L' | 'M' | 'Q' | 'H';
};
```

Estes tipos são ilustrativos e incompletos; implementar validadores/serializadores adequados para cada payload. Não usar senhas Wi-Fi em query strings, URLs compartilháveis ou logs.

---

## 10. Qualidade de QR Code e segurança

### QR realmente legível

- Preferir biblioteca consolidada, mantida e compatível com os estilos pretendidos.
- Preservar quiet zone e padrões estruturais.
- Validar contraste inclusive para combinações de gradientes e fundo transparente.
- Em upload de logo, limitar área ocupada e usar correção de erros apropriada; isso **não garante** leitura universal.
- Testar exportações PNG e SVG, inclusive aberturas em leitores diferentes.
- Cobrir payloads Unicode, URLs longas, texto multi-linha, Wi-Fi com escapamento, vCard e limites de capacidade.
- Mostrar advertência em configurações que aumentem a taxa de falha e não chamar um QR de “verificado” sem decodificá-lo.

### Superfícies de risco

- URL maliciosa codificada não é neutralizada pelo gerador; validar sintaxe e explicar risco sem prometer segurança do destino.
- Evitar uso inseguro de `innerHTML` e interpolação de conteúdo não confiável.
- Upload: checar bytes/MIME/dimensões/tamanho e rejeitar formatos inadequados; processamento local preferencial.
- SVG exportado/recebido exige tratamento especial contra script; não renderizar SVG arbitrário de terceiros como HTML executável.
- No banco público, publicação explícita + moderação + possibilidade de remoção + abuso reportado antes de aceitar colaboração real.
- Não registrar em analytics os dados digitados, o QR gerado, senhas Wi-Fi ou dados de contato.
- Proteger tokens, configurar headers apropriados e revisar dependências conforme a stack real.

---

## 11. Acessibilidade, SEO e performance

### Acessibilidade

- WCAG 2.2 AA como meta; testar com teclado, leitor de tela e zoom.
- `label` associado a todos os campos, instruções para formatos especiais.
- Hierarquia correta `h1`–`h3`, landmark `main`, link `Pular para conteúdo`.
- Tabs/menus/diálogos com teclado e ARIA corretos, seguindo práticas WAI-ARIA.
- Modais preservam e restauram foco; Escape fecha quando apropriado.
- Feedback de sucesso/erro anunciável; não comunicar significado exclusivamente por cor.
- `prefers-reduced-motion`, alto contraste e estados `focus-visible`.

### Performance

- Carregar recursos da biblioteca pública sob demanda; imagens de cards com lazy loading quando apropriado.
- Evitar instalar bibliotecas grandes de UI ou animação para um único efeito.
- Otimizar fonts, SVGs e ilustrações; gerador deve continuar utilizável em rede limitada.
- Evitar re-renderizações caras a cada tecla; separar draft de payload validado.
- Monitorar Core Web Vitals em ambiente comparável: metas iniciais LCP ≤ 2,5 s, INP ≤ 200 ms e CLS ≤ 0,1 no percentil 75, **não como métricas já alcançadas**.
- Não bloquear UI com geração de imagem muito grande; usar processamento assíncrono/worker se necessário e medido.

### SEO/portfólio

- `title`, description e OG por rota, canonical e icon.
- Conteúdo indexável onde fizer sentido; a rota do gerador pode ser altamente client-side sem sacrificar informação básica.
- README do repositório com screenshot, stack real, decisões de produto, instruções de execução e demonstração pública.
- Não afirmar “100% privado/offline” se o sistema tiver analytics, fontes remotas, APIs ou carregamentos de terceiros incompatíveis com a afirmação.

---

## 12. Planejamento e execução com Codex

### Fase A — Auditoria do repositório (sem alterações)

1. Localizar o repositório correto e registrar branch/commit SHA.
2. Inventariar stack, rotas, código do gerador, componentes, estilos, testes e dependências.
3. Identificar infraestrutura existente: backend, banco, autenticação, armazenamento, hosting.
4. Comparar com os quatro concepts e mapear reutilização, lacunas e problemas.
5. Verificar se a geração pode ocorrer localmente com a stack existente.
6. Produzir relatório em português com evidências de arquivos e recomendações. Não alterar o repositório ainda.

### Fase B — Design System e shell

- Tokens, fontes, tema, breakpoints, layout global e navegação.
- Componentes base acessíveis.
- Ícones e estados.
- Responsividade do header/footer.
- Screenshot desktop/mobile e testes básicos.

### Fase C — Landing page

- Hero, CTAs, cards de tipos, como funciona, rodapé.
- Motion progressivo e acessível.
- Links funcionais para gerador e biblioteca.

### Fase D — Gerador rápido

- Formulários por tipo, validações, preview local, copiar/exportar.
- Qualidade de QR e testes de leitura.
- Transferência segura ao editor sem expor payload em URL.

### Fase E — Editor avançado

- Controles de estilo, presets, logo e exportação.
- Undo/redo se aprovado e factível, com testes.
- Responsividade do workspace.

### Fase F — Banco público

- **Primeiro avaliar dependências de backend, privacidade e moderação.**
- Se não houver infraestrutura, entregar galeria de **templates curados** com dados de demonstração verificáveis e sem funcionalidade social fingida.
- Comunidade/publicação real fica para entrega específica, após decisões de escopo e controles de segurança.

### Fase G — Qualidade final e publicação

- Auditoria visual/responsiva, segurança, acessibilidade, testes, performance.
- E2E com Playwright ou equivalente, testes unitários conforme stack.
- README, imagens e demonstração, CI e deploy somente após aprovação.

### Evidência mínima por entrega

- O que mudou e por quê.
- Arquivos tocados.
- Testes/comandos executados e resultados.
- Screenshots de desktop (aprox. 1440 px) e mobile (aprox. 390 px) quando interface mudou.
- Riscos ou limitações remanescentes.
- Checklist de critérios de aceite.

---

## 13. Checklist de aceite de frontend

### Global

- [ ] Identidade consistente entre as quatro telas.
- [ ] Navegação real e acessível.
- [ ] Responsivo de 320 px a desktop amplo; sem overflow horizontal.
- [ ] Estados loading/empty/error/success/disabled quando aplicáveis.
- [ ] Contraste validado, navegação por teclado e movimento reduzido.
- [ ] Nenhuma função visual falsa ou botão sem ação.

### Home

- [ ] CTA principal leva ao gerador.
- [ ] Cards de tipos selecionam a modalidade correta.
- [ ] Hero fluido, efeitos não intrusivos e sem degradação mobile.

### Gerador

- [ ] Payload validado e QR decodificável.
- [ ] Prévia corresponde à entrada atual.
- [ ] Exportações corretas em PNG e SVG se suportadas.
- [ ] Copiar/compartilhar usam recursos reais e fallback adequado.

### Biblioteca

- [ ] Busca, filtros e estados vazios reais.
- [ ] Separação entre modelos públicos e histórico privado.
- [ ] Privacidade e transparência sobre conteúdo publicado.
- [ ] Links externos e conteúdo suspeito tratados apropriadamente.

### Editor

- [ ] Personalização sem quebrar QR.
- [ ] Upload de logo validado, com limites.
- [ ] Preview e exportações fiéis.
- [ ] Controles utilizáveis com teclado e em tela pequena.

### Portfólio

- [ ] README e screenshots atualizados.
- [ ] Stack e funcionalidades descritas com precisão.
- [ ] Build/test/lint passam conforme scripts existentes.
- [ ] Deploy aprovado e URL pública funcionando, quando autorizado.

---

## 14. Prompt de execução inicial para Codex

> **Copiar para o Codex juntamente com este arquivo e os quatro concepts:**
>
> Atue como arquiteto frontend sênior, UX engineer e tech lead do QR.APP 2.0. Analise primeiro o repositório GitHub autorizado e leia integralmente `FRONTEND_SPEC_QRAPP_2_0.md` e as quatro imagens. Execute **somente a Fase A**: inventarie stack, arquitetura, rotas, bibliotecas de QR, estado do UI, problemas, testes, riscos e lacunas para reproduzir a linguagem visual dos concepts. Recomende arquitetura e plano incremental preservando o que estiver funcional. Registre arquivos e commit SHA como evidências, identifique se o banco público é viável como colaboração real ou deve começar como galeria curada, e proponha a primeira entrega técnica com critérios de aceite. **Não modifique o projeto, não publique nem crie commits até que eu aprove o relatório.** Ao encerrar, apresente decisões que necessitam da minha aprovação e a sequência das fases B–G.

---

## 15. Critérios de produto para evitar expansão desnecessária

- O **núcleo do QR.APP** é geração e exportação rápida de códigos estáticos.
- A galeria pública e editor avançado ampliam o valor, mas não devem travar a entrega do gerador.
- QR dinâmico, rastreamento de scan, analytics e redirecionamento editável exigem arquitetura e custos adicionais; **fora do escopo padrão da v2.0**.
- Login e banco de dados só entram quando forem necessários para funcionalidades aprovadas.
- Evitar confundir "design inspirador" com "implementação fiel a uma imagem": acessibilidade, integridade e ergonomia prevalecem.

**Resultado pretendido:** QR.APP 2.0 como produto web leve, com acabamento profissional, demonstrável no portfólio e com base técnica sustentável.
