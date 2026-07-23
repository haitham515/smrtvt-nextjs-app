"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Projet } from "@/lib/items"

import toast from "react-hot-toast"

interface CreateUpdateProjectFormProps {
    initialData?: Projet  // optionnel → absent = création, présent = édition
}

export default function CreateUpdateProjectForm({ initialData }: CreateUpdateProjectFormProps) {
    const router = useRouter()
    const isEdit = !!initialData

    const [form, setForm] = useState({
        titre: initialData?.titre ?? "",
        description: initialData?.description ?? "",
        statut: initialData?.statut ?? "À faire",
        dateDebut: initialData?.dateDebut ?? "",
        dureeSemaines: initialData?.dureeSemaines?.toString() ?? "",
        creePar: initialData?.creePar ?? "",
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
        if (!form.titre || !form.description || !form.dateDebut || !form.dureeSemaines || !form.creePar) {
            // setError("Tous les champs sont obligatoires.")
            toast.error("Tous les champs sont obligatoires.")
            setLoading(false)
            return
        }

        const res = await fetch(isEdit ? `/api/items/${initialData?.id}` : "/api/items", {
            method: isEdit ? "PUT" : "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                type: "projet",
                titre: form.titre,
                description: form.description,
                statut: form.statut,
                dateDebut: form.dateDebut,
                dureeSemaines: Number(form.dureeSemaines),
                creePar: form.creePar,
            }),
        })

        setLoading(false)

        if (!res.ok) {
            const data = await res.json()
            // setError(data.error ?? "Erreur lors de la création.")
            toast.error(data.error ?? "Erreur lors de la création.")
            // data.error ?? "Erreur lors de la création." is equivalent to [!data.error ? "Erreur lors de la création" : data.error]
            console.log("erreur lors de la création dans CreateProjectForm : ", error)
            return
        }

        // alert(isEdit ? "Projet modifié avec succes." : "Projet créé avec succes.")
        toast.success(isEdit ? "Projet modifié avec succes." : "Projet créé avec succes.")
        router.push("/dashboard")
        router.refresh()  // force le re-fetch des projets sinon le nouveau projet n'apparaîtrait pas immédiatement dans le dashboard
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-5">

            {/* Titre */}
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                    Titre
                </label>
                <input
                    name="titre"
                    value={form.titre}
                    onChange={handleChange}
                    placeholder="Nom du projet"
                    className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>

            {/* Description */}
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                    Description
                </label>
                <textarea
                    name="description"
                    value={form.description}
                    onChange={handleChange}
                    placeholder="Description du projet"
                    rows={4}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>

            {/* Statut */}
            {isEdit && (
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Statut
                    </label>
                    <select
                        name="statut"
                        value={form.statut}
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="En cours">En cours</option>
                        <option value="À faire">À faire</option>
                        <option value="Terminé">Terminé</option>
                    </select>
                </div>
            )}

            {/* Date de début */}
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                    Date de début
                </label>
                <input
                    type="date"
                    name="dateDebut"
                    value={form.dateDebut}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>

            {/* Durée en semaines */}
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                    Durée (semaines)
                </label>
                <input
                    type="number"
                    name="dureeSemaines"
                    value={form.dureeSemaines}
                    onChange={handleChange}
                    min={1}
                    placeholder="ex: 8"
                    className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>

            {/* Créé par */}
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                    Créé par
                </label>
                <input
                    name="creePar"
                    value={form.creePar}
                    onChange={handleChange}
                    placeholder="Votre nom"
                    className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>

            {/* Erreur */}
            {error && (
                <p className="text-sm text-red-500">{error}</p>
            )}

            {/* Submit */}
            <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-600 text-white py-2 rounded-md text-sm font-medium hover:bg-blue-700 disabled:opacity-50 cursor-pointer"
            >
                {loading
                    ? isEdit ? "Modification en cours..." : "Création en cours..."
                    : isEdit ? "Modifier le projet" : "Créer le projet"
                }
            </button>

        </form>
    )
}