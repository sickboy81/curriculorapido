# Currículo Rápido - Gerador de Currículo Profissional

<div align="center">
  <h3>🚀 Crie seu currículo profissional em minutos, totalmente gratuito!</h3>
  <p>Gerador de currículo online otimizado para sistemas ATS (Gupy, Kenoby, Vagas.com)</p>
</div>

## 📋 Sobre o Projeto

O **Currículo Rápido** é uma aplicação web moderna e gratuita para criação de currículos profissionais em PDF. Desenvolvido especificamente para o mercado brasileiro, oferece modelos de currículo otimizados para sistemas ATS (Applicant Tracking System) e totalmente compatível com dispositivos móveis.

### ✨ Principais Funcionalidades

#### 🎨 **Criação de Currículo**
- ✅ **8 Modelos Profissionais**: Moderno, Clássico, Sidebar, Minimalista, Executivo, Bold, Timeline, Swiss, Grid
- ✅ **Editor Visual em Tempo Real**: Veja seu currículo sendo criado enquanto preenche os dados
- ✅ **Editor de Texto Rico**: Formatação com negrito, itálico, listas e markdown
- ✅ **Upload de Foto**: Otimização automática de imagens
- ✅ **Personalização**: Escolha de cores e temas

#### 📊 **Ferramentas Avançadas**
- ✅ **Verificador ATS**: Analise a compatibilidade do seu currículo com sistemas ATS
- ✅ **Sugestões Inteligentes para Vagas**: Cole a descrição da vaga e receba sugestões personalizadas
- ✅ **Validador de Currículo**: Verificação automática de campos obrigatórios e sugestões de melhoria
- ✅ **Indicador de Progresso**: Acompanhe o preenchimento do seu currículo
- ✅ **Estatísticas**: Visualize métricas do seu currículo (experiências, habilidades, palavras, etc.)

#### 💾 **Gerenciamento**
- ✅ **Múltiplos Currículos**: Salve e gerencie vários currículos
- ✅ **Histórico de Versões**: Acompanhe mudanças e restaure versões anteriores
- ✅ **Compartilhamento**: Compartilhe seu currículo via link único
- ✅ **Auto-save**: Salvamento automático dos dados

#### 📤 **Exportação**
- ✅ **PDF de Alta Qualidade**: Download em PDF pronto para impressão
- ✅ **Word (DOCX)**: Exportação para Microsoft Word
- ✅ **JSON**: Backup e restauração de dados
- ✅ **Impressão Direta**: Imprima diretamente do navegador
- ✅ **Copiar Texto**: Copie o conteúdo do currículo para área de transferência

#### 🎯 **UX/UI**
- ✅ **Design Responsivo**: Funciona perfeitamente em desktop, tablet e mobile
- ✅ **Acessibilidade**: Controles de fonte, navegação por teclado, ARIA labels
- ✅ **Atalhos de Teclado**: Produtividade aumentada com shortcuts
- ✅ **Tooltips Contextuais**: Dicas e ajuda em tempo real
- ✅ **Animações Suaves**: Transições e microinterações
- ✅ **Modo Offline**: Service Worker para funcionamento offline

#### 📚 **Conteúdo Educacional**
- ✅ **Blog de Carreira**: Artigos sobre desenvolvimento profissional
- ✅ **Dicas de Currículo**: Guias e melhores práticas
- ✅ **Dicas Inline**: Sugestões contextuais enquanto você cria
- ✅ **FAQ Completo**: Respostas para dúvidas comuns

#### 🔒 **Privacidade e Segurança**
- ✅ **100% Local**: Seus dados nunca saem do seu navegador
- ✅ **Sem Cadastro**: Use sem criar conta
- ✅ **Sem Marca d'Água**: PDFs limpos e profissionais
- ✅ **Sanitização de Inputs**: Proteção contra XSS

## 🚀 Como Usar

### Instalação Local

1. **Clone o repositório**
   ```bash
   git clone https://github.com/seu-usuario/curriculo-rapido.git
   cd curriculo-rapido
   ```

2. **Instale as dependências**
   ```bash
   npm install
   ```

3. **Execute em modo de desenvolvimento**
   ```bash
   npm run dev
   ```

4. **Build para produção**
   ```bash
   npm run build
   ```

5. **Preview do build**
   ```bash
   npm run preview
   ```

### Uso Online

