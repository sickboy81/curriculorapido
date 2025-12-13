import React, { useState, useRef } from 'react';
import { ResumeData, Experience, Education, Language } from '../types';
import { 
  Plus, Trash2, MapPin, Briefcase, GraduationCap, User, Phone, Globe, Mail, 
  ChevronDown, CheckCircle2, List, Lightbulb, Languages, X, ArrowUp, ArrowDown, Palette,
  Layout, Camera, Upload, Loader2
} from 'lucide-react';
import { pt } from '../translations-pt';
import { optimizeImage, validateImageFile } from '../utils/imageOptimizer';
import { sanitizeText, sanitizeEmail, sanitizePhone, sanitizeURL } from '../utils/sanitize';
import { RichTextEditor } from './RichTextEditor';
import { Tooltip } from './Tooltip';
import { validateEmail, validatePhone, validateURL } from '../utils/validators';

interface ResumeFormProps {
  data: ResumeData;
  onChange: (data: ResumeData) => void;
}

// Helper interface for FormSection props
interface FormSectionProps {
  title: string;
  subtitle?: string;
  icon: React.ElementType;
  isOpen: boolean;
  onToggle: () => void;
  isComplete?: boolean;
}

// Helper component for collapsible sections
const FormSection = ({ 
  title, 
  subtitle,
  icon: Icon, 
  isOpen, 
  onToggle, 
  children,
  isComplete = false
}: React.PropsWithChildren<FormSectionProps>) => (
  <div className={`bg-white rounded-xl border transition-all duration-300 overflow-hidden ${isOpen ? 'border-purple-500 shadow-lg ring-1 ring-purple-100' : 'border-slate-200 hover:border-slate-300 hover:shadow-sm'}`}>
    <button 
      onClick={onToggle} 
      className={`w-full flex items-center justify-between p-5 transition-colors ${isOpen ? 'bg-slate-50' : 'bg-white hover:bg-slate-50'}`}
    >
      <div className="flex items-center gap-4">
        <div className={`p-2.5 rounded-xl transition-colors ${isOpen ? 'bg-purple-600 text-white shadow-sm' : 'bg-slate-100 text-slate-500 group-hover:bg-slate-200'}`}>
           <Icon size={20} />
        </div>
        <div className="text-left">
          <h3 className={`font-bold text-sm sm:text-base ${isOpen ? 'text-slate-900' : 'text-slate-700'}`}>{title}</h3>
          {subtitle && <p className="text-xs text-slate-500 font-medium mt-0.5">{subtitle}</p>}
        </div>
      </div>
      <div className="flex items-center gap-3">
        {isComplete && !isOpen && (
          <span className="flex items-center gap-1 text-xs font-medium text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full border border-emerald-100">
            <CheckCircle2 className="w-3 h-3" />
            <span className="hidden sm:inline">Ok</span>
          </span>
        )}
        <ChevronDown className={`w-5 h-5 text-slate-400 transition-transform duration-300 ${isOpen ? 'rotate-180 text-purple-600' : ''}`} />
      </div>
    </button>
    
    <div className={`transition-all duration-300 ease-in-out ${isOpen ? 'max-h-[3000px] opacity-100 translate-y-0' : 'max-h-0 opacity-0 translate-y-[-10px] overflow-hidden'}`}>
      <div className="p-5 sm:p-6 border-t border-slate-100 bg-white">
        {children}
      </div>
    </div>
  </div>
);

