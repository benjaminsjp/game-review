"use client";

import { Work_Sans } from "next/font/google";
import "../globals.css";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/react";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

import Link from "next/link";

const workSans = Work_Sans({ subsets: ["latin"] });

const links = [
  { href: "/", label: "Hjem" },
  { href: "/spill", label: "Spill" },
];

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Kontrollerer om søkefelt er synlig eller ikke
  const [modalState, setModalState] = useState(false);
  // Lagrer søket til brukeren
  const [query, setQuery] = useState("");
  // Bruker useRouter for å redirecte brukeren
  const router = useRouter();

  // Håndterer brukeren sitt søk

  const handleSearch = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (query) router.push(`/search/${query}`);

    setModalState(false);
    setQuery("");
  };

  return (
    <html lang="en" className="bg-background text-Text">
      <body className={workSans.className}>
        <nav className="text-xl border-b-1 border-solid border-secondary/20 mb-5 sticky top-0 bg-background bg-opacity-60 backdrop-filter backdrop-blur-lg z-10">
          <ul className="flex">
            {links.map((link) => (
              <li className="p-5 relative" key={link.href}>
                <Link className="relative group" href={link.href}>
                  <span className="group-hover:bg-blue-500 absolute inset-x-0 bottom-0 left-0 w-full h-0.5 bg-transparent origin-bottom-right transform scaleX-0 transition-transform duration-300 ease-out"></span>
                  {link.label}
                </Link>
              </li>
            ))}
            <li
              onClick={() => setModalState(true)}
              className="p-5 relative cursor-pointer"
            >
              <p className="group hover:bg-blue-500 border-solid">
                Søk
                <span className="group-hover:bg-blue-500 absolute inset-x-0 bottom-0 left-0 w-full h-0.5 bg-transparent origin-bottom-right transform scaleX-0 transition-transform duration-300 ease-out"></span>
              </p>
            </li>
          </ul>
        </nav>

        {children}
        <Analytics />
        <SpeedInsights />

        {modalState && (
          <div className="fixed top-0 w-screen h-screen bg-background/50 flex items-center justify-center">
            <div
              className="w-full h-full z-0 fixed"
              onClick={() => setModalState(false)}
            ></div>
            <div className=" border-background/30 border-2 mb-72 sticky top-0 p-2 px-10 rounded-3xl bg-background bg-opacity-100 backdrop-filter backdrop-blur-md ">
              <form onSubmit={handleSearch}>
                <input
                  type="search"
                  placeholder="Søk:"
                  autoFocus
                  className="p-2 w-44 md:w-96 text-Text bg-transparent focus:outline-none focus:opacity-80"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                />
              </form>
            </div>
          </div>
        )}
      </body>
    </html>
  );
}
