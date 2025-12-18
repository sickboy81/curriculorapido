import React, { useState, useEffect, Suspense, lazy } from 'react';
import { ResumeForm } from './components/ResumeForm';
import { ResumePreview } from './components/ResumePreview';
import { PrivacyModal, TermsModal, ConfirmModal } from './components/LegalModals';
import { AdPlaceholder } from './components/AdPlaceholder';
import { ATSChecker } from './components/ATSChecker';
import { ToastContainer, useToast } from './components/Toast';
import { SkeletonCard } from './components/Skeleton';
import { ScrollToTop } from './components/ScrollToTop';
import { ExportMenu } from './components/ExportMenu';
import { ErrorBoundary } from './components/ErrorBoundary';
import { useDebounce } from './hooks/useDebounce';
import { ResumeManager } from './components/ResumeManager';
import { SavedResume, resumeStorage } from './utils/resumeStorage';
import { ShareModal } from './components/ShareModal';
import { loadFromShareLink } from './utils/shareLink';
import { VersionHistory } from './components/VersionHistory';
import { versionHistory, ResumeVersion } from './utils/versionHistory';
import { analytics } from './utils/analytics';
import { TemplateGallery } from './components/TemplateGallery';
import { useKeyboardShortcuts } from './hooks/useKeyboardShortcut';
import { KeyboardShortcutsHelp } from './components/KeyboardShortcutsHelp';
import { AutoSaveIndicator } from './components/AutoSaveIndicator';
import { Tooltip } from './components/Tooltip';
import { JobSuggestions } from './components/JobSuggestions';
import { ResumeProgress } from './components/ResumeProgress';
import { ResumeStats } from './components/ResumeStats';
import { QuickActions } from './components/QuickActions';
import { ResumeTipsInline } from './components/ResumeTipsInline';
import { ResumeValidator } from './components/ResumeValidator';
import { AccessibilityHelper } from './components/AccessibilityHelper';
import { useSEO } from './hooks/useSEO';

// Import pages
import { Sobre } from './components/pages/Sobre';
import { Contato } from './components/pages/Contato';
import { Privacidade } from './components/pages/Privacidade';
import { Termos } from './components/pages/Termos';

// Lazy load heavy SEO components for better performance
const SEOContent = lazy(() => import('./components/SEOContent').then(module => ({ default: module.SEOContent })));
const ResumeTips = lazy(() => import('./components/ResumeTips').then(module => ({ default: module.ResumeTips })));
const CareerBlog = lazy(() => import('./components/CareerBlog').then(module => ({ default: module.CareerBlog })));
import { ResumeData, INITIAL_DATA_PT, BLANK_DATA, TemplateType } from './types';
import { Printer, FileText, LayoutTemplate, Github, Heart, Trash2, Wand2, Download, Loader2, Share2, Facebook, Linkedin, Twitter, Menu, X, MoreVertical, FileCheck, FolderOpen, History, Eye, Keyboard } from 'lucide-react';
// Removed multilingual support - site is focused on Brazil
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

