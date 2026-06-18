import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
    return {
        rules: {
            userAgent: '*',
            allow: '/',
            disallow: ['/admin/', '/login', '/api/', '/demo/', '/_next/static/', '/favicon.ico'],
        },
        sitemap: 'https://www.expertdouchesenior.com/sitemap.xml',
    };
}
