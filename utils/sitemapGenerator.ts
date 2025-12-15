/**
 * Dynamic sitemap generator utility
 * This can be used to generate sitemap.xml dynamically if needed
 */

export interface SitemapUrl {
  loc: string;
  lastmod?: string;
  changefreq?: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  priority?: number;
}

export const generateSitemap = (urls: SitemapUrl[]): string => {
  const urlsXml = urls.map(url => {
    const lastmod = url.lastmod ? `    <lastmod>${url.lastmod}</lastmod>\n` : '';
    const changefreq = url.changefreq ? `    <changefreq>${url.changefreq}</changefreq>\n` : '';
    const priority = url.priority !== undefined ? `    <priority>${url.priority}</priority>\n` : '';
    
    return `  <url>\n    <loc>${url.loc}</loc>\n${lastmod}${changefreq}${priority}  </url>`;
  }).join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="                                                                                         
${urlsXml}
</urlset>`;
};

export const getDefaultSitemapUrls = (): SitemapUrl[] => {
  const baseUrl = 'https://curriculorapido.com.br';
  const today = new Date().toISOString().split('T')[0];
  
  return [
    {
      loc: `${baseUrl}/`,
      lastmod: today,
      changefreq: 'weekly',
      priority: 1.0
    },
    {
      loc: `${baseUrl}/#dicas-carreira`,
      lastmod: today,
      changefreq: 'monthly',
      priority: 0.8
    },
    {
      loc: `${baseUrl}/#dicas-curriculo`,
      lastmod: today,
      changefreq: 'monthly',
      priority: 0.8
    },
    {
      loc: `${baseUrl}/#seo-content`,
      lastmod: today,
      changefreq: 'monthly',
      priority: 0.7
    },
    {
      loc: `${baseUrl}/#ats-checker`,
      lastmod: today,
      changefreq: 'monthly',
      priority: 0.7
    }
  ];
};


