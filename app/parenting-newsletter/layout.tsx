import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Free Parenting Newsletter - Expert Tips & Activities for Kids | Kiwiz',
  description: 'Subscribe to our free weekly parenting newsletter. Get expert tips, creative activities, early learning strategies, and developmental milestone guides. Perfect for parents of children aged 2-8. Join 10,000+ families.',
  keywords: [
    // Primary newsletter keywords
    'parenting newsletter',
    'free parenting tips',
    'early childhood newsletter',
    'parenting advice email',
    'weekly parenting tips',
    
    // Content-focused
    'parenting expert advice',
    'child development newsletter',
    'educational activities newsletter',
    'homeschool tips newsletter',
    'teaching tips for parents',
    
    // Age-specific
    'toddler parenting tips',
    'preschool parenting advice',
    'kindergarten parent newsletter',
    'early childhood education tips',
    'parenting tips for young kids',
    
    // Topic-specific
    'fine motor skills development',
    'learning activities at home',
    'creative parenting ideas',
    'educational parenting resources',
    'child development milestones',
    
    // Benefits
    'expert parenting guidance',
    'evidence-based parenting',
    'practical parenting tips',
    'time-saving parenting hacks',
    'stress-free parenting',
    
    // Long-tail
    'how to teach kids at home',
    'activities for 2-8 year olds',
    'parenting newsletter for busy moms',
    'quick learning activities',
    'screen-free activity ideas',
    
    // Newsletter specific
    'subscribe parenting newsletter',
    'free email parenting tips',
    'weekly parenting insights',
    'best parenting newsletter',
    'top parenting resources',
    
    // Community
    'parenting community',
    'parent support newsletter',
    'like-minded parents',
    'family learning community',
    
    // Value propositions
    'free parenting resources',
    'actionable parenting tips',
    'printable parenting guides',
    'parent education newsletter'
  ],
  authors: [{ name: 'Kiwiz Parenting Experts' }],
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
    url: 'https://yourdomain.com/parenting-newsletter',
    title: 'Free Weekly Parenting Newsletter - Expert Tips & Activities | Kiwiz',
    description: 'Join 10,000+ parents receiving expert parenting tips, creative activities, and early learning strategies. Free weekly newsletter for parents of children aged 2-8. Subscribe now!',
    siteName: 'Kiwiz',
    images: [
      {
        url: '/og-newsletter.png',
        width: 1200,
        height: 630,
        alt: 'Kiwiz Parenting Newsletter - Expert Tips and Activities',
        type: 'image/png',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free Parenting Newsletter - Expert Tips & Activities',
    description: 'Get weekly parenting tips, creative activities, and early learning strategies. Join 10,000+ parents.',
    images: ['/og-newsletter.png'],
    creator: '@Kiwiz',
  },
  alternates: {
    canonical: 'https://yourdomain.com/parenting-newsletter',
    languages: {
      'en-US': 'https://yourdomain.com/parenting-newsletter',
      'fr-FR': 'https://yourdomain.com/parenting-newsletter',
      'es-ES': 'https://yourdomain.com/parenting-newsletter',
      'de-DE': 'https://yourdomain.com/parenting-newsletter',
    },
  },
  other: {
    'newsletter:frequency': 'weekly',
    'newsletter:free': 'true',
  },
}

export default function ParentingNewsletterLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      {/* JSON-LD Structured Data for Newsletter */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebPage',
            name: 'Parenting Newsletter Subscription',
            description: 'Subscribe to weekly parenting tips, activities, and expert advice',
            url: 'https://yourdomain.com/parenting-newsletter',
            mainEntity: {
              '@type': 'NewsArticle',
              headline: 'Weekly Parenting Newsletter',
              description: 'Expert parenting tips, creative activities, and early learning strategies delivered weekly',
              publisher: {
                '@type': 'Organization',
                name: 'Kiwiz',
                logo: {
                  '@type': 'ImageObject',
                  url: 'https://yourdomain.com/logo.png'
                }
              }
            }
          }),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'ItemList',
            name: 'Newsletter Topics',
            description: 'Topics covered in our weekly parenting newsletter',
            itemListElement: [
              {
                '@type': 'ListItem',
                position: 1,
                name: 'Early Learning Tips',
                description: 'Expert advice on supporting your child\'s cognitive development'
              },
              {
                '@type': 'ListItem',
                position: 2,
                name: 'Parenting Strategies',
                description: 'Practical tips for managing daily challenges with young children'
              },
              {
                '@type': 'ListItem',
                position: 3,
                name: 'Creative Activities',
                description: 'Fun and educational activities you can do at home'
              },
              {
                '@type': 'ListItem',
                position: 4,
                name: 'Developmental Milestones',
                description: 'Understanding what to expect at each age and stage'
              }
            ]
          }),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: [
              {
                '@type': 'Question',
                name: 'How often will I receive the newsletter?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Our parenting newsletter is sent weekly, every Monday morning, with fresh tips and activities.'
                }
              },
              {
                '@type': 'Question',
                name: 'Is the newsletter really free?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Yes! Our parenting newsletter is completely free with no hidden costs or commitments.'
                }
              },
              {
                '@type': 'Question',
                name: 'Can I unsubscribe anytime?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Absolutely. You can unsubscribe with one click at any time from any newsletter email.'
                }
              },
              {
                '@type': 'Question',
                name: 'What age group is the content for?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Our newsletter focuses on parenting tips and activities for children aged 2-8 years old.'
                }
              }
            ]
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
                name: 'Parenting Newsletter',
                item: 'https://yourdomain.com/parenting-newsletter'
              }
            ]
          }),
        }}
      />
      {children}
    </>
  )
}

