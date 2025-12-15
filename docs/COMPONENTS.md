# Documentação de Componentes

Esta documentação descreve os principais componentes do Currículo Rápido.

## Componentes Principais

### App.tsx
Componente raiz da aplicação. Gerencia o estado global, integra todos os componentes e fornece a estrutura principal da página.

**Principais responsabilidades:**
- Gerenciamento de estado do currículo (`resumeData`)
- Geração de PDF
- Integração de modais e componentes
- Analytics e tracking
- Gerenciamento de múltiplos currículos

### ResumeForm.tsx
Formulário principal para preenchimento dos dados do currículo.

**Funcionalidades:**
- Seções colapsáveis (Dados Pessoais, Experiência, Formação, etc.)
- Validação em tempo real
- Editor de texto rico para descrições
- Upload e otimização de foto
- Sanitização de inputs

**Props:**
- `data: ResumeData` - Dados do currículo
- `onChange: (data: ResumeData) => void` - Callback de mudança

### ResumePreview.tsx
Visualização do currículo em tempo real.

**Funcionalidades:**
- Renderização de diferentes templates
- Suporte a markdown nas descrições
- Preview responsivo
- Área de impressão configurada

**Props:**
- `data: ResumeData` - Dados do currículo
- `template: TemplateType` - Template selecionado

### ATSChecker.tsx
Verificador de compatibilidade ATS (Applicant Tracking System).

**Funcionalidades:**
- Análise de campos obrigatórios
- Verificação de palavras-chave
- Sugestões de melhoria
- Score de compatibilidade

**Props:**
- `resumeData: ResumeData` - Dados do currículo
- `showAsSection?: boolean` - Exibir como seção ou modal

### JobSuggestions.tsx
Sugestões inteligentes baseadas em descrição de vaga.

**Funcionalidades:**
- Análise de palavras-chave
- Score de compatibilidade
- Identificação de palavras-chave faltantes
- Sugestões personalizadas

**Props:**
- `resumeData: ResumeData` - Dados do currículo

### ResumeManager.tsx
Gerenciador de múltiplos currículos salvos.

**Funcionalidades:**
- Listar currículos salvos
- Salvar novo currículo
- Carregar currículo existente
- Duplicar currículo
- Renomear currículo
- Excluir currículo
- Exportar currículo

**Props:**
- `currentResume: ResumeData` - Currículo atual
- `currentTemplate: TemplateType` - Template atual
- `onLoadResume: (resume: SavedResume) => void` - Callback de carregamento
- `onNewResume: () => void` - Callback de novo currículo
- `onClose: () => void` - Callback de fechar

### TemplateGallery.tsx
Galeria visual de templates de currículo.

**Funcionalidades:**
- Preview de todos os templates
- Filtros por categoria
- Visualização em grid ou lista
- Seleção de template

**Props:**
- `isOpen: boolean` - Estado do modal
- `onClose: () => void` - Callback de fechar
- `currentTemplate: TemplateType` - Template atual
- `onSelectTemplate: (template: TemplateType) => void` - Callback de seleção
- `resumeData: ResumeData` - Dados do currículo para preview

### ExportMenu.tsx
Menu de exportação de currículo.

**Funcionalidades:**
- Exportar para PDF
- Exportar para Word (DOCX)
- Exportar para JSON
- Importar de JSON
- Imprimir diretamente

**Props:**
- `resumeData: ResumeData` - Dados do currículo
- `template: TemplateType` - Template atual
- `onExport: (format: string) => void` - Callback de exportação

### ShareModal.tsx
Modal de compartilhamento de currículo.

**Funcionalidades:**
- Gerar link único de compartilhamento
- Copiar link para área de transferência
- Compartilhar em redes sociais
- QR Code para compartilhamento

**Props:**
- `isOpen: boolean` - Estado do modal
- `onClose: () => void` - Callback de fechar
- `resumeData: ResumeData` - Dados do currículo

### VersionHistory.tsx
Histórico de versões do currículo.

