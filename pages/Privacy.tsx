import React from 'react';
import { Shield } from 'lucide-react';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { SeoHead } from '../components/SeoHead';
import { useLanguage } from '../LanguageContext';

export const Privacy = () => {
    const { t, language, setLanguage } = useLanguage();

    return (
        <div className="font-sans text-slate-900 bg-slate-50 min-h-screen flex flex-col">
            <SeoHead
                title="Política de Privacidade | Currículo Rápido"
                description="Saiba como o Currículo Rápido trata privacidade, cookies, anúncios e dados processados localmente no navegador."
            />
            <Header language={language} setLanguage={setLanguage} t={t} />

            <main className="flex-1 max-w-4xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-10">
                <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8 sm:p-12">
                    <div className="flex items-center gap-4 mb-8 border-b border-slate-100 pb-6">
                        <div className="bg-purple-100 p-3 rounded-xl">
                            <Shield className="w-8 h-8 text-purple-600" />
                        </div>
                        <h1 className="text-3xl font-bold text-slate-900">Política de Privacidade</h1>
                    </div>

                    <div className="prose prose-slate max-w-none text-slate-600 leading-relaxed space-y-6">
                        <p>Última atualização: {new Date().toLocaleDateString()}</p>

                        <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded-r-lg">
                            <h3 className="text-lg font-bold text-blue-900 mb-2">Privacidade Absoluta (Client-Side)</h3>
                            <p className="text-blue-800">
                                Diferente de outros sites de currículo online, o <strong>Currículo Rápido</strong> opera com tecnologia <em>Client-Side</em>.
                                Nós <strong>não armazenamos</strong> seus dados pessoais em servidores, garantindo total segurança.
                                Todas as informações ficam salvas apenas no seu próprio navegador.
                            </p>
                        </div>

                        <h2>1. Visão Geral</h2>
                        <p>
                            A sua privacidade é nossa prioridade absoluta. O ponto mais importante que você deve saber é:
                            <strong> Nós não coletamos, armazenamos ou compartilhamos seus dados pessoais sensíveis (como CPF, endereço completo, telefone) em nossos servidores.</strong>
                        </p>

                        <h2>2. Coleta e Uso de Dados</h2>
                        <p>
                            Todo o processamento de dados para a criação do currículo ocorre localmente no seu dispositivo.
                            Quando você "salva" seu currículo, ele é salvo no <code>localStorage</code> do seu navegador.
                            Nós não temos acesso a esses dados.
                        </p>

                        <h2>3. Publicidade e Cookies</h2>
                        <p>
                            Utilizamos o Google AdSense para exibir anúncios em nosso site. O Google AdSense é um serviço de publicidade fornecido pelo Google Inc. que utiliza cookies e tecnologias similares para veicular anúncios relevantes aos usuários.
                        </p>
                        <p>
                            <strong>Como funcionam os anúncios:</strong>
                        </p>
                        <ul className="list-disc list-inside space-y-2 ml-4">
                            <li>O Google pode usar cookies para personalizar anúncios com base em suas visitas anteriores a este ou a outros sites</li>
                            <li>Os anúncios são exibidos de forma clara e identificada como publicidade</li>
                            <li>Não incentivamos cliques em anúncios e não manipulamos a experiência do usuário para aumentar cliques</li>
                            <li>Os anúncios são posicionados de forma a não interferir na navegação ou no conteúdo principal do site</li>
                        </ul>
                        <p>
                            <strong>Controle de publicidade:</strong> Você pode optar por não receber publicidade personalizada acessando as <a href="https://adssettings.google.com" target="_blank" rel="noopener noreferrer" className="text-purple-600 hover:underline">Configurações de anúncios do Google</a>. Você também pode desativar cookies de terceiros nas configurações do seu navegador.
                        </p>
                        <p>
                            <strong>Informações coletadas pelo AdSense:</strong> O Google pode coletar informações sobre sua visita ao nosso site e outros sites para fornecer anúncios relevantes. Essas informações são tratadas de acordo com a <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-purple-600 hover:underline">Política de Privacidade do Google</a>.
                        </p>

                        <h2>4. Analytics</h2>
                        <p>
                            Utilizamos Google Analytics para entender como nosso site é usado (páginas visitadas, tempo de permanência).
                            Esses dados são anônimos e não ligados à sua identidade pessoal do currículo.
                        </p>

                        <h2>5. Contato</h2>
                        <p>
                            Se tiver dúvidas sobre esta política, entre em contato através da nossa página de contato.
                        </p>
                    </div>
                </div>
            </main>

            <Footer t={t} />
        </div>
    );
};