const AppContent = () => {
  // SEO para página inicial
  useSEO({
    title: 'Currículo Rápido | Criar Currículo Online Grátis PDF (Modelos 2025)',
    description: 'O melhor gerador de currículo grátis do Brasil (2025). Crie seu Curriculum Vitae (CV) em PDF para imprimir. Modelos de currículo prontos (Simples, Moderno, Jovem Aprendiz). Sem cadastro e funciona no celular. Baixe agora grátis!',
    canonical: 'https://curriculorapido.com.br/',
    ogTitle: 'Currículo Rápido | Criar Currículo Online Grátis PDF',
    ogDescription: 'Crie seu Curriculum Vitae profissional em minutos com o Currículo Rápido. Escolha modelos prontos, preencha e baixe em PDF. 100% Gratuito.',
    ogImage: 'https://curriculorapido.com.br/preview-image.jpg'
  });

  // Initialize state from localStorage if available, otherwise use defaults
  const [resumeData, setResumeData] = useState<ResumeData>(() => {
    if (typeof window !== 'undefined') {
      try {
        // Try to load from saved resumes first
        const currentId = resumeStorage.getCurrentId();
        if (currentId) {
          const savedResume = resumeStorage.get(currentId);
          if (savedResume) {
            return savedResume.data;
          }
        }
        // Fallback to legacy storage
        const savedData = localStorage.getItem('resume_builder_data');
        if (savedData) {
          return JSON.parse(savedData);
        }
      } catch (error) {
        console.error('Erro ao carregar dados:', error);
      }
    }
    // Default data
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

  // Resume Manager State
  const [showResumeManager, setShowResumeManager] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const [showVersionHistory, setShowVersionHistory] = useState(false);
  const [showTemplateGallery, setShowTemplateGallery] = useState(false);
  const [showKeyboardShortcuts, setShowKeyboardShortcuts] = useState(false);
  const [currentResumeId, setCurrentResumeId] = useState<string | null>(null);

  // PDF Generation State
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);

  // Auto-save status
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'saved' | 'error'>('idle');
  const [lastSaved, setLastSaved] = useState<Date | undefined>(undefined);

  // Toast notifications
  const { toasts, success, error, removeToast } = useToast();

  // Debounced save to localStorage
  const debouncedResumeData = useDebounce(resumeData, 1000);

  // Persistence Effects
  useEffect(() => {
    // Use requestIdleCallback or setTimeout to defer heavy operations
    const saveData = () => {
      setSaveStatus('saving');
      try {
        localStorage.setItem('resume_builder_data', JSON.stringify(debouncedResumeData));
        
        // Auto-save version history
        const resumeId = resumeStorage.getCurrentId() || 'default';
        if (resumeId && debouncedResumeData.fullName) {
          // Only save if data has changed significantly (not on every keystroke)
          const lastVersion = versionHistory.getAll(resumeId)[0];
          if (!lastVersion || 
              JSON.stringify(lastVersion.data) !== JSON.stringify(debouncedResumeData) ||
              lastVersion.template !== template) {
            versionHistory.save(resumeId, debouncedResumeData, template);
          }
        }
        
        setSaveStatus('saved');
        setLastSaved(new Date());
        
        // Reset to idle after a delay
        const timer = setTimeout(() => {
          setSaveStatus('idle');
        }, 2000);
        return () => clearTimeout(timer);
      } catch (error) {
        console.error('Error saving resume data:', error);
        setSaveStatus('error');
        setTimeout(() => setSaveStatus('idle'), 3000);
      }
    };

    // Defer save operation to avoid blocking the main thread
    if ('requestIdleCallback' in window) {
      const id = requestIdleCallback(saveData, { timeout: 1000 });
      return () => cancelIdleCallback(id);
    } else {
      const timer = setTimeout(saveData, 0);
      return () => clearTimeout(timer);
    }
  }, [debouncedResumeData, template]);

  useEffect(() => {
    localStorage.setItem('resume_builder_template', template);
  }, [template]);

  // Keyboard shortcuts
  useKeyboardShortcuts([
    {
      key: 's',
      ctrlKey: true,
      callback: () => {
        if (currentResumeId) {
          const saved = resumeStorage.get(currentResumeId);
          if (saved) {
            resumeStorage.update(currentResumeId, { data: resumeData, template });
            success('Currículo salvo!');
            analytics.trackResumeSave(currentResumeId, saved.name);
          }
        } else {
          setShowResumeManager(true);
        }
      },
    },
    {
      key: 'p',
      ctrlKey: true,
      callback: () => {
        handleDownloadPdf();
      },
    },
    {
      key: 'e',
      ctrlKey: true,
      callback: () => {
        // Focus on first input field
        const firstInput = document.querySelector('input, textarea') as HTMLElement;
        if (firstInput) {
          firstInput.focus();
        }
      },
    },
    {
      key: '/',
      callback: () => {
        // Focus search/template gallery
        setShowTemplateGallery(true);
      },
    },
    {
      key: '?',
      callback: () => {
        // Show keyboard shortcuts help
        setShowKeyboardShortcuts(true);
      },
    },
  ]);

  const handleDownloadPdf = async () => {
    if (typeof window !== 'undefined') {
      setIsGeneratingPdf(true);

      try {
        // Get the PDF generation container
        const pdfContainer = document.querySelector('#resume-to-pdf') as HTMLElement;
        if (!pdfContainer) {
          throw new Error('PDF container not found');
        }

        // Make container visible and properly sized for capture
        const originalClasses = pdfContainer.className;
        pdfContainer.className = 'pdf-generation-container generating';
        pdfContainer.style.position = 'fixed';
        pdfContainer.style.left = '50%';
        pdfContainer.style.top = '50%';
        pdfContainer.style.transform = 'translate(-50%, -50%)';
        pdfContainer.style.zIndex = '999999';
        pdfContainer.style.width = '210mm';
        pdfContainer.style.height = 'auto';
        pdfContainer.style.background = 'white';
        pdfContainer.style.boxShadow = '0 0 0 9999px rgba(255, 255, 255, 0.95)';

        // Wait for layout to settle
        await new Promise(resolve => setTimeout(resolve, 500));

        // Capture with html2canvas - use higher scale for better quality
        const canvas = await html2canvas(pdfContainer, {
          scale: 3, // Increased for better quality
          useCORS: true,
          logging: false,
          backgroundColor: '#ffffff',
          allowTaint: false,
          removeContainer: false,
          width: pdfContainer.scrollWidth,
          height: pdfContainer.scrollHeight
        });

        // Restore original state
        pdfContainer.className = originalClasses;
        pdfContainer.style.position = '';
        pdfContainer.style.left = '';
        pdfContainer.style.top = '';
        pdfContainer.style.transform = '';
        pdfContainer.style.zIndex = '';
        pdfContainer.style.width = '';
        pdfContainer.style.height = '';
        pdfContainer.style.background = '';
        pdfContainer.style.boxShadow = '';

        // Create PDF in A4 format
        const pdf = new jsPDF({
          orientation: 'portrait',
          unit: 'mm',
          format: 'a4',
          compress: true
        });

        const pdfWidth = pdf.internal.pageSize.getWidth(); // 210mm
        const pdfHeight = pdf.internal.pageSize.getHeight(); // 297mm

        // Calculate dimensions - convert canvas pixels to mm
        // At scale 3, 1mm = approximately 11.34 pixels (96 DPI * 3 / 25.4)
        const mmPerPixel = 25.4 / (96 * 3); // More accurate conversion
        const imgWidthMM = canvas.width * mmPerPixel;
        const imgHeightMM = canvas.height * mmPerPixel;

        // Calculate scaling to fit A4 (maintain aspect ratio)
        const widthRatio = pdfWidth / imgWidthMM;
        const heightRatio = pdfHeight / imgHeightMM;
        const ratio = Math.min(widthRatio, heightRatio, 1); // Don't scale up

        const finalWidth = imgWidthMM * ratio;
        const finalHeight = imgHeightMM * ratio;

        // Center the image on the page
        const xOffset = (pdfWidth - finalWidth) / 2;
        const yOffset = (pdfHeight - finalHeight) / 2;

        // Convert canvas to image with high quality
        const imgData = canvas.toDataURL('image/png', 1.0);
        
        // Add image to PDF
        pdf.addImage(imgData, 'PNG', xOffset, yOffset, finalWidth, finalHeight, undefined, 'FAST');

        // Save with filename
        const safeName = resumeData.fullName
          ? resumeData.fullName.trim().replace(/[^a-z0-9]/gi, '_').toLowerCase()
          : 'curriculo';
        pdf.save(`${safeName}_cv.pdf`);
        
        analytics.trackPDFDownload(template);
        success('PDF gerado e baixado com sucesso!');

      } catch (err) {
        console.error("PDF generation failed:", err);
        error("Erro ao gerar PDF. Por favor, tente novamente.");
      } finally {
        setIsGeneratingPdf(false);
      }
    }
  };

  const shareUrl = "https://curriculorapido.com.br";
  const shareText = 'Construa seu futuro com o Currículo Rápido (Grátis)';

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
      resumeStorage.setCurrentId(null);
      success('Dados limpos com sucesso!');
    } else if (confirmType === 'example') {
      const exampleData = INITIAL_DATA_PT;
      setResumeData(exampleData);
      localStorage.setItem('resume_builder_data', JSON.stringify(exampleData));
      resumeStorage.setCurrentId(null);
      success('Exemplo carregado com sucesso!');
    }
    setConfirmType(null);
  };

  const handleLoadResume = (savedResume: SavedResume) => {
    setResumeData(savedResume.data);
    setTemplate(savedResume.template);
    resumeStorage.setCurrentId(savedResume.id);
    setCurrentResumeId(savedResume.id);
    analytics.trackResumeLoad(savedResume.id);
    setShowResumeManager(false);
    success(`Currículo "${savedResume.name}" carregado com sucesso!`);
  };

  const handleNewResume = () => {
    setResumeData(BLANK_DATA);
    setTemplate('modern');
    resumeStorage.setCurrentId(null);
    setCurrentResumeId(null);
    setShowResumeManager(false);
    success('Novo currículo criado!');
  };

  const handleRestoreVersion = (version: ResumeVersion) => {
    setResumeData(version.data);
    setTemplate(version.template);
    analytics.trackVersionRestore(version.id);
    success('Versão restaurada com sucesso!');
  };

  // Update current resume ID when loading from storage
  useEffect(() => {
    const id = resumeStorage.getCurrentId();
    setCurrentResumeId(id);
  }, []);

  const getConfirmProps = () => {
    if (confirmType === 'clear') {
      return {
        title: 'Limpar todos os dados?',
        message: 'Tem certeza que deseja apagar todos os campos? Esta ação não pode ser desfeita.',
        confirmText: 'Sim, limpar tudo',
        isDestructive: true
      };
    } else {
      return {
        title: 'Carregar exemplo?',
        message: 'Seus dados atuais serão substituídos por um modelo fictício.',
        confirmText: 'Carregar Exemplo',
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
              {/* Template Selector - Always Visible but Adaptive */}
              <div className="flex items-center gap-2 bg-slate-100 p-1 rounded-lg border border-slate-200">
                <LayoutTemplate className="w-4 h-4 text-slate-500 ml-2" />
                <select
                  value={template}
                  onChange={(e) => {
                    const newTemplate = e.target.value as TemplateType;
                    analytics.trackTemplateChange(template, newTemplate);
                    setTemplate(newTemplate);
                  }}
                  className="bg-transparent text-sm font-medium text-slate-700 focus:outline-none cursor-pointer py-1 pr-2 max-w-[110px] sm:max-w-none"
                  aria-label="Selecionar template de currículo"
                >
                  <optgroup label="Clássicos">
                    <option value="modern">Moderno</option>
                    <option value="classic">Clássico</option>
                    <option value="elegant">Elegante</option>
                    <option value="executive">Executivo</option>
                  </optgroup>
                  <optgroup label="Criativos">
                    <option value="creative">Criativo</option>
                    <option value="bold">Arrojado</option>
                    <option value="tech">Tech</option>
                  </optgroup>
                  <optgroup label="Estruturados">
                    <option value="sidebar">Lateral</option>
                    <option value="compact">Compacto</option>
                    <option value="minimalist">Minimalista</option>
                  </optgroup>
                  <optgroup label="Novos Modelos">
                    <option value="timeline">Linha do Tempo</option>
                    <option value="swiss">Suíço</option>
                    <option value="grid">Grid</option>
                  </optgroup>
                </select>
                <Tooltip content="Ver todos os templates" position="bottom">
                  <button
                    onClick={() => setShowTemplateGallery(true)}
                    className="p-1.5 hover:bg-slate-200 rounded-lg transition-colors hidden sm:block"
                    aria-label="Abrir galeria de templates"
                  >
                    <Eye className="w-4 h-4 text-slate-600" />
                  </button>
                </Tooltip>
              </div>

              {/* Resume Manager Button */}
              <Tooltip content="Salvar e gerenciar múltiplos currículos" position="bottom">
                <button
                  onClick={() => setShowResumeManager(true)}
                  className="flex items-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-700 px-3 sm:px-4 py-2 rounded-lg font-medium transition-colors shadow-sm text-sm"
                  aria-label="Gerenciar currículos"
                >
                  <FileText className="w-4 h-4" />
                  <span className="hidden sm:inline">Meus CVs</span>
                </button>
              </Tooltip>

              {/* Version History Button */}
              {currentResumeId && (
                <Tooltip content="Ver e restaurar versões anteriores" position="bottom">
                  <button
                    onClick={() => setShowVersionHistory(true)}
                    className="hidden sm:flex items-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-700 px-3 sm:px-4 py-2 rounded-lg font-medium transition-colors shadow-sm text-sm"
                    aria-label="Histórico de versões"
                  >
                    <History className="w-4 h-4" />
                    <span className="hidden sm:inline">Versões</span>
                  </button>
                </Tooltip>
              )}

              {/* Share Button */}
              <Tooltip content="Compartilhar currículo via link" position="bottom">
                <button
                  onClick={() => setShowShareModal(true)}
                  className="flex items-center gap-2 px-3 sm:px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors shadow-sm text-sm"
                  aria-label="Compartilhar currículo"
                >
                  <Share2 className="w-4 h-4" />
                  <span className="hidden sm:inline">Compartilhar</span>
                </button>
              </Tooltip>

              {/* Export Menu */}
              <ExportMenu
                resumeData={resumeData}
                onImport={(data) => {
                  setResumeData(data);
                  success('Backup importado com sucesso!');
                }}
                onExportPdf={handleDownloadPdf}
                isGeneratingPdf={isGeneratingPdf}
                success={success}
                error={error}
              />

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
              Construa seu futuro com o Currículo Rápido (Grátis)
            </h1>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto" dangerouslySetInnerHTML={{ __html: "Utilize nosso <strong>gerador de currículo grátis</strong> para criar um Curriculum Vitae (CV) profissional em PDF pronto para imprimir. Escolha modelos de <strong>currículo simples</strong>, moderno ou para <strong>Jovem Aprendiz</strong>. Funciona no celular e sem cadastro." }}>
            </p>

            {/* Social Sharing */}
            <div className="flex items-center justify-center gap-4 mt-6">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Compartilhe e ajude amigos:</span>
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

              {/* Resume Progress Indicator */}
              <ResumeProgress resumeData={resumeData} />

              {/* Quick Actions */}
              <QuickActions
                resumeData={resumeData}
                onCopy={() => success('Texto do currículo copiado!')}
                onDownload={handleDownloadPdf}
                onShare={() => setShowShareModal(true)}
                onPrint={() => window.print()}
                onPreview={() => {
                  const element = document.querySelector('.print-area');
                  if (element) {
                    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  }
                }}
              />

              {/* Inline Tips */}
              <ResumeTipsInline />

              {/* Form Actions - Moved here */}
              <div className="flex gap-3">
                <button
                  onClick={() => setConfirmType('example')}
                  type="button"
                  className="flex-1 py-2.5 px-4 bg-purple-50 hover:bg-purple-100 text-purple-700 rounded-xl transition-colors flex items-center justify-center gap-2 font-medium text-sm border border-purple-200"
                >
                  <Wand2 className="w-4 h-4" />
                  Exemplo
                </button>
                <button
                  onClick={() => setConfirmType('clear')}
                  type="button"
                  className="flex-1 py-2.5 px-4 bg-white hover:bg-red-50 text-slate-600 hover:text-red-600 rounded-xl transition-colors flex items-center justify-center gap-2 font-medium text-sm border border-slate-200 hover:border-red-200"
                >
                  <Trash2 className="w-4 h-4" />
                  Limpar
                </button>
              </div>

              <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden" id="form">
                <div className="bg-slate-50 px-6 py-4 border-b border-slate-200">
                  <h2 className="font-semibold text-slate-800">Editor Currículo Rápido</h2>
                  <p className="text-xs text-slate-500 mt-1">
                    Preencha seus dados e veja seu <strong>curriculum vitae</strong> sendo criado em tempo real. 
                    Todos os campos são opcionais e podem ser editados a qualquer momento.
                  </p>
                </div>
                <ResumeForm data={resumeData} onChange={setResumeData} />
              </div>
              
              {/* Resume Validator */}
              <ResumeValidator 
                resumeData={resumeData}
                onFix={(issue) => {
                  // Scroll to the form
                  const element = document.getElementById('form');
                  if (element) {
                    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    success(`Por favor, preencha o campo: ${issue.message}`);
                  }
                }}
              />

              {/* Resume Stats */}
              <div id="resume-stats" className="mt-6">
                <ResumeStats resumeData={resumeData} />
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
                  Visualização em tempo real do PDF
                </div>
                
                {/* Template Info Box */}
                <div className="mb-4 w-full max-w-2xl bg-blue-50 border border-blue-200 rounded-lg p-4 text-sm">
                  <p className="text-blue-900 leading-relaxed">
                    <strong>Dica de Template:</strong> O modelo <strong>{
                      template === 'modern' ? 'Moderno' :
                      template === 'classic' ? 'Clássico' :
                      template === 'elegant' ? 'Elegante' :
                      template === 'executive' ? 'Executivo' :
                      template === 'creative' ? 'Criativo' :
                      template === 'bold' ? 'Arrojado' :
                      template === 'tech' ? 'Tech' :
                      template === 'sidebar' ? 'Lateral' :
                      template === 'compact' ? 'Compacto' :
                      template === 'minimalist' ? 'Minimalista' :
                      template === 'timeline' ? 'Linha do Tempo' :
                      template === 'swiss' ? 'Suíço' :
                      template === 'grid' ? 'Grid' : 'Moderno'
                    }</strong> é ideal para{' '}
                    {template === 'modern' && 'profissionais que buscam um visual contemporâneo e limpo, perfeito para áreas de tecnologia e startups.'}
                    {template === 'classic' && 'setores tradicionais como direito, contabilidade e administração, transmitindo seriedade e profissionalismo.'}
                    {template === 'elegant' && 'executivos e profissionais seniores que precisam transmitir sofisticação e experiência.'}
                    {template === 'executive' && 'executivos e líderes que precisam destacar experiência e resultados estratégicos.'}
                    {template === 'creative' && 'designers, publicitários e profissionais de marketing que querem destacar criatividade.'}
                    {template === 'tech' && 'desenvolvedores, engenheiros de software e profissionais de TI que valorizam um visual moderno.'}
                    {template === 'sidebar' && 'quem tem muitas informações para organizar de forma clara e hierárquica.'}
                    {template === 'compact' && 'candidatos que precisam incluir muitas informações em pouco espaço, mantendo legibilidade.'}
                    {template === 'minimalist' && 'quem prefere simplicidade e foco no conteúdo, ideal para passar em sistemas ATS.'}
                    {template === 'timeline' && 'mostrar evolução de carreira de forma visual e cronológica.'}
                    {template === 'swiss' && 'designers e profissionais que valorizam tipografia e layout precisos, estilo suíço.'}
                    {template === 'grid' && 'organizar informações de forma estruturada e visual, ideal para portfólios e projetos.'}
                    {!['modern', 'classic', 'elegant', 'executive', 'creative', 'bold', 'tech', 'sidebar', 'compact', 'minimalist', 'timeline', 'swiss', 'grid'].includes(template) && 
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

                {/* ATS Checker Button - After Preview */}
                <div className="w-full mt-6 max-w-2xl flex justify-center">
                  <button
                    onClick={() => {
                      const element = document.getElementById('ats-checker');
                      if (element) {
                        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                      }
                    }}
                    type="button"
                    className="flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl hover:from-purple-700 hover:to-blue-700 transition-all shadow-lg hover:shadow-xl font-semibold text-base transform hover:scale-105"
                  >
                    <FileCheck className="w-5 h-5" />
                    Verificar Compatibilidade ATS
                  </button>
                </div>
              </div>
            </div>

          </div>
        </main>

        {/* ATS Checker Section */}
        <section id="ats-checker" className="py-16 bg-gradient-to-br from-purple-50 to-blue-50 border-t border-purple-200 no-print">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-slate-900 mb-4 flex items-center justify-center gap-2">
                <FileCheck className="w-8 h-8 text-purple-600" />
                Verificador de ATS
              </h2>
              <p className="text-slate-600 max-w-2xl mx-auto">
                Verifique se seu currículo está otimizado para passar nos sistemas de triagem automática (ATS) 
                como Gupy, Kenoby e Vagas.com. Analise seu currículo criado aqui, envie um PDF existente ou 
                converta uma imagem para PDF.
              </p>
            </div>
            <div className="bg-white rounded-2xl shadow-lg border border-purple-200 p-8">
              <ATSChecker resumeData={resumeData} showAsSection={true} />
            </div>
          </div>
        </section>

        {/* Job Suggestions Section */}
        <section id="job-suggestions" className="py-16 bg-gradient-to-br from-blue-50 to-purple-50 border-t border-blue-200 no-print">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <JobSuggestions resumeData={resumeData} />
          </div>
        </section>

        {/* Blog & SEO Section - Lazy Loaded */}
        <Suspense fallback={<div className="py-16 bg-slate-50 border-t border-slate-200"><div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"><div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"><SkeletonCard /><SkeletonCard /><SkeletonCard /></div></div></div>}>
          <CareerBlog />
        </Suspense>
        <Suspense fallback={<div className="py-16 bg-white border-t border-slate-100"><div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-slate-600">Carregando dicas...</div></div>}>
          <ResumeTips />
        </Suspense>
        <Suspense fallback={<div className="py-16 bg-white border-t border-slate-200"><div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-slate-600">Carregando informações...</div></div>}>
          <SEOContent />
        </Suspense>

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
              <div className="flex items-center gap-6 flex-wrap justify-center">
                <button
                  onClick={() => setShowKeyboardShortcuts(true)}
                  className="hover:text-slate-900 transition-colors cursor-pointer flex items-center gap-1"
                  title="Ver atalhos de teclado"
                >
                  <Keyboard className="w-4 h-4" />
                  <span className="hidden sm:inline">Atalhos</span>
                </button>
                <a
                  href="/sobre"
                  className="hover:text-slate-900 transition-colors cursor-pointer"
                >
                  Sobre
                </a>
                <a
                  href="/contato"
                  className="hover:text-slate-900 transition-colors cursor-pointer"
                >
                  Contato
                </a>
                <a
                  href="/privacidade"
                  className="hover:text-slate-900 transition-colors cursor-pointer"
                >
                  Privacidade
                </a>
                <a
                  href="/termos"
                  className="hover:text-slate-900 transition-colors cursor-pointer"
                >
                  Termos de Uso
                </a>
              </div>
              <div className="flex items-center gap-1">
                Feito no Brasil com <Heart className="w-3 h-3 text-red-500 fill-current" />
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

        {/* Resume Manager Modal */}
        {showResumeManager && (
          <ResumeManager
            currentResume={resumeData}
            currentTemplate={template}
            onLoadResume={handleLoadResume}
            onNewResume={handleNewResume}
            onClose={() => setShowResumeManager(false)}
          />
        )}

        {/* Share Modal */}
        <ShareModal
          isOpen={showShareModal}
          onClose={() => setShowShareModal(false)}
          resumeData={resumeData}
          template={template}
        />

        {/* Version History Modal */}
        {currentResumeId && (
          <VersionHistory
            isOpen={showVersionHistory}
            onClose={() => setShowVersionHistory(false)}
            resumeId={currentResumeId}
            onRestore={handleRestoreVersion}
          />
        )}

        {/* Template Gallery Modal */}
        <TemplateGallery
          isOpen={showTemplateGallery}
          onClose={() => setShowTemplateGallery(false)}
          currentTemplate={template}
          onSelectTemplate={(newTemplate) => {
            analytics.trackTemplateChange(template, newTemplate);
            setTemplate(newTemplate);
          }}
          resumeData={resumeData}
        />

        {/* Keyboard Shortcuts Help Modal */}
        <KeyboardShortcutsHelp
          isOpen={showKeyboardShortcuts}
          onClose={() => setShowKeyboardShortcuts(false)}
        />

        {/* Floating Action Button for Mobile */}
        <div className="lg:hidden fixed bottom-6 right-6 z-50">
          <button
            onClick={handleDownloadPdf}
            disabled={isGeneratingPdf}
            type="button"
            className="bg-purple-600 text-white p-4 rounded-full shadow-lg shadow-purple-600/30 flex items-center gap-2 hover:bg-purple-700 transition-all active:scale-95 disabled:bg-purple-400"
            aria-label="Baixar PDF"
          >
            {isGeneratingPdf ? <Loader2 className="w-6 h-6 animate-spin" /> : <Download className="w-6 h-6" />}
          </button>
        </div>

        {/* Resume Manager Modal */}
        {showResumeManager && (
          <ResumeManager
            currentResume={resumeData}
            currentTemplate={template}
            onLoadResume={(data, template) => {
              setResumeData(data);
              setTemplate(template);
            }}
            onClose={() => setShowResumeManager(false)}
          />
        )}

        {/* Toast Notifications */}
        <ToastContainer toasts={toasts} onClose={removeToast} />

        {/* Auto-save Indicator */}
        <AutoSaveIndicator status={saveStatus} lastSaved={lastSaved} />

        {/* Scroll to Top Button */}
        <ScrollToTop />
        
        {/* Accessibility Helper */}
        <AccessibilityHelper />

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
  // Simple routing based on pathname
  const pathname = typeof window !== 'undefined' ? window.location.pathname : '/';
  
  // Route to different pages
  if (pathname === '/sobre') {
    return <Sobre />;
  }
  if (pathname === '/contato') {
    return <Contato />;
  }
  if (pathname === '/privacidade') {
    return <Privacidade />;
  }
  if (pathname === '/termos') {
    return <Termos />;
  }
  
  // Default route - main app
  return (
    <ErrorBoundary>
      <AppContent />
    </ErrorBoundary>
  );
}