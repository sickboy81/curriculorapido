import React from 'react';
import { Shield, Lock, CheckCircle, FileText, ChevronDown, PenTool, Layout, Download, FileCheck2 } from 'lucide-react';
import { useLanguage } from '../LanguageContext';

export const SEOContent: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section className="bg-white border-t border-slate-200 py-16 lg:py-20 no-print">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main SEO Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl font-bold text-slate-900 mb-6">
            {t('seo.title')}
          </h2>
          <p className="text-lg text-slate-600 leading-relaxed" dangerouslySetInnerHTML={{ __html: t('seo.subtitle') }}>
          </p>
        </div>

        {/* Step by Step Section (Matches HowTo Schema) */}
        <div className="mb-20">
          <h3 className="text-2xl font-bold text-slate-900 mb-8 text-center">{t('seo.howToTitle')}</h3>
          <div className="grid md:grid-cols-4 gap-6">
            <div className="flex flex-col items-center text-center p-4">
               <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center text-purple-600 mb-4">
                 <PenTool className="w-8 h-8" />
               </div>
               <h4 className="font-bold text-slate-800 mb-2">1. {t('seo.step1Title')}</h4>
               <p className="text-sm text-slate-600">{t('seo.step1Text')}</p>
            </div>
            <div className="flex flex-col items-center text-center p-4">
               <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 mb-4">
                 <Layout className="w-8 h-8" />
               </div>
               <h4 className="font-bold text-slate-800 mb-2">2. {t('seo.step2Title')}</h4>
               <p className="text-sm text-slate-600">{t('seo.step2Text')}</p>
            </div>
            <div className="flex flex-col items-center text-center p-4">
               <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600 mb-4">
                 <FileCheck2 className="w-8 h-8" />
               </div>
               <h4 className="font-bold text-slate-800 mb-2">3. {t('seo.step3Title')}</h4>
               <p className="text-sm text-slate-600">{t('seo.step3Text')}</p>
            </div>
            <div className="flex flex-col items-center text-center p-4">
               <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center text-slate-600 mb-4">
                 <Download className="w-8 h-8" />
               </div>
               <h4 className="font-bold text-slate-800 mb-2">4. {t('seo.step4Title')}</h4>
               <p className="text-sm text-slate-600">{t('seo.step4Text')}</p>
            </div>
          </div>
        </div>

        {/* Semantic Grid for Crawlers */}
        <div className="grid md:grid-cols-2 gap-12">
          
          <article className="space-y-4">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-green-100 rounded-lg text-green-700">
                <Shield className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-800">{t('seo.privacyTitle')}</h3>
            </div>
            <p className="text-slate-600 leading-relaxed">
              {t('seo.privacyText')}
            </p>
          </article>

          <article className="space-y-4">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-purple-100 rounded-lg text-purple-700">
                <FileText className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-800">{t('seo.termsTitle')}</h3>
            </div>
            <p className="text-slate-600 leading-relaxed">
              {t('seo.termsText')}
            </p>
          </article>

          <article className="space-y-4">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-blue-100 rounded-lg text-blue-700">
                <CheckCircle className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-800">{t('seo.atsTitle')}</h3>
            </div>
            <p className="text-slate-600 leading-relaxed">
              {t('seo.atsText')}
            </p>
          </article>

          <article className="space-y-4">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-orange-100 rounded-lg text-orange-700">
                <Lock className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-800">{t('seo.securityTitle')}</h3>
            </div>
            <p className="text-slate-600 leading-relaxed">
              {t('seo.securityText')}
            </p>
          </article>

        </div>

        {/* Semantic FAQ Section using <details> and <summary> for better SEO */}
        <div className="mt-16 pt-12 border-t border-slate-100" itemScope itemType="https://schema.org/FAQPage">
          <h3 className="text-2xl font-bold text-slate-900 mb-8 text-center">{t('seo.faqTitle')}</h3>
          <div className="max-w-3xl mx-auto space-y-4">
            
            <details className="group bg-slate-50 border border-slate-200 rounded-lg overflow-hidden" itemScope itemProp="mainEntity" itemType="https://schema.org/Question">
              <summary className="flex items-center justify-between cursor-pointer p-4 font-bold text-slate-800 hover:bg-slate-100 transition-colors list-none">
                <span itemProp="name">{t('seo.q1')}</span>
                <ChevronDown className="w-5 h-5 text-slate-400 group-open:rotate-180 transition-transform" />
              </summary>
              <div className="p-4 pt-0 text-slate-600 leading-relaxed border-t border-transparent group-open:border-slate-100" itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer">
                 <p itemProp="text">{t('seo.a1')}</p>
              </div>
            </details>

            <details className="group bg-slate-50 border border-slate-200 rounded-lg overflow-hidden" itemScope itemProp="mainEntity" itemType="https://schema.org/Question">
              <summary className="flex items-center justify-between cursor-pointer p-4 font-bold text-slate-800 hover:bg-slate-100 transition-colors list-none">
                <span itemProp="name">{t('seo.q2')}</span>
                <ChevronDown className="w-5 h-5 text-slate-400 group-open:rotate-180 transition-transform" />
              </summary>
              <div className="p-4 pt-0 text-slate-600 leading-relaxed border-t border-transparent group-open:border-slate-100" itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer">
                 <p itemProp="text">{t('seo.a2')}</p>
              </div>
            </details>

            <details className="group bg-slate-50 border border-slate-200 rounded-lg overflow-hidden" itemScope itemProp="mainEntity" itemType="https://schema.org/Question">
              <summary className="flex items-center justify-between cursor-pointer p-4 font-bold text-slate-800 hover:bg-slate-100 transition-colors list-none">
                <span itemProp="name">{t('seo.q3')}</span>
                <ChevronDown className="w-5 h-5 text-slate-400 group-open:rotate-180 transition-transform" />
              </summary>
              <div className="p-4 pt-0 text-slate-600 leading-relaxed border-t border-transparent group-open:border-slate-100" itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer">
                 <p itemProp="text">{t('seo.a3')}</p>
              </div>
            </details>

            <details className="group bg-slate-50 border border-slate-200 rounded-lg overflow-hidden" itemScope itemProp="mainEntity" itemType="https://schema.org/Question">
              <summary className="flex items-center justify-between cursor-pointer p-4 font-bold text-slate-800 hover:bg-slate-100 transition-colors list-none">
                <span itemProp="name">{t('seo.q4')}</span>
                <ChevronDown className="w-5 h-5 text-slate-400 group-open:rotate-180 transition-transform" />
              </summary>
              <div className="p-4 pt-0 text-slate-600 leading-relaxed border-t border-transparent group-open:border-slate-100" itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer">
                 <p itemProp="text">{t('seo.a4')}</p>
              </div>
            </details>

          </div>
        </div>
      </div>
    </section>
  );
};