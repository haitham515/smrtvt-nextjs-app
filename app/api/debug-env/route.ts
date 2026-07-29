// app/api/debug-env/route.ts
export async function GET() {
  return Response.json({
    hasAuthSecret:    !!process.env.AUTH_SECRET,
    hasClientId:     !!process.env.AUTH_MICROSOFT_ENTRA_ID_ID,
    hasClientSecret: !!process.env.AUTH_MICROSOFT_ENTRA_ID_SECRET,
    hasIssuer:       !!process.env.AUTH_MICROSOFT_ENTRA_ID_ISSUER,
    nextauthUrl:     process.env.NEXTAUTH_URL,
  })
}