import CreateProjectForm from "@/components/CreateUpdateProjectForm"
import Link from "next/link"

export default function NewProjectPage() {
    return (
        <div className="p-8 min-w-[400px] mx-auto">

            <Link
                href="/dashboard"
                className="text-sm text-blue-600 hover:underline mb-6 inline-block"
            >
                ← Retour au dashboard
            </Link>

            <h1 className="text-2xl font-bold text-gray-800 mb-8">
                Nouveau projet
            </h1>

            <CreateProjectForm />

        </div>
    )
}