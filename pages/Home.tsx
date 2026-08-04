import React, { useState, useEffect, Suspense, lazy, useDeferredValue } from 'react';
import { ResumeForm } from '../components/ResumeForm';
import { ResumePreview } from '../components/ResumePreview';
import { PrivacyModal, TermsModal, ConfirmModal } from '../components/LegalModals';
import { AdPlaceholder } from '../components/AdPlaceholder';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { SeoHead } from '../components/SeoHead';
import { ResumeProgress } from '../components/ResumeProgress';
import { TemplateGallery } from '../components/TemplateGallery';
import { WelcomeModal } from '../components/WelcomeModal';
import { ATSChecker } from '../components/ATSChecker';
import { ResumeTipsInline } from '../components/ResumeTipsInline';

// Lazy load heavy SEO components for better performance
const SEOContent = lazy(() => import('../components/SEOContent').then(module => ({ default: module.SEOContent })));
const ResumeTips = lazy(() => import('../components/ResumeTips').then(module => ({ default: module.ResumeTips })));
const CareerBlog = lazy(() => import('../components/CareerBlog').then(module => ({ default: module.CareerBlog })));
const ResumeManager = lazy(() => import('../components/ResumeManager').then(module => ({ default: module.ResumeManager })));
const JobSuggestions = lazy(() => import('../components/JobSuggestions').then(module => ({ default: module.JobSuggestions })));
import { ResumeData, INITIAL_DATA_PT, BLANK_DATA, TemplateType } from '../types';
import { Trash2, Wand2, Download, Loader2, CheckCircle2, FileDown, ShieldCheck, Sparkles, Eye, Pencil, Check, FolderOpen, ArrowDown, Info, Maximize2, X, Target } from 'lucide-react';
import { useLanguage, Language } from '../LanguageContext';

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
        return BLANK_DATA;
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
    const [mobileView, setMobileView] = useState<'editor' | 'preview'>('editor');
    const [lastSaved, setLastSaved] = useState<Date | null>(null);
    const [showWelcome, setShowWelcome] = useState(() => typeof window !== 'undefined' && !localStorage.getItem('resume_builder_data') && !localStorage.getItem('resume_builder_onboarding_seen'));
    const [showResumeManager, setShowResumeManager] = useState(false);
    const [showHero, setShowHero] = useState(() => typeof window === 'undefined' || !localStorage.getItem('resume_builder_data'));
    const [showPreviewModal, setShowPreviewModal] = useState(false);
    const [showJobAnalysis, setShowJobAnalysis] = useState(false);
    const deferredResumeData = useDeferredValue(resumeData);

    // Persistence Effects
    useEffect(() => {
        localStorage.setItem('resume_builder_data', JSON.stringify(resumeData));
        setLastSaved(new Date());
    }, [resumeData]);

    useEffect(() => {
        localStorage.setItem('resume_builder_template', template);
    }, [template]);

    const handleDownloadPdf = async () => {
        if (typeof window !== 'undefined') {
            setIsGeneratingPdf(true);

            try {
                const [{ default: jsPDF }, { default: html2canvas }] = await Promise.all([
                    import('jspdf'),
                    import('html2canvas'),
                ]);

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

    const shareUrl = "https://www.curriculorapido.com.br";
    const shareText = t('hero.title');

    const onConfirmAction = () => {
        if (confirmType === 'clear') {
            setResumeData(BLANK_DATA);
            localStorage.setItem('resume_builder_data', JSON.stringify(BLANK_DATA));
        } else if (confirmType === 'example') {
            setResumeData(INITIAL_DATA_PT);
            localStorage.setItem('resume_builder_data', JSON.stringify(INITIAL_DATA_PT));
        }
        setConfirmType(null);
    };

    const completeOnboarding = (data: ResumeData) => {
        setResumeData(data);
        localStorage.setItem('resume_builder_onboarding_seen', 'true');
        setShowWelcome(false);
        setShowHero(false);
        requestAnimationFrame(() => document.getElementById('form')?.scrollIntoView({ behavior: 'smooth', block: 'start' }));
    };

    const handleResumeChange = (data: ResumeData) => setResumeData(data);

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
            <SeoHead
                title="Currículo Rápido | Criar Currículo Online Grátis em PDF"
                description="Crie seu currículo em PDF com modelos profissionais, orientação por etapas, análise ATS e salvamento local, sem cadastro."
            />
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

            <WelcomeModal isOpen={showWelcome} onBlank={() => completeOnboarding(BLANK_DATA)} onExample={() => completeOnboarding(INITIAL_DATA_PT)} onClose={() => { localStorage.setItem('resume_builder_onboarding_seen', 'true'); setShowWelcome(false); }} />
            {showResumeManager && <Suspense fallback={null}><ResumeManager currentResume={resumeData} currentTemplate={template} onLoadResume={(resume) => { setResumeData(resume.data); setTemplate(resume.template); setShowResumeManager(false); }} onNewResume={() => { setResumeData(BLANK_DATA); setShowResumeManager(false); }} onClose={() => setShowResumeManager(false)} /></Suspense>}

            <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-6 sm:py-10">
                {/* Main Content Logic - Copied from App.tsx but without Navbar wrapper */}

                {/* Intro Section */}
                {showHero ? <><section className="relative mb-5 overflow-hidden rounded-3xl border border-violet-100 bg-gradient-to-br from-violet-700 via-purple-700 to-indigo-800 px-5 py-10 text-center shadow-xl shadow-violet-900/10 sm:px-10 sm:py-14">
                    <div className="pointer-events-none absolute -left-20 top-0 h-48 w-48 rounded-full bg-white/10 blur-3xl" />
                    <div className="pointer-events-none absolute -right-16 bottom-0 h-56 w-56 rounded-full bg-fuchsia-400/20 blur-3xl" />
                    <div className="relative mx-auto max-w-3xl">
                    <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-semibold text-violet-50">
                        <Sparkles className="h-3.5 w-3.5" /> Currículo profissional, sem cadastro
                    </div>
                    <h1 className="text-3xl sm:text-5xl font-extrabold text-white mb-4 tracking-tight">
                        {t('hero.title')}
                    </h1>
                    <p className="text-base sm:text-lg text-violet-100 max-w-2xl mx-auto" dangerouslySetInnerHTML={{ __html: t('hero.subtitle') }}>
                    </p>
                    <div className="mt-7 grid grid-cols-1 gap-2 text-left sm:grid-cols-3 sm:gap-3">
                        <div className="flex items-center gap-2 rounded-xl border border-white/15 bg-white/10 px-3 py-3 text-sm font-medium text-white"><CheckCircle2 className="h-4 w-4 text-emerald-300" /> Modelos prontos e editáveis</div>
                        <div className="flex items-center gap-2 rounded-xl border border-white/15 bg-white/10 px-3 py-3 text-sm font-medium text-white"><FileDown className="h-4 w-4 text-emerald-300" /> Download em PDF grátis</div>
                        <div className="flex items-center gap-2 rounded-xl border border-white/15 bg-white/10 px-3 py-3 text-sm font-medium text-white"><ShieldCheck className="h-4 w-4 text-emerald-300" /> Dados no seu dispositivo</div>
                    </div>
                    <button type="button" onClick={() => { setShowHero(false); requestAnimationFrame(() => document.getElementById('workspace')?.scrollIntoView({ behavior: 'smooth' })); }} className="mt-7 inline-flex items-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-bold text-violet-700 shadow-lg transition hover:-translate-y-0.5 hover:shadow-xl">Começar meu currículo <ArrowDown className="h-4 w-4" /></button>
                    </div>
                </section>

                <div className="mb-8 rounded-2xl border border-slate-200 bg-white px-4 py-4 shadow-sm sm:px-6">
                    <div className="grid gap-3 text-sm sm:grid-cols-3">
                        <div className="flex items-center gap-3"><span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-violet-100 text-xs font-bold text-violet-700">1</span><span><strong>Preencha</strong><br className="sm:hidden" /> seus dados</span></div>
                        <div className="flex items-center gap-3"><span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-violet-100 text-xs font-bold text-violet-700">2</span><span><strong>Escolha</strong> o modelo ideal</span></div>
                        <div className="flex items-center gap-3"><span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-violet-100 text-xs font-bold text-violet-700">3</span><span><strong>Baixe</strong> seu PDF pronto</span></div>
                    </div>
                </div></> : <div className="mb-4 flex items-center justify-between rounded-xl border border-violet-100 bg-violet-50 px-4 py-3"><div className="flex items-center gap-2 text-sm text-violet-900"><Info className="h-4 w-4" /><span>Seu espaço de criação está pronto.</span></div><button type="button" onClick={() => setShowHero(true)} className="text-xs font-semibold text-violet-700 hover:underline">Ver apresentação</button></div>}

                <div id="workspace" className="mb-5 flex items-center justify-between rounded-xl border border-emerald-100 bg-emerald-50 px-4 py-3 text-sm text-emerald-800">
                    <div className="flex items-center gap-2"><Check className="h-4 w-4" /><span><strong>Salvo automaticamente</strong> neste dispositivo</span></div>
                    <span className="text-xs text-emerald-700">{lastSaved ? `Atualizado agora` : 'Pronto para começar'}</span>
                </div>

                <div className="mb-5 grid grid-cols-2 rounded-xl border border-slate-200 bg-white p-1 lg:hidden">
                    <button type="button" onClick={() => setMobileView('editor')} className={`flex items-center justify-center gap-2 rounded-lg py-2.5 text-sm font-semibold ${mobileView === 'editor' ? 'bg-violet-600 text-white shadow-sm' : 'text-slate-600'}`}><Pencil className="h-4 w-4" />Editar</button>
                    <button type="button" onClick={() => setMobileView('preview')} className={`flex items-center justify-center gap-2 rounded-lg py-2.5 text-sm font-semibold ${mobileView === 'preview' ? 'bg-violet-600 text-white shadow-sm' : 'text-slate-600'}`}><Eye className="h-4 w-4" />Visualizar</button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                    {/* Left Column: Form */}
                    <div className={`lg:col-span-5 xl:col-span-4 space-y-6 ${mobileView === 'preview' ? 'hidden lg:block' : ''}`}>

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

                        <button type="button" onClick={() => setShowResumeManager(true)} className="flex w-full items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700 shadow-sm transition hover:border-violet-300 hover:bg-violet-50 hover:text-violet-700">
                            <FolderOpen className="h-4 w-4" /> Meus currículos e versões salvas
                        </button>

                        <ResumeProgress resumeData={resumeData} compact />

                        <div className="grid grid-cols-2 gap-2 rounded-xl border border-slate-200 bg-white p-3 shadow-sm">
                            <ATSChecker resumeData={resumeData} />
                            <button type="button" onClick={() => setShowJobAnalysis(true)} className="flex items-center justify-center gap-2 rounded-lg bg-slate-900 px-3 py-2 text-sm font-medium text-white shadow-md transition hover:bg-slate-800"><Target className="h-4 w-4" />Analisar vaga</button>
                        </div>

                        <ResumeTipsInline />

                        <TemplateGallery value={template} onChange={setTemplate} color={resumeData.themeColor} onColorChange={(themeColor) => setResumeData((current) => ({ ...current, themeColor }))} />

                        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden" id="form">
                            <div className="bg-slate-50 px-6 py-4 border-b border-slate-200">
                                <h2 className="font-semibold text-slate-800">{t('form.title')}</h2>
                                <p className="text-xs text-slate-500 mt-1">
                                    Preencha seus dados e veja seu <strong>curriculum vitae</strong> sendo criado em tempo real.
                                </p>
                            </div>
                            <ResumeForm data={resumeData} onChange={handleResumeChange} />
                        </div>

                        <AdPlaceholder placement="editor" className="mt-6" />

                    </div>

                    {/* Right Column: Preview */}
                    <div className={`lg:col-span-7 xl:col-span-8 lg:sticky lg:top-24 ${mobileView === 'editor' ? 'hidden lg:block' : ''}`}>
                        <div className="flex flex-col items-center">
                            <div className="mb-4 flex w-full items-center justify-between gap-3">
                                <span className="flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1.5 text-sm font-semibold text-emerald-700"><span className="h-2 w-2 rounded-full bg-emerald-500" /> {t('preview.realtime')}</span>
                                <button type="button" onClick={() => setShowPreviewModal(true)} className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-700 shadow-sm hover:border-violet-300 hover:text-violet-700"><Maximize2 className="h-4 w-4" />Ampliar</button>
                            </div>

                            {/* Preview Container */}
                            <div className="bg-slate-200/50 rounded-xl p-4 sm:p-8 border border-slate-200 shadow-inner w-full flex justify-center overflow-hidden h-[540px] sm:h-[685px] md:h-[800px] lg:h-[850px] xl:h-[970px] transition-all duration-300">
                                <div className="origin-top transform scale-[0.45] sm:scale-[0.55] md:scale-[0.65] lg:scale-[0.70] xl:scale-[0.80] shadow-2xl bg-white">
                                    <ResumePreview data={deferredResumeData} template={template} />
                                </div>
                            </div>

                            <AdPlaceholder placement="preview" className="mt-6 w-full max-w-2xl" />

                        </div>
                    </div>
                </div>

                {/* Blog & SEO Section - Lazy Loaded */}
                <div className="mt-10 mb-4 text-center">
                    <a
                        href="/guias"
                        className="inline-flex items-center rounded-xl border border-purple-200 bg-purple-50 px-4 py-2 text-sm font-semibold text-purple-700 hover:bg-purple-100 transition-colors"
                    >
                        Ver biblioteca completa de guias de currículo
                    </a>
                </div>
                <div style={{ contentVisibility: 'auto', containIntrinsicSize: '900px' }}><Suspense fallback={<div className="py-16 bg-slate-50 border-t border-slate-200"><div className="text-center text-slate-600">Carregando conteúdo...</div></div>}>
                    <CareerBlog />
                </Suspense></div>
                <div style={{ contentVisibility: 'auto', containIntrinsicSize: '800px' }}><Suspense fallback={<div className="py-16 bg-white border-t border-slate-100"><div className="text-center text-slate-600">Carregando dicas...</div></div>}>
                    <ResumeTips />
                </Suspense></div>
                <div style={{ contentVisibility: 'auto', containIntrinsicSize: '1600px' }}><Suspense fallback={<div className="py-16 bg-white border-t border-slate-200"><div className="text-center text-slate-600">Carregando informações...</div></div>}>
                    <SEOContent />
                </Suspense></div>
            </main>

            <Footer t={t} />

            {showPreviewModal && <div className="fixed inset-0 z-[80] flex flex-col bg-slate-950/80 p-3 sm:p-6" role="dialog" aria-modal="true" aria-label="Prévia ampliada do currículo"><div className="mb-3 flex items-center justify-between rounded-xl bg-white px-4 py-3 shadow-lg"><div><strong className="block text-slate-900">Prévia do currículo</strong><span className="text-xs text-slate-500">Confira o resultado antes de baixar.</span></div><div className="flex items-center gap-2"><button type="button" onClick={handleDownloadPdf} disabled={isGeneratingPdf} className="flex items-center gap-2 rounded-lg bg-violet-600 px-3 py-2 text-sm font-semibold text-white disabled:opacity-60"><Download className="h-4 w-4" />Baixar PDF</button><button type="button" onClick={() => setShowPreviewModal(false)} aria-label="Fechar prévia" className="rounded-lg p-2 text-slate-600 hover:bg-slate-100"><X className="h-5 w-5" /></button></div></div><div className="flex-1 overflow-auto rounded-xl bg-slate-200 p-4"><div className="mx-auto w-fit origin-top scale-[0.55] sm:scale-75 lg:scale-100"><ResumePreview data={deferredResumeData} template={template} /></div></div></div>}
            {showJobAnalysis && <div className="fixed inset-0 z-[80] overflow-y-auto bg-slate-950/70 p-3 sm:p-6" role="dialog" aria-modal="true" aria-label="Análise de compatibilidade com vaga"><div className="mx-auto max-w-3xl"><div className="mb-2 flex justify-end"><button type="button" onClick={() => setShowJobAnalysis(false)} className="flex items-center gap-2 rounded-lg bg-white px-3 py-2 text-sm font-semibold text-slate-700 shadow"><X className="h-4 w-4" />Fechar</button></div><Suspense fallback={<div className="rounded-xl bg-white p-8 text-center text-slate-600">Carregando análise...</div>}><JobSuggestions resumeData={resumeData} /></Suspense></div></div>}

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
