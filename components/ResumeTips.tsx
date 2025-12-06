import React from 'react';
import { Lightbulb, Target, AlertTriangle, FileCheck, BrainCircuit, Search } from 'lucide-react';
import { useLanguage } from '../LanguageContext';

export const ResumeTips: React.FC = () => {
  const { t } = useLanguage();

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

  return (
    <section className="py-16 bg-white no-print border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-4">
            {t('tips.title')}
          </h2>
          <p className="text-slate-600 max-w-2xl mx-auto">
            {t('tips.subtitle')}
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {tips.map((tip, index) => (
            <div 
              key={index}
              className="bg-slate-50 rounded-2xl p-6 border border-slate-100 hover:shadow-lg hover:border-purple-100 transition-all duration-300 group"
            >
              <div className={`w-12 h-12 ${tip.bg} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                <tip.icon className={`w-6 h-6 ${tip.color}`} />
              </div>
              <h3 className="text-lg font-bold text-slate-800 mb-2 group-hover:text-purple-700 transition-colors">
                {tip.title}
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                {tip.content}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};