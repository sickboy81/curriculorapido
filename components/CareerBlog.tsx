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
    },
    {
      id: 4,
      title: t('blog.art4Title'),
      preview: t('blog.art4Preview'),
      content: t('blog.art4Content'),
      readTime: "4 min",
      tags: ["ATS", "Otimização"],
      datePublished: "2025-01-20",
      dateModified: "2025-01-20"
    },
    {
      id: 5,
      title: t('blog.art5Title'),
      preview: t('blog.art5Preview'),
      content: t('blog.art5Content'),
      readTime: "6 min",
      tags: ["Experiência", "Resultados"],
      datePublished: "2025-01-18",
      dateModified: "2025-01-18"
    },
    {
      id: 6,
      title: t('blog.art6Title'),
      preview: t('blog.art6Preview'),
      content: t('blog.art6Content'),
      readTime: "5 min",
      tags: ["Primeiro Emprego", "Dicas"],
      datePublished: "2025-01-12",
      dateModified: "2025-01-12"
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

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {articles.map((article, index) => (
            <article 
              key={article.id}
              itemScope
              itemType="https://schema.org/Article"
              className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden hover:shadow-lg hover:border-purple-200 transition-all duration-300 flex flex-col h-full group"
            >
              <div className="p-6 flex-1 flex flex-col">
                <div className="flex flex-wrap gap-2 mb-4">
                  {article.tags.map(tag => (
                    <span key={tag} className="text-[10px] font-bold uppercase tracking-wider bg-gradient-to-r from-purple-50 to-blue-50 text-purple-700 px-3 py-1 rounded-full border border-purple-100">
                      {tag}
                    </span>
                  ))}
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-3 leading-tight group-hover:text-purple-700 transition-colors" itemProp="headline">
                  {article.title}
                </h3>
                <div className="text-slate-600 text-sm leading-relaxed mb-4 flex-1" itemProp="description">
                  {expandedArticle === index ? (
                    <div dangerouslySetInnerHTML={{ __html: article.content }} className="space-y-4 animate-in fade-in duration-300 prose prose-sm max-w-none" itemProp="articleBody" />
                  ) : (
                    <p className="line-clamp-3">{article.preview}</p>
                  )}
                </div>
              </div>
              
              <div className="px-6 pb-6 pt-0 mt-auto border-t border-slate-100 bg-slate-50/50 flex items-center justify-between">
                <div className="flex items-center gap-1.5 text-xs text-slate-500">
                   <Clock className="w-4 h-4 text-purple-500" />
                   <span className="font-medium">{article.readTime}</span>
                </div>
                <button 
                  onClick={() => setExpandedArticle(expandedArticle === index ? null : index)}
                  className="text-sm font-semibold text-purple-600 hover:text-purple-800 flex items-center gap-1.5 transition-all hover:gap-2 group/btn"
                >
                  <span>{expandedArticle === index ? t('blog.readLess') : t('blog.readMore')}</span>
                  <ChevronRight className={`w-4 h-4 transition-transform duration-300 ${expandedArticle === index ? 'rotate-90' : 'group-hover/btn:translate-x-0.5'}`} />
                </button>
              </div>
            </article>
          ))}
        </div>
        
      </div>
    </section>
  );
};