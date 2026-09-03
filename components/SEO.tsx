import Head from 'next/head';

interface SEOProps {
  title?: string;
  description?: string;
  canonical?: string;
  ogImage?: string;
  ogType?: 'website' | 'article';
  twitterCard?: 'summary' | 'summary_large_image';
  noIndex?: boolean;
  noFollow?: boolean;
  structuredData?: Record<string, unknown>;
}

const defaultTitle = 'Vaibhav Kumar — Backend Developer | Cybersecurity | AI';
const defaultDescription = 'Portfolio of Vaibhav Kumar, focused on backend engineering, cybersecurity, AI agents, threat detection, and security automation.';
const siteUrl = 'https://vaibhavk.dev';

export function SEO({
  title = defaultTitle,
  description = defaultDescription,
  canonical = siteUrl,
  ogImage,
  ogType = 'website',
  twitterCard = 'summary_large_image',
  noIndex = false,
  noFollow = false,
  structuredData,
}: SEOProps) {
  const fullTitle = title === defaultTitle ? title : `${title} — Vaibhav Kumar`;
  const ogImageUrl = ogImage || `${siteUrl}/og-image.png`;

  return (
    <Head>
      {/* Basic Meta */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link rel="canonical" href={canonical} />

      {/* Robots */}
      {noIndex && <meta name="robots" content="noindex" />}
      {noFollow && <meta name="robots" content="nofollow" />}
      {!noIndex && !noFollow && <meta name="robots" content="index, follow" />}

      {/* Open Graph */}
      <meta property="og:site_name" content="Vaibhav Kumar — Portfolio" />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={canonical} />
      <meta property="og:image" content={ogImageUrl} />
      <meta property="og:locale" content="en_US" />

      {/* Twitter */}
      <meta name="twitter:card" content={twitterCard} />
      <meta name="twitter:site" content="@vaibhav-kuma" />
      <meta name="twitter:creator" content="@vaibhav-kuma" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImageUrl} />

      {/* Theme Color */}
      <meta name="theme-color" content="#0a0a0a" />

      {/* Structured Data */}
      {structuredData && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      )}

      {/* Default Person Schema */}
      {!structuredData && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Person',
              name: 'Vaibhav Kumar',
              url: siteUrl,
              email: 'mailto:vaibhavkumar26412@gmail.com',
              sameAs: [
                'https://github.com/vaibhav-kuma',
                'https://www.linkedin.com/in/vaibhav-kumar-a19a81232',
              ],
              knowsAbout: [
                'Backend Development',
                'Cybersecurity',
                'Artificial Intelligence',
                'Threat Detection',
                'Security Automation',
                'Distributed Systems',
                'Machine Learning',
                'DevOps',
              ],
              jobTitle: 'Backend Developer • Cybersecurity Engineer • AI Builder',
              worksFor: {
                '@type': 'Organization',
                name: 'Freelance / Open Source',
              },
            }),
          }}
        />
      )}
    </Head>
  );
}