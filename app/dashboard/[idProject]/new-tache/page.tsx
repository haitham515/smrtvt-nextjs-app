import CreateTacheForm from "@/components/CreateUpdateTacheForm"
import Link from "next/link"

export default async function NewTachePage({ params }: { params: { idProject: string } }) {

    const { idProject } = await params
    return (
        <div className="p-8 min-w-[400px] mx-auto">

            <Link
                href="/dashboard"
                className="text-sm text-blue-600 hover:underline mb-6 inline-block"
            >
                ← Retour au dashboard
            </Link>

            <h1 className="text-2xl font-bold text-gray-800 mb-8">
                Nouvelle Tache
            </h1>

            <CreateTacheForm projectId={idProject} />

        </div>
    )
}