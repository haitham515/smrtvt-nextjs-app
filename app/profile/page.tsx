import { auth } from "@/auth";
import Image from "next/image";

import LogoutButton from "@/components/LogoutButton";
import Link from "next/link";

export default async function Profile() {
    const session = await auth();

    // console.log(session);

    if (!session || !session.user) {
        return (
            <div className="flex items-center justify-center min-h-[90vh]">
                <p>Veuillez vous connecter pour accéder à votre profil.</p>
            </div>
        );
    }

    return (

        <div className="relative flex flex-col items-center justify-center min-h-[90vh] gap-10">
            <Link
                href="/dashboard"
                className="absolute top-15 left-15 text-sm text-blue-600 hover:underline"
            >
                ← Retour au dashboard
            </Link>

            <div className="p-10 rounded-md bg-[#3d4b60] border-[4px] rounded-[4px] min-w-[30%] max-w-[50%] flex gap-5 flex-col items-center">
                {session?.user?.image ? (
                    <Image
                        width={100}
                        height={100}
                        alt={session?.user?.name || ""}
                        src={session?.user?.image || ""}
                        className="w-20 h-20 rounded-full border border-yellow-500 shadow-md"
                    />
                ) : (
                    <div className="flex flex-col items-center justify-center w-20 h-20 font-bold text-[20px] rounded-full border border-yellow-500 shadow-md bg-green-500">
                        {session?.user?.name?.charAt(0).toUpperCase()}
                        {session?.user?.name?.split(" ")[1]?.charAt(0).toUpperCase()}
                    </div>
                )}
                <div className="text-center font-bold">
                    <p>{session?.user?.name}</p>
                    <p>{session?.user?.email}</p>
                </div>
            </div>

            <LogoutButton />
        </div>
    );
}