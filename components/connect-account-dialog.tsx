"use client"

import type React from "react"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Shield, Loader2 } from "lucide-react"

interface ConnectAccountDialogProps {
  bank: {
    id: string
    name: string
    logo: string
  }
  onClose: () => void
  onConnect: (bankId: string) => void
}

export function ConnectAccountDialog({ bank, onClose, onConnect }: ConnectAccountDialogProps) {
  const [loading, setLoading] = useState(false)
  const [step, setStep] = useState<"consent" | "auth">("consent")

  const handleConsent = () => {
    setStep("auth")
  }

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    // Simulate OAuth flow
    await new Promise((resolve) => setTimeout(resolve, 2000))

    onConnect(bank.id)
    setLoading(false)
  }

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        {step === "consent" ? (
          <>
            <DialogHeader>
              <div className="flex items-center gap-3 mb-2">
                <span className="text-3xl">{bank.logo}</span>
                <DialogTitle>Connect to {bank.name}</DialogTitle>
              </div>
              <DialogDescription>TrustHub will securely access your account information</DialogDescription>
            </DialogHeader>

            <div className="space-y-4 py-4">
              <div className="bg-muted rounded-lg p-4 space-y-3">
                <p className="text-sm font-medium text-foreground">TrustHub will be able to:</p>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <span className="text-success mt-0.5">✓</span>
                    <span>View your account balance and transaction history</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-success mt-0.5">✓</span>
                    <span>Analyze spending patterns for insights</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-success mt-0.5">✓</span>
                    <span>Calculate your financial trust score</span>
                  </li>
                </ul>
              </div>

              <div className="flex items-start gap-2 text-sm text-muted-foreground">
                <Shield className="w-4 h-4 text-primary mt-0.5" />
                <p>Your data is encrypted and secure. You can revoke access anytime from your Privacy Vault.</p>
              </div>
            </div>

            <div className="flex gap-3">
              <Button variant="outline" onClick={onClose} className="flex-1 bg-transparent">
                Cancel
              </Button>
              <Button onClick={handleConsent} className="flex-1">
                Continue
              </Button>
            </div>
          </>
        ) : (
          <>
            <DialogHeader>
              <div className="flex items-center gap-3 mb-2">
                <span className="text-3xl">{bank.logo}</span>
                <DialogTitle>Sign in to {bank.name}</DialogTitle>
              </div>
              <DialogDescription>Enter your credentials to authorize the connection</DialogDescription>
            </DialogHeader>

            <form onSubmit={handleAuth} className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="username">Username or Email</Label>
                <Input id="username" placeholder="Enter your username" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input id="password" type="password" placeholder="Enter your password" required />
              </div>

              <div className="flex gap-3 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={onClose}
                  className="flex-1 bg-transparent"
                  disabled={loading}
                >
                  Cancel
                </Button>
                <Button type="submit" className="flex-1" disabled={loading}>
                  {loading ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Connecting...
                    </>
                  ) : (
                    "Authorize"
                  )}
                </Button>
              </div>
            </form>
          </>
        )}
      </DialogContent>
    </Dialog>
  )
}
