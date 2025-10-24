// components/FloatingNav.tsx
"use client";
import React, { useEffect, useMemo, useState } from "react";
import { Home, User, FolderGit2, Mail } from "lucide-react";


type Section = {
    id: string;
    label: string;
    icon?: React.ComponentType<{ size: number, className?: string }>
};

type Props = {
    sections?: Section[];
    className?: string;         // container bg/border
    itemClass?: string;         // base item text/hover
    itemActiveClass?: string;   // active item state
    railPosition?: "right" | "left";
};

const prefersReducedMotion =
    typeof window !== "undefined" &&
    window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;



export default function FloatingNav({
    sections = [
        { id: "top", label: "Top", icon: Home },
        { id: "about", label: "About", icon: User },
        { id: "projects", label: "Projects", icon: FolderGit2 },
        { id: "contact", label: "Contact", icon: Mail },
    ],
    
    className = "border border-white/10 bg-zinc-900/70 backdrop-blur-md",
    itemClass = "text-zinc-300 hover:text-white hover:bg-white/10 focus-visible:ring-sky-400",
    itemActiveClass = "text-white bg-white/15 ring-1 ring-white/20 shadow",
    railPosition = "right",
    
} : Props) {
    const [active, setActive] = useState<string>(sections[0]?.id ?? "");
    const ids = useMemo(() => sections.map((s) => s.id), [sections]);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                const visible = entries
                    .filter((e) => e.isIntersecting)
                    .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
                if (visible?.target?.id) setActive(visible.target.id);
            },
            { rootMargin: "-40% 0px -50% 0px", threshold: [0.1, 0.25, 0.5, 0.75, 1] }
        );
        ids.forEach((id) => {
            const el = document.getElementById(id);
            if (el) observer.observe(el);
        });
        return () => observer.disconnect();
    }, [ids]);

    const scrollTo = (id: string) => (e: React.MouseEvent) => {
        e.preventDefault();
        const el = document.getElementById(id);
        if (!el) return;
        el.scrollIntoView({ behavior: prefersReducedMotion ? "auto" : "smooth", block: "start" });
        el.setAttribute("tabindex", "-1");
        (el as HTMLElement).focus({ preventScroll: true });
    };

    const itemBase =
        "inline-flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-medium transition focus-visible:outline-none focus-visible:ring-2";
    const containerBase =
        "fixed z-50 p-2 rounded-2xl shadow-lg";

    return (
        <>
            {/* Mobile bottom pill */}
            <nav
                aria-label="Section navigation"
                className={`${containerBase} ${className} bottom-4 inset-x-0 mx-auto w-max max-w-[95vw] md:hidden pb-[env(safe-area-inset-bottom)]`}
            >
                <ul className="flex items-center gap-1">
                    {sections.map(({ id, label, icon: Icon = Home }) => (
                        <li key={id}>
                            <a
                                href={`#${id}`}
                                onClick={scrollTo(id)}
                                aria-current={active === id ? "page" : undefined}
                                className={`${itemBase} ${active === id ? itemActiveClass : itemClass}`}
                            >
                                <Icon className="size-4" size={0} />
                                {label}
                            </a>
                        </li>
                    ))}
                </ul>
            </nav>

            {/* Desktop side rail */}
            <nav
                aria-label="Section navigation"
                className={`${containerBase} ${className} hidden md:flex flex-col gap-2 top-1/2 -translate-y-1/2 ${railPosition === "right" ? "right-4" : "left-4"
                    }`}
            >
                {sections.map(({ id, label, icon: Icon = Home }) => (
                    <a
                        key={id}
                        href={`#${id}`}
                        onClick={scrollTo(id)}
                        aria-current={active === id ? "page" : undefined}
                        className={`${itemBase} justify-start ${active === id ? itemActiveClass : itemClass}`}
                        title={label}
                    >
                        <Icon className="size-4" size={0} />
                        {label}
                    </a>
                ))}
            </nav>
        </>
    );
}
