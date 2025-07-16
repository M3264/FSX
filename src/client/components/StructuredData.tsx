import React from 'react';
import { Helmet } from 'react-helmet';

interface StructuredDataProps {
  type: 'Organization' | 'Person' | 'WebSite' | 'WebPage' | 'BlogPosting' | 'Service' | 'Product';
  data: Record<string, any>;
}

/**
 * Composant pour ajouter des données structurées Schema.org
 * Cela améliore le référencement et l'affichage dans les résultats Google
 */
const StructuredData: React.FC<StructuredDataProps> = ({ type, data }) => {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': type,
    ...data,
  };

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(structuredData)}
      </script>
    </Helmet>
  );
};

/**
 * Données structurées pour l'organisation
 */
export const OrganizationStructuredData: React.FC = () => {
  const orgData = {
    name: 'FAMOUS-TECH',
    url: 'https://www.famoustech.xyz',
    logo: 'https://www.famoustech.xyz/logo.png',
    description: "Famous-Tech est une entreprise de développement web et mobile en Haïti, spécialisée dans la création de solutions digitales innovantes.",
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Port-au-Prince',
      addressLocality: 'Port-au-Prince',
      addressRegion: 'Ouest',
      postalCode: 'HT6110',
      addressCountry: 'HT'
    },
    sameAs: [
      'https://github.com/Famous-Tech',
      'https://www.tiktok.com/@techfamous'
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+509 44156629',
      email: 'famoustechgroup@proton.me',
      contactType: 'customer service',
      availableLanguage: ['fr', 'en', 'ht']
    },
    areaServed: {
      '@type': 'Country',
      name: 'Haiti'
    },
    foundingDate: '2023',
    founder: {
      '@type': 'Person',
      name: 'Famous-Tech Team'
    }
  };

  return <StructuredData type="Organization" data={orgData} />;
};

/**
 * Données structurées pour la page d'accueil
 */
export const WebsiteStructuredData: React.FC = () => {
  const websiteData = {
    name: 'FAMOUS-TECH - Solutions de développement web et mobile',
    description: "Transformez vos idées en solutions digitales innovantes avec Famous-Tech. Développement web, applications mobiles et stratégies digitales sur mesure en Haïti.",
    url: 'https://www.famoustech.xyz',
    potentialAction: {
      '@type': 'SearchAction',
      target: 'https://www.famoustech.xyz/search?q={search_term_string}',
      'query-input': 'required name=search_term_string'
    },
    publisher: {
      '@type': 'Organization',
      name: 'FAMOUS-TECH',
      logo: {
        '@type': 'ImageObject',
        url: 'https://www.famoustech.xyz/logo.png'
      }
    }
  };

  return <StructuredData type="WebSite" data={websiteData} />;
};

/**
 * Données structurées pour une page
 */
export const WebPageStructuredData: React.FC<{ 
  title: string; 
  description: string;
  path: string;
  image?: string;
  datePublished?: string;
  dateModified?: string;
}> = ({ title, description, path, image, datePublished, dateModified }) => {
  const pageData = {
    name: title,
    description: description,
    url: `https://www.famoustech.xyz${path}`,
    ...(image && {
      image: {
        '@type': 'ImageObject',
        url: image
      }
    }),
    ...(datePublished && { datePublished }),
    ...(dateModified && { dateModified }),
    publisher: {
      '@type': 'Organization',
      name: 'FAMOUS-TECH',
      logo: {
        '@type': 'ImageObject',
        url: 'https://www.famoustech.xyz/logo.png'
      }
    }
  };

  return <StructuredData type="WebPage" data={pageData} />;
};

export default StructuredData; 