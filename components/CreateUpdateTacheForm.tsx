"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Tache } from "@/lib/items"

import toast from "react-hot-toast"

interface CreateUpdateTacheFormProps {
    initialData?: Tache
    projectId: string  // toujours requis — une tâche appartient toujours à un projet
}

export default function CreateUpdateTacheForm({
    initialData,
    projectId,
}: CreateUpdateTacheFormProps) {
    const router = useRouter()
    const isEdit = !!initialData

    const [form, setForm] = useState({
        titre: initialData?.titre ?? "",
        description: initialData?.description ?? "",
        statut: initialData?.statut ?? "À faire",
        priorite: initialData?.priorite ?? "Moyenne",
        dateLimite: initialData?.dateLimite ?? "",
    })

    const [error, setError] = useState<string | null>(null)
    const [loading, setLoading] = useState(false)

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setError(null)
        setLoading(true)

        // validation côté client
        if (!form.titre || !form.description || !form.dateLimite) {
            // setError("Tous les champs sont obligatoires.")
            toast.error("Tous les champs sont obligatoires.")
            setLoading(false)
            return
        }

        const res = await fetch(
            isEdit ? `/api/items/${initialData!.id}` : "/api/items",
            {
                method: isEdit ? "PUT" : "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    type: "tache",
                    projetId: projectId,
                    titre: form.titre,
                    description: form.description,
                    statut: form.statut,
                    priorite: form.priorite,
                    dateLimite: form.dateLimite,
                }),
            }
        )

        setLoading(false)

        if (!res.ok) {
            const data = await res.json()
            // setError(data.error ?? "Erreur lors de l'opération.")
            toast.error(data.error ?? "Erreur lors de l'opération.")
            return
        }

        // alert(isEdit ? "Tâche modifiée avec succès." : "Tâche créée avec succès.")
        toast.success(isEdit ? "Tâche modifiée avec succès." : "Tâche créée avec succès.")
        router.push(`/dashboard/${projectId}`)
        router.refresh()
    }

    return (
        <form onSubmit={handleSubmit} className="flex flex-col max-h-screen space-y-5 pb-10">

            {/* Titre */}
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Titre</label>
                <input
                    name="titre"
                    value={form.titre}
                    onChange={handleChange}
                    placeholder="Nom de la tâche"
                    className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>

            {/* Description */}
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea
                    name="description"
                    value={form.description}
                    onChange={handleChange}
                    placeholder="Description de la tâche"
                    rows={4}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>

            {/* Priorité */}
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Priorité</label>
                <select
                    name="priorite"
                    value={form.priorite}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    <option value="Basse">Basse</option>
                    <option value="Moyenne">Moyenne</option>
                    <option value="Haute">Haute</option>
                </select>
            </div>

            {/* Statut — visible uniquement en mode édition */}
            {isEdit && (
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Statut</label>
                    <select
                        name="statut"
                        value={form.statut}
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="À faire">À faire</option>
                        <option value="En cours">En cours</option>
                        <option value="Terminé">Terminé</option>
                    </select>
                </div>
            )}

            {/* Date limite */}
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Date limite</label>
                <input
                    type="date"
                    name="dateLimite"
                    value={form.dateLimite}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>

            {/* Erreur */}
            {error && <p className="text-sm text-red-500">{error}</p>}

            {/* Submit */}
            <button
                type="submit"
                disabled={loading}
                className="mt-auto bottom-10 w-full bg-blue-600 text-white py-2 rounded-md text-sm font-medium hover:bg-blue-700 disabled:opacity-50 cursor-pointer"
            >
                {loading
                    ? isEdit ? "Modification en cours..." : "Création en cours..."
                    : isEdit ? "Modifier la tâche" : "Créer la tâche"
                }
            </button>

        </form>
    )
}