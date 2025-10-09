"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Shield, LogOut } from "lucide-react"
import { useAuth } from "@/lib/auth-context"

export function AppHeader() {
  const { user, isAuthenticated, signOut } = useAuth()

  return (
    <header className="border-b border-border bg-card sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href={isAuthenticated ? "/dashboard" : "/"} className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <Shield className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold text-foreground">TrustHub</span>
          </Link>

          {isAuthenticated ? (
            <div className="flex items-center gap-4">
              <nav className="hidden md:flex items-center gap-2">
                <Button asChild variant="ghost" size="sm">
                  <Link href="/dashboard">Dashboard</Link>
                </Button>
                <Button asChild variant="ghost" size="sm">
                  <Link href="/insights">Insights</Link>
                </Button>
                <Button asChild variant="ghost" size="sm">
                  <Link href="/trust-score">Trust Score</Link>
                </Button>
                <Button asChild variant="ghost" size="sm">
                  <Link href="/privacy">Privacy</Link>
                </Button>
              </nav>
              <div className="flex items-center gap-3">
                <span className="text-sm text-muted-foreground hidden sm:inline">{user?.name}</span>
                <Button onClick={signOut} variant="outline" size="sm" className="gap-2 bg-transparent">
                  <LogOut className="w-4 h-4" />
                  <span className="hidden sm:inline">Sign Out</span>
                </Button>
              </div>
            </div>
          ) : (
            <Button asChild variant="outline" size="sm">
              <Link href="/signin">Sign In</Link>
            </Button>
          )}
        </div>
      </div>
    </header>
  )
}
