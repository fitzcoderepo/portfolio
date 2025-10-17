'use client'
import SectionHeading from "@/components/SectionHeading";


export function Contact() {
    return (
        <section id="contact" className="px-6 py-20">
            <div className="mx-auto max-w-2xl text-center">
                <SectionHeading title="Contact" subtitle="Let’s build something together" />
                <p className="text-gray-600">Email me at <a className="underline" href="mailto:alecfitzgerald90@gmail.com">alec@example.com</a> or DM me on X/LinkedIn.</p>
                <div className="mt-8 flex gap-3 justify-center">
                    <a href="mailto:alec@example.com" className="rounded-xl px-6 py-3 bg-black text-white hover:opacity-90">Email</a>
                    <a href="#top" className="rounded-xl px-6 py-3 border border-gray-300 hover:bg-gray-50">Back to top</a>
                </div>
            </div>
        </section>
    );
}