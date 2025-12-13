"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  Field,
  FieldGroup,
  FieldSeparator,
} from "@/components/ui/field"
import { createClient } from "@/utils/supabase/client"

export default function LoginPage() {
  const [loadingProvider, setLoadingProvider] = useState<"google" | "github" | null>(null)
  const [error, setError] = useState<string | null>(null)

  const supabase = createClient()

  const handleOAuthLogin = async (provider: "google" | "github") => {
    setLoadingProvider(provider)
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
        setLoadingProvider(null)
      }
    } catch {
      setError("Login failed, please try again later")
      setLoadingProvider(null)
    }
  }

  return (
    <div className="relative flex min-h-svh flex-col items-center justify-center overflow-hidden p-6 md:p-10">
      {/* Background gradient */}
      <div className="bg-linear-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-blue-950/30 dark:via-indigo-950/30 dark:to-purple-950/30 absolute inset-0" />
      <div className="absolute inset-0 bg-grid-slate-900/[0.04] bg-size-[20px_20px] dark:bg-grid-slate-400/[0.05]" />
      
      {/* Decorative blobs */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <div className="absolute left-1/4 top-1/4 h-120 w-120 animate-pulse rounded-full bg-linear-to-r from-blue-400/30 to-cyan-400/30 blur-3xl" />
        <div className="absolute right-1/4 bottom-1/4 h-140 w-140 animate-pulse rounded-full bg-linear-to-r from-purple-400/30 to-pink-400/30 blur-3xl" style={{ animationDelay: '1s' }} />
      </div>

      <div className="relative z-10 w-full max-w-sm md:max-w-5xl">
        <div className="flex flex-col gap-6">
          {/* Logo and tagline */}
          <div className="flex flex-col items-center gap-3 text-center">
            <div className="bg-linear-to-br from-blue-500 to-purple-600 flex h-16 w-16 items-center justify-center rounded-2xl shadow-xl shadow-blue-500/50">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-8 w-8"
              >
                {/* AI Neural Network Icon - Central node */}
                <circle cx="12" cy="12" r="2" fill="white" />
                
                {/* Outer nodes */}
                <circle cx="6" cy="6" r="1.5" fill="white" />
                <circle cx="18" cy="6" r="1.5" fill="white" />
                <circle cx="6" cy="18" r="1.5" fill="white" />
                <circle cx="18" cy="18" r="1.5" fill="white" />
                
                {/* Mid nodes */}
                <circle cx="12" cy="4" r="1.2" fill="white" />
                <circle cx="12" cy="20" r="1.2" fill="white" />
                <circle cx="4" cy="12" r="1.2" fill="white" />
                <circle cx="20" cy="12" r="1.2" fill="white" />
                
                {/* Connections from center to outer nodes */}
                <line x1="12" y1="12" x2="6" y2="6" strokeWidth="1.5" opacity="0.8" />
                <line x1="12" y1="12" x2="18" y2="6" strokeWidth="1.5" opacity="0.8" />
                <line x1="12" y1="12" x2="6" y2="18" strokeWidth="1.5" opacity="0.8" />
                <line x1="12" y1="12" x2="18" y2="18" strokeWidth="1.5" opacity="0.8" />
                
                {/* Connections from center to mid nodes */}
                <line x1="12" y1="12" x2="12" y2="4" strokeWidth="1.5" opacity="0.8" />
                <line x1="12" y1="12" x2="12" y2="20" strokeWidth="1.5" opacity="0.8" />
                <line x1="12" y1="12" x2="4" y2="12" strokeWidth="1.5" opacity="0.8" />
                <line x1="12" y1="12" x2="20" y2="12" strokeWidth="1.5" opacity="0.8" />
              </svg>
            </div>
            <div>
              <h1 className="bg-linear-to-r from-blue-600 to-purple-600 bg-clip-text text-3xl font-bold tracking-tight text-transparent dark:from-blue-400 dark:to-purple-400">
                Lumenis AI
              </h1>
              <p className="text-muted-foreground mt-1 text-sm">
                Intelligent Solutions for Modern Workflows
              </p>
            </div>
          </div>

          <Card className="border-border/50 overflow-hidden shadow-2xl shadow-blue-500/10 backdrop-blur-sm">
            <CardContent className="grid p-0 md:grid-cols-2">
              {/* Login form */}
              <div className="flex flex-col justify-center p-8 md:p-10">
                <FieldGroup>
                  <div className="flex flex-col gap-2 text-center">
                    <h2 className="text-2xl font-bold">Welcome back</h2>
                    <p className="text-muted-foreground text-balance text-sm">
                      Sign in to continue to your account
                    </p>
                  </div>

                  {error && (
                    <div className="animate-in fade-in slide-in-from-top-1 bg-destructive/15 text-destructive flex items-start gap-3 rounded-lg border border-destructive/20 p-3 text-sm">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        className="h-5 w-5 flex-shrink-0"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.28 7.22a.75.75 0 00-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 101.06 1.06L10 11.06l1.72 1.72a.75.75 0 101.06-1.06L11.06 10l1.72-1.72a.75.75 0 00-1.06-1.06L10 8.94 8.28 7.22z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span>{error}</span>
                    </div>
                  )}

                  <Field className="grid grid-cols-1 gap-3">
                    <Button
                      variant="outline"
                      type="button"
                      onClick={() => handleOAuthLogin("google")}
                      disabled={loadingProvider !== null}
                      className="h-11 gap-3 border-blue-200 bg-gradient-to-r from-blue-50 to-cyan-50 transition-all hover:border-blue-400 hover:from-blue-100 hover:to-cyan-100 hover:shadow-lg hover:shadow-blue-200/50 dark:border-blue-800 dark:from-blue-950 dark:to-cyan-950 dark:hover:border-blue-600"
                    >
                      {loadingProvider === "google" ? (
                        <svg
                          className="h-5 w-5 animate-spin"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          />
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          />
                        </svg>
                      ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="h-5 w-5">
                          <path
                            d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
                            fill="currentColor"
                          />
                        </svg>
                      )}
                      <span>Continue with Google</span>
                    </Button>
                    
                    <FieldSeparator>or</FieldSeparator>
                    
                    <Button
                      variant="outline"
                      type="button"
                      onClick={() => handleOAuthLogin("github")}
                      disabled={loadingProvider !== null}
                      className="h-11 gap-3 border-purple-200 bg-gradient-to-r from-purple-50 to-pink-50 transition-all hover:border-purple-400 hover:from-purple-100 hover:to-pink-100 hover:shadow-lg hover:shadow-purple-200/50 dark:border-purple-800 dark:from-purple-950 dark:to-pink-950 dark:hover:border-purple-600"
                    >
                      {loadingProvider === "github" ? (
                        <svg
                          className="h-5 w-5 animate-spin"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          />
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          />
                        </svg>
                      ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
                          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23 1.957-.544 4.059-.544 6.016 0 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                        </svg>
                      )}
                      <span>Continue with GitHub</span>
                    </Button>
                  </Field>

                  <div className="text-muted-foreground mt-2 text-center text-xs">
                    By signing in, you agree to our{" "}
                    <a href="#" className="hover:text-primary underline underline-offset-4">
                      Terms of Service
                    </a>{" "}
                    and{" "}
                    <a href="#" className="hover:text-primary underline underline-offset-4">
                      Privacy Policy
                    </a>
                  </div>
                </FieldGroup>
              </div>

              {/* Features section */}
              <div className="bg-gradient-to-br from-blue-50/50 to-purple-50/50 dark:from-blue-950/20 dark:to-purple-950/20 relative hidden flex-col justify-center p-10 md:flex md:border-l md:border-l-blue-200/50 dark:md:border-l-blue-800/30">
                <div className="space-y-6">
                  <div>
                    <h3 className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text mb-4 text-lg font-semibold text-transparent dark:from-blue-400 dark:to-purple-400">
                      Why Lumenis AI?
                    </h3>
                    <div className="space-y-4">
                      <div className="flex gap-3 rounded-lg bg-gradient-to-r from-blue-500/10 to-cyan-500/10 p-3 transition-all hover:from-blue-500/20 hover:to-cyan-500/20">
                        <div className="bg-gradient-to-br from-blue-500 to-cyan-600 flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg shadow-lg shadow-blue-500/30">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="white"
                            className="h-5 w-5"
                          >
                            <path
                              fillRule="evenodd"
                              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </div>
                        <div>
                          <h4 className="font-medium text-blue-900 dark:text-blue-100">Smart Automation</h4>
                          <p className="text-muted-foreground text-sm">
                            Streamline your workflow with AI-powered automation
                          </p>
                        </div>
                      </div>

                      <div className="flex gap-3 rounded-lg bg-gradient-to-r from-indigo-500/10 to-purple-500/10 p-3 transition-all hover:from-indigo-500/20 hover:to-purple-500/20">
                        <div className="bg-gradient-to-br from-indigo-500 to-purple-600 flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg shadow-lg shadow-indigo-500/30">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="white"
                            className="h-5 w-5"
                          >
                            <path
                              fillRule="evenodd"
                              d="M15.312 11.424a5.5 5.5 0 01-9.201 2.466l-.312-.311h2.433a.75.75 0 000-1.5H3.989a.75.75 0 00-.75.75v4.242a.75.75 0 001.5 0v-2.43l.31.31a7 7 0 0011.712-3.138.75.75 0 00-1.449-.39zm1.23-3.723a.75.75 0 00.219-.53V2.929a.75.75 0 00-1.5 0V5.36l-.31-.31A7 7 0 003.239 8.188a.75.75 0 101.448.389A5.5 5.5 0 0113.89 6.11l.311.31h-2.432a.75.75 0 000 1.5h4.243a.75.75 0 00.53-.219z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </div>
                        <div>
                          <h4 className="font-medium text-indigo-900 dark:text-indigo-100">Real-time Insights</h4>
                          <p className="text-muted-foreground text-sm">
                            Get instant analytics and actionable insights
                          </p>
                        </div>
                      </div>

                      <div className="flex gap-3 rounded-lg bg-gradient-to-r from-purple-500/10 to-pink-500/10 p-3 transition-all hover:from-purple-500/20 hover:to-pink-500/20">
                        <div className="bg-gradient-to-br from-purple-500 to-pink-600 flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg shadow-lg shadow-purple-500/30">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="white"
                            className="h-5 w-5"
                          >
                            <path
                              fillRule="evenodd"
                              d="M10 1a4.5 4.5 0 00-4.5 4.5V9H5a2 2 0 00-2 2v6a2 2 0 002 2h10a2 2 0 002-2v-6a2 2 0 00-2-2h-.5V5.5A4.5 4.5 0 0010 1zm3 8V5.5a3 3 0 10-6 0V9h6z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </div>
                        <div>
                          <h4 className="font-medium text-purple-900 dark:text-purple-100">Enterprise Security</h4>
                          <p className="text-muted-foreground text-sm">
                            Bank-level encryption and data protection
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Footer */}
          <div className="text-muted-foreground flex flex-col items-center gap-2 text-center text-xs">
            <div className="flex gap-4">
              <a href="#" className="hover:text-foreground transition-colors">
                Help Center
              </a>
              <span>•</span>
              <a href="#" className="hover:text-foreground transition-colors">
                Contact Support
              </a>
              <span>•</span>
              <a href="#" className="hover:text-foreground transition-colors">
                Status
              </a>
            </div>
            <p>© {new Date().getFullYear()} Lumenis AI. All rights reserved.</p>
          </div>
        </div>
      </div>
    </div>
  )
}
