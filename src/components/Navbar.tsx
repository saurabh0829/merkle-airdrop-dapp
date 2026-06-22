"use client"
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useTheme } from "next-themes";
import { Sun, Moon } from "lucide-react";
import { useEffect, useState } from "react";

const NAV_LINKS = [
    {href:"/", label:"Home"},
    {href:"/claim", label:"Claim"},
    {href:"/admin", label:"Admin"},
    {href:"/dashboard", label:"Dashboard"}
]

function ThemeToggle() {
    const { resolvedTheme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);
    useEffect(() => setMounted(true), []);

    if (!mounted) return <div className="w-8 h-8" />;

    return (
        <button
            onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
            className="p-1.5 rounded-lg text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800 transition-colors"
            aria-label="Toggle theme"
        >
            {resolvedTheme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
        </button>
    );
}

export function Navbar (){
    const pathname = usePathname();

    return (
        <nav className="sticky top-0 z-50 bg-white/80 dark:bg-gray-950/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-800">
            <div className="max-w-5xl mx-auto px-4 h-14 flex items-center justify-between">

                {/* Left: Logo + nav links */}
                <div className="flex items-center gap-6">
                    <Link href="/" className="font-bold text-lg">
                        SRBT Airdrop
                    </Link>
                    <div className="hidden sm:flex items-center">
                        {NAV_LINKS.map((link)=>{
                            const isActive = pathname === link.href;
                            return(
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors
                                        ${isActive ? "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300"
                                        : "text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800"
                                        }
                                    `}
                                >
                                    {link.label}
                                </Link>
                            )
                        })}
                    </div>
                </div>

                {/* Right: theme toggle + wallet connect */}
                <div className="flex items-center gap-4 p-2">
                    <ThemeToggle />
                    <ConnectButton
                        showBalance={false}
                        accountStatus="address"
                        chainStatus="full"
                    />
                </div>
            </div>
        </nav>
    )
}
