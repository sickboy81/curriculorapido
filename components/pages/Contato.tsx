import React, { useState } from 'react';
import { Mail, Phone, MessageSquare, Send, Home } from 'lucide-react';
import { useSEO } from '../../hooks/useSEO';

export const Contato: React.FC = () => {
  useSEO({
    title: 'Contato | Currículo Rápido - Entre em Contato Conosco',
    description: 'Entre em contato com o Currículo Rápido. Tire suas dúvidas sobre o gerador de currículo grátis, suporte técnico ou parcerias. Respondemos em até 48 horas úteis.',
    canonical: 'https://curriculorapido.com.br/contato',
    ogTitle: 'Contato | Currículo Rápido - Entre em Contato Conosco',
    ogDescription: 'Entre em contato com o Currículo Rápido. Tire suas dúvidas sobre o gerador de currículo grátis.',
    ogImage: 'https://curriculorapido.com.br/preview-image.jpg'
  });
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    assunto: '',
    mensagem: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simular envio (neste caso, apenas abrir email client)
    const mailtoLink = `mailto:contato@curriculorapido.com.br?subject=${encodeURIComponent(formData.assunto)}&body=${encodeURIComponent(`Nome: ${formData.nome}\nEmail: ${formData.email}\n\nMensagem:\n${formData.mensagem}`)}`;
    window.location.href = mailtoLink;
    
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitStatus('success');
      setFormData({ nome: '', email: '', assunto: '', mensagem: '' });
      setTimeout(() => setSubmitStatus('idle'), 5000);
    }, 1000);
  };

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
          <h1 className="text-4xl font-bold text-slate-900">Entre em Contato</h1>
          <p className="text-xl text-slate-600 mt-2">
            Estamos aqui para ajudar você
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-2 gap-8">
          
          {/* Left Column - Info */}
          <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-8">
              <h2 className="text-2xl font-bold text-slate-900 mb-6">Como Podemos Ajudar?</h2>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-purple-100 rounded-lg">
                    <Mail className="w-6 h-6 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 mb-1">Email</h3>
                    <a 
                      href="mailto:contato@curriculorapido.com.br" 
                      className="text-purple-600 hover:text-purple-700"
                    >
                      contato@curriculorapido.com.br
                    </a>
                    <p className="text-sm text-slate-600 mt-1">
                      Respondemos em até 48 horas úteis
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-3 bg-blue-100 rounded-lg">
                    <MessageSquare className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 mb-1">Suporte</h3>
                    <p className="text-slate-600 text-sm">
                      Precisa de ajuda para usar o gerador? Tem dúvidas sobre como criar seu currículo? 
                      Estamos aqui para ajudar!
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-3 bg-green-100 rounded-lg">
                    <Home className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 mb-1">Localização</h3>
                    <p className="text-slate-600 text-sm">
                      Brasil • Atendimento 100% online
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* FAQ Quick Links */}
            <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-8">
              <h3 className="font-bold text-slate-900 mb-4">Perguntas Frequentes</h3>
              <ul className="space-y-3 text-sm text-slate-600">
                <li>
                  <strong className="text-slate-900">O serviço é realmente gratuito?</strong>
                  <br />
                  Sim! Todo o serviço é 100% gratuito, sem planos premium ou limitações.
                </li>
                <li>
                  <strong className="text-slate-900">Meus dados estão seguros?</strong>
                  <br />
                  Sim! Todos os dados ficam apenas no seu navegador. Não armazenamos informações em servidores.
                </li>
                <li>
                  <strong className="text-slate-900">Posso usar o currículo para aplicar em vagas?</strong>
                  <br />
                  Claro! Os currículos gerados podem ser usados livremente para candidaturas de emprego.
                </li>
              </ul>
            </div>
          </div>

          {/* Right Column - Form */}
          <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-8">
            <h2 className="text-2xl font-bold text-slate-900 mb-6">Envie Sua Mensagem</h2>
            
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label htmlFor="nome" className="block text-sm font-semibold text-slate-900 mb-2">
                  Nome Completo *
                </label>
                <input
                  type="text"
                  id="nome"
                  required
                  value={formData.nome}
                  onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="Seu nome"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-semibold text-slate-900 mb-2">
                  Email *
                </label>
                <input
                  type="email"
                  id="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="seu@email.com"
                />
              </div>

              <div>
                <label htmlFor="assunto" className="block text-sm font-semibold text-slate-900 mb-2">
                  Assunto *
                </label>
                <select
                  id="assunto"
                  required
                  value={formData.assunto}
                  onChange={(e) => setFormData({ ...formData, assunto: e.target.value })}
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                >
                  <option value="">Selecione um assunto</option>
                  <option value="Dúvida sobre o uso">Dúvida sobre o uso</option>
                  <option value="Problema técnico">Problema técnico</option>
                  <option value="Sugestão">Sugestão</option>
                  <option value="Parceria">Parceria</option>
                  <option value="Outro">Outro</option>
                </select>
              </div>

              <div>
                <label htmlFor="mensagem" className="block text-sm font-semibold text-slate-900 mb-2">
                  Mensagem *
                </label>
                <textarea
                  id="mensagem"
                  required
                  rows={6}
                  value={formData.mensagem}
                  onChange={(e) => setFormData({ ...formData, mensagem: e.target.value })}
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
                  placeholder="Descreva sua dúvida ou mensagem..."
                />
              </div>

              {submitStatus === 'success' && (
                <div className="p-4 bg-green-50 border border-green-200 rounded-lg text-green-700">
                  Mensagem enviada! Verifique seu cliente de email.
                </div>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full px-6 py-3 bg-purple-600 text-white font-semibold rounded-lg hover:bg-purple-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Enviando...
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    Enviar Mensagem
                  </>
                )}
              </button>

              <p className="text-xs text-slate-500 text-center">
                Ao enviar, seu cliente de email será aberto. Você pode enviar a mensagem de lá.
              </p>
            </form>
          </div>

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


