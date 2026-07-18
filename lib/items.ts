import { container } from "@/lib/cosmos"

// console.log("votre container importé est : ", container)

interface BaseItem {
    id: string
    type: "projet" | "tache"
    titre: string
    description: string
    statut: string
}

export interface Projet extends BaseItem {
    type: "projet"
    dateDebut: string
    dureeSemaines: number
    creePar: string
}

export interface Tache extends BaseItem {
    type: "tache"
    projetId: string
    priorite: string
    dateLimite: string
}

export type Item = Projet | Tache

type CreateProjetDTO = Omit<Projet, "id">
type CreateTacheDTO  = Omit<Tache,  "id">

export type CreateItemDTO   = CreateProjetDTO | CreateTacheDTO

export async function getAllProjects(): Promise<Projet[]> {
    const { resources } = await container.items
        .query("SELECT * FROM c WHERE c.type = 'projet'")
        .fetchAll()
    return resources as Projet[]
}

export async function getAllItems(): Promise<Item[]> {
    const { resources } = await container.items
        .query("SELECT * FROM c")
        .fetchAll() 
        // fetchAll() est une méthode du SDK @azure/cosmos qui exécute la requête SQL et récupère 
        // tous les résultats en une seule fois
    return resources as Item[]
}

export async function getItem(id: string): Promise<Item> {
    const { resource } = await container.item(id, id).read()
    return resource as Item
}

export async function getTachesByProject(projectId: string): Promise<Tache[]> {
    const { resources } = await container.items
        .query(`SELECT * FROM c WHERE c.type = "tache" AND c.projetId = "${projectId}"`)
        .fetchAll()
    return resources as Tache[]
}

export async function createItem(dto: CreateItemDTO): Promise<Item> {
    const { resource } = await container.items.create({...dto, id: crypto.randomUUID()})
    return resource as Item
}

export async function updateItem(id: string, dto: CreateItemDTO): Promise<Item> {
    const existing = await getItem(id)
    const updated = {...existing, ...dto, id}
    const { resource } = await container.item(id, id).replace(updated)
    return resource as Item
}

export async function deleteItem(id: string){
    await container.item(id, id).delete()
}