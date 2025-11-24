import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Contact Us - Kiwiz Support & Feedback",
  description: "Get in touch for help, feedback, or feature requests. Reach us via WhatsApp or Email.",
  openGraph: {
    title: "Contact Kiwiz Support",
    description: "Chat with us on WhatsApp or email our support team.",
    images: ["/og-contact.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact Kiwiz Support",
    description: "We're here to help you.",
    images: ["/og-contact.png"],
  },
}

export default function ContactUsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
