import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: '/api/', // Disallow crawling of API routes
    },
    sitemap: 'https://play-pad.vercel.app/sitemap.xml', // Replace with your final domain
  };
}
