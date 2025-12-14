import { ResumeData, TemplateType } from '../types';
import { Document, Packer, Paragraph, TextRun, HeadingLevel, AlignmentType, Table, TableRow, TableCell, WidthType } from 'docx';
import { stripMarkdown } from './markdownParser';

// Template-specific export configuration
interface TemplateExportConfig {
  headerAlignment: AlignmentType;
  nameSize: number;
  nameColor?: string;
  nameBold: boolean;
  titleSize: number;
  titleItalic: boolean;
  contactSeparator: string;
  contactSize: number;
  sectionTitleSize: number;
  sectionSpacing: { before: number; after: number };
  experienceLayout: 'classic' | 'modern';
  educationLayout: 'classic' | 'modern';
  textSize: { experience: number; education: number; description: number };
}

const getTemplateConfig = (template: TemplateType, themeColor: string): TemplateExportConfig => {
  const configs: Record<TemplateType, TemplateExportConfig> = {
    modern: {
      headerAlignment: AlignmentType.CENTER,
      nameSize: 40, // 20pt
      nameBold: true,
      titleSize: 32, // 16pt
      titleItalic: false,
      contactSeparator: ' | ',
      contactSize: 22, // 11pt
      sectionTitleSize: 32, // 16pt
      sectionSpacing: { before: 200, after: 200 },
      experienceLayout: 'modern',
      educationLayout: 'modern',
      textSize: { experience: 28, education: 28, description: 24 }, // 14pt, 14pt, 12pt
    },
    classic: {
      headerAlignment: AlignmentType.CENTER,
      nameSize: 38, // 19pt
      nameBold: true,
      titleSize: 30, // 15pt
      titleItalic: true,
      contactSeparator: '  •  ',
      contactSize: 22, // 11pt
      sectionTitleSize: 30, // 15pt
      sectionSpacing: { before: 200, after: 200 },
      experienceLayout: 'classic',
      educationLayout: 'classic',
      textSize: { experience: 26, education: 26, description: 22 }, // 13pt, 13pt, 11pt
    },
    bold: {
      headerAlignment: AlignmentType.LEFT,
      nameSize: 56, // 28pt
      nameColor: themeColor,
      nameBold: true,
      titleSize: 40, // 20pt
      titleItalic: false,
      contactSeparator: ' | ',
      contactSize: 22, // 11pt
      sectionTitleSize: 36, // 18pt
      sectionSpacing: { before: 200, after: 200 },
      experienceLayout: 'modern',
      educationLayout: 'modern',
      textSize: { experience: 28, education: 28, description: 24 }, // 14pt, 14pt, 12pt
    },
    sidebar: {
      headerAlignment: AlignmentType.LEFT,
      nameSize: 38, // 19pt
      nameBold: true,
      titleSize: 32, // 16pt
      titleItalic: false,
      contactSeparator: ' • ',
      contactSize: 22, // 11pt
      sectionTitleSize: 30, // 15pt
      sectionSpacing: { before: 200, after: 200 },
      experienceLayout: 'modern',
      educationLayout: 'modern',
      textSize: { experience: 26, education: 26, description: 24 }, // 13pt, 13pt, 12pt
    },
    minimalist: {
      headerAlignment: AlignmentType.CENTER,
      nameSize: 38, // 19pt
      nameBold: true,
      titleSize: 32, // 16pt
      titleItalic: false,
      contactSeparator: ' • ',
      contactSize: 22, // 11pt
      sectionTitleSize: 28, // 14pt
      sectionSpacing: { before: 150, after: 150 },
      experienceLayout: 'modern',
      educationLayout: 'modern',
      textSize: { experience: 26, education: 26, description: 24 }, // 13pt, 13pt, 12pt
    },
    executive: {
      headerAlignment: AlignmentType.LEFT,
      nameSize: 44, // 22pt
      nameBold: true,
      titleSize: 34, // 17pt
      titleItalic: false,
      contactSeparator: ' | ',
      contactSize: 22, // 11pt
      sectionTitleSize: 30, // 15pt
      sectionSpacing: { before: 200, after: 200 },
      experienceLayout: 'modern',
      educationLayout: 'modern',
      textSize: { experience: 26, education: 26, description: 24 }, // 13pt, 13pt, 12pt
    },
    creative: {
      headerAlignment: AlignmentType.CENTER,
      nameSize: 40, // 20pt
      nameBold: true,
      titleSize: 34, // 17pt
      titleItalic: false,
      contactSeparator: ' | ',
      contactSize: 22, // 11pt
      sectionTitleSize: 30, // 15pt
      sectionSpacing: { before: 200, after: 200 },
      experienceLayout: 'modern',
      educationLayout: 'modern',
      textSize: { experience: 28, education: 28, description: 24 }, // 14pt, 14pt, 12pt
    },
    tech: {
      headerAlignment: AlignmentType.LEFT,
      nameSize: 40, // 20pt
      nameBold: true,
      titleSize: 32, // 16pt
      titleItalic: false,
      contactSeparator: ' | ',
      contactSize: 22, // 11pt
      sectionTitleSize: 30, // 15pt
      sectionSpacing: { before: 200, after: 200 },
      experienceLayout: 'modern',
      educationLayout: 'modern',
      textSize: { experience: 28, education: 28, description: 24 }, // 14pt, 14pt, 12pt
    },
    compact: {
      headerAlignment: AlignmentType.LEFT,
      nameSize: 38, // 19pt
      nameBold: true,
      titleSize: 32, // 16pt
      titleItalic: false,
      contactSeparator: ' | ',
      contactSize: 22, // 11pt
      sectionTitleSize: 28, // 14pt
      sectionSpacing: { before: 150, after: 150 },
      experienceLayout: 'modern',
      educationLayout: 'modern',
      textSize: { experience: 26, education: 26, description: 24 }, // 13pt, 13pt, 12pt
    },
    elegant: {
      headerAlignment: AlignmentType.CENTER,
      nameSize: 38, // 19pt
      nameBold: true,
      titleSize: 30, // 15pt
      titleItalic: true,
      contactSeparator: '  •  ',
      contactSize: 22, // 11pt
      sectionTitleSize: 30, // 15pt
      sectionSpacing: { before: 200, after: 200 },
      experienceLayout: 'classic',
      educationLayout: 'classic',
      textSize: { experience: 26, education: 26, description: 22 }, // 13pt, 13pt, 11pt
    },
    timeline: {
      headerAlignment: AlignmentType.LEFT,
      nameSize: 44, // 22pt
      nameBold: true,
      titleSize: 34, // 17pt
      titleItalic: false,
      contactSeparator: ' | ',
      contactSize: 22, // 11pt
      sectionTitleSize: 30, // 15pt
      sectionSpacing: { before: 200, after: 200 },
      experienceLayout: 'modern',
      educationLayout: 'modern',
      textSize: { experience: 28, education: 28, description: 24 }, // 14pt, 14pt, 12pt
    },
    swiss: {
      headerAlignment: AlignmentType.LEFT,
      nameSize: 48, // 24pt
      nameBold: true,
      titleSize: 34, // 17pt
      titleItalic: false,
      contactSeparator: ' | ',
      contactSize: 22, // 11pt
      sectionTitleSize: 30, // 15pt
      sectionSpacing: { before: 200, after: 200 },
      experienceLayout: 'modern',
      educationLayout: 'modern',
      textSize: { experience: 28, education: 28, description: 24 }, // 14pt, 14pt, 12pt
    },
    grid: {
      headerAlignment: AlignmentType.CENTER,
      nameSize: 40, // 20pt
      nameBold: true,
      titleSize: 34, // 17pt
      titleItalic: false,
      contactSeparator: ' | ',
      contactSize: 22, // 11pt
      sectionTitleSize: 30, // 15pt
      sectionSpacing: { before: 200, after: 200 },
      experienceLayout: 'modern',
      educationLayout: 'modern',
      textSize: { experience: 28, education: 28, description: 24 }, // 14pt, 14pt, 12pt
    },
  };

  return configs[template] || configs.modern;
};

