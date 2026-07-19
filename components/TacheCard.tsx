// components/TacheCard.tsx
"use client"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { Tache } from "@/lib/items"
import UpdateDeleteButton from "./UpdateDeleteButton"
import ConfirmDeleteModal from "./ConfirmDeleteModal"

const prioriteColors: Record<string, string> = {
    "Haute": "bg-red-100 text-red-700",
    "Moyenne": "bg-yellow-100 text-yellow-700",
    "Basse": "bg-green-100 text-green-700",
}

const statutColors: Record<string, string> = {
    "Terminé": "bg-green-100 text-green-700",
    "En cours": "bg-blue-100 text-blue-700",
    "À faire": "bg-gray-100 text-gray-600",
}

export default function TacheCard({ tache }: { tache: Tache }) {
    const router = useRouter()
    const [showConfirm, setShowConfirm] = useState(false)
    const [deleting, setDeleting] = useState(false)

    const handleDelete = async () => {
        setDeleting(true)
        const res = await fetch(`/api/items/${tache.id}`, { method: "DELETE" })
        setDeleting(false)
        setShowConfirm(false)
        if (res.ok) {
            router.refresh()
            alert("Tache supprimée avec succès.")
        }
        else alert("Erreur lors de la suppression.")
    }

    const handleUpdate = () => {
        router.push(`/dashboard/${tache.projetId}/edit-tache/${tache.id}`)
    }

    return (
        <>
            {showConfirm && (
                <ConfirmDeleteModal
                    titre={tache.titre}
                    onConfirm={handleDelete}
                    onCancel={() => setShowConfirm(false)}
                    deleting={deleting}
                />
            )}

            <div className="border border-gray-200 rounded-lg p-5 shadow-sm hover:shadow-md transition">
                <div className="flex items-center justify-between mb-3">
                    <h3 className="text-base font-semibold text-gray-800">{tache.titre}</h3>
                    <span className={`text-xs px-2 py-1 rounded-full font-medium ${prioriteColors[tache.priorite] ?? "bg-gray-100 text-gray-600"
                        }`}>
                        {tache.priorite}
                    </span>
                </div>
                <p className="text-sm text-gray-500 mb-4 line-clamp-2">{tache.description}</p>
                <div className="text-sm text-gray-600 space-y-1 mb-5">
                    <p>
                        <span className="font-medium">Statut :</span>{" "}
                        <span className={`text-xs px-2 py-0.5 rounded-full ${statutColors[tache.statut] ?? "bg-gray-100 text-gray-600"
                            }`}>
                            {tache.statut}
                        </span>
                    </p>
                    <p><span className="font-medium">Date limite :</span> {tache.dateLimite}</p>
                </div>
                <div className="flex gap-2">
                    <UpdateDeleteButton text="Modifier" onClick={handleUpdate} variant="update" />
                    <UpdateDeleteButton text="Supprimer" onClick={() => setShowConfirm(true)} variant="delete" />
                </div>
            </div>
        </>
    )
}