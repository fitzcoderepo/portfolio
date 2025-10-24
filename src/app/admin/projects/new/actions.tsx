"use server";

import { z } from "zod";
import { redirect } from "next/navigation";
import { randomInt } from "crypto";

const Schema = z.object({
  title: z.string().min(1),
  slug: z.string().min(1).regex(/^[a-z0-9-]+$/),
  summary: z.string().optional().default(""),
  tags: z.array(z.string()).optional().default([]),
  url: z.string().url().optional(),
  repo: z.string().url().optional(),
});

function slugify(s: string) {
  return s.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)+/g, "");
}

type State = { ok: boolean; error: string; slug: string };

export async function createProject(_state: State, formData: FormData): Promise<State> {
  const title = String(formData.get("title") ?? "");
  let slug = String(formData.get("slug") ?? "");
  if (!slug) slug = slugify(title);

  const raw = {
    title,
    slug,
    summary: String(formData.get("summary") ?? ""),
    tags: String(formData.get("tags") ?? "")
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean),
    url: String(formData.get("url") || "") || undefined,
    repo: String(formData.get("repo") || "") || undefined,
  };

  let data;
  try {
    data = Schema.parse(raw);
  } catch (e: any) {
    return { ok: false, error: e.errors?.[0]?.message ?? "Invalid input", slug: "" };
  }

  // Send to backend APIwith an admin token
  try {
    const res = await fetch(`${process.env.PORTFOLIO_API_BASE}/projects`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.BACKEND_ADMIN_TOKEN!}`,
      },
      body: JSON.stringify(data),
      // revalidate the list page quickly
      cache: "no-store",
    });

    if (!res.ok) {
      const text = await res.text().catch(() => "");
      return { ok: false, error: `Upstream error: ${res.status} ${text}`, slug: "" };
    }

    // Redirect to the new project detail page
    // redirect(`/projects/${data.slug}`);
    return { ok: true, error: "", slug: data.slug };
  } catch (err: any) {
    return { ok: false, error: err?.message ?? "Network error", slug: "" };
  }
}
