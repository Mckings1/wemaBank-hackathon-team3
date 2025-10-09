"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Shield, Camera, Check, Loader2, Copy, CheckCheck } from "lucide-react"
import { useAuth } from "@/lib/auth-context"

export default function FaceScanPage() {
  const [registrationData, setRegistrationData] = useState<any>(null)
  const [isScanning, setIsScanning] = useState(false)
  const [scanComplete, setScanComplete] = useState(false)
  const [customerId, setCustomerId] = useState("")
  const [copied, setCopied] = useState(false)
  const router = useRouter()
  const { registerUser } = useAuth()

  useEffect(() => {
    // Load registration data from sessionStorage
    const data = sessionStorage.getItem("registration_data")
    if (data) {
      setRegistrationData(JSON.parse(data))
    } else {
      // Redirect if no data
      setTimeout(() => router.push("/register"), 100)
    }
  }, [router])

  const generateCustomerId = () => {
    const part1 = Math.floor(1000 + Math.random() * 9000)
    const part2 = Math.floor(1000 + Math.random() * 9000)
    return `TH-${part1}-${part2}`
  }

  const handleStartScan = async () => {
    setIsScanning(true)
    await new Promise((resolve) => setTimeout(resolve, 3000))

    const newCustomerId = generateCustomerId()
    setCustomerId(newCustomerId)

    const faceScanHash = `hash_${Date.now()}_${Math.random().toString(36).substring(7)}`
    const userData = {
      id: newCustomerId,
      name: registrationData.name,
      bvn: registrationData.bvn,
      customerId: newCustomerId,
      faceScanHash,
      dateOfBirth: registrationData.dateOfBirth,
      email: registrationData.email,
    }

    try {
      registerUser?.(userData)
      setScanComplete(true)
    } catch (err) {
      console.error("Registration failed:", err)
      alert("Something went wrong. Please try again.")
    } finally {
      setIsScanning(false)
      sessionStorage.removeItem("registration_data")
    }
  }

  const handleCopyCustomerId = () => {
    navigator.clipboard?.writeText(customerId)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleContinue = () => {
    router.push("/connect")
  }

  if (!registrationData) return null

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
        </div>
      </header>

      <div className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Camera className="w-8 h-8 text-primary" />
            </div>
            <h1 className="text-3xl font-bold text-foreground mb-2">Face Verification</h1>
            <p className="text-muted-foreground">Complete your registration with a quick face scan</p>
          </div>

          <Card className="p-6 md:p-8">
            {!scanComplete ? (
              <div className="space-y-6">
                <div className="aspect-square bg-muted rounded-lg flex items-center justify-center relative overflow-hidden">
                  {isScanning ? (
                    <div className="text-center">
                      <Loader2 className="w-12 h-12 text-primary animate-spin mx-auto mb-4" />
                      <p className="text-sm text-muted-foreground">Scanning your face...</p>
                      <p className="text-xs text-muted-foreground mt-2">Please hold still</p>
                    </div>
                  ) : (
                    <div className="text-center p-6">
                      <Camera className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                      <p className="text-sm text-muted-foreground">Camera preview will appear here</p>
                    </div>
                  )}
                </div>

                <div className="space-y-3">
                  <h3 className="font-semibold text-foreground text-sm">Before you start:</h3>
                  <div className="space-y-2">
                    <div className="flex items-start gap-3">
                      <Check className="w-4 h-4 text-success mt-0.5 flex-shrink-0" />
                      <p className="text-sm text-muted-foreground">Ensure good lighting</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <Check className="w-4 h-4 text-success mt-0.5 flex-shrink-0" />
                      <p className="text-sm text-muted-foreground">Remove glasses or face coverings</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <Check className="w-4 h-4 text-success mt-0.5 flex-shrink-0" />
                      <p className="text-sm text-muted-foreground">Look directly at the camera</p>
                    </div>
                  </div>
                </div>

                <Button onClick={handleStartScan} className="w-full" size="lg" disabled={isScanning}>
                  {isScanning ? "Scanning..." : "Start Face Scan"}
                </Button>
              </div>
            ) : (
              <div className="space-y-6">
                <div className="flex items-center gap-3 p-4 rounded-lg bg-success/10 border border-success/30">
                  <Check className="w-5 h-5 text-success flex-shrink-0" />
                  <p className="text-sm text-success font-medium">Face scan completed successfully!</p>
                </div>

                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold text-foreground mb-2">Your Customer ID</h3>
                    <p className="text-sm text-muted-foreground mb-3">
                      Save this ID — you'll need it to sign in to your account
                    </p>
                    <div className="flex items-center gap-2">
                      <div className="flex-1 p-3 bg-muted rounded-lg">
                        <p className="text-lg font-mono font-bold text-foreground text-center">{customerId}</p>
                      </div>
                      <Button onClick={handleCopyCustomerId} variant="outline" size="icon">
                        {copied ? <CheckCheck className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                      </Button>
                    </div>
                  </div>

                  <div className="p-4 bg-primary/5 rounded-lg border border-primary/20">
                    <p className="text-xs text-muted-foreground">
                      <strong className="text-foreground">Important:</strong> Your Customer ID is unique to you. You can
                      use it along with your face scan to sign in to TrustHub.
                    </p>
                  </div>
                </div>

                <Button onClick={handleContinue} className="w-full" size="lg">
                  Continue to Dashboard
                </Button>
              </div>
            )}
          </Card>
        </div>
      </div>
    </div>
  )
}
