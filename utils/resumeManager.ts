import { ResumeData } from '../types';
import { TemplateType } from '../types';

export interface SavedResume {
  id: string;
  name: string;
  data: ResumeData;
  template: TemplateType;
  createdAt: number;
  updatedAt: number;
  preview?: string; // Base64 thumbnail
}

const STORAGE_KEY = 'curriculo_rapido_saved_resumes';
const MAX_RESUMES = 20; // Limit to prevent storage issues

export const getAllResumes = (): SavedResume[] => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return [];
    const resumes = JSON.parse(stored) as SavedResume[];
    return resumes.sort((a, b) => b.updatedAt - a.updatedAt);
  } catch (error) {
    console.error('Error loading resumes:', error);
    return [];
  }
};

export const saveResume = (resume: Omit<SavedResume, 'id' | 'createdAt' | 'updatedAt'>): string => {
  try {
    const resumes = getAllResumes();
    const id = `resume_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    const now = Date.now();
    
    const newResume: SavedResume = {
      ...resume,
      id,
      createdAt: now,
      updatedAt: now,
    };

    // Remove oldest if at limit
    if (resumes.length >= MAX_RESUMES) {
      resumes.pop(); // Remove oldest (last in sorted array)
    }

    resumes.unshift(newResume); // Add to beginning
    localStorage.setItem(STORAGE_KEY, JSON.stringify(resumes));
    return id;
  } catch (error) {
    console.error('Error saving resume:', error);
    throw new Error('Erro ao salvar currículo');
  }
};

export const updateResume = (id: string, updates: Partial<SavedResume>): void => {
  try {
    const resumes = getAllResumes();
    const index = resumes.findIndex(r => r.id === id);
    if (index === -1) {
      throw new Error('Currículo não encontrado');
    }

    resumes[index] = {
      ...resumes[index],
      ...updates,
      updatedAt: Date.now(),
    };

    localStorage.setItem(STORAGE_KEY, JSON.stringify(resumes));
  } catch (error) {
    console.error('Error updating resume:', error);
    throw new Error('Erro ao atualizar currículo');
  }
};

export const deleteResume = (id: string): void => {
  try {
    const resumes = getAllResumes();
    const filtered = resumes.filter(r => r.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
  } catch (error) {
    console.error('Error deleting resume:', error);
    throw new Error('Erro ao deletar currículo');
  }
};

export const getResume = (id: string): SavedResume | null => {
  try {
    const resumes = getAllResumes();
    return resumes.find(r => r.id === id) || null;
  } catch (error) {
    console.error('Error getting resume:', error);
    return null;
  }
};

export const duplicateResume = (id: string): string => {
  try {
    const resume = getResume(id);
    if (!resume) {
      throw new Error('Currículo não encontrado');
    }

    const newResume: Omit<SavedResume, 'id' | 'createdAt' | 'updatedAt'> = {
      name: `${resume.name} (Cópia)`,
      data: resume.data,
      template: resume.template,
      preview: resume.preview,
    };

    return saveResume(newResume);
  } catch (error) {
    console.error('Error duplicating resume:', error);
    throw new Error('Erro ao duplicar currículo');
  }
};

