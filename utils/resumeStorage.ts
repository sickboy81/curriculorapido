import { ResumeData } from '../types';
import { TemplateType } from '../types';

export interface SavedResume {
  id: string;
  name: string;
  data: ResumeData;
  template: TemplateType;
  createdAt: number;
  updatedAt: number;
}

const STORAGE_KEY = 'curriculo_rapido_saved_resumes';
const CURRENT_RESUME_KEY = 'curriculo_rapido_current_resume_id';

export const resumeStorage = {
  // Get all saved resumes
  getAll(): SavedResume[] {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (!stored) return [];
      return JSON.parse(stored);
    } catch {
      return [];
    }
  },

  // Get a specific resume by ID
  get(id: string): SavedResume | null {
    const resumes = this.getAll();
    return resumes.find(r => r.id === id) || null;
  },

  // Save a new resume
  save(name: string, data: ResumeData, template: TemplateType): string {
    const resumes = this.getAll();
    const id = `resume_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    const newResume: SavedResume = {
      id,
      name,
      data,
      template,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };
    resumes.push(newResume);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(resumes));
    return id;
  },

  // Update an existing resume
  update(id: string, updates: Partial<Pick<SavedResume, 'name' | 'data' | 'template'>>): boolean {
    const resumes = this.getAll();
    const index = resumes.findIndex(r => r.id === id);
    if (index === -1) return false;

    resumes[index] = {
      ...resumes[index],
      ...updates,
      updatedAt: Date.now(),
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(resumes));
    return true;
  },

  // Delete a resume
  delete(id: string): boolean {
    const resumes = this.getAll();
    const filtered = resumes.filter(r => r.id !== id);
    if (filtered.length === resumes.length) return false;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
    return true;
  },

  // Duplicate a resume
  duplicate(id: string, newName?: string): string | null {
    const resume = this.get(id);
    if (!resume) return null;

    const duplicatedName = newName || `${resume.name} (Cópia)`;
    return this.save(duplicatedName, resume.data, resume.template);
  },

  // Get current resume ID
  getCurrentId(): string | null {
    return localStorage.getItem(CURRENT_RESUME_KEY);
  },

  // Set current resume ID
  setCurrentId(id: string | null): void {
    if (id) {
      localStorage.setItem(CURRENT_RESUME_KEY, id);
    } else {
      localStorage.removeItem(CURRENT_RESUME_KEY);
    }
  },

  // Clear all resumes (use with caution)
  clearAll(): void {
    localStorage.removeItem(STORAGE_KEY);
    localStorage.removeItem(CURRENT_RESUME_KEY);
  },
};


