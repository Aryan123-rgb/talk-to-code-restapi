import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'

<<<<<<< HEAD
const isPublicRoute = createRouteMatcher(['/sign-in(.*)', '/sign-up(.*)', '/', '/api/(.*)']);
=======
const isPublicRoute = createRouteMatcher(['/sign-in(.*)', '/sign-up(.*)', '/']);
>>>>>>> c77cfd2a013f58c7dd350a4aa707c6cfb5ccfcb7

export default clerkMiddleware(async (auth, req) => {
    if (!isPublicRoute(req)) {
        await auth.protect()
    }
})

export const config = {
    matcher: [
        // Skip Next.js internals and all static files, unless found in search params
        '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
        // Always run for API routes
        '/(api|trpc)(.*)',
    ],
}