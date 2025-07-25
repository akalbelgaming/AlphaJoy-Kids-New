import { MetadataRoute } from 'next';

// Replace with your final domain
const URL = 'https://alphajoy-kids.vercel.app';

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    '/',
    '/letters',
    '/numbers',
    '/hindi',
    '/hindivowels',
    '/pahada',
    '/shapes',
    '/counting',
    '/coloring',
    '/reading',
    '/drawing',
    '/story',
    '/poem',
    '/kabita',
    '/privacy',
  ].map((route) => ({
    url: `${URL}${route}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: route === '/' ? 1 : 0.8,
  }));

  return routes;
}
