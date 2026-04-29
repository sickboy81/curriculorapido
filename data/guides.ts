export type GuideSection = {
  heading: string;
  paragraphs: string[];
};

export type Guide = {
  slug: string;
  title: string;
  description: string;
  readTime: string;
  updatedAt: string;
  tags: string[];
  sections: GuideSection[];
  checklist: string[];
};

export const guides: Guide[] = [
  {
    slug: 'como-fazer-curriculo-primeiro-emprego',
    title: 'Como fazer currículo para primeiro emprego (passo a passo)',
    description:
      'Guia completo para criar currículo de primeiro emprego com foco em potencial, cursos, projetos e palavras-chave para ATS.',
    readTime: '8 min',
    updatedAt: '2026-04-29',
    tags: ['Primeiro emprego', 'Currículo', 'ATS'],
    sections: [
      {
        heading: 'O que recrutadores esperam de quem não tem experiência',
        paragraphs: [
          'No primeiro emprego, o recrutador não espera uma lista longa de cargos anteriores. O que pesa é clareza, organização e evidências de potencial: cursos, projetos, participação em atividades acadêmicas e habilidades comportamentais.',
          'Seu currículo precisa mostrar que você aprende rápido, cumpre prazos e consegue se comunicar bem. Isso já diferencia seu perfil de outros candidatos iniciantes.',
        ],
      },
      {
        heading: 'Estrutura ideal para currículo de iniciante',
        paragraphs: [
          'Use uma página com esta ordem: dados de contato, resumo profissional, formação, cursos, projetos, habilidades e idiomas. Evite blocos grandes de texto e use frases objetivas.',
          'No resumo profissional, escreva de 3 a 4 linhas com seu objetivo, área de interesse e principais competências. Exemplo: foco em atendimento, pacote Office, comunicação e organização.',
        ],
      },
      {
        heading: 'Como preencher sem inventar experiência',
        paragraphs: [
          'Nunca invente empresa ou cargo. Em vez disso, transforme experiências reais em valor profissional: trabalhos voluntários, monitoria, projeto escolar, freela simples, participação em eventos e desafios.',
          'Descreva atividades com verbo de ação e resultado: “Organizei planilha de controle”, “Apresentei projeto para 30 pessoas”, “Apoiei atendimento em mutirão de cadastro”.',
        ],
      },
    ],
    checklist: [
      'Currículo com no máximo 1 página',
      'Resumo profissional objetivo e específico',
      'Cursos e projetos com resultado prático',
      'Palavras-chave da vaga no texto',
      'PDF final revisado sem erros de português',
    ],
  },
  {
    slug: 'curriculo-jovem-aprendiz',
    title: 'Currículo para Jovem Aprendiz: modelo e exemplos prontos',
    description:
      'Aprenda a montar currículo para Jovem Aprendiz com seção de objetivo, competências e exemplos de descrição.',
    readTime: '7 min',
    updatedAt: '2026-04-29',
    tags: ['Jovem Aprendiz', 'Modelo', 'Primeiro emprego'],
    sections: [
      {
        heading: 'Como adaptar o currículo para vagas de aprendiz',
        paragraphs: [
          'Empresas que contratam Jovem Aprendiz procuram responsabilidade, vontade de aprender e disponibilidade. Deixe esses pontos visíveis no resumo e na seção de habilidades.',
          'Inclua idade (quando relevante para o programa), turno escolar, conhecimentos básicos de informática e qualquer experiência com atendimento, organização ou comunicação.',
        ],
      },
      {
        heading: 'Objetivo profissional que funciona',
        paragraphs: [
          'Evite objetivo genérico como “quero uma oportunidade”. Use objetivo alinhado à vaga: “Atuar como Jovem Aprendiz em rotinas administrativas, com foco em organização de documentos e atendimento interno”.',
          'Quanto mais próximo do anúncio, melhor para o recrutador e para filtros automáticos.',
        ],
      },
    ],
    checklist: [
      'Objetivo profissional alinhado à vaga',
      'Informar disponibilidade de horário',
      'Destaque para cursos e certificados básicos',
      'Contato profissional (e-mail com nome)',
      'Sem informações desnecessárias no documento',
    ],
  },
  {
    slug: 'curriculo-para-estagio',
    title: 'Como montar currículo para estágio e aumentar entrevistas',
    description:
      'Guia para currículo de estágio com foco em formação, projetos acadêmicos e competências técnicas relevantes.',
    readTime: '9 min',
    updatedAt: '2026-04-29',
    tags: ['Estágio', 'Universitário', 'Currículo'],
    sections: [
      {
        heading: 'Foco em formação e projetos',
        paragraphs: [
          'Para estágio, a formação costuma ser o bloco mais importante. Informe curso, período, previsão de conclusão e disciplinas relevantes para a vaga.',
          'Projetos da faculdade, iniciação científica, hackathons e empresa júnior valem muito quando descritos com contexto e resultado.',
        ],
      },
      {
        heading: 'Competências técnicas e ferramentas',
        paragraphs: [
          'Inclua ferramentas que você realmente usa: Excel, Power BI, Figma, SQL, Python, Canva, CRM etc. Recrutadores querem aderência real, não listas infladas.',
          'Dê prioridade para o que aparece no anúncio da vaga e mantenha o restante em segundo plano.',
        ],
      },
    ],
    checklist: [
      'Formação com período e previsão de término',
      'Projetos acadêmicos com impacto descrito',
      'Ferramentas relevantes da vaga',
      'Currículo adaptado para cada candidatura',
      'Versão final em PDF',
    ],
  },
  {
    slug: 'palavras-chave-ats-no-curriculo',
    title: 'Palavras-chave ATS no currículo: como usar sem exagerar',
    description:
      'Aprenda a otimizar currículo para ATS com palavras-chave certas, mantendo leitura natural para recrutadores.',
    readTime: '8 min',
    updatedAt: '2026-04-29',
    tags: ['ATS', 'Palavras-chave', 'Recrutamento'],
    sections: [
      {
        heading: 'O que é ATS e por que isso importa',
        paragraphs: [
          'ATS é o sistema que organiza candidaturas e ajuda na triagem inicial. Ele busca aderência entre currículo e requisitos da vaga.',
          'Se o seu currículo não contém termos essenciais do anúncio, pode perder prioridade antes da análise humana.',
        ],
      },
      {
        heading: 'Onde inserir palavras-chave',
        paragraphs: [
          'Distribua palavras-chave no resumo profissional, experiência, habilidades e cursos. Evite repetir mecanicamente o mesmo termo.',
          'Prefira combinações naturais: “atendimento ao cliente”, “controle de estoque”, “relatórios em Excel”, “suporte administrativo”.',
        ],
      },
    ],
    checklist: [
      'Ler a vaga e mapear termos recorrentes',
      'Inserir termos em contexto real',
      'Evitar blocos de palavras soltas',
      'Revisar linguagem para leitura humana',
      'Salvar versão específica por vaga',
    ],
  },
  {
    slug: 'resumo-profissional-pronto',
    title: 'Resumo profissional para currículo: 12 exemplos prontos',
    description:
      'Modelos de resumo profissional para primeiro emprego, estágio, administrativo, vendas e atendimento.',
    readTime: '10 min',
    updatedAt: '2026-04-29',
    tags: ['Resumo profissional', 'Exemplos', 'Currículo'],
    sections: [
      {
        heading: 'Como escrever um bom resumo em 4 linhas',
        paragraphs: [
          'Um bom resumo profissional tem: quem você é, área de atuação, competências principais e objetivo. Deve ser curto, específico e relacionado à vaga.',
          'Evite frases vagas como “sou proativo e comunicativo” sem contexto. Prefira “Experiência com atendimento presencial e organização de rotinas administrativas”.',
        ],
      },
      {
        heading: 'Exemplos adaptáveis',
        paragraphs: [
          'Você pode manter uma base e ajustar para cada vaga. Troque palavras de acordo com o cargo e com as responsabilidades do anúncio.',
          'Resumo personalizado aumenta taxa de resposta, porque mostra aderência imediata.',
        ],
      },
    ],
    checklist: [
      'Resumo com no máximo 4 linhas',
      'Sem termos genéricos em excesso',
      'Alinhado ao cargo desejado',
      'Com competências relevantes e reais',
      'Atualizado para cada vaga',
    ],
  },
  {
    slug: 'erros-que-reprovam-curriculo',
    title: '9 erros que reprovam currículo na triagem inicial',
    description:
      'Lista prática dos principais erros que eliminam candidatos: português, excesso de informação, layout ruim e falta de foco.',
    readTime: '7 min',
    updatedAt: '2026-04-29',
    tags: ['Erros comuns', 'Triagem', 'Currículo'],
    sections: [
      {
        heading: 'Erros de forma',
        paragraphs: [
          'Currículo poluído, fontes pequenas, margens apertadas e excesso de cores dificultam leitura. Recrutadores analisam muitos documentos em pouco tempo.',
          'Priorize escaneabilidade: títulos claros, blocos curtos e informações bem hierarquizadas.',
        ],
      },
      {
        heading: 'Erros de conteúdo',
        paragraphs: [
          'Exagerar ou inventar informações é um risco alto. Também pesa negativamente enviar o mesmo currículo para vagas completamente diferentes.',
          'Falta de revisão ortográfica e e-mail não profissional são motivos simples de eliminação.',
        ],
      },
    ],
    checklist: [
      'Revisão completa de ortografia e gramática',
      'Dados de contato corretos',
      'Documento curto e objetivo',
      'Conteúdo adaptado ao cargo',
      'Informações verdadeiras e verificáveis',
    ],
  },
  {
    slug: 'curriculo-para-atendimento',
    title: 'Currículo para atendimento ao cliente: o que destacar',
    description:
      'Guia para quem busca vaga em atendimento, recepção ou suporte, com competências e frases de impacto.',
    readTime: '6 min',
    updatedAt: '2026-04-29',
    tags: ['Atendimento', 'Vendas', 'Currículo'],
    sections: [
      {
        heading: 'Competências mais valorizadas',
        paragraphs: [
          'Empresas buscam comunicação clara, empatia, resolução de problemas e organização. Se você já atuou com público, destaque isso com exemplos concretos.',
          'Também vale citar experiência com canais digitais, WhatsApp, CRM ou suporte por e-mail.',
        ],
      },
      {
        heading: 'Resultados que geram credibilidade',
        paragraphs: [
          'Sempre que possível, inclua números: volume médio de atendimentos, taxa de satisfação, redução de retrabalho ou metas batidas.',
          'Resultados ajudam a sair do currículo genérico e mostram impacto real no trabalho.',
        ],
      },
    ],
    checklist: [
      'Resumo com foco em atendimento',
      'Competências comportamentais e técnicas',
      'Exemplos com números e resultado',
      'Linguagem objetiva e profissional',
      'Ajuste conforme tipo de atendimento da vaga',
    ],
  },
  {
    slug: 'curriculo-administrativo',
    title: 'Currículo administrativo: estrutura ideal e exemplos',
    description:
      'Modelo de currículo administrativo com foco em organização, rotinas internas, planilhas, documentos e suporte.',
    readTime: '8 min',
    updatedAt: '2026-04-29',
    tags: ['Administrativo', 'Escritório', 'Currículo'],
    sections: [
      {
        heading: 'Principais atividades para destacar',
        paragraphs: [
          'Funções administrativas costumam envolver controle de documentos, planilhas, atendimento interno, suporte à liderança e organização de processos.',
          'Mostre domínio de ferramentas e rotina operacional com linguagem objetiva.',
        ],
      },
      {
        heading: 'Como descrever experiência',
        paragraphs: [
          'Use bullets curtos iniciando com verbo de ação: organizar, controlar, apoiar, registrar, conferir, acompanhar.',
          'Evite parágrafos longos. Cada experiência deve ser fácil de ler em poucos segundos.',
        ],
      },
    ],
    checklist: [
      'Experiências descritas em bullets',
      'Ferramentas administrativas listadas',
      'Resultados operacionais incluídos',
      'Layout limpo e profissional',
      'Versão final sem excesso de páginas',
    ],
  },
  {
    slug: 'como-adaptar-curriculo-para-cada-vaga',
    title: 'Como adaptar o currículo para cada vaga em 15 minutos',
    description:
      'Método rápido para personalizar currículo por vaga e aumentar aderência em ATS e recrutadores.',
    readTime: '7 min',
    updatedAt: '2026-04-29',
    tags: ['Personalização', 'ATS', 'Candidatura'],
    sections: [
      {
        heading: 'Método prático de personalização',
        paragraphs: [
          'Copie a descrição da vaga e destaque os requisitos mais repetidos. Em seguida, ajuste resumo, habilidades e experiência para refletir esses pontos com verdade.',
          'A ideia é manter base sólida e customizar o que muda de vaga para vaga.',
        ],
      },
      {
        heading: 'Onde não vale exagerar',
        paragraphs: [
          'Não altere o currículo inteiro toda vez. Foque em pontos de maior impacto: título, resumo, 3 competências e 2 descrições de experiência.',
          'Assim você ganha velocidade sem perder qualidade.',
        ],
      },
    ],
    checklist: [
      'Ler a vaga antes de enviar currículo',
      'Ajustar resumo e competências-chave',
      'Destacar experiências aderentes',
      'Salvar versão com nome da empresa/vaga',
      'Revisar antes do envio final',
    ],
  },
  {
    slug: 'curriculo-em-pdf-correto',
    title: 'Currículo em PDF correto: como evitar arquivo rejeitado',
    description:
      'Boas práticas para gerar PDF leve, legível e compatível com sistemas de recrutamento.',
    readTime: '6 min',
    updatedAt: '2026-04-29',
    tags: ['PDF', 'Envio', 'Compatibilidade'],
    sections: [
      {
        heading: 'Por que PDF é o padrão',
        paragraphs: [
          'PDF mantém formatação em qualquer dispositivo e evita quebra de layout comum em arquivos editáveis. Por isso, é o formato mais aceito em processos seletivos.',
          'Também facilita leitura por recrutadores e impressão quando necessário.',
        ],
      },
      {
        heading: 'Cuidados técnicos importantes',
        paragraphs: [
          'Use nome de arquivo profissional, tamanho leve e texto legível. Evite imagens muito pesadas e elementos visuais excessivos.',
          'Antes de enviar, abra o arquivo no celular e no computador para confirmar que tudo está correto.',
        ],
      },
    ],
    checklist: [
      'Nome do arquivo profissional',
      'Tamanho de arquivo adequado',
      'Texto legível em tela pequena',
      'Sem elementos quebrados no layout',
      'Teste final antes de enviar',
    ],
  },
  {
    slug: 'habilidades-para-colocar-no-curriculo',
    title: 'Habilidades para colocar no currículo (com exemplos por área)',
    description:
      'Lista prática de habilidades técnicas e comportamentais para diferentes perfis: administrativo, vendas, estágio e tecnologia.',
    readTime: '8 min',
    updatedAt: '2026-04-29',
    tags: ['Habilidades', 'Competências', 'Currículo'],
    sections: [
      {
        heading: 'Como escolher habilidades sem deixar genérico',
        paragraphs: [
          'A melhor forma de escolher habilidades é começar pela vaga. Extraia os requisitos técnicos e as competências comportamentais mais repetidas e compare com sua experiência real.',
          'Evite listas longas e superficiais. É melhor ter 6 habilidades fortes e comprováveis do que 20 termos sem contexto.',
        ],
      },
      {
        heading: 'Exemplos por área',
        paragraphs: [
          'Administrativo: Excel, organização de documentos, atendimento interno, controle de agenda. Vendas: negociação, CRM, abordagem consultiva, pós-venda.',
          'Tecnologia: versionamento com Git, lógica de programação, testes básicos, documentação técnica. Atendimento: escuta ativa, resolução de conflito, comunicação escrita.',
        ],
      },
    ],
    checklist: [
      'Selecionar habilidades alinhadas à vaga',
      'Misturar competências técnicas e comportamentais',
      'Evitar exageros e termos vagos',
      'Comprovar habilidades na experiência',
      'Atualizar a lista a cada candidatura',
    ],
  },
  {
    slug: 'objetivo-profissional-no-curriculo',
    title: 'Objetivo profissional no currículo: como escrever sem clichê',
    description:
      'Guia para criar objetivo profissional específico, alinhado à vaga e atrativo para recrutadores e ATS.',
    readTime: '7 min',
    updatedAt: '2026-04-29',
    tags: ['Objetivo profissional', 'Currículo', 'ATS'],
    sections: [
      {
        heading: 'O que diferencia um bom objetivo profissional',
        paragraphs: [
          'Objetivo bom é curto e direto: cargo ou área desejada, foco de atuação e contribuição esperada. Evite frases amplas que servem para qualquer vaga.',
          'Exemplo forte: “Atuar como assistente administrativo com foco em organização de processos, controle de planilhas e suporte operacional à equipe.”',
        ],
      },
      {
        heading: 'Erros mais comuns',
        paragraphs: [
          'Clichês como “crescer junto com a empresa” sem contexto reduzem impacto. Outro erro é usar o mesmo objetivo para vagas diferentes.',
          'Personalize ao menos o objetivo e o resumo para cada candidatura relevante.',
        ],
      },
    ],
    checklist: [
      'Objetivo com cargo/área definida',
      'Sem frases genéricas',
      'Alinhado ao anúncio da vaga',
      'Compatível com experiência real',
      'Atualizado em cada envio',
    ],
  },
  {
    slug: 'o-que-colocar-na-experiencia-profissional',
    title: 'O que colocar na experiência profissional do currículo',
    description:
      'Aprenda a descrever experiência com clareza, verbos de ação e resultados para impressionar recrutadores.',
    readTime: '9 min',
    updatedAt: '2026-04-29',
    tags: ['Experiência', 'Resultados', 'Currículo'],
    sections: [
      {
        heading: 'Modelo simples para descrever experiência',
        paragraphs: [
          'Use esta estrutura: ação + contexto + resultado. Exemplo: “Organizei rotina de atendimento em loja, reduzindo tempo médio de resposta em 20%”.',
          'Esse formato facilita leitura rápida e comprova impacto real.',
        ],
      },
      {
        heading: 'Como destacar resultado mesmo sem cargo de liderança',
        paragraphs: [
          'Você não precisa liderar equipe para mostrar resultado. Pode citar produtividade, redução de erros, qualidade no atendimento e melhorias de processo.',
          'Sempre que possível, inclua números, prazos e frequência.',
        ],
      },
    ],
    checklist: [
      'Cada experiência com 3-5 bullets',
      'Uso de verbos de ação',
      'Resultados com números quando possível',
      'Informações relevantes para a vaga',
      'Sem parágrafos longos',
    ],
  },
  {
    slug: 'curriculo-sem-experiencia-o-que-fazer',
    title: 'Currículo sem experiência: o que fazer para ser chamado',
    description:
      'Estratégias para montar currículo competitivo sem experiência formal, valorizando cursos, projetos e competências.',
    readTime: '8 min',
    updatedAt: '2026-04-29',
    tags: ['Sem experiência', 'Primeiro emprego', 'Currículo'],
    sections: [
      {
        heading: 'Transforme vivências em experiência relevante',
        paragraphs: [
          'Projetos acadêmicos, voluntariado, trabalho informal, participação em eventos e atividades extracurriculares podem virar prova de competência.',
          'Descreva com contexto e responsabilidade assumida, como faria em uma experiência formal.',
        ],
      },
      {
        heading: 'Aposte em formação e portfólio',
        paragraphs: [
          'Para perfis sem histórico profissional, formação e portfólio pesam muito. Inclua certificados, trabalhos e links úteis quando fizer sentido.',
          'Mostre evolução contínua com cursos recentes e prática aplicada.',
        ],
      },
    ],
    checklist: [
      'Valorizar projetos e cursos',
      'Resumo objetivo com foco em potencial',
      'Contato profissional e atualizado',
      'Layout simples e escaneável',
      'PDF revisado antes do envio',
    ],
  },
  {
    slug: 'como-fazer-carta-de-apresentacao',
    title: 'Como fazer carta de apresentação para acompanhar currículo',
    description:
      'Passo a passo para escrever carta de apresentação curta e convincente para estágio, CLT e jovem aprendiz.',
    readTime: '8 min',
    updatedAt: '2026-04-29',
    tags: ['Carta de apresentação', 'Candidatura', 'Emprego'],
    sections: [
      {
        heading: 'Estrutura em 3 blocos',
        paragraphs: [
          'Abra com motivo da candidatura, desenvolva com experiência/competências relevantes e feche com disponibilidade para entrevista.',
          'Mantenha linguagem profissional e texto de no máximo uma página.',
        ],
      },
      {
        heading: 'Como personalizar sem perder tempo',
        paragraphs: [
          'Use um modelo base e personalize empresa, vaga e diferencial principal. Pequenos ajustes já aumentam percepção de interesse real.',
          'Evite mensagens copiadas iguais para todas as vagas.',
        ],
      },
    ],
    checklist: [
      'Carta com foco na vaga específica',
      'Tom profissional e objetivo',
      'Sem repetir exatamente o currículo',
      'Fechamento com chamada para entrevista',
      'Revisão ortográfica final',
    ],
  },
  {
    slug: 'linkedin-e-curriculo-como-alinhar',
    title: 'LinkedIn e currículo: como alinhar para passar mais credibilidade',
    description:
      'Aprenda a manter consistência entre LinkedIn e currículo para reforçar sua imagem profissional.',
    readTime: '7 min',
    updatedAt: '2026-04-29',
    tags: ['LinkedIn', 'Marca pessoal', 'Currículo'],
    sections: [
      {
        heading: 'Informações que precisam bater',
        paragraphs: [
          'Cargo atual, período de experiências, formação e principais habilidades devem estar consistentes entre currículo e LinkedIn.',
          'Diferenças grandes geram dúvida e podem prejudicar confiança do recrutador.',
        ],
      },
      {
        heading: 'Ajuste de posicionamento profissional',
        paragraphs: [
          'Use o LinkedIn para ampliar contexto e o currículo para resumir de forma objetiva. Ambos devem apontar para o mesmo objetivo de carreira.',
          'Uma frase de headline bem definida ajuda na coerência entre os dois canais.',
        ],
      },
    ],
    checklist: [
      'Datas e cargos consistentes',
      'Resumo alinhado entre currículo e perfil',
      'Headline de LinkedIn coerente com objetivo',
      'Competências principais em ambos',
      'Atualização periódica dos dois',
    ],
  },
  {
    slug: 'curriculo-para-vendas',
    title: 'Currículo para vendas: como destacar metas e resultados',
    description:
      'Guia para profissionais de vendas com foco em metas, conversão, relacionamento e performance comercial.',
    readTime: '8 min',
    updatedAt: '2026-04-29',
    tags: ['Vendas', 'Metas', 'Resultados'],
    sections: [
      {
        heading: 'Números que recrutadores procuram em vendas',
        paragraphs: [
          'Percentual de meta atingida, ticket médio, carteira atendida e taxa de conversão são dados valiosos para vagas comerciais.',
          'Resultados mensuráveis destacam rapidamente seu desempenho.',
        ],
      },
      {
        heading: 'Como descrever relacionamento com cliente',
        paragraphs: [
          'Além de fechar venda, mostre retenção e pós-venda. Empresas valorizam profissionais que geram recorrência e satisfação.',
          'Inclua experiência com CRM, funil e canais de prospecção.',
        ],
      },
    ],
    checklist: [
      'Incluir metas e indicadores',
      'Mostrar impacto em receita/conversão',
      'Descrever atuação em CRM e funil',
      'Evidenciar habilidade de negociação',
      'Adaptar para tipo de venda da vaga',
    ],
  },
  {
    slug: 'curriculo-para-mudar-de-carreira',
    title: 'Currículo para mudança de carreira: como reposicionar seu perfil',
    description:
      'Estratégias para transição de área sem perder força no currículo, destacando competências transferíveis.',
    readTime: '9 min',
    updatedAt: '2026-04-29',
    tags: ['Transição de carreira', 'Reposicionamento', 'Currículo'],
    sections: [
      {
        heading: 'Competências transferíveis',
        paragraphs: [
          'Toda mudança de carreira depende de traduzir experiências anteriores para a nova área. Comunicação, organização, liderança e análise são exemplos comuns.',
          'Explique como essas competências já foram aplicadas em contextos reais.',
        ],
      },
      {
        heading: 'Como reduzir risco percebido',
        paragraphs: [
          'Recrutadores avaliam risco em transição. Diminua isso mostrando cursos recentes, projetos práticos e objetivo profissional claro.',
          'A combinação de estudo + prática + narrativa coerente costuma funcionar melhor.',
        ],
      },
    ],
    checklist: [
      'Objetivo profissional claro na nova área',
      'Competências transferíveis evidenciadas',
      'Cursos e projetos de transição incluídos',
      'Resumo com narrativa consistente',
      'Currículo adaptado por vaga',
    ],
  },
  {
    slug: 'como-se-preparar-para-entrevista',
    title: 'Como se preparar para entrevista após enviar o currículo',
    description:
      'Roteiro de preparação para entrevista com perguntas frequentes, estudo da vaga e postura profissional.',
    readTime: '8 min',
    updatedAt: '2026-04-29',
    tags: ['Entrevista', 'Preparação', 'Emprego'],
    sections: [
      {
        heading: 'Preparação em 24 horas',
        paragraphs: [
          'Revise a descrição da vaga, estude a empresa e prepare exemplos concretos da sua trajetória. Isso melhora segurança e clareza nas respostas.',
          'Tenha também perguntas prontas sobre rotina, metas e cultura da equipe.',
        ],
      },
      {
        heading: 'Perguntas que você deve treinar',
        paragraphs: [
          'Treine respostas para: “Fale sobre você”, “Pontos fortes e melhorias”, “Situação difícil que resolveu” e “Por que quer essa vaga?”.',
          'Use exemplos reais com início, ação e resultado para dar credibilidade.',
        ],
      },
    ],
    checklist: [
      'Estudar vaga e empresa antes da entrevista',
      'Treinar respostas com exemplos reais',
      'Preparar perguntas inteligentes',
      'Revisar currículo enviado',
      'Checar horário e formato da entrevista',
    ],
  },
  {
    slug: 'portifolio-para-complementar-curriculo',
    title: 'Portfólio para complementar currículo: quando e como usar',
    description:
      'Entenda como montar portfólio prático para fortalecer candidaturas em áreas técnicas e criativas.',
    readTime: '7 min',
    updatedAt: '2026-04-29',
    tags: ['Portfólio', 'Projetos', 'Candidatura'],
    sections: [
      {
        heading: 'Quando vale usar portfólio',
        paragraphs: [
          'Portfólio é especialmente útil para design, tecnologia, marketing, conteúdo e áreas com entrega prática. Ele comprova capacidade além do texto do currículo.',
          'Mesmo em áreas não criativas, projetos simples podem demonstrar organização e iniciativa.',
        ],
      },
      {
        heading: 'O que mostrar em cada projeto',
        paragraphs: [
          'Cada item deve ter contexto, objetivo, ação e resultado. Mostre problema resolvido e aprendizados.',
          'Qualidade importa mais que quantidade: 3 a 5 bons projetos já fortalecem muito o perfil.',
        ],
      },
    ],
    checklist: [
      'Selecionar projetos relevantes para a vaga',
      'Descrever contexto e resultado de cada projeto',
      'Organizar links e arquivos corretamente',
      'Manter portfólio atualizado',
      'Adicionar apenas o que você domina',
    ],
  },
];

export const guidesBySlug = Object.fromEntries(guides.map((guide) => [guide.slug, guide]));
