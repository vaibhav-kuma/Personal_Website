/**
 * Sitemap Generation Script
 * Run with: node scripts/generate-sitemap.js
 * Outputs to public/sitemap.xml
 * Reads project slugs from src/data/projects.ts
 */

const fs = require('fs');
const path = require('path');

const siteUrl = 'https://vaibhavk.dev';

/**
 * Extract project slugs from projects.ts using regex
 * This avoids needing to compile TypeScript or use ts-node
 */
function extractProjectSlugs() {
  const projectsPath = path.join(__dirname, '../src/data/projects.ts');
  const content = fs.readFileSync(projectsPath, 'utf-8');
  
  // Match slug: '...' patterns in the projects array
  const slugRegex = /slug:\s*'([^']+)'/g;
  const slugs = [];
  let match;
  
  while ((match = slugRegex.exec(content)) !== null) {
    slugs.push(match[1]);
  }
  
  return slugs;
}

/**
 * Extract updatedAt dates for lastmod
 */
function extractProjectDates() {
  const projectsPath = path.join(__dirname, '../src/data/projects.ts');
  const content = fs.readFileSync(projectsPath, 'utf-8');
  
  // Match slug and updatedAt pairs
  const projectRegex = /slug:\s*'([^']+)'[\s\S]*?updatedAt:\s*'([^']+)'/g;
  const dates = {};
  let match;
  
  while ((match = projectRegex.exec(content)) !== null) {
    dates[match[1]] = match[2];
  }
  
  return dates;
}

// Static routes (anchor links on homepage)
const staticRoutes = [
  '',
  '#about',
  '#skills',
  '#projects',
  '#architecture',
  '#activity',
  '#experience',
  '#contact',
];

function generateSitemap() {
  const projectSlugs = extractProjectSlugs();
  const projectDates = extractProjectDates();
  const today = new Date().toISOString().split('T')[0];
  
  console.log(`Found ${projectSlugs.length} projects:`, projectSlugs);
  
  const urls = [
    ...staticRoutes.map(route => ({
      url: `${siteUrl}/${route}`,
      lastmod: today,
      changefreq: route === '' ? 'weekly' : 'monthly',
      priority: route === '' ? 1.0 : 0.8,
    })),
    ...projectSlugs.map(slug => ({
      url: `${siteUrl}/projects/${slug}`,
      lastmod: projectDates[slug] || today,
      changefreq: 'monthly',
      priority: 0.9,
    })),
  ];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urls.map(({ url, lastmod, changefreq, priority }) => `  <url>
    <loc>${url}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
    <xhtml:link rel="alternate" hreflang="en" href="${url}" />
  </url>`).join('\n')}
</urlset>`;

  const publicDir = path.join(__dirname, '../public');
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
  }

  fs.writeFileSync(path.join(publicDir, 'sitemap.xml'), sitemap);
  console.log('Sitemap generated at public/sitemap.xml');
  console.log(`Total URLs: ${urls.length}`);
}

generateSitemap();