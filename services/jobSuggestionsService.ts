import { ResumeData } from "../types";

export interface JobSuggestion {
  type: 'skill' | 'experience' | 'summary' | 'keyword';
  title: string;
  description: string;
  action?: string;
  priority: 'high' | 'medium' | 'low';
}

export interface JobAnalysis {
  suggestions: JobSuggestion[];
  matchScore: number;
  missingKeywords: string[];
  matchedKeywords: string[];
  strengths: string[];
  improvements: string[];
}

// Palavras-chave comuns por área (expandido)
const COMMON_KEYWORDS = {
  tech: ['javascript', 'python', 'react', 'node', 'sql', 'git', 'api', 'html', 'css', 'typescript', 'java', 'php', 'angular', 'vue', 'docker', 'kubernetes', 'aws', 'azure', 'mongodb', 'postgresql', 'mysql', 'redis', 'graphql', 'rest', 'microservices', 'ci/cd', 'devops', 'linux', 'bash', 'powershell'],
  design: ['figma', 'photoshop', 'illustrator', 'ui', 'ux', 'design', 'prototipo', 'wireframe', 'sketch', 'adobe xd', 'invision', 'zeplin', 'principle', 'framer', 'design system'],
  marketing: ['seo', 'google ads', 'facebook ads', 'analytics', 'métricas', 'conversão', 'tráfego', 'google analytics', 'facebook pixel', 'remarketing', 'content marketing', 'email marketing', 'inbound', 'outbound'],
  sales: ['vendas', 'negociação', 'cliente', 'prospecção', 'fechamento', 'meta', 'crm', 'pipeline', 'funil', 'b2b', 'b2c', 'sdr', 'bdr', 'account manager'],
  management: ['liderança', 'gestão', 'equipe', 'projeto', 'scrum', 'agile', 'kanban', 'pm', 'product manager', 'project manager', 'pmo', 'okr', 'kpi'],
  general: ['comunicação', 'trabalho em equipe', 'organização', 'proatividade', 'resolução de problemas', 'pensamento crítico', 'criatividade', 'adaptabilidade']
};

// Sinônimos e variações de palavras-chave
const KEYWORD_SYNONYMS: Record<string, string[]> = {
  'javascript': ['js', 'ecmascript', 'nodejs', 'node.js'],
  'python': ['py', 'django', 'flask', 'pandas', 'numpy'],
  'react': ['reactjs', 'react.js', 'react native'],
  'typescript': ['ts', 'tsx'],
  'html': ['html5'],
  'css': ['css3', 'sass', 'scss', 'less', 'styled-components'],
  'sql': ['mysql', 'postgresql', 'postgres', 'sql server', 'oracle', 'mongodb', 'nosql'],
  'git': ['github', 'gitlab', 'bitbucket', 'versionamento'],
  'api': ['rest api', 'restful', 'graphql', 'soap'],
  'ui': ['interface', 'interface do usuário', 'user interface'],
  'ux': ['experiência do usuário', 'user experience', 'usabilidade'],
  'seo': ['search engine optimization', 'otimização para buscadores'],
  'scrum': ['metodologia ágil', 'agile', 'sprint'],
  'liderança': ['liderar', 'lider', 'gestão de equipe', 'coordenar equipe'],
  'gestão': ['gerenciamento', 'administração', 'management'],
  'vendas': ['comercial', 'vendedor', 'representante comercial'],
};

// Soft skills comuns
const SOFT_SKILLS = [
  'comunicação', 'trabalho em equipe', 'liderança', 'proatividade', 'organização',
  'resolução de problemas', 'pensamento crítico', 'criatividade', 'adaptabilidade',
  'flexibilidade', 'resiliência', 'empatia', 'negociação', 'gestão de tempo',
  'trabalho sob pressão', 'multitarefa', 'atenção aos detalhes', 'aprendizado contínuo'
];

// Normalizar texto para comparação
const normalizeText = (text: string): string => {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // Remove acentos
    .replace(/[^a-z0-9\s]/g, ' ') // Remove caracteres especiais
    .replace(/\s+/g, ' ') // Normaliza espaços
    .trim();
};

