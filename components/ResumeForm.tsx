import React, { useState, useRef } from 'react';
import { ResumeData, Experience, Education, Language } from '../types';
import { 
  Plus, Trash2, MapPin, Briefcase, GraduationCap, User, Phone, Globe, Mail, 
  ChevronDown, CheckCircle2, List, Lightbulb, Languages, X, ArrowUp, ArrowDown, Palette,
  Layout, Camera, Upload
} from 'lucide-react';
import { useLanguage } from '../LanguageContext';

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
  <div className={`bg-white rounded-xl border transition-all duration-300 overflow-hidden ${isOpen ? 'border-purple-500 shadow-md ring-1 ring-purple-100' : 'border-slate-200 hover:border-slate-300'}`}>
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
    
    <div className={`transition-all duration-300 ease-in-out ${isOpen ? 'max-h-[3000px] opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}`}>
      <div className="p-5 sm:p-6 border-t border-slate-100 bg-white">
        {children}
      </div>
    </div>
  </div>
);

export const ResumeForm: React.FC<ResumeFormProps> = ({ data, onChange }) => {
  const { t } = useLanguage();
  const [activeSection, setActiveSection] = useState<string | null>('personal');
  const [skillInput, setSkillInput] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const toggleSection = (section: string) => {
    setActiveSection(activeSection === section ? null : section);
    // Track form interaction event
    if (typeof window !== 'undefined' && (window as any).gtag && activeSection === null) {
      (window as any).gtag('event', 'form_interaction', {
        section: section,
        action: 'open'
      });
    }
  };

  const handleChange = (field: keyof ResumeData, value: any) => {
    onChange({ ...data, [field]: value });
    // Track form interaction on first change
    if (typeof window !== 'undefined' && (window as any).gtag && field === 'fullName' && value) {
      (window as any).gtag('event', 'form_interaction', {
        field: field,
        action: 'fill'
      });
    }
  };

  // --- Photo Handler ---
  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Check size (limit to 2MB)
      if (file.size > 2 * 1024 * 1024) {
        alert("A imagem deve ter no máximo 2MB.");
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        handleChange('photo', reader.result as string);
      };
      reader.readAsDataURL(file);
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
    const newExp = data.experience.map(exp => 
      exp.id === id ? { ...exp, [field]: value } : exp
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
    const newEdu = data.education.map(edu => 
      edu.id === id ? { ...edu, [field]: value } : edu
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
    const newLangs = currentLanguages.map(lang => 
      lang.id === id ? { ...lang, [field]: value } : lang
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
  const inputClass = "w-full p-3 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-800 placeholder:text-slate-400 focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 focus:bg-white transition-all outline-none hover:border-slate-300";
  const labelClass = "block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 ml-1";

  // Reusable Action Button for moving items
  const MoveButton = ({ onClick, icon: Icon, disabled }: { onClick: () => void, icon: React.ElementType, disabled: boolean }) => (
    <button 
      onClick={(e) => { e.stopPropagation(); onClick(); }}
      disabled={disabled}
      className="p-1.5 text-slate-400 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition-colors disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-slate-400"
    >
      <Icon className="w-4 h-4" />
    </button>
  );

  return (
    <div className="space-y-6">
      
      {/* Design / Appearance Section */}
      <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm">
        <h3 className="flex items-center gap-2 text-sm font-bold text-slate-800 uppercase mb-4">
          <Palette className="w-4 h-4 text-purple-600" />
          {t('form.appearance')}
        </h3>
        <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-xl border border-slate-100">
            <div className="relative w-12 h-12 rounded-full overflow-hidden shadow-sm ring-2 ring-white border border-slate-200 flex-shrink-0 cursor-pointer hover:scale-105 transition-transform group">
              <input 
                type="color" 
                value={data.themeColor || '#7c3aed'}
                onChange={(e) => handleChange('themeColor', e.target.value)}
                className="absolute inset-0 w-[150%] h-[150%] -top-1/4 -left-1/4 cursor-pointer p-0 border-0"
                title="Escolha a cor do tema"
              />
            </div>
            <div className="flex-1">
              <label className="text-sm font-semibold text-slate-900 block">{t('form.color')}</label>
              <p className="text-xs text-slate-500 mt-1">{t('form.colorDesc')}</p>
            </div>
        </div>
      </div>

      <div className="space-y-3">
        {/* Personal Info */}
        <FormSection 
          title={t('form.personal')} 
          subtitle={t('form.personalSub')}
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
                      <img src={data.photo} alt={data.fullName ? `Foto de perfil de ${data.fullName}` : "Foto de perfil do currículo"} className="w-full h-full object-cover" />
                    ) : (
                      <Camera className="w-6 h-6 text-slate-400" />
                    )}
                  </div>
               </div>
               <div className="flex-1">
                 <label className="text-sm font-semibold text-slate-900 block mb-1">{t('form.photoLabel')}</label>
                 <div className="flex gap-2">
                    <button 
                      onClick={() => fileInputRef.current?.click()}
                      className="text-xs flex items-center gap-1.5 px-3 py-1.5 bg-white border border-slate-300 rounded-md hover:bg-slate-50 hover:text-purple-600 transition-colors shadow-sm text-slate-600"
                    >
                      <Upload className="w-3.5 h-3.5" />
                      {data.photo ? t('form.changePhoto') : t('form.addPhoto')}
                    </button>
                    {data.photo && (
                      <button 
                        onClick={removePhoto}
                        className="text-xs flex items-center gap-1.5 px-3 py-1.5 bg-white border border-slate-300 rounded-md hover:bg-red-50 hover:text-red-600 hover:border-red-200 transition-colors shadow-sm text-slate-600"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        {t('form.remove')}
                      </button>
                    )}
                 </div>
                 <input 
                   type="file" 
                   ref={fileInputRef}
                   onChange={handlePhotoUpload}
                   accept="image/*"
                   className="hidden"
                 />
                 <p className="text-[10px] text-slate-400 mt-1.5">{t('form.recPhoto')}</p>
               </div>
            </div>

            <div className="grid grid-cols-1 gap-5">
              <div>
                <label className={labelClass}>{t('form.fullName')}</label>
                <input 
                  type="text" 
                  value={data.fullName}
                  onChange={(e) => handleChange('fullName', e.target.value)}
                  className={inputClass}
                  spellCheck={true}
                />
              </div>
              <div>
                <label className={labelClass}>{t('form.jobTitle')}</label>
                <input 
                  type="text" 
                  value={data.title}
                  onChange={(e) => handleChange('title', e.target.value)}
                  className={inputClass}
                  spellCheck={true}
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className={labelClass}><span className="flex items-center gap-1"><Mail className="w-3 h-3"/> {t('form.email')}</span></label>
                  <input 
                    type="email" 
                    value={data.email}
                    onChange={(e) => handleChange('email', e.target.value)}
                    className={inputClass}
                    spellCheck={false}
                  />
                </div>
                <div>
                  <label className={labelClass}><span className="flex items-center gap-1"><Phone className="w-3 h-3"/> {t('form.phone')}</span></label>
                  <input 
                    type="text" 
                    value={data.phone}
                    onChange={(e) => handleChange('phone', e.target.value)}
                    className={inputClass}
                    spellCheck={false}
                  />
                </div>
                <div>
                  <label className={labelClass}><span className="flex items-center gap-1"><MapPin className="w-3 h-3"/> {t('form.location')}</span></label>
                  <input 
                    type="text" 
                    value={data.location}
                    onChange={(e) => handleChange('location', e.target.value)}
                    className={inputClass}
                    spellCheck={true}
                  />
                </div>
                <div>
                  <label className={labelClass}><span className="flex items-center gap-1"><Globe className="w-3 h-3"/> {t('form.website')}</span></label>
                  <input 
                    type="text" 
                    value={data.website}
                    onChange={(e) => handleChange('website', e.target.value)}
                    className={inputClass}
                    spellCheck={false}
                  />
                </div>
              </div>
            </div>
          </div>
        </FormSection>

        {/* Summary */}
        <FormSection 
          title={t('form.summary')} 
          subtitle={t('form.summarySub')}
          icon={List} 
          isOpen={activeSection === 'summary'} 
          onToggle={() => toggleSection('summary')}
          isComplete={!!data.summary}
        >
          <div>
            <label className={labelClass}>{t('form.bioLabel')}</label>
            <textarea 
              value={data.summary}
              onChange={(e) => handleChange('summary', e.target.value)}
              rows={5}
              className={`${inputClass} leading-relaxed resize-y min-h-[120px]`}
              placeholder={t('form.bioPlaceholder')}
              spellCheck={true}
            />
          </div>
        </FormSection>

        {/* Experience */}
        <FormSection 
          title={t('form.experience')} 
          subtitle={t('form.experienceSub')}
          icon={Briefcase} 
          isOpen={activeSection === 'experience'} 
          onToggle={() => toggleSection('experience')}
          isComplete={data.experience.length > 0}
        >
          <div className="mb-6 p-4 bg-blue-50 border border-blue-100 rounded-lg flex gap-3 text-sm text-blue-800 shadow-sm">
            <Lightbulb className="w-5 h-5 shrink-0 text-blue-600 mt-0.5" />
            <p className="leading-relaxed">
              {t('form.expTip')}
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
                    <MoveButton onClick={() => moveExperience(index, 'up')} icon={ArrowUp} disabled={index === 0} />
                    <MoveButton onClick={() => moveExperience(index, 'down')} icon={ArrowDown} disabled={index === data.experience.length - 1} />
                    <div className="w-px h-4 bg-slate-200 mx-1 self-center"></div>
                    <button 
                      onClick={() => removeExperience(exp.id)}
                      className="p-1.5 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                      title="Remover"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className={labelClass}>{t('form.role')}</label>
                    <input 
                      value={exp.role}
                      onChange={(e) => handleExperienceChange(exp.id, 'role', e.target.value)}
                      className={inputClass}
                      spellCheck={true}
                    />
                  </div>
                  <div>
                    <label className={labelClass}>{t('form.company')}</label>
                    <input 
                      value={exp.company}
                      onChange={(e) => handleExperienceChange(exp.id, 'company', e.target.value)}
                      className={inputClass}
                      spellCheck={true}
                    />
                  </div>
                  <div>
                    <label className={labelClass}>{t('form.period')}</label>
                    <input 
                      value={exp.dates}
                      onChange={(e) => handleExperienceChange(exp.id, 'dates', e.target.value)}
                      className={inputClass}
                      spellCheck={false}
                    />
                  </div>
                  <div>
                    <label className={labelClass}>{t('form.location')}</label>
                    <input 
                      value={exp.location}
                      onChange={(e) => handleExperienceChange(exp.id, 'location', e.target.value)}
                      className={inputClass}
                      spellCheck={true}
                    />
                  </div>
                </div>
                
                <div>
                  <label className={labelClass}>{t('form.desc')}</label>
                  <textarea 
                    value={exp.description}
                    onChange={(e) => handleExperienceChange(exp.id, 'description', e.target.value)}
                    rows={4}
                    className={`${inputClass} min-h-[100px] font-normal`}
                    spellCheck={true}
                  />
                </div>
              </div>
            ))}

            <button 
              onClick={addExperience}
              className="w-full py-4 flex flex-col items-center justify-center gap-2 text-sm font-medium text-slate-500 bg-slate-50 hover:bg-purple-50 hover:text-purple-600 rounded-xl transition-all border-2 border-dashed border-slate-200 hover:border-purple-300 group"
            >
              <div className="bg-white p-2 rounded-full shadow-sm border border-slate-200 group-hover:border-purple-200 group-hover:bg-purple-600 group-hover:text-white transition-all">
                 <Plus className="w-5 h-5" />
              </div>
              {t('form.addExp')}
            </button>
          </div>
        </FormSection>

        {/* Education */}
        <FormSection 
          title={t('form.education')} 
          subtitle={t('form.educationSub')}
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
                    <MoveButton onClick={() => moveEducation(index, 'up')} icon={ArrowUp} disabled={index === 0} />
                    <MoveButton onClick={() => moveEducation(index, 'down')} icon={ArrowDown} disabled={index === data.education.length - 1} />
                    <div className="w-px h-4 bg-slate-200 mx-1 self-center"></div>
                    <button 
                      onClick={() => removeEducation(edu.id)}
                      className="p-1.5 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                      title="Remover"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div className="md:col-span-2">
                    <label className={labelClass}>{t('form.degree')}</label>
                    <input 
                      value={edu.degree}
                      onChange={(e) => handleEducationChange(edu.id, 'degree', e.target.value)}
                      className={`${inputClass} font-medium`}
                      spellCheck={true}
                    />
                  </div>
                  <div>
                    <label className={labelClass}>{t('form.school')}</label>
                    <input 
                      value={edu.school}
                      onChange={(e) => handleEducationChange(edu.id, 'school', e.target.value)}
                      className={inputClass}
                      spellCheck={true}
                    />
                  </div>
                  <div>
                    <label className={labelClass}>{t('form.gradYear')}</label>
                    <input 
                      value={edu.dates}
                      onChange={(e) => handleEducationChange(edu.id, 'dates', e.target.value)}
                      className={inputClass}
                      spellCheck={false}
                    />
                  </div>
                </div>
                
                <div>
                  <label className={labelClass}>{t('form.details')}</label>
                  <textarea 
                    value={edu.description}
                    onChange={(e) => handleEducationChange(edu.id, 'description', e.target.value)}
                    rows={2}
                    className={inputClass}
                    spellCheck={true}
                  />
                </div>
              </div>
            ))}
            
            <button 
              onClick={addEducation}
              className="w-full py-4 flex flex-col items-center justify-center gap-2 text-sm font-medium text-slate-500 bg-slate-50 hover:bg-purple-50 hover:text-purple-600 rounded-xl transition-all border-2 border-dashed border-slate-200 hover:border-purple-300 group"
            >
              <div className="bg-white p-2 rounded-full shadow-sm border border-slate-200 group-hover:border-purple-200 group-hover:bg-purple-600 group-hover:text-white transition-all">
                 <Plus className="w-5 h-5" />
              </div>
              {t('form.addEdu')}
            </button>
          </div>
        </FormSection>

        {/* Languages */}
        <FormSection 
          title={t('form.languages')} 
          subtitle={t('form.languagesSub')}
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
                      <label className={labelClass}>{t('form.lang')}</label>
                      <input 
                        value={lang.name}
                        onChange={(e) => handleLanguageChange(lang.id, 'name', e.target.value)}
                        className={inputClass}
                        spellCheck={true}
                      />
                    </div>
                    <div>
                      <label className={labelClass}>{t('form.level')}</label>
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
                  <button 
                    onClick={() => removeLanguage(lang.id)}
                    className="p-2 text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors self-center sm:self-end sm:mb-[2px]"
                    title="Remover"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
            ))}
            
            <button 
              onClick={addLanguage}
              className="w-full py-3 flex items-center justify-center gap-2 text-sm font-medium text-slate-600 bg-slate-50 hover:bg-purple-50 hover:text-purple-600 rounded-xl transition-all border-2 border-dashed border-slate-200 hover:border-purple-300 group"
            >
              <div className="bg-white p-1 rounded-md shadow-sm border border-slate-200 group-hover:border-purple-200">
                 <Plus className="w-4 h-4" />
              </div>
              {t('form.addLang')}
            </button>
          </div>
        </FormSection>

        {/* Skills (Tag System) */}
        <FormSection 
          title={t('form.skills')} 
          subtitle={t('form.skillsSub')}
          icon={CheckCircle2} 
          isOpen={activeSection === 'skills'} 
          onToggle={() => toggleSection('skills')}
          isComplete={data.skills.length > 5}
        >
          <div className="space-y-4">
            <label className={labelClass}>{t('form.addSkill')}</label>
            
            <div className="flex gap-2">
              <input 
                type="text"
                value={skillInput}
                onChange={(e) => setSkillInput(e.target.value)}
                onKeyDown={handleSkillKeyDown}
                className={inputClass}
                placeholder="..."
              />
              <button 
                onClick={addSkill}
                disabled={!skillInput.trim()}
                className="px-5 py-2.5 bg-slate-900 text-white rounded-lg font-medium hover:bg-purple-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 shadow-sm"
              >
                <Plus className="w-4 h-4" />
                <span className="hidden sm:inline">{t('form.add')}</span>
              </button>
            </div>

            <div className="min-h-[80px] p-4 bg-slate-50 border border-slate-200 rounded-xl flex flex-wrap gap-2 content-start">
              {getSkillsArray().length === 0 && (
                 <div className="w-full h-full flex flex-col items-center justify-center text-slate-400 py-4 gap-2">
                    <Layout className="w-6 h-6 opacity-50" />
                    <span className="text-sm italic">{t('form.emptySkills')}</span>
                 </div>
              )}
              {getSkillsArray().map((skill, index) => (
                <span 
                  key={index}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white border border-purple-100 rounded-lg text-sm font-medium text-purple-700 shadow-sm group animate-in zoom-in-95 duration-200"
                >
                  {skill}
                  <button 
                    onClick={() => removeSkill(skill)}
                    className="p-0.5 hover:bg-red-50 hover:text-red-500 rounded-md transition-colors"
                    aria-label={`Remover ${skill}`}
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </span>
              ))}
            </div>

            <div>
               <label className={`${labelClass} mt-4 mb-3 flex items-center gap-2`}>
                 <Lightbulb className="w-3.5 h-3.5 text-amber-500" />
                 {t('form.suggestions')}
               </label>
               <div className="flex flex-wrap gap-2 pl-1">
                {['Leadership', 'Teamwork', 'Excel', 'Problem Solving', 'English', 'Communication', 'Scrum', 'Python', 'Sales'].map(s => (
                  <button 
                    key={s}
                    onClick={() => addSuggestedSkill(s)}
                    disabled={getSkillsArray().includes(s)}
                    className="text-xs px-3 py-2 bg-white hover:bg-purple-50 text-slate-600 hover:text-purple-700 rounded-lg border border-slate-200 hover:border-purple-200 transition-all whitespace-nowrap disabled:opacity-50 disabled:cursor-default shadow-sm"
                  >
                    + {s}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </FormSection>
      </div>
    </div>
  );
};