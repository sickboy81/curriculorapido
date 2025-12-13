/**
 * Image optimization utilities
 * Compresses and optimizes images before saving
 */

export interface ImageOptimizeOptions {
  maxWidth?: number;
  maxHeight?: number;
  quality?: number; // 0-1
  format?: 'jpeg' | 'webp' | 'png';
  maxSizeKB?: number; // Maximum file size in KB
}

const DEFAULT_OPTIONS: Required<ImageOptimizeOptions> = {
  maxWidth: 800,
  maxHeight: 800,
  quality: 0.8,
  format: 'jpeg',
  maxSizeKB: 200,
};

/**
 * Compress and optimize an image file
 */
export const optimizeImage = async (
  file: File,
  options: ImageOptimizeOptions = {}
): Promise<string> => {
  const opts = { ...DEFAULT_OPTIONS, ...options };

  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        try {
          // Calculate new dimensions
          let { width, height } = img;
          const aspectRatio = width / height;

          if (width > opts.maxWidth) {
            width = opts.maxWidth;
            height = width / aspectRatio;
          }
          if (height > opts.maxHeight) {
            height = opts.maxHeight;
            width = height * aspectRatio;
          }

          // Create canvas
          const canvas = document.createElement('canvas');
          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext('2d');

          if (!ctx) {
            reject(new Error('Could not get canvas context'));
            return;
          }

          // Draw and compress
          ctx.drawImage(img, 0, 0, width, height);

          // Convert to desired format
          let mimeType = 'image/jpeg';
          if (opts.format === 'webp') {
            mimeType = 'image/webp';
          } else if (opts.format === 'png') {
            mimeType = 'image/png';
          }

          // Try to compress to target size
          let quality = opts.quality;
          let dataUrl = canvas.toDataURL(mimeType, quality);

          // If still too large, reduce quality
          const sizeKB = (dataUrl.length * 3) / 4 / 1024; // Approximate size
          if (sizeKB > opts.maxSizeKB) {
            quality = Math.max(0.1, opts.maxSizeKB / sizeKB * quality);
            dataUrl = canvas.toDataURL(mimeType, quality);
          }

          resolve(dataUrl);
        } catch (error) {
          reject(error);
        }
      };
      img.onerror = () => reject(new Error('Failed to load image'));
      img.src = e.target?.result as string;
    };
    reader.onerror = () => reject(new Error('Failed to read file'));
    reader.readAsDataURL(file);
  });
};

/**
 * Check if WebP is supported
 */
export const isWebPSupported = (): boolean => {
  const canvas = document.createElement('canvas');
  canvas.width = 1;
  canvas.height = 1;
  return canvas.toDataURL('image/webp').indexOf('data:image/webp') === 0;
};

/**
 * Get optimal format based on browser support
 */
export const getOptimalFormat = (): 'jpeg' | 'webp' => {
  return isWebPSupported() ? 'webp' : 'jpeg';
};

/**
 * Validate image file before processing
 */
export const validateImageFile = (file: File): { valid: boolean; error?: string } => {
  // Check file type
  if (!file.type.startsWith('image/')) {
    return { valid: false, error: 'O arquivo deve ser uma imagem' };
  }

  // Check file size (5MB limit)
  const maxSize = 5 * 1024 * 1024; // 5MB
  if (file.size > maxSize) {
    return { valid: false, error: 'A imagem deve ter no máximo 5MB' };
  }

  return { valid: true };
};
