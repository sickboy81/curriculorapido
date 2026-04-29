import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';

type SeoHeadProps = {
  title: string;
  description: string;
  noindex?: boolean;
};

const SITE_URL = 'https://www.curriculorapido.com.br';

export const SeoHead = ({ title, description, noindex = false }: SeoHeadProps) => {
  const location = useLocation();
  const canonicalUrl = `${SITE_URL}${location.pathname || '/'}`;
  const robotsContent = noindex
    ? 'noindex, nofollow, max-image-preview:large, max-snippet:-1, max-video-preview:-1'
    : 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1';

  return (
    <Helmet prioritizeSeoTags>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="robots" content={robotsContent} />
      <link rel="canonical" href={canonicalUrl} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="twitter:url" content={canonicalUrl} />
    </Helmet>
  );
};
