import { readFile, writeFile, mkdir } from 'node:fs/promises';
import path from 'node:path';
import type { Plugin, ResolvedConfig } from 'vite';
import { guides } from '../data/guides';

const SITE_URL = 'https://www.curriculorapido.com.br';
const IMAGE_URL = `${SITE_URL}/preview-image.jpg`;
const CONTENT_LAST_MODIFIED = '2026-08-03';

type SeoPage = {
  path: string;
  title: string;
  description: string;
  content: string;
  type?: 'website' | 'article';
  lastmod: string;
  priority: number;
  changefreq: 'monthly' | 'yearly' | 'weekly';
  schema: Record<string, unknown>;
};

const escapeHtml = (value: string) => value
  .replaceAll('&', '&amp;')
  .replaceAll('<', '&lt;')
  .replaceAll('>', '&gt;')
  .replaceAll('"', '&quot;')
  .replaceAll("'", '&#039;');

const canonicalFor = (routePath: string) => `${SITE_URL}${routePath}`;

const standardSchema = (page: SeoPage) => ({
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      '@id': `${SITE_URL}/#organization`,
      name: 'Currículo Rápido',
      url: `${SITE_URL}/`,
      logo: `${SITE_URL}/pwa-icon.svg`,
    },
    {
      '@type': page.type === 'article' ? 'Article' : 'WebPage',
      '@id': `${canonicalFor(page.path)}#webpage`,
      url: canonicalFor(page.path),
      name: page.title,
      description: page.description,
      inLanguage: 'pt-BR',
      dateModified: page.lastmod,
      primaryImageOfPage: {
        '@type': 'ImageObject',
        url: IMAGE_URL,
        width: 1024,
        height: 541,
      },
      ...(page.type === 'article' ? {
        author: { '@type': 'Organization', name: 'Currículo Rápido' },
        publisher: { '@id': `${SITE_URL}/#organization` },
      } : {}),
      ...page.schema,
    },
  ],
});

const staticPages: SeoPage[] = [
  {
    path: '/sobre',
    title: 'Sobre o Currículo Rápido | Missão e Propósito',
    description: 'Conheça a missão do Currículo Rápido e por que criamos uma ferramenta gratuita para montar currículo profissional em PDF.',
    content: '<h1>Sobre o Currículo Rápido</h1><p>O Currículo Rápido ajuda candidatos brasileiros a criar currículos profissionais em PDF, gratuitamente e sem cadastro.</p>',
    lastmod: CONTENT_LAST_MODIFIED,
    priority: 0.8,
    changefreq: 'monthly',
    schema: {},
  },
  {
    path: '/contato',
    title: 'Contato | Currículo Rápido',
    description: 'Fale com o time do Currículo Rápido para enviar dúvidas, sugestões ou relatar problemas na plataforma.',
    content: '<h1>Entre em contato</h1><p>Envie dúvidas, sugestões ou relatos de problemas para a equipe do Currículo Rápido.</p>',
    lastmod: CONTENT_LAST_MODIFIED,
    priority: 0.7,
    changefreq: 'monthly',
    schema: {},
  },
  {
    path: '/privacidade',
    title: 'Política de Privacidade | Currículo Rápido',
    description: 'Saiba como o Currículo Rápido trata privacidade, cookies, anúncios e dados processados localmente no navegador.',
    content: '<h1>Política de Privacidade</h1><p>Os dados do currículo são processados localmente no navegador. Esta página explica cookies, anúncios e privacidade.</p>',
    lastmod: CONTENT_LAST_MODIFIED,
    priority: 0.5,
    changefreq: 'yearly',
    schema: {},
  },
  {
    path: '/termos',
    title: 'Termos de Uso | Currículo Rápido',
    description: 'Leia os termos de uso do Currículo Rápido, incluindo regras do serviço, propriedade intelectual e limitações de responsabilidade.',
    content: '<h1>Termos de Uso</h1><p>Conheça as regras de uso, propriedade intelectual e limitações de responsabilidade do Currículo Rápido.</p>',
    lastmod: CONTENT_LAST_MODIFIED,
    priority: 0.5,
    changefreq: 'yearly',
    schema: {},
  },
  {
    path: '/politica-editorial',
    title: 'Política Editorial | Currículo Rápido',
    description: 'Entenda como produzimos, revisamos e atualizamos os conteúdos de currículo e carreira do Currículo Rápido.',
    content: '<h1>Política Editorial</h1><p>Nossos guias são produzidos e revisados para oferecer orientação prática sobre currículo, carreira e candidaturas.</p>',
    lastmod: CONTENT_LAST_MODIFIED,
    priority: 0.6,
    changefreq: 'yearly',
    schema: {},
  },
];

const guidesIndex: SeoPage = {
  path: '/guias',
  title: 'Guias de Currículo e Carreira | Currículo Rápido',
  description: 'Biblioteca com guias completos sobre currículo, ATS, primeiro emprego, estágio e preparação para candidaturas.',
  content: `<main><h1>Guias de Currículo e Carreira</h1><p>Conteúdo original para melhorar currículos, adaptar candidaturas e aumentar as chances de entrevista.</p><ul>${guides.map((guide) => `<li><a href="/guias/${guide.slug}">${escapeHtml(guide.title)}</a> — ${escapeHtml(guide.description)}</li>`).join('')}</ul></main>`,
  lastmod: CONTENT_LAST_MODIFIED,
  priority: 0.9,
  changefreq: 'weekly',
  schema: {},
};

