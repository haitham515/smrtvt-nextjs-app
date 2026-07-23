// app/dashboard/[idProject]/edit-tache/[idTache]/page.tsx
import { getItem } from "@/lib/items"
import { Tache } from "@/lib/items"
import UpdateTacheForm from "@/components/CreateUpdateTacheForm"
import Link from "next/link"


export default async function EditTachePage({
    params,
}: {
    params: { idProject: string; idTache: string }
}) {
    const { idProject, idTache } = await params
    const tache = await getItem(idTache) as Tache

    return (
        <div className="p-8 min-w-[400px] mx-auto">
            <Link
                href={`/dashboard/${idProject}`}
                className="text-sm text-blue-600 hover:underline mb-6 inline-block"
            >
                ← Retour au projet
            </Link>
            <h1 className="text-2xl font-bold text-gray-800 mb-8">Modifier la tâche</h1>
            <UpdateTacheForm projectId={idProject} initialData={tache} />
        </div>
    )
}