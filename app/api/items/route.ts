import { getAllItems, createItem, CreateItemDTO } from "@/lib/items"
import { auth } from "@/auth"
import { NextResponse } from "next/server"

export async function GET() {
    const session = await auth()
    // console.log("session dans GET :", session)
    if (!session) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const items = await getAllItems()
    console.log("items de route.ts : ", items)
    return NextResponse.json(items)
}

export async function POST(req: Request) {
    // console.log("req de route.ts : ", req)
    const session = await auth()
    if (!session) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }
    const body : CreateItemDTO = await req.json()
    // console.log("body de route.ts : ", body)
    const item = await createItem(body)
    return NextResponse.json(item)
}