export const exportToWord = async (resumeData: ResumeData, template: TemplateType = 'modern'): Promise<void> => {
  const children: (Paragraph | Table)[] = [];

  // Get theme color from resume data or use default based on template
  const themeColor = resumeData.themeColor || getTemplateColor(template);
  
  // Get template-specific configuration
  const config = getTemplateConfig(template, themeColor);
  
  // Name
  children.push(
    new Paragraph({
      children: [
        new TextRun({
          text: resumeData.fullName || 'Nome Completo',
          bold: config.nameBold,
          size: config.nameSize,
          color: config.nameColor ? config.nameColor.replace('#', '') : undefined,
        }),
      ],
      heading: HeadingLevel.TITLE,
      alignment: config.headerAlignment,
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
            italics: config.titleItalic,
            size: config.titleSize,
            color: themeColor.replace('#', ''),
          }),
        ],
        alignment: config.headerAlignment,
        spacing: { after: 250 },
      })
    );
  }

  // Contact Information
  const contactInfo: string[] = [];
  if (resumeData.email) contactInfo.push(resumeData.email);
  if (resumeData.phone) contactInfo.push(resumeData.phone);
  if (resumeData.location) contactInfo.push(resumeData.location);
  if (resumeData.website) contactInfo.push(resumeData.website);

  if (contactInfo.length > 0) {
    children.push(
      new Paragraph({
        children: [
          new TextRun({
            text: contactInfo.join(config.contactSeparator),
            size: config.contactSize,
            color: '666666',
          }),
        ],
        alignment: config.headerAlignment,
        spacing: { after: 300 },
      })
    );
  }

  // Professional Summary
  if (resumeData.summary && resumeData.summary.trim()) {
    children.push(
      new Paragraph({
          children: [
            new TextRun({
              text: 'RESUMO PROFISSIONAL',
              bold: true,
              size: config.sectionTitleSize,
              color: themeColor.replace('#', ''),
            }),
        ],
        spacing: config.sectionSpacing,
      })
    );
    // Remove markdown from summary and convert to clean text
    const cleanSummary = stripMarkdown(resumeData.summary);
    if (cleanSummary.trim()) {
      // Split summary into paragraphs if it has line breaks
      if (cleanSummary.includes('\n')) {
        const paragraphs = cleanSummary.split('\n').filter(p => p.trim());
        paragraphs.forEach((para, index) => {
          children.push(
            new Paragraph({
              children: [
                new TextRun({
                  text: para.trim(),
                  size: config.textSize.description,
                }),
              ],
              spacing: { after: index === paragraphs.length - 1 ? 300 : 150 },
            })
          );
        });
      } else {
        children.push(
          new Paragraph({
            children: [
              new TextRun({
                text: cleanSummary.trim(),
                size: config.textSize.description,
              }),
            ],
            spacing: { after: 300 },
          })
        );
      }
    }
  }

  // Experience
  if (resumeData.experience.length > 0) {
    children.push(
      new Paragraph({
        children: [
            new TextRun({
              text: 'EXPERIÊNCIA PROFISSIONAL',
              bold: true,
              size: config.sectionTitleSize,
              color: themeColor.replace('#', ''),
            }),
        ],
        spacing: config.sectionSpacing,
      })
    );

    resumeData.experience.forEach((exp) => {
      // Template-specific formatting for experience
      if (config.experienceLayout === 'classic') {
        // Classic style: Role and dates on same line
        children.push(
          new Paragraph({
            children: [
              new TextRun({
                text: exp.role,
                bold: true,
                size: config.textSize.experience,
              }),
              new TextRun({
                text: `  ${exp.dates || ''}`,
                size: config.contactSize,
                color: '666666',
              }),
            ],
            spacing: { after: 80 },
          })
        );
        if (exp.company) {
          children.push(
            new Paragraph({
              children: [
                new TextRun({
                  text: exp.company,
                  italics: true,
                  size: config.contactSize,
                  color: themeColor.replace('#', ''),
                }),
                ...(exp.location ? [
                  new TextRun({
                    text: ` • ${exp.location}`,
                    italics: true,
                    size: config.contactSize,
                    color: '666666',
                  })
                ] : []),
              ],
              spacing: { after: 100 },
            })
          );
        }
      } else {
        // Default style: Role and Company in one line
        const roleCompany = exp.role + (exp.company ? ` - ${exp.company}` : '');
        children.push(
          new Paragraph({
            children: [
              new TextRun({
                text: roleCompany,
                bold: true,
                size: config.textSize.experience,
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
                  italics: config.experienceLayout === 'classic',
                  size: config.contactSize,
                  color: '666666',
                }),
              ],
              spacing: { after: 100 },
            })
          );
        }
      }
      
      // Description with markdown removed
      if (exp.description && exp.description.trim()) {
        const cleanDescription = stripMarkdown(exp.description);
        if (cleanDescription.trim()) {
          // If the description has multiple lines, split them
          if (cleanDescription.includes('\n')) {
            const paragraphs = cleanDescription.split('\n').filter(p => p.trim());
            paragraphs.forEach((para, index) => {
              children.push(
                new Paragraph({
                  children: [
                    new TextRun({
                      text: para.trim(),
                      size: config.textSize.description,
                    }),
                  ],
                  spacing: { after: index === paragraphs.length - 1 ? 200 : 100 },
                })
              );
            });
          } else {
            // Single paragraph
            children.push(
              new Paragraph({
                children: [
                    new TextRun({
                      text: cleanDescription.trim(),
                      size: config.textSize.description,
                    }),
                ],
                spacing: { after: 200 },
              })
            );
          }
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
              size: config.sectionTitleSize,
              color: themeColor.replace('#', ''),
            }),
        ],
        spacing: config.sectionSpacing,
      })
    );

    resumeData.education.forEach((edu) => {
      // Template-specific formatting for education
      if (config.educationLayout === 'classic') {
        // Classic style: School first, then degree
        if (edu.school) {
          children.push(
            new Paragraph({
              children: [
                new TextRun({
                  text: edu.school,
                  bold: true,
                  size: config.textSize.education,
                }),
                ...(edu.dates ? [
                  new TextRun({
                    text: `  ${edu.dates}`,
                    size: config.contactSize,
                    color: '666666',
                  })
                ] : []),
              ],
              spacing: { after: 80 },
            })
          );
        }
        if (edu.degree) {
          children.push(
            new Paragraph({
              children: [
                new TextRun({
                  text: edu.degree,
                  italics: true,
                  size: config.contactSize,
                  color: themeColor.replace('#', ''),
                }),
              ],
              spacing: { after: edu.description ? 100 : 200 },
            })
          );
        }
      } else {
        // Default style: Degree and School in one line
        const degreeSchool = edu.degree + (edu.school ? ` - ${edu.school}` : '');
        children.push(
          new Paragraph({
            children: [
              new TextRun({
                text: degreeSchool,
                bold: true,
                size: config.textSize.education,
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
                  italics: config.educationLayout === 'classic',
                  size: config.contactSize,
                  color: '666666',
                }),
              ],
              spacing: { after: edu.description ? 100 : 200 },
            })
          );
        }
      }
      
      // Description with markdown removed
      if (edu.description && edu.description.trim()) {
        const cleanDescription = stripMarkdown(edu.description);
        if (cleanDescription.trim()) {
          // If the description has multiple lines, split them
          if (cleanDescription.includes('\n')) {
            const paragraphs = cleanDescription.split('\n').filter(p => p.trim());
            paragraphs.forEach((para, index) => {
              children.push(
                new Paragraph({
                  children: [
                    new TextRun({
                  text: para.trim(),
                  size: config.textSize.description,
                }),
                  ],
                  spacing: { after: index === paragraphs.length - 1 ? 200 : 100 },
                })
              );
            });
          } else {
            // Single paragraph
            children.push(
              new Paragraph({
                children: [
                  new TextRun({
                    text: cleanDescription.trim(),
                    size: config.textSize.description,
                  }),
                ],
                spacing: { after: 200 },
              })
            );
          }
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
              size: config.sectionTitleSize,
              color: themeColor.replace('#', ''),
            }),
          ],
          spacing: config.sectionSpacing,
        })
      );
      children.push(
        new Paragraph({
          children: [
            new TextRun({
              text: skillsArray.join(', '),
              size: config.textSize.description,
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
              size: config.sectionTitleSize,
              color: themeColor.replace('#', ''),
            }),
        ],
        spacing: config.sectionSpacing,
      })
    );

    resumeData.languages.forEach((lang) => {
      children.push(
        new Paragraph({
          children: [
            new TextRun({
              text: `${lang.name} - ${lang.proficiency}`,
              size: config.textSize.description,
            }),
          ],
          spacing: { after: 100 },
        })
      );
    });
  }

  // Create document with proper margins
  const doc = new Document({
    sections: [
      {
        properties: {
          page: {
            margin: {
              top: 1440, // 2.5cm
              right: 1440,
              bottom: 1440,
              left: 1440,
            },
          },
        },
        children: children,
      },
    ],
  });

  // Generate and download
  try {
    const blob = await Packer.toBlob(doc);
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    const safeName = resumeData.fullName
      ? resumeData.fullName.trim().replace(/[^a-z0-9]/gi, '_').toLowerCase()
      : 'curriculo';
    // Include template name in filename to help user identify which template was used
    link.download = `${safeName}_${template}_cv.docx`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  } catch (error) {
    console.error('Erro ao gerar documento Word:', error);
    throw new Error('Falha ao gerar documento Word. Verifique o console para mais detalhes.');
  }
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

