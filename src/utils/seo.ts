import { Article, Language } from '../types';

export function updateDocumentMeta(title: string, description: string, url?: string, imageUrl?: string) {
  document.title = title;
  
  const metaDesc = document.querySelector('meta[name="description"]');
  if (metaDesc) metaDesc.setAttribute('content', description);

  const ogTitle = document.querySelector('meta[property="og:title"]');
  if (ogTitle) ogTitle.setAttribute('content', title);

  const ogDesc = document.querySelector('meta[property="og:description"]');
  if (ogDesc) ogDesc.setAttribute('content', description);

  const ogUrl = document.querySelector('meta[property="og:url"]');
  if (ogUrl && url) ogUrl.setAttribute('content', url);

  const ogImage = document.querySelector('meta[property="og:image"]');
  if (ogImage && imageUrl) {
    ogImage.setAttribute('content', imageUrl);
  } else if (imageUrl) {
    const newOgImage = document.createElement('meta');
    newOgImage.setAttribute('property', 'og:image');
    newOgImage.setAttribute('content', imageUrl);
    document.head.appendChild(newOgImage);
  }
}

export function injectNewsArticleSchema(article: Article, lang: Language) {
  const existingScript = document.getElementById('news-article-schema');
  if (existingScript) existingScript.remove();

  const title = lang === 'ar' ? article.titleAr : article.titleFr;
  const excerpt = lang === 'ar' ? article.excerptAr : article.excerptFr;

  const schema = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    "headline": title,
    "description": excerpt,
    "image": [article.imageUrl],
    "datePublished": article.publishedAt,
    "dateModified": article.publishedAt,
    "author": {
      "@type": "Person",
      "name": "Kaid News Editorial Team"
    },
    "publisher": {
      "@type": "Organization",
      "name": "قائد نيوز | Kaid News",
      "logo": {
        "@type": "ImageObject",
        "url": "https://kaidnews.dz/logo.png"
      }
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": window.location.href
    }
  };

  const script = document.createElement('script');
  script.id = 'news-article-schema';
  script.type = 'application/ld+json';
  script.text = JSON.stringify(schema);
  document.head.appendChild(script);
}
