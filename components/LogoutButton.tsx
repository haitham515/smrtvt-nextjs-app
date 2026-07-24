"use client";

import { signOut } from "next-auth/react";

export default function LogoutButton() {
    return (
        <button
            onClick={() => {
                signOut()
                localStorage.clear()
            }}
            className="w-max-[50%] bg-blue-800 text-white p-3 rounded hover:opacity-80 cursor-pointer"
        >
            Se déconnecter
        </button>
    );
}