export const ResumeForm: React.FC<ResumeFormProps> = ({ data, onChange }) => {
  const [activeSection, setActiveSection] = useState<string | null>('personal');
  const [skillInput, setSkillInput] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  const toggleSection = (section: string) => {
    setActiveSection(activeSection === section ? null : section);
  };

  const handleChange = (field: keyof ResumeData, value: any) => {
    // Sanitize values based on field type
    let sanitizedValue = value;
    const errors = { ...fieldErrors };
    
    if (typeof value === 'string') {
      switch (field) {
        case 'email':
          sanitizedValue = sanitizeEmail(value);
          if (value && value.length > 0) {
            const validation = validateEmail(sanitizedValue);
            if (!validation.isValid) {
              errors.email = validation.message || '';
            } else {
              delete errors.email;
            }
          } else {
            delete errors.email;
          }
          break;
        case 'phone':
          sanitizedValue = sanitizePhone(value);
          if (value && value.length > 0) {
            const validation = validatePhone(sanitizedValue);
            if (!validation.isValid) {
              errors.phone = validation.message || '';
            } else {
              delete errors.phone;
            }
          } else {
            delete errors.phone;
          }
          break;
        case 'website':
          sanitizedValue = sanitizeURL(value);
          if (value && value.length > 0) {
            const validation = validateURL(sanitizedValue);
            if (!validation.isValid) {
              errors.website = validation.message || '';
            } else {
              delete errors.website;
            }
          } else {
            delete errors.website;
          }
          break;
        case 'fullName':
        case 'title':
        case 'location':
        case 'summary':
          sanitizedValue = sanitizeText(value);
          break;
        default:
          sanitizedValue = sanitizeText(value);
      }
    }
    
    setFieldErrors(errors);
    onChange({ ...data, [field]: sanitizedValue });
  };

  // --- Photo Handler ---
  const [isOptimizingPhoto, setIsOptimizingPhoto] = useState(false);
  
  const handlePhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Check size (limit to 5MB before optimization)
      if (file.size > 5 * 1024 * 1024) {
        alert("A imagem deve ter no máximo 5MB.");
        return;
      }

      setIsOptimizingPhoto(true);
      try {
        // Optimize image (compress and resize)
        const optimizedDataUrl = await optimizeImage(file, {
          maxWidth: 400,
          maxHeight: 400,
          quality: 0.85,
          format: 'jpeg',
        });
        handleChange('photo', optimizedDataUrl);
      } catch (error) {
        console.error('Error optimizing image:', error);
        // Fallback to original if optimization fails
        const reader = new FileReader();
        reader.onloadend = () => {
          handleChange('photo', reader.result as string);
        };
        reader.readAsDataURL(file);
      } finally {
        setIsOptimizingPhoto(false);
      }
    }
  };

  const removePhoto = () => {
    handleChange('photo', '');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  // --- Reordering Handlers ---

  const moveItem = <T,>(array: T[], index: number, direction: 'up' | 'down'): T[] => {
    if (direction === 'up' && index === 0) return array;
    if (direction === 'down' && index === array.length - 1) return array;
    
    const newArray = [...array];
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    [newArray[index], newArray[targetIndex]] = [newArray[targetIndex], newArray[index]];
    return newArray;
  };

  // --- Experience Logic ---

  const handleExperienceChange = (id: string, field: keyof Experience, value: string) => {
    const sanitizedValue = sanitizeText(value);
    const newExp = data.experience.map(exp => 
      exp.id === id ? { ...exp, [field]: sanitizedValue } : exp
    );
    handleChange('experience', newExp);
  };

  const addExperience = () => {
    const newExp: Experience = {
      id: Date.now().toString(),
      role: '',
      company: '',
      dates: '',
      location: '',
      description: ''
    };
    handleChange('experience', [...data.experience, newExp]);
    setActiveSection('experience');
  };

  const removeExperience = (id: string) => {
    handleChange('experience', data.experience.filter(exp => exp.id !== id));
  };

  const moveExperience = (index: number, direction: 'up' | 'down') => {
    const newExp = moveItem(data.experience, index, direction);
    handleChange('experience', newExp);
  };

  // --- Education Logic ---

  const handleEducationChange = (id: string, field: keyof Education, value: string) => {
    const sanitizedValue = sanitizeText(value);
    const newEdu = data.education.map(edu => 
      edu.id === id ? { ...edu, [field]: sanitizedValue } : edu
    );
    handleChange('education', newEdu);
  };

  const addEducation = () => {
    const newEdu: Education = {
      id: Date.now().toString(),
      degree: '',
      school: '',
      dates: '',
      description: ''
    };
    handleChange('education', [...data.education, newEdu]);
    setActiveSection('education');
  };

  const removeEducation = (id: string) => {
    handleChange('education', data.education.filter(edu => edu.id !== id));
  };

  const moveEducation = (index: number, direction: 'up' | 'down') => {
    const newEdu = moveItem(data.education, index, direction);
    handleChange('education', newEdu);
  };

  // --- Language Logic ---

  const handleLanguageChange = (id: string, field: keyof Language, value: string) => {
    const currentLanguages = data.languages || [];
    const sanitizedValue = sanitizeText(value);
    const newLangs = currentLanguages.map(lang => 
      lang.id === id ? { ...lang, [field]: sanitizedValue } : lang
    );
    handleChange('languages', newLangs);
  };

  const addLanguage = () => {
    const currentLanguages = data.languages || [];
    const newLang: Language = {
      id: Date.now().toString(),
      name: '',
      proficiency: 'Intermediário'
    };
    handleChange('languages', [...currentLanguages, newLang]);
    setActiveSection('languages');
  };

  const removeLanguage = (id: string) => {
    const currentLanguages = data.languages || [];
    handleChange('languages', currentLanguages.filter(lang => lang.id !== id));
  };

  // --- Skills Logic ---
  const getSkillsArray = () => data.skills ? data.skills.split(',').map(s => s.trim()).filter(Boolean) : [];

  const addSkill = () => {
    const val = skillInput.trim();
    if (!val) return;
    const currentSkills = getSkillsArray();
    if (!currentSkills.includes(val)) {
      handleChange('skills', [...currentSkills, val].join(', '));
    }
    setSkillInput('');
  };

  const removeSkill = (skillToRemove: string) => {
    const currentSkills = getSkillsArray();
    handleChange('skills', currentSkills.filter(s => s !== skillToRemove).join(', '));
  };

  const handleSkillKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addSkill();
    }
  };

  const addSuggestedSkill = (skill: string) => {
    const currentSkills = getSkillsArray();
    if (!currentSkills.includes(skill)) {
      handleChange('skills', [...currentSkills, skill].join(', '));
    }
  };

  // Helper input classes
  const getInputClass = (field: string = '') => {
    const baseClass = "w-full p-3 bg-slate-50 border rounded-lg text-sm text-slate-800 placeholder:text-slate-400 focus:ring-2 focus:ring-purple-500/20 focus:bg-white transition-all duration-200 outline-none hover:shadow-sm focus:shadow-md";
    const errorClass = "border-red-300 focus:border-red-500";
    const validClass = "border-slate-200 focus:border-purple-500 hover:border-slate-300";
    
    if (field && fieldErrors[field]) {
      return `${baseClass} ${errorClass}`;
    }
    return `${baseClass} ${validClass}`;
  };
  const inputClass = getInputClass(); // Para compatibilidade com campos que não precisam de validação
  const labelClass = "block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 ml-1";

  // Reusable Action Button for moving items
  const MoveButton = ({ onClick, icon: Icon, disabled, tooltip }: { onClick: () => void, icon: React.ElementType, disabled: boolean, tooltip: string }) => (
    <Tooltip content={tooltip} position="top">
      <button 
        onClick={(e) => { e.stopPropagation(); onClick(); }}
        disabled={disabled}
        className="p-1.5 text-slate-400 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition-all disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-slate-400 hover:scale-110 active:scale-95"
      >
        <Icon className="w-4 h-4" />
      </button>
    </Tooltip>
  );

  return (
    <div className="space-y-6">
      
      {/* Design / Appearance Section */}
      <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm">
        <h3 className="flex items-center gap-2 text-sm font-bold text-slate-800 uppercase mb-4">
          <Palette className="w-4 h-4 text-purple-600" />
          {pt('form.appearance')}
        </h3>
        <Tooltip content="Clique no círculo para escolher uma cor personalizada para o tema do seu currículo" position="right">
          <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-xl border border-slate-100 hover:border-purple-200 transition-colors">
            <div className="relative w-12 h-12 rounded-full overflow-hidden shadow-sm ring-2 ring-white border border-slate-200 flex-shrink-0 cursor-pointer hover:scale-110 transition-transform group hover:shadow-md">
              <input 
                type="color" 
                value={data.themeColor || '#7c3aed'}
                onChange={(e) => handleChange('themeColor', e.target.value)}
                className="absolute inset-0 w-[150%] h-[150%] -top-1/4 -left-1/4 cursor-pointer p-0 border-0"
                title="Escolha a cor do tema"
              />
            </div>
            <div className="flex-1">
              <label className="text-sm font-semibold text-slate-900 block">{pt('form.color')}</label>
              <p className="text-xs text-slate-500 mt-1">{pt('form.colorDesc')}</p>
            </div>
          </div>
        </Tooltip>
      </div>

      <div className="space-y-3">
        {/* Personal Info */}
        <FormSection 
          title={pt('form.personal')} 
          subtitle={pt('form.personalSub')}
          icon={User} 
          isOpen={activeSection === 'personal'} 
          onToggle={() => toggleSection('personal')}
          isComplete={!!(data.fullName && data.email)}
        >
          <div className="space-y-5 animate-in fade-in slide-in-from-top-2 duration-300">
            
            {/* Photo Upload Section */}
            <div className="flex items-center gap-5 p-4 bg-slate-50 rounded-xl border border-slate-100 mb-4">
               <div className="relative shrink-0">
                  <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-white shadow-md bg-slate-200 flex items-center justify-center">
                    {data.photo ? (
                      <img src={data.photo} alt="Preview" className="w-full h-full object-cover" />
                    ) : (
                      <Camera className="w-6 h-6 text-slate-400" />
                    )}
                  </div>
               </div>
               <div className="flex-1">
                 <label className="text-sm font-semibold text-slate-900 block mb-1">{pt('form.photoLabel')}</label>
                 <div className="flex gap-2">
                    <Tooltip content="Recomendado: foto profissional 3x4, fundo neutro, boa iluminação" position="top">
                      <button 
                        onClick={() => fileInputRef.current?.click()}
                        disabled={isOptimizingPhoto}
                        className="text-xs flex items-center gap-1.5 px-3 py-1.5 bg-white border border-slate-300 rounded-md hover:bg-slate-50 hover:text-purple-600 transition-all shadow-sm text-slate-600 hover:shadow-md hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {isOptimizingPhoto ? (
                          <>
                            <Loader2 className="w-3.5 h-3.5 animate-spin" />
                            Otimizando...
                          </>
                        ) : (
                          <>
                            <Upload className="w-3.5 h-3.5" />
                            {data.photo ? pt('form.changePhoto') : pt('form.addPhoto')}
                          </>
                        )}
                      </button>
                    </Tooltip>
                    {data.photo && (
                      <Tooltip content="Remover foto" position="top">
                        <button 
                          onClick={removePhoto}
                          className="text-xs flex items-center gap-1.5 px-3 py-1.5 bg-white border border-slate-300 rounded-md hover:bg-red-50 hover:text-red-600 hover:border-red-200 transition-all shadow-sm text-slate-600 hover:shadow-md hover:scale-105 active:scale-95"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                          {pt('form.remove')}
                        </button>
                      </Tooltip>
                    )}
                 </div>
                 <input 
                   type="file" 
                   ref={fileInputRef}
                   onChange={handlePhotoUpload}
                   accept="image/*"
                   className="hidden"
                 />
                 <p className="text-[10px] text-slate-400 mt-1.5">{pt('form.recPhoto')}</p>
               </div>
            </div>

            <div className="grid grid-cols-1 gap-5">
              <div>
                <label className={labelClass}>
                  {pt('form.fullName')}
                  <Tooltip content="Use seu nome completo como aparece em documentos oficiais" position="right">
                    <span className="ml-1.5 inline-flex items-center justify-center w-4 h-4 rounded-full bg-slate-200 text-slate-500 text-[10px] font-bold cursor-help hover:bg-slate-300 transition-colors">?</span>
                  </Tooltip>
                </label>
                <input 
                  type="text" 
                  value={data.fullName}
                  onChange={(e) => handleChange('fullName', e.target.value)}
                  className={getInputClass('fullName')}
                  spellCheck={true}
                  placeholder="Ex: João Silva Santos"
                />
              </div>
              <div>
                <label className={labelClass}>
                  {pt('form.jobTitle')}
                  <Tooltip content="Cargo ou área de atuação desejada. Ex: Desenvolvedor Frontend, Analista de Marketing" position="right">
                    <span className="ml-1.5 inline-flex items-center justify-center w-4 h-4 rounded-full bg-slate-200 text-slate-500 text-[10px] font-bold cursor-help hover:bg-slate-300 transition-colors">?</span>
                  </Tooltip>
                </label>
                <input 
                  type="text" 
                  value={data.title}
                  onChange={(e) => handleChange('title', e.target.value)}
                  className={getInputClass('title')}
                  spellCheck={true}
                  placeholder="Ex: Desenvolvedor Full Stack"
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className={labelClass}>
                    <span className="flex items-center gap-1">
                      <Mail className="w-3 h-3"/> {pt('form.email')}
                      <Tooltip content="Use um e-mail profissional. Evite apelidos ou números excessivos" position="right">
                        <span className="ml-1 inline-flex items-center justify-center w-4 h-4 rounded-full bg-slate-200 text-slate-500 text-[10px] font-bold cursor-help hover:bg-slate-300 transition-colors">?</span>
                      </Tooltip>
                    </span>
                  </label>
                  <input 
                    type="email" 
                    value={data.email}
                    onChange={(e) => handleChange('email', e.target.value)}
                    className={getInputClass('email')}
                    spellCheck={false}
                    placeholder="seu.email@exemplo.com"
                  />
                  {fieldErrors.email && (
                    <p className="text-xs text-red-600 mt-1 ml-1">{fieldErrors.email}</p>
                  )}
                </div>
                <div>
                  <label className={labelClass}>
                    <span className="flex items-center gap-1">
                      <Phone className="w-3 h-3"/> {pt('form.phone')}
                      <Tooltip content="Formato: (11) 98765-4321 ou +55 11 98765-4321" position="right">
                        <span className="ml-1 inline-flex items-center justify-center w-4 h-4 rounded-full bg-slate-200 text-slate-500 text-[10px] font-bold cursor-help hover:bg-slate-300 transition-colors">?</span>
                      </Tooltip>
                    </span>
                  </label>
                  <input 
                    type="text" 
                    value={data.phone}
                    onChange={(e) => handleChange('phone', e.target.value)}
                    className={getInputClass('phone')}
                    spellCheck={false}
                    placeholder="(11) 98765-4321"
                  />
                  {fieldErrors.phone && (
                    <p className="text-xs text-red-600 mt-1 ml-1">{fieldErrors.phone}</p>
                  )}
                </div>
                <div>
                  <label className={labelClass}><span className="flex items-center gap-1"><MapPin className="w-3 h-3"/> {pt('form.location')}</span></label>
                  <input 
                    type="text" 
                    value={data.location}
                    onChange={(e) => handleChange('location', e.target.value)}
                    className={getInputClass('location')}
                    spellCheck={true}
                  />
                </div>
                <div>
                  <label className={labelClass}><span className="flex items-center gap-1"><Globe className="w-3 h-3"/> {pt('form.website')}</span></label>
                  <input 
                    type="text" 
                    value={data.website}
                    onChange={(e) => handleChange('website', e.target.value)}
                    className={getInputClass('website')}
                    spellCheck={false}
                    placeholder="exemplo.com ou https://exemplo.com"
                  />
                  {fieldErrors.website && (
                    <p className="text-xs text-red-600 mt-1 ml-1">{fieldErrors.website}</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </FormSection>

        {/* Summary */}
        <FormSection 
          title={pt('form.summary')} 
          subtitle={pt('form.summarySub')}
          icon={List} 
          isOpen={activeSection === 'summary'} 
          onToggle={() => toggleSection('summary')}
          isComplete={!!data.summary}
        >
          <div>
            <RichTextEditor
              value={data.summary}
              onChange={(value) => handleChange('summary', value)}
              placeholder={pt('form.bioPlaceholder')}
              label={pt('form.bioLabel')}
              maxLength={500}
            />
          </div>
        </FormSection>

        {/* Experience */}
        <FormSection 
          title={pt('form.experience')} 
          subtitle={pt('form.experienceSub')}
          icon={Briefcase} 
          isOpen={activeSection === 'experience'} 
          onToggle={() => toggleSection('experience')}
          isComplete={data.experience.length > 0}
        >
          <div className="mb-6 p-4 bg-blue-50 border border-blue-100 rounded-lg flex gap-3 text-sm text-blue-800 shadow-sm">
            <Lightbulb className="w-5 h-5 shrink-0 text-blue-600 mt-0.5" />
            <p className="leading-relaxed">
              {pt('form.expTip')}
            </p>
          </div>

          <div className="space-y-6">
            {data.experience.map((exp, index) => (
              <div key={exp.id} className="relative bg-white border border-slate-200 rounded-xl p-5 hover:shadow-md transition-all duration-200 hover:border-purple-300 group">
                {/* Header Action Bar */}
                <div className="flex justify-between items-center mb-4 pb-3 border-b border-slate-100">
                  <div className="flex items-center gap-3">
                     <span className="flex items-center justify-center w-6 h-6 bg-slate-100 rounded-full text-xs font-bold text-slate-500">
                        {index + 1}
                     </span>
                     <span className="font-semibold text-slate-700 text-sm truncate max-w-[150px] sm:max-w-xs">
                        {exp.role || 'Nova Experiência'}
                     </span>
                  </div>
                  <div className="flex gap-1">
                    <MoveButton onClick={() => moveExperience(index, 'up')} icon={ArrowUp} disabled={index === 0} tooltip="Mover para cima" />
                    <MoveButton onClick={() => moveExperience(index, 'down')} icon={ArrowDown} disabled={index === data.experience.length - 1} tooltip="Mover para baixo" />
                    <div className="w-px h-4 bg-slate-200 mx-1 self-center"></div>
                    <Tooltip content="Remover experiência" position="top">
                      <button 
                        onClick={() => removeExperience(exp.id)}
                        className="p-1.5 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all hover:scale-110 active:scale-95"
                        title="Remover"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </Tooltip>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className={labelClass}>
                      {pt('form.role')}
                      <Tooltip content="Nome exato do cargo que você ocupou" position="right">
                        <span className="ml-1.5 inline-flex items-center justify-center w-4 h-4 rounded-full bg-slate-200 text-slate-500 text-[10px] font-bold cursor-help hover:bg-slate-300 transition-colors">?</span>
                      </Tooltip>
                    </label>
                    <input 
                      value={exp.role}
                      onChange={(e) => handleExperienceChange(exp.id, 'role', e.target.value)}
                      className={inputClass}
                      spellCheck={true}
                      placeholder="Ex: Desenvolvedor Frontend"
                    />
                  </div>
                  <div>
                    <label className={labelClass}>
                      {pt('form.company')}
                      <Tooltip content="Nome completo da empresa" position="right">
                        <span className="ml-1.5 inline-flex items-center justify-center w-4 h-4 rounded-full bg-slate-200 text-slate-500 text-[10px] font-bold cursor-help hover:bg-slate-300 transition-colors">?</span>
                      </Tooltip>
                    </label>
                    <input 
                      value={exp.company}
                      onChange={(e) => handleExperienceChange(exp.id, 'company', e.target.value)}
                      className={inputClass}
                      spellCheck={true}
                      placeholder="Ex: Empresa Tecnologia Ltda"
                    />
                  </div>
                  <div>
                    <label className={labelClass}>
                      {pt('form.period')}
                      <Tooltip content="Formato: Jan 2020 - Dez 2022 ou 2020 - 2022" position="right">
                        <span className="ml-1.5 inline-flex items-center justify-center w-4 h-4 rounded-full bg-slate-200 text-slate-500 text-[10px] font-bold cursor-help hover:bg-slate-300 transition-colors">?</span>
                      </Tooltip>
                    </label>
                    <input 
                      value={exp.dates}
                      onChange={(e) => handleExperienceChange(exp.id, 'dates', e.target.value)}
                      className={inputClass}
                      spellCheck={false}
                      placeholder="Jan 2020 - Dez 2022"
                    />
                  </div>
                  <div>
                    <label className={labelClass}>{pt('form.location')}</label>
                    <input 
                      value={exp.location}
                      onChange={(e) => handleExperienceChange(exp.id, 'location', e.target.value)}
                      className={inputClass}
                      spellCheck={true}
                    />
                  </div>
                </div>
                
                <div>
                  <RichTextEditor
                    value={exp.description}
                    onChange={(value) => handleExperienceChange(exp.id, 'description', value)}
                    placeholder="Descreva suas responsabilidades, conquistas e resultados alcançados..."
                    label={pt('form.desc')}
                    maxLength={1000}
                  />
                </div>
              </div>
            ))}

            <Tooltip content="Adicione suas experiências profissionais mais relevantes" position="top">
              <button 
                onClick={addExperience}
                className="w-full py-4 flex flex-col items-center justify-center gap-2 text-sm font-medium text-slate-500 bg-slate-50 hover:bg-purple-50 hover:text-purple-600 rounded-xl transition-all border-2 border-dashed border-slate-200 hover:border-purple-300 group hover:shadow-md active:scale-[0.98]"
              >
                <div className="bg-white p-2 rounded-full shadow-sm border border-slate-200 group-hover:border-purple-200 group-hover:bg-purple-600 group-hover:text-white transition-all group-hover:scale-110">
                   <Plus className="w-5 h-5" />
                </div>
                {pt('form.addExp')}
              </button>
            </Tooltip>
          </div>
        </FormSection>

        {/* Education */}
        <FormSection 
          title={pt('form.education')} 
          subtitle={pt('form.educationSub')}
          icon={GraduationCap} 
          isOpen={activeSection === 'education'} 
          onToggle={() => toggleSection('education')}
          isComplete={data.education.length > 0}
        >
          <div className="space-y-6">
            {data.education.map((edu, index) => (
              <div key={edu.id} className="relative bg-white border border-slate-200 rounded-xl p-5 hover:shadow-md transition-all duration-200 hover:border-purple-300 group">
                {/* Header Action Bar */}
                <div className="flex justify-between items-center mb-4 pb-3 border-b border-slate-100">
                  <div className="flex items-center gap-3">
                     <span className="flex items-center justify-center w-6 h-6 bg-slate-100 rounded-full text-xs font-bold text-slate-500">
                        {index + 1}
                     </span>
                     <span className="font-semibold text-slate-700 text-sm truncate max-w-[150px] sm:max-w-xs">
                        {edu.school || 'Nova Formação'}
                     </span>
                  </div>
                  <div className="flex gap-1">
                    <MoveButton onClick={() => moveEducation(index, 'up')} icon={ArrowUp} disabled={index === 0} tooltip="Mover para cima" />
                    <MoveButton onClick={() => moveEducation(index, 'down')} icon={ArrowDown} disabled={index === data.education.length - 1} tooltip="Mover para baixo" />
                    <div className="w-px h-4 bg-slate-200 mx-1 self-center"></div>
                    <Tooltip content="Remover formação" position="top">
                      <button 
                        onClick={() => removeEducation(edu.id)}
                        className="p-1.5 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all hover:scale-110 active:scale-95"
                        title="Remover"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </Tooltip>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div className="md:col-span-2">
                    <label className={labelClass}>{pt('form.degree')}</label>
                    <input 
                      value={edu.degree}
                      onChange={(e) => handleEducationChange(edu.id, 'degree', e.target.value)}
                      className={`${inputClass} font-medium`}
                      spellCheck={true}
                    />
                  </div>
                  <div>
                    <label className={labelClass}>{pt('form.school')}</label>
                    <input 
                      value={edu.school}
                      onChange={(e) => handleEducationChange(edu.id, 'school', e.target.value)}
                      className={inputClass}
                      spellCheck={true}
                    />
                  </div>
                  <div>
                    <label className={labelClass}>{pt('form.gradYear')}</label>
                    <input 
                      value={edu.dates}
                      onChange={(e) => handleEducationChange(edu.id, 'dates', e.target.value)}
                      className={inputClass}
                      spellCheck={false}
                    />
                  </div>
                </div>
                
                <div>
                  <RichTextEditor
                    value={edu.description}
                    onChange={(value) => handleEducationChange(edu.id, 'description', value)}
                    placeholder="Informações adicionais sobre sua formação..."
                    label={pt('form.details')}
                    maxLength={500}
                  />
                </div>
              </div>
            ))}
            
            <Tooltip content="Adicione sua formação acadêmica e cursos relevantes" position="top">
              <button 
                onClick={addEducation}
                className="w-full py-4 flex flex-col items-center justify-center gap-2 text-sm font-medium text-slate-500 bg-slate-50 hover:bg-purple-50 hover:text-purple-600 rounded-xl transition-all border-2 border-dashed border-slate-200 hover:border-purple-300 group hover:shadow-md active:scale-[0.98]"
              >
                <div className="bg-white p-2 rounded-full shadow-sm border border-slate-200 group-hover:border-purple-200 group-hover:bg-purple-600 group-hover:text-white transition-all group-hover:scale-110">
                   <Plus className="w-5 h-5" />
                </div>
                {pt('form.addEdu')}
              </button>
            </Tooltip>
          </div>
        </FormSection>

        {/* Languages */}
        <FormSection 
          title={pt('form.languages')} 
          subtitle={pt('form.languagesSub')}
          icon={Languages} 
          isOpen={activeSection === 'languages'} 
          onToggle={() => toggleSection('languages')}
          isComplete={(data.languages || []).length > 0}
        >
          <div className="space-y-4">
            {(data.languages || []).map((lang, index) => (
              <div key={lang.id} className="relative bg-white border border-slate-200 rounded-xl p-4 hover:shadow-md transition-all duration-200 hover:border-purple-300 group">
                <div className="flex items-center gap-4">
                  <div className="hidden sm:flex items-center justify-center w-8 h-8 bg-slate-50 rounded-lg text-xs font-bold text-slate-400">
                    {index + 1}
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 flex-1">
                    <div>
                      <label className={labelClass}>{pt('form.lang')}</label>
                      <input 
                        value={lang.name}
                        onChange={(e) => handleLanguageChange(lang.id, 'name', e.target.value)}
                        className={inputClass}
                        spellCheck={true}
                      />
                    </div>
                    <div>
                      <label className={labelClass}>{pt('form.level')}</label>
                      <select
                        value={lang.proficiency}
                        onChange={(e) => handleLanguageChange(lang.id, 'proficiency', e.target.value)}
                        className={inputClass}
                      >
                        <option value="Básico">Básico / Basic</option>
                        <option value="Intermediário">Intermediário / Intermediate</option>
                        <option value="Avançado">Avançado / Advanced</option>
                        <option value="Fluente">Fluente / Fluent</option>
                        <option value="Nativo">Nativo / Native</option>
                      </select>
                    </div>
                  </div>
                  <Tooltip content="Remover idioma" position="top">
                    <button 
                      onClick={() => removeLanguage(lang.id)}
                      className="p-2 text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all self-center sm:self-end sm:mb-[2px] hover:scale-110 active:scale-95"
                      title="Remover"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </Tooltip>
                </div>
              </div>
            ))}
            
            <Tooltip content="Adicione os idiomas que você domina e seu nível de proficiência" position="top">
              <button 
                onClick={addLanguage}
                className="w-full py-3 flex items-center justify-center gap-2 text-sm font-medium text-slate-600 bg-slate-50 hover:bg-purple-50 hover:text-purple-600 rounded-xl transition-all border-2 border-dashed border-slate-200 hover:border-purple-300 group hover:shadow-md active:scale-[0.98]"
              >
                <div className="bg-white p-1 rounded-md shadow-sm border border-slate-200 group-hover:border-purple-200 group-hover:scale-110 transition-all">
                   <Plus className="w-4 h-4" />
                </div>
                {pt('form.addLang')}
              </button>
            </Tooltip>
          </div>
        </FormSection>

        {/* Skills (Tag System) */}
        <FormSection 
          title={pt('form.skills')} 
          subtitle={pt('form.skillsSub')}
          icon={CheckCircle2} 
          isOpen={activeSection === 'skills'} 
          onToggle={() => toggleSection('skills')}
          isComplete={data.skills.length > 5}
        >
          <div className="space-y-4">
            <label className={labelClass}>{pt('form.addSkill')}</label>
            
            <div className="flex gap-2">
              <Tooltip content="Digite uma habilidade e pressione Enter ou clique em Adicionar" position="top">
                <input 
                  type="text"
                  value={skillInput}
                  onChange={(e) => setSkillInput(e.target.value)}
                  onKeyDown={handleSkillKeyDown}
                  className={inputClass}
                  placeholder="Ex: JavaScript, Python, Gestão de Projetos..."
                />
              </Tooltip>
              <Tooltip content="Adicionar habilidade à lista" position="top">
                <button 
                  onClick={addSkill}
                  disabled={!skillInput.trim()}
                  className="px-5 py-2.5 bg-slate-900 text-white rounded-lg font-medium hover:bg-purple-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 shadow-sm hover:shadow-md hover:scale-105 active:scale-95"
                >
                  <Plus className="w-4 h-4" />
                  <span className="hidden sm:inline">{pt('form.add')}</span>
                </button>
              </Tooltip>
            </div>

            <div className="min-h-[80px] p-4 bg-slate-50 border border-slate-200 rounded-xl flex flex-wrap gap-2 content-start">
              {getSkillsArray().length === 0 && (
                 <div className="w-full h-full flex flex-col items-center justify-center text-slate-400 py-4 gap-2">
                    <Layout className="w-6 h-6 opacity-50" />
                    <span className="text-sm italic">{pt('form.emptySkills')}</span>
                 </div>
              )}
              {getSkillsArray().map((skill, index) => (
                <span 
                  key={index}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white border border-purple-100 rounded-lg text-sm font-medium text-purple-700 shadow-sm group animate-in zoom-in-95 duration-200 hover:border-purple-300 hover:shadow-md transition-all cursor-default"
                >
                  {skill}
                  <Tooltip content={`Remover ${skill}`} position="top">
                    <button 
                      onClick={() => removeSkill(skill)}
                      className="p-0.5 hover:bg-red-50 hover:text-red-500 rounded-md transition-all hover:scale-110 active:scale-95"
                      aria-label={`Remover ${skill}`}
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </Tooltip>
                </span>
              ))}
            </div>

            <div>
               <label className={`${labelClass} mt-4 mb-3 flex items-center gap-2`}>
                 <Lightbulb className="w-3.5 h-3.5 text-amber-500" />
                 {pt('form.suggestions')}
               </label>
               <div className="flex flex-wrap gap-2 pl-1">
                {['Leadership', 'Teamwork', 'Excel', 'Problem Solving', 'English', 'Communication', 'Scrum', 'Python', 'Sales'].map(s => (
                  <Tooltip content={`Adicionar ${s}`} position="top" key={s}>
                    <button 
                      onClick={() => addSuggestedSkill(s)}
                      disabled={getSkillsArray().includes(s)}
                      className="text-xs px-3 py-2 bg-white hover:bg-purple-50 text-slate-600 hover:text-purple-700 rounded-lg border border-slate-200 hover:border-purple-200 transition-all whitespace-nowrap disabled:opacity-50 disabled:cursor-default shadow-sm hover:shadow-md hover:scale-105 active:scale-95"
                    >
                      + {s}
                    </button>
                  </Tooltip>
                ))}
              </div>
            </div>
          </div>
        </FormSection>
      </div>
    </div>
  );
};