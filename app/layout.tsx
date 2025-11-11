import type React from "react"
import type { Metadata } from "next"
import { Fredoka } from "next/font/google"
import "../styles/globals.css"
import { AuthProvider } from "./AuthProvider"
import ClientLayout from "@/components/ClientLayout"
import { ToastProviderWrapper } from "@/components/ui/use-toast"
import { generateMetadata as generateSEOMetadata, generateOrganizationSchema, generateWebApplicationSchema } from "@/lib/seo"

const fredoka = Fredoka({
  subsets: ["latin"],
  variable: "--font-fredoka",
  weight: ["300", "400", "500", "600", "700"],
})

export const metadata: Metadata = generateSEOMetadata({
  title: "Kiwiz - AI Coloring Pages & Tracing Worksheets for Kids",
  description: "Create personalized coloring pages and alphabet tracing worksheets for children aged 2-8 using AI. Free to try, instant results, safe for kids.",
  keywords: [
    "AI coloring pages",
    "tracing worksheets",
    "kids activities",
    "educational worksheets",
    "alphabet tracing",
    "preschool activities",
    "toddler learning",
    "printable coloring pages",
    "handwriting practice",
    "children education"
  ],
})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const organizationSchema = generateOrganizationSchema();
  const webAppSchema = generateWebApplicationSchema();

  return (
    <AuthProvider>
      <html lang="en" className={`${fredoka.variable} antialiased`}>
        <head>
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
          />
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }}
          />
        </head>
        <body className="overflow-x-hidden pb-16">
          {/* ✅ Wrap your entire app in the ToastProvider */}
          <ToastProviderWrapper>
            <ClientLayout>{children}</ClientLayout>
          </ToastProviderWrapper>
        </body>
      </html>
    </AuthProvider>
  )
}
