import React, { useState, useEffect, Suspense, lazy } from 'react';
import { ResumeForm } from './components/ResumeForm';
import { ResumePreview } from './components/ResumePreview';
import { PrivacyModal, TermsModal, ConfirmModal } from './components/LegalModals';
import { AdPlaceholder } from './components/AdPlaceholder';

// Lazy load heavy SEO components for better performance
const SEOContent = lazy(() => import('./components/SEOContent').then(module => ({ default: module.SEOContent })));
const ResumeTips = lazy(() => import('./components/ResumeTips').then(module => ({ default: module.ResumeTips })));
const CareerBlog = lazy(() => import('./components/CareerBlog').then(module => ({ default: module.CareerBlog })));
import { ResumeData, INITIAL_DATA, INITIAL_DATA_PT, INITIAL_DATA_EN, INITIAL_DATA_ES, BLANK_DATA, TemplateType } from './types';
import { Printer, FileText, LayoutTemplate, Github, Heart, Trash2, Wand2, Download, Loader2, Globe, Share2, Facebook, Linkedin, Twitter, Menu, X, MoreVertical } from 'lucide-react';
import { LanguageProvider, useLanguage, Language } from './LanguageContext';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

const AppContent = () => {
  const { t, language, setLanguage } = useLanguage();

  // Initialize state from localStorage if available, otherwise use defaults
  const [resumeData, setResumeData] = useState<ResumeData>(() => {
    if (typeof window !== 'undefined') {
      try {
        const savedData = localStorage.getItem('resume_builder_data');
        if (savedData) {
          return JSON.parse(savedData);
        }
      } catch (error) {
        console.error('Erro ao carregar dados:', error);
      }
    }
    // Default to PT if no saved data
    return INITIAL_DATA_PT;
  });

  const [template, setTemplate] = useState<TemplateType>(() => {
    if (typeof window !== 'undefined') {
      try {
        const savedTemplate = localStorage.getItem('resume_builder_template');
        if (savedTemplate) {
          return savedTemplate as TemplateType;
        }
      } catch (error) {
        console.error('Erro ao carregar template:', error);
      }
    }
    return 'modern';
  });

  // Modal states
  const [showPrivacy, setShowPrivacy] = useState(false);
  const [showTerms, setShowTerms] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  // Confirmation Modal State
  const [confirmType, setConfirmType] = useState<'clear' | 'example' | null>(null);

  // PDF Generation State
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);

  // Persistence Effects
  useEffect(() => {
    localStorage.setItem('resume_builder_data', JSON.stringify(resumeData));
  }, [resumeData]);

  useEffect(() => {
    localStorage.setItem('resume_builder_template', template);
  }, [template]);

  const handleDownloadPdf = async () => {
    if (typeof window !== 'undefined') {
      setIsGeneratingPdf(true);

      try {
        // Get the print area
        const printArea = document.querySelector('.print-area') as HTMLElement;
        if (!printArea) {
          throw new Error('Print area not found');
        }

        // Temporarily show the print area for capture
        const originalDisplay = printArea.style.display;
        printArea.style.display = 'block';
        printArea.style.position = 'relative';
        printArea.style.width = '210mm';
        printArea.style.height = 'auto';
        printArea.style.background = 'white';

        // Wait for layout
        await new Promise(resolve => setTimeout(resolve, 300));

        // Capture with html2canvas
        const canvas = await html2canvas(printArea, {
          scale: 2,
          useCORS: true,
          logging: false,
          backgroundColor: '#ffffff',
          windowWidth: 794,  // A4 width in pixels at 96 DPI
          windowHeight: 1123 // A4 height in pixels at 96 DPI
        });

        // Restore original display
        printArea.style.display = originalDisplay;
        printArea.style.position = '';
        printArea.style.width = '';
        printArea.style.height = '';

        // Convert canvas to PDF
        const imgData = canvas.toDataURL('image/jpeg', 0.98);
        const pdf = new jsPDF({
          orientation: 'portrait',
          unit: 'mm',
          format: 'a4'
        });

        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = pdf.internal.pageSize.getHeight();

        pdf.addImage(imgData, 'JPEG', 0, 0, pdfWidth, pdfHeight);

        // Save with filename
        const safeName = resumeData.fullName
          ? resumeData.fullName.trim().replace(/[^a-z0-9]/gi, '_').toLowerCase()
          : 'curriculo';
        pdf.save(`${safeName}_cv.pdf`);

      } catch (error) {
        console.error("PDF generation failed:", error);
        alert("Erro ao gerar PDF. Por favor, tente novamente.");
      } finally {
        setIsGeneratingPdf(false);
      }
    }
  };

  const shareUrl = "https://curriculorapido.com.br";
  const shareText = t('hero.title');

  const handleShare = (platform: 'whatsapp' | 'facebook' | 'linkedin' | 'twitter') => {
    let url = '';
    switch (platform) {
      case 'whatsapp':
        url = `https://api.whatsapp.com/send?text=${encodeURIComponent(shareText + ' ' + shareUrl)}`;
        break;
      case 'facebook':
        url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`;
        break;
      case 'linkedin':
        url = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`;
        break;
      case 'twitter':
        url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`;
        break;
    }
    window.open(url, '_blank');
  };

  const onConfirmAction = () => {
    if (confirmType === 'clear') {
      setResumeData(BLANK_DATA);
      localStorage.setItem('resume_builder_data', JSON.stringify(BLANK_DATA));
    } else if (confirmType === 'example') {
      let exampleData = INITIAL_DATA_PT;
      if (language === 'en') exampleData = INITIAL_DATA_EN;
      if (language === 'es') exampleData = INITIAL_DATA_ES;

      setResumeData(exampleData);
      localStorage.setItem('resume_builder_data', JSON.stringify(exampleData));
    }
    setConfirmType(null);
  };

  const getConfirmProps = () => {
    if (confirmType === 'clear') {
      return {
        title: t('modals.clearTitle'),
        message: t('modals.clearMsg'),
        confirmText: t('modals.clearConfirm'),
        isDestructive: true
      };
    } else {
      return {
        title: t('modals.exampleTitle'),
        message: t('modals.exampleMsg'),
        confirmText: t('modals.exampleConfirm'),
        isDestructive: false
      };
    }
  };

  const modalProps = getConfirmProps();

  return (
    <div className="font-sans text-slate-900 bg-slate-50">

      {/* --- SCREEN AREA --- */}
      <div className="screen-area min-h-screen flex flex-col">

        {/* Navbar */}
        <nav className="bg-white border-b border-slate-200 px-4 sm:px-6 lg:px-8 py-3 sticky top-0 z-50 shadow-sm" aria-label="Navegação principal">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="bg-purple-600 p-2 rounded-lg">
                <FileText className="w-5 h-5 text-white" />
              </div>
              <div className="text-xl font-bold tracking-tight text-slate-900 hidden sm:block">Currículo Rápido</div>
            </div>

            <div className="flex items-center gap-2 sm:gap-4">
              {/* Desktop: Language Selector */}
              <div className="hidden lg:flex items-center gap-1 bg-slate-100 p-1 rounded-lg border border-slate-200">
                <Globe className="w-4 h-4 text-slate-500 ml-2" />
                <select
                  value={language}
                  onChange={(e) => setLanguage(e.target.value as Language)}
                  className="bg-transparent text-sm font-medium text-slate-700 focus:outline-none cursor-pointer py-1 pr-1"
                >
                  <option value="pt">PT</option>
                  <option value="en">EN</option>
                  <option value="es">ES</option>
                </select>
              </div>



              {/* Template Selector - Always Visible but Adaptive */}
              <div className="flex items-center gap-2 bg-slate-100 p-1 rounded-lg border border-slate-200">
                <LayoutTemplate className="w-4 h-4 text-slate-500 ml-2" />
                <select
                  value={template}
                  onChange={(e) => setTemplate(e.target.value as TemplateType)}
                  className="bg-transparent text-sm font-medium text-slate-700 focus:outline-none cursor-pointer py-1 pr-2 max-w-[110px] sm:max-w-none"
                >
                  <optgroup label={t('templates.groups.classic')}>
                    <option value="modern">{t('templates.modern')}</option>
                    <option value="classic">{t('templates.classic')}</option>
                    <option value="elegant">{t('templates.elegant')}</option>
                  </optgroup>
                  <optgroup label={t('templates.groups.creative')}>
                    <option value="creative">{t('templates.creative')}</option>
                    <option value="bold">{t('templates.bold')}</option>
                    <option value="tech">{t('templates.tech')}</option>
                  </optgroup>
                  <optgroup label={t('templates.groups.structured')}>
                    <option value="sidebar">{t('templates.sidebar')}</option>
                    <option value="compact">{t('templates.compact')}</option>
                    <option value="minimalist">{t('templates.minimalist')}</option>
                  </optgroup>
                  <optgroup label={t('templates.groups.new')}>
                    <option value="timeline">{t('templates.timeline')}</option>
                    <option value="swiss">{t('templates.swiss')}</option>
                    <option value="grid">{t('templates.grid')}</option>
                  </optgroup>
                </select>
              </div>

              {/* Download Button - Icon on Mobile, Text on Desktop */}
              <button
                onClick={handleDownloadPdf}
                disabled={isGeneratingPdf}
                type="button"
                className="flex items-center gap-2 bg-slate-900 hover:bg-slate-800 disabled:bg-slate-700 text-white px-3 sm:px-4 py-2 rounded-lg font-medium transition-colors shadow-sm text-sm"
              >
                {isGeneratingPdf ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span className="hidden sm:inline">{t('nav.generating')}</span>
                  </>
                ) : (
                  <>
                    <Download className="w-4 h-4" />
                    <span className="hidden sm:inline">{t('nav.download')}</span>
                  </>
                )}
              </button>

              {/* Mobile Menu Toggle */}
              <div className="relative lg:hidden">
                <button
                  onClick={() => setShowMobileMenu(!showMobileMenu)}
                  className="p-2 text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
                >
                  {showMobileMenu ? <X className="w-5 h-5" /> : <MoreVertical className="w-5 h-5" />}
                </button>

                {/* Mobile Dropdown Menu */}
                {showMobileMenu && (
                  <div className="absolute right-0 top-full mt-2 w-48 bg-white border border-slate-200 rounded-xl shadow-lg py-2 z-50 flex flex-col gap-1">
                    <div className="px-4 py-2 border-b border-slate-100">
                      <div className="flex items-center gap-2 text-sm text-slate-600">
                        <Globe className="w-4 h-4" />
                        <select
                          value={language}
                          onChange={(e) => setLanguage(e.target.value as Language)}
                          className="w-full bg-transparent focus:outline-none cursor-pointer"
                        >
                          <option value="pt">Português</option>
                          <option value="en">English</option>
                          <option value="es">Español</option>
                        </select>
                      </div>
                    </div>

                  </div>
                )}
              </div>
            </div>
          </div>
        </nav>

        {/* Main Content */}
        <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-10">

          {/* Intro Section */}
          <div className="text-center mb-8">
            <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mb-4 tracking-tight">
              {t('hero.title')}
            </h1>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto" dangerouslySetInnerHTML={{ __html: t('hero.subtitle') }}>
            </p>
            
            {/* Additional SEO Content */}
            <div className="mt-6 max-w-3xl mx-auto">
              <p className="text-base text-slate-500 leading-relaxed">
                Crie seu <strong>curriculum vitae profissional</strong> em minutos com nosso <strong>gerador de currículo online</strong>. 
                Perfeito para <strong>fazer currículo para primeiro emprego</strong>, <strong>modelo de currículo para jovem aprendiz</strong>, 
                <strong>currículo para estágio</strong> ou profissionais experientes. Nossos <strong>modelos de currículo prontos</strong> incluem 
                opções <strong>simples</strong>, <strong>modernas</strong> e <strong>criativas</strong>, todos otimizados para sistemas ATS como 
                <strong>Gupy</strong>, <strong>Kenoby</strong> e <strong>Vagas.com</strong>. <strong>Baixe seu currículo em PDF</strong> grátis, 
                sem cadastro, sem marcas d'água e sem limites. Funciona perfeitamente no <strong>celular Android</strong> e <strong>iPhone</strong>.
              </p>
            </div>

            {/* Social Sharing */}
            <div className="flex items-center justify-center gap-4 mt-6">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">{t('social.share')}</span>
              <button onClick={() => handleShare('whatsapp')} className="p-2 bg-green-500 text-white rounded-full hover:bg-green-600 transition-colors" title="WhatsApp">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" /></svg>
              </button>
              <button onClick={() => handleShare('facebook')} className="p-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors" title="Facebook">
                <Facebook className="w-4 h-4" />
              </button>
              <button onClick={() => handleShare('linkedin')} className="p-2 bg-blue-700 text-white rounded-full hover:bg-blue-800 transition-colors" title="LinkedIn">
                <Linkedin className="w-4 h-4" />
              </button>
              <button onClick={() => handleShare('twitter')} className="p-2 bg-sky-500 text-white rounded-full hover:bg-sky-600 transition-colors" title="Twitter/X">
                <Twitter className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

            {/* Left Column: Form */}
            <div className="lg:col-span-5 xl:col-span-4 space-y-6">

              {/* Form Actions - Moved here */}
              <div className="flex gap-3">
                <button
                  onClick={() => setConfirmType('example')}
                  type="button"
                  className="flex-1 py-2.5 px-4 bg-purple-50 hover:bg-purple-100 text-purple-700 rounded-xl transition-colors flex items-center justify-center gap-2 font-medium text-sm border border-purple-200"
                >
                  <Wand2 className="w-4 h-4" />
                  {t('nav.example')}
                </button>
                <button
                  onClick={() => setConfirmType('clear')}
                  type="button"
                  className="flex-1 py-2.5 px-4 bg-white hover:bg-red-50 text-slate-600 hover:text-red-600 rounded-xl transition-colors flex items-center justify-center gap-2 font-medium text-sm border border-slate-200 hover:border-red-200"
                >
                  <Trash2 className="w-4 h-4" />
                  {t('nav.clear')}
                </button>
              </div>

              <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden" id="form">
                <div className="bg-slate-50 px-6 py-4 border-b border-slate-200">
                  <h2 className="font-semibold text-slate-800">{t('form.title')}</h2>
                  <p className="text-xs text-slate-500 mt-1">
                    Preencha seus dados e veja seu <strong>curriculum vitae</strong> sendo criado em tempo real. 
                    Todos os campos são opcionais e podem ser editados a qualquer momento.
                  </p>
                </div>
                <ResumeForm data={resumeData} onChange={setResumeData} />
              </div>
              
              {/* Quick Info Box */}
              <div className="bg-purple-50 border border-purple-200 rounded-xl p-4 mt-6">
                <p className="text-sm text-purple-900 leading-relaxed">
                  <strong>Dica:</strong> Use nosso <strong>gerador de currículo grátis</strong> para criar múltiplas versões 
                  do seu CV adaptadas para diferentes vagas. Salve seus dados no navegador e edite quando precisar. 
                  Perfeito para <strong>candidaturas em massa</strong> ou <strong>processos seletivos específicos</strong>.
                </p>
              </div>

              {/* Ad Slot - Sidebar Mobile/Desktop */}
              <div className="mt-6">
                <AdPlaceholder slotId="sidebar-ad-1" format="rectangle" />
              </div>
            </div>

            {/* Right Column: Preview */}
            <div className="lg:col-span-7 xl:col-span-8 lg:sticky lg:top-24">
              <div className="flex flex-col items-center">
                <div className="mb-4 text-sm text-slate-500 font-medium flex items-center gap-2">
                  {t('preview.realtime')}
                </div>
                
                {/* Template Info Box */}
                <div className="mb-4 w-full max-w-2xl bg-blue-50 border border-blue-200 rounded-lg p-4 text-sm">
                  <p className="text-blue-900 leading-relaxed">
                    <strong>Dica de Template:</strong> O modelo <strong>{t(`templates.${template}`)}</strong> é ideal para{' '}
                    {template === 'modern' && 'profissionais que buscam um visual contemporâneo e limpo, perfeito para áreas de tecnologia e startups.'}
                    {template === 'classic' && 'setores tradicionais como direito, contabilidade e administração, transmitindo seriedade e profissionalismo.'}
                    {template === 'elegant' && 'executivos e profissionais seniores que precisam transmitir sofisticação e experiência.'}
                    {template === 'creative' && 'designers, publicitários e profissionais de marketing que querem destacar criatividade.'}
                    {template === 'tech' && 'desenvolvedores, engenheiros de software e profissionais de TI que valorizam um visual moderno.'}
                    {template === 'sidebar' && 'quem tem muitas informações para organizar de forma clara e hierárquica.'}
                    {template === 'compact' && 'candidatos que precisam incluir muitas informações em pouco espaço, mantendo legibilidade.'}
                    {template === 'minimalist' && 'quem prefere simplicidade e foco no conteúdo, ideal para passar em sistemas ATS.'}
                    {template === 'timeline' && 'mostrar evolução de carreira de forma visual e cronológica.'}
                    {template === 'swiss' && 'designers e profissionais que valorizam tipografia e layout precisos, estilo suíço.'}
                    {template === 'grid' && 'organizar informações de forma estruturada e visual, ideal para portfólios e projetos.'}
                    {!['modern', 'classic', 'elegant', 'creative', 'tech', 'sidebar', 'compact', 'minimalist', 'timeline', 'swiss', 'grid'].includes(template) && 
                     'diversas áreas profissionais, com layout profissional e otimizado para ATS.'}
                    {' '}Todos os modelos são <strong>compatíveis com sistemas ATS</strong> e podem ser <strong>baixados em PDF</strong> gratuitamente.
                  </p>
                </div>

                {/* Preview Container with Scaling */}
                <div className="bg-slate-200/50 rounded-xl p-4 sm:p-8 border border-slate-200 shadow-inner w-full flex justify-center overflow-hidden h-[540px] sm:h-[685px] md:h-[800px] lg:h-[850px] xl:h-[970px] transition-all duration-300">
                  <div className="origin-top transform scale-[0.45] sm:scale-[0.55] md:scale-[0.65] lg:scale-[0.70] xl:scale-[0.80] shadow-2xl bg-white">
                    <ResumePreview data={resumeData} template={template} />
                  </div>
                </div>

                {/* Ad Slot - Under Preview */}
                <div className="w-full mt-6 max-w-2xl">
                  <AdPlaceholder slotId="preview-bottom-ad" format="auto" />
                </div>
              </div>
            </div>

          </div>
        </main>

        {/* Blog & SEO Section - Lazy Loaded */}
        <Suspense fallback={<div className="py-16 bg-slate-50 border-t border-slate-200"><div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-slate-600">Carregando conteúdo...</div></div>}>
          <CareerBlog />
        </Suspense>
        <Suspense fallback={<div className="py-16 bg-white border-t border-slate-100"><div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-slate-600">Carregando dicas...</div></div>}>
          <ResumeTips />
        </Suspense>
        <Suspense fallback={<div className="py-16 bg-white border-t border-slate-200"><div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-slate-600">Carregando informações...</div></div>}>
          <SEOContent />
        </Suspense>
        
        {/* Additional Rich Content Section */}
        <section className="py-16 bg-slate-50 border-t border-slate-200 no-print">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white rounded-xl p-6 border border-slate-200">
                <h3 className="text-xl font-bold text-slate-900 mb-4">Currículo para Diferentes Profissões</h3>
                <p className="text-slate-600 leading-relaxed mb-4">
                  Nossos <strong>modelos de currículo</strong> são versáteis e funcionam para diversas áreas profissionais. 
                  Seja você um <strong>desenvolvedor</strong>, <strong>designer</strong>, <strong>vendedor</strong>, 
                  <strong>administrador</strong>, <strong>professor</strong>, <strong>médico</strong> ou qualquer outra profissão, 
                  temos o modelo ideal para destacar suas habilidades e experiência.
                </p>
                <ul className="text-sm text-slate-600 space-y-2 list-disc list-inside">
                  <li><strong>Currículo para área de tecnologia</strong> - Destaque suas linguagens e frameworks</li>
                  <li><strong>Currículo para vendas</strong> - Foque em resultados e metas alcançadas</li>
                  <li><strong>Currículo para área administrativa</strong> - Enfatize organização e gestão</li>
                  <li><strong>Currículo para área de saúde</strong> - Destaque certificações e especializações</li>
                </ul>
              </div>
              
              <div className="bg-white rounded-xl p-6 border border-slate-200">
                <h3 className="text-xl font-bold text-slate-900 mb-4">Dicas de Formatação e Layout</h3>
                <p className="text-slate-600 leading-relaxed mb-4">
                  Um <strong>currículo bem formatado</strong> é essencial para causar boa primeira impressão. Nossos modelos 
                  seguem as <strong>melhores práticas de design</strong> e <strong>tipografia</strong>, garantindo legibilidade 
                  e profissionalismo. Todos os layouts são testados para funcionar tanto em <strong>impressão</strong> quanto 
                  em <strong>visualização digital</strong>.
                </p>
                <ul className="text-sm text-slate-600 space-y-2 list-disc list-inside">
                  <li>Fonte legível e tamanho adequado (10-12pt)</li>
                  <li>Espaçamento consistente entre seções</li>
                  <li>Uso estratégico de negrito e cores</li>
                  <li>Margens adequadas para impressão A4</li>
                </ul>
              </div>
            </div>
            
            <div className="mt-8 bg-white rounded-xl p-6 border border-slate-200">
              <h3 className="text-xl font-bold text-slate-900 mb-4">Frequentes Perguntas sobre Currículo</h3>
              <div className="space-y-4 text-slate-600">
                <div>
                  <h4 className="font-bold text-slate-800 mb-2">Quantas páginas deve ter um currículo?</h4>
                  <p className="text-sm leading-relaxed">
                    Para a maioria dos casos, <strong>1 página é o ideal</strong>. Profissionais com mais de 10 anos de experiência 
                    ou múltiplas especializações podem usar <strong>2 páginas</strong>. O importante é ser objetivo e incluir apenas 
                    informações relevantes para a vaga.
                  </p>
                </div>
                <div>
                  <h4 className="font-bold text-slate-800 mb-2">Devo incluir foto no currículo?</h4>
                  <p className="text-sm leading-relaxed">
                    No Brasil, a foto é <strong>opcional mas recomendada</strong> para a maioria das áreas. Use uma foto profissional, 
                    com boa iluminação e fundo neutro. Evite selfies ou fotos casuais. Nossa ferramenta permite adicionar foto facilmente.
                  </p>
                </div>
                <div>
                  <h4 className="font-bold text-slate-800 mb-2">Como destacar meu currículo dos demais?</h4>
                  <p className="text-sm leading-relaxed">
                    Use <strong>palavras-chave da vaga</strong>, destaque <strong>resultados quantificáveis</strong> (números, percentuais, 
                    valores), mantenha o <strong>formato limpo e profissional</strong>, e personalize o <strong>resumo profissional</strong> 
                    para cada vaga. Nossos modelos já incluem essas otimizações.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Use Cases Section */}
        <section className="py-16 bg-white border-t border-slate-200 no-print">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-slate-900 mb-4">Casos de Uso do Currículo Rápido</h2>
              <p className="text-slate-600 max-w-3xl mx-auto">
                Nossa ferramenta de <strong>criação de currículo online</strong> atende diferentes necessidades profissionais. 
                Veja como pessoas em diferentes situações usam o <strong>Currículo Rápido</strong> para alcançar seus objetivos de carreira.
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-slate-50 rounded-xl p-6 border border-slate-200">
                <h3 className="text-xl font-bold text-slate-900 mb-3">Primeiro Emprego</h3>
                <p className="text-slate-600 text-sm leading-relaxed mb-4">
                  Se você está entrando no <strong>mercado de trabalho</strong> pela primeira vez, nosso gerador ajuda a 
                  criar um <strong>currículo profissional</strong> mesmo sem experiência. Destaque sua <strong>formação</strong>, 
                  <strong>cursos</strong> e <strong>habilidades</strong> de forma atrativa.
                </p>
                <ul className="text-xs text-slate-500 space-y-1">
                  <li>✓ Ideal para <strong>jovem aprendiz</strong></li>
                  <li>✓ Perfeito para <strong>estágio</strong></li>
                  <li>✓ Modelos para <strong>primeiro emprego</strong></li>
                </ul>
              </div>
              
              <div className="bg-slate-50 rounded-xl p-6 border border-slate-200">
                <h3 className="text-xl font-bold text-slate-900 mb-3">Mudança de Carreira</h3>
                <p className="text-slate-600 text-sm leading-relaxed mb-4">
                  Está mudando de área? Nosso gerador permite criar um <strong>curriculum vitae</strong> que destaca 
                  <strong>habilidades transferíveis</strong> e mostra como sua experiência anterior se aplica à nova área. 
                  Personalize facilmente para cada oportunidade.
                </p>
                <ul className="text-xs text-slate-500 space-y-1">
                  <li>✓ Destaque <strong>habilidades transferíveis</strong></li>
                  <li>✓ Adapte para <strong>nova área profissional</strong></li>
                  <li>✓ Crie múltiplas versões rapidamente</li>
                </ul>
              </div>
              
              <div className="bg-slate-50 rounded-xl p-6 border border-slate-200">
                <h3 className="text-xl font-bold text-slate-900 mb-3">Profissionais Experientes</h3>
                <p className="text-slate-600 text-sm leading-relaxed mb-4">
                  Para profissionais com anos de experiência, nossos modelos ajudam a organizar um histórico extenso de forma 
                  clara e concisa. Destaque <strong>conquistas</strong> e <strong>resultados</strong> de forma impactante.
                </p>
                <ul className="text-xs text-slate-500 space-y-1">
                  <li>✓ Organize <strong>histórico extenso</strong></li>
                  <li>✓ Destaque <strong>conquistas profissionais</strong></li>
                  <li>✓ Modelos para <strong>executivos</strong></li>
                </ul>
              </div>
            </div>
            
            <div className="mt-12 bg-gradient-to-r from-purple-50 to-blue-50 rounded-2xl p-8 border border-purple-200">
              <h3 className="text-2xl font-bold text-slate-900 mb-6 text-center">Plataformas de Emprego Compatíveis</h3>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-white rounded-lg p-4 text-center border border-slate-200">
                  <h4 className="font-bold text-slate-800 mb-2">Gupy</h4>
                  <p className="text-xs text-slate-600">
                    Nossos modelos são <strong>100% compatíveis</strong> com o sistema ATS da Gupy, uma das maiores 
                    plataformas de recrutamento do Brasil.
                  </p>
                </div>
                <div className="bg-white rounded-lg p-4 text-center border border-slate-200">
                  <h4 className="font-bold text-slate-800 mb-2">Kenoby</h4>
                  <p className="text-xs text-slate-600">
                    Seus dados serão extraídos corretamente pelo sistema Kenoby, garantindo que seu CV seja avaliado adequadamente.
                  </p>
                </div>
                <div className="bg-white rounded-lg p-4 text-center border border-slate-200">
                  <h4 className="font-bold text-slate-800 mb-2">Vagas.com</h4>
                  <p className="text-xs text-slate-600">
                    Compatível com o sistema de triagem da Vagas.com, aumentando suas chances de passar na primeira etapa.
                  </p>
                </div>
                <div className="bg-white rounded-lg p-4 text-center border border-slate-200">
                  <h4 className="font-bold text-slate-800 mb-2">LinkedIn</h4>
                  <p className="text-xs text-slate-600">
                    Use seu CV gerado para complementar seu perfil no LinkedIn ou em processos Easy Apply.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-white border-t border-slate-200 py-10 mt-auto" role="contentinfo">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Footer SEO Content */}
            <div className="mb-8 pb-8 border-b border-slate-200">
              <div className="grid md:grid-cols-3 gap-6 text-sm text-slate-600">
                <div>
                  <h4 className="font-bold text-slate-900 mb-2">Sobre o Currículo Rápido</h4>
                  <p className="leading-relaxed">
                    O <strong>melhor gerador de currículo grátis do Brasil</strong>. Crie seu <strong>curriculum vitae profissional</strong> 
                    em minutos, sem cadastro e sem limites. Nossos <strong>modelos de currículo 2025</strong> são otimizados para 
                    <strong>sistemas ATS</strong> e <strong>recrutadores</strong>.
                  </p>
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 mb-2">Recursos Principais</h4>
                  <ul className="space-y-1 leading-relaxed">
                    <li>✓ <strong>Modelos de currículo prontos</strong> para preencher</li>
                    <li>✓ <strong>Compatível com ATS</strong> (Gupy, Kenoby, Vagas.com)</li>
                    <li>✓ <strong>Funciona no celular</strong> Android e iPhone</li>
                    <li>✓ <strong>Download em PDF</strong> grátis e ilimitado</li>
                    <li>✓ <strong>Sem cadastro</strong> e sem marcas d'água</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 mb-2">Para Quem é Ideal</h4>
                  <ul className="space-y-1 leading-relaxed">
                    <li>• <strong>Primeiro emprego</strong> e <strong>jovem aprendiz</strong></li>
                    <li>• <strong>Estágio</strong> e <strong>trainee</strong></li>
                    <li>• Profissionais experientes em <strong>recolocação</strong></li>
                    <li>• Quem busca <strong>mudança de carreira</strong></li>
                    <li>• Candidatos para <strong>vagas no Brasil</strong></li>
                  </ul>
                </div>
              </div>
            </div>
            
            <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-slate-500 text-sm">
              <div className="flex items-center gap-2">
                <span className="font-semibold text-slate-900">Currículo Rápido</span> &copy; {new Date().getFullYear()}
              </div>
              <div className="flex items-center gap-6">
                <button
                  onClick={() => setShowPrivacy(true)}
                  className="hover:text-slate-900 transition-colors cursor-pointer"
                >
                  {t('footer.privacy')}
                </button>
                <button
                  onClick={() => setShowTerms(true)}
                  className="hover:text-slate-900 transition-colors cursor-pointer"
                >
                  {t('footer.terms')}
                </button>
              </div>
              <div className="flex items-center gap-1">
                {t('footer.madeWith')} <Heart className="w-3 h-3 text-red-500 fill-current" />
              </div>
            </div>

            {/* Footer Ad Slot */}
            <div className="mt-8">
              <AdPlaceholder slotId="footer-ad-responsive" className="bg-transparent border-slate-200" />
            </div>
          </div>
        </footer>

        {/* Modals */}
        <PrivacyModal isOpen={showPrivacy} onClose={() => setShowPrivacy(false)} />
        <TermsModal isOpen={showTerms} onClose={() => setShowTerms(false)} />

        <ConfirmModal
          isOpen={confirmType !== null}
          onClose={() => setConfirmType(null)}
          onConfirm={onConfirmAction}
          title={modalProps.title}
          message={modalProps.message}
          confirmText={modalProps.confirmText}
          isDestructive={modalProps.isDestructive}
        />

        {/* Floating Action Button for Mobile */}
        <div className="lg:hidden fixed bottom-6 right-6 z-50">
          <button
            onClick={handleDownloadPdf}
            disabled={isGeneratingPdf}
            type="button"
            className="bg-purple-600 text-white p-4 rounded-full shadow-lg shadow-purple-600/30 flex items-center gap-2 hover:bg-purple-700 transition-all active:scale-95 disabled:bg-purple-400"
            aria-label={t('nav.download')}
          >
            {isGeneratingPdf ? <Loader2 className="w-6 h-6 animate-spin" /> : <Download className="w-6 h-6" />}
          </button>
        </div>

        {/* PRINT AREA - Only visible when printing */}
        <div className="print-area">
          <ResumePreview data={resumeData} template={template} />
        </div>
      </div>

      {/* --- HIDDEN PDF GENERATION CONTAINER --- */}
      {/* This element is rendered off-screen specifically for html2pdf to capture */}
      <div id="resume-to-pdf" className="pdf-generation-container">
        <ResumePreview data={resumeData} template={template} />
      </div>

    </div>
  );
};

export default function App() {
  return (
    <LanguageProvider>
      <AppContent />
    </LanguageProvider>
  );
}