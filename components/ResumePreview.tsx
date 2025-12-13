import React from 'react';
import { ResumeData, TemplateType } from '../types';
import { Mail, Phone, MapPin, Globe, User, Briefcase, Award } from 'lucide-react';
import { MarkdownText } from './MarkdownText';
// Removed multilingual support - Portuguese only

interface ResumePreviewProps {
  data: ResumeData;
  template: TemplateType;
}

const SkillsList = ({ skills, className = "" }: { skills: string[], className?: string }) => (
  <div className={`flex flex-wrap gap-x-2 gap-y-2 ${className}`}>
    {skills.map((skill, i) => (
      <span key={i} className="px-2 py-1 bg-slate-100 text-slate-700 text-xs font-medium rounded print:bg-slate-100">
        {skill}
      </span>
    ))}
  </div>
);

// Wrapper Component 
const Wrapper = ({ children }: { children?: React.ReactNode }) => (
  // Updated for print compatibility: 
  // - On screen: w-[210mm], shadow-2xl
  // - On print: w-full, shadow-none, margin-0
  <div className="w-[210mm] min-h-[297mm] bg-white shadow-2xl mx-auto overflow-hidden flex-none print:shadow-none print:w-full print:m-0 print:h-auto">
    {children}
  </div>
);

// Template Props
interface TemplateProps {
  data: ResumeData;
  skillsArray: string[];
}

// Simple Portuguese text helper
const pt = (key: string): string => {
  const texts: Record<string, string> = {
    'preview.summary': 'Resumo Profissional',
    'preview.experience': 'Experiência Profissional',
    'preview.education': 'Formação Acadêmica',
    'preview.skills': 'Habilidades',
    'preview.languages': 'Idiomas',
    'preview.profile': 'Perfil',
    'preview.contact': 'Contato',
    'preview.about': 'Sobre'
  };
  return texts[key] || key;
};

const ModernTemplate = ({ data, skillsArray }: TemplateProps) => (
  <div className="w-full h-full p-[15mm] text-slate-800 flex flex-col font-sans">
    <header className="border-b-2 border-slate-800 pb-6 mb-6">
      <div className="flex justify-between items-start gap-6">
        <div className="flex-1">
          <h1 className="text-4xl font-bold uppercase tracking-tight text-slate-900 mb-2">{data.fullName || 'Seu Nome'}</h1>
          <p className="text-xl font-medium mb-4" style={{ color: data.themeColor || '#475569' }}>{data.title || 'Seu Cargo'}</p>
          <div className="flex flex-wrap gap-4 text-sm text-slate-600">
            {data.email && <div className="flex items-center gap-1.5"><Mail className="w-3.5 h-3.5" /><span>{data.email}</span></div>}
            {data.phone && <div className="flex items-center gap-1.5"><Phone className="w-3.5 h-3.5" /><span>{data.phone}</span></div>}
            {data.location && <div className="flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5" /><span>{data.location}</span></div>}
            {data.website && <div className="flex items-center gap-1.5"><Globe className="w-3.5 h-3.5" /><span>{data.website}</span></div>}
          </div>
        </div>
        {data.photo && (
          <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-slate-200 shrink-0">
            <img src={data.photo} alt={data.fullName} className="w-full h-full object-cover" />
          </div>
        )}
      </div>
    </header>
    <div className="flex-1 space-y-6">
      {data.summary && (
        <section>
          <h3 className="text-sm font-bold uppercase tracking-wider mb-2 border-b border-slate-200 pb-1" style={{ color: data.themeColor }}>{pt('preview.summary')}</h3>
          <MarkdownText text={data.summary} className="text-sm leading-relaxed text-slate-700" />
        </section>
      )}
      {data.experience.length > 0 && (
        <section>
          <h3 className="text-sm font-bold uppercase tracking-wider mb-4 border-b border-slate-200 pb-1" style={{ color: data.themeColor }}>{pt('preview.experience')}</h3>
          <div className="space-y-5">
            {data.experience.map((exp) => (
              <div key={exp.id}>
                <div className="flex justify-between items-baseline mb-1">
                  <h4 className="font-bold text-slate-800">{exp.role}</h4>
                  <span className="text-xs font-medium text-slate-500 whitespace-nowrap">{exp.dates}</span>
                </div>
                <div className="flex justify-between items-baseline mb-2">
                  <span className="text-sm font-semibold italic" style={{ color: data.themeColor }}>{exp.company}</span>
                  <span className="text-xs text-slate-500">{exp.location}</span>
                </div>
                <MarkdownText text={exp.description} className="text-sm leading-relaxed text-slate-600" />
              </div>
            ))}
          </div>
        </section>
      )}
      {data.education.length > 0 && (
        <section>
          <h3 className="text-sm font-bold uppercase tracking-wider mb-4 border-b border-slate-200 pb-1" style={{ color: data.themeColor }}>{pt('preview.education')}</h3>
          <div className="space-y-4">
            {data.education.map((edu) => (
              <div key={edu.id}>
                <div className="flex justify-between items-baseline mb-1">
                  <h4 className="font-bold text-slate-800">{edu.school}</h4>
                  <span className="text-xs font-medium text-slate-500 whitespace-nowrap">{edu.dates}</span>
                </div>
                <div className="mb-1"><span className="text-sm font-medium" style={{ color: data.themeColor }}>{edu.degree}</span></div>
                {edu.description && <MarkdownText text={edu.description} className="text-sm text-slate-600 leading-snug" />}
              </div>
            ))}
          </div>
        </section>
      )}
      <div className="grid grid-cols-2 gap-8">
        {skillsArray.length > 0 && (
          <section>
            <h3 className="text-sm font-bold uppercase tracking-wider mb-3 border-b border-slate-200 pb-1" style={{ color: data.themeColor }}>{pt('preview.skills')}</h3>
            <SkillsList skills={skillsArray} />
          </section>
        )}
        {(data.languages || []).length > 0 && (
          <section>
            <h3 className="text-sm font-bold uppercase tracking-wider mb-3 border-b border-slate-200 pb-1" style={{ color: data.themeColor }}>{pt('preview.languages')}</h3>
            <ul className="space-y-1">
              {data.languages.map((lang) => (
                <li key={lang.id} className="text-sm flex justify-between">
                  <span className="font-medium text-slate-800">{lang.name}</span>
                  <span className="text-slate-500 text-xs italic">{lang.proficiency}</span>
                </li>
              ))}
            </ul>
          </section>
        )}
      </div>
    </div>
  </div>
);

