import React from 'react';
import { X, Shield, FileText, AlertTriangle } from 'lucide-react';
// Removed multilingual support - Portuguese only

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  icon: React.ElementType;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, icon: Icon, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity" 
        onClick={onClose}
      ></div>
      
      {/* Content */}
      <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[85vh] animate-in fade-in zoom-in-95 duration-200">
        <div className="flex items-center justify-between p-6 border-b border-slate-100 bg-slate-50/50">
          <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <Icon className="w-6 h-6 text-purple-600" />
            {title}
          </h3>
          <button 
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <div className="p-6 overflow-y-auto custom-scrollbar text-slate-600 space-y-4 text-sm leading-relaxed">
          {children}
        </div>
        
        <div className="p-4 border-t border-slate-100 bg-slate-50 flex justify-end">
          <button 
            onClick={onClose}
            className="px-5 py-2.5 bg-slate-900 text-white font-medium rounded-lg hover:bg-slate-800 transition-colors shadow-sm"
          >
            Entendi
          </button>
        </div>
      </div>
    </div>
  );
};

interface ConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  confirmText?: string;
  isDestructive?: boolean;
}

export const ConfirmModal: React.FC<ConfirmModalProps> = ({ 
  isOpen, 
  onClose, 
  onConfirm, 
  title, 
  message, 
  confirmText,
  isDestructive = false
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
      <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={onClose}></div>
      <div className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        <div className="p-6">
          <div className="flex items-center gap-3 mb-4 text-slate-900">
            <div className={`p-2 rounded-full ${isDestructive ? 'bg-red-100 text-red-600' : 'bg-purple-100 text-purple-600'}`}>
              <AlertTriangle className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold">{title}</h3>
          </div>
          <p className="text-slate-600 leading-relaxed mb-6">
            {message}
          </p>
          <div className="flex gap-3 justify-end">
            <button 
              onClick={onClose}
              className="px-4 py-2 bg-white text-slate-700 font-medium rounded-lg border border-slate-200 hover:bg-slate-50 transition-colors"
            >
              Cancelar
            </button>
            <button 
              onClick={() => {
                onConfirm();
                onClose();
              }}
              className={`px-4 py-2 text-white font-medium rounded-lg transition-colors shadow-sm ${
                isDestructive 
                  ? 'bg-red-600 hover:bg-red-700' 
                  : 'bg-purple-600 hover:bg-purple-700'
              }`}
            >
              {confirmText}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export const PrivacyModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
  // Using generic English structure if selected, otherwise fallback to existing logic or translations logic.
  // Since this is large text block, ideally we'd have full translation strings, but for brevity here we use what's provided in dictionary or simplified structure.
  
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Política de Privacidade" icon={Shield}>
      <p>Última atualização: {new Date().toLocaleDateString()}</p>
      
      <p className="font-bold mt-4">Privacidade Absoluta (Client-Side)</p>
      <p>Diferente de outros sites de currículo online, o Currículo Rápido opera com tecnologia Client-Side. Nós não armazenamos seus dados pessoais em servidores, garantindo total segurança.</p>

      <p className="font-bold mt-4">Segurança de Dados e HTTPS</p>
      <p>Utilizamos conexões seguras (HTTPS) de ponta a ponta e não utilizamos cookies de rastreamento invasivos. Seus dados de contato e histórico profissional ficam apenas no seu navegador.</p>
      
      <h4 className="text-base font-bold text-slate-900 mt-4">1. Resumo da Privacidade</h4>
      <p>A sua privacidade é nossa prioridade absoluta. O ponto mais importante que você deve saber é: <strong>Nós não armazenamos seus dados pessoais em nossos servidores de forma permanente.</strong></p>
      <h4 className="text-base font-bold text-slate-900 mt-4">2. Coleta e Uso de Dados</h4>
      <p>Este aplicativo funciona primariamente "client-side".</p>
    </Modal>
  );
};

export const TermsModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Termos de Uso" icon={FileText}>
      <p className="font-bold mt-4">Termos de Uso Simplificados</p>
      <p>O uso do Currículo Rápido é 100% gratuito. Você tem o direito irrevogável de usar os currículos gerados para candidaturas de emprego, processos seletivos e LinkedIn.</p>

      <h4 className="text-base font-bold text-slate-900 mt-4">1. Aceitação</h4>
      <p>Ao acessar e utilizar o Gerador de Currículos, você aceita e concorda em estar vinculado a estes termos.</p>
    </Modal>
  );
};