import React from 'react';
import { Shield, Lock, CheckCircle, FileText, ChevronDown, PenTool, Layout, Download, FileCheck2 } from 'lucide-react';
import { useLanguage } from '../LanguageContext';

export const SEOContent: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section className="bg-white border-t border-slate-200 py-16 lg:py-20 no-print" role="region" aria-labelledby="seo-content-title">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Main SEO Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 id="seo-content-title" className="text-3xl font-bold text-slate-900 mb-6">
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

        {/* Benefits Section */}
        <div className="mb-16 bg-gradient-to-br from-purple-50 to-blue-50 rounded-2xl p-8 md:p-12">
          <h3 className="text-2xl font-bold text-slate-900 mb-6 text-center">Por que escolher o Currículo Rápido?</h3>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h4 className="font-bold text-slate-800 mb-2">100% Gratuito</h4>
              <p className="text-sm text-slate-600">Crie quantos currículos quiser sem pagar nada. Sem marcas d'água, sem limites, sem pegadinhas.</p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h4 className="font-bold text-slate-800 mb-2">Privacidade Total</h4>
              <p className="text-sm text-slate-600">Seus dados nunca saem do seu navegador. Não armazenamos informações pessoais em servidores.</p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h4 className="font-bold text-slate-800 mb-2">Compatível com ATS</h4>
              <p className="text-sm text-slate-600">Modelos otimizados para sistemas de triagem como Gupy, Kenoby e Vagas.com, aumentando suas chances.</p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h4 className="font-bold text-slate-800 mb-2">Funciona no Celular</h4>
              <p className="text-sm text-slate-600">Crie e edite seu currículo diretamente no smartphone. Interface responsiva e intuitiva.</p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h4 className="font-bold text-slate-800 mb-2">Modelos Profissionais</h4>
              <p className="text-sm text-slate-600">12 modelos de currículo prontos para diferentes áreas: tecnologia, vendas, administração e mais.</p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h4 className="font-bold text-slate-800 mb-2">Download Imediato</h4>
              <p className="text-sm text-slate-600">Baixe seu currículo em PDF de alta qualidade em segundos, pronto para enviar por email ou WhatsApp.</p>
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

        {/* Additional SEO Content */}
        <div className="mt-16 pt-12 border-t border-slate-100">
          <h3 className="text-2xl font-bold text-slate-900 mb-6 text-center">Criar Currículo Online: Guia Completo 2025</h3>
          <div className="prose prose-slate max-w-none">
            <p className="text-slate-600 leading-relaxed mb-4">
              Criar um <strong>currículo profissional</strong> nunca foi tão fácil. O <strong>Currículo Rápido</strong> é o melhor <strong>gerador de CV grátis</strong> do Brasil, desenvolvido especialmente para o mercado de trabalho brasileiro. Nossa ferramenta permite que você crie um <strong>curriculum vitae</strong> em minutos, sem precisar de conhecimento técnico ou design.
            </p>
            <p className="text-slate-600 leading-relaxed mb-4">
              Se você está procurando um <strong>modelo de currículo simples</strong> para primeiro emprego, um <strong>currículo para jovem aprendiz</strong>, ou um <strong>CV profissional</strong> para cargos de liderança, temos o modelo ideal para você. Todos os nossos <strong>modelos de currículo 2025</strong> são otimizados para sistemas ATS (Applicant Tracking System) usados por empresas como Gupy, Kenoby e Vagas.com.
            </p>
            <p className="text-slate-600 leading-relaxed mb-4">
              Diferente de outros <strong>sites de currículo online</strong> que exigem cadastro ou cobram taxas, o Currículo Rápido funciona 100% no seu navegador. Você pode <strong>fazer currículo pelo celular</strong> ou computador, editar quantas vezes quiser e <strong>baixar currículo em PDF</strong> gratuitamente, sem marcas d'água ou limitações.
            </p>
            <h4 className="text-xl font-bold text-slate-900 mt-8 mb-4">Como fazer um currículo que se destaca</h4>
            <ul className="list-disc pl-6 space-y-2 text-slate-600 mb-4">
              <li><strong>Use palavras-chave da vaga:</strong> Leia a descrição da vaga e inclua os termos técnicos no seu currículo para passar nos filtros automáticos.</li>
              <li><strong>Seja objetivo:</strong> Mantenha seu currículo em 1 página (máximo 2 para profissionais seniores). Recrutadores gastam apenas 6 segundos na primeira leitura.</li>
              <li><strong>Destaque resultados:</strong> Em vez de listar tarefas, mostre conquistas e números. Ex: "Aumentei as vendas em 30%" é melhor que "Responsável por vendas".</li>
              <li><strong>Formato ATS-friendly:</strong> Use fontes simples (Arial, Calibri), evite gráficos complexos e tabelas, e salve sempre em PDF.</li>
              <li><strong>Personalize para cada vaga:</strong> Adapte seu resumo profissional e destaque experiências relevantes para cada posição.</li>
            </ul>
            <p className="text-slate-600 leading-relaxed">
              Com o <strong>Currículo Rápido</strong>, você tem acesso a <strong>modelos de currículo prontos</strong> que já seguem essas melhores práticas. Basta preencher seus dados, escolher o modelo que melhor representa seu perfil e baixar. É rápido, fácil e totalmente gratuito. Para mais <a href="#dicas-carreira" className="text-purple-600 hover:text-purple-800 underline font-medium">dicas de carreira e criação de currículo</a>, confira nossos artigos especializados. Comece a criar seu <strong>currículo profissional</strong> agora mesmo!
            </p>
          </div>
        </div>

        {/* STYLING ONLY FAQ Section - schema moved to index.html JSON-LD */}
        <div className="mt-16 pt-12 border-t border-slate-100">
          <h3 className="text-2xl font-bold text-slate-900 mb-8 text-center">{t('seo.faqTitle')}</h3>
          <div className="max-w-3xl mx-auto space-y-4">

            <details className="group bg-slate-50 border border-slate-200 rounded-lg overflow-hidden">
              <summary className="flex items-center justify-between cursor-pointer p-4 font-bold text-slate-800 hover:bg-slate-100 transition-colors list-none">
                <span>{t('seo.q1')}</span>
                <ChevronDown className="w-5 h-5 text-slate-400 group-open:rotate-180 transition-transform" />
              </summary>
              <div className="p-4 pt-0 text-slate-600 leading-relaxed border-t border-transparent group-open:border-slate-100">
                <p>{t('seo.a1')}</p>
              </div>
            </details>

            <details className="group bg-slate-50 border border-slate-200 rounded-lg overflow-hidden">
              <summary className="flex items-center justify-between cursor-pointer p-4 font-bold text-slate-800 hover:bg-slate-100 transition-colors list-none">
                <span>{t('seo.q2')}</span>
                <ChevronDown className="w-5 h-5 text-slate-400 group-open:rotate-180 transition-transform" />
              </summary>
              <div className="p-4 pt-0 text-slate-600 leading-relaxed border-t border-transparent group-open:border-slate-100">
                <p>{t('seo.a2')}</p>
              </div>
            </details>

            <details className="group bg-slate-50 border border-slate-200 rounded-lg overflow-hidden">
              <summary className="flex items-center justify-between cursor-pointer p-4 font-bold text-slate-800 hover:bg-slate-100 transition-colors list-none">
                <span>{t('seo.q3')}</span>
                <ChevronDown className="w-5 h-5 text-slate-400 group-open:rotate-180 transition-transform" />
              </summary>
              <div className="p-4 pt-0 text-slate-600 leading-relaxed border-t border-transparent group-open:border-slate-100">
                <p>{t('seo.a3')}</p>
              </div>
            </details>

            <details className="group bg-slate-50 border border-slate-200 rounded-lg overflow-hidden">
              <summary className="flex items-center justify-between cursor-pointer p-4 font-bold text-slate-800 hover:bg-slate-100 transition-colors list-none">
                <span>{t('seo.q4')}</span>
                <ChevronDown className="w-5 h-5 text-slate-400 group-open:rotate-180 transition-transform" />
              </summary>
              <div className="p-4 pt-0 text-slate-600 leading-relaxed border-t border-transparent group-open:border-slate-100">
                <p>{t('seo.a4')}</p>
              </div>
            </details>

            <details className="group bg-slate-50 border border-slate-200 rounded-lg overflow-hidden">
              <summary className="flex items-center justify-between cursor-pointer p-4 font-bold text-slate-800 hover:bg-slate-100 transition-colors list-none">
                <span>{t('seo.q5')}</span>
                <ChevronDown className="w-5 h-5 text-slate-400 group-open:rotate-180 transition-transform" />
              </summary>
              <div className="p-4 pt-0 text-slate-600 leading-relaxed border-t border-transparent group-open:border-slate-100">
                <p>{t('seo.a5')}</p>
              </div>
            </details>

            <details className="group bg-slate-50 border border-slate-200 rounded-lg overflow-hidden">
              <summary className="flex items-center justify-between cursor-pointer p-4 font-bold text-slate-800 hover:bg-slate-100 transition-colors list-none">
                <span>{t('seo.q6')}</span>
                <ChevronDown className="w-5 h-5 text-slate-400 group-open:rotate-180 transition-transform" />
              </summary>
              <div className="p-4 pt-0 text-slate-600 leading-relaxed border-t border-transparent group-open:border-slate-100">
                <p>{t('seo.a6')}</p>
              </div>
            </details>

            <details className="group bg-slate-50 border border-slate-200 rounded-lg overflow-hidden">
              <summary className="flex items-center justify-between cursor-pointer p-4 font-bold text-slate-800 hover:bg-slate-100 transition-colors list-none">
                <span>{t('seo.q7')}</span>
                <ChevronDown className="w-5 h-5 text-slate-400 group-open:rotate-180 transition-transform" />
              </summary>
              <div className="p-4 pt-0 text-slate-600 leading-relaxed border-t border-transparent group-open:border-slate-100">
                <p>{t('seo.a7')}</p>
              </div>
            </details>

            <details className="group bg-slate-50 border border-slate-200 rounded-lg overflow-hidden">
              <summary className="flex items-center justify-between cursor-pointer p-4 font-bold text-slate-800 hover:bg-slate-100 transition-colors list-none">
                <span>{t('seo.q8')}</span>
                <ChevronDown className="w-5 h-5 text-slate-400 group-open:rotate-180 transition-transform" />
              </summary>
              <div className="p-4 pt-0 text-slate-600 leading-relaxed border-t border-transparent group-open:border-slate-100">
                <p>{t('seo.a8')}</p>
              </div>
            </details>

            <details className="group bg-slate-50 border border-slate-200 rounded-lg overflow-hidden">
              <summary className="flex items-center justify-between cursor-pointer p-4 font-bold text-slate-800 hover:bg-slate-100 transition-colors list-none">
                <span>{t('seo.q9')}</span>
                <ChevronDown className="w-5 h-5 text-slate-400 group-open:rotate-180 transition-transform" />
              </summary>
              <div className="p-4 pt-0 text-slate-600 leading-relaxed border-t border-transparent group-open:border-slate-100">
                <p>{t('seo.a9')}</p>
              </div>
            </details>

            <details className="group bg-slate-50 border border-slate-200 rounded-lg overflow-hidden">
              <summary className="flex items-center justify-between cursor-pointer p-4 font-bold text-slate-800 hover:bg-slate-100 transition-colors list-none">
                <span>{t('seo.q10')}</span>
                <ChevronDown className="w-5 h-5 text-slate-400 group-open:rotate-180 transition-transform" />
              </summary>
              <div className="p-4 pt-0 text-slate-600 leading-relaxed border-t border-transparent group-open:border-slate-100">
                <p>{t('seo.a10')}</p>
              </div>
            </details>

          </div>
        </div>
      </div>
    </section>
  );
};