import DOMPurify from 'dompurify';

/**
 * Sanitize HTML content to prevent XSS attacks
 */
export const sanitizeHTML = (dirty: string): string => {
  if (typeof window !== 'undefined') {
    return DOMPurify.sanitize(dirty, {
      ALLOWED_TAGS: ['b', 'i', 'em', 'strong', 'a', 'p', 'br', 'ul', 'ol', 'li'],
      ALLOWED_ATTR: ['href', 'target'],
    });
  }
  // Fallback for SSR
  return dirty.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');
};

/**
 * Sanitize plain text (remove HTML tags)
 */
export const sanitizeText = (text: string): string => {
  if (typeof window !== 'undefined') {
    return DOMPurify.sanitize(text, { ALLOWED_TAGS: [] });
  }
  // Fallback for SSR
  return text.replace(/<[^>]*>/g, '');
};

/**
 * Sanitize URL to prevent javascript: and data: protocols
 */
export const sanitizeURL = (url: string): string => {
  if (!url) return '';
  
  // Remove whitespace
  const trimmed = url.trim();
  
  // If it doesn't start with http:// or https://, add https://
  if (!trimmed.match(/^https?:\/\//i)) {
    return `https://${trimmed}`;
  }
  
  // Check for dangerous protocols
  const lower = trimmed.toLowerCase();
  if (lower.startsWith('javascript:') || 
      lower.startsWith('data:') || 
      lower.startsWith('vbscript:') ||
      lower.startsWith('file:')) {
    return '';
  }
  
  return trimmed;
};

/**
 * Sanitize email address
 */
export const sanitizeEmail = (email: string): string => {
  if (!email) return '';
  
  // Remove whitespace
  const trimmed = email.trim();
  
  // Basic email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(trimmed)) {
    return '';
  }
  
  return trimmed.toLowerCase();
};

/**
 * Sanitize phone number (keep only digits and common separators)
 */
export const sanitizePhone = (phone: string): string => {
  if (!phone) return '';
  
  // Keep only digits, spaces, parentheses, hyphens, and plus sign
  return phone.replace(/[^\d\s()\-+]/g, '');
};

/**
 * Sanitize file name
 */
export const sanitizeFileName = (fileName: string): string => {
  if (!fileName) return 'file';
  
  // Remove path separators and dangerous characters
  return fileName
    .replace(/[\/\\?%*:|"<>]/g, '_')
    .replace(/\s+/g, '_')
    .substring(0, 255); // Limit length
};

/**
 * Escape HTML entities
 */
export const escapeHTML = (text: string): string => {
  const map: { [key: string]: string } = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;',
  };
  return text.replace(/[&<>"']/g, (m) => map[m]);
};


