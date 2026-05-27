import "./globals.css";
import { Inter, Instrument_Serif } from "next/font/google";

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
    url: "https://mohammadaman.in/",
    siteName: "Mohammad Aman Memon Portfolio",
    images: [
      {
        url: "https://mohammadaman.in/images/portfolio.webp",
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
    images: ["https://mohammadaman.in/images/portfolio.webp"],
  },
  icons: {
    icon: "/favicon.svg",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`dark ${inter.variable} ${instrumentSerif.variable}`}>
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