const ClassicTemplate = ({ data, skillsArray }: TemplateProps) => (
  <div className="w-full h-full p-[15mm] text-black flex flex-col font-serif">
    <header className="text-center mb-8 border-b-2 border-black pb-6">
      {data.photo && (
        <div className="flex justify-center mb-4">
          <div className="w-24 h-24 rounded-full overflow-hidden border border-black">
            <img src={data.photo} alt={data.fullName} className="w-full h-full object-cover" />
          </div>
        </div>
      )}
      <h1 className="text-3xl font-bold uppercase tracking-wider mb-2 font-serif">{data.fullName || 'Seu Nome'}</h1>
      <p className="text-lg italic mb-3" style={{ color: data.themeColor }}>{data.title || 'Seu Cargo'}</p>
      <div className="flex flex-wrap justify-center gap-x-6 gap-y-1 text-sm">
        {data.email && <span>{data.email}</span>}
        {data.phone && <span>{data.phone}</span>}
        {data.location && <span>{data.location}</span>}
        {data.website && <span>{data.website}</span>}
      </div>
    </header>
    <div className="flex-1 space-y-6">
      {data.summary && (
        <section>
          <h3 className="text-base font-bold uppercase border-b border-black mb-3">{pt('preview.profile')}</h3>
            <MarkdownText text={data.summary} className="text-sm leading-relaxed text-justify" />
        </section>
      )}
      {data.experience.length > 0 && (
        <section>
          <h3 className="text-base font-bold uppercase border-b border-black mb-4">{pt('preview.experience')}</h3>
          <div className="space-y-6">
            {data.experience.map((exp) => (
              <div key={exp.id}>
                <div className="flex justify-between items-baseline mb-1">
                  <h4 className="font-bold text-base">{exp.role}</h4>
                  <span className="text-sm font-bold">{exp.dates}</span>
                </div>
                <div className="flex justify-between items-baseline mb-2">
                  <span className="text-sm italic" style={{ color: data.themeColor }}>{exp.company}</span>
                  <span className="text-sm italic">{exp.location}</span>
                </div>
                <MarkdownText text={exp.description} className="text-sm leading-relaxed text-justify" />
              </div>
            ))}
          </div>
        </section>
      )}
      {data.education.length > 0 && (
        <section>
          <h3 className="text-base font-bold uppercase border-b border-black mb-4">{pt('preview.education')}</h3>
          <div className="space-y-4">
            {data.education.map((edu) => (
              <div key={edu.id}>
                <div className="flex justify-between items-baseline">
                  <h4 className="font-bold">{edu.school}</h4>
                  <span className="text-sm font-bold">{edu.dates}</span>
                </div>
                <div><span className="text-sm italic" style={{ color: data.themeColor }}>{edu.degree}</span></div>
                {edu.description && <MarkdownText text={edu.description} className="text-sm mt-1" />}
              </div>
            ))}
          </div>
        </section>
      )}
      <div className="grid grid-cols-2 gap-8">
        {skillsArray.length > 0 && (
          <section>
            <h3 className="text-base font-bold uppercase border-b border-black mb-3">{pt('preview.skills')}</h3>
            <p className="text-sm leading-relaxed">{skillsArray.join(' • ')}</p>
          </section>
        )}
        {(data.languages || []).length > 0 && (
          <section>
            <h3 className="text-base font-bold uppercase border-b border-black mb-3">{pt('preview.languages')}</h3>
            <ul className="text-sm leading-relaxed space-y-1">
              {data.languages.map(lang => (
                <li key={lang.id} className="flex justify-between">
                  <span>{lang.name}</span>
                  <span className="italic text-slate-600">{lang.proficiency}</span>
                </li>
              ))}
            </ul>
          </section>
        )}
      </div>
    </div>
  </div>
);

