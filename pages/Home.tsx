import React, { useState, useEffect, Suspense, lazy } from 'react';
import { ResumeForm } from '../components/ResumeForm';
import { ResumePreview } from '../components/ResumePreview';
import { PrivacyModal, TermsModal, ConfirmModal } from '../components/LegalModals';
import { AdPlaceholder } from '../components/AdPlaceholder';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';

// Lazy load heavy SEO components for better performance
const SEOContent = lazy(() => import('../components/SEOContent').then(module => ({ default: module.SEOContent })));
const ResumeTips = lazy(() => import('../components/ResumeTips').then(module => ({ default: module.ResumeTips })));
const CareerBlog = lazy(() => import('../components/CareerBlog').then(module => ({ default: module.CareerBlog })));
import { ResumeData, INITIAL_DATA_PT, INITIAL_DATA_EN, INITIAL_DATA_ES, BLANK_DATA, TemplateType } from '../types';
import { Trash2, Wand2, Heart, Download, Loader2 } from 'lucide-react';
import { useLanguage, Language } from '../LanguageContext';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

export const Home = () => {
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
        <div className="min-h-screen flex flex-col bg-slate-50">
            <Header
                language={language}
                setLanguage={setLanguage}
                showTools={true}
                template={template}
                setTemplate={setTemplate}
                isGeneratingPdf={isGeneratingPdf}
                onDownloadPdf={handleDownloadPdf}
                t={t}
            />

            <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-10">
                {/* Main Content Logic - Copied from App.tsx but without Navbar wrapper */}

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
                            <strong>Gupy</strong>, <strong>Kenoby</strong> e <strong>Vagas.com</strong>.
                        </p>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                    {/* Left Column: Form */}
                    <div className="lg:col-span-5 xl:col-span-4 space-y-6">

                        {/* Form Actions */}
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
                                </p>
                            </div>
                            <ResumeForm data={resumeData} onChange={setResumeData} />
                        </div>

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

                            {/* Preview Container */}
                            <div className="bg-slate-200/50 rounded-xl p-4 sm:p-8 border border-slate-200 shadow-inner w-full flex justify-center overflow-hidden h-[540px] sm:h-[685px] md:h-[800px] lg:h-[850px] xl:h-[970px] transition-all duration-300">
                                <div className="origin-top transform scale-[0.45] sm:scale-[0.55] md:scale-[0.65] lg:scale-[0.70] xl:scale-[0.80] shadow-2xl bg-white">
                                    <ResumePreview data={resumeData} template={template} />
                                </div>
                            </div>

                            <div className="w-full mt-6 max-w-2xl">
                                <AdPlaceholder slotId="preview-bottom-ad" format="auto" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Blog & SEO Section - Lazy Loaded */}
                <Suspense fallback={<div className="py-16 bg-slate-50 border-t border-slate-200"><div className="text-center text-slate-600">Carregando conteúdo...</div></div>}>
                    <CareerBlog />
                </Suspense>
                <Suspense fallback={<div className="py-16 bg-white border-t border-slate-100"><div className="text-center text-slate-600">Carregando dicas...</div></div>}>
                    <ResumeTips />
                </Suspense>
                <Suspense fallback={<div className="py-16 bg-white border-t border-slate-200"><div className="text-center text-slate-600">Carregando informações...</div></div>}>
                    <SEOContent />
                </Suspense>
            </main>

            <Footer t={t} />

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
                >
                    {isGeneratingPdf ? <Loader2 className="w-6 h-6 animate-spin" /> : <Download className="w-6 h-6" />}
                </button>
            </div>

            {/* PRINT AREA */}
            <div className="print-area">
                <ResumePreview data={resumeData} template={template} />
            </div>

            {/* PDF GENERATION CONTAINER */}
            <div id="resume-to-pdf" className="pdf-generation-container">
                <ResumePreview data={resumeData} template={template} />
            </div>
        </div>
    );
};
