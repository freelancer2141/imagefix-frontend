import { useEffect } from 'react';

export default function SEO({ title, description }) {
  useEffect(() => {
    // Page title
    document.title = title;

    // Meta description
    let descriptionTag = document.querySelector(
      'meta[name="description"]'
    );

    if (!descriptionTag) {
      descriptionTag = document.createElement('meta');
      descriptionTag.setAttribute('name', 'description');
      document.head.appendChild(descriptionTag);
    }

    descriptionTag.setAttribute('content', description);

    // Robots
    let robotsTag = document.querySelector(
      'meta[name="robots"]'
    );

    if (!robotsTag) {
      robotsTag = document.createElement('meta');
      robotsTag.setAttribute('name', 'robots');
      document.head.appendChild(robotsTag);
    }

    robotsTag.setAttribute('content', 'index, follow');

    // Open Graph title
    let ogTitleTag = document.querySelector(
      'meta[property="og:title"]'
    );

    if (!ogTitleTag) {
      ogTitleTag = document.createElement('meta');
      ogTitleTag.setAttribute('property', 'og:title');
      document.head.appendChild(ogTitleTag);
    }

    ogTitleTag.setAttribute('content', title);

    // Open Graph description
    let ogDescriptionTag = document.querySelector(
      'meta[property="og:description"]'
    );

    if (!ogDescriptionTag) {
      ogDescriptionTag = document.createElement('meta');
      ogDescriptionTag.setAttribute('property', 'og:description');
      document.head.appendChild(ogDescriptionTag);
    }

    ogDescriptionTag.setAttribute('content', description);

    // Twitter/X title
    let twitterTitleTag = document.querySelector(
      'meta[name="twitter:title"]'
    );

    if (!twitterTitleTag) {
      twitterTitleTag = document.createElement('meta');
      twitterTitleTag.setAttribute('name', 'twitter:title');
      document.head.appendChild(twitterTitleTag);
    }

    twitterTitleTag.setAttribute('content', title);

    // Twitter/X description
    let twitterDescriptionTag = document.querySelector(
      'meta[name="twitter:description"]'
    );

    if (!twitterDescriptionTag) {
      twitterDescriptionTag = document.createElement('meta');
      twitterDescriptionTag.setAttribute('name', 'twitter:description');
      document.head.appendChild(twitterDescriptionTag);
    }

    twitterDescriptionTag.setAttribute('content', description);
  }, [title, description]);

  return null;
}