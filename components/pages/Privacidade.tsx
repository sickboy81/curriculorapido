import React from 'react';
import { Shield, Lock, Eye, FileText, Mail, Home } from 'lucide-react';
import { useSEO } from '../../hooks/useSEO';

export const Privacidade: React.FC = () => {
  useSEO({
    title: 'Política de Privacidade | Currículo Rápido - LGPD',
    description: 'Política de Privacidade do Currículo Rápido. Conheça como protegemos seus dados pessoais. Seus dados ficam apenas no seu navegador, garantindo total privacidade e segurança.',
    canonical: 'https://curriculorapido.com.br/privacidade',
    ogTitle: 'Política de Privacidade | Currículo Rápido - LGPD',
    ogDescription: 'Política de Privacidade do Currículo Rápido. Seus dados ficam apenas no seu navegador, garantindo total privacidade.',
    ogImage: 'https://curriculorapido.com.br/preview-image.jpg'
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-purple-50">
      {/* Header */}
      <header className="bg-white border-b border-slate-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <a 
            href="/" 
            className="text-purple-600 hover:text-purple-700 font-semibold inline-flex items-center gap-2 mb-4"
          >
            ← Voltar para o Gerador de Currículo
          </a>
          <h1 className="text-4xl font-bold text-slate-900">Política de Privacidade</h1>
          <p className="text-slate-600 mt-2">
            Última atualização: {new Date().toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' })}
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-8 md:p-12 space-y-8">
          
          {/* Introdução */}
          <section className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Shield className="w-6 h-6 text-purple-600" />
              </div>
              <h2 className="text-2xl font-bold text-slate-900">1. Resumo da Privacidade</h2>
            </div>
            <p className="text-slate-700 leading-relaxed">
              A sua privacidade é nossa prioridade absoluta. O ponto mais importante que você deve saber é: 
              <strong className="text-slate-900"> Nós não armazenamos seus dados pessoais em nossos servidores de forma permanente.</strong>
            </p>
            <p className="text-slate-700 leading-relaxed">
              O <strong>Currículo Rápido</strong> opera com tecnologia <strong>Client-Side</strong>, o que significa que 
              todas as informações que você insere no gerador de currículo ficam armazenadas apenas no seu navegador, 
              no seu dispositivo. Diferente de outros sites de currículo online, nós não coletamos, armazenamos ou 
              acessamos seus dados pessoais em servidores externos.
            </p>
          </section>

          {/* Coleta de Dados */}
          <section className="space-y-4 pt-8 border-t border-slate-200">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Eye className="w-6 h-6 text-blue-600" />
              </div>
              <h2 className="text-2xl font-bold text-slate-900">2. Coleta e Uso de Dados</h2>
            </div>
            
            <h3 className="text-lg font-semibold text-slate-900 mt-4">2.1. Dados Armazenados Localmente</h3>
            <p className="text-slate-700 leading-relaxed">
              Este aplicativo funciona primariamente "client-side", ou seja, no seu navegador. Quando você preenche 
              informações no formulário de currículo (nome, email, telefone, experiência profissional, formação, etc.), 
              essas informações são armazenadas temporariamente no <strong>localStorage</strong> do seu navegador.
            </p>
            <ul className="list-disc pl-6 space-y-2 text-slate-700">
              <li>Os dados ficam <strong>apenas no seu dispositivo</strong></li>
              <li>Nós <strong>não temos acesso</strong> a essas informações</li>
              <li>Os dados <strong>nunca são enviados</strong> para nossos servidores</li>
              <li>Você pode <strong>limpar os dados</strong> a qualquer momento usando as ferramentas do seu navegador</li>
            </ul>

            <h3 className="text-lg font-semibold text-slate-900 mt-6">2.2. Dados Coletados para Funcionamento do Site</h3>
            <p className="text-slate-700 leading-relaxed">
              Para garantir o funcionamento adequado do site e melhorar a experiência do usuário, podemos coletar 
              informações técnicas que não identificam pessoalmente:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-slate-700">
              <li><strong>Informações de navegação:</strong> Páginas visitadas, tempo de permanência, cliques</li>
              <li><strong>Informações técnicas:</strong> Tipo de navegador, sistema operacional, resolução de tela</li>
              <li><strong>Endereço IP:</strong> Coletado automaticamente para fins de segurança e análise de tráfego</li>
            </ul>
          </section>

          {/* Cookies e Tecnologias */}
          <section className="space-y-4 pt-8 border-t border-slate-200">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <Lock className="w-6 h-6 text-green-600" />
              </div>
              <h2 className="text-2xl font-bold text-slate-900">3. Cookies e Tecnologias de Rastreamento</h2>
            </div>

            <h3 className="text-lg font-semibold text-slate-900 mt-4">3.1. Google Analytics</h3>
            <p className="text-slate-700 leading-relaxed">
              Utilizamos o <strong>Google Analytics</strong> para entender como os usuários interagem com o site. 
              O Google Analytics utiliza cookies para coletar informações de forma anônima sobre como você usa o site. 
              Essas informações incluem:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-slate-700">
              <li>Páginas visitadas e tempo de permanência</li>
              <li>Como você chegou ao site (referrer)</li>
              <li>Interações com elementos do site</li>
            </ul>
            <p className="text-slate-700 leading-relaxed mt-3">
              Você pode optar por não participar do Google Analytics instalando o 
              <a href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noopener noreferrer" className="text-purple-600 hover:text-purple-700 underline ml-1">
                complemento de desativação do navegador
              </a>.
            </p>

            <h3 className="text-lg font-semibold text-slate-900 mt-6">3.2. Google AdSense</h3>
            <p className="text-slate-700 leading-relaxed">
              Utilizamos o <strong>Google AdSense</strong> para exibir anúncios personalizados. O Google e seus parceiros 
              podem usar cookies para personalizar anúncios com base em suas visitas ao nosso site e a outros sites na web.
            </p>
            <p className="text-slate-700 leading-relaxed mt-3">
              Você pode gerenciar suas preferências de anúncios através das 
              <a href="https://adssettings.google.com" target="_blank" rel="noopener noreferrer" className="text-purple-600 hover:text-purple-700 underline ml-1">
                Configurações de anúncios do Google
              </a>.
            </p>

            <h3 className="text-lg font-semibold text-slate-900 mt-6">3.3. Cookies Técnicos</h3>
            <p className="text-slate-700 leading-relaxed">
              Utilizamos cookies técnicos essenciais para o funcionamento do site, como armazenar suas preferências 
              de template e dados do currículo em construção. Esses cookies são necessários e não podem ser desativados.
            </p>
          </section>

          {/* Compartilhamento de Dados */}
          <section className="space-y-4 pt-8 border-t border-slate-200">
            <h2 className="text-2xl font-bold text-slate-900">4. Compartilhamento de Dados</h2>
            <p className="text-slate-700 leading-relaxed">
              <strong>Não vendemos, alugamos ou compartilhamos seus dados pessoais</strong> com terceiros para fins 
              comerciais. Podemos compartilhar informações apenas nas seguintes situações:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-slate-700">
              <li><strong>Prestadores de serviços:</strong> Podemos compartilhar dados agregados e anonimizados com 
              serviços terceirizados (como Google Analytics e Google AdSense) para análise e publicidade</li>
              <li><strong>Requisitos legais:</strong> Se formos obrigados por lei, ordem judicial ou processo legal</li>
              <li><strong>Proteção de direitos:</strong> Para proteger nossos direitos, propriedade ou segurança, ou dos 
              nossos usuários</li>
            </ul>
          </section>

          {/* Segurança */}
          <section className="space-y-4 pt-8 border-t border-slate-200">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-red-100 rounded-lg">
                <Lock className="w-6 h-6 text-red-600" />
              </div>
              <h2 className="text-2xl font-bold text-slate-900">5. Segurança dos Dados</h2>
            </div>
            <p className="text-slate-700 leading-relaxed">
              Utilizamos conexões seguras (HTTPS) de ponta a ponta e não utilizamos cookies de rastreamento invasivos. 
              Implementamos medidas de segurança técnicas e organizacionais apropriadas para proteger seus dados contra 
              acesso não autorizado, alteração, divulgação ou destruição.
            </p>
            <p className="text-slate-700 leading-relaxed mt-3">
              No entanto, nenhum método de transmissão pela Internet ou método de armazenamento eletrônico é 100% seguro. 
              Embora nos esforcemos para usar meios comercialmente aceitáveis para proteger seus dados pessoais, não podemos 
              garantir segurança absoluta.
            </p>
          </section>

          {/* LGPD - Direitos do Usuário */}
          <section className="space-y-4 pt-8 border-t border-slate-200">
            <h2 className="text-2xl font-bold text-slate-900">6. Seus Direitos (LGPD)</h2>
            <p className="text-slate-700 leading-relaxed">
              De acordo com a Lei Geral de Proteção de Dados (LGPD - Lei 13.709/2018), você tem os seguintes direitos:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-slate-700">
              <li><strong>Confirmação e acesso:</strong> Solicitar confirmação sobre o tratamento de seus dados e acessar 
              os dados que temos sobre você</li>
              <li><strong>Correção:</strong> Solicitar correção de dados incompletos, inexatos ou desatualizados</li>
              <li><strong>Anonimização, bloqueio ou eliminação:</strong> Solicitar a eliminação de dados desnecessários, 
              excessivos ou tratados em desconformidade com a LGPD</li>
              <li><strong>Portabilidade:</strong> Solicitar a portabilidade de seus dados para outro fornecedor</li>
              <li><strong>Revogação do consentimento:</strong> Revogar seu consentimento a qualquer momento</li>
              <li><strong>Informação sobre compartilhamento:</strong> Solicitar informações sobre entidades públicas e 
              privadas com as quais compartilhamos dados</li>
            </ul>
            <p className="text-slate-700 leading-relaxed mt-3">
              Para exercer seus direitos, entre em contato conosco através do email: 
              <a href="mailto:contato@curriculorapido.com.br" className="text-purple-600 hover:text-purple-700 underline ml-1">
                contato@curriculorapido.com.br
              </a>
            </p>
          </section>

          {/* Retenção de Dados */}
          <section className="space-y-4 pt-8 border-t border-slate-200">
            <h2 className="text-2xl font-bold text-slate-900">7. Retenção de Dados</h2>
            <p className="text-slate-700 leading-relaxed">
              Como operamos principalmente no cliente (client-side), os dados do seu currículo são armazenados apenas no 
              seu navegador. Você pode excluir esses dados a qualquer momento usando as ferramentas do navegador ou 
              limpando o localStorage.
            </p>
            <p className="text-slate-700 leading-relaxed mt-3">
              Dados agregados e anonimizados coletados para fins analíticos podem ser retidos indefinidamente para fins 
              estatísticos e de melhoria do serviço.
            </p>
          </section>

          {/* Alterações na Política */}
          <section className="space-y-4 pt-8 border-t border-slate-200">
            <h2 className="text-2xl font-bold text-slate-900">8. Alterações nesta Política de Privacidade</h2>
            <p className="text-slate-700 leading-relaxed">
              Podemos atualizar esta Política de Privacidade periodicamente. Notificaremos você sobre quaisquer alterações 
              publicando a nova Política de Privacidade nesta página e atualizando a data de "Última atualização" no topo 
              desta política.
            </p>
            <p className="text-slate-700 leading-relaxed mt-3">
              É recomendável que você revise esta Política de Privacidade periodicamente para quaisquer alterações. 
              Alterações nesta política entram em vigor quando são publicadas nesta página.
            </p>
          </section>

          {/* Contato */}
          <section className="space-y-4 pt-8 border-t border-slate-200">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-orange-100 rounded-lg">
                <Mail className="w-6 h-6 text-orange-600" />
              </div>
              <h2 className="text-2xl font-bold text-slate-900">9. Contato</h2>
            </div>
            <p className="text-slate-700 leading-relaxed">
              Se você tiver alguma dúvida sobre esta Política de Privacidade, entre em contato conosco:
            </p>
            <div className="bg-slate-50 rounded-xl p-6 mt-4">
              <p className="text-slate-900 font-semibold mb-2">Currículo Rápido</p>
              <p className="text-slate-700">
                Email: <a href="mailto:contato@curriculorapido.com.br" className="text-purple-600 hover:text-purple-700 underline">
                  contato@curriculorapido.com.br
                </a>
              </p>
              <p className="text-slate-700 mt-2">
                Website: <a href="/contato" className="text-purple-600 hover:text-purple-700 underline">
                  /contato
                </a>
              </p>
            </div>
          </section>

        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 py-8 mt-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-slate-600">
            <div>
              <span className="font-semibold text-slate-900">Currículo Rápido</span> &copy; {new Date().getFullYear()}
            </div>
            <div className="flex items-center gap-6">
              <a href="/sobre" className="hover:text-slate-900 transition-colors">Sobre</a>
              <a href="/contato" className="hover:text-slate-900 transition-colors">Contato</a>
              <a href="/privacidade" className="hover:text-slate-900 transition-colors">Privacidade</a>
              <a href="/termos" className="hover:text-slate-900 transition-colors">Termos de Uso</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};


