import { useEffect } from 'react';

interface SEOProps {
  title?: string;
  description?: string;
  canonicalPath?: string;
  ogType?: 'website' | 'article';
  ogImage?: string;
  noIndex?: boolean;
}

const BASE_URL = 'https://einoow.com';
const DEFAULT_TITLE = 'Einoow';
const DEFAULT_DESCRIPTION = 'Discover and play creative web games. From AI-powered strategy to casual fun, Einoow brings innovative gaming experiences to your browser.';
const DEFAULT_OG_IMAGE = `${BASE_URL}/og-image.png`;

/**
 * Hook to dynamically update page meta tags for SEO.
 * Note: For SPAs without SSR, these changes only affect client-side rendering.
 * Social media crawlers may not see dynamic meta tags.
 */
export function useSEO({
  title,
  description,
  canonicalPath = '/',
  ogType = 'website',
  ogImage,
  noIndex = false,
}: SEOProps = {}) {
  useEffect(() => {
    const fullTitle = title ? `${title} | Einoow` : DEFAULT_TITLE;
    const fullDescription = description || DEFAULT_DESCRIPTION;
    const canonicalUrl = `${BASE_URL}${canonicalPath}`;
    const imageUrl = ogImage || DEFAULT_OG_IMAGE;

    // Update document title
    document.title = fullTitle;

    // Helper to update or create meta tags
    const setMeta = (selector: string, content: string, attrName = 'content') => {
      let el = document.querySelector(selector) as HTMLMetaElement | null;
      if (el) {
        el.setAttribute(attrName, content);
      } else {
        el = document.createElement('meta');
        const [attr, value] = selector.replace(/^meta\[|\]$/g, '').split('=');
        el.setAttribute(attr, value.replace(/"/g, ''));
        el.setAttribute(attrName, content);
        document.head.appendChild(el);
      }
    };

    // Helper to update or create link tags
    const setLink = (rel: string, href: string) => {
      let el = document.querySelector(`link[rel="${rel}"]`) as HTMLLinkElement | null;
      if (el) {
        el.href = href;
      } else {
        el = document.createElement('link');
        el.rel = rel;
        el.href = href;
        document.head.appendChild(el);
      }
    };

    // Primary meta tags
    setMeta('meta[name="title"]', fullTitle);
    setMeta('meta[name="description"]', fullDescription);
    setMeta('meta[name="robots"]', noIndex ? 'noindex, nofollow' : 'index, follow');

    // Canonical URL
    setLink('canonical', canonicalUrl);

    // Open Graph
    setMeta('meta[property="og:title"]', fullTitle);
    setMeta('meta[property="og:description"]', fullDescription);
    setMeta('meta[property="og:url"]', canonicalUrl);
    setMeta('meta[property="og:type"]', ogType);
    setMeta('meta[property="og:image"]', imageUrl);

    // Twitter
    setMeta('meta[property="twitter:title"]', fullTitle);
    setMeta('meta[property="twitter:description"]', fullDescription);
    setMeta('meta[property="twitter:url"]', canonicalUrl);
    setMeta('meta[property="twitter:image"]', imageUrl);

    // Cleanup: restore defaults on unmount
    return () => {
      document.title = DEFAULT_TITLE;
    };
  }, [title, description, canonicalPath, ogType, ogImage, noIndex]);
}
