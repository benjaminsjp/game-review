import type { Metadata } from "next";
import { Work_Sans } from "next/font/google";
import "../globals.css";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/react";

import Link from "next/link";

const workSans = Work_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

const links = [
  { href: "/", label: "Hjem" },
  { href: "/spill", label: "Spill" },
  { href: "/search", label: "Søk" },
];

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="bg-background text-Text">
      <body className={workSans.className}>
        <nav className="text-xl border-b-2 border-solid border-secondary/20 mb-5 sticky top-0 bg-background bg-opacity-60 backdrop-filter backdrop-blur-lg z-10">
          <ul className="flex">
            {links.map((link) => (
              <li
                className="p-5 hover:text-primary transition-all duration-300"
                key={link.href}
              >
                <Link href={link.href}>{link.label}</Link>
              </li>
            ))}
          </ul>
        </nav>

        {children}
        <Analytics />
      </body>
    </html>
  );
}
