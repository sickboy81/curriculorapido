import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Clock, ChevronRight } from 'lucide-react';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { SeoHead } from '../components/SeoHead';
import { useLanguage } from '../LanguageContext';
import { guides } from '../data/guides';

export const Guides = () => {
  const { t, language, setLanguage } = useLanguage();

  return (
    <div className="font-sans text-slate-900 bg-slate-50 min-h-screen flex flex-col">
      <SeoHead
        title="Guias de Currículo e Carreira | Currículo Rápido"
        description="Biblioteca com guias completos sobre currículo, ATS, primeiro emprego, estágio e preparação para candidaturas."
      />
      <Header language={language} setLanguage={setLanguage} t={t} />

      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-10">
        <section className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mb-3">Guias de Currículo e Carreira</h1>
          <p className="text-slate-600 max-w-3xl">
            Conteúdo original para ajudar você a montar currículo com mais qualidade, adaptar para vagas reais e aumentar
            as chances de entrevista.
          </p>
        </section>

        <section className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {guides.map((guide) => (
            <article key={guide.slug} className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 flex flex-col">
              <div className="flex items-center gap-2 text-purple-700 mb-3">
                <BookOpen className="w-4 h-4" />
                <span className="text-xs font-semibold uppercase tracking-wide">Guia prático</span>
              </div>

              <h2 className="text-lg font-bold text-slate-900 leading-tight mb-3">{guide.title}</h2>
              <p className="text-sm text-slate-600 mb-4 flex-1">{guide.description}</p>

              <div className="flex flex-wrap gap-2 mb-4">
                {guide.tags.map((tag) => (
                  <span key={tag} className="text-xs bg-slate-100 text-slate-700 px-2 py-1 rounded-full">
                    {tag}
                  </span>
                ))}
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1 text-xs text-slate-500">
                  <Clock className="w-4 h-4" />
                  <span>{guide.readTime}</span>
                </div>
                <Link
                  to={`/guias/${guide.slug}`}
                  className="text-sm font-semibold text-purple-700 hover:text-purple-900 inline-flex items-center gap-1"
                >
                  Ler guia <ChevronRight className="w-4 h-4" />
                </Link>
              </div>
            </article>
          ))}
        </section>
      </main>

      <Footer t={t} />
    </div>
  );
};
