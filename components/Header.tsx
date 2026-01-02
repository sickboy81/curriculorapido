import React from 'react';
import { FileText, Globe, Download, Loader2, LayoutTemplate, Menu, X, MoreVertical } from 'lucide-react';
import { Language } from '../LanguageContext';
import { TemplateType } from '../types';

interface HeaderProps {
    language: Language;
    setLanguage: (lang: Language) => void;
    // Optional props only for Home/Full Navbar
    showTools?: boolean;
    template?: TemplateType;
    setTemplate?: (t: TemplateType) => void;
    isGeneratingPdf?: boolean;
    onDownloadPdf?: () => void;
    t: (key: string) => string;
}

export const Header: React.FC<HeaderProps> = ({
    language,
    setLanguage,
    showTools = false,
    template,
    setTemplate,
    isGeneratingPdf,
    onDownloadPdf,
    t
}) => {
    const [showMobileMenu, setShowMobileMenu] = React.useState(false);

    return (
        <nav className="bg-white border-b border-slate-200 px-4 sm:px-6 lg:px-8 py-3 sticky top-0 z-50 shadow-sm" aria-label="Navegação principal">
            <div className="max-w-7xl mx-auto flex items-center justify-between">
                <div className="flex items-center gap-2">
                    {/* Logo links to Home */}
                    <a href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
                        <div className="bg-purple-600 p-2 rounded-lg">
                            <FileText className="w-5 h-5 text-white" />
                        </div>
                        <div className="text-xl font-bold tracking-tight text-slate-900 hidden sm:block">Currículo Rápido</div>
                    </a>
                </div>

                <div className="flex items-center gap-2 sm:gap-4">
                    {/* Desktop: Language Selector */}
                    <div className="hidden lg:flex items-center gap-1 bg-slate-100 p-1 rounded-lg border border-slate-200">
                        <Globe className="w-4 h-4 text-slate-500 ml-2" />
                        <select
                            value={language}
                            onChange={(e) => setLanguage(e.target.value as Language)}
                            aria-label={t('nav.language') || "Selecionar Idioma"}
                            className="bg-transparent text-sm font-medium text-slate-700 focus:outline-none cursor-pointer py-1 pr-1"
                        >
                            <option value="pt">PT</option>
                            <option value="en">EN</option>
                            <option value="es">ES</option>
                        </select>
                    </div>

                    {showTools && setTemplate && (
                        <div className="flex items-center gap-2 bg-slate-100 p-1 rounded-lg border border-slate-200">
                            <LayoutTemplate className="w-4 h-4 text-slate-500 ml-2" />
                            <select
                                value={template}
                                onChange={(e) => setTemplate(e.target.value as TemplateType)}
                                aria-label={t('nav.template') || "Selecionar Modelo"}
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
                    )}

                    {showTools && onDownloadPdf && (
                        <button
                            onClick={onDownloadPdf}
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
                    )}

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
                                            aria-label={t('nav.language') || "Selecionar Idioma"}
                                            className="w-full bg-transparent focus:outline-none cursor-pointer"
                                        >
                                            <option value="pt">Português</option>
                                            <option value="en">English</option>
                                            <option value="es">Español</option>
                                        </select>
                                    </div>
                                </div>
                                {!showTools && (
                                    <a href="/" className="px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 block">Voltar ao Início</a>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
};
