import { getItem, getTachesByProject } from "@/lib/items";
import { Projet } from "@/lib/items";
import Link from "next/link";

import TacheCard from "@/components/TacheCard";

export default async function ProjectDetails({ params }: { params: { idProject: string } }) {
    const { idProject } = await params

    const projet = await getItem(idProject) as Projet
    const taches = await getTachesByProject(idProject)

    return (
        <div className="p-8 max-w-5xl mx-auto">

            {/* Bouton retour */}
            <Link
                href="/dashboard"
                className="text-sm text-blue-600 hover:underline mb-6 inline-block"
            >
                ← Retour au dashboard
            </Link>

            {/* Détails du projet */}
            <div className="border border-gray-200 rounded-lg p-6 mb-8 shadow-sm">
                <div className="flex items-center justify-between mb-3">
                    <h1 className="text-2xl font-bold text-gray-800">{projet.titre}</h1>
                    <span className={`text-xs px-2 py-1 rounded-full font-medium ${projet.statut === "Terminé" ? "bg-green-100 text-green-700" :
                            projet.statut === "En cours" ? "bg-blue-100 text-blue-700" :
                                "bg-gray-100 text-gray-600"
                        }`}>
                        {projet.statut}
                    </span>
                </div>
                <p className="text-gray-500 text-sm mb-4">{projet.description}</p>
                <div className="text-sm text-gray-600 space-y-1">
                    <p><span className="font-medium">Début :</span> {projet.dateDebut}</p>
                    <p><span className="font-medium">Durée :</span> {projet.dureeSemaines} semaines</p>
                    <p><span className="font-medium">Créé par :</span> {projet.creePar}</p>
                </div>
            </div>

            {/* Header tâches */}
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-800">
                    Tâches ({taches.length})
                </h2>
                <Link
                    href={`/dashboard/${idProject}/new-tache`}
                    className="bg-blue-600 text-white text-sm px-4 py-2 rounded-md hover:bg-blue-700"
                >
                    + Nouvelle tâche
                </Link>
            </div>

            {/* Liste des tâches */}
            {taches.length === 0 ? (
                <p className="text-gray-500 text-center mt-10">
                    Aucune tâche pour ce projet.
                </p>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {taches.map((tache) => (
                        <TacheCard key={tache.id} tache={tache} />
                    ))}
                </div>
            )}

        </div>
    );
}