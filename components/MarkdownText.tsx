import React from 'react';
import { parseMarkdown } from '../utils/markdownParser';
import DOMPurify from 'dompurify';

interface MarkdownTextProps {
  text: string;
  className?: string;
}

/**
 * Component to safely render markdown text in resume previews
 * Converts markdown syntax to HTML and sanitizes it
 */
export const MarkdownText: React.FC<MarkdownTextProps> = ({ text, className = '' }) => {
  if (!text) return null;

  // Parse markdown to HTML
  const html = parseMarkdown(text);
  
  // Sanitize HTML to prevent XSS
  const sanitizedHtml = DOMPurify.sanitize(html, {
    ALLOWED_TAGS: ['strong', 'em', 'ul', 'ol', 'li', 'br', 'p'],
    ALLOWED_ATTR: [],
  });

  return (
    <div 
      className={className}
      dangerouslySetInnerHTML={{ __html: sanitizedHtml }}
    />
  );
};

export default MarkdownText;

