import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'How to Use - Complete Guide to Creating AI Worksheets | Kiwiz Tutorial',
  description: 'Learn how to create custom coloring pages and tracing worksheets with Kiwiz AI generator. Step-by-step tutorial, tips, and best practices for parents and educators. Get started in under 30 seconds.',
  keywords: [
    // How-to keywords
    'how to create coloring pages',
    'worksheet generator tutorial',
    'AI worksheet guide',
    'create tracing worksheets online',
    'coloring page maker instructions',
    
    // Educational how-to
    'how to make printable worksheets',
    'generate custom learning materials',
    'create personalized worksheets',
    'worksheet generator for teachers',
    'homeschool worksheet creation',
    
    // Specific tasks
    'make alphabet tracing sheets',
    'create custom coloring books',
    'generate handwriting practice',
    'design kids worksheets',
    'create educational printables',
    
    // Problem-solving
    'worksheet ideas for kids',
    'printable worksheet tips',
    'best practices worksheet creation',
    'customize worksheets for children',
    
    // User intent
    'getting started with Kiwiz',
    'Kiwiz tutorial for beginners',
    'quick start worksheet generator',
    'easy worksheet creation',
    'step by step worksheet guide',
    
    // Feature-specific
    'use AI to create worksheets',
    'automated worksheet generation',
    'instant worksheet maker guide',
    'print worksheets at home',
    
    // Troubleshooting
    'worksheet not generating',
    'printable troubleshooting',
    'worksheet quality tips',
    'how to download worksheets',
    
    // Tips and tricks
    'worksheet creation tips',
    'best prompts for worksheets',
    'maximize worksheet generator',
    'worksheet ideas for homeschool'
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
    type: 'article',
    locale: 'en_US',
    url: 'https://yourdomain.com/how-to-use',
    title: 'Complete Guide: How to Create AI Worksheets in 3 Easy Steps | Kiwiz',
    description: 'Master Kiwiz worksheet generator in minutes. Step-by-step guide to creating perfect coloring pages and tracing worksheets. Includes tips, tricks, and best practices for parents and teachers.',
    siteName: 'Kiwiz',
    images: [
      {
        url: '/og-how-to-use.png',
        width: 1200,
        height: 630,
        alt: 'How to Use Kiwiz - Tutorial for Creating AI Worksheets',
        type: 'image/png',
      },
    ],
    article: {
      publishedTime: '2024-01-01T00:00:00Z',
      modifiedTime: new Date().toISOString(),
      section: 'Tutorial',
      tags: ['Tutorial', 'How-To', 'Education', 'Worksheets', 'AI'],
    },
  },
  twitter: {
    card: 'summary_large_image',
    title: 'How to Create AI Worksheets - Complete Tutorial | Kiwiz',
    description: 'Learn to create custom coloring pages and tracing worksheets in 3 easy steps. Complete beginner-friendly guide.',
    images: ['/og-how-to-use.png'],
    creator: '@Kiwiz',
  },
  alternates: {
    canonical: 'https://yourdomain.com/how-to-use',
    languages: {
      'en-US': 'https://yourdomain.com/how-to-use',
      'fr-FR': 'https://yourdomain.com/how-to-use',
      'es-ES': 'https://yourdomain.com/how-to-use',
      'de-DE': 'https://yourdomain.com/how-to-use',
    },
  },
}

export default function HowToUseLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      {/* JSON-LD Structured Data for HowTo */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'HowTo',
            name: 'How to Create Custom Coloring Pages and Tracing Worksheets with AI',
            description: 'Step-by-step guide to creating personalized educational worksheets using Kiwiz AI generator',
            image: 'https://yourdomain.com/og-how-to-use.png',
            totalTime: 'PT30S',
            estimatedCost: {
              '@type': 'MonetaryAmount',
              currency: 'USD',
              value: '0'
            },
            supply: [
              {
                '@type': 'HowToSupply',
                name: 'Internet connection'
              },
              {
                '@type': 'HowToSupply',
                name: 'Printer (optional)'
              }
            ],
            tool: [
              {
                '@type': 'HowToTool',
                name: 'Kiwiz AI Worksheet Generator'
              }
            ],
            step: [
              {
                '@type': 'HowToStep',
                position: 1,
                name: 'Choose Your Mode',
                text: 'Select either Coloring mode for coloring pages or Tracing mode for handwriting worksheets',
                image: 'https://yourdomain.com/tutorial-step1.png',
                url: 'https://yourdomain.com/how-to-use#step1'
              },
              {
                '@type': 'HowToStep',
                position: 2,
                name: 'Enter Your Idea',
                text: 'Type what you want to create (e.g., "a happy unicorn in space") or select from suggested prompts',
                image: 'https://yourdomain.com/tutorial-step2.png',
                url: 'https://yourdomain.com/how-to-use#step2'
              },
              {
                '@type': 'HowToStep',
                position: 3,
                name: 'Generate and Download',
                text: 'Click generate, wait for AI to create your worksheet, then download or print instantly',
                image: 'https://yourdomain.com/tutorial-step3.png',
                url: 'https://yourdomain.com/how-to-use#step3'
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
            '@type': 'VideoObject',
            name: 'How to Use Kiwiz - Quick Tutorial',
            description: 'Learn how to create custom coloring pages and tracing worksheets with Kiwiz AI generator',
            thumbnailUrl: 'https://yourdomain.com/video-thumbnail.png',
            uploadDate: '2024-01-01T00:00:00Z',
            duration: 'PT2M',
            contentUrl: 'https://yourdomain.com/tutorial-video.mp4'
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
                name: 'How to Use',
                item: 'https://yourdomain.com/how-to-use'
              }
            ]
          }),
        }}
      />
      {children}
    </>
  )
}

