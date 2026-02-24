"use client"

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Facebook, Instagram, LinkedinIcon, Youtube, Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";

export function Header() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/films", label: "Films" },
    { href: "/filmmakers", label: "Filmmakers" },
    { href: "/#fiscal", label: "Fiscal Sponsorship" },
    { href: "/#donate", label: "Donate" },
  ];

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    if (href.includes("#")) return false;
    return pathname.startsWith(href);
  };

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-zinc-800 shadow-[0_4px_20px_rgba(0,0,0,0.5)]">
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">

        {/* Logo */}
        <Link href="/">
          <Image
            src="/images/bdc-logo-circle.b0ea323b.png"
            alt="BDC logo"
            width={120}
            height={120}
            priority
          />
        </Link>

        {/* Desktop Navigation (>=800px) */}
        <nav className="hidden [@media(min-width:800px)]:block">
          <ul className="flex items-center gap-6">
            {navLinks.map((link) => {
              const active = isActive(link.href);

              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={`
                      uppercase text-sm px-3 py-1 rounded transition-all duration-300
                      ${active
                        ? "bg-purple-950/30 text-gray-400"
                        : "text-white hover:text-purple-500"
                      }
                    `}
                  >
                    {link.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Desktop Social Icons */}
        <div className="hidden [@media(min-width:800px)]:flex items-center gap-4 text-gray-500">
          <a href="https://instagram.com/bdcnewyork" target="_blank" rel="noopener noreferrer">
            <Instagram size={18} />
          </a>
          <a href="https://www.youtube.com/user/TheBDCNY/videos" target="_blank" rel="noopener noreferrer">
            <Youtube size={18} />
          </a>
          <a href="https://www.linkedin.com/company/black-documentary-collective-inc/about/" target="_blank" rel="noopener noreferrer">
            <LinkedinIcon size={18} />
          </a>
        </div>

        {/* Mobile Hamburger (<800px) */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="[@media(min-width:800px)]:hidden text-white"
        >
          {menuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      {menuOpen && (
        <div className="[@media(min-width:800px)]:hidden bg-zinc-900 px-6 py-6 space-y-4 animate-in fade-in slide-in-from-top-4 duration-300">
          {navLinks.map((link) => {
            const active = isActive(link.href);

            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className={`
                  block uppercase text-sm transition
                  ${active ? "text-purple-400" : "text-white hover:text-purple-500"}
                `}
              >
                {link.label}
              </Link>
            );
          })}

          <div className="flex gap-4 pt-4 text-gray-400">
            <Instagram size={18} />
            <Youtube size={18} />
            <LinkedinIcon size={18} />
          </div>
        </div>
      )}
    </header>
  );
}