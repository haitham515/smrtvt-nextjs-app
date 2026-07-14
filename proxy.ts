import { auth as proxy } from "@/auth"
import { NextResponse } from "next/server"

const protectedRoutes = ["/dashboard", "/profile"]
const authPageRoutes = ["/login"]
const apiAuthPrefix = "/api/auth/"

export default proxy((req) =>{
    // console.log("votre req est : ", req)
    const {nextUrl} = req
    // console.log("les hidden elements de req sont : ");
    // console.dir(req, { showHidden: true, depth: 2 });
    // console.log("votre nextUrl est : ", nextUrl)
    const isLoggedIn = !!req.auth
    // console.log("vous etes", isLoggedIn ? "connecté" : "non connecté")
    const path = nextUrl.pathname
    // console.log("votre path est : ", path)

    const isApiAuthRoute = path.startsWith(apiAuthPrefix)
    const isProtectedRoute = protectedRoutes.includes(path)
    const isAuthPageRoute = authPageRoutes.includes(path)

    if(isApiAuthRoute) {
        return NextResponse.next()
    }

    if (isProtectedRoute && !isLoggedIn) {
        return NextResponse.redirect(new URL("/login", req.url))
        // Le deuxième paramètre (request.url) sert de base pour transformer le chemin relatif "/login" en URL absolue.
    }

    if(isAuthPageRoute && isLoggedIn) {
        return NextResponse.redirect(new URL("/dashboard", req.url))
    }

    return NextResponse.next()

})