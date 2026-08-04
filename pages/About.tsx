import React from 'react';
import { Info, Heart, Award, Users } from 'lucide-react';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { SeoHead } from '../components/SeoHead';
import { useLanguage } from '../LanguageContext';

export const About = () => {
    const { t, language, setLanguage } = useLanguage();

    return (
        <div className="font-sans text-slate-900 bg-slate-50 min-h-screen flex flex-col">
            <SeoHead
                title="Sobre o Currículo Rápido | Missão e Propósito"
                description="Conheça a missão do Currículo Rápido e por que criamos uma ferramenta gratuita para montar currículo profissional em PDF."
            />
            <Header language={language} setLanguage={setLanguage} t={t} />

            <main className="flex-1 max-w-4xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-10">
                <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
                    <div className="bg-gradient-to-r from-purple-600 to-indigo-700 px-8 py-16 text-center">
                        <h1 className="text-4xl font-extrabold text-white mb-4">Sobre o Currículo Rápido</h1>
                        <p className="text-purple-100 text-lg max-w-2xl mx-auto">
                            Nossa missão é democratizar o acesso a oportunidades profissionais através de ferramentas de qualidade e gratuitas.
                        </p>
                    </div>

                    <div className="p-8 sm:p-12 space-y-12">
                        {/* Section 1 */}
                        <div className="grid md:grid-cols-2 gap-12 items-center">
                            <div>
                                <h2 className="text-2xl font-bold text-slate-900 mb-4">Por que criamos esta ferramenta?</h2>
                                <p className="text-slate-600 leading-relaxed mb-4">
                                    Percebemos que muitos candidatos perdem oportunidades não por falta de qualificação, mas por não terem um currículo bem formatado.
                                    Ferramentas existentes muitas vezes cobram ou exigem cadastros complexos.
                                </p>
                                <p className="text-slate-600 leading-relaxed">
                                    O <strong>Currículo Rápido</strong> nasceu para ser a solução: simples, direta, profissional e 100% gratuita.
                                </p>
                            </div>
                            <div className="bg-purple-50 p-6 rounded-2xl border border-purple-100 flex justify-center">
                                <Award className="w-32 h-32 text-purple-600 opacity-80" />
                            </div>
                        </div>

                        {/* Section 2 */}
                        <div className="grid md:grid-cols-3 gap-6">
                            <div className="p-6 bg-slate-50 rounded-xl border border-slate-100">
                                <Users className="w-8 h-8 text-blue-600 mb-4" />
                                <h3 className="font-bold text-slate-900 mb-2">Para Todos</h3>
                                <p className="text-sm text-slate-600">Desde o primeiro emprego até cargos executivos. Nossos modelos se adaptam.</p>
                            </div>
                            <div className="p-6 bg-slate-50 rounded-xl border border-slate-100">
                                <Shield className="w-8 h-8 text-green-600 mb-4" /> {/* Shield is undefined, careful */}
                                <h3 className="font-bold text-slate-900 mb-2">Seguro</h3>
                                <p className="text-sm text-slate-600">Sem banco de dados. Seus dados ficam apenas no seu dispositivo.</p>
                            </div>
                            <div className="p-6 bg-slate-50 rounded-xl border border-slate-100">
                                <Heart className="w-8 h-8 text-red-600 mb-4" />
                                <h3 className="font-bold text-slate-900 mb-2">Gratuito</h3>
                                <p className="text-sm text-slate-600">Sem taxas escondidas. Você baixa o PDF final sem pagar nada.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            <Footer t={t} />
        </div>
    );
};

// Need to import Shield locally since I used it above
import { Shield } from 'lucide-react';
