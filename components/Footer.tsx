import React from 'react';
import { Heart } from 'lucide-react';
import { AdPlaceholder } from './AdPlaceholder';

interface FooterProps {
    t: (key: string) => string;
}

export const Footer: React.FC<FooterProps> = ({ t }) => {
    return (
        <footer className="bg-white border-t border-slate-200 py-10 mt-auto" role="contentinfo">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Footer SEO Content */}
                <div className="mb-8 pb-8 border-b border-slate-200">
                    <div className="grid md:grid-cols-3 gap-6 text-sm text-slate-600">
                        <div>
                            <h4 className="font-bold text-slate-900 mb-2">Sobre o Currículo Rápido</h4>
                            <p className="leading-relaxed">
                                O <strong>melhor gerador de currículo grátis do Brasil</strong>. Crie seu <strong>curriculum vitae profissional</strong>
                                em minutos, sem cadastro e sem limites. Nossos <strong>modelos de currículo</strong> são otimizados para
                                <strong>sistemas ATS</strong> e <strong>recrutadores</strong>.
                            </p>
                        </div>
                        <div>
                            <h4 className="font-bold text-slate-900 mb-2">Recursos Principais</h4>
                            <ul className="space-y-1 leading-relaxed">
                                <li>✓ <strong>Modelos de currículo prontos</strong> para preencher</li>
                                <li>✓ <strong>Compatível com ATS</strong> (Gupy, Kenoby, Vagas.com)</li>
                                <li>✓ <strong>Funciona no celular</strong> Android e iPhone</li>
                                <li>✓ <strong>Download em PDF</strong> grátis e ilimitado</li>
                                <li>✓ <strong>Sem cadastro</strong> e sem marcas d'água</li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-bold text-slate-900 mb-2">Para Quem é Ideal</h4>
                            <ul className="space-y-1 leading-relaxed">
                                <li>• <strong>Primeiro emprego</strong> e <strong>jovem aprendiz</strong></li>
                                <li>• <strong>Estágio</strong> e <strong>trainee</strong></li>
                                <li>• Profissionais experientes em <strong>recolocação</strong></li>
                                <li>• Quem busca <strong>mudança de carreira</strong></li>
                                <li>• Candidatos para <strong>vagas no Brasil</strong></li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-slate-500 text-sm">
                    <div className="flex items-center gap-2">
                        <span className="font-semibold text-slate-900">Currículo Rápido</span> &copy; {new Date().getFullYear()}
                    </div>
                    <div className="flex items-center gap-6">
                        <a href="/privacidade" className="hover:text-slate-900 transition-colors cursor-pointer">
                            {t('footer.privacy')}
                        </a>
                        <a href="/termos" className="hover:text-slate-900 transition-colors cursor-pointer">
                            {t('footer.terms')}
                        </a>
                        <a href="/sobre" className="hover:text-slate-900 transition-colors cursor-pointer">
                            Sobre
                        </a>
                        <a href="/contato" className="hover:text-slate-900 transition-colors cursor-pointer">
                            Contato
                        </a>
                        <a href="/guias" className="hover:text-slate-900 transition-colors cursor-pointer">
                            Guias
                        </a>
                        <a href="/politica-editorial" className="hover:text-slate-900 transition-colors cursor-pointer">
                            Política Editorial
                        </a>
                    </div>
                    <div className="flex items-center gap-1">
                        {t('footer.madeWith')} <Heart className="w-3 h-3 text-red-500 fill-current" />
                    </div>
                </div>

                <AdPlaceholder placement="footer" className="mt-8" />
            </div>
        </footer>
    );
};
