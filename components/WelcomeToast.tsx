"use client"

import { useEffect } from "react"
import { toast } from "react-hot-toast"

export default function WelcomeToast({ name }: { name: string }) {
    useEffect(() => {
        toast.success(`Bienvenue ${name} !`)
    }, [])
    return null
}