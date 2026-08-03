import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';

type SeoHeadProps = {
  title: string;
  description: string;
  noindex?: boolean;
  type?: 'website' | 'article';
  image?: string;
};

const SITE_URL = 'https://www.curriculorapido.com.br';
const DEFAULT_IMAGE = `${SITE_URL}/preview-image.jpg`;

export const SeoHead = ({ title, description, noindex = false, type = 'website', image = DEFAULT_IMAGE }: SeoHeadProps) => {
  const location = useLocation();
  const canonicalUrl = `${SITE_URL}${location.pathname || '/'}`;
  const robotsContent = noindex
    ? 'noindex, nofollow, max-image-preview:large, max-snippet:-1, max-video-preview:-1'
    : 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1';

  return (
    <Helmet prioritizeSeoTags>
      <title>{title}</title>
      <meta name="title" content={title} />
      <meta name="description" content={description} />
      <meta name="robots" content={robotsContent} />
      <link rel="canonical" href={canonicalUrl} />
      <meta property="og:type" content={type} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:image" content={image} />
      <meta property="og:image:width" content="1024" />
      <meta property="og:image:height" content="541" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta property="twitter:url" content={canonicalUrl} />
      <meta name="twitter:image" content={image} />
    </Helmet>
  );
};
