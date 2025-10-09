"use client"

import type React from "react"
import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { Shield, Check, AlertCircle, Loader2 } from "lucide-react"

// Mock BVN database for demo
const mockBvnDatabase: Record<string, { name: string; dateOfBirth: string; email: string }> = {
  "12345678901": {
    name: "Alex Johnson",
    dateOfBirth: "1990-05-15",
    email: "alexjohnson@gmail.com",
  },
  "98765432109": {
    name: "Chioma Nwosu",
    dateOfBirth: "1988-11-22",
    email: "chioma.n@email.com",
  },
  "11122233344": {
    name: "Ibrahim Musa",
    dateOfBirth: "1995-03-08",
    email: "ibrahim.m@email.com",
  },
}

export default function RegisterPage() {
  const [bvn, setBvn] = useState("")
  const [isVerifying, setIsVerifying] = useState(false)
  const [verificationResult, setVerificationResult] = useState<{
    success: boolean
    data?: { name: string; dateOfBirth: string; email: string }
    error?: string
  } | null>(null)

  const router = useRouter()

  const handleVerifyBvn = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsVerifying(true)
    setVerificationResult(null)

    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 1500))

    const userData = mockBvnDatabase[bvn]

    if (userData) {
      setVerificationResult({ success: true, data: userData })
    } else {
      setVerificationResult({ success: false, error: "BVN not found. Please check and try again." })
    }

    setIsVerifying(false)
  }

  const handleProceedToFaceScan = () => {
    if (verificationResult?.data) {
      // Store BVN data in sessionStorage
      sessionStorage.setItem(
        "registration_data",
        JSON.stringify({
          bvn,
          ...verificationResult.data,
        }),
      )

      // Delay navigation slightly to ensure sessionStorage is committed
      setTimeout(() => {
        router.push("/register/face-scan")
      }, 100)
    }
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <header className="border-b border-border bg-white">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <Shield className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold text-foreground">TrustHub</span>
          </Link>
          <Button asChild variant="ghost" size="sm">
            <Link href="/signin">Sign In</Link>
          </Button>
        </div>
      </header>

      <div className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Shield className="w-8 h-8 text-primary" />
            </div>
            <h1 className="text-3xl font-bold text-foreground mb-2">Create Your Account</h1>
            <p className="text-muted-foreground">Verify your identity to get started with TrustHub</p>
          </div>

          <Card className="p-6 md:p-8">
            {!verificationResult?.success ? (
              <form onSubmit={handleVerifyBvn} className="space-y-6">
                <div>
                  <label htmlFor="bvn" className="block text-sm font-medium text-foreground mb-2">
                    Bank Verification Number (BVN)
                  </label>
                  <Input
                    id="bvn"
                    type="text"
                    placeholder="Enter your 11-digit BVN"
                    value={bvn}
                    onChange={(e) => setBvn(e.target.value.replace(/\D/g, "").slice(0, 11))}
                    className="text-lg"
                    required
                    disabled={isVerifying}
                  />
                  <p className="text-xs text-muted-foreground mt-2">
                    Your BVN is used to verify your identity securely
                  </p>
                </div>

                {verificationResult?.error && (
                  <div className="flex items-start gap-3 p-4 rounded-lg bg-destructive/10 border border-destructive/30">
                    <AlertCircle className="w-5 h-5 text-destructive mt-0.5 flex-shrink-0" />
                    <p className="text-sm text-destructive">{verificationResult.error}</p>
                  </div>
                )}

                <Button type="submit" className="w-full" size="lg" disabled={bvn.length !== 11 || isVerifying}>
                  {isVerifying ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Verifying BVN...
                    </>
                  ) : (
                    "Verify BVN"
                  )}
                </Button>

                {/* <div className="pt-4 border-t border-border">
                  <p className="text-xs text-muted-foreground text-center mb-3">Demo BVNs for testing:</p>
                  <div className="space-y-2 text-xs text-muted-foreground">
                    <p>• 12345678901 - Adebayo Okonkwo</p>
                    <p>• 98765432109 - Chioma Nwosu</p>
                    <p>• 11122233344 - Ibrahim Musa</p>
                  </div>
                </div> */}
              </form>
            ) : (
              <div className="space-y-6">
                <div className="flex items-center gap-3 p-4 rounded-lg bg-success/10 border border-success/30">
                  <Check className="w-5 h-5 text-success flex-shrink-0" />
                  <p className="text-sm text-success font-medium">BVN verified successfully!</p>
                </div>

                <div className="space-y-4">
                  <h3 className="font-semibold text-foreground">Your Details</h3>
                  <div className="space-y-3">
                    <div>
                      <p className="text-xs text-muted-foreground">Full Name</p>
                      <p className="text-sm font-medium text-foreground">{verificationResult.data?.name}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Date of Birth</p>
                      <p className="text-sm font-medium text-foreground">
                        {new Date(verificationResult.data?.dateOfBirth || "").toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Email</p>
                      <p className="text-sm font-medium text-foreground">{verificationResult.data?.email}</p>
                    </div>
                  </div>
                </div>

                <Button onClick={handleProceedToFaceScan} className="w-full" size="lg">
                  Proceed to Face Scan
                </Button>
              </div>
            )}
          </Card>

          <p className="text-center text-sm text-muted-foreground mt-6">
            Already have an account?{" "}
            <Link href="/signin" className="text-primary hover:underline">
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
