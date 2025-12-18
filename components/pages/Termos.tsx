import React from 'react';
import { FileText, Scale, Shield, AlertCircle, Mail, Home } from 'lucide-react';
import { useSEO } from '../../hooks/useSEO';

export const Termos: React.FC = () => {
  useSEO({
    title: 'Termos de Uso | Currículo Rápido - Condições de Uso',
    description: 'Termos de Uso do Currículo Rápido. Leia as condições de uso do melhor gerador de currículo grátis do Brasil. Serviço 100% gratuito e sem cadastro.',
    canonical: 'https://curriculorapido.com.br/termos',
    ogTitle: 'Termos de Uso | Currículo Rápido - Condições de Uso',
    ogDescription: 'Termos de Uso do Currículo Rápido. Serviço 100% gratuito e sem cadastro.',
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
          <h1 className="text-4xl font-bold text-slate-900">Termos de Uso</h1>
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
                <FileText className="w-6 h-6 text-purple-600" />
              </div>
              <h2 className="text-2xl font-bold text-slate-900">1. Aceitação dos Termos</h2>
            </div>
            <p className="text-slate-700 leading-relaxed">
              Ao acessar e utilizar o <strong>Currículo Rápido</strong>, você aceita e concorda em estar vinculado a estes 
              Termos de Uso. Se você não concorda com alguma parte destes termos, não deve utilizar nosso serviço.
            </p>
            <p className="text-slate-700 leading-relaxed">
              Estes termos constituem um acordo legal entre você e o Currículo Rápido. Recomendamos que você leia estes 
              termos cuidadosamente antes de usar nosso serviço.
            </p>
          </section>

          {/* Descrição do Serviço */}
          <section className="space-y-4 pt-8 border-t border-slate-200">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Shield className="w-6 h-6 text-blue-600" />
              </div>
              <h2 className="text-2xl font-bold text-slate-900">2. Descrição do Serviço</h2>
            </div>
            <p className="text-slate-700 leading-relaxed">
              O <strong>Currículo Rápido</strong> é uma ferramenta online gratuita que permite aos usuários criar, editar 
              e exportar currículos profissionais em formato PDF. Nossos serviços incluem:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-slate-700">
              <li>Editor de currículo online com múltiplos modelos</li>
              <li>Exportação de currículos em formato PDF</li>
              <li>Armazenamento local de dados no navegador do usuário</li>
              <li>Dicas e artigos sobre carreira e processo seletivo</li>
              <li>Ferramentas de verificação ATS (Applicant Tracking System)</li>
            </ul>
            <p className="text-slate-700 leading-relaxed mt-3">
              <strong>O uso do Currículo Rápido é 100% gratuito.</strong> Você tem o direito irrevogável de usar os 
              currículos gerados para candidaturas de emprego, processos seletivos, LinkedIn e qualquer outro fim profissional 
              ou pessoal.
            </p>
          </section>

          {/* Uso Aceitável */}
          <section className="space-y-4 pt-8 border-t border-slate-200">
            <h2 className="text-2xl font-bold text-slate-900">3. Uso Aceitável</h2>
            <p className="text-slate-700 leading-relaxed">
              Ao usar o Currículo Rápido, você concorda em:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-slate-700">
              <li>Fornecer informações precisas e verdadeiras ao criar seu currículo</li>
              <li>Usar o serviço apenas para fins legais e legítimos</li>
              <li>Não tentar acessar áreas restritas do sistema ou interferir no funcionamento do site</li>
              <li>Não usar o serviço para atividades fraudulentas, enganosas ou ilegais</li>
              <li>Não tentar copiar, modificar ou criar obras derivadas do código-fonte do site</li>
              <li>Respeitar os direitos de propriedade intelectual do Currículo Rápido e de terceiros</li>
            </ul>
            <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 mt-4">
              <div className="flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-yellow-600 shrink-0 mt-0.5" />
                <p className="text-sm text-yellow-800">
                  <strong>Uso Proibido:</strong> É estritamente proibido usar o serviço para criar currículos falsos, 
                  enganosos ou que contenham informações fraudulentas destinadas a enganar empregadores ou recrutadores.
                </p>
              </div>
            </div>
          </section>

          {/* Propriedade Intelectual */}
          <section className="space-y-4 pt-8 border-t border-slate-200">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <Scale className="w-6 h-6 text-green-600" />
              </div>
              <h2 className="text-2xl font-bold text-slate-900">4. Propriedade Intelectual</h2>
            </div>

            <h3 className="text-lg font-semibold text-slate-900 mt-4">4.1. Conteúdo do Usuário</h3>
            <p className="text-slate-700 leading-relaxed">
              Você mantém todos os direitos sobre o conteúdo que criar usando o Currículo Rápido, incluindo textos, 
              informações pessoais e outros dados inseridos no gerador. Você é o único responsável pelo conteúdo que 
              cria e garante que possui todos os direitos necessários para usar esse conteúdo.
            </p>

            <h3 className="text-lg font-semibold text-slate-900 mt-6">4.2. Propriedade do Site</h3>
            <p className="text-slate-700 leading-relaxed">
              O site, seus recursos, modelos de currículo, design, código-fonte, logotipos, marcas e outros elementos 
              são de propriedade do Currículo Rápido ou de seus licenciadores e estão protegidos por leis de propriedade 
              intelectual, incluindo direitos autorais, marcas registradas e outras leis aplicáveis.
            </p>
            <p className="text-slate-700 leading-relaxed mt-3">
              Você não pode copiar, modificar, distribuir, vender ou criar obras derivadas de qualquer parte do site sem 
              autorização prévia e por escrito do Currículo Rápido.
            </p>
          </section>

          {/* Licença de Uso */}
          <section className="space-y-4 pt-8 border-t border-slate-200">
            <h2 className="text-2xl font-bold text-slate-900">5. Licença de Uso</h2>
            <p className="text-slate-700 leading-relaxed">
              O Currículo Rápido concede a você uma licença limitada, não exclusiva, não transferível e revogável para 
              usar o serviço, desde que você concorde e cumpra estes Termos de Uso. Esta licença permite que você:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-slate-700">
              <li>Acesse e use o gerador de currículo para fins pessoais e profissionais</li>
              <li>Baixe e imprima os currículos gerados em PDF</li>
              <li>Use os currículos gerados para candidaturas de emprego, processos seletivos e fins profissionais</li>
            </ul>
          </section>

          {/* Limitação de Responsabilidade */}
          <section className="space-y-4 pt-8 border-t border-slate-200">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-red-100 rounded-lg">
                <AlertCircle className="w-6 h-6 text-red-600" />
              </div>
              <h2 className="text-2xl font-bold text-slate-900">6. Limitação de Responsabilidade</h2>
            </div>
            <p className="text-slate-700 leading-relaxed">
              O Currículo Rápido é fornecido "como está" e "conforme disponível". Não garantimos que o serviço:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-slate-700">
              <li>Estará sempre disponível ou livre de erros</li>
              <li>Atenderá a todos os seus requisitos ou expectativas</li>
              <li>Garantirá emprego ou sucesso em processos seletivos</li>
              <li>Será compatível com todos os navegadores ou dispositivos</li>
            </ul>
            <p className="text-slate-700 leading-relaxed mt-3">
              Em nenhuma circunstância o Currículo Rápido será responsável por:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-slate-700">
              <li>Danos diretos, indiretos, incidentais, especiais ou consequenciais resultantes do uso ou impossibilidade 
              de uso do serviço</li>
              <li>Perda de dados ou informações do usuário</li>
              <li>Perda de oportunidades de emprego ou outros prejuízos profissionais</li>
              <li>Decisões tomadas por empregadores ou recrutadores baseadas em currículos criados usando nosso serviço</li>
            </ul>
          </section>

          {/* Isenção de Garantias */}
          <section className="space-y-4 pt-8 border-t border-slate-200">
            <h2 className="text-2xl font-bold text-slate-900">7. Isenção de Garantias</h2>
            <p className="text-slate-700 leading-relaxed">
              O serviço é fornecido sem garantias de qualquer tipo, expressas ou implícitas, incluindo, mas não limitado a:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-slate-700">
              <li>Garantias de comercialização ou adequação a um propósito específico</li>
              <li>Garantias de que o serviço será ininterrupto, seguro ou livre de erros</li>
              <li>Garantias sobre a precisão, confiabilidade ou qualidade do serviço</li>
            </ul>
          </section>

          {/* Indenização */}
          <section className="space-y-4 pt-8 border-t border-slate-200">
            <h2 className="text-2xl font-bold text-slate-900">8. Indenização</h2>
            <p className="text-slate-700 leading-relaxed">
              Você concorda em indenizar, defender e isentar o Currículo Rápido, seus funcionários, diretores, agentes e 
              licenciadores de quaisquer reclamações, danos, obrigações, perdas, responsabilidades, custos ou dívidas, e 
              despesas (incluindo honorários advocatícios) decorrentes de:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-slate-700">
              <li>Seu uso do serviço</li>
              <li>Conteúdo que você criar ou compartilhar usando o serviço</li>
              <li>Violação destes Termos de Uso</li>
              <li>Violacao de qualquer direito de terceiros, incluindo direitos de propriedade intelectual</li>
            </ul>
          </section>

          {/* Alterações no Serviço */}
          <section className="space-y-4 pt-8 border-t border-slate-200">
            <h2 className="text-2xl font-bold text-slate-900">9. Alterações no Serviço</h2>
            <p className="text-slate-700 leading-relaxed">
              Reservamos o direito de modificar, suspender ou descontinuar qualquer aspecto do serviço a qualquer momento, 
              com ou sem aviso prévio. Não seremos responsáveis perante você ou qualquer terceiro por qualquer modificação, 
              suspensão ou descontinuação do serviço.
            </p>
            <p className="text-slate-700 leading-relaxed mt-3">
              Embora nos esforcemos para manter o serviço sempre disponível e funcional, podemos realizar manutenções 
              periódicas que podem resultar em indisponibilidade temporária.
            </p>
          </section>

          {/* Alterações nos Termos */}
          <section className="space-y-4 pt-8 border-t border-slate-200">
            <h2 className="text-2xl font-bold text-slate-900">10. Alterações nestes Termos de Uso</h2>
            <p className="text-slate-700 leading-relaxed">
              Reservamos o direito de modificar estes Termos de Uso a qualquer momento. Alterações significativas serão 
              comunicadas através de aviso no site ou por outros meios apropriados.
            </p>
            <p className="text-slate-700 leading-relaxed mt-3">
              O uso continuado do serviço após a publicação de alterações constitui sua aceitação dos novos termos. 
              Se você não concordar com as alterações, deve cessar o uso do serviço.
            </p>
          </section>

          {/* Rescisão */}
          <section className="space-y-4 pt-8 border-t border-slate-200">
            <h2 className="text-2xl font-bold text-slate-900">11. Rescisão</h2>
            <p className="text-slate-700 leading-relaxed">
              Reservamos o direito de suspender ou encerrar seu acesso ao serviço imediatamente, sem aviso prévio, por 
              qualquer motivo, incluindo violação destes Termos de Uso.
            </p>
            <p className="text-slate-700 leading-relaxed mt-3">
              Você pode deixar de usar o serviço a qualquer momento. Ao parar de usar o serviço, você continua sendo 
              responsável por todas as ações realizadas durante o período de uso.
            </p>
          </section>

          {/* Lei Aplicável */}
          <section className="space-y-4 pt-8 border-t border-slate-200">
            <h2 className="text-2xl font-bold text-slate-900">12. Lei Aplicável e Jurisdição</h2>
            <p className="text-slate-700 leading-relaxed">
              Estes Termos de Uso são regidos pelas leis da República Federativa do Brasil. Qualquer disputa relacionada 
              a estes termos será submetida à jurisdição exclusiva dos tribunais competentes do Brasil.
            </p>
          </section>

          {/* Disposições Gerais */}
          <section className="space-y-4 pt-8 border-t border-slate-200">
            <h2 className="text-2xl font-bold text-slate-900">13. Disposições Gerais</h2>
            <p className="text-slate-700 leading-relaxed">
              Se qualquer disposição destes Termos de Uso for considerada inválida ou inexequível, as disposições 
              restantes permanecerão em pleno vigor e efeito.
            </p>
            <p className="text-slate-700 leading-relaxed mt-3">
              Estes Termos de Uso constituem o acordo completo entre você e o Currículo Rápido em relação ao uso do 
              serviço e substituem todos os acordos anteriores.
            </p>
          </section>

          {/* Contato */}
          <section className="space-y-4 pt-8 border-t border-slate-200">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-orange-100 rounded-lg">
                <Mail className="w-6 h-6 text-orange-600" />
              </div>
              <h2 className="text-2xl font-bold text-slate-900">14. Contato</h2>
            </div>
            <p className="text-slate-700 leading-relaxed">
              Se você tiver alguma dúvida sobre estes Termos de Uso, entre em contato conosco:
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


