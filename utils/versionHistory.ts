import { ResumeData } from '../types';
import { TemplateType } from '../types';

export interface ResumeVersion {
  id: string;
  timestamp: number;
  data: ResumeData;
  template: TemplateType;
  name?: string; // Optional name/description for the version
}

const VERSION_STORAGE_KEY = 'curriculo_rapido_version_history';
const MAX_VERSIONS = 50; // Maximum number of versions to keep

export const versionHistory = {
  // Get all versions for a resume (sorted by timestamp, newest first)
  getAll(resumeId: string): ResumeVersion[] {
    try {
      const stored = localStorage.getItem(`${VERSION_STORAGE_KEY}_${resumeId}`);
      if (!stored) return [];
      const versions = JSON.parse(stored) as ResumeVersion[];
      return versions.sort((a, b) => b.timestamp - a.timestamp);
    } catch {
      return [];
    }
  },

  // Get a specific version by ID
  get(resumeId: string, versionId: string): ResumeVersion | null {
    const versions = this.getAll(resumeId);
    return versions.find(v => v.id === versionId) || null;
  },

  // Save a new version
  save(resumeId: string, data: ResumeData, template: TemplateType, name?: string): string {
    const versions = this.getAll(resumeId);
    const id = `version_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    
    const newVersion: ResumeVersion = {
      id,
      timestamp: Date.now(),
      data: JSON.parse(JSON.stringify(data)), // Deep clone
      template,
      name,
    };

    versions.unshift(newVersion); // Add to beginning

    // Keep only the most recent MAX_VERSIONS
    const trimmed = versions.slice(0, MAX_VERSIONS);
    
    localStorage.setItem(`${VERSION_STORAGE_KEY}_${resumeId}`, JSON.stringify(trimmed));
    return id;
  },

  // Delete a version
  delete(resumeId: string, versionId: string): boolean {
    const versions = this.getAll(resumeId);
    const filtered = versions.filter(v => v.id !== versionId);
    if (filtered.length === versions.length) return false;
    localStorage.setItem(`${VERSION_STORAGE_KEY}_${resumeId}`, JSON.stringify(filtered));
    return true;
  },

  // Clear all versions for a resume
  clear(resumeId: string): void {
    localStorage.removeItem(`${VERSION_STORAGE_KEY}_${resumeId}`);
  },

  // Get version count
  getCount(resumeId: string): number {
    return this.getAll(resumeId).length;
  },
};


