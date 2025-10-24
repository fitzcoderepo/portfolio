import { NewProjectForm } from "../new/ui";

export default function NewProjectPage() {
  return (
    <main className="mx-auto max-w-2xl px-6 py-10">
      <h1 className="text-2xl font-bold">New Project</h1>
      <p className="text-gray-600">Create a project and publish it to your site.</p>
      <div className="mt-6">
        <NewProjectForm />
      </div>
    </main>
  );
}
