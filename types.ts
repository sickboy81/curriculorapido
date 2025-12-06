export interface Experience {
  id: string;
  role: string;
  company: string;
  dates: string;
  location: string;
  description: string;
}

export interface Education {
  id: string;
  degree: string;
  school: string;
  dates: string;
  description: string;
}

export interface Language {
  id: string;
  name: string;
  proficiency: string;
}

export interface ResumeData {
  fullName: string;
  title: string;
  email: string;
  phone: string;
  location: string;
  website: string;
  summary: string;
  experience: Experience[];
  education: Education[];
  skills: string; // Comma separated for simplicity in UI, parsed in view
  languages: Language[];
  themeColor: string; // New field for customization
  photo?: string; // Base64 string for the photo
}

export type TemplateType = 
  | 'modern' 
  | 'classic' 
  | 'sidebar' 
  | 'minimalist' 
  | 'executive' 
  | 'creative' 
  | 'tech' 
  | 'compact' 
  | 'elegant' 
  | 'bold'
  | 'timeline'
  | 'swiss'
  | 'corporate'
  | 'focal'
  | 'grid';

export const INITIAL_DATA_PT: ResumeData = {
  fullName: "Alex Silva",
  title: "Engenheiro de Software Sênior",
  email: "alex.silva@exemplo.com.br",
  phone: "(11) 99999-9999",
  location: "São Paulo, SP",
  website: "linkedin.com/in/alexsilva",
  summary: "Engenheiro de software experiente com paixão por construir aplicações web escaláveis utilizando tecnologias modernas.",
  skills: "React, TypeScript, Node.js, Python, AWS, Docker, Tailwind CSS, SQL",
  languages: [
    { id: "1", name: "Português", proficiency: "Nativo" },
    { id: "2", name: "Inglês", proficiency: "Avançado" }
  ],
  experience: [
    {
      id: "1",
      role: "Líder Técnico Frontend",
      company: "Tech Solutions Ltda.",
      dates: "2021 - Presente",
      location: "São Paulo, SP",
      description: "Liderando uma equipe de 5 desenvolvedores. Melhorei a performance do site em 40% usando técnicas de otimização. Implementei um novo sistema de design."
    },
    {
      id: "2",
      role: "Desenvolvedor Full Stack",
      company: "Agência Web Criativa",
      dates: "2018 - 2021",
      location: "Remoto",
      description: "Desenvolvi soluções de e-commerce customizadas usando React e Node.js. Integrei gateways de pagamento e gerenciei migrações de banco de dados."
    }
  ],
  education: [
    {
      id: "1",
      degree: "Bacharelado em Ciência da Computação",
      school: "Universidade Tecnológica",
      dates: "2014 - 2018",
      description: "Graduado com honras. Trabalho de conclusão focado em Engenharia de Software."
    }
  ],
  themeColor: "#7c3aed", 
  photo: ""
};

export const INITIAL_DATA_EN: ResumeData = {
  fullName: "Alex Smith",
  title: "Senior Software Engineer",
  email: "alex.smith@example.com",
  phone: "(555) 123-4567",
  location: "San Francisco, CA",
  website: "linkedin.com/in/alexsmith",
  summary: "Experienced software engineer with a passion for building scalable web applications using modern technologies.",
  skills: "React, TypeScript, Node.js, Python, AWS, Docker, Tailwind CSS, SQL",
  languages: [
    { id: "1", name: "English", proficiency: "Native" },
    { id: "2", name: "Spanish", proficiency: "Intermediate" }
  ],
  experience: [
    {
      id: "1",
      role: "Frontend Tech Lead",
      company: "Tech Solutions Inc.",
      dates: "2021 - Present",
      location: "San Francisco, CA",
      description: "Leading a team of 5 developers. Improved site performance by 40% using optimization techniques. Implemented a new design system."
    },
    {
      id: "2",
      role: "Full Stack Developer",
      company: "Creative Web Agency",
      dates: "2018 - 2021",
      location: "Remote",
      description: "Developed custom e-commerce solutions using React and Node.js. Integrated payment gateways and managed database migrations."
    }
  ],
  education: [
    {
      id: "1",
      degree: "BSc in Computer Science",
      school: "Tech University",
      dates: "2014 - 2018",
      description: "Graduated with honors. Senior thesis focused on Software Engineering."
    }
  ],
  themeColor: "#7c3aed", 
  photo: ""
};

export const INITIAL_DATA_ES: ResumeData = {
  fullName: "Alejandro García",
  title: "Ingeniero de Software Senior",
  email: "alejandro.garcia@ejemplo.com",
  phone: "+34 600 000 000",
  location: "Madrid, España",
  website: "linkedin.com/in/alejandrogarcia",
  summary: "Ingeniero de software experimentado con pasión por construir aplicaciones web escalables utilizando tecnologías modernas.",
  skills: "React, TypeScript, Node.js, Python, AWS, Docker, Tailwind CSS, SQL",
  languages: [
    { id: "1", name: "Español", proficiency: "Nativo" },
    { id: "2", name: "Inglés", proficiency: "Avanzado" }
  ],
  experience: [
    {
      id: "1",
      role: "Líder Técnico Frontend",
      company: "Tech Solutions S.L.",
      dates: "2021 - Presente",
      location: "Madrid",
      description: "Liderando un equipo de 5 desarrolladores. Mejoré el rendimiento del sitio en un 40% usando técnicas de optimización. Implementé un nuevo sistema de diseño."
    },
    {
      id: "2",
      role: "Desarrollador Full Stack",
      company: "Agencia Web Creativa",
      dates: "2018 - 2021",
      location: "Remoto",
      description: "Desarrollé soluciones de comercio electrónico personalizadas usando React y Node.js. Integré pasarelas de pago y gestioné migraciones de bases de datos."
    }
  ],
  education: [
    {
      id: "1",
      degree: "Grado en Ingeniería Informática",
      school: "Universidad Politécnica",
      dates: "2014 - 2018",
      description: "Graduado con honores. Trabajo de fin de grado enfocado en Ingeniería de Software."
    }
  ],
  themeColor: "#7c3aed", 
  photo: ""
};

// Default export still needed for backwards compatibility logic, defaulting to PT
export const INITIAL_DATA = INITIAL_DATA_PT;

export const BLANK_DATA: ResumeData = {
  fullName: "",
  title: "",
  email: "",
  phone: "",
  location: "",
  website: "",
  summary: "",
  experience: [],
  education: [],
  skills: "",
  languages: [],
  themeColor: "#7c3aed",
  photo: ""
};