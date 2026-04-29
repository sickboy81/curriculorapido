import React from 'react';
import { Mail, MessageCircle } from 'lucide-react';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { SeoHead } from '../components/SeoHead';
import { useLanguage } from '../LanguageContext';

export const Contact = () => {
    const { t, language, setLanguage } = useLanguage();

    return (
        <div className="font-sans text-slate-900 bg-slate-50 min-h-screen flex flex-col">
            <SeoHead
                title="Contato | Currículo Rápido"
                description="Fale com o time do Currículo Rápido para enviar dúvidas, sugestões ou relatar problemas na plataforma."
            />
            <Header language={language} setLanguage={setLanguage} t={t} />

            <main className="flex-1 max-w-4xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-10">
                <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8 sm:p-12">
                    <div className="text-center mb-10">
                        <h1 className="text-3xl font-bold text-slate-900 mb-4">Entre em Contato</h1>
                        <p className="text-slate-600 max-w-xl mx-auto">
                            Tem alguma dúvida, sugestão ou encontrou algum problema? Fale conosco.
                            Estamos sempre trabalhando para melhorar o Currículo Rápido.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8 max-w-2xl mx-auto">
                        <a href="mailto:contato@curriculorapido.com.br" className="flex flex-col items-center p-8 bg-slate-50 rounded-2xl border border-slate-200 hover:border-purple-300 hover:bg-purple-50 transition-all group">
                            <div className="bg-white p-4 rounded-full shadow-sm mb-4 group-hover:scale-110 transition-transform">
                                <Mail className="w-8 h-8 text-purple-600" />
                            </div>
                            <h3 className="font-bold text-slate-900 mb-1">Email</h3>
                            <p className="text-slate-500 text-sm">contato@curriculorapido.com.br</p>
                        </a>

                        <div className="flex flex-col items-center p-8 bg-slate-50 rounded-2xl border border-slate-200 opacity-70">
                            <div className="bg-white p-4 rounded-full shadow-sm mb-4">
                                <MessageCircle className="w-8 h-8 text-slate-400" />
                            </div>
                            <h3 className="font-bold text-slate-900 mb-1">Redes Sociais</h3>
                            <p className="text-slate-500 text-sm">Em breve</p>
                        </div>
                    </div>
                </div>
            </main>

            <Footer t={t} />
        </div>
    );
};
