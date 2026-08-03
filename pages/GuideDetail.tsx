import React from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import { Calendar, Clock, ChevronRight } from 'lucide-react';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { SeoHead } from '../components/SeoHead';
import { useLanguage } from '../LanguageContext';
import { guides, guidesBySlug } from '../data/guides';
import { Helmet } from 'react-helmet-async';
import { AdPlaceholder } from '../components/AdPlaceholder';

export const GuideDetail = () => {
  const { t, language, setLanguage } = useLanguage();
  const { slug } = useParams<{ slug: string }>();
  const guide = slug ? guidesBySlug[slug] : undefined;

  if (!guide) {
    return <Navigate to="/guias" replace />;
  }

  const canonical = `https://www.curriculorapido.com.br/guias/${guide.slug}`;

  return (
    <div className="font-sans text-slate-900 bg-slate-50 min-h-screen flex flex-col">
      <SeoHead title={`${guide.title} | Currículo Rápido`} description={guide.description} type="article" />
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Article',
            headline: guide.title,
            description: guide.description,
            datePublished: guide.updatedAt,
            dateModified: guide.updatedAt,
            author: { '@type': 'Organization', name: 'Currículo Rápido' },
            publisher: {
              '@type': 'Organization',
              name: 'Currículo Rápido',
              logo: {
                '@type': 'ImageObject',
                url: 'https://www.curriculorapido.com.br/pwa-icon.svg',
              },
            },
            mainEntityOfPage: canonical,
            inLanguage: 'pt-BR',
            keywords: guide.tags.join(', '),
          })}
        </script>
      </Helmet>

      <Header language={language} setLanguage={setLanguage} t={t} />

      <main className="flex-1 max-w-4xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-10">
        <nav className="text-sm text-slate-500 mb-6 flex items-center gap-2">
          <Link to="/" className="hover:text-purple-700">
            Início
          </Link>
          <ChevronRight className="w-4 h-4" />
          <Link to="/guias" className="hover:text-purple-700">
            Guias
          </Link>
          <ChevronRight className="w-4 h-4" />
          <span className="text-slate-700">{guide.title}</span>
        </nav>

        <article className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-10">
          <header className="mb-8 border-b border-slate-100 pb-6">
            <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mb-4 leading-tight">{guide.title}</h1>
            <p className="text-slate-600 text-lg mb-4">{guide.description}</p>

            <div className="flex flex-wrap gap-4 text-sm text-slate-500 mb-4">
              <span className="inline-flex items-center gap-1">
                <Clock className="w-4 h-4" /> {guide.readTime}
              </span>
              <span className="inline-flex items-center gap-1">
                <Calendar className="w-4 h-4" /> Atualizado em {guide.updatedAt}
              </span>
            </div>

            <div className="flex flex-wrap gap-2">
              {guide.tags.map((tag) => (
                <span key={tag} className="text-xs bg-slate-100 text-slate-700 px-2 py-1 rounded-full">
                  {tag}
                </span>
              ))}
            </div>
          </header>

          <section className="space-y-8">
            {guide.sections.map((section) => (
              <div key={section.heading}>
                <h2 className="text-2xl font-bold text-slate-900 mb-3">{section.heading}</h2>
                <div className="space-y-4 text-slate-700 leading-relaxed">
                  {section.paragraphs.map((paragraph, idx) => (
                    <p key={idx}>{paragraph}</p>
                  ))}
                </div>
              </div>
            ))}
          </section>

          <section className="mt-10 bg-purple-50 border border-purple-100 rounded-xl p-6">
            <h2 className="text-xl font-bold text-slate-900 mb-3">Checklist rápido antes de enviar o currículo</h2>
            <ul className="list-disc list-inside space-y-2 text-slate-700">
              {guide.checklist.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>

          <section className="mt-10 bg-slate-50 border border-slate-200 rounded-xl p-6">
            <h2 className="text-xl font-bold text-slate-900 mb-2">Autoria e revisão</h2>
            <p className="text-sm text-slate-700 leading-relaxed">
              Este guia foi produzido pela equipe editorial do <strong>Currículo Rápido</strong>, com revisão baseada em
              práticas de recrutamento, triagem ATS e experiência de candidatos no mercado brasileiro.
            </p>
            <div className="mt-4 grid sm:grid-cols-2 gap-3 text-sm">
              <div className="bg-white border border-slate-200 rounded-lg p-3">
                <p className="font-semibold text-slate-900">Autor</p>
                <p className="text-slate-600">Equipe Editorial Currículo Rápido</p>
              </div>
              <div className="bg-white border border-slate-200 rounded-lg p-3">
                <p className="font-semibold text-slate-900">Última revisão</p>
                <p className="text-slate-600">{guide.updatedAt}</p>
              </div>
            </div>
            <p className="mt-4 text-xs text-slate-500">
              Política editorial e critérios de atualização: <Link to="/politica-editorial" className="text-purple-700 hover:underline">ver página completa</Link>.
            </p>
          </section>

          <section className="mt-10 pt-8 border-t border-slate-100">
            <h3 className="text-lg font-bold text-slate-900 mb-3">Próximos guias recomendados</h3>
            <div className="grid sm:grid-cols-2 gap-3">
              {guides
                .filter((g) => g.slug !== guide.slug)
                .slice(0, 4)
                .map((nextGuide) => (
                  <Link
                    key={nextGuide.slug}
                    to={`/guias/${nextGuide.slug}`}
                    className="text-sm text-purple-700 hover:text-purple-900 hover:underline"
                  >
                    {nextGuide.title}
                  </Link>
                ))}
            </div>
          </section>
        </article>

        <AdPlaceholder placement="guide" className="mt-8" />
      </main>

      <Footer t={t} />
    </div>
  );
};
