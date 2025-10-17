'use client'
import Image from "next/image";
import Link from "next/link";
import SectionHeading from "@/components/SectionHeading";


export function About() {
    return (
        <section id="about" className="px-6 py-20 bg-gray-50">
            <div className="mx-auto max-w-3xl">
                <h2 className="text-3xl md:text-4xl font-bold text-black tracking-tight">About</h2>
                <p className="mt-4 text-gray-700">
                    I’m a software developer who thrives where logic meets creativity.
                    I solve problems with engineering discipline.
                    Give me a vague goal, and I'll scope it, model it, and expose the data.
                    I'm not a pro designer, but I implement UIs to be clean, accessible, and fast. 
                    I pick up new tools as needed and keep learning
                    new technologies and frameworks along the way.
                </p>

                <div className="mt-6 grid gap-3 sm:grid-cols-2">
                    <div className="rounded-xl border p-4">
                        <h3 className="font-semibold text-gray-700">Core</h3>
                        <p className="mt-2 text-sm text-gray-600">
                            Python · Django · JavaScript/TypeScript · Node.js · Next.js (learning)
                        </p>
                    </div>
                    <div className="rounded-xl border p-4">
                        <h3 className="font-semibold">Backend focus</h3>
                        <p className="mt-2 text-sm text-gray-600">
                            REST/GraphQL APIs · data modeling · auth · background jobs · caching · performance
                        </p>
                    </div>
                    <div className="rounded-xl border p-4">
                        <h3 className="font-semibold">Databases & infra</h3>
                        <p className="mt-2 text-sm text-gray-600">
                            Postgres · Redis · ORM (Prisma/SQLAlchemy) · Docker · CI/CD
                        </p>
                    </div>
                    <div className="rounded-xl border p-4">
                        <h3 className="font-semibold">Front end</h3>
                        <p className="mt-2 text-sm text-gray-600">
                            React · Tailwind/shadcn · accessibility · testing (Vitest/Playwright)
                        </p>
                    </div>
                </div>

                <p className="mt-6 text-gray-700">
                    I like clear scope, typed code, and shipping in small increments. If you need someone to stand up APIs,
                    wire data through a tidy UI, and keep performance in check, that’s my lane.
                </p>
            </div>
        </section>
    );
}