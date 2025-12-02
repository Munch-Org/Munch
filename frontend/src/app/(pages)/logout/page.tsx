"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { ACCESS_TOKEN, REFRESH_TOKEN } from "@/constants"

export default function LogoutPage() {
    const router = useRouter()

    useEffect(() => {
        localStorage.removeItem(ACCESS_TOKEN)
        localStorage.removeItem(REFRESH_TOKEN)
        router.push("/")
    }, [router])

    return (
        <div className="flex min-h-screen items-center justify-center">
            <p>Logging out...</p>
        </div>
    )
}
