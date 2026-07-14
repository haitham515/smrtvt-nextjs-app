// app/dashboard/page.tsx
import { getAllProjects } from "@/lib/items"

import Link from "next/link"

import ProjectCard from "@/components/ProjectCard"
import ProfileButton from "@/components/ProfileButton"

export default async function Dashboard() {
    const projects = await getAllProjects()

    return (
        <div className="p-8 max-w-5xl mx-auto">

            {/* Header */}
            <div className="flex items-center justify-between mb-8">
                <h1 className="text-2xl font-bold text-gray-800">Mes Projets</h1>
                <div className="flex items-center gap-4">
                    <ProfileButton />
                    <Link
                        href="/dashboard/new-project"
                        className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                    >
                        + Nouveau projet
                    </Link>
                </div>
            </div>

            {/* Liste des projets */}
            {projects.length === 0 ? (
                <p className="text-gray-500 text-center mt-20">
                    Aucun projet pour le moment.
                </p>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {projects.map((project) => (
                        <ProjectCard key={project.id} project={project} />
                    ))}
                </div>
            )}

        </div>
    )
}