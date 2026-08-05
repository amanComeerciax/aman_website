import "./globals.css";
import { Inter, Instrument_Serif } from "next/font/google";
import Script from "next/script";

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-inter",
  display: "swap",
});

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-instrument-serif",
  display: "swap",
});

export const metadata = {
  title: "Mohammad Aman Memon | Full Stack Developer & Software Engineer",
  description: "Portfolio of Mohammad Aman Memon, a Full Stack Developer specializing in modern web architecture, React, Next.js, and AI integrations.",
  keywords: ["Mohammad Aman Memon", "Aman Memon", "Full Stack Developer", "Software Engineer", "React Developer", "Next.js", "JavaScript", "Web Development", "AI Engineer", "India"],
  authors: [{ name: "Mohammad Aman Memon" }],
  openGraph: {
    title: "Mohammad Aman Memon | Full Stack Developer",
    description: "Portfolio of Mohammad Aman Memon, a Full Stack Developer specializing in React, Next.js, and AI integrations.",
    url: "https://www.mohammadaman.in/",
    siteName: "Mohammad Aman Memon Portfolio",
    images: [
      {
        url: "https://www.mohammadaman.in/images/pro.png",
        width: 1200,
        height: 630,
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Mohammad Aman Memon | Full Stack Developer",
    description: "Portfolio of Mohammad Aman Memon, a Full Stack Developer specializing in React, Next.js, and AI integrations.",
    images: ["https://www.mohammadaman.in/images/pro.png"],
  },
  icons: {
    icon: "/favicon.svg",
  },
  verification: {
    google: "7FiYvUNaeajfjfCL7kbtp-tFTpx_DpLTL2lDrtWENig",
  },
  alternates: {
    canonical: "https://www.mohammadaman.in/",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`dark ${inter.variable} ${instrumentSerif.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org/",
              "@type": "Person",
              "name": "Mohammad Aman Memon",
              "jobTitle": "Full Stack Developer & Software Engineer",
              "email": "amanmemon0014@gmail.com",
              "url": "https://www.mohammadaman.in/",
              "image": "https://www.mohammadaman.in/images/pro.png",
              "sameAs": [
                "https://www.linkedin.com/in/mohammad-aman-memon/",
                "https://x.com/AmaanMe54800548"
              ],
              "worksFor": {
                "@type": "Organization",
                "name": "Commerciax Infotech Pvt Ltd"
              },
              "areaServed": [
                {
                  "@type": "Place",
                  "name": "Ahmedabad, Gujarat, India"
                },
                {
                  "@type": "Place",
                  "name": "Remote Worldwide"
                }
              ],
              "knowsAbout": [
                "Web Development",
                "Full Stack Development",
                "MERN Stack Development",
                "React.js Development",
                "Node.js Development",
                "API Development",
                "AI Integration"
              ]
            })
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "ProfessionalService",
              "name": "Mohammad Aman Memon - Web & AI Development Services",
              "image": "https://www.mohammadaman.in/images/pro.png",
              "telephone": "+91-9265588226",
              "url": "https://www.mohammadaman.in/",
              "address": {
                "@type": "PostalAddress",
                "addressLocality": "Ahmedabad",
                "addressRegion": "Gujarat",
                "addressCountry": "IN"
              },
              "priceRange": "$$",
              "hasOfferCatalog": {
                "@type": "OfferCatalog",
                "name": "Development Services",
                "itemListElement": [
                  {
                    "@type": "Offer",
                    "itemOffered": {
                      "@type": "Service",
                      "name": "Full Stack Development with AI Integration"
                    }
                  },
                  {
                    "@type": "Offer",
                    "itemOffered": {
                      "@type": "Service",
                      "name": "AI Development"
                    }
                  },
                  {
                    "@type": "Offer",
                    "itemOffered": {
                      "@type": "Service",
                      "name": "Freelancing Website Development"
                    }
                  },
                  {
                    "@type": "Offer",
                    "itemOffered": {
                      "@type": "Service",
                      "name": "AI Solutions"
                    }
                  },
                  {
                    "@type": "Offer",
                    "itemOffered": {
                      "@type": "Service",
                      "name": "Custom Web Apps"
                    }
                  }
                ]
              }
            })
          }}
        />
      </head>
      <body className="antialiased">
        {children}
        <Script src="https://www.googletagmanager.com/gtag/js?id=G-K17JPRHLG9" strategy="afterInteractive" />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'G-K17JPRHLG9');
          `}
        </Script>
      </body>
    </html>
  );
}
