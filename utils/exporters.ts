import { ResumeData, TemplateType } from '../types';
import { Document, Packer, Paragraph, TextRun, HeadingLevel, AlignmentType, Table, TableRow, TableCell, WidthType } from 'docx';
import { stripMarkdown } from './markdownParser';

export const exportToWord = async (resumeData: ResumeData, template: TemplateType = 'modern'): Promise<void> => {
  const children: (Paragraph | Table)[] = [];

  // Get theme color from resume data or use default based on template
  const themeColor = resumeData.themeColor || getTemplateColor(template);

  // Header - Template-specific formatting
  const headerAlignment = ['sidebar', 'executive'].includes(template) 
    ? AlignmentType.LEFT 
    : AlignmentType.CENTER;
  
  children.push(
    new Paragraph({
      children: [
        new TextRun({
          text: resumeData.fullName || 'Nome Completo',
          bold: true,
          size: template === 'bold' ? 36 : 32,
        }),
      ],
      heading: HeadingLevel.TITLE,
      alignment: headerAlignment,
      spacing: { after: 200 },
    })
  );

  // Title/Position
  if (resumeData.title) {
    children.push(
      new Paragraph({
        children: [
          new TextRun({
            text: resumeData.title,
            bold: true,
            size: 24,
            color: themeColor.replace('#', ''),
          }),
        ],
        alignment: headerAlignment,
        spacing: { after: 300 },
      })
    );
  }

  // Contact Information - Template-specific layout
  const contactInfo: string[] = [];
  if (resumeData.email) contactInfo.push(resumeData.email);
  if (resumeData.phone) contactInfo.push(resumeData.phone);
  if (resumeData.location) contactInfo.push(resumeData.location);
  if (resumeData.website) contactInfo.push(resumeData.website);

  if (contactInfo.length > 0) {
    const contactSeparator = ['sidebar', 'minimalist'].includes(template) ? ' • ' : ' | ';
    children.push(
      new Paragraph({
        children: [
          new TextRun({
            text: contactInfo.join(contactSeparator),
            size: 20,
            color: '666666',
          }),
        ],
        alignment: headerAlignment,
        spacing: { after: 300 },
      })
    );
  }

  // Professional Summary
  if (resumeData.summary) {
    children.push(
      new Paragraph({
        children: [
            new TextRun({
              text: 'RESUMO PROFISSIONAL',
              bold: true,
              size: 24,
              color: themeColor.replace('#', ''),
            }),
        ],
        spacing: { before: 200, after: 200 },
      })
    );
    // Remove markdown from summary
    const cleanSummary = stripMarkdown(resumeData.summary);
    children.push(
      new Paragraph({
        children: [
          new TextRun({
            text: cleanSummary,
            size: 22,
          }),
        ],
        spacing: { after: 300 },
      })
    );
  }

  // Experience
  if (resumeData.experience.length > 0) {
    children.push(
      new Paragraph({
        children: [
            new TextRun({
              text: 'EXPERIÊNCIA PROFISSIONAL',
              bold: true,
              size: 24,
              color: themeColor.replace('#', ''),
            }),
        ],
        spacing: { before: 200, after: 200 },
      })
    );

    resumeData.experience.forEach((exp) => {
      // Role and Company in one line
      const roleCompany = exp.role + (exp.company ? ` - ${exp.company}` : '');
      children.push(
        new Paragraph({
          children: [
            new TextRun({
              text: roleCompany,
              bold: true,
              size: 22,
            }),
          ],
          spacing: { after: 80 },
        })
      );
      
      // Dates and Location in one line if both exist
      const dateLocation = [exp.dates, exp.location].filter(Boolean).join(' • ');
      if (dateLocation) {
        children.push(
          new Paragraph({
            children: [
              new TextRun({
                text: dateLocation,
                italics: true,
                size: 20,
                color: '666666',
              }),
            ],
            spacing: { after: 100 },
          })
        );
      }
      
      // Description with markdown removed
      if (exp.description) {
        const cleanDescription = stripMarkdown(exp.description);
        // Split into paragraphs if there are line breaks
        const paragraphs = cleanDescription.split('\n').filter(p => p.trim());
        if (paragraphs.length > 0) {
          paragraphs.forEach((para, index) => {
            children.push(
              new Paragraph({
                children: [
                  new TextRun({
                    text: para.trim(),
                    size: 22,
                  }),
                ],
                spacing: { after: index === paragraphs.length - 1 ? 200 : 100 },
              })
            );
          });
        }
      }
    });
  }

  // Education
  if (resumeData.education.length > 0) {
    children.push(
      new Paragraph({
        children: [
            new TextRun({
              text: 'FORMAÇÃO ACADÊMICA',
              bold: true,
              size: 24,
              color: themeColor.replace('#', ''),
            }),
        ],
        spacing: { before: 200, after: 200 },
      })
    );

    resumeData.education.forEach((edu) => {
      // Degree and School in one line
      const degreeSchool = edu.degree + (edu.school ? ` - ${edu.school}` : '');
      children.push(
        new Paragraph({
          children: [
            new TextRun({
              text: degreeSchool,
              bold: true,
              size: 22,
            }),
          ],
          spacing: { after: 80 },
        })
      );
      
      // Dates
      if (edu.dates) {
        children.push(
          new Paragraph({
            children: [
              new TextRun({
                text: edu.dates,
                italics: true,
                size: 20,
                color: '666666',
              }),
            ],
            spacing: { after: edu.description ? 100 : 200 },
          })
        );
      }
      
      // Description with markdown removed
      if (edu.description) {
        const cleanDescription = stripMarkdown(edu.description);
        // Split into paragraphs if there are line breaks
        const paragraphs = cleanDescription.split('\n').filter(p => p.trim());
        if (paragraphs.length > 0) {
          paragraphs.forEach((para, index) => {
            children.push(
              new Paragraph({
                children: [
                  new TextRun({
                    text: para.trim(),
                    size: 20,
                  }),
                ],
                spacing: { after: index === paragraphs.length - 1 ? 200 : 100 },
              })
            );
          });
        }
      }
    });
  }

  // Skills
  if (resumeData.skills) {
    const skillsArray = resumeData.skills.split(',').map(s => s.trim()).filter(Boolean);
    if (skillsArray.length > 0) {
      children.push(
        new Paragraph({
          children: [
            new TextRun({
              text: 'HABILIDADES',
              bold: true,
              size: 24,
              color: themeColor.replace('#', ''),
            }),
          ],
          spacing: { before: 200, after: 200 },
        })
      );
      children.push(
        new Paragraph({
          children: [
            new TextRun({
              text: skillsArray.join(', '),
              size: 22,
            }),
          ],
          spacing: { after: 300 },
        })
      );
    }
  }

  // Languages
  if (resumeData.languages.length > 0) {
    children.push(
      new Paragraph({
        children: [
            new TextRun({
              text: 'IDIOMAS',
              bold: true,
              size: 24,
              color: themeColor.replace('#', ''),
            }),
        ],
        spacing: { before: 200, after: 200 },
      })
    );

    resumeData.languages.forEach((lang) => {
      children.push(
        new Paragraph({
          children: [
            new TextRun({
              text: `${lang.name} - ${lang.proficiency}`,
              size: 22,
            }),
          ],
          spacing: { after: 100 },
        })
      );
    });
  }

  // Create document
  const doc = new Document({
    sections: [
      {
        properties: {},
        children: children,
      },
    ],
  });

  // Generate and download
  const blob = await Packer.toBlob(doc);
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  const safeName = resumeData.fullName
    ? resumeData.fullName.trim().replace(/[^a-z0-9]/gi, '_').toLowerCase()
    : 'curriculo';
  link.download = `${safeName}_cv.docx`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

export const exportToJSON = (resumeData: ResumeData): void => {
  const dataStr = JSON.stringify(resumeData, null, 2);
  const dataBlob = new Blob([dataStr], { type: 'application/json' });
  const url = URL.createObjectURL(dataBlob);
  const link = document.createElement('a');
  link.href = url;
  const safeName = resumeData.fullName
    ? resumeData.fullName.trim().replace(/[^a-z0-9]/gi, '_').toLowerCase()
    : 'curriculo';
  link.download = `${safeName}_backup.json`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

export const importFromJSON = (file: File): Promise<ResumeData> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const json = JSON.parse(e.target?.result as string);
        // Basic validation
        if (typeof json === 'object' && json !== null) {
          resolve(json as ResumeData);
        } else {
          reject(new Error('Formato de arquivo inválido'));
        }
      } catch (error) {
        reject(new Error('Erro ao ler arquivo JSON'));
      }
    };
    reader.onerror = () => reject(new Error('Erro ao ler arquivo'));
    reader.readAsText(file);
  });
};

// Helper function to get template color
function getTemplateColor(template: TemplateType): string {
  const colors: Record<TemplateType, string> = {
    modern: '#3b82f6',
    classic: '#475569',
    sidebar: '#7c3aed',
    minimalist: '#64748b',
    executive: '#4f46e5',
    creative: '#ec4899',
    tech: '#06b6d4',
    compact: '#6366f1',
    elegant: '#8b5cf6',
    bold: '#dc2626',
    timeline: '#f59e0b',
    swiss: '#1e293b',
    grid: '#9333ea',
  };
  return colors[template] || '#7c3aed';
}

