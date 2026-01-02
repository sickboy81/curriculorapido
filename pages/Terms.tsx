import React from 'react';
import { FileText } from 'lucide-react';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { useLanguage } from '../LanguageContext';

export const Terms = () => {
    const { t, language, setLanguage } = useLanguage();

    return (
        <div className="font-sans text-slate-900 bg-slate-50 min-h-screen flex flex-col">
            <Header language={language} setLanguage={setLanguage} t={t} />

            <main className="flex-1 max-w-4xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-10">
                <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8 sm:p-12">
                    <div className="flex items-center gap-4 mb-8 border-b border-slate-100 pb-6">
                        <div className="bg-purple-100 p-3 rounded-xl">
                            <FileText className="w-8 h-8 text-purple-600" />
                        </div>
                        <h1 className="text-3xl font-bold text-slate-900">Termos de Uso</h1>
                    </div>

                    <div className="prose prose-slate max-w-none text-slate-600 leading-relaxed space-y-6">
                        <p>Última atualização: {new Date().toLocaleDateString()}</p>

                        <h2>1. Aceitação</h2>
                        <p>
                            Ao acessar e utilizar o <strong>Currículo Rápido</strong>, você aceita e concorda em estar vinculado a estes termos.
                            Se você não concordar com estes termos, não deverá utilizar o serviço.
                        </p>

                        <h2>2. Uso do Serviço</h2>
                        <p>
                            O serviço é fornecido "como está". Você tem o direito de usar os currículos gerados para fins pessoais e não comerciais
                            (candidaturas de emprego). Você não pode revender o serviço ou os modelos.
                        </p>

                        <h2>3. Propriedade Intelectual</h2>
                        <p>
                            O código-fonte, design, logotipo e modelos (templates) são propriedade do Currículo Rápido.
                            O conteúdo inserido por você (seus dados) é de sua propriedade exclusiva.
                        </p>

                        <h2>4. Limitação de Responsabilidade</h2>
                        <p>
                            Não nos responsabilizamos por eventuais perdas de dados armazenados no navegador, nem por resultados de processos seletivos.
                            Recomendamos que mantenha cópias de segurança dos seus arquivos PDF gerados.
                        </p>

                        <h2>5. Alterações</h2>
                        <p>
                            Reservamo-nos o direito de modificar estes termos a qualquer momento. O uso contínuo do serviço após as alterações constitui aceitação dos novos termos.
                        </p>
                    </div>
                </div>
            </main>

            <Footer t={t} />
        </div>
    );
};
