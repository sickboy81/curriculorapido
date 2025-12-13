import React, { useState, useEffect } from 'react';
import { BookOpen, ChevronRight, Clock, Star } from 'lucide-react';
import { useLanguage } from '../LanguageContext';

export const CareerBlog: React.FC = () => {
  const { t, language } = useLanguage();
  const [expandedArticle, setExpandedArticle] = useState<number | null>(null);

  const articles = [
    {
      id: 1,
      title: t('blog.art1Title'),
      preview: t('blog.art1Preview'),
      content: t('blog.art1Content'),
      readTime: "5 min",
      tags: ["Dicas", "Iniciante"],
      datePublished: "2025-01-15",
      dateModified: "2025-01-15"
    },
    {
      id: 2,
      title: t('blog.art2Title'),
      preview: t('blog.art2Preview'),
      content: t('blog.art2Content'),
      readTime: "3 min",
      tags: ["Objetivo", "Estratégia"],
      datePublished: "2025-01-10",
      dateModified: "2025-01-10"
    },
    {
      id: 3,
      title: t('blog.art3Title'),
      preview: t('blog.art3Preview'),
      content: t('blog.art3Content'),
      readTime: "7 min",
      tags: ["Soft Skills", "Tendências"],
      datePublished: "2025-01-05",
      dateModified: "2025-01-05"
    }
  ];

  // Generate Article schema for SEO
  useEffect(() => {
    const articleSchemas = articles.map((article, index) => ({
      "@context": "https://schema.org",
      "@type": "Article",
      "headline": article.title,
      "description": article.preview,
      "datePublished": article.datePublished,
      "dateModified": article.dateModified,
      "author": {
        "@type": "Organization",
        "name": "Currículo Rápido"
      },
      "publisher": {
        "@type": "Organization",
        "name": "Currículo Rápido",
        "logo": {
          "@type": "ImageObject",
          "url": "https://curriculorapido.com.br/pwa-icon.svg"
        }
      },
      "mainEntityOfPage": {
        "@type": "WebPage",
        "@id": `https://curriculorapido.com.br/#article-${article.id}`
      },
      "articleSection": article.tags.join(", "),
      "keywords": article.tags.join(", "),
      "inLanguage": language === 'pt' ? 'pt-BR' : language === 'en' ? 'en-US' : 'es-ES',
      "timeRequired": `PT${article.readTime.replace(' min', 'M')}`
    }));

    // Remove existing article schema scripts
    const existingScripts = document.querySelectorAll('script[data-article-schema]');
    existingScripts.forEach(script => script.remove());

    // Add new schema scripts
    articleSchemas.forEach((schema, index) => {
      const script = document.createElement('script');
      script.type = 'application/ld+json';
      script.setAttribute('data-article-schema', `article-${articles[index].id}`);
      script.textContent = JSON.stringify(schema);
      document.head.appendChild(script);
    });

    return () => {
      // Cleanup on unmount
      const scripts = document.querySelectorAll('script[data-article-schema]');
      scripts.forEach(script => script.remove());
    };
  }, [articles, language]);

  return (
    <section className="py-16 bg-slate-50 border-t border-slate-200 no-print" id="dicas-carreira" aria-label={t('blog.sectionTitle')}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-slate-900 mb-4 flex items-center justify-center gap-2">
            <BookOpen className="w-8 h-8 text-purple-600" />
            {t('blog.sectionTitle')}
          </h2>
          <p className="text-slate-600 max-w-2xl mx-auto mb-4">
            {t('blog.sectionSubtitle')}
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {articles.map((article, index) => (
            <article 
              key={article.id}
              itemScope
              itemType="https://schema.org/Article"
              className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden hover:shadow-md transition-all flex flex-col h-full"
            >
              <div className="p-6 flex-1">
                <div className="flex gap-2 mb-4">
                  {article.tags.map(tag => (
                    <span key={tag} className="text-[10px] font-bold uppercase tracking-wider bg-purple-50 text-purple-700 px-2 py-1 rounded-full">
                      {tag}
                    </span>
                  ))}
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3 leading-tight" itemProp="headline">
                  {article.title}
                </h3>
                <div className="text-slate-600 text-sm leading-relaxed mb-4" itemProp="description">
                  {expandedArticle === index ? (
                    <div dangerouslySetInnerHTML={{ __html: article.content }} className="space-y-4 animate-in fade-in duration-300" itemProp="articleBody" />
                  ) : (
                    <p>{article.preview}</p>
                  )}
                </div>
              </div>
              
              <div className="p-6 pt-0 mt-auto border-t border-slate-50 flex items-center justify-between">
                <div className="flex items-center gap-1 text-xs text-slate-400">
                   <Clock className="w-3.5 h-3.5" />
                   {article.readTime}
                </div>
                <button 
                  onClick={() => setExpandedArticle(expandedArticle === index ? null : index)}
                  className="text-sm font-bold text-purple-600 hover:text-purple-800 flex items-center gap-1 transition-colors"
                >
                  {expandedArticle === index ? t('blog.readLess') : t('blog.readMore')}
                  <ChevronRight className={`w-4 h-4 transition-transform ${expandedArticle === index ? 'rotate-90' : ''}`} />
                </button>
              </div>
            </article>
          ))}
        </div>
        
      </div>
    </section>
  );
};