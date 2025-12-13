import { ResumeData, TemplateType } from '../types';
import { resumeStorage } from './resumeStorage';

/**
 * Generate a shareable link for a resume
 * The link contains encoded resume data in the URL hash
 */
export const generateShareLink = (resumeData: ResumeData, template: TemplateType): string => {
  const data = {
    data: resumeData,
    template,
    timestamp: Date.now(),
  };

  // Encode data as base64
  const encoded = btoa(JSON.stringify(data));
  
  // Create shareable URL
  const baseUrl = window.location.origin;
  return `${baseUrl}/?share=${encoded}`;
};

/**
 * Decode and load resume data from a share link
 */
export const loadFromShareLink = (): { data: ResumeData; template: TemplateType } | null => {
  try {
    const urlParams = new URLSearchParams(window.location.search);
    const shareParam = urlParams.get('share');
    
    if (!shareParam) return null;

    // Decode base64
    const decoded = atob(shareParam);
    const parsed = JSON.parse(decoded);

    // Validate structure
    if (!parsed.data || !parsed.template) {
      return null;
    }

    return {
      data: parsed.data as ResumeData,
      template: parsed.template as TemplateType,
    };
  } catch (error) {
    console.error('Error loading from share link:', error);
    return null;
  }
};

/**
 * Copy share link to clipboard
 */
export const copyShareLink = async (link: string): Promise<boolean> => {
  try {
    await navigator.clipboard.writeText(link);
    return true;
  } catch (error) {
    // Fallback for older browsers
    try {
      const textArea = document.createElement('textarea');
      textArea.value = link;
      textArea.style.position = 'fixed';
      textArea.style.opacity = '0';
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      return true;
    } catch (fallbackError) {
      console.error('Error copying to clipboard:', fallbackError);
      return false;
    }
  }
};
