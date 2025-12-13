import React, { useEffect } from 'react';
import { Lightbulb, Target, AlertTriangle, FileCheck, BrainCircuit, Search, CheckCircle } from 'lucide-react';
import { useLanguage } from '../LanguageContext';

export const ResumeTips: React.FC = () => {
  const { t, language } = useLanguage();

  const tips = [
    {
      icon: Target,
      color: "text-blue-600",
      bg: "bg-blue-50",
      title: t('tips.t1'),
      content: t('tips.c1')
    },
    {
      icon: Search,
      color: "text-purple-600",
      bg: "bg-purple-50",
      title: t('tips.t2'),
      content: t('tips.c2')
    },
    {
      icon: FileCheck,
      color: "text-emerald-600",
      bg: "bg-emerald-50",
      title: t('tips.t3'),
      content: t('tips.c3')
    },
    {
      icon: AlertTriangle,
      color: "text-orange-600",
      bg: "bg-orange-50",
      title: t('tips.t4'),
      content: t('tips.c4')
    },
    {
      icon: BrainCircuit,
      color: "text-pink-600",
      bg: "bg-pink-50",
      title: t('tips.t5'),
      content: t('tips.c5')
    },
    {
      icon: Lightbulb,
      color: "text-amber-600",
      bg: "bg-amber-50",
      title: t('tips.t6'),
      content: t('tips.c6')
    }
  ];

  // Generate ItemList schema for SEO
  useEffect(() => {
    const itemListSchema = {
      "@context": "https://schema.org",
      "@type": "ItemList",
      "name": t('tips.title'),
      "description": t('tips.subtitle'),
      "itemListElement": tips.map((tip, index) => ({
        "@type": "ListItem",
        "position": index + 1,
        "name": tip.title,
        "description": tip.content
      })),
      "inLanguage": language === 'pt' ? 'pt-BR' : language === 'en' ? 'en-US' : 'es-ES'
    };

    // Remove existing tips schema script
    const existingScript = document.querySelector('script[data-tips-schema]');
    if (existingScript) {
      existingScript.remove();
    }

    // Add new schema script
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.setAttribute('data-tips-schema', 'true');
    script.textContent = JSON.stringify(itemListSchema);
    document.head.appendChild(script);

    return () => {
      // Cleanup on unmount
      const script = document.querySelector('script[data-tips-schema]');
      if (script) script.remove();
    };
  }, [tips, language, t]);

  return (
    <section className="py-16 bg-white no-print border-t border-slate-100" id="dicas-curriculo" aria-label={t('tips.title')}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-4">
            {t('tips.title')}
          </h2>
          <p className="text-slate-600 max-w-2xl mx-auto mb-4">
            {t('tips.subtitle')}
          </p>
          <p className="text-sm text-slate-500 max-w-3xl mx-auto">
            Essas dicas foram elaboradas por <strong>especialistas em recrutamento</strong> e são essenciais para criar um 
            <strong>currículo que se destaca</strong> no mercado brasileiro. Aplique essas práticas ao usar nosso 
            <strong>gerador de currículo online</strong> para aumentar suas chances de conseguir uma <strong>entrevista de emprego</strong>.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8" itemScope itemType="https://schema.org/ItemList">
          {tips.map((tip, index) => (
            <div 
              key={index}
              itemScope
              itemType="https://schema.org/ListItem"
              className="bg-slate-50 rounded-2xl p-6 border border-slate-100 hover:shadow-lg hover:border-purple-100 transition-all duration-300 group"
            >
              <div className={`w-12 h-12 ${tip.bg} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                <tip.icon className={`w-6 h-6 ${tip.color}`} />
              </div>
              <h3 className="text-lg font-bold text-slate-800 mb-2 group-hover:text-purple-700 transition-colors" itemProp="name">
                {tip.title}
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed" itemProp="description">
                {tip.content}
              </p>
            </div>
          ))}
        </div>
        
        {/* Additional Tips Section */}
        <div className="mt-12 bg-gradient-to-br from-purple-50 to-blue-50 rounded-2xl p-8 border border-purple-200">
          <h3 className="text-2xl font-bold text-slate-900 mb-6 text-center">Erros Comuns que Eliminam Candidatos</h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white rounded-lg p-5 border border-slate-200">
              <h4 className="font-bold text-slate-800 mb-3 flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-orange-600" />
                Erros de Formatação
              </h4>
              <ul className="text-sm text-slate-600 space-y-2 list-disc list-inside">
                <li>Fontes muito pequenas ou difíceis de ler</li>
                <li>Excesso de cores ou elementos decorativos</li>
                <li>Layout desorganizado e difícil de escanear</li>
                <li>Informações importantes escondidas</li>
                <li>Margens inadequadas para impressão</li>
              </ul>
            </div>
            <div className="bg-white rounded-lg p-5 border border-slate-200">
              <h4 className="font-bold text-slate-800 mb-3 flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-orange-600" />
                Erros de Conteúdo
              </h4>
              <ul className="text-sm text-slate-600 space-y-2 list-disc list-inside">
                <li>Erros de ortografia e gramática</li>
                <li>Informações desatualizadas ou inconsistentes</li>
                <li>Falta de palavras-chave relevantes</li>
                <li>Objetivo genérico e sem personalização</li>
                <li>Excesso de informações irrelevantes</li>
              </ul>
            </div>
            <div className="bg-white rounded-lg p-5 border border-slate-200">
              <h4 className="font-bold text-slate-800 mb-3 flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-orange-600" />
                Problemas Técnicos
              </h4>
              <ul className="text-sm text-slate-600 space-y-2 list-disc list-inside">
                <li>Arquivo em formato Word (.doc) em vez de PDF</li>
                <li>Arquivo muito pesado ou corrompido</li>
                <li>Formatação quebrada em sistemas ATS</li>
                <li>Falta de compatibilidade com leitores de tela</li>
                <li>Links quebrados ou emails inválidos</li>
              </ul>
            </div>
            <div className="bg-white rounded-lg p-5 border border-slate-200">
              <h4 className="font-bold text-slate-800 mb-3 flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-emerald-600" />
                Como Evitar Esses Erros
              </h4>
              <ul className="text-sm text-slate-600 space-y-2 list-disc list-inside">
                <li>Use nosso <strong>gerador de currículo</strong> que já resolve formatação</li>
                <li>Revise cuidadosamente antes de enviar</li>
                <li>Sempre salve em <strong>PDF</strong> para manter formatação</li>
                <li>Teste o arquivo antes de enviar</li>
                <li>Peça feedback de amigos ou mentores</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};