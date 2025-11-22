"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  Field,
  FieldDescription,
  FieldGroup,
} from "@/components/ui/field"
import { createClient } from "@/utils/supabase/client"

export default function LoginPage() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const supabase = createClient()

  const handleOAuthLogin = async (provider: "google" | "github") => {
    setLoading(true)
    setError(null)

    try {
      
      const { error: oauthError } = await supabase.auth.signInWithOAuth({
        provider,
        options: {
          redirectTo: location.origin + '/login/callback',
        },
      })

      if (oauthError) {
        setError(oauthError.message)
        setLoading(false)
      }
    } catch {
      setError("Login failed, please try again later")
      setLoading(false)
    }
  }

  return (
    <div className="bg-muted flex min-h-svh flex-col items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm md:max-w-4xl">
        <div className="flex flex-col gap-6">
          <Card className="overflow-hidden p-0 h-[50vh] min-h-[max(50vh,400px)]">
            <CardContent className="grid p-0 md:grid-cols-2 h-full">
              <form className="p-6 md:p-8 flex flex-col justify-center gap-2">
                <FieldGroup>
                  <div className="flex flex-col items-center gap-2 text-center">
                    <h1 className="text-2xl font-bold">Welcome back</h1>
                    <p className="text-muted-foreground text-balance">
                      Login to Lumenis AI
                    </p>
                  </div>
                  {error && (
                    <div className="rounded-md bg-destructive/15 p-3 text-sm text-destructive">
                      {error}
                    </div>
                  )}
                  <Field className="grid grid-cols-2 gap-4">
                    <Button
                      variant="outline"
                      type="button"
                      onClick={() => handleOAuthLogin("google")}
                      disabled={loading}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                        <path
                          d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
                          fill="currentColor"
                        />
                      </svg>
                      <span className="sr-only">Login with Google</span>
                    </Button>
                    <Button
                      variant="outline"
                      type="button"
                      onClick={() => handleOAuthLogin("github")}
                      disabled={loading}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23 1.957-.544 4.059-.544 6.016 0 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                      </svg>
                      <span className="sr-only">Login with GitHub</span>
                    </Button>
                  </Field>
                </FieldGroup>
              </form>
              <div className="bg-muted relative hidden md:block">
                {/* <Image
                  src="/images/landing-cover.png"
                  alt="Image"
                  width={90}
                  height={160}
                  className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
                /> */}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