// Extrair palavras-chave da descrição da vaga (melhorado)
const extractKeywords = (text: string): string[] => {
  const normalizedText = normalizeText(text);
  const keywords: Set<string> = new Set();
  
  // Buscar palavras-chave comuns (incluindo sinônimos)
  Object.values(COMMON_KEYWORDS).flat().forEach(keyword => {
    const normalizedKeyword = normalizeText(keyword);
    if (normalizedText.includes(normalizedKeyword)) {
      keywords.add(keyword);
    }
    // Verificar sinônimos
    if (KEYWORD_SYNONYMS[keyword]) {
      KEYWORD_SYNONYMS[keyword].forEach(synonym => {
        if (normalizedText.includes(normalizeText(synonym))) {
          keywords.add(keyword);
        }
      });
    }
  });
  
  // Extrair palavras técnicas (geralmente em maiúsculas ou com caracteres especiais)
  const techWords = text.match(/\b[A-Z]{2,}(?:\.[A-Z]+)?\b/g) || [];
  techWords.forEach(word => {
    const normalized = normalizeText(word);
    if (normalized.length > 2) {
      keywords.add(normalized);
    }
  });
  
  // Extrair habilidades mencionadas com padrões melhorados
  const skillPatterns = [
    /(?:conhecimento|experiência|domínio|habilidade|competência|proficiência).*?(?:em|com|de)\s+([a-záàâãéèêíìîóòôõúùûç\s]{3,30})/gi,
    /([a-záàâãéèêíìîóòôõúùûç\s]{3,30})\s+(?:avançado|intermediário|básico|expert|sênior|junior|pleno)/gi,
    /(?:requisitos|desejável|diferencial).*?:\s*([a-záàâãéèêíìîóòôõúùûç\s,]{5,100})/gi
  ];
  
  skillPatterns.forEach(pattern => {
    const matches = text.matchAll(pattern);
    for (const match of matches) {
      if (match[1]) {
        const extracted = match[1].trim().toLowerCase();
        // Dividir por vírgulas e adicionar cada palavra
        extracted.split(',').forEach(part => {
          const cleaned = part.trim();
          if (cleaned.length > 2 && cleaned.length < 50) {
            keywords.add(cleaned);
          }
        });
      }
    }
  });
  
  // Extrair anos de experiência mencionados
  const experienceMatch = text.match(/(\d+)\s*(?:anos?|anoss?)\s*(?:de\s*)?(?:experiência|exp)/gi);
  if (experienceMatch) {
    keywords.add('experiência comprovada');
  }
  
  // Extrair níveis de escolaridade
  const educationLevels = ['superior', 'graduação', 'pós-graduação', 'mestrado', 'doutorado', 'técnico', 'tecnólogo'];
  educationLevels.forEach(level => {
    if (normalizedText.includes(level)) {
      keywords.add(level);
    }
  });
  
  // Filtrar stop words e palavras muito curtas
  const stopWords = ['de', 'da', 'do', 'em', 'e', 'ou', 'para', 'com', 'um', 'uma', 'os', 'as', 'no', 'na', 'por', 'que', 'se', 'ao', 'aos', 'das', 'dos', 'pelo', 'pela', 'pelos', 'pelas', 'a', 'o', 'é', 'são', 'ser', 'ter', 'foi', 'foram', 'está', 'estão', 'mais', 'menos', 'muito', 'muita', 'muitos', 'muitas', 'pouco', 'pouca', 'poucos', 'poucas', 'sem', 'com', 'entre', 'sobre', 'sob', 'após', 'antes', 'durante', 'desde', 'até', 'contra', 'entre', 'perante', 'após', 'trás', 'através', 'mediante', 'conforme', 'segundo', 'exceto', 'salvo', 'tirante', 'afora', 'além', 'aquém', 'dentro', 'fora', 'junto', 'longe', 'perto', 'abaixo', 'acima', 'adiante', 'atrás', 'debaixo', 'defronte', 'depois', 'diante', 'embaixo', 'enfrente', 'entre', 'frente', 'junto', 'longe', 'perto', 'sob', 'sobre', 'trás', 'ter', 'ter', 'ter', 'ter', 'ter'];
  
  return Array.from(keywords)
    .filter(k => k.length > 2 && !stopWords.includes(k))
    .slice(0, 50); // Limitar a 50 palavras-chave mais relevantes
};

// Calcular score de compatibilidade (melhorado)
const calculateMatchScore = (
  resumeText: string,
  jobKeywords: string[]
): { score: number; matchedKeywords: string[]; missingKeywords: string[] } => {
  const normalizedResume = normalizeText(resumeText);
  const matchedKeywords: string[] = [];
  const missingKeywords: string[] = [];
  
  jobKeywords.forEach(keyword => {
    const normalizedKeyword = normalizeText(keyword);
    
    // Verificação exata
    if (normalizedResume.includes(normalizedKeyword)) {
      matchedKeywords.push(keyword);
    } else {
      // Verificar sinônimos
      let found = false;
      if (KEYWORD_SYNONYMS[keyword]) {
        for (const synonym of KEYWORD_SYNONYMS[keyword]) {
          if (normalizedResume.includes(normalizeText(synonym))) {
            matchedKeywords.push(keyword);
            found = true;
            break;
          }
        }
      }
      if (!found) {
        missingKeywords.push(keyword);
      }
    }
  });
  
  if (jobKeywords.length === 0) {
    return { score: 50, matchedKeywords: [], missingKeywords: [] };
  }
  
  // Score baseado em matches
  const baseScore = Math.round((matchedKeywords.length / jobKeywords.length) * 100);
  
  // Bônus por ter muitas keywords importantes
  const importantKeywords = jobKeywords.slice(0, Math.min(10, jobKeywords.length));
  const importantMatches = importantKeywords.filter(k => matchedKeywords.includes(k)).length;
  const bonus = Math.round((importantMatches / importantKeywords.length) * 10);
  
  const finalScore = Math.min(100, baseScore + bonus);
  
  return {
    score: finalScore,
    matchedKeywords,
    missingKeywords
  };
};

