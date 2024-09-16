import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getUser } from './client/User';

const protectedRoutes = ['/profile']
const authRoutes = ['/login', '/register']

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname
  const isProtectedRoute = protectedRoutes.includes(path)
  const isAuthRoute = authRoutes.includes(path)

  if (isProtectedRoute) {

  }


}

export const config = {
  matcher: ['/:path*'],
};