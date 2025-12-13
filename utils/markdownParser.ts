/**
 * Simple markdown parser for resume descriptions
 * Converts markdown-like syntax to HTML for display
 */

export const parseMarkdown = (text: string): string => {
  if (!text) return '';

  let html = text;

  // First, handle lists (before other formatting to preserve structure)
  // Bullet points (• or - or *)
  const lines = html.split('\n');
  const processedLines: string[] = [];
  let inList = false;
  let inNumberedList = false;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const bulletMatch = line.match(/^[•\-\*]\s+(.+)$/);
    const numberedMatch = line.match(/^(\d+)\.\s+(.+)$/);

    if (bulletMatch) {
      if (!inList) {
        if (inNumberedList) {
          processedLines.push('</ol>');
          inNumberedList = false;
        }
        processedLines.push('<ul>');
        inList = true;
      }
      processedLines.push(`<li>${bulletMatch[1]}</li>`);
    } else if (numberedMatch) {
      if (!inNumberedList) {
        if (inList) {
          processedLines.push('</ul>');
          inList = false;
        }
        processedLines.push('<ol>');
        inNumberedList = true;
      }
      processedLines.push(`<li>${numberedMatch[2]}</li>`);
    } else {
      // Close any open lists
      if (inList) {
        processedLines.push('</ul>');
        inList = false;
      }
      if (inNumberedList) {
        processedLines.push('</ol>');
        inNumberedList = false;
      }
      processedLines.push(line);
    }
  }

  // Close any remaining open lists
  if (inList) {
    processedLines.push('</ul>');
  }
  if (inNumberedList) {
    processedLines.push('</ol>');
  }

  html = processedLines.join('\n');

  // Bold: **text** or __text__ (but not inside lists)
  html = html.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
  html = html.replace(/__(.+?)__/g, '<strong>$1</strong>');

  // Italic: *text* or _text_ (but not list markers)
  // Use negative lookbehind/lookahead to avoid matching list markers
  html = html.replace(/(?<![•\-\*\d])\*([^*]+?)\*(?![*])/g, '<em>$1</em>');
  html = html.replace(/(?<!_)_([^_]+?)_(?!_)/g, '<em>$1</em>');

  // Line breaks (but preserve list structure)
  html = html.replace(/\n(?!<[uo]l>|<\/[uo]l>|<li>)/g, '<br />');
  
  return html;
};

export const stripMarkdown = (text: string): string => {
  if (!text) return '';
  
  return text
    .replace(/\*\*(.+?)\*\*/g, '$1')
    .replace(/__(.+?)__/g, '$1')
    .replace(/\*(.+?)\*/g, '$1')
    .replace(/_(.+?)_/g, '$1')
    .replace(/^[•\-\*]\s+/gm, '')
    .replace(/^\d+\.\s+/gm, '');
};

