import React from 'react';
import { Shield, Lock, CheckCircle, FileText, ChevronDown, PenTool, Layout, Download, FileCheck2 } from 'lucide-react';
import { useLanguage } from '../LanguageContext';

export const SEOContent: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section className="bg-white border-t border-slate-200 py-16 lg:py-20 no-print" id="seo-content">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Main SEO Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl font-bold text-slate-900 mb-6">
            {t('seo.title')}
          </h2>
          <p className="text-lg text-slate-600 leading-relaxed" dangerouslySetInnerHTML={{ __html: t('seo.subtitle') }}>
          </p>
        </div>

        {/* Step by Step Section (Matches HowTo Schema) */}
        <div className="mb-20">
          <h3 className="text-2xl font-bold text-slate-900 mb-8 text-center">{t('seo.howToTitle')}</h3>
          <div className="grid md:grid-cols-4 gap-6">
            <div className="flex flex-col items-center text-center p-4">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center text-purple-600 mb-4">
                <PenTool className="w-8 h-8" />
              </div>
              <h4 className="font-bold text-slate-800 mb-2">1. {t('seo.step1Title')}</h4>
              <p className="text-sm text-slate-600">{t('seo.step1Text')}</p>
            </div>
            <div className="flex flex-col items-center text-center p-4">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 mb-4">
                <Layout className="w-8 h-8" />
              </div>
              <h4 className="font-bold text-slate-800 mb-2">2. {t('seo.step2Title')}</h4>
              <p className="text-sm text-slate-600">{t('seo.step2Text')}</p>
            </div>
            <div className="flex flex-col items-center text-center p-4">
              <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600 mb-4">
                <FileCheck2 className="w-8 h-8" />
              </div>
              <h4 className="font-bold text-slate-800 mb-2">3. {t('seo.step3Title')}</h4>
              <p className="text-sm text-slate-600">{t('seo.step3Text')}</p>
            </div>
            <div className="flex flex-col items-center text-center p-4">
              <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center text-slate-600 mb-4">
                <Download className="w-8 h-8" />
              </div>
              <h4 className="font-bold text-slate-800 mb-2">4. {t('seo.step4Title')}</h4>
              <p className="text-sm text-slate-600">{t('seo.step4Text')}</p>
            </div>
          </div>
        </div>

        {/* Semantic Grid for Crawlers */}
        <div className="grid md:grid-cols-2 gap-12">

          <article className="space-y-4">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-green-100 rounded-lg text-green-700">
                <Shield className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-800">{t('seo.privacyTitle')}</h3>
            </div>
            <p className="text-slate-600 leading-relaxed">
              {t('seo.privacyText')} Diferente de outros <strong>sites de currículo</strong> que armazenam seus dados em servidores, 
              o <strong>Currículo Rápido</strong> processa tudo localmente no seu navegador. Isso significa que suas informações pessoais, 
              histórico profissional e dados de contato nunca saem do seu dispositivo. <a href="#dicas-carreira" className="text-purple-600 hover:text-purple-800 underline">Saiba mais sobre dicas de carreira</a> e 
              <a href="#dicas-curriculo" className="text-purple-600 hover:text-purple-800 underline">confira nossas dicas de currículo</a> para criar o melhor CV possível.
            </p>
          </article>

          <article className="space-y-4">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-purple-100 rounded-lg text-purple-700">
                <FileText className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-800">{t('seo.termsTitle')}</h3>
            </div>
            <p className="text-slate-600 leading-relaxed">
              {t('seo.termsText')} <a href="#form" className="text-purple-600 hover:text-purple-800 underline">Comece a criar seu currículo agora</a>.
            </p>
          </article>

          <article className="space-y-4">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-blue-100 rounded-lg text-blue-700">
                <CheckCircle className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-800">{t('seo.atsTitle')}</h3>
            </div>
            <p className="text-slate-600 leading-relaxed">
              {t('seo.atsText')} Nossos <strong>modelos de currículo</strong> são testados e validados para garantir compatibilidade 
              com os principais <strong>sistemas ATS do Brasil</strong>, incluindo <strong>Gupy</strong>, <strong>Kenoby</strong>, 
              <strong>Vagas.com</strong>, <strong>Indeed</strong> e outros. Isso aumenta significativamente suas chances de passar 
              pela triagem inicial e chegar até o recrutador. <a href="#dicas-curriculo" className="text-purple-600 hover:text-purple-800 underline">Veja nossas dicas para otimizar seu CV</a> e 
              maximizar suas oportunidades de entrevista.
            </p>
          </article>

          <article className="space-y-4">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-orange-100 rounded-lg text-orange-700">
                <Lock className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-800">{t('seo.securityTitle')}</h3>
            </div>
            <p className="text-slate-600 leading-relaxed">
              {t('seo.securityText')} <a href="#form" className="text-purple-600 hover:text-purple-800 underline">Experimente nosso gerador de currículo grátis</a>.
            </p>
          </article>

        </div>

        {/* Additional SEO Content Section */}
        <div className="mt-16 pt-12 border-t border-slate-100">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h3 className="text-2xl font-bold text-slate-900 mb-4">Por que escolher o Currículo Rápido?</h3>
            <p className="text-slate-600 leading-relaxed mb-6">
              O <strong>Currículo Rápido</strong> é a melhor opção para quem busca <strong>criar currículo online grátis</strong> sem complicações. 
              Nossa ferramenta permite <strong>fazer currículo pelo celular</strong> ou computador, com <strong>modelos de currículo prontos</strong> 
              para preencher. Ideal para <strong>primeiro emprego</strong>, <strong>jovem aprendiz</strong>, <strong>estágio</strong> ou profissionais 
              experientes. Todos os <strong>modelos de currículo 2025</strong> são otimizados para sistemas ATS como Gupy e Kenoby, garantindo que 
              seu <strong>curriculum vitae</strong> seja lido corretamente por recrutadores e robôs de triagem. 
              <strong>Baixe seu currículo em PDF</strong> instantaneamente, sem cadastro e sem marcas d'água.
            </p>
            
            {/* Additional Rich Content */}
            <div className="text-left space-y-6 mt-8">
              <div>
                <h4 className="text-lg font-bold text-slate-900 mb-2">Modelos de Currículo para Diferentes Situações</h4>
                <p className="text-slate-600 leading-relaxed">
                  Oferecemos <strong>modelos de currículo simples</strong> para quem está começando, <strong>modelos de currículo modernos</strong> para 
                  profissionais de tecnologia, <strong>modelos de currículo criativos</strong> para áreas como design e marketing, e 
                  <strong>modelos de currículo clássicos</strong> para setores mais tradicionais. Cada modelo foi desenvolvido pensando nas 
                  melhores práticas de <strong>recrutamento e seleção</strong> no mercado brasileiro, garantindo que seu CV seja bem recebido 
                  tanto por <strong>recrutadores humanos</strong> quanto por <strong>sistemas ATS</strong>.
                </p>
              </div>
              
              <div>
                <h4 className="text-lg font-bold text-slate-900 mb-2">Como Fazer Currículo Profissional Passo a Passo</h4>
                <p className="text-slate-600 leading-relaxed">
                  Nosso <strong>gerador de currículo grátis</strong> simplifica o processo de criação. Você não precisa saber usar Word, 
                  Canva ou outros editores complexos. Basta preencher os campos do formulário e ver seu <strong>curriculum vitae</strong> 
                  sendo criado em tempo real. Nossa ferramenta funciona como um <strong>editor de currículo online</strong> intuitivo, 
                  onde você pode adicionar suas <strong>experiências profissionais</strong>, <strong>formação acadêmica</strong>, 
                  <strong>habilidades técnicas</strong>, <strong>idiomas</strong> e muito mais. Tudo isso sem precisar fazer 
                  <strong>cadastro ou login</strong>, preservando sua privacidade.
                </p>
              </div>
              
              <div>
                <h4 className="text-lg font-bold text-slate-900 mb-2">Currículo Otimizado para Sistemas ATS</h4>
                <p className="text-slate-600 leading-relaxed">
                  Um dos maiores desafios na busca por emprego é fazer com que seu currículo passe pelos <strong>filtros automáticos</strong> 
                  das empresas. Nossos <strong>modelos de currículo ATS-friendly</strong> são desenvolvidos especificamente para serem lidos 
                  corretamente por sistemas como <strong>Gupy</strong>, <strong>Kenoby</strong>, <strong>Vagas.com</strong>, 
                  <strong>LinkedIn Easy Apply</strong> e outros. Isso significa que suas informações serão extraídas corretamente, 
                  aumentando suas chances de chegar até o <strong>recrutador humano</strong>. Além disso, nossos modelos seguem as 
                  <strong>melhores práticas de formatação</strong> recomendadas por especialistas em RH.
                </p>
              </div>
              
              <div>
                <h4 className="text-lg font-bold text-slate-900 mb-2">Currículo para Primeiro Emprego e Jovem Aprendiz</h4>
                <p className="text-slate-600 leading-relaxed">
                  Se você está procurando seu <strong>primeiro emprego</strong> ou é um <strong>jovem aprendiz</strong>, não se preocupe 
                  com a falta de experiência. Nossos modelos são perfeitos para destacar sua <strong>formação acadêmica</strong>, 
                  <strong>cursos complementares</strong>, <strong>atividades extracurriculares</strong> e <strong>habilidades pessoais</strong>. 
                  Sabemos que criar um <strong>currículo sem experiência</strong> pode ser desafiador, por isso nossa ferramenta oferece 
                  dicas e sugestões para cada seção. Você pode criar um <strong>currículo para estágio</strong> ou 
                  <strong>currículo para primeiro emprego</strong> que destaque seu potencial, mesmo sem histórico profissional extenso.
                </p>
              </div>
              
              <div>
                <h4 className="text-lg font-bold text-slate-900 mb-2">Baixar Currículo em PDF Grátis</h4>
                <p className="text-slate-600 leading-relaxed">
                  Após preencher todas as informações, você pode <strong>baixar seu currículo em PDF</strong> com um único clique. 
                  O arquivo gerado está no formato <strong>PDF A4</strong>, pronto para <strong>imprimir</strong> ou enviar por email. 
                  Não há <strong>marcas d'água</strong>, <strong>limites de download</strong> ou <strong>restrições de uso</strong>. 
                  Você pode usar seu currículo para <strong>candidaturas de emprego</strong>, <strong>processos seletivos</strong>, 
                  <strong>envio por WhatsApp</strong>, <strong>publicação no LinkedIn</strong> ou qualquer outra necessidade. 
                  Tudo isso de forma <strong>100% gratuita</strong> e <strong>ilimitada</strong>.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* STYLING ONLY FAQ Section - schema moved to index.html JSON-LD */}
        <div className="mt-8 pt-12 border-t border-slate-100">
          <h3 className="text-2xl font-bold text-slate-900 mb-8 text-center">{t('seo.faqTitle')}</h3>
          <div className="max-w-3xl mx-auto space-y-4">

            <details className="group bg-slate-50 border border-slate-200 rounded-lg overflow-hidden">
              <summary className="flex items-center justify-between cursor-pointer p-4 font-bold text-slate-800 hover:bg-slate-100 transition-colors list-none">
                <span>{t('seo.q1')}</span>
                <ChevronDown className="w-5 h-5 text-slate-400 group-open:rotate-180 transition-transform" />
              </summary>
              <div className="p-4 pt-0 text-slate-600 leading-relaxed border-t border-transparent group-open:border-slate-100">
                <p>{t('seo.a1')}</p>
              </div>
            </details>

            <details className="group bg-slate-50 border border-slate-200 rounded-lg overflow-hidden">
              <summary className="flex items-center justify-between cursor-pointer p-4 font-bold text-slate-800 hover:bg-slate-100 transition-colors list-none">
                <span>{t('seo.q2')}</span>
                <ChevronDown className="w-5 h-5 text-slate-400 group-open:rotate-180 transition-transform" />
              </summary>
              <div className="p-4 pt-0 text-slate-600 leading-relaxed border-t border-transparent group-open:border-slate-100">
                <p>{t('seo.a2')}</p>
              </div>
            </details>

            <details className="group bg-slate-50 border border-slate-200 rounded-lg overflow-hidden">
              <summary className="flex items-center justify-between cursor-pointer p-4 font-bold text-slate-800 hover:bg-slate-100 transition-colors list-none">
                <span>{t('seo.q3')}</span>
                <ChevronDown className="w-5 h-5 text-slate-400 group-open:rotate-180 transition-transform" />
              </summary>
              <div className="p-4 pt-0 text-slate-600 leading-relaxed border-t border-transparent group-open:border-slate-100">
                <p>{t('seo.a3')}</p>
              </div>
            </details>

            <details className="group bg-slate-50 border border-slate-200 rounded-lg overflow-hidden">
              <summary className="flex items-center justify-between cursor-pointer p-4 font-bold text-slate-800 hover:bg-slate-100 transition-colors list-none">
                <span>{t('seo.q4')}</span>
                <ChevronDown className="w-5 h-5 text-slate-400 group-open:rotate-180 transition-transform" />
              </summary>
              <div className="p-4 pt-0 text-slate-600 leading-relaxed border-t border-transparent group-open:border-slate-100">
                <p>{t('seo.a4')}</p>
              </div>
            </details>
            
            <details className="group bg-slate-50 border border-slate-200 rounded-lg overflow-hidden">
              <summary className="flex items-center justify-between cursor-pointer p-4 font-bold text-slate-800 hover:bg-slate-100 transition-colors list-none">
                <span>Qual a diferença entre currículo e curriculum vitae?</span>
                <ChevronDown className="w-5 h-5 text-slate-400 group-open:rotate-180 transition-transform" />
              </summary>
              <div className="p-4 pt-0 text-slate-600 leading-relaxed border-t border-transparent group-open:border-slate-100">
                <p>
                  No Brasil, <strong>currículo</strong> e <strong>curriculum vitae (CV)</strong> são termos usados de forma intercambiável. 
                  Ambos se referem ao documento que apresenta suas qualificações profissionais, experiência e formação. 
                  O termo <strong>curriculum vitae</strong> é mais formal e tradicional, enquanto <strong>currículo</strong> é mais comum no dia a dia. 
                  Nossa ferramenta gera documentos profissionais que podem ser chamados de qualquer uma das formas.
                </p>
              </div>
            </details>
            
            <details className="group bg-slate-50 border border-slate-200 rounded-lg overflow-hidden">
              <summary className="flex items-center justify-between cursor-pointer p-4 font-bold text-slate-800 hover:bg-slate-100 transition-colors list-none">
                <span>Como fazer um currículo sem experiência profissional?</span>
                <ChevronDown className="w-5 h-5 text-slate-400 group-open:rotate-180 transition-transform" />
              </summary>
              <div className="p-4 pt-0 text-slate-600 leading-relaxed border-t border-transparent group-open:border-slate-100">
                <p>
                  Se você está procurando seu <strong>primeiro emprego</strong> ou é um <strong>jovem aprendiz</strong>, foque em destacar sua 
                  <strong>formação acadêmica</strong>, <strong>cursos complementares</strong>, <strong>atividades extracurriculares</strong>, 
                  <strong>trabalhos voluntários</strong> e <strong>projetos pessoais</strong>. Use a seção de <strong>resumo profissional</strong> 
                  para destacar seu potencial e motivação. Nossos modelos são perfeitos para <strong>currículo sem experiência</strong>, 
                  ajudando você a organizar essas informações de forma profissional e atrativa.
                </p>
              </div>
            </details>
            
            <details className="group bg-slate-50 border border-slate-200 rounded-lg overflow-hidden">
              <summary className="flex items-center justify-between cursor-pointer p-4 font-bold text-slate-800 hover:bg-slate-100 transition-colors list-none">
                <span>Posso usar o mesmo currículo para várias vagas?</span>
                <ChevronDown className="w-5 h-5 text-slate-400 group-open:rotate-180 transition-transform" />
              </summary>
              <div className="p-4 pt-0 text-slate-600 leading-relaxed border-t border-transparent group-open:border-slate-100">
                <p>
                  Embora seja possível usar o mesmo <strong>curriculum vitae</strong> para múltiplas vagas, é altamente recomendado 
                  <strong>personalizar seu CV</strong> para cada oportunidade. Adapte o <strong>resumo profissional</strong>, 
                  destaque <strong>experiências relevantes</strong> para a vaga e inclua <strong>palavras-chave</strong> da descrição do cargo. 
                  Nossa ferramenta permite salvar seus dados e criar múltiplas versões facilmente, tornando a personalização rápida e eficiente.
                </p>
              </div>
            </details>
            
            <details className="group bg-slate-50 border border-slate-200 rounded-lg overflow-hidden">
              <summary className="flex items-center justify-between cursor-pointer p-4 font-bold text-slate-800 hover:bg-slate-100 transition-colors list-none">
                <span>O que é um sistema ATS e por que é importante?</span>
                <ChevronDown className="w-5 h-5 text-slate-400 group-open:rotate-180 transition-transform" />
              </summary>
              <div className="p-4 pt-0 text-slate-600 leading-relaxed border-t border-transparent group-open:border-slate-100">
                <p>
                  <strong>ATS (Applicant Tracking System)</strong> é um software usado por empresas para fazer a triagem inicial de candidatos. 
                  Sistemas como <strong>Gupy</strong>, <strong>Kenoby</strong> e <strong>Vagas.com</strong> escaneiam currículos procurando por 
                  <strong>palavras-chave</strong> e <strong>qualificações</strong> relevantes. Se seu CV não for compatível com ATS, 
                  ele pode ser rejeitado antes mesmo de chegar a um recrutador humano. Nossos <strong>modelos de currículo</strong> são 
                  desenvolvidos especificamente para serem <strong>lidos corretamente por sistemas ATS</strong>, aumentando suas chances de passar na triagem.
                </p>
              </div>
            </details>

          </div>
        </div>
      </div>
    </section>
  );
};