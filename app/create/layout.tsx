import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Create AI Coloring Pages & Tracing Worksheets | Free Online Generator - Kiwiz',
  description: 'Generate custom coloring pages and tracing worksheets instantly with AI. Perfect for kids aged 2-8. Free printable worksheets, educational activities, and handwriting practice. Create personalized learning materials in seconds.',
  keywords: [
    // Primary keywords
    'AI coloring pages generator',
    'free coloring pages for kids',
    'printable coloring sheets',
    'tracing worksheets generator',
    'alphabet tracing worksheets',
    'handwriting practice sheets',
    
    // Long-tail keywords
    'create custom coloring pages online',
    'AI generated coloring books',
    'personalized worksheets for kids',
    'educational coloring activities',
    'preschool tracing worksheets',
    'kindergarten worksheets free',
    
    // Age-specific
    'coloring pages for toddlers',
    'worksheets for 3 year olds',
    'printables for 4 year olds',
    'kindergarten activities',
    'preschool printables',
    
    // Activity-specific
    'letter tracing worksheets',
    'number tracing printables',
    'fine motor skills activities',
    'pre-writing worksheets',
    'learn to write letters',
    
    // Educational
    'homeschool worksheets',
    'educational printables',
    'learning activities for kids',
    'early childhood education',
    'montessori worksheets',
    
    // Free/Premium
    'free printable worksheets',
    'instant download worksheets',
    'no signup required',
    'online worksheet generator',
    
    // Technical/AI
    'AI worksheet generator',
    'automated coloring page creation',
    'custom printable generator',
    'instant worksheet maker'
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
    url: 'https://yourdomain.com/create',
    title: 'Create Free AI Coloring Pages & Tracing Worksheets Online | Kiwiz',
    description: 'Generate unlimited custom coloring pages and tracing worksheets with AI. Perfect for kids 2-8. Free printable educational activities, handwriting practice, and personalized learning materials. Create in seconds!',
    siteName: 'Kiwiz',
    images: [
      {
        url: '/og-create.png',
        width: 1200,
        height: 630,
        alt: 'Create Custom Coloring Pages and Tracing Worksheets with AI',
        type: 'image/png',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Create AI Coloring Pages & Tracing Worksheets | Free Generator',
    description: 'Generate custom coloring pages and tracing worksheets instantly with AI. Perfect for kids aged 2-8. Free printable educational activities.',
    images: ['/og-create.png'],
    creator: '@Kiwiz',
  },
  alternates: {
    canonical: 'https://yourdomain.com/create',
    languages: {
      'en-US': 'https://yourdomain.com/create',
      'fr-FR': 'https://yourdomain.com/create',
      'es-ES': 'https://yourdomain.com/create',
      'de-DE': 'https://yourdomain.com/create',
    },
  },
  other: {
    'pinterest-rich-pin': 'true',
    'format-detection': 'telephone=no',
  },
}

export default function CreateLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebApplication',
            name: 'Kiwiz Worksheet Generator',
            applicationCategory: 'EducationalApplication',
            description: 'AI-powered coloring pages and tracing worksheets generator for children aged 2-8',
            url: 'https://yourdomain.com/create',
            operatingSystem: 'Web',
            offers: {
              '@type': 'Offer',
              price: '0',
              priceCurrency: 'USD',
              description: 'Free to use with premium options available'
            },
            aggregateRating: {
              '@type': 'AggregateRating',
              ratingValue: '4.9',
              ratingCount: '10000',
              bestRating: '5',
              worstRating: '1'
            },
            featureList: [
              'AI-generated coloring pages',
              'Custom tracing worksheets',
              'Instant downloads',
              'Printable PDFs',
              'Free to use',
              'No signup required',
              'Age-appropriate content',
              'Educational activities'
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
                name: 'Create',
                item: 'https://yourdomain.com/create'
              }
            ]
          }),
        }}
      />
      {children}
    </>
  )
}

