import { useEffect } from 'react';
import { CONTACT_EMAIL, GITHUB_AVATAR_URL, GITHUB_USERNAME } from '../constants/profile';
import {
  SITE_DESCRIPTION,
  SITE_LOCALE,
  SITE_TITLE,
  SITE_TWITTER_HANDLE,
  SITE_URL,
} from '../constants/site';

const JSON_LD_ID = 'portfolio-jsonld';

function upsertMeta(attr, key, content) {
  if (!content) return;
  let el = document.querySelector(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

function upsertLink(rel, href) {
  let el = document.querySelector(`link[rel="${rel}"]`);
  if (!el) {
    el = document.createElement('link');
    el.setAttribute('rel', rel);
    document.head.appendChild(el);
  }
  el.setAttribute('href', href);
}

export default function Seo() {
  useEffect(() => {
    const pageUrl = SITE_URL.endsWith('/') ? SITE_URL : `${SITE_URL}/`;

    document.title = SITE_TITLE;
    upsertMeta('name', 'description', SITE_DESCRIPTION);
    upsertMeta('name', 'robots', 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1');
    upsertMeta('name', 'author', 'Dhivagar M');
    upsertMeta('name', 'theme-color', '#0f172a');

    upsertMeta('property', 'og:type', 'website');
    upsertMeta('property', 'og:site_name', 'Dhivagar M — Portfolio');
    upsertMeta('property', 'og:title', SITE_TITLE);
    upsertMeta('property', 'og:description', SITE_DESCRIPTION);
    upsertMeta('property', 'og:url', pageUrl);
    upsertMeta('property', 'og:image', GITHUB_AVATAR_URL);
    upsertMeta('property', 'og:image:alt', 'Dhivagar M — portrait');
    upsertMeta('property', 'og:locale', SITE_LOCALE);

    upsertMeta('name', 'twitter:card', 'summary_large_image');
    upsertMeta('name', 'twitter:title', SITE_TITLE);
    upsertMeta('name', 'twitter:description', SITE_DESCRIPTION);
    upsertMeta('name', 'twitter:image', GITHUB_AVATAR_URL);
    upsertMeta('name', 'twitter:site', SITE_TWITTER_HANDLE);
    upsertMeta('name', 'twitter:creator', SITE_TWITTER_HANDLE);

    upsertLink('canonical', pageUrl);

    const graph = {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'WebSite',
          '@id': `${pageUrl}#website`,
          url: pageUrl,
          name: SITE_TITLE,
          description: SITE_DESCRIPTION,
          inLanguage: 'en',
          publisher: { '@id': `${pageUrl}#person` },
        },
        {
          '@type': 'WebPage',
          '@id': `${pageUrl}#webpage`,
          url: pageUrl,
          name: SITE_TITLE,
          description: SITE_DESCRIPTION,
          isPartOf: { '@id': `${pageUrl}#website` },
          about: { '@id': `${pageUrl}#person` },
        },
        {
          '@type': 'Person',
          '@id': `${pageUrl}#person`,
          name: 'Dhivagar M',
          email: CONTACT_EMAIL,
          image: GITHUB_AVATAR_URL,
          url: pageUrl,
          jobTitle: 'Web Developer & Creative Designer',
          sameAs: [
            `https://github.com/${GITHUB_USERNAME}`,
            'https://www.linkedin.com/in/dhivagar1376/',
            'https://x.com/Dhivagar1376',
          ],
        },
      ],
    };

    const existing = document.getElementById(JSON_LD_ID);
    if (existing) existing.remove();
    const script = document.createElement('script');
    script.id = JSON_LD_ID;
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify(graph);
    document.head.appendChild(script);

    return () => {
      const s = document.getElementById(JSON_LD_ID);
      if (s) s.remove();
    };
  }, []);

  return null;
}
