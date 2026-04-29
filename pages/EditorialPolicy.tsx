import React from 'react';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { SeoHead } from '../components/SeoHead';
import { useLanguage } from '../LanguageContext';

export const EditorialPolicy = () => {
  const { t, language, setLanguage } = useLanguage();

  return (
    <div className="font-sans text-slate-900 bg-slate-50 min-h-screen flex flex-col">
      <SeoHead
        title="Política Editorial | Currículo Rápido"
        description="Entenda como produzimos, revisamos e atualizamos os conteúdos de currículo e carreira do Currículo Rápido."
      />
      <Header language={language} setLanguage={setLanguage} t={t} />

      <main className="flex-1 max-w-4xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-10">
        <article className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-10 space-y-8">
          <header>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mb-3">Política Editorial</h1>
            <p className="text-slate-600">
              Esta política explica como o <strong>Currículo Rápido</strong> cria conteúdos sobre currículo, carreira e
              empregabilidade para o público brasileiro.
            </p>
          </header>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-2">Objetivo editorial</h2>
            <p className="text-slate-700 leading-relaxed">
              Nosso foco é oferecer guias úteis, aplicáveis e atualizados para ajudar pessoas a conquistar entrevistas e
              oportunidades de trabalho. Priorizamos conteúdo prático, com linguagem clara e orientado a resolução de
              problemas reais de candidatura.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-2">Como os conteúdos são produzidos</h2>
            <ul className="list-disc list-inside space-y-2 text-slate-700">
              <li>Planejamento por intenção de busca (dúvidas reais de candidatos).</li>
              <li>Estrutura com passo a passo, exemplos e checklist de aplicação.</li>
              <li>Revisão de clareza, coerência e consistência técnica.</li>
              <li>Atualização periódica de termos, práticas e recomendações de mercado.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-2">Critérios de qualidade</h2>
            <ul className="list-disc list-inside space-y-2 text-slate-700">
              <li>Conteúdo original, sem cópia de terceiros.</li>
              <li>Orientação prática com utilidade imediata para o usuário.</li>
              <li>Evitamos promessas enganosas, atalhos ou manipulação de recrutadores.</li>
              <li>Correção de erros editoriais assim que identificados.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-2">Transparência e responsabilidade</h2>
            <p className="text-slate-700 leading-relaxed">
              Os conteúdos são de caráter informativo e não substituem aconselhamento profissional individual. Quando um
              material recebe atualização relevante, a data de revisão é ajustada na própria página.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-2">Contato editorial</h2>
            <p className="text-slate-700 leading-relaxed">
              Sugestões de correção, melhoria ou pauta podem ser enviadas pela página de contato do site.
            </p>
          </section>
        </article>
      </main>

      <Footer t={t} />
    </div>
  );
};
