import React from 'react';
import { Shield, Lock, CheckCircle, FileText, ChevronDown, PenTool, Layout, Download, FileCheck2 } from 'lucide-react';
// Removed multilingual support - Portuguese only

export const SEOContent: React.FC = () => {

  return (
    <section className="bg-white border-t border-slate-200 py-16 lg:py-20 no-print" id="seo-content">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Main SEO Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl font-bold text-slate-900 mb-6">
            O Gerador de Curriculum Vitae (CV) Mais Seguro e Gratuito
          </h2>
          <p className="text-lg text-slate-600 leading-relaxed" dangerouslySetInnerHTML={{ __html: "O <strong>Currículo Rápido</strong> foi desenvolvido para impulsionar sua carreira no mercado brasileiro em 2025. Crie documentos profissionais, modelos de currículo prontos para preencher e compatíveis com sistemas ATS (Gupy, Kenoby) sem expor seus dados. Com ferramentas integradas de <strong>verificação ATS</strong>, <strong>análise de vagas</strong>, <strong>exportação para PDF/JSON</strong> e <strong>gerenciamento de múltiplos currículos</strong>. Ideal para quem busca <strong>Primeiro Emprego</strong>, <strong>Estágio</strong> ou cargos de liderança." }}>
          </p>
        </div>

        {/* Step by Step Section (Matches HowTo Schema) */}
        <div className="mb-20">
          <h3 className="text-2xl font-bold text-slate-900 mb-8 text-center">Como fazer um Currículo Online em 4 Passos</h3>
          <div className="grid md:grid-cols-4 gap-6">
            <div className="flex flex-col items-center text-center p-4">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center text-purple-600 mb-4">
                <PenTool className="w-8 h-8" />
              </div>
              <h4 className="font-bold text-slate-800 mb-2">1. Preencha seus Dados</h4>
              <p className="text-sm text-slate-600">Insira suas informações de contato, resumo profissional, experiência e formação no nosso editor de currículo intuitivo e fácil de usar.</p>
            </div>
            <div className="flex flex-col items-center text-center p-4">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 mb-4">
                <Layout className="w-8 h-8" />
              </div>
              <h4 className="font-bold text-slate-800 mb-2">2. Escolha o Modelo</h4>
              <p className="text-sm text-slate-600">Selecione entre modelos de currículo Modernos, Clássicos (Simples) ou Criativos que se adaptam à sua vaga de emprego.</p>
            </div>
            <div className="flex flex-col items-center text-center p-4">
              <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600 mb-4">
                <FileCheck2 className="w-8 h-8" />
              </div>
              <h4 className="font-bold text-slate-800 mb-2">3. Personalize</h4>
              <p className="text-sm text-slate-600">Ajuste cores e adicione seções extras como idiomas ou habilidades para destacar seu perfil profissional.</p>
            </div>
            <div className="flex flex-col items-center text-center p-4">
              <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center text-slate-600 mb-4">
                <Download className="w-8 h-8" />
              </div>
              <h4 className="font-bold text-slate-800 mb-2">4. Baixe ou Exporte</h4>
              <p className="text-sm text-slate-600">Baixe em PDF ou exporte para JSON para backup. Use o verificador de ATS e análise de vaga para otimizar seu currículo.</p>
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
              <h3 className="text-xl font-bold text-slate-800">Privacidade Absoluta (Client-Side)</h3>
            </div>
            <p className="text-slate-600 leading-relaxed">
              Diferente de outros sites de currículo online, o Currículo Rápido opera com tecnologia Client-Side. Nós não armazenamos seus dados pessoais em servidores, garantindo total segurança. Diferente de outros <strong>sites de currículo</strong> que armazenam seus dados em servidores, 
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
              <h3 className="text-xl font-bold text-slate-800">Termos de Uso Simplificados</h3>
            </div>
            <p className="text-slate-600 leading-relaxed">
              O uso do Currículo Rápido é 100% gratuito. Você tem o direito irrevogável de usar os currículos gerados para candidaturas de emprego, processos seletivos e LinkedIn. <a href="#form" className="text-purple-600 hover:text-purple-800 underline">Comece a criar seu currículo agora</a>.
            </p>
          </article>

          <article className="space-y-4">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-blue-100 rounded-lg text-blue-700">
                <CheckCircle className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-800">Compatibilidade ATS (Brasil)</h3>
            </div>
            <p className="text-slate-600 leading-relaxed">
              Nossos modelos de currículo são otimizados para serem lidos por recrutadores e robôs de triagem (ATS) comuns no Brasil, aumentando suas chances de entrevista. Nossos <strong>modelos de currículo</strong> são testados e validados para garantir compatibilidade 
              com os principais <strong>sistemas ATS do Brasil</strong>, incluindo <strong>Gupy</strong>, <strong>Kenoby</strong>, 
              <strong>Vagas.com</strong>, <strong>Indeed</strong> e outros. Além disso, oferecemos uma <strong>ferramenta integrada de verificação ATS</strong> 
              que analisa seu currículo e fornece sugestões de melhoria, além de uma <strong>análise de compatibilidade com vagas</strong> 
              para personalizar seu CV para cada oportunidade. <a href="#dicas-curriculo" className="text-purple-600 hover:text-purple-800 underline">Veja nossas dicas para otimizar seu CV</a> e 
              maximizar suas oportunidades de entrevista.
            </p>
          </article>

          <article className="space-y-4">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-orange-100 rounded-lg text-orange-700">
                <Lock className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-800">Segurança de Dados e HTTPS</h3>
            </div>
            <p className="text-slate-600 leading-relaxed">
              Utilizamos conexões seguras (HTTPS) de ponta a ponta e não utilizamos cookies de rastreamento invasivos. Seus dados de contato e histórico profissional ficam apenas no seu navegador. <a href="#form" className="text-purple-600 hover:text-purple-800 underline">Experimente nosso gerador de currículo grátis</a>.
            </p>
          </article>

        </div>

        {/* Additional SEO Content Section */}
        <div className="mt-16 pt-12 border-t border-slate-100">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h3 className="text-2xl font-bold text-slate-900 mb-4">Por que escolher o Currículo Rápido?</h3>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-6 border border-purple-200 hover:shadow-lg transition-all">
              <div className="w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center mb-4">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <h4 className="font-bold text-slate-900 mb-2">100% Gratuito</h4>
              <p className="text-sm text-slate-700">Sem custos ocultos, sem marcas d'água, sem limites de downloads. Use quantas vezes precisar, totalmente grátis.</p>
            </div>

            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6 border border-blue-200 hover:shadow-lg transition-all">
              <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center mb-4">
                <Lock className="w-6 h-6 text-white" />
              </div>
              <h4 className="font-bold text-slate-900 mb-2">Privacidade Total</h4>
              <p className="text-sm text-slate-700">Seus dados nunca saem do seu navegador. Processamento 100% local, sem armazenamento em servidores.</p>
            </div>

            <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-xl p-6 border border-emerald-200 hover:shadow-lg transition-all">
              <div className="w-12 h-12 bg-emerald-600 rounded-lg flex items-center justify-center mb-4">
                <CheckCircle className="w-6 h-6 text-white" />
              </div>
              <h4 className="font-bold text-slate-900 mb-2">Compatível com ATS</h4>
              <p className="text-sm text-slate-700">Modelos otimizados para sistemas ATS como Gupy, Kenoby e Vagas.com, aumentando suas chances de entrevista.</p>
            </div>

            <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl p-6 border border-orange-200 hover:shadow-lg transition-all">
              <div className="w-12 h-12 bg-orange-600 rounded-lg flex items-center justify-center mb-4">
                <FileText className="w-6 h-6 text-white" />
              </div>
              <h4 className="font-bold text-slate-900 mb-2">Sem Cadastro</h4>
              <p className="text-sm text-slate-700">Comece a usar imediatamente. Não precisa de email, login ou qualquer tipo de registro. Funciona na hora.</p>
            </div>

            <div className="bg-gradient-to-br from-pink-50 to-pink-100 rounded-xl p-6 border border-pink-200 hover:shadow-lg transition-all">
              <div className="w-12 h-12 bg-pink-600 rounded-lg flex items-center justify-center mb-4">
                <Download className="w-6 h-6 text-white" />
              </div>
              <h4 className="font-bold text-slate-900 mb-2">PDF de Alta Qualidade</h4>
              <p className="text-sm text-slate-700">Baixe seu currículo em PDF profissional, pronto para imprimir ou enviar por email. Formato A4 padrão.</p>
            </div>

            <div className="bg-gradient-to-br from-indigo-50 to-indigo-100 rounded-xl p-6 border border-indigo-200 hover:shadow-lg transition-all">
              <div className="w-12 h-12 bg-indigo-600 rounded-lg flex items-center justify-center mb-4">
                <Layout className="w-6 h-6 text-white" />
              </div>
              <h4 className="font-bold text-slate-900 mb-2">13 Modelos Profissionais</h4>
              <p className="text-sm text-slate-700">Escolha entre modelos Moderno, Clássico, Executivo, Criativo e mais. Todos otimizados para o mercado brasileiro.</p>
            </div>

            <div className="bg-gradient-to-br from-cyan-50 to-cyan-100 rounded-xl p-6 border border-cyan-200 hover:shadow-lg transition-all">
              <div className="w-12 h-12 bg-cyan-600 rounded-lg flex items-center justify-center mb-4">
                <FileCheck2 className="w-6 h-6 text-white" />
              </div>
              <h4 className="font-bold text-slate-900 mb-2">Verificador de ATS</h4>
              <p className="text-sm text-slate-700">Ferramenta integrada para verificar a compatibilidade do seu currículo com sistemas ATS e receber sugestões de melhoria.</p>
            </div>

            <div className="bg-gradient-to-br from-violet-50 to-violet-100 rounded-xl p-6 border border-violet-200 hover:shadow-lg transition-all">
              <div className="w-12 h-12 bg-violet-600 rounded-lg flex items-center justify-center mb-4">
                <FileText className="w-6 h-6 text-white" />
              </div>
              <h4 className="font-bold text-slate-900 mb-2">Exportação Múltipla</h4>
              <p className="text-sm text-slate-700">Exporte para PDF ou JSON para backup. Importe backups anteriores para continuar editando.</p>
            </div>

            <div className="bg-gradient-to-br from-rose-50 to-rose-100 rounded-xl p-6 border border-rose-200 hover:shadow-lg transition-all">
              <div className="w-12 h-12 bg-rose-600 rounded-lg flex items-center justify-center mb-4">
                <CheckCircle className="w-6 h-6 text-white" />
              </div>
              <h4 className="font-bold text-slate-900 mb-2">Análise de Vaga</h4>
              <p className="text-sm text-slate-700">Cole a descrição da vaga e receba sugestões personalizadas para adaptar seu currículo e aumentar suas chances.</p>
            </div>

            <div className="bg-gradient-to-br from-teal-50 to-teal-100 rounded-xl p-6 border border-teal-200 hover:shadow-lg transition-all">
              <div className="w-12 h-12 bg-teal-600 rounded-lg flex items-center justify-center mb-4">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <h4 className="font-bold text-slate-900 mb-2">Múltiplos Currículos</h4>
              <p className="text-sm text-slate-700">Salve e gerencie múltiplos currículos, histórico de versões e compartilhe via link único. Tudo salvo localmente.</p>
            </div>
          </div>
        </div>

        {/* STYLING ONLY FAQ Section - schema moved to index.html JSON-LD */}
        <div className="mt-8 pt-12 border-t border-slate-100">
          <h3 className="text-2xl font-bold text-slate-900 mb-8 text-center">Perguntas Frequentes sobre Currículos (FAQ)</h3>
          <div className="max-w-3xl mx-auto space-y-4">

            <details className="group bg-slate-50 border border-slate-200 rounded-lg overflow-hidden">
              <summary className="flex items-center justify-between cursor-pointer p-4 font-bold text-slate-800 hover:bg-slate-100 transition-colors list-none">
                <span>O Currículo Rápido é realmente grátis?</span>
                <ChevronDown className="w-5 h-5 text-slate-400 group-open:rotate-180 transition-transform" />
              </summary>
              <div className="p-4 pt-0 text-slate-600 leading-relaxed border-t border-transparent group-open:border-slate-100">
                <p>Sim, somos o melhor site para fazer currículo grátis. Todas as funcionalidades são liberadas: você pode escolher qualquer modelo de currículo, preencher seus dados e baixar o PDF final sem pagar nada e sem marcas d'água.</p>
              </div>
            </details>

            <details className="group bg-slate-50 border border-slate-200 rounded-lg overflow-hidden">
              <summary className="flex items-center justify-between cursor-pointer p-4 font-bold text-slate-800 hover:bg-slate-100 transition-colors list-none">
                <span>Preciso fazer cadastro para criar meu currículo?</span>
                <ChevronDown className="w-5 h-5 text-slate-400 group-open:rotate-180 transition-transform" />
              </summary>
              <div className="p-4 pt-0 text-slate-600 leading-relaxed border-t border-transparent group-open:border-slate-100">
                <p>Não. Diferente de outros sites como Canva ou sites pagos, não exigimos login, email ou cadastro. O gerador de currículo funciona instantaneamente no seu navegador.</p>
              </div>
            </details>

            <details className="group bg-slate-50 border border-slate-200 rounded-lg overflow-hidden">
              <summary className="flex items-center justify-between cursor-pointer p-4 font-bold text-slate-800 hover:bg-slate-100 transition-colors list-none">
                <span>Como salvo meu currículo em PDF?</span>
                <ChevronDown className="w-5 h-5 text-slate-400 group-open:rotate-180 transition-transform" />
              </summary>
              <div className="p-4 pt-0 text-slate-600 leading-relaxed border-t border-transparent group-open:border-slate-100">
                <p>Após preencher suas informações no editor, clique no botão 'Baixar PDF'. O arquivo será salvo automaticamente no seu celular ou computador, pronto para enviar por email ou WhatsApp.</p>
              </div>
            </details>

            <details className="group bg-slate-50 border border-slate-200 rounded-lg overflow-hidden">
              <summary className="flex items-center justify-between cursor-pointer p-4 font-bold text-slate-800 hover:bg-slate-100 transition-colors list-none">
                <span>Como fazer um currículo pelo celular?</span>
                <ChevronDown className="w-5 h-5 text-slate-400 group-open:rotate-180 transition-transform" />
              </summary>
              <div className="p-4 pt-0 text-slate-600 leading-relaxed border-t border-transparent group-open:border-slate-100">
                <p>Nosso site é um App de Currículo que roda no navegador. Você pode criar, editar e baixar seu currículo em PDF diretamente pelo seu celular Android ou iPhone, de forma fácil e rápida.</p>
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
                <p className="mt-3">
                  <strong>Dica:</strong> Use nossa ferramenta <strong>Verificador de ATS</strong> integrada para analisar seu currículo e receber 
                  sugestões de melhorias antes de enviar. Ela verifica se todas as informações essenciais estão presentes e se o formato é 
                  compatível com sistemas ATS.
                </p>
              </div>
            </details>

            <details className="group bg-slate-50 border border-slate-200 rounded-lg overflow-hidden">
              <summary className="flex items-center justify-between cursor-pointer p-4 font-bold text-slate-800 hover:bg-slate-100 transition-colors list-none">
                <span>Posso exportar meu currículo em outros formatos além de PDF?</span>
                <ChevronDown className="w-5 h-5 text-slate-400 group-open:rotate-180 transition-transform" />
              </summary>
              <div className="p-4 pt-0 text-slate-600 leading-relaxed border-t border-transparent group-open:border-slate-100">
                <p>
                  Sim! Além do <strong>PDF</strong> (ideal para envio por email e impressão), você pode exportar seu currículo em:
                </p>
                <ul className="list-disc list-inside mt-2 space-y-1">
                  <li><strong>JSON</strong> - Para fazer backup e restaurar seus dados depois</li>
                </ul>
                <p className="mt-3">
                  Você também pode <strong>importar</strong> backups anteriores em formato JSON para continuar editando um currículo salvo.
                </p>
              </div>
            </details>

            <details className="group bg-slate-50 border border-slate-200 rounded-lg overflow-hidden">
              <summary className="flex items-center justify-between cursor-pointer p-4 font-bold text-slate-800 hover:bg-slate-100 transition-colors list-none">
                <span>Como funciona a análise de compatibilidade com vagas?</span>
                <ChevronDown className="w-5 h-5 text-slate-400 group-open:rotate-180 transition-transform" />
              </summary>
              <div className="p-4 pt-0 text-slate-600 leading-relaxed border-t border-transparent group-open:border-slate-100">
                <p>
                  Nossa ferramenta de <strong>Análise de Compatibilidade com Vaga</strong> ajuda você a personalizar seu currículo para cada 
                  oportunidade de emprego. Basta colar a descrição completa da vaga e nossa ferramenta irá:
                </p>
                <ul className="list-disc list-inside mt-2 space-y-1">
                  <li>Analisar palavras-chave e comparar com seu currículo</li>
                  <li>Calcular um score de compatibilidade</li>
                  <li>Sugerir palavras-chave faltantes para adicionar</li>
                  <li>Indicar melhorias específicas para aumentar suas chances</li>
                </ul>
                <p className="mt-3">
                  <strong>100% gratuito e sem uso de APIs pagas</strong> - toda a análise é feita localmente no seu navegador, 
                  garantindo privacidade total.
                </p>
              </div>
            </details>

            <details className="group bg-slate-50 border border-slate-200 rounded-lg overflow-hidden">
              <summary className="flex items-center justify-between cursor-pointer p-4 font-bold text-slate-800 hover:bg-slate-100 transition-colors list-none">
                <span>Posso salvar múltiplos currículos e restaurar versões anteriores?</span>
                <ChevronDown className="w-5 h-5 text-slate-400 group-open:rotate-180 transition-transform" />
              </summary>
              <div className="p-4 pt-0 text-slate-600 leading-relaxed border-t border-transparent group-open:border-slate-100">
                <p>
                  Sim! O Currículo Rápido oferece um sistema completo de gerenciamento:
                </p>
                <ul className="list-disc list-inside mt-2 space-y-1">
                  <li><strong>Múltiplos currículos:</strong> Salve quantos currículos você quiser, cada um com um nome personalizado</li>
                  <li><strong>Histórico de versões:</strong> Todas as alterações são salvas automaticamente. Você pode visualizar e restaurar versões anteriores a qualquer momento</li>
                  <li><strong>Compartilhamento:</strong> Gere um link único para compartilhar seu currículo com recrutadores ou colegas</li>
                  <li><strong>Auto-save:</strong> Seus dados são salvos automaticamente enquanto você edita</li>
                </ul>
                <p className="mt-3">
                  Tudo é armazenado <strong>localmente no seu navegador</strong>, garantindo total privacidade e segurança dos seus dados.
                </p>
              </div>
            </details>

          </div>
        </div>
      </div>
    </section>
  );
};