Acesse [curriculorapido.com.br](https://curriculorapido.com.br) e comece a criar seu currículo imediatamente!

## 🛠️ Tecnologias Utilizadas

- **React 19** - Framework JavaScript
- **TypeScript** - Tipagem estática
- **Vite** - Build tool e dev server
- **Tailwind CSS** - Framework CSS utilitário
- **jsPDF** - Geração de PDFs
- **html2canvas** - Captura de tela para PDF
- **docx** - Geração de documentos Word
- **DOMPurify** - Sanitização de HTML
- **Lucide React** - Ícones
- **PWA** - Progressive Web App (offline support)

## 📁 Estrutura do Projeto

```
curriculo-rapido/
├── components/          # Componentes React
│   ├── ATSChecker.tsx
│   ├── ResumeForm.tsx
│   ├── ResumePreview.tsx
│   ├── TemplateGallery.tsx
│   └── ...
├── hooks/               # Custom hooks
│   ├── useDebounce.ts
│   ├── useKeyboardShortcut.ts
│   └── useThrottle.ts
├── services/            # Serviços e APIs
│   └── jobSuggestionsService.ts
├── utils/              # Utilitários
│   ├── analytics.ts
│   ├── exporters.ts
│   ├── validators.ts
│   └── ...
├── types.ts            # Definições TypeScript
├── translations-pt.ts   # Traduções em português
└── App.tsx             # Componente principal
```

## 🎨 Modelos de Currículo Disponíveis

1. **Moderno** - Design limpo e contemporâneo
2. **Clássico** - Estilo tradicional e profissional
3. **Sidebar** - Layout com barra lateral
4. **Minimalista** - Foco no conteúdo
5. **Executivo** - Para cargos de liderança
6. **Bold** - Design ousado e impactante
7. **Timeline** - Linha do tempo visual
8. **Swiss** - Estilo suíço minimalista
9. **Grid** - Layout em grade

## 📝 Funcionalidades Detalhadas

### Verificador ATS
Analise seu currículo e receba feedback sobre:
- Informações de contato
- Resumo profissional
- Palavras-chave relevantes
- Formatação ATS-friendly
- Sugestões de melhoria

### Sugestões para Vagas
Cole a descrição de uma vaga e receba:
- Score de compatibilidade (0-100%)
- Palavras-chave encontradas
- Palavras-chave faltantes
- Sugestões personalizadas

### Gerenciamento de Currículos
- Salve múltiplos currículos com nomes personalizados
- Duplique currículos para criar variações
- Renomeie e organize seus currículos
- Exporte individualmente
- Exclua quando não precisar mais

### Histórico de Versões
- Acompanhe todas as mudanças
- Restaure versões anteriores
- Veja quando cada versão foi criada
- Compare diferentes versões

## 🔧 Scripts Disponíveis

- `npm run dev` - Inicia servidor de desenvolvimento
- `npm run build` - Cria build de produção
- `npm run preview` - Preview do build de produção

## 📱 PWA (Progressive Web App)

O site funciona como PWA, permitindo:
- Instalação no dispositivo
- Funcionamento offline
- Cache inteligente de recursos
- Atualizações automáticas

## 🌐 SEO e Performance

- ✅ Meta tags otimizadas
- ✅ Structured Data (JSON-LD)
- ✅ Sitemap.xml dinâmico
- ✅ Robots.txt configurado
- ✅ Lazy loading de componentes
- ✅ Code splitting automático
- ✅ Otimização de imagens
- ✅ Service Worker para cache

## 🤝 Contribuindo

Contribuições são bem-vindas! Sinta-se à vontade para:
1. Fazer fork do projeto
2. Criar uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abrir um Pull Request

## 📄 Licença

Este projeto é gratuito e open source. Use livremente para criar seus currículos!

## 🙏 Agradecimentos

- [React](https://react.dev/)
- [Vite](https://vitejs.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Lucide Icons](https://lucide.dev/)
- [jsPDF](https://github.com/parallax/jsPDF)
- [html2canvas](https://html2canvas.hertzen.com/)

## 📞 Suporte

Para dúvidas, sugestões ou problemas:
- Abra uma issue no GitHub
- Acesse o site e use a seção de FAQ

---

<div align="center">
  <p>Feito com ❤️ para ajudar profissionais brasileiros a encontrarem seu emprego dos sonhos</p>
  <p><strong>Currículo Rápido</strong> - Seu futuro começa aqui!</p>
</div>
