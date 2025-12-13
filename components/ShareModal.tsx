import React, { useState, useEffect } from 'react';
import { X, Copy, CheckCircle2, Share2, Link2, Facebook, Linkedin, Twitter, MessageCircle } from 'lucide-react';
import { ResumeData, TemplateType } from '../types';
import { generateShareLink, copyShareLink } from '../utils/shareLink';
import { analytics } from '../utils/analytics';

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  resumeData: ResumeData;
  template: TemplateType;
}

export const ShareModal: React.FC<ShareModalProps> = ({
  isOpen,
  onClose,
  resumeData,
  template,
}) => {
  const [shareLink, setShareLink] = useState('');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (isOpen) {
      const link = generateShareLink(resumeData, template);
      setShareLink(link);
      setCopied(false);
    }
  }, [isOpen, resumeData, template]);

  const handleCopy = async () => {
    const success = await copyShareLink(shareLink);
    if (success) {
      analytics.trackShareLink('copy');
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleSocialShare = (platform: string) => {
    analytics.trackShareLink(platform);
  };

  const shareUrl = encodeURIComponent(shareLink);
  const shareText = encodeURIComponent(`Confira meu currículo criado no Currículo Rápido!`);

  const socialLinks = {
    whatsapp: `https://api.whatsapp.com/send?text=${shareText}%20${shareUrl}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${shareUrl}`,
    twitter: `https://twitter.com/intent/tweet?text=${shareText}&url=${shareUrl}`,
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div
        className="bg-white rounded-2xl shadow-2xl max-w-md w-full"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white p-6 rounded-t-2xl flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-white/20 rounded-lg">
              <Share2 className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-xl font-bold">Compartilhar Currículo</h3>
              <p className="text-sm text-white/90">Compartilhe seu currículo com outras pessoas</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white/20 rounded-lg transition-colors"
            aria-label="Fechar"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4">
          {/* Link Input */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Link de Compartilhamento
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                value={shareLink}
                readOnly
                className="flex-1 px-4 py-2 border border-slate-300 rounded-lg bg-slate-50 text-sm"
                aria-label="Link de compartilhamento"
              />
              <button
                onClick={handleCopy}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${
                  copied
                    ? 'bg-emerald-600 text-white'
                    : 'bg-purple-600 text-white hover:bg-purple-700'
                }`}
                aria-label={copied ? 'Copiado' : 'Copiar link'}
              >
                {copied ? (
                  <>
                    <CheckCircle2 className="w-4 h-4" />
                    <span className="hidden sm:inline">Copiado!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    <span className="hidden sm:inline">Copiar</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Social Share Buttons */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-3">
              Compartilhar em Redes Sociais
            </label>
            <div className="grid grid-cols-2 gap-3">
              <a
                href={socialLinks.whatsapp}
                onClick={() => handleSocialShare('whatsapp')}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-center gap-2 px-4 py-3 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-all duration-200 font-medium shadow-sm hover:shadow-md transform hover:scale-105"
                aria-label="Compartilhar no WhatsApp"
              >
                <MessageCircle className="w-5 h-5 group-hover:scale-110 transition-transform" />
                <span>WhatsApp</span>
              </a>
              <a
                href={socialLinks.facebook}
                onClick={() => handleSocialShare('facebook')}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-center gap-2 px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-200 font-medium shadow-sm hover:shadow-md transform hover:scale-105"
                aria-label="Compartilhar no Facebook"
              >
                <Facebook className="w-5 h-5 group-hover:scale-110 transition-transform" />
                <span>Facebook</span>
              </a>
              <a
                href={socialLinks.linkedin}
                onClick={() => handleSocialShare('linkedin')}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-center gap-2 px-4 py-3 bg-blue-700 text-white rounded-lg hover:bg-blue-800 transition-all duration-200 font-medium shadow-sm hover:shadow-md transform hover:scale-105"
                aria-label="Compartilhar no LinkedIn"
              >
                <Linkedin className="w-5 h-5 group-hover:scale-110 transition-transform" />
                <span>LinkedIn</span>
              </a>
              <a
                href={socialLinks.twitter}
                onClick={() => handleSocialShare('twitter')}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-center gap-2 px-4 py-3 bg-sky-500 text-white rounded-lg hover:bg-sky-600 transition-all duration-200 font-medium shadow-sm hover:shadow-md transform hover:scale-105"
                aria-label="Compartilhar no Twitter/X"
              >
                <Twitter className="w-5 h-5 group-hover:scale-110 transition-transform" />
                <span>Twitter</span>
              </a>
            </div>
            <p className="mt-3 text-xs text-slate-500 text-center">
              Compartilhe seu currículo e ajude outras pessoas a criarem o delas!
            </p>
          </div>

          {/* Info */}
          <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
            <p className="text-xs text-slate-600">
              <Link2 className="w-3 h-3 inline mr-1" />
              Qualquer pessoa com este link poderá visualizar e editar seu currículo.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

