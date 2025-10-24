'use client'
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import SectionHeading from "@/components/SectionHeading";
import { getJSON } from "@/lib/api";


export type Project = {
    id: string;
    slug: string;
    title: string;
    summary: string;
    tags?: string[];
    url?: string;
    repo?: string;

}
type ProjectList = {
  items: Project[];
  page: number;
  pageSize: number;
  total: number;
};


export function Projects() {
    const [data, setData] = useState<ProjectList | null>(null);
    const [loading, setLoading] = useState(true);
    const [err, setErr] = useState<string | null>(null);


    const gloveIconPath = (index: number) => {
        const n = ((index % 5) + 1) as 1 | 2 | 3 | 4 | 5;
        return `/glove-icons/glove-${n}.png`;
    };

    useEffect(() => {
        getJSON<ProjectList>("/api/projects")
            .then(setData)
            .catch((e) => setErr(e.message))
            .finally(() => setLoading(false));
    }, []);

    if (loading) return <div className="px-6 py-20 text-center">Loading projects...</div>;
    if (err) return <p className="text-red-600">Error: {err}</p>;
    if (!data || data.items.length === 0) return <div className="px-6 py-20 text-center">No projects found.</div>;

    return (
        <section id="projects" className="px-6 py-20">
            <div className="mx-auto max-w-5xl">
                <SectionHeading title="Featured Projects" subtitle="A few things I’ve done." />

                <ul className="mt-10 grid gap-6 md:grid-cols-2">
                    {data.items.map((p, i) => {
                        const n = ((i % 5) + 1) as 1 | 2 | 3 | 4 | 5; // TypeScript type assertion to limit n to values between 1 -> 5
                        return (
                            <li key={p.slug} className="rounded-2xl border border-gray-200 p-5 hover:shadow-sm transition">

                                <h3 className="text-md font-semibold inline-flex items-center ">
                                    {/* <span>Project</span> */}
                                    <Image
                                        src={gloveIconPath(i)}
                                        alt={`hand showing number ${(i % 5) + 1}`}
                                        width={36}
                                        height={36}
                                        priority={false}
                                    />
                                    <span className="sr-only">{` ${n}`}</span> {/* accessible number for screen readers */}
                                </h3>
                                <h4 className="mt-1 text-2xl font-bold">{p.title}</h4>
                                <p className="mt-2 text-gray-600">{p.summary}</p>

                                {p.tags?.length ? (
                                    <div className="mt-3 flex flex-wrap gap-2 text-xs text-gray-500">
                                        {p.tags.map((t) => (
                                            <span key={t} className="rounded-full border px-2 py-1">{t}</span>
                                        ))}
                                    </div>
                                ) : null}

                                <div className="mt-4 flex gap-3">
                                    {p.url && <Link href={p.url} className="text-sm underline underline-offset-4">Live</Link>}
                                    {p.repo && <Link href={p.repo} className="text-sm underline underline-offset-4">Code</Link>}
                                </div>
                            </li>
                        );
                    }
                    )}
                </ul>
            </div>
        </section>
    );
}