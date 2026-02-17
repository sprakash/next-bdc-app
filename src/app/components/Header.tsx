"use client"

import Link from "next/link";
import Image from "next/image";
import { Facebook, Instagram, Linkedin, Twitter, Youtube, LinkedinIcon } from "lucide-react";
import { usePathname } from "next/navigation";

export function Header() {
    
    const pathname = usePathname(); // current path like "/", "/films", "/filmmakers"

    const navLinks = [
        { href: "/", label: "Home" },
        { href: "/films", label: "Films" },
        { href: "/filmmakers", label: "Filmmakers" },
        { href: "/#fiscal", label: "Fiscal Sponsorship" },
        { href: "/#donate", label: "Donate" },

    ];

    return (
    <header className="fixed top-0 left-0 w-full z-50 bg-zinc-800 shadow-[0_4px_20px_rgba(0,0,0,0.5)]">
            <div className="max-w-6xl mx-auto px-6 py-5 flex items-center justify-evenly">

                {/* Logo / Brand */}
                <Link href="/" className="text-lg font-semibold tracking-tight">
                    <Image src="/images/bdc-logo-circle.b0ea323b.png"
                        alt="BDC logo"
                        width={160}
                        height={160} priority />
                </Link>

                {/* Navigation */}
                <nav className="pt-20">
                <ul className="flex items-center gap-6">
                    {navLinks.map((link) => {
                    const isActive = pathname === link.href;

                    return (
                        <li key={link.href}>
                        <Link
                            href={link.href}
                            className={`uppercase text-sm
                            px-3 py-1 rounded
                            transition
                            ${isActive ? "bg-purple-950/20 text-gray-200" : "text-white hover:text-purple-500"}
                            `}
                        >
                            <span className="text-gray-300">{link.label}</span> 
                        </Link>
                        </li>
                    );
                    })}
                </ul>
                </nav>

                {/* Social Icons */}
                <div className="flex items-center gap-4 text-gray-500 pt-20">
                    <a
                        href="https://twitter.com/yourhandle"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-blue-600 transition"
                    >
                        <Facebook size={18} />
                    </a>

                    <a
                        href="https://instagram.com/bdcnewyork"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-pink-600 transition"
                    >
                        <Instagram size={18} />
                    </a>


                    <a
                        href="https://www.youtube.com/user/TheBDCNY/videos"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-red-600 transition"
                    >
                        <Youtube size={18} />
                    </a>

                    <a
                        href="https://www.linkedin.com/company/black-documentary-collective-inc/about/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-blue-900 transition"
                    >
                        <LinkedinIcon size={18} />
                    </a>
                </div>
            </div>
        </header>
    );

}