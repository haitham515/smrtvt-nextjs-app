import { getTachesByProject } from "@/lib/items";
import { useState } from "react";

export default async function Project({params} : {params: {idProject: string}}) {
    const {idProject} = params
    const taches = await getTachesByProject(idProject)
    
    return (
        <div>
            <h1>Project</h1>
        </div>
    );
}