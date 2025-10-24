"use client";
import { useActionState } from "react";
import { login } from "../login/server";

export default function AdminLoginPage() {

    const [state, formAction, pending] = useActionState(login, { ok: false, error: "" });

    return (
        <main className="mx-auto max-w-sm px-6 py-16">
            <h1 className="text-2xl font-bold">Admin Login</h1>
            <form action={formAction} className="mt-6 space-y-4">
                <input name="password" type="password" placeholder="Password"
                    className="w-full rounded border px-3 py-2" />
                <button disabled={pending} className="rounded bg-black px-4 py-2 text-white">
                    {pending ? "Signing in…" : "Sign in"}
                </button>
                {state.error && <p className="text-sm text-red-600">{state.error}</p>}
            </form>
        </main>
    );

}