'use client'
import { useActionState, useState } from "react";
import { postJSON } from "@/lib/api";
import SectionHeading from "@/components/SectionHeading";


type ContactPayload = {
    name: string;
    email: string;
    message: string;
    // honeypot
    company?: string;
};


export function ContactForm() {

    const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
    const [errorMsg, setErrorMsg] = useState<string>("");

    async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setErrorMsg("");
        setStatus("loading");

        const form = e.currentTarget;
        const formData = new FormData(form);

        const payload: ContactPayload = {
            name: String(formData.get("name") || "").trim(),
            email: String(formData.get("email") || "").trim(),
            message: String(formData.get("message") || "").trim(),
            company: String(formData.get("company") || ""), // honeypot
        };


        // client-side validation
        if (!payload.name || !payload.email || !payload.message) {
            setStatus("error");
            setErrorMsg("Please fill in all fields.");
            return;
        }
        // honeypot: bots may fill this... if so, fake success but drop it
        if (payload.company) {
            setStatus("success");
            form.reset();
            return;
        }

        try {
            await postJSON<ContactPayload, { ok: boolean }>("/api/contact", payload);
            setStatus("success");
            form.reset();
        } catch (err: any) {
            setStatus("error");
            setErrorMsg(err?.message ?? "Something went wrong.");
        }
    }


    return (
        <section id="contact" className="px-6 py-20">
            <div className="mx-auto max-w-2xl text-center">
                <SectionHeading title="Contact" subtitle="Let’s build something together" />

                {/* Status messages */}
                <div aria-live="polite" className="min-h-6 mt-2">
                    {status === "success" && (
                        <p className="text-green-700">Thanks! I’ll get back to you shortly.</p>
                    )}
                    {status === "error" && (
                        <p className="text-red-600">{errorMsg || "There was an error sending your message."}</p>
                    )}
                </div>

                <form onSubmit={onSubmit} className="mt-8 text-left mx-auto max-w-xl">
                    {/* Honeypot (hidden from users) */}
                    <label className="sr-only" htmlFor="company">Company</label>
                    <input
                        id="company"
                        name="company"
                        autoComplete="off"
                        tabIndex={-1}
                        className="hidden"
                    />

                    <div className="grid gap-4">
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
                            <input
                                id="name"
                                name="name"
                                type="text"
                                required
                                className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black/20"
                            />
                        </div>

                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                required
                                className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black/20"
                            />
                        </div>

                        <div>
                            <label htmlFor="message" className="block text-sm font-medium text-gray-700">Message</label>
                            <textarea
                                id="message"
                                name="message"
                                required
                                rows={5}
                                className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black/20"
                            />
                        </div>

                        <div className="mt-2 flex gap-3 justify-center">
                            <button
                                type="submit"
                                disabled={status === "loading"}
                                className="rounded-xl px-6 py-3 bg-black text-white hover:opacity-90 disabled:opacity-60"
                            >
                                {status === "loading" ? "Sending..." : "Send message"}
                            </button>

                            <a href="#top" className="rounded-xl px-6 py-3 border border-gray-300 hover:bg-gray-50">
                                Back to top
                            </a>
                        </div>
                    </div>
                </form>

                {/* Fallback mailto (optional) */}
                <p className="mt-6 text-gray-600">
                    Prefer email? <a className="underline" href="mailto:alecfitzgerald90v2.0@gmail.com">alecfitzgerald90v2.0@gmail.com</a>
                </p>
            </div>
        </section>
    );
}