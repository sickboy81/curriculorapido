import { useEffect } from 'react';

interface SEOData {
  title: string;
  description: string;
  canonical: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
}

export const useSEO = (data: SEOData) => {
  useEffect(() => {
    // Atualizar título
    document.title = data.title;

    // Atualizar ou criar meta description
    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement('meta');
      metaDescription.setAttribute('name', 'description');
      document.head.appendChild(metaDescription);
    }
    metaDescription.setAttribute('content', data.description);

    // Atualizar ou criar tag canônica
    let canonicalLink = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
    if (!canonicalLink) {
      canonicalLink = document.createElement('link');
      canonicalLink.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.setAttribute('href', data.canonical);

    // Atualizar Open Graph tags
    const updateOGTag = (property: string, content: string) => {
      let ogTag = document.querySelector(`meta[property="${property}"]`);
      if (!ogTag) {
        ogTag = document.createElement('meta');
        ogTag.setAttribute('property', property);
        document.head.appendChild(ogTag);
      }
      ogTag.setAttribute('content', content);
    };

    if (data.ogTitle) {
      updateOGTag('og:title', data.ogTitle);
    }
    if (data.ogDescription) {
      updateOGTag('og:description', data.ogDescription);
    }
    if (data.ogImage) {
      updateOGTag('og:image', data.ogImage);
    }
    updateOGTag('og:url', data.canonical);

    // Atualizar Twitter tags
    const updateTwitterTag = (name: string, content: string) => {
      let twitterTag = document.querySelector(`meta[name="${name}"]`);
      if (!twitterTag) {
        twitterTag = document.createElement('meta');
        twitterTag.setAttribute('name', name);
        document.head.appendChild(twitterTag);
      }
      twitterTag.setAttribute('content', content);
    };

    updateTwitterTag('twitter:title', data.ogTitle || data.title);
    updateTwitterTag('twitter:description', data.ogDescription || data.description);
    if (data.ogImage) {
      updateTwitterTag('twitter:image', data.ogImage);
    }
    updateTwitterTag('twitter:url', data.canonical);
  }, [data]);
};

