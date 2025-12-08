import React, { useState, useEffect } from 'react';
import { ResumeForm } from './components/ResumeForm';
import { ResumePreview } from './components/ResumePreview';
import { PrivacyModal, TermsModal, ConfirmModal } from './components/LegalModals';
import { SEOContent } from './components/SEOContent';
import { ResumeTips } from './components/ResumeTips';
import { CareerBlog } from './components/CareerBlog';
import { AdPlaceholder } from './components/AdPlaceholder';
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
        <nav className="bg-white border-b border-slate-200 px-4 sm:px-6 lg:px-8 py-3 sticky top-0 z-50 shadow-sm">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="bg-purple-600 p-2 rounded-lg">
                <FileText className="w-5 h-5 text-white" />
              </div>
              <h1 className="text-xl font-bold tracking-tight text-slate-900 hidden sm:block">Currículo Rápido</h1>
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
                    <option value="corporate">{t('templates.corporate')}</option>
                    <option value="focal">{t('templates.focal')}</option>
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
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mb-4 tracking-tight">
              {t('hero.title')}
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto" dangerouslySetInnerHTML={{ __html: t('hero.subtitle') }}>
            </p>

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

              <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                <div className="bg-slate-50 px-6 py-4 border-b border-slate-200">
                  <h3 className="font-semibold text-slate-800">{t('form.title')}</h3>
                </div>
                <ResumeForm data={resumeData} onChange={setResumeData} />
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

        {/* Blog & SEO Section */}
        <CareerBlog />
        <ResumeTips />
        <SEOContent />

        {/* Footer */}
        <footer className="bg-white border-t border-slate-200 py-10 mt-auto">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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