import React from 'react';
import { FileText, Shield, Heart, Target, Users, Award } from 'lucide-react';
import { useSEO } from '../../hooks/useSEO';

export const Sobre: React.FC = () => {
  useSEO({
    title: 'Sobre o Currículo Rápido | O Melhor Gerador de Currículo Grátis do Brasil',
    description: 'Conheça a história, missão e valores do Currículo Rápido. O melhor gerador de currículo grátis do Brasil, 100% gratuito, sem cadastro e totalmente privado.',
    canonical: 'https://curriculorapido.com.br/sobre',
    ogTitle: 'Sobre o Currículo Rápido | O Melhor Gerador de Currículo Grátis',
    ogDescription: 'Conheça a história, missão e valores do Currículo Rápido. O melhor gerador de currículo grátis do Brasil.',
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
          <h1 className="text-4xl font-bold text-slate-900">Sobre o Currículo Rápido</h1>
          <p className="text-xl text-slate-600 mt-2">
            O melhor gerador de currículo grátis do Brasil
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
              <h2 className="text-2xl font-bold text-slate-900">Nossa História</h2>
            </div>
            <p className="text-slate-700 leading-relaxed text-lg">
              O <strong>Currículo Rápido</strong> nasceu da necessidade de simplificar um processo que deveria ser simples: 
              criar um currículo profissional. Percebemos que muitas pessoas enfrentavam dificuldades para criar um 
              curriculum vitae de qualidade, seja pela falta de conhecimento em design, pela complexidade de ferramentas 
              pagas, ou pela insegurança sobre o que colocar no documento.
            </p>
            <p className="text-slate-700 leading-relaxed">
              Decidimos criar uma solução <strong>100% gratuita, sem cadastro, e totalmente privada</strong>, onde qualquer 
              pessoa pudesse criar um currículo profissional em minutos, usando modelos otimizados para sistemas ATS 
              (Applicant Tracking System) e recrutadores.
            </p>
          </section>

          {/* Missão */}
          <section className="space-y-4 pt-8 border-t border-slate-200">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Target className="w-6 h-6 text-blue-600" />
              </div>
              <h2 className="text-2xl font-bold text-slate-900">Nossa Missão</h2>
            </div>
            <p className="text-slate-700 leading-relaxed">
              Democratizar o acesso a ferramentas profissionais de criação de currículo, oferecendo uma solução gratuita 
              e de alta qualidade para todos os brasileiros, independente de sua situação profissional ou financeira.
            </p>
            <p className="text-slate-700 leading-relaxed">
              Acreditamos que <strong>cada pessoa merece ter acesso às melhores ferramentas para construir sua carreira</strong>, 
              e é por isso que nosso serviço é e sempre será completamente gratuito.
            </p>
          </section>

          {/* Valores */}
          <section className="space-y-4 pt-8 border-t border-slate-200">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <Heart className="w-6 h-6 text-green-600" />
              </div>
              <h2 className="text-2xl font-bold text-slate-900">Nossos Valores</h2>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="p-4 bg-slate-50 rounded-xl">
                <h3 className="font-bold text-slate-900 mb-2">Privacidade Absoluta</h3>
                <p className="text-slate-600 text-sm">
                  Seus dados pessoais nunca saem do seu navegador. Não armazenamos informações em servidores, 
                  garantindo total privacidade e segurança.
                </p>
              </div>
              <div className="p-4 bg-slate-50 rounded-xl">
                <h3 className="font-bold text-slate-900 mb-2">Gratuidade Total</h3>
                <p className="text-slate-600 text-sm">
                  Sem planos premium, sem marcas d'água, sem limitações. Todos os recursos estão disponíveis 
                  gratuitamente para todos os usuários.
                </p>
              </div>
              <div className="p-4 bg-slate-50 rounded-xl">
                <h3 className="font-bold text-slate-900 mb-2">Simplicidade</h3>
                <p className="text-slate-600 text-sm">
                  Interface intuitiva e fácil de usar. Não é necessário conhecimento técnico para criar um 
                  currículo profissional de qualidade.
                </p>
              </div>
              <div className="p-4 bg-slate-50 rounded-xl">
                <h3 className="font-bold text-slate-900 mb-2">Qualidade</h3>
                <p className="text-slate-600 text-sm">
                  Modelos profissionais otimizados para sistemas ATS, compatíveis com Gupy, Kenoby, Vagas.com 
                  e outras plataformas de recrutamento.
                </p>
              </div>
            </div>
          </section>

          {/* Diferenciais */}
          <section className="space-y-4 pt-8 border-t border-slate-200">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-orange-100 rounded-lg">
                <Award className="w-6 h-6 text-orange-600" />
              </div>
              <h2 className="text-2xl font-bold text-slate-900">O Que Nos Diferencia</h2>
            </div>
            <ul className="space-y-3 text-slate-700">
              <li className="flex items-start gap-3">
                <span className="text-purple-600 font-bold mt-1">✓</span>
                <span><strong>Sem cadastro:</strong> Crie seu currículo instantaneamente, sem precisar criar conta ou fornecer email.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-purple-600 font-bold mt-1">✓</span>
                <span><strong>Compatível com ATS:</strong> Nossos modelos são otimizados para passar nos filtros automáticos de recrutamento.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-purple-600 font-bold mt-1">✓</span>
                <span><strong>Múltiplos modelos:</strong> Escolha entre modelos Moderno, Clássico e Suíço, adaptados para diferentes perfis profissionais.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-purple-600 font-bold mt-1">✓</span>
                <span><strong>Download ilimitado:</strong> Baixe quantos PDFs quiser, quando quiser, sem restrições.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-purple-600 font-bold mt-1">✓</span>
                <span><strong>Funciona no celular:</strong> Interface totalmente responsiva, funcional em smartphones Android e iPhone.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-purple-600 font-bold mt-1">✓</span>
                <span><strong>Dicas profissionais:</strong> Artigos e dicas sobre carreira, currículo e processos seletivos para ajudar na sua jornada.</span>
              </li>
            </ul>
          </section>

          {/* Para Quem É */}
          <section className="space-y-4 pt-8 border-t border-slate-200">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Users className="w-6 h-6 text-purple-600" />
              </div>
              <h2 className="text-2xl font-bold text-slate-900">Para Quem É Ideal</h2>
            </div>
            <p className="text-slate-700 leading-relaxed">
              O Currículo Rápido é ideal para qualquer pessoa que precise de um currículo profissional, seja:
            </p>
            <div className="grid md:grid-cols-2 gap-3 mt-4">
              <div className="flex items-center gap-2">
                <span className="text-purple-600">•</span>
                <span className="text-slate-700">Quem busca o <strong>primeiro emprego</strong></span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-purple-600">•</span>
                <span className="text-slate-700">Candidatos a <strong>jovem aprendiz</strong></span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-purple-600">•</span>
                <span className="text-slate-700">Estudantes buscando <strong>estágio</strong></span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-purple-600">•</span>
                <span className="text-slate-700">Profissionais em <strong>recolocação</strong></span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-purple-600">•</span>
                <span className="text-slate-700">Quem busca <strong>mudança de carreira</strong></span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-purple-600">•</span>
                <span className="text-slate-700">Profissionais experientes</span>
              </div>
            </div>
          </section>

          {/* Compromisso */}
          <section className="space-y-4 pt-8 border-t border-slate-200">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-red-100 rounded-lg">
                <Shield className="w-6 h-6 text-red-600" />
              </div>
              <h2 className="text-2xl font-bold text-slate-900">Nosso Compromisso</h2>
            </div>
            <p className="text-slate-700 leading-relaxed">
              Estamos comprometidos em manter o Currículo Rápido <strong>sempre gratuito e acessível</strong>. 
              Não vendemos seus dados, não pedimos informações pessoais desnecessárias, e respeitamos totalmente 
              sua privacidade.
            </p>
            <p className="text-slate-700 leading-relaxed">
              Nosso objetivo é ajudar o máximo de pessoas possível a criar currículos profissionais que abram 
              portas no mercado de trabalho brasileiro.
            </p>
          </section>

          {/* CTA */}
          <section className="pt-8 border-t border-slate-200">
            <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl p-8 text-white text-center">
              <h2 className="text-2xl font-bold mb-3">Pronto para Criar Seu Currículo?</h2>
              <p className="mb-6 opacity-90">
                Comece agora mesmo, é rápido, fácil e 100% gratuito!
              </p>
              <a 
                href="/"
                className="inline-block px-8 py-3 bg-white text-purple-600 font-semibold rounded-lg hover:bg-purple-50 transition-colors shadow-lg"
              >
                Criar Meu Currículo Agora
              </a>
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