**Funcionalidades:**
- Listar todas as versões
- Visualizar diferenças
- Restaurar versão anterior
- Excluir versões antigas

**Props:**
- `isOpen: boolean` - Estado do modal
- `onClose: () => void` - Callback de fechar
- `resumeId: string | null` - ID do currículo
- `onRestore: (version: ResumeVersion) => void` - Callback de restauração

### ResumeProgress.tsx
Indicador de progresso do preenchimento.

**Funcionalidades:**
- Barra de progresso visual (0-100%)
- Checklist de itens preenchidos
- Status dinâmico (Completo, Quase lá, etc.)

**Props:**
- `resumeData: ResumeData` - Dados do currículo

### ResumeStats.tsx
Estatísticas do currículo.

**Funcionalidades:**
- Contagem de experiências
- Contagem de formações
- Número de habilidades
- Número de idiomas
- Total de palavras
- Status da foto

**Props:**
- `resumeData: ResumeData` - Dados do currículo

### ResumeValidator.tsx
Validador completo do currículo.

**Funcionalidades:**
- Validação de campos obrigatórios
- Verificação de formato (email, telefone, URL)
- Avisos sobre campos importantes
- Sugestões de melhoria
- Botões de correção rápida

**Props:**
- `resumeData: ResumeData` - Dados do currículo
- `onFix?: (issue: ValidationIssue) => void` - Callback de correção

### QuickActions.tsx
Ações rápidas para o currículo.

**Funcionalidades:**
- Copiar texto do currículo
- Baixar PDF
- Compartilhar
- Imprimir
- Visualizar preview
- Ver estatísticas

**Props:**
- `resumeData: ResumeData` - Dados do currículo
- `onCopy?: () => void` - Callback de copiar
- `onDownload?: () => void` - Callback de download
- `onShare?: () => void` - Callback de compartilhar
- `onPrint?: () => void` - Callback de imprimir
- `onPreview?: () => void` - Callback de preview

### ResumeTipsInline.tsx
Dicas rápidas inline com filtros.

**Funcionalidades:**
- Dicas categorizadas (Geral, ATS, Conteúdo, Design)
- Filtros por categoria
- Seção expansível/colapsável

### RichTextEditor.tsx
Editor de texto rico para descrições.

**Funcionalidades:**
- Formatação (negrito, itálico)
- Listas (ordenadas e não ordenadas)
- Atalhos de teclado
- Contador de caracteres
- Undo/Redo

**Props:**
- `value: string` - Valor atual
- `onChange: (value: string) => void` - Callback de mudança
- `placeholder?: string` - Placeholder

### MarkdownText.tsx
Renderizador seguro de markdown.

**Funcionalidades:**
- Parse de markdown para HTML
- Sanitização com DOMPurify
- Suporte a negrito, itálico, listas

**Props:**
- `text: string` - Texto em markdown
- `className?: string` - Classes CSS

### Tooltip.tsx
Componente de tooltip reutilizável.

**Funcionalidades:**
- Posicionamento inteligente
- Delay configurável
- Responsivo
- Acessível (ARIA)

**Props:**
- `content: string` - Conteúdo do tooltip
- `children: React.ReactNode` - Elemento trigger
- `position?: 'top' | 'bottom' | 'left' | 'right'` - Posição
- `delay?: number` - Delay em ms

### Toast.tsx
Sistema de notificações toast.

**Funcionalidades:**
- Notificações de sucesso, erro, aviso, info
- Auto-dismiss configurável
- Animações suaves
- Stack de múltiplos toasts

**Hook:**
```typescript
const { success, error, warning, info } = useToast();
```

### ScrollToTop.tsx
Botão de voltar ao topo.

**Funcionalidades:**
- Aparece após scroll
- Scroll suave
- Animação de fade

### AccessibilityHelper.tsx
Helper de acessibilidade.

**Funcionalidades:**
- Controle de tamanho de fonte
- Botão flutuante
- Reset rápido

### AutoSaveIndicator.tsx
Indicador de status de auto-save.