// Gerar sugestões baseadas na análise
const generateSuggestions = (
  resumeData: ResumeData,
  jobKeywords: string[],
  missingKeywords: string[]
): JobSuggestion[] => {
  const suggestions: JobSuggestion[] = [];
  const resumeText = `${resumeData.summary} ${resumeData.skills} ${resumeData.experience.map(e => `${e.role} ${e.description}`).join(' ')}`.toLowerCase();
  
  // Sugestões de habilidades faltantes
  const missingSkills = missingKeywords.filter(kw => 
    COMMON_KEYWORDS.tech.includes(kw) || 
    COMMON_KEYWORDS.design.includes(kw) ||
    COMMON_KEYWORDS.marketing.includes(kw)
  );
  
  if (missingSkills.length > 0) {
    suggestions.push({
      type: 'skill',
      title: 'Adicionar Habilidades Faltantes',
      description: `A vaga menciona as seguintes habilidades que não estão no seu currículo: ${missingSkills.slice(0, 5).join(', ')}`,
      action: `Considere adicionar essas habilidades na seção de habilidades do seu currículo`,
      priority: 'high'
    });
  }
  
  // Sugestão de palavras-chave no resumo
  if (missingKeywords.length > 0 && resumeData.summary.length < 100) {
    suggestions.push({
      type: 'summary',
      title: 'Expandir Resumo Profissional',
      description: 'Seu resumo está muito curto. Adicione mais detalhes sobre suas experiências e habilidades principais.',
      action: 'Expanda o resumo incluindo palavras-chave relevantes da vaga',
      priority: 'medium'
    });
  }
  
  // Sugestão de experiência
  if (resumeData.experience.length === 0) {
    suggestions.push({
      type: 'experience',
      title: 'Adicionar Experiências',
      description: 'Seu currículo não possui experiências profissionais listadas.',
      action: 'Adicione suas experiências profissionais, mesmo que sejam estágios ou trabalhos temporários',
      priority: 'high'
    });
  }
  
  // Sugestão de palavras-chave
  const importantKeywords = missingKeywords.slice(0, 3);
  if (importantKeywords.length > 0) {
    suggestions.push({
      type: 'keyword',
      title: 'Incluir Palavras-chave Importantes',
      description: `Inclua estas palavras-chave mencionadas na vaga: ${importantKeywords.join(', ')}`,
      action: 'Adicione essas palavras naturalmente no resumo, experiências ou habilidades',
      priority: 'high'
    });
  }
  
  return suggestions;
};

