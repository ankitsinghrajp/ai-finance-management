import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server';

const isProtectedRoute = createRouteMatcher([
  "/dashboard(.*)",
  "/account(.*)",
  "/transaction(.*)",
])
export default clerkMiddleware(async (auth,req)=>{
      const myAuth = await auth();
      const {userId} = myAuth;

      if(!userId && isProtectedRoute(req)){
          const signInUrl = new URL('/sign-in',req.url);
          signInUrl.searchParams.set('/redirect_url',req.url);
          return NextResponse.redirect(signInUrl);
      }

      return NextResponse.next();

})

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
}