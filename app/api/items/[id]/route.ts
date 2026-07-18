import { getItem, updateItem, deleteItem, CreateItemDTO } from "@/lib/items"
import { auth } from "@/auth"
import { NextResponse } from "next/server"

type ItemPropId = { params: Promise<{ id: string }> }

export async function GET(
    _req: Request,
    { params }: ItemPropId
) {
    const session = await auth()
    if (!session) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { id } = await params

    // if (!id) {
    //     return NextResponse.json(
    //         { error: "erreur id" },
    //         { status: 400 }
    //     )
    // }

    try {
        const item = await getItem(id)
        return NextResponse.json(item)
    } catch (err: any) {
        if (err.code === 404) {
            return NextResponse.json({ error: "Item introuvable" }, { status: 404 })
        }
        return NextResponse.json({ error: "Erreur serveur a jmii" }, { status: 500 })
    }
}

export async function PUT(
    req: Request,
    { params }: ItemPropId
) {
    const session = await auth()
    if (!session) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { id } = await params
    const body: CreateItemDTO = await req.json()

    try {
        const item = await updateItem(id, body)
        return NextResponse.json(item)
    } catch (err: any) {
        if (err.code === 404) {
            return NextResponse.json({ error: "Item introuvable" }, { status: 404 })
        }
        return NextResponse.json({ error: "Erreur serveur" }, { status: 500 })
    }
}

export async function DELETE(
    _req: Request,
    { params }: ItemPropId
) {
    const session = await auth()
    if (!session) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // console.log("params de route.ts : ", params)
    const { id } = await params

    if (!id) {
        return NextResponse.json(
            { error: "id manquant" },
            { status: 400 }
        )
    }

    try {
        await deleteItem(id)
        return new NextResponse(null, { status: 204 })
    } catch (err: any) {
        if (err.code === 404) {
            return NextResponse.json({ error: "item introuvable" }, { status: 404 })
        }
        return NextResponse.json({ error: "Erreur serveur" }, { status: 500 })
    }

}

// la convention REST pour une suppression réussie est de retourner 204 sans body, pas 200 avec un message

// Si tu supprimes request et que tu ne laisses que context, Next.js va injecter l'objet de la requête dans ton paramètre
// context. Ton code cherchera alors params à l'intérieur de la requête HTTP, ce qui provoquera une nouvelle erreur.

// Pour éviter que TypeScript ne râle à cause d'une variable inutilisée, la convention est de la préfixer par un
// underscore