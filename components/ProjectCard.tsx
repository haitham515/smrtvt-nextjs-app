"use client"
import Link from "next/link"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { Projet } from "@/lib/items"
import UpdateDeleteButton from "./UpdateDeleteButton"
import ConfirmDeleteModal from "./ConfirmDeleteModal"

export default function ProjectCard({ project }: { project: Projet }) {
    const router = useRouter()
    const [showConfirm, setShowConfirm] = useState(false)
    const [deleting, setDeleting] = useState(false)

    const handleDelete = async () => {
        setDeleting(true)

        const res = await fetch(`/api/items/${project.id}`, {
            method: "DELETE",
        })

        setDeleting(false)
        setShowConfirm(false)

        if (res.ok) {
            router.refresh()
        } else {
            alert("Erreur lors de la suppression.")
        }
    }

    const handleUpdate = () => {
        router.push(`/dashboard/edit-project/${project.id}`)
    }

    return (
        <>
            {/* Modal de confirmation */}
            {showConfirm && <ConfirmDeleteModal
                titre={project.titre}
                onConfirm={handleDelete}
                onCancel={() => setShowConfirm(false)}
                deleting={deleting}
            />}

            {/* Card */}
            <div className="flex flex-col border border-[3px] border-gray-400 rounded-lg p-5 shadow-sm hover:shadow-md transition">

                {/* Titre + Statut */}
                <div className="flex items-center justify-between mb-3">
                    <h2 className="text-lg font-semibold text-gray-800">{project.titre}</h2>
                    <span className={`text-xs px-2 py-1 rounded-full font-medium ${project.statut === "Terminé" ? "bg-green-100 text-green-700" :
                        project.statut === "En cours" ? "bg-blue-100 text-blue-700" :
                            "bg-gray-100 text-gray-600"
                        }`}>
                        {project.statut}
                    </span>
                </div>

                {/* Description */}
                <p className="text-sm text-gray-500 mb-4 line-clamp-2">
                    {project.description}
                </p>

                {/* Détails */}
                <div className="text-sm text-gray-600 space-y-1 mb-5">
                    <p><span className="font-medium">Début :</span> {project.dateDebut}</p>
                    <p><span className="font-medium">Durée :</span> {project.dureeSemaines} semaines</p>
                    <p><span className="font-medium">Créé par :</span> {project.creePar}</p>
                </div>

                {/* Actions */}
                <div className="flex gap-2 mt-auto">
                    <Link
                        href={`/dashboard/${project.id}`}
                        className="flex-1 text-center bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700"
                    >
                        Voir les tâches
                    </Link>
                    <UpdateDeleteButton text="Modifier" onClick={handleUpdate} variant="update" />
                    <UpdateDeleteButton text="Supprimer" onClick={() => setShowConfirm(true)} variant="delete" />
                </div>

            </div>
        </>
    )
}