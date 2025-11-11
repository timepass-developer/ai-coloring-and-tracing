import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Pricing & Membership Plans - Unlimited AI Worksheets for Kids | Kiwiz',
  description: 'Affordable membership plans for unlimited AI-generated coloring pages and tracing worksheets. Premium features include priority generation, exclusive templates, and ad-free experience. Perfect for homeschooling families and educators.',
  keywords: [
    // Primary keywords
    'worksheet generator pricing',
    'premium coloring pages subscription',
    'unlimited worksheets membership',
    'homeschool subscription plans',
    'educational app pricing',
    
    // Long-tail keywords
    'affordable worksheets for teachers',
    'family membership educational tools',
    'bulk worksheet downloads',
    'premium printable worksheets',
    'unlimited coloring pages subscription',
    
    // Value-focused
    'best value worksheet generator',
    'unlimited downloads for kids',
    'premium learning materials',
    'educational subscription for families',
    'homeschool resource subscription',
    
    // Comparison keywords
    'worksheet subscription vs free',
    'premium vs free worksheets',
    'best worksheet generator subscription',
    'affordable educational subscriptions',
    
    // Features
    'ad-free worksheet generator',
    'priority worksheet generation',
    'exclusive templates',
    'bulk worksheet creation',
    'family sharing plan',
    
    // Use cases
    'teacher subscription plans',
    'homeschool family plans',
    'daycare subscription pricing',
    'classroom worksheet membership',
    
    // Payment/Billing
    'monthly subscription worksheets',
    'annual worksheet plan',
    'cancel anytime subscription',
    'flexible payment options',
    
    // ROI keywords
    'save money on worksheets',
    'unlimited access educational content',
    'value for money learning materials',
    'cost-effective homeschool resources'
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
    url: 'https://yourdomain.com/membership',
    title: 'Unlock Unlimited AI Worksheets | Premium Membership Plans - Kiwiz',
    description: 'Get unlimited access to AI-generated coloring pages and tracing worksheets. Affordable family plans starting at ₹299/month. Perfect for homeschooling, teaching, and parenting. Cancel anytime.',
    siteName: 'Kiwiz',
    images: [
      {
        url: '/og-membership.png',
        width: 1200,
        height: 630,
        alt: 'Kiwiz Premium Membership - Unlimited Worksheets for Kids',
        type: 'image/png',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Unlimited AI Worksheets | Membership Plans - Kiwiz',
    description: 'Get unlimited access to AI-generated educational worksheets. Affordable plans for families and educators. Cancel anytime.',
    images: ['/og-membership.png'],
    creator: '@Kiwiz',
  },
  alternates: {
    canonical: 'https://yourdomain.com/membership',
    languages: {
      'en-US': 'https://yourdomain.com/membership',
      'fr-FR': 'https://yourdomain.com/membership',
      'es-ES': 'https://yourdomain.com/membership',
      'de-DE': 'https://yourdomain.com/membership',
    },
  },
  other: {
    'product:price:amount': '299',
    'product:price:currency': 'INR',
    'pinterest-rich-pin': 'true',
  },
}

export default function MembershipLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      {/* JSON-LD Structured Data for Pricing */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Product',
            name: 'Kiwiz Premium Membership',
            description: 'Unlimited AI-generated coloring pages and tracing worksheets for children',
            brand: {
              '@type': 'Brand',
              name: 'Kiwiz'
            },
            offers: [
              {
                '@type': 'Offer',
                name: 'Free Plan',
                price: '0',
                priceCurrency: 'INR',
                description: '5 generations total (lifetime)',
                availability: 'https://schema.org/InStock'
              },
              {
                '@type': 'Offer',
                name: 'Premium Plan',
                price: '299',
                priceCurrency: 'INR',
                priceValidUntil: '2025-12-31',
                description: 'Unlimited generations monthly',
                availability: 'https://schema.org/InStock',
                eligibleRegion: 'IN',
                billingIncrement: 'P1M'
              },
              {
                '@type': 'Offer',
                name: 'Family Plan',
                price: '1299',
                priceCurrency: 'INR',
                priceValidUntil: '2025-12-31',
                description: 'Up to 5 accounts with unlimited generations',
                availability: 'https://schema.org/InStock',
                eligibleRegion: 'IN',
                billingIncrement: 'P1M'
              }
            ],
            aggregateRating: {
              '@type': 'AggregateRating',
              ratingValue: '4.9',
              ratingCount: '10000',
              reviewCount: '8500'
            }
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
                name: 'What payment methods do you accept?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'We accept all major credit and debit cards via Stripe\'s secure payment system.'
                }
              },
              {
                '@type': 'Question',
                name: 'Can I cancel my subscription anytime?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Yes! You can cancel your subscription at any time, and your plan will remain active until the end of the billing cycle.'
                }
              },
              {
                '@type': 'Question',
                name: 'Do you offer refunds?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'We do not offer partial refunds, but you can cancel before your next billing period.'
                }
              },
              {
                '@type': 'Question',
                name: 'Is my payment information secure?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Absolutely. All transactions are processed securely through Stripe. We never store your card details.'
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
                name: 'Membership',
                item: 'https://yourdomain.com/membership'
              }
            ]
          }),
        }}
      />
      {children}
    </>
  )
}

