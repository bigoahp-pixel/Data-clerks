import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Joseph Bigoah Puok Ruop | Hospital Data Clerk & Health Information Management Portfolio",
  description:
    "Explore Joseph Bigoah Puok Ruop’s Information Technology background, hospital data management demonstrations, data quality projects, reporting dashboards, and professional portfolio.",
  keywords: [
    "Data Clerk South Sudan",
    "Hospital Data Clerk",
    "Health Information Management Assistant",
    "HMIS Assistant",
    "Medical Records Clerk",
    "Healthcare Data Quality",
    "Information Technology Graduate",
  ],
  openGraph: {
    title: "Joseph Bigoah Puok Ruop | Hospital Data Clerk & Health Information Management Portfolio",
    description:
      "Explore Joseph Bigoah Puok Ruop’s Information Technology background, hospital data management demonstrations, data quality projects, reporting dashboards, and professional portfolio.",
    type: "website",
  },
  icons: {
    icon: "/icon.svg",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-slate-50 text-slate-800">{children}</body>
    </html>
  );
}