const guidePages: SeoPage[] = guides.map((guide) => ({
  path: `/guias/${guide.slug}`,
  title: `${guide.title} | Currículo Rápido`,
  description: guide.description,
  content: `<main><nav><a href="/">Início</a> › <a href="/guias">Guias</a></nav><article><h1>${escapeHtml(guide.title)}</h1><p>${escapeHtml(guide.description)}</p>${guide.sections.map((section) => `<section><h2>${escapeHtml(section.heading)}</h2>${section.paragraphs.map((paragraph) => `<p>${escapeHtml(paragraph)}</p>`).join('')}</section>`).join('')}<section><h2>Checklist rápido antes de enviar o currículo</h2><ul>${guide.checklist.map((item) => `<li>${escapeHtml(item)}</li>`).join('')}</ul></section></article></main>`,
  type: 'article',
  lastmod: guide.updatedAt,
  priority: 0.8,
  changefreq: 'monthly',
  schema: {
    headline: guide.title,
    datePublished: guide.updatedAt,
    keywords: guide.tags.join(', '),
  },
}));

const replaceTag = (html: string, pattern: RegExp, replacement: string) => html.replace(pattern, replacement);

const renderStaticPage = (baseHtml: string, page: SeoPage) => {
  const canonical = canonicalFor(page.path);
  const schema = JSON.stringify(standardSchema(page));
  const fallback = `<section id="seo-static-content" style="max-width:960px;margin:32px auto;padding:0 24px;font-family:system-ui,-apple-system,Segoe UI,Roboto,sans-serif;color:#0f172a;line-height:1.6">${page.content}</section><script>document.getElementById('seo-static-content')?.remove()</script>`;

  let html = baseHtml;
  html = replaceTag(html, /<title>[^<]*<\/title>/, `<title>${escapeHtml(page.title)}</title>`);
  html = replaceTag(html, /<meta name="title" content="[^"]*">/, `<meta name="title" content="${escapeHtml(page.title)}">`);
  html = replaceTag(html, /<meta name="description"\s+content="[^"]*">/, `<meta name="description" content="${escapeHtml(page.description)}">`);
  html = replaceTag(html, /<link rel="canonical" href="[^"]*"\s*\/>/, `<link rel="canonical" href="${canonical}" />`);
  html = replaceTag(html, /<meta property="og:type" content="[^"]*">/, `<meta property="og:type" content="${page.type ?? 'website'}">`);
  html = replaceTag(html, /<meta property="og:url" content="[^"]*">/, `<meta property="og:url" content="${canonical}">`);
  html = replaceTag(html, /<meta property="og:title" content="[^"]*">/, `<meta property="og:title" content="${escapeHtml(page.title)}">`);
  html = replaceTag(html, /<meta property="og:description"\s+content="[^"]*">/, `<meta property="og:description" content="${escapeHtml(page.description)}">`);
  html = replaceTag(html, /<meta name="twitter:url" content="[^"]*">/, `<meta name="twitter:url" content="${canonical}">`);
  html = replaceTag(html, /<meta name="twitter:title" content="[^"]*">/, `<meta name="twitter:title" content="${escapeHtml(page.title)}">`);
  html = replaceTag(html, /<meta name="twitter:description"\s+content="[^"]*">/, `<meta name="twitter:description" content="${escapeHtml(page.description)}">`);
  html = replaceTag(html, /<script type="application\/ld\+json">[\s\S]*?<\/script>/, `<script type="application/ld+json">${schema}</script>`);
  return html.replace('<div id="root"></div>', `${fallback}<div id="root"></div>`);
};

const createSitemap = (pages: SeoPage[]) => `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url><loc>${SITE_URL}/</loc><lastmod>${CONTENT_LAST_MODIFIED}</lastmod><changefreq>weekly</changefreq><priority>1.0</priority></url>
${pages.map((page) => `  <url><loc>${canonicalFor(page.path)}</loc><lastmod>${page.lastmod}</lastmod><changefreq>${page.changefreq}</changefreq><priority>${page.priority.toFixed(1)}</priority></url>`).join('\n')}
</urlset>
`;

export const staticSeoPages = (): Plugin => {
  let config: ResolvedConfig;

  return {
    name: 'static-seo-pages',
    apply: 'build',
    configResolved(resolvedConfig) {
      config = resolvedConfig;
    },
    async closeBundle() {
      const outDir = path.resolve(config.root, config.build.outDir);
      const baseHtml = await readFile(path.join(outDir, 'index.html'), 'utf8');
      const pages = [...staticPages, guidesIndex, ...guidePages];

      await Promise.all(pages.map(async (page) => {
        const outputPath = path.join(outDir, `${page.path.slice(1)}.html`);
        await mkdir(path.dirname(outputPath), { recursive: true });
        await writeFile(outputPath, renderStaticPage(baseHtml, page), 'utf8');
      }));

      await writeFile(path.join(outDir, 'sitemap.xml'), createSitemap(pages), 'utf8');
    },
  };
};
