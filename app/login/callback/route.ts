import { createClient } from '@/utils/supabase/server'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const requestUrl = new URL(request.url)
  const code = requestUrl.searchParams.get('code')
  const next = requestUrl.searchParams.get('next') ?? '/'
  const error_description = requestUrl.searchParams.get('error_description')
  const error = requestUrl.searchParams.get('error')

  const origin = requestUrl.origin

  if (error || error_description) {
    const errorMessage = error_description || error || 'auth_failed'
    return NextResponse.redirect(
      new URL(`/login?error=${encodeURIComponent(errorMessage)}`, origin)
    )
  }

  if (code) {
    const supabase = await createClient()
    const { error: exchangeError } = await supabase.auth.exchangeCodeForSession(code)
    
    if (!exchangeError) {
      const redirectUrl = new URL(next, origin)
      return NextResponse.redirect(redirectUrl, { status: 302 })
    } else {
      return NextResponse.redirect(
        new URL(`/login?error=${encodeURIComponent(exchangeError.message)}`, origin)
      )
    }
  }

  return NextResponse.redirect(new URL('/login?error=missing_code', origin))
}
