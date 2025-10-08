"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { Shield, Lock, Check } from "lucide-react"
import { useAuth } from "@/lib/auth-context"

export default function SignInPage() {
  const [identifier, setIdentifier] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const { signIn } = useAuth()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (identifier.length >= 10) {
      setIsLoading(true)
      // Simulate API call
      setTimeout(() => {
        signIn(identifier)
        setIsLoading(false)
      }, 2000)
    }
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="border-b border-border bg-white">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <Shield className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold text-foreground">TrustHub</span>
          </Link>
          <Button asChild variant="ghost" size="sm">
            <Link href="/">Back to Home</Link>
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Lock className="w-8 h-8 text-primary" />
            </div>
            <h1 className="text-3xl font-bold text-foreground mb-2">Welcome to TrustHub</h1>
            <p className="text-muted-foreground">Register with your BVN or NIN to get started</p>
          </div>

          <Card className="p-6 md:p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="identifier" className="block text-sm font-medium text-foreground mb-2">
                  BVN or NIN
                </label>
                <Input
                  id="identifier"
                  type="text"
                  placeholder="Enter your 11-digit BVN or NIN"
                  value={identifier}
                  onChange={(e) => setIdentifier(e.target.value.replace(/\D/g, "").slice(0, 11))}
                  className="text-lg"
                  required
                />
                <p className="text-xs text-muted-foreground mt-2">
                  Your information is encrypted and never shared without your consent
                </p>
              </div>

              <Button type="submit" className="w-full" size="lg" disabled={identifier.length < 10 || isLoading}>
                {isLoading ? "Signing in..." : "Sign In"}
              </Button>
            </form>

            <div className="mt-6 pt-6 border-t border-border">
              <p className="text-sm text-muted-foreground text-center mb-4">Why we need this:</p>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-success mt-0.5 flex-shrink-0" />
                  <p className="text-sm text-muted-foreground">Quick onboarding - no lengthy forms or paperwork</p>
                </div>
                <div className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-success mt-0.5 flex-shrink-0" />
                  <p className="text-sm text-muted-foreground">Secure identity verification for your protection</p>
                </div>
                <div className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-success mt-0.5 flex-shrink-0" />
                  <p className="text-sm text-muted-foreground">Access to all your financial accounts in one place</p>
                </div>
              </div>
            </div>
          </Card>

          <p className="text-center text-sm text-muted-foreground mt-6">
            Don't have an account?{" "}
            <Link href="/" className="text-primary hover:underline">
              Learn more about TrustHub
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
