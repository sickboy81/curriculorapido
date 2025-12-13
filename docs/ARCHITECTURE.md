# Arquitetura do Projeto

## Visão Geral

O Currículo Rápido é uma Single Page Application (SPA) construída com React e TypeScript, utilizando Vite como build tool.

## Estrutura de Pastas

```
curriculo-rapido/
├── components/          # Componentes React reutilizáveis
│   ├── ATSChecker.tsx
│   ├── ResumeForm.tsx
│   ├── ResumePreview.tsx
│   └── ...
├── hooks/               # Custom React hooks
│   ├── useDebounce.ts
│   ├── useKeyboardShortcut.ts
│   └── useThrottle.ts
├── services/            # Serviços e lógica de negócio
│   └── jobSuggestionsService.ts
├── utils/               # Funções utilitárias
│   ├── analytics.ts
│   ├── exporters.ts
│   ├── validators.ts
│   └── ...
├── docs/                # Documentação
│   ├── ARCHITECTURE.md
│   └── COMPONENTS.md
├── public/              # Arquivos estáticos
│   ├── robots.txt
│   ├── sitemap.xml
│   └── ...
├── App.tsx              # Componente raiz
├── index.tsx            # Entry point
├── index.html           # HTML principal
├── types.ts             # Definições TypeScript
├── translations-pt.ts   # Traduções
└── vite.config.ts       # Configuração Vite
```

## Fluxo de Dados

### Estado Global
O estado principal é gerenciado no `App.tsx`:
- `resumeData`: Dados do currículo atual
- `template`: Template selecionado
- Estados de modais e UI

### Armazenamento
- **localStorage**: Armazenamento local dos dados
- **resumeStorage**: Gerenciamento de múltiplos currículos
- **versionHistory**: Histórico de versões

### Fluxo de Criação de Currículo

1. Usuário preenche formulário (`ResumeForm`)
2. Dados são atualizados em tempo real (`resumeData`)
3. Preview é atualizado automaticamente (`ResumePreview`)
4. Auto-save salva no localStorage
5. Usuário pode exportar (PDF, Word, JSON)

## Geração de PDF

### Processo
1. Captura do elemento `.print-area` com `html2canvas`
2. Conversão para imagem
3. Criação de PDF com `jsPDF`
4. Download do arquivo

### Otimizações
- Renderização em alta resolução
- Ajuste de dimensões
- Preservação de formatação

## Sistema de Templates

### Estrutura
Cada template é um componente React que recebe `ResumeData` e renderiza o layout específico.

### Templates Disponíveis
- `ModernTemplate`
- `ClassicTemplate`
- `SidebarTemplate`
- `MinimalistTemplate`
- `ExecutiveTemplate`
- `BoldTemplate`
- `TimelineTemplate`
- `SwissTemplate`
- `GridTemplate`

## Performance

### Code Splitting
- Lazy loading de componentes pesados (SEO, Blog, Tips)
- Code splitting automático por Vite
- Chunks separados por vendor

### Otimizações
- Debounce em inputs
- Throttle em scroll
- Memoização de componentes pesados
- Service Worker para cache

## SEO

### Structured Data
- JSON-LD schemas
- Organization schema
- Article schema
- BreadcrumbList schema
- HowTo schema

### Meta Tags
- Open Graph
- Twitter Cards
- Canonical URLs
- Hreflang (pt-BR)

### Sitemap
- Sitemap.xml dinâmico
- URLs principais
- Frequência de atualização

## Acessibilidade

### ARIA Labels
- Labels em todos os inputs
- Roles apropriados
- Estados de aria-expanded, aria-hidden

### Navegação por Teclado
- Tab navigation
- Atalhos de teclado
- Focus management

### Contraste
- Cores com contraste adequado
- Focus visible
- Estados de hover/active

## Segurança

### Sanitização
- DOMPurify para HTML
- Sanitização de inputs
- Validação de tipos

### Privacidade
- Dados armazenados localmente
- Sem envio para servidor
- Sem tracking de dados pessoais

## Build e Deploy

### Build Process
1. TypeScript compilation
2. React compilation
3. CSS processing (Tailwind)
4. Asset optimization
5. Code splitting
6. Service Worker generation

### Deploy
- Vercel (recomendado)
- Netlify
- Qualquer servidor estático

## Extensibilidade

### Adicionar Novo Template
1. Criar componente em `components/templates/`
2. Adicionar tipo em `types.ts`
3. Adicionar renderização em `ResumePreview.tsx`
4. Adicionar preview em `TemplateGallery.tsx`

### Adicionar Nova Funcionalidade
1. Criar componente em `components/`
2. Adicionar utilitários em `utils/` se necessário
3. Integrar em `App.tsx`
4. Adicionar analytics se relevante

