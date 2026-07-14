"use client"
import Link from "next/link"
import { Projet } from "@/lib/items"

import UpdateDeleteButton from "./UpdateDeleteButton"

export default function ProjectCard({ project }: { project: Projet }) {
    return (
        <div className="border border-[3px] border-gray-400 rounded-lg p-5 shadow-sm hover:shadow-md transition">

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
            <div className="flex gap-2">
                <Link
                    href={`/dashboard/${project.id}`}
                    className="flex-1 text-center bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700"
                >
                    Voir les tâches
                </Link>
                {/* <button
                    className="px-3 py-2 text-sm border border-gray-300 rounded-md hover:bg-gray-50 text-gray-600"
                >
                    Modifier
                </button>
                <button
                    className="px-3 py-2 text-sm border border-red-200 rounded-md hover:bg-red-50 text-red-500"
                >
                    Supprimer
                </button> */}
                <UpdateDeleteButton text="Modifier" onClick={() => { }} variant="update" />
                <UpdateDeleteButton text="Supprimer" onClick={() => { }} variant="delete" />
            </div>

        </div>
    )
}