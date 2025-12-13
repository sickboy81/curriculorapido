import React, { useState, useRef } from 'react';
import { CheckCircle, XCircle, AlertTriangle, FileCheck, Search, Zap, Shield, X, Upload, FileText, Loader2, Image as ImageIcon, Download } from 'lucide-react';
import { ResumeData } from '../types';
// Removed multilingual support - Portuguese only
import * as pdfjsLib from 'pdfjs-dist';
import jsPDF from 'jspdf';

// Configure PDF.js worker
if (typeof window !== 'undefined') {
  // Use local worker file from public folder (more reliable than CDN)
  pdfjsLib.GlobalWorkerOptions.workerSrc = '/pdf.worker.min.mjs';
}

interface ATSCheckerProps {
  resumeData: ResumeData;
  showAsSection?: boolean; // If true, shows full content without wrapper button
}

interface CheckResult {
  id: string;
  title: string;
  status: 'pass' | 'warning' | 'fail';
  message: string;
  suggestion?: string;
}

interface ExtractedText {
  fullText: string;
  email?: string;
  phone?: string;
  summary?: string;
  hasExperience: boolean;
  hasEducation: boolean;
  hasSkills: boolean;
  hasLanguages: boolean;
}

export const ATSChecker: React.FC<ATSCheckerProps> = ({ resumeData, showAsSection = false }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [results, setResults] = useState<CheckResult[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadedFileName, setUploadedFileName] = useState<string | null>(null);
  const [analysisMode, setAnalysisMode] = useState<'form' | 'pdf' | 'image'>('form');
  const [convertedPdfUrl, setConvertedPdfUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const imageInputRef = useRef<HTMLInputElement>(null);

  const extractTextFromPDF = async (file: File): Promise<ExtractedText> => {
    try {
      const arrayBuffer = await file.arrayBuffer();
      const loadingTask = pdfjsLib.getDocument({ 
        data: arrayBuffer,
        verbosity: 0 // Suppress warnings
      });
      const pdf = await loadingTask.promise;
      let fullText = '';

      for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        const textContent = await page.getTextContent();
        const pageText = textContent.items.map((item: any) => item.str).join(' ');
        fullText += pageText + ' ';
      }

      // Extract information from text
      const emailRegex = /[\w\.-]+@[\w\.-]+\.\w+/gi;
      const phoneRegex = /(\(?\d{2}\)?\s?)?(\d{4,5}[-.\s]?\d{4})/gi;
      
      const emails = fullText.match(emailRegex) || [];
      const phones = fullText.match(phoneRegex) || [];

      // Try to identify sections
      const lowerText = fullText.toLowerCase();
      const hasExperience = /experiência|experience|trabalho|work|emprego|job|histórico|histórico profissional/i.test(fullText);
      const hasEducation = /formação|education|escolaridade|acadêmica|academic|graduação|degree/i.test(fullText);
      const hasSkills = /habilidades|skills|competências|competencies|conhecimentos/i.test(fullText);
      const hasLanguages = /idiomas|languages|idioma|language/i.test(fullText);

      // Try to extract summary (usually at the beginning, before experience)
      let summary = '';
      const summaryMatch = fullText.match(/(?:resumo|summary|objetivo|objective)[\s\S]{0,300}/i);
      if (summaryMatch) {
        summary = summaryMatch[0].substring(0, 300);
      }

      return {
        fullText: fullText.trim(),
        email: emails[0] || undefined,
        phone: phones[0] || undefined,
        summary: summary || undefined,
        hasExperience,
        hasEducation,
        hasSkills,
        hasLanguages
      };
    } catch (error) {
      console.error('Erro ao extrair texto do PDF:', error);
      throw new Error('Não foi possível extrair texto do PDF. Verifique se o arquivo não está corrompido ou protegido por senha.');
    }
  };

  const analyzeText = (extractedText: ExtractedText): CheckResult[] => {
    const checks: CheckResult[] = [];
    const text = extractedText.fullText.toLowerCase();

    // 1. Check for contact information
    if (!extractedText.email || !extractedText.phone) {
      checks.push({
        id: 'contact',
        title: 'Informações de Contato',
        status: 'fail',
        message: extractedText.email ? 'Telefone não encontrado' : extractedText.phone ? 'Email não encontrado' : 'Email e telefone não encontrados',
        suggestion: 'Certifique-se de que seu currículo contém email e telefone claramente visíveis'
      });
    } else {
      checks.push({
        id: 'contact',
        title: 'Informações de Contato',
        status: 'pass',
        message: `Email e telefone encontrados: ${extractedText.email}, ${extractedText.phone}`
      });
    }

    // 2. Check for professional summary
    if (!extractedText.summary || extractedText.summary.length < 50) {
      checks.push({
        id: 'summary',
        title: 'Resumo Profissional',
        status: 'warning',
        message: 'Resumo não encontrado ou muito curto',
        suggestion: 'Adicione uma seção de resumo profissional de 3-4 linhas no início do currículo'
      });
    } else {
      checks.push({
        id: 'summary',
        title: 'Resumo Profissional',
        status: 'pass',
        message: 'Resumo profissional encontrado'
      });
    }

    // 3. Check for experience
    if (!extractedText.hasExperience) {
      checks.push({
        id: 'experience',
        title: 'Experiência Profissional',
        status: 'warning',
        message: 'Seção de experiência não identificada claramente',
        suggestion: 'Use títulos de seção claros como "Experiência Profissional" ou "Histórico Profissional"'
      });
    } else {
      checks.push({
        id: 'experience',
        title: 'Experiência Profissional',
        status: 'pass',
        message: 'Seção de experiência identificada'
      });
    }

    // 4. Check for education
    if (!extractedText.hasEducation) {
      checks.push({
        id: 'education',
        title: 'Formação Acadêmica',
        status: 'warning',
        message: 'Seção de formação não identificada claramente',
        suggestion: 'Use títulos de seção claros como "Formação Acadêmica" ou "Educação"'
      });
    } else {
      checks.push({
        id: 'education',
        title: 'Formação Acadêmica',
        status: 'pass',
        message: 'Seção de formação identificada'
      });
    }

    // 5. Check for skills
    if (!extractedText.hasSkills) {
      checks.push({
        id: 'skills',
        title: 'Habilidades',
        status: 'warning',
        message: 'Seção de habilidades não identificada',
        suggestion: 'Adicione uma seção de habilidades técnicas e comportamentais'
      });
    } else {
      checks.push({
        id: 'skills',
        title: 'Habilidades',
        status: 'pass',
        message: 'Seção de habilidades identificada'
      });
    }

    // 6. Check for keywords
    const commonKeywords = ['gestão', 'liderança', 'resultados', 'projetos', 'equipe', 'desenvolvimento', 'implementação', 'análise', 'planejamento', 'comunicação'];
    const foundKeywords = commonKeywords.filter(keyword => text.includes(keyword.toLowerCase()));
    
    if (foundKeywords.length < 3) {
      checks.push({
        id: 'keywords',
        title: 'Palavras-Chave',
        status: 'warning',
        message: `Apenas ${foundKeywords.length} palavra(s)-chave comum(is) encontrada(s)`,
        suggestion: 'Inclua mais palavras-chave relevantes da área e da descrição da vaga'
      });
    } else {
      checks.push({
        id: 'keywords',
        title: 'Palavras-Chave',
        status: 'pass',
        message: `${foundKeywords.length} palavra(s)-chave relevante(s) encontrada(s)`
      });
    }

    // 7. Check for quantified results
    const hasNumbers = /\d+/.test(text);
    if (!hasNumbers) {
      checks.push({
        id: 'numbers',
        title: 'Resultados Quantificáveis',
        status: 'warning',
        message: 'Nenhum número ou resultado quantificável encontrado',
        suggestion: 'Adicione números, percentuais, valores ou métricas para destacar seus resultados'
      });
    } else {
      checks.push({
        id: 'numbers',
        title: 'Resultados Quantificáveis',
        status: 'pass',
        message: 'Resultados quantificáveis presentes no currículo'
      });
    }

    // 8. Check for languages
    if (!extractedText.hasLanguages) {
      checks.push({
        id: 'languages',
        title: 'Idiomas',
        status: 'warning',
        message: 'Seção de idiomas não identificada',
        suggestion: 'Adicione uma seção de idiomas se você domina outros idiomas além do português'
      });
    } else {
      checks.push({
        id: 'languages',
        title: 'Idiomas',
        status: 'pass',
        message: 'Seção de idiomas identificada'
      });
    }

    // 9. Check text length (should be substantial)
    const wordCount = extractedText.fullText.split(/\s+/).length;
    if (wordCount < 100) {
      checks.push({
        id: 'length',
        title: 'Tamanho do Currículo',
        status: 'warning',
        message: `Currículo muito curto (${wordCount} palavras)`,
        suggestion: 'Um currículo profissional geralmente tem entre 200-500 palavras'
      });
    } else if (wordCount > 1000) {
      checks.push({
        id: 'length',
        title: 'Tamanho do Currículo',
        status: 'warning',
        message: `Currículo muito longo (${wordCount} palavras)`,
        suggestion: 'Considere resumir para manter o currículo em 1-2 páginas'
      });
    } else {
      checks.push({
        id: 'length',
        title: 'Tamanho do Currículo',
        status: 'pass',
        message: `Tamanho adequado (${wordCount} palavras)`
      });
    }

    return checks;
  };

  const runATSCheckFromForm = () => {
    const checks: CheckResult[] = [];

    // 1. Check for contact information
    if (!resumeData.email || !resumeData.phone) {
      checks.push({
        id: 'contact',
        title: 'Informações de Contato',
        status: 'fail',
        message: 'Email ou telefone estão faltando',
        suggestion: 'Adicione email e telefone para facilitar o contato dos recrutadores'
      });
    } else {
      checks.push({
        id: 'contact',
        title: 'Informações de Contato',
        status: 'pass',
        message: 'Email e telefone presentes'
      });
    }

    // 2. Check for professional summary
    if (!resumeData.summary || resumeData.summary.length < 50) {
      checks.push({
        id: 'summary',
        title: 'Resumo Profissional',
        status: 'warning',
        message: 'Resumo muito curto ou ausente',
        suggestion: 'Adicione um resumo profissional de 3-4 linhas destacando sua experiência e valor'
      });
    } else if (resumeData.summary.length > 300) {
      checks.push({
        id: 'summary',
        title: 'Resumo Profissional',
        status: 'warning',
        message: 'Resumo muito longo',
        suggestion: 'Mantenha o resumo entre 50-300 caracteres para melhor legibilidade'
      });
    } else {
      checks.push({
        id: 'summary',
        title: 'Resumo Profissional',
        status: 'pass',
        message: 'Resumo profissional adequado'
      });
    }

    // 3. Check for experience
    if (resumeData.experience.length === 0) {
      checks.push({
        id: 'experience',
        title: 'Experiência Profissional',
        status: 'warning',
        message: 'Nenhuma experiência adicionada',
        suggestion: 'Adicione pelo menos uma experiência profissional, mesmo que seja estágio ou trabalho voluntário'
      });
    } else {
      const hasDescriptions = resumeData.experience.every(exp => exp.description && exp.description.length > 20);
      if (!hasDescriptions) {
        checks.push({
          id: 'experience',
          title: 'Experiência Profissional',
          status: 'warning',
          message: 'Algumas experiências têm descrições muito curtas',
          suggestion: 'Adicione descrições detalhadas usando a fórmula CAR (Contexto, Ação, Resultado)'
        });
      } else {
        checks.push({
          id: 'experience',
          title: 'Experiência Profissional',
          status: 'pass',
          message: `${resumeData.experience.length} experiência(s) com descrições adequadas`
        });
      }
    }

    // 4. Check for education
    if (resumeData.education.length === 0) {
      checks.push({
        id: 'education',
        title: 'Formação Acadêmica',
        status: 'warning',
        message: 'Nenhuma formação adicionada',
        suggestion: 'Adicione sua formação acadêmica, mesmo que esteja em andamento'
      });
    } else {
      checks.push({
        id: 'education',
        title: 'Formação Acadêmica',
        status: 'pass',
        message: `${resumeData.education.length} formação(ões) adicionada(s)`
      });
    }

    // 5. Check for skills
    const skillsArray = resumeData.skills ? resumeData.skills.split(',').map(s => s.trim()).filter(Boolean) : [];
    if (skillsArray.length === 0) {
      checks.push({
        id: 'skills',
        title: 'Habilidades',
        status: 'fail',
        message: 'Nenhuma habilidade adicionada',
        suggestion: 'Adicione habilidades técnicas e comportamentais relevantes para a vaga'
      });
    } else if (skillsArray.length < 3) {
      checks.push({
        id: 'skills',
        title: 'Habilidades',
        status: 'warning',
        message: 'Poucas habilidades adicionadas',
        suggestion: 'Adicione mais habilidades para destacar suas competências'
      });
    } else {
      checks.push({
        id: 'skills',
        title: 'Habilidades',
        status: 'pass',
        message: `${skillsArray.length} habilidade(s) adicionada(s)`
      });
    }

    // 6. Check for keywords density
    const allText = [
      resumeData.fullName,
      resumeData.title,
      resumeData.summary,
      ...resumeData.experience.map(e => `${e.role} ${e.company} ${e.description}`),
      ...resumeData.education.map(e => `${e.degree} ${e.school}`),
      resumeData.skills
    ].join(' ').toLowerCase();

    const commonKeywords = ['gestão', 'liderança', 'resultados', 'projetos', 'equipe', 'desenvolvimento', 'implementação', 'análise', 'planejamento', 'comunicação'];
    const foundKeywords = commonKeywords.filter(keyword => allText.includes(keyword.toLowerCase()));
    
    if (foundKeywords.length < 3) {
      checks.push({
        id: 'keywords',
        title: 'Palavras-Chave',
        status: 'warning',
        message: `Apenas ${foundKeywords.length} palavra(s)-chave comum(is) encontrada(s)`,
        suggestion: 'Inclua mais palavras-chave relevantes da área e da descrição da vaga'
      });
    } else {
      checks.push({
        id: 'keywords',
        title: 'Palavras-Chave',
        status: 'pass',
        message: `${foundKeywords.length} palavra(s)-chave relevante(s) encontrada(s)`
      });
    }

    // 7. Check for quantified results
    const hasNumbers = /\d+/.test(allText);
    if (!hasNumbers) {
      checks.push({
        id: 'numbers',
        title: 'Resultados Quantificáveis',
        status: 'warning',
        message: 'Nenhum número ou resultado quantificável encontrado',
        suggestion: 'Adicione números, percentuais, valores ou métricas para destacar seus resultados'
      });
    } else {
      checks.push({
        id: 'numbers',
        title: 'Resultados Quantificáveis',
        status: 'pass',
        message: 'Resultados quantificáveis presentes no currículo'
      });
    }

    // 8. Check for languages
    if (resumeData.languages.length === 0) {
      checks.push({
        id: 'languages',
        title: 'Idiomas',
        status: 'warning',
        message: 'Nenhum idioma adicionado',
        suggestion: 'Adicione idiomas que você domina, especialmente inglês e espanhol'
      });
    } else {
      checks.push({
        id: 'languages',
        title: 'Idiomas',
        status: 'pass',
        message: `${resumeData.languages.length} idioma(s) adicionado(s)`
      });
    }

    return checks;
  };

  const convertImageToPDF = async (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      
      reader.onload = (e) => {
        const img = new Image();
        img.onload = () => {
          try {
            const pdf = new jsPDF({
              orientation: img.width > img.height ? 'landscape' : 'portrait',
              unit: 'mm',
              format: 'a4'
            });

            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = pdf.internal.pageSize.getHeight();
            
            // Calculate dimensions to fit image in A4
            const imgWidth = img.width;
            const imgHeight = img.height;
            const ratio = Math.min(pdfWidth / (imgWidth * 0.264583), pdfHeight / (imgHeight * 0.264583));
            
            const finalWidth = imgWidth * 0.264583 * ratio;
            const finalHeight = imgHeight * 0.264583 * ratio;
            
            const x = (pdfWidth - finalWidth) / 2;
            const y = (pdfHeight - finalHeight) / 2;

            pdf.addImage(img.src, 'JPEG', x, y, finalWidth, finalHeight);
            
            const pdfBlob = pdf.output('blob');
            const url = URL.createObjectURL(pdfBlob);
            resolve(url);
          } catch (error) {
            reject(error);
          }
        };
        
        img.onerror = () => reject(new Error('Erro ao carregar imagem'));
        img.src = e.target?.result as string;
      };
      
      reader.onerror = () => reject(new Error('Erro ao ler arquivo'));
      reader.readAsDataURL(file);
    });
  };

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const validImageTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
    if (!validImageTypes.includes(file.type)) {
      alert('Por favor, selecione uma imagem válida (JPG, PNG ou WEBP)');
      return;
    }

    setIsUploading(true);
    setUploadedFileName(file.name);

    try {
      // Convert image to PDF
      const pdfUrl = await convertImageToPDF(file);
      setConvertedPdfUrl(pdfUrl);
      
      // Basic analysis for images (limited without OCR)
      const checks: CheckResult[] = [{
        id: 'conversion',
        title: 'Conversão para PDF',
        status: 'pass',
        message: 'Imagem convertida para PDF com sucesso!'
      }, {
        id: 'format',
        title: 'Formato do Arquivo',
        status: 'pass',
        message: 'PDF gerado no formato A4, pronto para envio'
      }, {
        id: 'note',
        title: 'Análise ATS Completa',
        status: 'warning',
        message: 'Para análise completa de ATS, recomendamos usar um PDF com texto selecionável',
        suggestion: 'O PDF foi gerado da imagem. Para melhor análise, considere criar um novo currículo usando nosso formulário ou converter o PDF original com texto'
      }];

      setResults(checks);
      setIsOpen(true);
      setAnalysisMode('image');
    } catch (error) {
      console.error('Erro ao converter imagem:', error);
      alert('Erro ao converter imagem para PDF. Tente novamente.');
    } finally {
      setIsUploading(false);
      if (imageInputRef.current) {
        imageInputRef.current.value = '';
      }
    }
  };

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file || file.type !== 'application/pdf') {
      alert('Por favor, selecione um arquivo PDF válido');
      return;
    }

    setIsUploading(true);
    setUploadedFileName(file.name);

    try {
      const extractedText = await extractTextFromPDF(file);
      const checks = analyzeText(extractedText);
      
      // Calculate score
      const passCount = checks.filter(c => c.status === 'pass').length;
      const warningCount = checks.filter(c => c.status === 'warning').length;
      const failCount = checks.filter(c => c.status === 'fail').length;
      const totalChecks = checks.length;
      const score = Math.round((passCount / totalChecks) * 100);

      checks.unshift({
        id: 'score',
        title: 'Pontuação ATS',
        status: score >= 80 ? 'pass' : score >= 60 ? 'warning' : 'fail',
        message: `${score}% - ${passCount} passou, ${warningCount} avisos, ${failCount} falhas`,
        suggestion: score < 80 ? 'Melhore os itens marcados para aumentar suas chances de passar no ATS' : undefined
      });

      setResults(checks);
      setIsOpen(true);
      setAnalysisMode('pdf');
    } catch (error: any) {
      console.error('Erro ao processar PDF:', error);
      const errorMessage = error?.message || 'Erro desconhecido';
      alert(`Erro ao processar o PDF: ${errorMessage}\n\nCertifique-se de que:\n- O arquivo não está corrompido\n- O PDF não está protegido por senha\n- O arquivo é um PDF válido`);
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const handleCheckClick = () => {
    if (analysisMode === 'form') {
      const checks = runATSCheckFromForm();
      
      // Calculate score
      const passCount = checks.filter(c => c.status === 'pass').length;
      const warningCount = checks.filter(c => c.status === 'warning').length;
      const failCount = checks.filter(c => c.status === 'fail').length;
      const totalChecks = checks.length;
      const score = Math.round((passCount / totalChecks) * 100);

      checks.unshift({
        id: 'score',
        title: 'Pontuação ATS',
        status: score >= 80 ? 'pass' : score >= 60 ? 'warning' : 'fail',
        message: `${score}% - ${passCount} passou, ${warningCount} avisos, ${failCount} falhas`,
        suggestion: score < 80 ? 'Melhore os itens marcados para aumentar suas chances de passar no ATS' : undefined
      });

      setResults(checks);
      setIsOpen(true);
    } else if (analysisMode === 'pdf') {
      fileInputRef.current?.click();
    } else if (analysisMode === 'image') {
      imageInputRef.current?.click();
    }
  };

  const handleDownloadConvertedPDF = () => {
    if (convertedPdfUrl) {
      const link = document.createElement('a');
      link.href = convertedPdfUrl;
      link.download = uploadedFileName ? uploadedFileName.replace(/\.[^/.]+$/, '.pdf') : 'curriculo.pdf';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pass':
        return <CheckCircle className="w-5 h-5 text-emerald-600" />;
      case 'warning':
        return <AlertTriangle className="w-5 h-5 text-amber-600" />;
      case 'fail':
        return <XCircle className="w-5 h-5 text-red-600" />;
      default:
        return null;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pass':
        return 'bg-emerald-50 border-emerald-200 text-emerald-800';
      case 'warning':
        return 'bg-amber-50 border-amber-200 text-amber-800';
      case 'fail':
        return 'bg-red-50 border-red-200 text-red-800';
      default:
        return 'bg-slate-50 border-slate-200 text-slate-800';
    }
  };

  // If showAsSection is true, show content directly without wrapper button
  if (showAsSection) {
    return (
      <>
        <div className="space-y-6">
          {/* Mode Selector */}
          <div className="flex gap-3 justify-center">
            <button
              onClick={() => setAnalysisMode('form')}
              className={`px-4 py-2 rounded-lg transition-all font-medium ${
                analysisMode === 'form' 
                  ? 'bg-purple-600 text-white shadow-md' 
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              <FileText className="w-4 h-4 inline mr-2" />
              Analisar Formulário
            </button>
            <button
              onClick={() => setAnalysisMode('pdf')}
              className={`px-4 py-2 rounded-lg transition-all font-medium ${
                analysisMode === 'pdf' 
                  ? 'bg-purple-600 text-white shadow-md' 
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              <Upload className="w-4 h-4 inline mr-2" />
              Enviar PDF
            </button>
            <button
              onClick={() => setAnalysisMode('image')}
              className={`px-4 py-2 rounded-lg transition-all font-medium ${
                analysisMode === 'image' 
                  ? 'bg-purple-600 text-white shadow-md' 
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              <ImageIcon className="w-4 h-4 inline mr-2" />
              Enviar Imagem
            </button>
          </div>

          {/* Action Button */}
          <div className="flex justify-center">
            <button
              onClick={handleCheckClick}
              disabled={isUploading}
              className="flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl hover:from-purple-700 hover:to-blue-700 transition-all shadow-lg hover:shadow-xl font-semibold text-base disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isUploading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>Processando...</span>
                </>
              ) : (
                <>
                  <FileCheck className="w-5 h-5" />
                  <span>
                    {analysisMode === 'form' ? 'Verificar ATS do Currículo' : 
                     analysisMode === 'pdf' ? 'Selecionar e Verificar PDF' : 
                     'Selecionar e Converter Imagem'}
                  </span>
                </>
              )}
            </button>
          </div>

          {/* Show results if available */}
          {results.length > 0 && !isOpen && (
            <div className="mt-6 space-y-4">
              {results.map((result) => (
                <div
                  key={result.id}
                  className={`border-2 rounded-xl p-4 ${getStatusColor(result.status)} transition-all`}
                >
                  <div className="flex items-start gap-3">
                    <div className="mt-0.5">
                      {getStatusIcon(result.status)}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-bold mb-1">{result.title}</h4>
                      <p className="text-sm mb-2">{result.message}</p>
                      {result.suggestion && (
                        <div className="mt-2 pt-2 border-t border-current/20">
                          <p className="text-xs font-medium opacity-90">
                            <Zap className="w-3 h-3 inline mr-1" />
                            {result.suggestion}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <input
          ref={fileInputRef}
          type="file"
          accept=".pdf"
          onChange={handleFileUpload}
          className="hidden"
        />
        <input
          ref={imageInputRef}
          type="file"
          accept="image/jpeg,image/jpg,image/png,image/webp"
          onChange={handleImageUpload}
          className="hidden"
        />

        {/* Modal for results when showAsSection is true */}
        {isOpen && (
          <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={() => setIsOpen(false)}>
            <div 
              className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="sticky top-0 bg-gradient-to-r from-purple-600 to-blue-600 text-white p-6 rounded-t-2xl flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-white/20 rounded-lg">
                    <Shield className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold">Verificador de ATS</h3>
                    <p className="text-sm text-white/90">
                      {analysisMode === 'pdf' && uploadedFileName 
                        ? `Análise de: ${uploadedFileName}` 
                        : analysisMode === 'image' && uploadedFileName
                        ? `Imagem: ${uploadedFileName}`
                        : 'Análise de compatibilidade com sistemas de triagem'}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 hover:bg-white/20 rounded-lg transition-colors"
                  aria-label="Fechar"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="p-6 space-y-4">
                {results.map((result) => (
                  <div
                    key={result.id}
                    className={`border-2 rounded-xl p-4 ${getStatusColor(result.status)} transition-all`}
                  >
                    <div className="flex items-start gap-3">
                      <div className="mt-0.5">
                        {getStatusIcon(result.status)}
                      </div>
                      <div className="flex-1">
                        <h4 className="font-bold mb-1">{result.title}</h4>
                        <p className="text-sm mb-2">{result.message}</p>
                        {result.suggestion && (
                          <div className="mt-2 pt-2 border-t border-current/20">
                            <p className="text-xs font-medium opacity-90">
                              <Zap className="w-3 h-3 inline mr-1" />
                              {result.suggestion}
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}

                {analysisMode === 'image' && convertedPdfUrl && (
                  <div className="mt-6 p-4 bg-gradient-to-r from-purple-50 to-blue-50 rounded-xl border-2 border-purple-200">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <FileText className="w-5 h-5 text-purple-600" />
                        <h4 className="font-bold text-slate-900">PDF Gerado com Sucesso!</h4>
                      </div>
                      <button
                        onClick={handleDownloadConvertedPDF}
                        className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors font-medium text-sm"
                      >
                        <Download className="w-4 h-4" />
                        Baixar PDF
                      </button>
                    </div>
                    <p className="text-sm text-slate-700">
                      Sua imagem foi convertida para PDF no formato A4. O arquivo está pronto para ser enviado em processos seletivos.
                    </p>
                  </div>
                )}

                <div className="mt-6 p-4 bg-slate-50 rounded-xl border border-slate-200">
                  <h4 className="font-bold text-slate-900 mb-2 flex items-center gap-2">
                    <Search className="w-5 h-5 text-purple-600" />
                    Dicas para Melhorar
                  </h4>
                  <ul className="text-sm text-slate-700 space-y-2 list-disc list-inside">
                    <li>Use palavras-chave da descrição da vaga no seu currículo</li>
                    <li>Mantenha o formato simples, evitando tabelas e colunas complexas</li>
                    <li>Use nomes de seções padrão: "Experiência Profissional", "Formação Acadêmica"</li>
                    <li>Salve sempre em PDF para preservar a formatação</li>
                    <li>Inclua números e resultados quantificáveis nas descrições</li>
                    <li>Revise ortografia e gramática cuidadosamente</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}
      </>
    );
  }

  // Original compact mode (for backward compatibility)
  return (
    <>
      <div className="flex flex-col gap-2">
        <button
          onClick={handleCheckClick}
          disabled={isUploading}
          className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all shadow-md hover:shadow-lg font-medium text-sm disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isUploading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Processando...</span>
            </>
          ) : (
            <>
              <FileCheck className="w-4 h-4" />
              <span>
                {analysisMode === 'form' ? 'Verificar ATS' : 
                 analysisMode === 'pdf' ? 'Enviar PDF' : 
                 'Enviar Imagem'}
              </span>
            </>
          )}
        </button>
        
        <div className="flex gap-2 text-xs">
          <button
            onClick={() => setAnalysisMode('form')}
            className={`px-2 py-1 rounded transition-colors ${
              analysisMode === 'form' 
                ? 'bg-purple-100 text-purple-700 font-medium' 
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            Formulário
          </button>
          <button
            onClick={() => setAnalysisMode('pdf')}
            className={`px-2 py-1 rounded transition-colors ${
              analysisMode === 'pdf' 
                ? 'bg-purple-100 text-purple-700 font-medium' 
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            PDF
          </button>
          <button
            onClick={() => setAnalysisMode('image')}
            className={`px-2 py-1 rounded transition-colors ${
              analysisMode === 'image' 
                ? 'bg-purple-100 text-purple-700 font-medium' 
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            Imagem
          </button>
        </div>
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept=".pdf"
        onChange={handleFileUpload}
        className="hidden"
      />
      <input
        ref={imageInputRef}
        type="file"
        accept="image/jpeg,image/jpg,image/png,image/webp"
        onChange={handleImageUpload}
        className="hidden"
      />

      {isOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={() => setIsOpen(false)}>
          <div 
            className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="sticky top-0 bg-gradient-to-r from-purple-600 to-blue-600 text-white p-6 rounded-t-2xl flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-white/20 rounded-lg">
                  <Shield className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-bold">Verificador de ATS</h3>
                  <p className="text-sm text-white/90">
                    {analysisMode === 'pdf' && uploadedFileName 
                      ? `Análise de: ${uploadedFileName}` 
                      : analysisMode === 'image' && uploadedFileName
                      ? `Imagem: ${uploadedFileName}`
                      : 'Análise de compatibilidade com sistemas de triagem'}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 hover:bg-white/20 rounded-lg transition-colors"
                aria-label="Fechar"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-4">
              {results.map((result) => (
                <div
                  key={result.id}
                  className={`border-2 rounded-xl p-4 ${getStatusColor(result.status)} transition-all`}
                >
                  <div className="flex items-start gap-3">
                    <div className="mt-0.5">
                      {getStatusIcon(result.status)}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-bold mb-1">{result.title}</h4>
                      <p className="text-sm mb-2">{result.message}</p>
                      {result.suggestion && (
                        <div className="mt-2 pt-2 border-t border-current/20">
                          <p className="text-xs font-medium opacity-90">
                            <Zap className="w-3 h-3 inline mr-1" />
                            {result.suggestion}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}

              {analysisMode === 'image' && convertedPdfUrl && (
                <div className="mt-6 p-4 bg-gradient-to-r from-purple-50 to-blue-50 rounded-xl border-2 border-purple-200">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <FileText className="w-5 h-5 text-purple-600" />
                      <h4 className="font-bold text-slate-900">PDF Gerado com Sucesso!</h4>
                    </div>
                    <button
                      onClick={handleDownloadConvertedPDF}
                      className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors font-medium text-sm"
                    >
                      <Download className="w-4 h-4" />
                      Baixar PDF
                    </button>
                  </div>
                  <p className="text-sm text-slate-700">
                    Sua imagem foi convertida para PDF no formato A4. O arquivo está pronto para ser enviado em processos seletivos.
                  </p>
                </div>
              )}

              <div className="mt-6 p-4 bg-slate-50 rounded-xl border border-slate-200">
                <h4 className="font-bold text-slate-900 mb-2 flex items-center gap-2">
                  <Search className="w-5 h-5 text-purple-600" />
                  Dicas para Melhorar
                </h4>
                <ul className="text-sm text-slate-700 space-y-2 list-disc list-inside">
                  <li>Use palavras-chave da descrição da vaga no seu currículo</li>
                  <li>Mantenha o formato simples, evitando tabelas e colunas complexas</li>
                  <li>Use nomes de seções padrão: "Experiência Profissional", "Formação Acadêmica"</li>
                  <li>Salve sempre em PDF para preservar a formatação</li>
                  <li>Inclua números e resultados quantificáveis nas descrições</li>
                  <li>Revise ortografia e gramática cuidadosamente</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
