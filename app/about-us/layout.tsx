import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About Us - Our Mission to Make Learning Fun with AI | Kiwiz',
  description: 'Learn about Kiwiz: AI-powered educational tools for children aged 2-8. Our mission is to make learning accessible, engaging, and fun for every child. Meet our team of educators and AI experts.',
  keywords: [
    // Brand keywords
    'about Kiwiz',
    'Kiwiz mission',
    'Kiwiz team',
    'AI education platform',
    'educational technology company',
    
    // Mission-focused
    'child-centered learning',
    'accessible education',
    'innovative learning tools',
    'AI for education',
    'early childhood education technology',
    
    // Trust-building
    'educational app for kids',
    'safe learning platform',
    'trusted by parents',
    'teacher-approved worksheets',
    'child development experts',
    
    // Story keywords
    'educational startup',
    'AI learning revolution',
    'personalized learning platform',
    'homeschool technology',
    'future of education',
    
    // Team keywords
    'education experts',
    'AI researchers',
    'child development specialists',
    'teaching professionals',
    
    // Values
    'child safety first',
    'quality education',
    'family-focused learning',
    'innovation in education',
    'accessible learning tools',
    
    // Industry
    'EdTech company',
    'educational technology',
    'AI-powered learning',
    'digital education tools',
    'online learning platform',
    
    // Impact
    'helping families learn',
    'supporting teachers',
    'empowering parents',
    'child development support',
    'educational resources'
  ],
  authors: [{ name: 'Kiwiz' }],
  creator: 'Kiwiz',
  publisher: 'Kiwiz',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://yourdomain.com/about-us',
    title: 'About Kiwiz - Making Learning Fun with AI Technology',
    description: 'Discover how Kiwiz uses AI to create personalized educational content for children. Our team of educators and AI experts is dedicated to making learning accessible, engaging, and fun for every child aged 2-8.',
    siteName: 'Kiwiz',
    images: [
      {
        url: '/og-about.png',
        width: 1200,
        height: 630,
        alt: 'About Kiwiz - AI-Powered Educational Tools for Children',
        type: 'image/png',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About Kiwiz - Our Mission to Make Learning Fun',
    description: 'AI-powered educational tools for children aged 2-8. Meet our team of educators and AI experts.',
    images: ['/og-about.png'],
    creator: '@Kiwiz',
  },
  alternates: {
    canonical: 'https://yourdomain.com/about-us',
    languages: {
      'en-US': 'https://yourdomain.com/about-us',
      'fr-FR': 'https://yourdomain.com/about-us',
      'es-ES': 'https://yourdomain.com/about-us',
      'de-DE': 'https://yourdomain.com/about-us',
    },
  },
  other: {
    'article:author': 'Kiwiz Team',
  },
}

export default function AboutUsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      {/* JSON-LD Structured Data for AboutPage */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'AboutPage',
            name: 'About Kiwiz',
            description: 'Learn about our mission to make learning fun and accessible through AI-powered educational tools',
            url: 'https://yourdomain.com/about-us',
            mainEntity: {
              '@type': 'Organization',
              name: 'Kiwiz',
              description: 'AI-powered coloring and tracing worksheets for children aged 2-8',
              url: 'https://yourdomain.com',
              logo: 'https://yourdomain.com/logo.png',
              foundingDate: '2024',
              founders: [
                {
                  '@type': 'Person',
                  name: 'Sarah Johnson',
                  jobTitle: 'Founder & CEO',
                  description: 'Former kindergarten teacher with 10+ years of experience'
                }
              ],
              sameAs: [
                'https://twitter.com/Kiwiz',
                'https://facebook.com/Kiwiz',
                'https://instagram.com/Kiwiz'
              ]
            }
          }),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Organization',
            name: 'Kiwiz',
            alternateName: 'Kiwiz AI Learning',
            url: 'https://yourdomain.com',
            logo: 'https://yourdomain.com/logo.png',
            description: 'AI-powered educational tools creating personalized coloring pages and tracing worksheets for children aged 2-8',
            address: {
              '@type': 'PostalAddress',
              addressCountry: 'IN'
            },
            contactPoint: {
              '@type': 'ContactPoint',
              contactType: 'Customer Support',
              email: 'support@yourdomain.com',
              availableLanguage: ['English', 'French', 'Spanish', 'German']
            },
            aggregateRating: {
              '@type': 'AggregateRating',
              ratingValue: '4.9',
              ratingCount: '10000',
              bestRating: '5',
              worstRating: '1'
            }
          }),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: [
              {
                '@type': 'ListItem',
                position: 1,
                name: 'Home',
                item: 'https://yourdomain.com'
              },
              {
                '@type': 'ListItem',
                position: 2,
                name: 'About Us',
                item: 'https://yourdomain.com/about-us'
              }
            ]
          }),
        }}
      />
      {children}
    </>
  )
}

