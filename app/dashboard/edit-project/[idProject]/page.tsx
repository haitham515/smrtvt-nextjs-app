import { getItem } from "@/lib/items"
import { Projet } from "@/lib/items"
import UpdateProjectForm from "@/components/CreateUpdateProjectForm"
import Link from "next/link"

export default async function EditProjectPage({
    params,
}: {
    params: { idProject: string }
}) {
    const { idProject } = await params
    const projet = await getItem(idProject) as Projet

    return (
        <div className="p-8 min-w-[400px] mx-auto">

            <Link
                href="/dashboard"
                className="text-sm text-blue-600 hover:underline mb-6 inline-block"
            >
                ← Retour au dashboard
            </Link>

            <h1 className="text-2xl font-bold text-gray-800 mb-8">
                Modifier le projet
            </h1>

            <UpdateProjectForm initialData={projet} />

        </div>
    )
}