const SidebarTemplate = ({ data, skillsArray }: TemplateProps) => (
  <div className="w-full h-full text-slate-800 flex font-sans">
    <aside className="w-[35%] text-white p-6 flex flex-col gap-6 print:text-white" style={{ backgroundColor: '#0f172a' }}>
      {data.photo && (
        <div className="w-32 h-32 mx-auto rounded-full overflow-hidden border-4 border-slate-700 shadow-md">
          <img src={data.photo} alt={data.fullName} className="w-full h-full object-cover" />
        </div>
      )}
      <div className="space-y-3">
        <h1 className="text-2xl sm:text-3xl font-bold leading-tight break-words">{data.fullName || 'Seu Nome'}</h1>
        <p className="font-medium text-lg opacity-90" style={{ color: data.themeColor || '#a78bfa' }}>{data.title || 'Seu Cargo'}</p>
      </div>
      <div className="space-y-3 text-sm text-slate-300">
        <h3 className="text-white font-bold uppercase tracking-wider text-xs border-b border-slate-700 pb-1 mb-2">{pt('preview.contact')}</h3>
        {data.email && (<div className="flex items-start gap-3"><Mail className="w-4 h-4 shrink-0 mt-0.5" /><span className="break-words text-xs">{data.email}</span></div>)}
        {data.phone && (<div className="flex items-center gap-3"><Phone className="w-4 h-4 shrink-0" /><span className="text-xs">{data.phone}</span></div>)}
        {data.location && (<div className="flex items-start gap-3"><MapPin className="w-4 h-4 shrink-0 mt-0.5" /><span className="text-xs leading-tight">{data.location}</span></div>)}
        {data.website && (<div className="flex items-start gap-3"><Globe className="w-4 h-4 shrink-0 mt-0.5" /><span className="break-words text-xs">{data.website}</span></div>)}
      </div>
      {skillsArray.length > 0 && (
        <div className="space-y-3">
          <h3 className="text-white font-bold uppercase tracking-wider text-xs border-b border-slate-700 pb-1 mb-2">{pt('preview.skills')}</h3>
          <div className="flex flex-wrap gap-2">
            {skillsArray.map((skill, i) => (
              <span key={i} className="text-[10px] sm:text-xs bg-slate-800 px-2 py-1 rounded border border-slate-700">{skill}</span>
            ))}
          </div>
        </div>
      )}
      {(data.languages || []).length > 0 && (
        <div className="space-y-3">
          <h3 className="text-white font-bold uppercase tracking-wider text-xs border-b border-slate-700 pb-1 mb-2">{pt('preview.languages')}</h3>
          <div className="space-y-2">
            {data.languages.map((lang) => (
              <div key={lang.id} className="flex justify-between text-xs">
                <span className="text-white">{lang.name}</span>
                <span className="text-slate-400 text-[10px] uppercase">{lang.proficiency}</span>
              </div>
            ))}
          </div>
        </div>
      )}
      {data.education.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-white font-bold uppercase tracking-wider text-xs border-b border-slate-700 pb-1 mb-2">{pt('preview.education')}</h3>
          {data.education.map((edu) => (
            <div key={edu.id} className="text-xs">
              <div className="font-bold text-white leading-tight">{edu.school}</div>
              <div className="text-slate-400 text-[10px] mb-1">{edu.dates}</div>
              <div className="text-slate-300 italic">{edu.degree}</div>
            </div>
          ))}
        </div>
      )}
    </aside>
    <div className="flex-1 p-8 space-y-8 bg-white">
      {data.summary && (
        <section>
          <h3 className="text-xl font-bold text-slate-900 mb-3 flex items-center gap-2">
            <span className="w-8 h-1 rounded-full" style={{ backgroundColor: data.themeColor }}></span>
            {pt('preview.profile')}
          </h3>
          <MarkdownText text={data.summary} className="text-sm leading-relaxed text-slate-700" />
        </section>
      )}
      {data.experience.length > 0 && (
        <section>
          <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
            <span className="w-8 h-1 rounded-full" style={{ backgroundColor: data.themeColor }}></span>
            {pt('preview.experience')}
          </h3>
          <div className="space-y-8 border-l-2 border-slate-100 ml-3 pl-6">
            {data.experience.map((exp) => (
              <div key={exp.id} className="relative">
                <span className="absolute -left-[31px] top-1.5 w-3 h-3 rounded-full border-2 border-white" style={{ backgroundColor: data.themeColor }}></span>
                <div className="flex justify-between items-baseline mb-1">
                  <h4 className="font-bold text-lg text-slate-800">{exp.role}</h4>
                  <span className="text-xs font-bold px-2 py-1 rounded bg-slate-100" style={{ color: data.themeColor }}>{exp.dates}</span>
                </div>
                <div className="mb-2">
                  <span className="font-medium text-slate-600">{exp.company}</span>
                  <span className="mx-2 text-slate-300">|</span>
                  <span className="text-sm text-slate-500">{exp.location}</span>
                </div>
                <MarkdownText text={exp.description} className="text-sm leading-relaxed text-slate-600" />
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  </div>
);

const MinimalistTemplate = ({ data, skillsArray }: TemplateProps) => (
  <div className="w-full h-full p-[15mm] text-slate-900 flex flex-col font-sans">
    <header className="text-center mb-10">
      {data.photo && (
        <div className="flex justify-center mb-6">
          <div className="w-24 h-24 rounded-full overflow-hidden grayscale">
            <img src={data.photo} alt={data.fullName} className="w-full h-full object-cover" />
          </div>
        </div>
      )}
      <h1 className="text-3xl font-light uppercase tracking-[0.2em] mb-3">{data.fullName || 'Seu Nome'}</h1>
      <p className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-4" style={{ color: data.themeColor }}>{data.title || 'Seu Cargo'}</p>
      <div className="flex flex-wrap justify-center gap-4 text-xs text-slate-400">
        {data.email && <span>{data.email}</span>}
        {data.phone && <span className="border-l border-slate-200 pl-4">{data.phone}</span>}
        {data.location && <span className="border-l border-slate-200 pl-4">{data.location}</span>}
        {data.website && <span className="border-l border-slate-200 pl-4">{data.website}</span>}
      </div>
    </header>
    <div className="space-y-8">
      {data.summary && (
        <section>
          <h3 className="text-center text-xs font-bold uppercase tracking-widest text-slate-400 mb-4">{pt('preview.about')}</h3>
          <MarkdownText text={data.summary} className="text-sm leading-relaxed text-center text-slate-600 max-w-lg mx-auto" />
        </section>
      )}
      {data.experience.length > 0 && (
        <section>
          <h3 className="text-center text-xs font-bold uppercase tracking-widest text-slate-400 mb-6">{pt('preview.experience')}</h3>
          <div className="space-y-8">
            {data.experience.map((exp) => (
              <div key={exp.id} className="grid grid-cols-[1fr_3fr] gap-4">
                <div className="text-right">
                  <span className="block text-xs font-bold" style={{ color: data.themeColor }}>{exp.company}</span>
                  <span className="block text-xs text-slate-400 mt-1">{exp.dates}</span>
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-slate-800 mb-1">{exp.role}</h4>
                  <MarkdownText text={exp.description} className="text-sm text-slate-600 leading-relaxed" />
                </div>
              </div>
            ))}
          </div>
        </section>
      )}
      {data.education.length > 0 && (
        <section>
          <h3 className="text-center text-xs font-bold uppercase tracking-widest text-slate-400 mb-6 mt-8">{pt('preview.education')}</h3>
          <div className="space-y-4">
            {data.education.map((edu) => (
              <div key={edu.id} className="text-center">
                <h4 className="text-sm font-bold text-slate-800">{edu.school}</h4>
                <p className="text-sm text-slate-600">{edu.degree}</p>
                <p className="text-xs text-slate-400 mt-1">{edu.dates}</p>
              </div>
            ))}
          </div>
        </section>
      )}
      <div className="grid grid-cols-2 gap-4 mt-8">
        {skillsArray.length > 0 && (
          <section className="text-center">
            <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-4">{pt('preview.skills')}</h3>
            <p className="text-sm text-slate-600">{skillsArray.join('  /  ')}</p>
          </section>
        )}
        {(data.languages || []).length > 0 && (
          <section className="text-center">
            <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-4">{pt('preview.languages')}</h3>
            <p className="text-sm text-slate-600">
              {data.languages.map(l => `${l.name} (${l.proficiency})`).join('  /  ')}
            </p>
          </section>
        )}
      </div>
    </div>
  </div>
);

const ExecutiveTemplate = ({ data, skillsArray }: TemplateProps) => (
  <div className="w-full h-full p-[15mm] text-slate-900 flex flex-col font-sans">
    <header className="flex justify-between items-center border-b-[3px] border-slate-800 pb-4 mb-8">
      <div className="flex items-center gap-6">
        {data.photo && (
          <div className="w-24 h-24 rounded-lg overflow-hidden border border-slate-300">
            <img src={data.photo} alt={data.fullName} className="w-full h-full object-cover" />
          </div>
        )}
        <div>
          <h1 className="text-4xl font-bold font-serif text-slate-900">{data.fullName || 'Seu Nome'}</h1>
          <p className="text-xl italic mt-2 font-serif" style={{ color: data.themeColor }}>{data.title || 'Seu Cargo'}</p>
        </div>
      </div>
      <div className="text-right text-sm space-y-1 text-slate-600">
        {data.email && <div>{data.email}</div>}
        {data.phone && <div>{data.phone}</div>}
        {data.location && <div>{data.location}</div>}
      </div>
    </header>
    <div className="flex gap-8 h-full">
      <div className="flex-1 space-y-8">
        {data.summary && (
          <section>
            <h3 className="font-serif text-lg font-bold border-b border-slate-300 pb-1 mb-3 uppercase tracking-wide">{pt('preview.profile')}</h3>
            <p className="text-sm text-justify leading-relaxed">{data.summary}</p>
          </section>
        )}
        {data.experience.length > 0 && (
          <section>
            <h3 className="font-serif text-lg font-bold border-b border-slate-300 pb-1 mb-4 uppercase tracking-wide">{pt('preview.experience')}</h3>
            <div className="space-y-6">
              {data.experience.map((exp) => (
                <div key={exp.id}>
                  <div className="flex justify-between items-baseline mb-1">
                    <h4 className="font-bold text-base">{exp.role}</h4>
                    <span className="text-sm font-semibold">{exp.dates}</span>
                  </div>
                  <div className="text-sm italic mb-2" style={{ color: data.themeColor }}>{exp.company}, {exp.location}</div>
                  <ul className="list-disc list-outside ml-4 text-sm space-y-1 text-slate-700">
                    <MarkdownText text={exp.description} className="text-sm text-slate-700" />
                  </ul>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
      <div className="w-1/3 space-y-8">
        {skillsArray.length > 0 && (
          <section>
            <h3 className="font-serif text-lg font-bold border-b border-slate-300 pb-1 mb-3 uppercase tracking-wide">{pt('preview.skills')}</h3>
            <div className="flex flex-wrap gap-2">
              {skillsArray.map((skill, i) => (
                <span key={i} className="text-sm text-slate-800 block w-full border-b border-dotted border-slate-200 py-1">{skill}</span>
              ))}
            </div>
          </section>
        )}
        {(data.languages || []).length > 0 && (
          <section>
            <h3 className="font-serif text-lg font-bold border-b border-slate-300 pb-1 mb-3 uppercase tracking-wide">{pt('preview.languages')}</h3>
            <div className="space-y-2">
              {data.languages.map((lang, i) => (
                <div key={i} className="text-sm text-slate-800 border-b border-dotted border-slate-200 py-1 flex justify-between">
                  <span>{lang.name}</span>
                  <span className="text-slate-500 text-xs italic">{lang.proficiency}</span>
                </div>
              ))}
            </div>
          </section>
        )}
        {data.education.length > 0 && (
          <section>
            <h3 className="font-serif text-lg font-bold border-b border-slate-300 pb-1 mb-3 uppercase tracking-wide">{pt('preview.education')}</h3>
            <div className="space-y-4">
              {data.education.map((edu) => (
                <div key={edu.id}>
                  <div className="font-bold text-sm">{edu.school}</div>
                  <div className="text-sm italic">{edu.degree}</div>
                  <div className="text-xs text-slate-500 mt-1">{edu.dates}</div>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  </div>
);

const CreativeTemplate = ({ data, skillsArray }: TemplateProps) => (
  <div className="w-full h-full text-slate-800 flex flex-col font-sans bg-white">
    <div className="h-6 w-full" style={{ backgroundColor: data.themeColor }}></div>
    <header className="bg-slate-900 text-white p-10 flex justify-between items-center print:bg-slate-900 print:text-white">
      <div className="flex items-center gap-6">
        {data.photo && (
          <div className="w-28 h-28 rounded-full border-4 border-white shadow-lg overflow-hidden">
            <img src={data.photo} alt={data.fullName} className="w-full h-full object-cover" />
          </div>
        )}
        <div>
          <h1 className="text-5xl font-bold tracking-tight mb-2">{data.fullName || 'Seu Nome'}</h1>
          <p className="text-xl font-medium tracking-wide" style={{ color: data.themeColor }}>{data.title || 'Seu Cargo'}</p>
        </div>
      </div>
      <div className="text-right text-sm text-slate-300 space-y-1">
        {data.email && <div className="flex items-center justify-end gap-2"><span>{data.email}</span><Mail className="w-4 h-4" /></div>}
        {data.phone && <div className="flex items-center justify-end gap-2"><span>{data.phone}</span><Phone className="w-4 h-4" /></div>}
        {data.website && <div className="flex items-center justify-end gap-2"><span>{data.website}</span><Globe className="w-4 h-4" /></div>}
      </div>
    </header>
    <div className="flex flex-1">
      <div className="flex-1 p-10 space-y-10">
        {data.summary && (
          <section>
            <div className="flex items-center gap-3 mb-4">
              <div className="p-1.5 rounded text-white" style={{ backgroundColor: data.themeColor }}><User className="w-4 h-4" /></div>
              <h3 className="text-xl font-bold uppercase tracking-tight">{pt('preview.about')}</h3>
            </div>
            <MarkdownText text={data.summary} className="text-slate-600 leading-relaxed" />
          </section>
        )}
        {data.experience.length > 0 && (
          <section>
            <div className="flex items-center gap-3 mb-6">
              <div className="p-1.5 rounded text-white" style={{ backgroundColor: data.themeColor }}><Briefcase className="w-4 h-4" /></div>
              <h3 className="text-xl font-bold uppercase tracking-tight">{pt('preview.experience')}</h3>
            </div>
            <div className="space-y-8 border-l-2 border-slate-100 ml-3 pl-8">
              {data.experience.map((exp) => (
                <div key={exp.id} className="relative">
                  <span className="absolute -left-[39px] top-1.5 w-4 h-4 rounded-full bg-white border-4" style={{ borderColor: data.themeColor }}></span>
                  <h4 className="font-bold text-lg text-slate-800">{exp.role}</h4>
                  <div className="flex justify-between text-sm mb-3">
                    <span className="font-semibold" style={{ color: data.themeColor }}>{exp.company}</span>
                    <span className="text-slate-500">{exp.dates}</span>
                  </div>
                  <MarkdownText text={exp.description} className="text-sm text-slate-600" />
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
      <aside className="w-[30%] bg-slate-50 p-10 border-l border-slate-100 print:bg-slate-50">
        {skillsArray.length > 0 && (
          <section className="mb-10">
            <h3 className="text-sm font-bold uppercase tracking-widest text-slate-400 mb-4">{pt('preview.skills')}</h3>
            <div className="flex flex-wrap gap-2">
              {skillsArray.map((skill, i) => (
                <span key={i} className="bg-white border border-slate-200 px-3 py-1.5 rounded-full text-xs font-semibold text-slate-700 shadow-sm">{skill}</span>
              ))}
            </div>
          </section>
        )}
        {(data.languages || []).length > 0 && (
          <section className="mb-10">
            <h3 className="text-sm font-bold uppercase tracking-widest text-slate-400 mb-4">{pt('preview.languages')}</h3>
            <ul className="space-y-3">
              {data.languages.map((lang, i) => (
                <li key={i} className="text-sm">
                  <div className="font-semibold text-slate-700">{lang.name}</div>
                  <div className="text-xs" style={{ color: data.themeColor }}>{lang.proficiency}</div>
                </li>
              ))}
            </ul>
          </section>
        )}
        {data.education.length > 0 && (
          <section>
            <h3 className="text-sm font-bold uppercase tracking-widest text-slate-400 mb-4">{pt('preview.education')}</h3>
            <div className="space-y-6">
              {data.education.map((edu) => (
                <div key={edu.id}>
                  <div className="font-bold text-slate-800">{edu.school}</div>
                  <div className="text-xs font-medium mb-1" style={{ color: data.themeColor }}>{edu.degree}</div>
                  <div className="text-xs text-slate-400">{edu.dates}</div>
                </div>
              ))}
            </div>
          </section>
        )}
      </aside>
    </div>
  </div>
);

const TechTemplate = ({ data, skillsArray }: TemplateProps) => (
  <div className="w-full h-full p-[15mm] text-slate-800 flex flex-col font-mono">
    <header className="mb-8 border-b-4 border-black pb-6 flex justify-between items-start">
      <div>
        <h1 className="text-4xl font-bold mb-2 tracking-tighter">{`> ${data.fullName || 'Seu_Nome'}`}</h1>
        <p className="text-lg font-bold mb-4" style={{ color: data.themeColor }}>{`// ${data.title || 'Dev'}`}</p>
        <div className="text-xs space-y-1 font-medium text-slate-600">
          {data.email && <div>const EMAIL = "{data.email}";</div>}
          {data.phone && <div>const TEL = "{data.phone}";</div>}
          {data.location && <div>const LOC = "{data.location}";</div>}
          {data.website && <div>const WEB = "{data.website}";</div>}
        </div>
      </div>
      {data.photo && (
        <div className="w-24 h-24 border-2 border-black p-1">
          <img src={data.photo} alt="user" className="w-full h-full object-cover grayscale" />
        </div>
      )}
    </header>
    <div className="flex-1 grid grid-cols-12 gap-6">
      <div className="col-span-8 space-y-8">
        {data.summary && (
          <section>
            <h3 className="text-lg font-bold bg-slate-100 inline-block px-2 py-1 mb-3 print:bg-slate-100">./resumo</h3>
            <MarkdownText text={data.summary} className="text-sm leading-relaxed" />
          </section>
        )}
        {data.experience.length > 0 && (
          <section>
            <h3 className="text-lg font-bold bg-slate-100 inline-block px-2 py-1 mb-4 print:bg-slate-100">./experiencia</h3>
            <div className="space-y-6">
              {data.experience.map((exp) => (
                <div key={exp.id} className="border-l-2 border-slate-300 pl-4">
                  <div className="flex justify-between items-start mb-1">
                    <h4 className="font-bold">{exp.role}</h4>
                    <span className="text-xs font-bold bg-black text-white px-2 py-0.5 rounded-sm print:bg-black print:text-white">{exp.dates}</span>
                  </div>
                  <div className="text-xs font-bold mb-2" style={{ color: data.themeColor }}>@{exp.company}</div>
                  <MarkdownText text={exp.description} className="text-sm" />
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
      <div className="col-span-4 space-y-8">
        {skillsArray.length > 0 && (
          <section>
            <h3 className="text-sm font-bold bg-slate-100 inline-block px-2 py-1 mb-3 print:bg-slate-100">./skills_array</h3>
            <div className="text-xs space-y-1">
              <span>[</span>
              {skillsArray.map((skill, i) => (
                <div key={i} className="pl-4">"{skill}",</div>
              ))}
              <span>]</span>
            </div>
          </section>
        )}
        {(data.languages || []).length > 0 && (
          <section>
            <h3 className="text-sm font-bold bg-slate-100 inline-block px-2 py-1 mb-3 print:bg-slate-100">./idiomas</h3>
            <div className="text-xs space-y-1">
              {data.languages.map((lang, i) => (
                <div key={i}>{`"${lang.name}": "${lang.proficiency}",`}</div>
              ))}
            </div>
          </section>
        )}
        {data.education.length > 0 && (
          <section>
            <h3 className="text-sm font-bold bg-slate-100 inline-block px-2 py-1 mb-3 print:bg-slate-100">./educacao</h3>
            <div className="space-y-4">
              {data.education.map((edu) => (
                <div key={edu.id} className="text-xs">
                  <div className="font-bold">{edu.school}</div>
                  <div className="text-slate-600">{edu.degree}</div>
                  <div className="text-slate-400 mt-1">{edu.dates}</div>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  </div>
);

const CompactTemplate = ({ data, skillsArray }: TemplateProps) => (
  <div className="w-full h-full p-[12mm] text-slate-800 flex flex-col font-sans">
    <header className="flex justify-between items-start border-b border-slate-300 pb-4 mb-4">
      <div className="flex items-center gap-4">
        {data.photo && (
          <div className="w-16 h-16 rounded-md overflow-hidden">
            <img src={data.photo} alt={data.fullName} className="w-full h-full object-cover" />
          </div>
        )}
        <div>
          <h1 className="text-2xl font-bold uppercase" style={{ color: data.themeColor }}>{data.fullName || 'Seu Nome'}</h1>
          <p className="text-sm font-semibold text-slate-600">{data.title || 'Seu Cargo'}</p>
        </div>
      </div>
      <div className="text-right text-xs text-slate-500 leading-tight">
        {data.email && <div>{data.email}</div>}
        {data.phone && <div>{data.phone}</div>}
        {data.location && <div>{data.location}</div>}
        {data.website && <div>{data.website}</div>}
      </div>
    </header>

    <div className="grid grid-cols-3 gap-6 h-full">
      <div className="col-span-2 space-y-5">
        {data.summary && (
          <section>
            <h3 className="text-xs font-bold uppercase border-b mb-2" style={{ color: data.themeColor, borderColor: data.themeColor }}>{pt('preview.profile')}</h3>
            <MarkdownText text={data.summary} className="text-xs text-justify leading-snug" />
          </section>
        )}
        {data.experience.length > 0 && (
          <section>
            <h3 className="text-xs font-bold uppercase border-b mb-3" style={{ color: data.themeColor, borderColor: data.themeColor }}>{pt('preview.experience')}</h3>
            <div className="space-y-3">
              {data.experience.map((exp) => (
                <div key={exp.id}>
                  <div className="flex justify-between items-baseline">
                    <h4 className="text-sm font-bold">{exp.role}</h4>
                    <span className="text-xs font-medium text-slate-500">{exp.dates}</span>
                  </div>
                  <div className="text-xs italic text-slate-600 mb-1">{exp.company} - {exp.location}</div>
                  <MarkdownText text={exp.description} className="text-xs leading-snug" />
                </div>
              ))}
            </div>
          </section>
        )}
      </div>

      <div className="col-span-1 space-y-5 bg-slate-50 p-3 -m-3 h-full print:bg-slate-50">
        {skillsArray.length > 0 && (
          <section>
            <h3 className="text-xs font-bold uppercase border-b mb-2" style={{ color: data.themeColor, borderColor: data.themeColor }}>{pt('preview.skills')}</h3>
            <ul className="text-xs space-y-1 list-disc list-inside">
              {skillsArray.map((skill, i) => (
                <li key={i}>{skill}</li>
              ))}
            </ul>
          </section>
        )}
        {(data.languages || []).length > 0 && (
          <section>
            <h3 className="text-xs font-bold uppercase border-b mb-2" style={{ color: data.themeColor, borderColor: data.themeColor }}>{pt('preview.languages')}</h3>
            <ul className="text-xs space-y-1">
              {data.languages.map((lang, i) => (
                <li key={i} className="flex justify-between">
                  <span className="font-semibold">{lang.name}</span>
                  <span className="text-slate-500">{lang.proficiency}</span>
                </li>
              ))}
            </ul>
          </section>
        )}
        {data.education.length > 0 && (
          <section>
            <h3 className="text-xs font-bold uppercase border-b mb-2" style={{ color: data.themeColor, borderColor: data.themeColor }}>{pt('preview.education')}</h3>
            <div className="space-y-2">
              {data.education.map((edu) => (
                <div key={edu.id} className="text-xs">
                  <div className="font-bold">{edu.school}</div>
                  <div>{edu.degree}</div>
                  <div className="text-slate-500">{edu.dates}</div>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  </div>
);

const ElegantTemplate = ({ data, skillsArray }: TemplateProps) => (
  <div className="w-full h-full p-[15mm] text-slate-800 flex flex-col font-serif">
    <header className="text-center mb-8">
      {data.photo && (
        <div className="flex justify-center mb-4">
          <div className="w-24 h-24 rounded-full overflow-hidden border border-slate-200">
            <img src={data.photo} alt={data.fullName} className="w-full h-full object-cover" />
          </div>
        </div>
      )}
      <h1 className="text-4xl italic font-normal text-slate-900 mb-2">{data.fullName || 'Seu Nome'}</h1>
      <p className="text-sm uppercase tracking-widest text-slate-500 mb-4">{data.title || 'Seu Cargo'}</p>
      <div className="border-t border-b border-slate-200 py-3 flex justify-center gap-6 text-sm italic text-slate-600">
        {data.email && <span>{data.email}</span>}
        {data.phone && <span>{data.phone}</span>}
        {data.location && <span>{data.location}</span>}
      </div>
    </header>

    <div className="flex-1 space-y-8 px-4">
      {data.summary && (
        <section className="text-center">
          <MarkdownText text={data.summary} className="text-base leading-relaxed italic text-slate-700" />
        </section>
      )}

      {data.experience.length > 0 && (
        <section>
          <h3 className="text-center text-lg font-normal italic border-b border-slate-200 mb-6 pb-2">{pt('preview.experience')}</h3>
          <div className="space-y-8">
            {data.experience.map((exp) => (
              <div key={exp.id} className="relative pl-6 border-l border-slate-300">
                <div className="absolute -left-[5px] top-1.5 w-2.5 h-2.5 rounded-full bg-slate-300"></div>
                <div className="flex justify-between items-baseline mb-1">
                  <h4 className="text-lg font-medium">{exp.role}</h4>
                  <span className="text-sm italic text-slate-500">{exp.dates}</span>
                </div>
                <div className="text-base text-slate-600 italic mb-2">{exp.company}, {exp.location}</div>
                <MarkdownText text={exp.description} className="text-sm text-slate-700 leading-relaxed" />
              </div>
            ))}
          </div>
        </section>
      )}

      <div className="grid grid-cols-2 gap-8">
        <div>
          {data.education.length > 0 && (
            <section className="mb-8">
              <h3 className="text-center text-lg font-normal italic border-b border-slate-200 mb-4 pb-2">{pt('preview.education')}</h3>
              <div className="space-y-4">
                {data.education.map((edu) => (
                  <div key={edu.id} className="text-center">
                    <div className="font-bold">{edu.school}</div>
                    <div className="text-sm italic">{edu.degree}</div>
                    <div className="text-xs text-slate-400 mt-1">{edu.dates}</div>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>

        <div>
          {skillsArray.length > 0 && (
            <section className="mb-8">
              <h3 className="text-center text-lg font-normal italic border-b border-slate-200 mb-4 pb-2">{pt('preview.skills')}</h3>
              <p className="text-center text-sm italic leading-loose">
                {skillsArray.join(' • ')}
              </p>
            </section>
          )}
          {(data.languages || []).length > 0 && (
            <section>
              <h3 className="text-center text-lg font-normal italic border-b border-slate-200 mb-4 pb-2">{pt('preview.languages')}</h3>
              <ul className="text-center text-sm italic space-y-1">
                {data.languages.map(l => (
                  <li key={l.id}>{l.name} <span className="text-slate-400">- {l.proficiency}</span></li>
                ))}
              </ul>
            </section>
          )}
        </div>
      </div>
    </div>
  </div>
);

const BoldTemplate = ({ data, skillsArray }: TemplateProps) => (
  <div className="w-full h-full text-slate-900 flex flex-col font-sans">
    <header className="bg-black text-white p-12 print:bg-black print:text-white flex justify-between">
      <div className="flex-1">
        <h1 className="text-6xl font-black uppercase leading-none mb-4 tracking-tighter">{data.fullName || 'Seu Nome'}</h1>
        <div className="flex justify-between items-end border-t border-white/30 pt-4">
          <p className="text-2xl font-bold uppercase text-white/80">{data.title || 'Seu Cargo'}</p>
          <div className="text-right text-sm font-medium opacity-70">
            {data.email && <div className="inline-block ml-4">{data.email}</div>}
            {data.phone && <div className="inline-block ml-4">{data.phone}</div>}
            {data.website && <div className="inline-block ml-4">{data.website}</div>}
          </div>
        </div>
      </div>
      {data.photo && (
        <div className="w-32 h-32 ml-8 border-4 border-white shrink-0">
          <img src={data.photo} alt="user" className="w-full h-full object-cover grayscale" />
        </div>
      )}
    </header>

    <div className="flex-1 p-12 space-y-10">
      {data.summary && (
        <section>
          <h3 className="text-2xl font-black uppercase mb-4"><span className="bg-black text-white px-2 py-1 print:bg-black print:text-white">{pt('preview.about')}</span></h3>
          <MarkdownText text={data.summary} className="text-lg font-medium leading-relaxed" />
        </section>
      )}

      {data.experience.length > 0 && (
        <section>
          <h3 className="text-2xl font-black uppercase mb-6"><span className="bg-black text-white px-2 py-1 print:bg-black print:text-white">{pt('preview.experience')}</span></h3>
          <div className="space-y-8">
            {data.experience.map((exp) => (
              <div key={exp.id} className="grid grid-cols-12 gap-4 border-b-4 border-black pb-6 last:border-0">
                <div className="col-span-3 font-bold text-xl">{exp.dates}</div>
                <div className="col-span-9">
                  <h4 className="text-2xl font-bold uppercase mb-1">{exp.role}</h4>
                  <div className="text-lg font-bold text-slate-500 mb-3">{exp.company}</div>
                  <MarkdownText text={exp.description} className="font-medium text-slate-700" />
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      <div className="grid grid-cols-2 gap-12">
        {data.education.length > 0 && (
          <section>
            <h3 className="text-2xl font-black uppercase mb-6"><span className="bg-black text-white px-2 py-1 print:bg-black print:text-white">{pt('preview.education')}</span></h3>
            <div className="space-y-4">
              {data.education.map((edu) => (
                <div key={edu.id}>
                  <div className="text-xl font-bold">{edu.school}</div>
                  <div className="font-medium">{edu.degree}</div>
                  <div className="text-sm font-bold text-slate-500">{edu.dates}</div>
                </div>
              ))}
            </div>
          </section>
        )}

        <div className="space-y-8">
          {skillsArray.length > 0 && (
            <section>
              <h3 className="text-2xl font-black uppercase mb-6"><span className="bg-black text-white px-2 py-1 print:bg-black print:text-white">{pt('preview.skills')}</span></h3>
              <div className="flex flex-wrap gap-3">
                {skillsArray.map((skill, i) => (
                  <span key={i} className="text-lg font-bold border-2 border-black px-3 py-1">{skill}</span>
                ))}
              </div>
            </section>
          )}
          {(data.languages || []).length > 0 && (
            <section>
              <h3 className="text-2xl font-black uppercase mb-6"><span className="bg-black text-white px-2 py-1 print:bg-black print:text-white">{pt('preview.languages')}</span></h3>
              <ul className="space-y-2">
                {data.languages.map((l, i) => (
                  <li key={i} className="font-bold text-lg flex justify-between border-b-2 border-slate-200 pb-1">
                    <span>{l.name}</span>
                    <span className="text-slate-500">{l.proficiency}</span>
                  </li>
                ))}
              </ul>
            </section>
          )}
        </div>
      </div>
    </div>
  </div>
);



// --- New Templates ---

const TimelineTemplate = ({ data, skillsArray }: TemplateProps) => (
  <div className="w-full h-full p-[15mm] text-slate-800 flex flex-col font-sans relative overflow-hidden">
    {/* Decorative background line */}
    <div className="absolute left-[30mm] top-0 bottom-0 w-0.5 bg-slate-200"></div>

    <header className="relative z-10 pl-[25mm] mb-10">
      <h1 className="text-4xl font-black uppercase tracking-tight text-slate-900 mb-2">{data.fullName || 'Seu Nome'}</h1>
      <p className="text-xl font-bold bg-slate-900 text-white inline-block px-3 py-1 mb-4" style={{ backgroundColor: data.themeColor }}>{data.title || 'Seu Cargo'}</p>

      <div className="grid grid-cols-2 gap-x-8 gap-y-2 text-sm font-medium text-slate-600">
        {data.email && <div className="flex items-center gap-2"><Mail className="w-4 h-4" /> {data.email}</div>}
        {data.phone && <div className="flex items-center gap-2"><Phone className="w-4 h-4" /> {data.phone}</div>}
        {data.location && <div className="flex items-center gap-2"><MapPin className="w-4 h-4" /> {data.location}</div>}
        {data.website && <div className="flex items-center gap-2"><Globe className="w-4 h-4" /> {data.website}</div>}
      </div>
    </header>

    <div className="flex-1 space-y-10 relative z-10">

      {data.summary && (
        <section className="pl-[25mm]">
          <h3 className="font-black uppercase tracking-widest text-sm mb-3 text-slate-400">01 / {pt('preview.profile')}</h3>
          <MarkdownText text={data.summary} className="text-sm leading-relaxed font-medium text-slate-700 bg-white p-4 border-l-4 border-slate-900 shadow-sm" style={{ borderColor: data.themeColor }} />
        </section>
      )}

      {data.experience.length > 0 && (
        <section>
          <div className="pl-[25mm] mb-6">
            <h3 className="font-black uppercase tracking-widest text-sm text-slate-400">02 / {pt('preview.experience')}</h3>
          </div>
          <div className="space-y-8">
            {data.experience.map((exp) => (
              <div key={exp.id} className="relative flex group">
                {/* Timeline Dot */}
                <div className="w-[15mm] flex justify-center pt-1.5 shrink-0 z-10 bg-white">
                  <div className="w-4 h-4 rounded-full border-4 border-white shadow-sm" style={{ backgroundColor: data.themeColor }}></div>
                </div>
                {/* Content */}
                <div className="flex-1 pl-[10mm]">
                  <div className="flex justify-between items-baseline mb-1">
                    <h4 className="font-bold text-lg text-slate-900">{exp.role}</h4>
                    <span className="font-mono text-xs font-bold bg-slate-100 px-2 py-1 rounded">{exp.dates}</span>
                  </div>
                  <div className="mb-2 font-medium" style={{ color: data.themeColor }}>{exp.company}</div>
                  <MarkdownText text={exp.description} className="text-sm text-slate-600 leading-relaxed" />
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {data.education.length > 0 && (
        <section>
          <div className="pl-[25mm] mb-6">
            <h3 className="font-black uppercase tracking-widest text-sm text-slate-400">03 / {pt('preview.education')}</h3>
          </div>
          <div className="space-y-6">
            {data.education.map((edu) => (
              <div key={edu.id} className="relative flex group">
                {/* Timeline Dot */}
                <div className="w-[15mm] flex justify-center pt-1.5 shrink-0 z-10 bg-white">
                  <div className="w-3 h-3 rounded-full border-2 border-slate-300 bg-white"></div>
                </div>
                <div className="flex-1 pl-[10mm]">
                  <h4 className="font-bold text-slate-900">{edu.school}</h4>
                  <div className="text-sm font-medium" style={{ color: data.themeColor }}>{edu.degree}</div>
                  <div className="text-xs text-slate-500 mt-1 font-mono">{edu.dates}</div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      <div className="pl-[25mm] grid grid-cols-2 gap-8">
        {skillsArray.length > 0 && (
          <section>
            <h3 className="font-black uppercase tracking-widest text-sm text-slate-400 mb-4">04 / {pt('preview.skills')}</h3>
            <div className="flex flex-wrap gap-2">
              {skillsArray.map((skill, i) => (
                <span key={i} className="px-2 py-1 bg-slate-900 text-white text-xs font-bold rounded-sm" style={{ backgroundColor: data.themeColor }}>{skill}</span>
              ))}
            </div>
          </section>
        )}
        {(data.languages || []).length > 0 && (
          <section>
            <h3 className="font-black uppercase tracking-widest text-sm text-slate-400 mb-4">05 / {pt('preview.languages')}</h3>
            <ul className="space-y-2">
              {data.languages.map((lang, i) => (
                <li key={i} className="flex justify-between items-center text-sm border-b border-dotted border-slate-300 pb-1">
                  <span className="font-bold">{lang.name}</span>
                  <span className="text-xs text-slate-500">{lang.proficiency}</span>
                </li>
              ))}
            </ul>
          </section>
        )}
      </div>
    </div>
  </div>
);

const SwissTemplate = ({ data, skillsArray }: TemplateProps) => (
  <div className="w-full h-full p-[15mm] text-black flex flex-col font-sans antialiased">
    <header className="mb-12">
      <h1 className="text-6xl font-black tracking-tighter leading-none mb-4">{data.fullName || 'Seu Nome'}</h1>
      <div className="flex justify-between items-end border-t-4 border-black pt-4">
        <p className="text-xl font-bold uppercase tracking-wide">{data.title}</p>
        <div className="text-right text-xs font-mono space-y-1">
          {data.email && <div>{data.email}</div>}
          {data.phone && <div>{data.phone}</div>}
          {data.location && <div>{data.location}</div>}
        </div>
      </div>
    </header>

    <div className="grid grid-cols-12 gap-8 flex-1">
      <div className="col-span-4 space-y-12">
        {skillsArray.length > 0 && (
          <section>
            <h3 className="text-xs font-black uppercase mb-4 border-b border-black pb-1">Skills</h3>
            <ul className="space-y-1 text-sm font-medium">
              {skillsArray.map((skill, i) => (
                <li key={i}>{skill}</li>
              ))}
            </ul>
          </section>
        )}

        {(data.languages || []).length > 0 && (
          <section>
            <h3 className="text-xs font-black uppercase mb-4 border-b border-black pb-1">Languages</h3>
            <ul className="space-y-2 text-sm">
              {data.languages.map((lang, i) => (
                <li key={i}>
                  <div className="font-bold">{lang.name}</div>
                  <div className="text-xs opacity-60">{lang.proficiency}</div>
                </li>
              ))}
            </ul>
          </section>
        )}

        {data.education.length > 0 && (
          <section>
            <h3 className="text-xs font-black uppercase mb-4 border-b border-black pb-1">Education</h3>
            <div className="space-y-6">
              {data.education.map((edu) => (
                <div key={edu.id}>
                  <div className="font-bold text-sm leading-tight">{edu.school}</div>
                  <div className="text-sm mt-1">{edu.degree}</div>
                  <div className="text-xs font-mono mt-1 opacity-60">{edu.dates}</div>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>

      <div className="col-span-8 space-y-12 border-l border-black pl-8">
        {data.summary && (
          <section>
            <h3 className="text-xs font-black uppercase mb-4 text-slate-400">About</h3>
            <MarkdownText text={data.summary} className="text-lg font-medium leading-relaxed" />
          </section>
        )}

        {data.experience.length > 0 && (
          <section>
            <h3 className="text-xs font-black uppercase mb-6 text-slate-400">Experience</h3>
            <div className="space-y-10">
              {data.experience.map((exp) => (
                <div key={exp.id}>
                  <div className="flex justify-between items-baseline mb-2">
                    <h4 className="text-xl font-bold">{exp.role}</h4>
                    <span className="font-mono text-xs">{exp.dates}</span>
                  </div>
                  <div className="text-sm font-bold uppercase tracking-wide mb-3">{exp.company}, {exp.location}</div>
                  <MarkdownText text={exp.description} className="text-sm leading-relaxed text-justify opacity-90" />
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  </div>
);

const GridTemplate = ({ data, skillsArray }: TemplateProps) => (
  <div className="w-full h-full p-[10mm] bg-slate-50 text-slate-800 flex flex-col font-sans">
    <div className="bg-white p-6 shadow-sm border border-slate-200 rounded-lg mb-4 flex justify-between items-center">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">{data.fullName || 'Seu Nome'}</h1>
        <p className="font-medium text-lg mt-1" style={{ color: data.themeColor }}>{data.title}</p>
      </div>
      <div className="text-right text-xs space-y-1 text-slate-500">
        {data.email && <div>{data.email}</div>}
        {data.phone && <div>{data.phone}</div>}
        {data.location && <div>{data.location}</div>}
      </div>
    </div>

    <div className="grid grid-cols-3 gap-4 flex-1">
      {/* Column 1: Summary + Skills */}
      <div className="col-span-1 flex flex-col gap-4">
        {data.photo && (
          <div className="aspect-square w-full rounded-lg overflow-hidden border border-slate-200">
            <img src={data.photo} alt="user" className="w-full h-full object-cover" />
          </div>
        )}

        {data.summary && (
          <div className="bg-white p-5 rounded-lg border border-slate-200 shadow-sm">
            <h3 className="text-xs font-bold uppercase mb-3 flex items-center gap-2">
              <User className="w-3 h-3" /> Profile
            </h3>
            <MarkdownText text={data.summary} className="text-xs leading-relaxed text-slate-600" />
          </div>
        )}

        {skillsArray.length > 0 && (
          <div className="bg-white p-5 rounded-lg border border-slate-200 shadow-sm flex-1">
            <h3 className="text-xs font-bold uppercase mb-3 flex items-center gap-2">
              <Award className="w-3 h-3" /> Skills
            </h3>
            <div className="flex flex-wrap gap-2">
              {skillsArray.map((skill, i) => (
                <span key={i} className="text-[10px] font-bold px-2 py-1 bg-slate-100 rounded text-slate-700">{skill}</span>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Column 2 & 3: Experience */}
      <div className="col-span-2 flex flex-col gap-4">
        {data.experience.length > 0 && (
          <div className="bg-white p-6 rounded-lg border border-slate-200 shadow-sm flex-1">
            <h3 className="text-xs font-bold uppercase mb-6 flex items-center gap-2 border-b border-slate-100 pb-3">
              <Briefcase className="w-3 h-3" /> Experience
            </h3>
            <div className="space-y-6">
              {data.experience.map((exp) => (
                <div key={exp.id} className="grid grid-cols-[1fr_3fr] gap-4">
                  <div className="text-xs">
                    <div className="font-bold" style={{ color: data.themeColor }}>{exp.company}</div>
                    <div className="text-slate-400 mt-1">{exp.dates}</div>
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900 mb-1">{exp.role}</h4>
                    <MarkdownText text={exp.description} className="text-xs text-slate-600 leading-relaxed" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {data.education.length > 0 && (
          <div className="bg-white p-6 rounded-lg border border-slate-200 shadow-sm">
            <h3 className="text-xs font-bold uppercase mb-4 flex items-center gap-2 border-b border-slate-100 pb-2">
              <Award className="w-3 h-3" /> Education
            </h3>
            <div className="grid grid-cols-2 gap-4">
              {data.education.map((edu) => (
                <div key={edu.id} className="text-xs">
                  <div className="font-bold text-slate-900">{edu.school}</div>
                  <div className="text-slate-600">{edu.degree}</div>
                  <div className="text-slate-400 mt-0.5">{edu.dates}</div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  </div>
);

// --- Main Component ---

export const ResumePreview: React.FC<ResumePreviewProps> = ({ data, template }) => {
  const skillsArray = data.skills ? data.skills.split(',').map(s => s.trim()).filter(Boolean) : [];
  const props = { data, skillsArray };

  switch (template) {
    case 'classic':
      return <Wrapper><ClassicTemplate {...props} /></Wrapper>;
    case 'sidebar':
      return <Wrapper><SidebarTemplate {...props} /></Wrapper>;
    case 'minimalist':
      return <Wrapper><MinimalistTemplate {...props} /></Wrapper>;
    case 'executive':
      return <Wrapper><ExecutiveTemplate {...props} /></Wrapper>;
    case 'creative':
      return <Wrapper><CreativeTemplate {...props} /></Wrapper>;
    case 'tech':
      return <Wrapper><TechTemplate {...props} /></Wrapper>;
    case 'compact':
      return <Wrapper><CompactTemplate {...props} /></Wrapper>;
    case 'elegant':
      return <Wrapper><ElegantTemplate {...props} /></Wrapper>;
    case 'bold':
      return <Wrapper><BoldTemplate {...props} /></Wrapper>;
    case 'timeline':
      return <Wrapper><TimelineTemplate {...props} /></Wrapper>;
    case 'swiss':
      return <Wrapper><SwissTemplate {...props} /></Wrapper>;
    case 'grid':
      return <Wrapper><GridTemplate {...props} /></Wrapper>;
    case 'modern':
    default:
      return <Wrapper><ModernTemplate {...props} /></Wrapper>;
  }
};