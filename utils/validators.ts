export interface ValidationResult {
  isValid: boolean;
  message?: string;
}

export const validateEmail = (email: string): ValidationResult => {
  if (!email) {
    return { isValid: false, message: 'Email é obrigatório' };
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return { isValid: false, message: 'Email inválido' };
  }

  return { isValid: true };
};

export const validatePhone = (phone: string): ValidationResult => {
  if (!phone) {
    return { isValid: false, message: 'Telefone é obrigatório' };
  }

  // Remove non-digit characters for validation
  const digitsOnly = phone.replace(/\D/g, '');
  
  // Brazilian phone numbers: 10-11 digits (with area code)
  if (digitsOnly.length < 10 || digitsOnly.length > 11) {
    return { isValid: false, message: 'Telefone deve ter 10 ou 11 dígitos' };
  }

  return { isValid: true };
};

export const validateURL = (url: string): ValidationResult => {
  if (!url) {
    return { isValid: true }; // URL is optional
  }

  try {
    new URL(url.startsWith('http') ? url : `https://${url}`);
    return { isValid: true };
  } catch {
    return { isValid: false, message: 'URL inválida' };
  }
};

export const validateRequired = (value: string, fieldName: string): ValidationResult => {
  if (!value || value.trim().length === 0) {
    return { isValid: false, message: `${fieldName} é obrigatório` };
  }
  return { isValid: true };
};

export const validateMinLength = (value: string, minLength: number, fieldName: string): ValidationResult => {
  if (value.length < minLength) {
    return { isValid: false, message: `${fieldName} deve ter pelo menos ${minLength} caracteres` };
  }
  return { isValid: true };
};

export const validateMaxLength = (value: string, maxLength: number, fieldName: string): ValidationResult => {
  if (value.length > maxLength) {
    return { isValid: false, message: `${fieldName} deve ter no máximo ${maxLength} caracteres` };
  }
  return { isValid: true };
};

export const getWordCount = (text: string): number => {
  return text.trim().split(/\s+/).filter(word => word.length > 0).length;
};

export const getCharacterCount = (text: string): number => {
  return text.length;
};


