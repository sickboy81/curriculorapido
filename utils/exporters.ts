import { ResumeData } from '../types';
import { Document, Packer, Paragraph, TextRun, HeadingLevel, AlignmentType, Table, TableRow, TableCell, WidthType } from 'docx';

export const exportToWord = async (resumeData: ResumeData): Promise<void> => {
  const children: (Paragraph | Table)[] = [];

  // Header
  children.push(
    new Paragraph({
      children: [
        new TextRun({
          text: resumeData.fullName || 'Nome Completo',
          bold: true,
          size: 32,
        }),
      ],
      heading: HeadingLevel.TITLE,
      alignment: AlignmentType.CENTER,
      spacing: { after: 200 },
    })
  );

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
            text: contactInfo.join(' | '),
            size: 22,
          }),
        ],
        alignment: AlignmentType.CENTER,
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
            color: '7c3aed',
          }),
        ],
        spacing: { before: 200, after: 200 },
      })
    );
    children.push(
      new Paragraph({
        children: [
          new TextRun({
            text: resumeData.summary,
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
            color: '7c3aed',
          }),
        ],
        spacing: { before: 200, after: 200 },
      })
    );

    resumeData.experience.forEach((exp) => {
      children.push(
        new Paragraph({
          children: [
            new TextRun({
              text: `${exp.role}${exp.company ? ` - ${exp.company}` : ''}`,
              bold: true,
              size: 22,
            }),
          ],
          spacing: { after: 100 },
        })
      );
      if (exp.period) {
        children.push(
          new Paragraph({
            children: [
              new TextRun({
                text: exp.period,
                italics: true,
                size: 20,
              }),
            ],
            spacing: { after: 100 },
          })
        );
      }
      if (exp.description) {
        children.push(
          new Paragraph({
            children: [
              new TextRun({
                text: exp.description,
                size: 22,
              }),
            ],
            spacing: { after: 200 },
          })
        );
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
            color: '7c3aed',
          }),
        ],
        spacing: { before: 200, after: 200 },
      })
    );

    resumeData.education.forEach((edu) => {
      children.push(
        new Paragraph({
          children: [
            new TextRun({
              text: `${edu.degree}${edu.school ? ` - ${edu.school}` : ''}`,
              bold: true,
              size: 22,
            }),
          ],
          spacing: { after: 100 },
        })
      );
      if (edu.graduationYear) {
        children.push(
          new Paragraph({
            children: [
              new TextRun({
                text: edu.graduationYear,
                italics: true,
                size: 20,
              }),
            ],
            spacing: { after: 200 },
          })
        );
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
              color: '7c3aed',
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
            color: '7c3aed',
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

