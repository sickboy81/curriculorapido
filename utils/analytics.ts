/**
 * Analytics utilities for tracking user interactions
 */

// Check if gtag is available
declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
    dataLayer?: any[];
  }
}

export const trackEvent = (
  eventName: string,
  eventParams?: {
    [key: string]: any;
  }
) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', eventName, eventParams);
  }
  
  // Also log to console in development
  if (process.env.NODE_ENV === 'development') {
    console.log('Analytics Event:', eventName, eventParams);
  }
};

// Predefined event tracking functions
export const analytics = {
  // PDF Download
  trackPDFDownload: (template: string) => {
    trackEvent('download_pdf', {
      template,
      event_category: 'engagement',
      event_label: 'PDF Download',
    });
  },

  // Template Change
  trackTemplateChange: (fromTemplate: string, toTemplate: string) => {
    trackEvent('change_template', {
      from_template: fromTemplate,
      to_template: toTemplate,
      event_category: 'engagement',
      event_label: 'Template Change',
    });
  },

  // Resume Save
  trackResumeSave: (resumeId: string, resumeName: string) => {
    trackEvent('save_resume', {
      resume_id: resumeId,
      resume_name: resumeName,
      event_category: 'engagement',
      event_label: 'Resume Save',
    });
  },

  // Resume Load
  trackResumeLoad: (resumeId: string) => {
    trackEvent('load_resume', {
      resume_id: resumeId,
      event_category: 'engagement',
      event_label: 'Resume Load',
    });
  },

  // ATS Check
  trackATSCheck: (score: number) => {
    trackEvent('ats_check', {
      score,
      event_category: 'engagement',
      event_label: 'ATS Check',
    });
  },

  // Export Word
  trackWordExport: () => {
    trackEvent('export_word', {
      event_category: 'engagement',
      event_label: 'Word Export',
    });
  },

  // Export JSON
  trackJSONExport: () => {
    trackEvent('export_json', {
      event_category: 'engagement',
      event_label: 'JSON Export',
    });
  },

  // Share Link
  trackShareLink: (platform?: string) => {
    trackEvent('share_link', {
      platform: platform || 'copy',
      event_category: 'social',
      event_label: 'Share Link',
    });
  },

  // Version Restore
  trackVersionRestore: (versionId: string) => {
    trackEvent('restore_version', {
      version_id: versionId,
      event_category: 'engagement',
      event_label: 'Version Restore',
    });
  },

  // Form Section Open
  trackSectionOpen: (section: string) => {
    trackEvent('open_section', {
      section,
      event_category: 'engagement',
      event_label: 'Form Section',
    });
  },

  // Blog Article View
  trackArticleView: (articleTitle: string) => {
    trackEvent('view_article', {
      article_title: articleTitle,
      event_category: 'content',
      event_label: 'Blog Article',
    });
  },

  // Conversion Funnel
  trackFunnelStep: (step: string, stepNumber: number) => {
    trackEvent('funnel_step', {
      step,
      step_number: stepNumber,
      event_category: 'conversion',
      event_label: 'Funnel',
    });
  },

  // Error Tracking
  trackError: (errorMessage: string, errorLocation: string) => {
    trackEvent('error', {
      error_message: errorMessage,
      error_location: errorLocation,
      event_category: 'error',
      event_label: 'Error',
    });
  },
};

