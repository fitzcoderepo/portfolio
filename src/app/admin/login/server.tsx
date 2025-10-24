"use server"
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

type State = { ok: boolean; error?: string };

export async function login(_state: State, formData: FormData): Promise<State> {
    const pw = String(formData.get("password") ?? "").trim();
    const secret = process.env.ADMIN_SECRET

    if (!secret) return { ok: false, error: "ADMIN_SECRET is not set" };
    if (pw !== secret) return { ok: false, error: "Invalid password" };

    const isProd = process.env.NODE_ENV === "production";

    const cookie = await cookies();

    cookie.set("admin", "ok", {
        httpOnly: true,
        sameSite: "lax",
        secure: isProd,
        path: "/"
    });

    redirect("/admin/projects/new");
}