export const analyzeJobMatch = async (
  resumeData: ResumeData,
  jobDescription: string
): Promise<JobAnalysis> => {
  if (!jobDescription || jobDescription.trim().length < 20) {
    return {
      suggestions: [],
      matchScore: 0,
      missingKeywords: [],
      strengths: [],
      improvements: ['Descrição da vaga muito curta. Forneça uma descrição mais detalhada para uma análise melhor.']
    };
  }

  // Extrair palavras-chave da vaga
  const jobKeywords = extractKeywords(jobDescription);
  
  // Criar texto do currículo para análise
  const resumeText = `
    ${resumeData.fullName || ''}
    ${resumeData.title || ''}
    ${resumeData.summary || ''}
    ${resumeData.skills || ''}
    ${resumeData.experience.map(exp => `${exp.role} ${exp.company} ${exp.description}`).join(' ')}
    ${resumeData.education.map(edu => `${edu.degree} ${edu.school}`).join(' ')}
    ${(resumeData.languages || []).map(lang => lang.name).join(' ')}
  `.toLowerCase();
  
  // Calcular score (melhorado)
  const matchResult = calculateMatchScore(resumeText, jobKeywords);
  const matchScore = matchResult.score;
  const matchedKeywords = matchResult.matchedKeywords;
  const missingKeywords = matchResult.missingKeywords;
  
  // Identificar pontos fortes (melhorado)
  const strengths: string[] = [];
  
  if (matchedKeywords.length > 0) {
    const percentage = Math.round((matchedKeywords.length / jobKeywords.length) * 100);
    strengths.push(`Você possui ${matchedKeywords.length} de ${jobKeywords.length} palavras-chave (${percentage}% de compatibilidade)`);
    
    // Destaque keywords importantes encontradas
    const importantFound = matchedKeywords.slice(0, 5);
    if (importantFound.length > 0) {
      strengths.push(`Palavras-chave importantes encontradas: ${importantFound.join(', ')}`);
    }
  }
  
  if (resumeData.experience.length > 0) {
    const totalYears = resumeData.experience.length;
    strengths.push(`Você possui ${totalYears} experiência(s) profissional(is) listada(s)`);
    
    // Verificar se há experiência relevante
    const relevantExp = resumeData.experience.filter(exp => {
      const expText = normalizeText(`${exp.role} ${exp.company} ${exp.description}`);
      return jobKeywords.some(kw => expText.includes(normalizeText(kw)));
    });
    if (relevantExp.length > 0) {
      strengths.push(`${relevantExp.length} experiência(s) relacionada(s) à vaga encontrada(s)`);
    }
  }
  
  const skillsArray = resumeData.skills ? resumeData.skills.split(',').map(s => s.trim()).filter(Boolean) : [];
  if (skillsArray.length > 5) {
    strengths.push(`Você possui ${skillsArray.length} habilidade(s) listada(s) - bom conjunto de competências`);
  }
  
  // Verificar soft skills
  const resumeNormalized = normalizeText(resumeText);
  const foundSoftSkills = SOFT_SKILLS.filter(skill => resumeNormalized.includes(normalizeText(skill)));
  if (foundSoftSkills.length > 0) {
    strengths.push(`${foundSoftSkills.length} soft skill(s) identificada(s): ${foundSoftSkills.slice(0, 3).join(', ')}`);
  }
  
  // Verificar formação relevante
  if (resumeData.education.length > 0) {
    strengths.push(`Formação acadêmica presente (${resumeData.education.length} curso(s) listado(s))`);
  }
  
  // Gerar melhorias (melhorado)
  const improvements: string[] = [];
  
  if (missingKeywords.length > 0) {
    const topMissing = missingKeywords.slice(0, 5);
    improvements.push(`Adicione ${missingKeywords.length} palavra(s)-chave importante(s): ${topMissing.join(', ')}`);
    
    // Categorizar keywords faltantes
    const missingTech = missingKeywords.filter(kw => 
      COMMON_KEYWORDS.tech.some(tech => normalizeText(tech) === normalizeText(kw))
    );
    if (missingTech.length > 0) {
      improvements.push(`Habilidades técnicas faltantes: ${missingTech.slice(0, 3).join(', ')}`);
    }
  }
  
  if (resumeData.summary.length < 50) {
    improvements.push('Expanda seu resumo profissional (mínimo 50 caracteres) para destacar melhor suas qualificações');
  } else if (resumeData.summary.length < 100) {
    improvements.push('Seu resumo pode ser mais detalhado. Inclua palavras-chave da vaga e destaque suas principais conquistas');
  }
  
  if (resumeData.experience.length === 0) {
    improvements.push('Adicione suas experiências profissionais, mesmo que sejam estágios ou trabalhos temporários');
  } else {
    // Verificar se as descrições de experiência são detalhadas
    const shortDescriptions = resumeData.experience.filter(exp => 
      !exp.description || exp.description.length < 30
    );
    if (shortDescriptions.length > 0) {
      improvements.push(`${shortDescriptions.length} experiência(s) com descrição muito curta. Adicione detalhes sobre suas responsabilidades e conquistas`);
    }
  }
  
  // Verificar se há números/resultados quantificados
  const hasQuantifiedResults = /\d+/.test(resumeText);
  if (!hasQuantifiedResults) {
    improvements.push('Adicione números e resultados quantificados nas suas experiências (ex: "aumentei vendas em 30%")');
  }
  
  // Verificar habilidades
  if (skillsArray.length < 3) {
    improvements.push('Adicione pelo menos 3-5 habilidades relevantes para a vaga');
  } else if (skillsArray.length < 5) {
    improvements.push('Considere adicionar mais habilidades técnicas e comportamentais relevantes');
  }
  
  // Gerar sugestões
  const suggestions = generateSuggestions(resumeData, jobKeywords, missingKeywords);
  
  return {
    matchScore,
    missingKeywords: missingKeywords.slice(0, 15), // Limitar a 15
    matchedKeywords: matchedKeywords.slice(0, 20), // Limitar a 20
    strengths: strengths.length > 0 ? strengths : ['Análise em andamento...'],
    improvements: improvements.length > 0 ? improvements : ['Continue aprimorando seu currículo'],
    suggestions
  };
};