**Funcionalidades:**
- Status visual (salvando, salvo, erro)
- Timestamp da última salvamento
- Feedback visual

**Props:**
- `status: 'saving' | 'saved' | 'error'` - Status atual
- `lastSaved?: Date` - Data do último salvamento

### ErrorBoundary.tsx
Error Boundary para capturar erros.

**Funcionalidades:**
- Captura de erros JavaScript
- UI de fallback
- Relatório de erros

### Skeleton.tsx
Componentes de skeleton loading.

**Componentes:**
- `SkeletonCard` - Card de skeleton
- `SkeletonText` - Texto de skeleton
- `SkeletonCircle` - Círculo de skeleton

### KeyboardShortcutsHelp.tsx
Modal de ajuda com atalhos de teclado.

**Funcionalidades:**
- Lista de atalhos disponíveis
- Categorização
- Descrições

**Props:**
- `isOpen: boolean` - Estado do modal
- `onClose: () => void` - Callback de fechar

## Componentes de Conteúdo

### SEOContent.tsx
Conteúdo SEO da página.

**Seções:**
- Como fazer um currículo (passo a passo)
- Por que escolher o Currículo Rápido
- Privacidade e segurança
- FAQs
- Compatibilidade ATS

### CareerBlog.tsx
Blog de carreira com artigos.

**Funcionalidades:**
- Lista de artigos
- Schema Article para SEO
- Tracking de visualizações

### ResumeTips.tsx
Dicas de currículo.

**Funcionalidades:**
- Dicas categorizadas
- Erros comuns
- Schema ItemList para SEO

## Hooks Customizados

### useDebounce.ts
Hook para debounce de valores.

```typescript
const debouncedValue = useDebounce(value, delay);
```

### useThrottle.ts
Hook para throttle de funções.

```typescript
const throttledFn = useThrottle(fn, delay);
```

### useKeyboardShortcut.ts
Hook para atalhos de teclado.

```typescript
useKeyboardShortcut('ctrl+s', handleSave);
```

## Utilitários

### utils/exporters.ts
Funções de exportação:
- `exportToWord()` - Exportar para DOCX
- `exportToJSON()` - Exportar para JSON
- `importFromJSON()` - Importar de JSON

### utils/validators.ts
Funções de validação:
- `validateEmail()` - Validar email
- `validatePhone()` - Validar telefone
- `validateURL()` - Validar URL
- `validateRequired()` - Validar campo obrigatório

### utils/sanitize.ts
Funções de sanitização:
- `sanitizeText()` - Sanitizar texto
- `sanitizeEmail()` - Sanitizar email
- `sanitizePhone()` - Sanitizar telefone
- `sanitizeURL()` - Sanitizar URL

### utils/resumeStorage.ts
Gerenciamento de armazenamento:
- `save()` - Salvar currículo
- `get()` - Obter currículo
- `getAll()` - Obter todos
- `delete()` - Excluir
- `duplicate()` - Duplicar

### utils/versionHistory.ts
Gerenciamento de versões:
- `saveVersion()` - Salvar versão
- `getVersions()` - Obter versões
- `restoreVersion()` - Restaurar versão

### utils/shareLink.ts
Compartilhamento via link:
- `generateShareLink()` - Gerar link
- `loadFromShareLink()` - Carregar de link

### utils/analytics.ts
Tracking de eventos:
- `trackEvent()` - Evento customizado
- `trackPageview()` - Visualização de página
- `trackShareLink()` - Compartilhamento

### utils/imageOptimizer.ts
Otimização de imagens:
- `optimizeImage()` - Otimizar imagem
- `validateImageFile()` - Validar arquivo

### utils/markdownParser.ts
Parser de markdown:
- `parseMarkdown()` - Parse para HTML
- `stripMarkdown()` - Remover markdown

## Serviços

### services/jobSuggestionsService.ts
Análise de descrição de vaga:
- `analyzeJobDescription()` - Analisar vaga
- Extração de palavras-chave
- Cálculo de score de compatibilidade


