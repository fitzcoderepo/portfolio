"use client";
import { useActionState } from "react";
import { createProject } from "../new/actions";

const initial = { ok: false, error: "", slug: "" };

export function NewProjectForm() {
  const [state, formAction, pending] = useActionState(createProject, initial);

  return (
    <form action={formAction} className="space-y-4">
      <input name="title" placeholder="Title" className="w-full rounded border px-3 py-2" />
      <input name="slug" placeholder="Slug (auto if blank)" className="w-full rounded border px-3 py-2" />
      <textarea name="summary" placeholder="Summary" className="w-full rounded border px-3 py-2" />
      <input name="tags" placeholder="Tags (comma-separated)" className="w-full rounded border px-3 py-2" />
      <input name="url" placeholder="Live URL (optional)" className="w-full rounded border px-3 py-2" />
      <input name="repo" placeholder="Repo URL (optional)" className="w-full rounded border px-3 py-2" />

      <button disabled={pending} className="rounded bg-black px-4 py-2 text-white">
        {pending ? "Creating…" : "Create"}
      </button>

      {state.error && <p className="text-sm text-red-600">{state.error}</p>}
      {state.ok && (
        <p className="text-sm text-green-700">
          Created! <a className="underline" href={`/projects/${state.slug}`}>View project</a>
        </p>
      )}
    </form>
  );
}
