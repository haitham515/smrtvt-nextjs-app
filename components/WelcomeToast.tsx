"use client"

import { useEffect } from "react"
import { toast } from "react-hot-toast"

export default function WelcomeToast({ name }: { name: string }) {
    useEffect(() => {
        const hasBeenShown = localStorage.getItem("WelcomeToastShown")
        if (!hasBeenShown) {
            toast.success(`Bienvenue ${name} !`);
            localStorage.setItem("WelcomeToastShown", "true");
        }
    }, [name])
    return null
}