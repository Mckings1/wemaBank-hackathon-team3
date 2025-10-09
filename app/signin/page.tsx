"use client"

<<<<<<< HEAD
import { useState, useRef, useEffect } from "react"
=======
import type React from "react"

import { useState } from "react"
>>>>>>> 51bdc2dd82ed7f1fdc968067f48a7141ac539d54
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
<<<<<<< HEAD
import { Shield, Lock, Check, Camera, Loader2, KeyRound, X } from "lucide-react"
import { useAuth } from "@/lib/auth-context"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function SignInPage() {
  const [customerId, setCustomerId] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isFaceScanning, setIsFaceScanning] = useState(false)
  const [cameraReady, setCameraReady] = useState(false)
  const [capturedImage, setCapturedImage] = useState<string | null>(null)
  const [cameraError, setCameraError] = useState<string | null>(null)

  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const { signIn } = useAuth()

  useEffect(() => {
    // Stop the camera if user leaves or tab changes
    return () => stopCamera()
  }, [])

  const startCamera = async () => {
    try {
      setCameraError(null)
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "user", width: 640, height: 480 },
      })
      if (videoRef.current) {
        videoRef.current.srcObject = stream
        await videoRef.current.play()
        setCameraReady(true)
      }
    } catch (error) {
      console.error("Camera access error:", error)
      setCameraError("Unable to access camera. Please allow access and refresh.")
      setCameraReady(false)
    }
  }

  const stopCamera = () => {
    const stream = videoRef.current?.srcObject as MediaStream
    if (stream) {
      stream.getTracks().forEach((track) => track.stop())
      videoRef.current!.srcObject = null
    }
    setCameraReady(false)
    setCapturedImage(null)
  }

  const capturePhoto = () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current
      const canvas = canvasRef.current
      canvas.width = video.videoWidth
      canvas.height = video.videoHeight
      const ctx = canvas.getContext("2d")
      if (ctx) {
        ctx.drawImage(video, 0, 0)
        const imageData = canvas.toDataURL("image/jpeg")
        setCapturedImage(imageData)
        return imageData
      }
    }
    return null
  }

  const handleFaceScan = async () => {
    if (!cameraReady) {
      await startCamera()
      return
    }

    setIsFaceScanning(true)
    const imageData = capturePhoto()

    if (!imageData) {
      setCameraError("Failed to capture image. Please try again.")
      setIsFaceScanning(false)
      return
    }

    // Simulate server-side verification delay
    await new Promise((resolve) => setTimeout(resolve, 2000))

    stopCamera()

    // Mocked verification – replace this with backend face-match later
    const savedUser = localStorage.getItem("trusthub_user")
    if (savedUser) {
      const user = JSON.parse(savedUser)
      const identifier = user.customerId || user.bvn || user.nin
      if (identifier) {
        signIn(identifier)
      } else {
        setCameraError("No valid credentials found. Please register first.")
      }
    } else {
      setCameraError("No user found. Please register first.")
    }

    setIsFaceScanning(false)
  }

  const handleCustomerIdSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (customerId.startsWith("TH-") && customerId.length >= 10) {
      setIsLoading(true)
      setTimeout(() => {
        signIn(customerId)
        setIsLoading(false)
      }, 1000)
=======
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
>>>>>>> 51bdc2dd82ed7f1fdc968067f48a7141ac539d54
    }
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
<<<<<<< HEAD
=======
      {/* Header */}
>>>>>>> 51bdc2dd82ed7f1fdc968067f48a7141ac539d54
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

<<<<<<< HEAD
=======
      {/* Main Content */}
>>>>>>> 51bdc2dd82ed7f1fdc968067f48a7141ac539d54
      <div className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Lock className="w-8 h-8 text-primary" />
            </div>
<<<<<<< HEAD
            <h1 className="text-3xl font-bold text-foreground mb-2">Welcome Back</h1>
            <p className="text-muted-foreground">Sign in to access your financial hub</p>
          </div>

          <Card className="p-6 md:p-8">
            <Tabs defaultValue="customerid" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-6">
                <TabsTrigger value="customerid" className="text-sm">
                  <KeyRound className="w-4 h-4 mr-2" /> Customer ID
                </TabsTrigger>
                <TabsTrigger value="facescan" className="text-sm">
                  <Camera className="w-4 h-4 mr-2" /> Face Scan
                </TabsTrigger>
              </TabsList>

              {/* --- Customer ID Sign-In --- */}
              <TabsContent value="customerid">
                <form onSubmit={handleCustomerIdSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="customerId" className="block text-sm font-medium text-foreground mb-2">
                      Customer ID
                    </label>
                    <Input
                      id="customerId"
                      type="text"
                      placeholder="TH-XXXX-XXXX"
                      value={customerId}
                      onChange={(e) => setCustomerId(e.target.value.toUpperCase())}
                      className="text-lg font-mono"
                      required
                    />
                    <p className="text-xs text-muted-foreground mt-2">
                      Enter the Customer ID you received during registration
                    </p>
                  </div>

                  <Button
                    type="submit"
                    className="w-full"
                    size="lg"
                    disabled={!customerId.startsWith("TH-") || customerId.length < 10 || isLoading}
                  >
                    {isLoading ? "Signing in..." : "Sign In"}
                  </Button>
                </form>
              </TabsContent>

              {/* --- Face Scan Sign-In --- */}
              <TabsContent value="facescan">
                <div className="space-y-6">
                  <div className="aspect-square bg-muted rounded-lg flex items-center justify-center relative overflow-hidden">
                    <video ref={videoRef} autoPlay playsInline muted className="w-full h-full object-cover" />
                    {!cameraReady && !capturedImage && (
                      <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center text-white">
                        <Camera className="w-12 h-12 mb-2 opacity-70" />
                        <p className="text-sm">Camera not active</p>
                      </div>
                    )}
                    {isFaceScanning && (
                      <div className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center">
                        <Loader2 className="w-12 h-12 animate-spin text-white mb-2" />
                        <p className="text-white text-sm">Verifying your face...</p>
                      </div>
                    )}
                    <canvas ref={canvasRef} className="hidden" />
                  </div>

                  {cameraError && (
                    <div className="p-3 bg-destructive/10 border border-destructive/30 rounded-lg">
                      <p className="text-sm text-destructive">{cameraError}</p>
                    </div>
                  )}

                  <div className="flex gap-2">
                    {cameraReady ? (
                      <Button onClick={stopCamera} variant="outline" size="lg" className="flex-1 bg-transparent">
                        <X className="w-4 h-4 mr-2" /> Stop Camera
                      </Button>
                    ) : (
                      <Button onClick={startCamera} variant="outline" size="lg" className="flex-1 bg-transparent">
                        <Camera className="w-4 h-4 mr-2" /> Start Camera
                      </Button>
                    )}
                    <Button
                      onClick={handleFaceScan}
                      className="flex-1"
                      size="lg"
                      disabled={isFaceScanning}
                    >
                      {isFaceScanning ? "Verifying..." : "Capture & Sign In"}
                    </Button>
                  </div>

                  <p className="text-xs text-muted-foreground text-center">
                    Make sure your face is clearly visible and well-lit
                  </p>
                </div>
              </TabsContent>
            </Tabs>

            <div className="mt-6 pt-6 border-t border-border">
              <p className="text-sm text-muted-foreground text-center mb-4">Secure sign-in methods:</p>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-success mt-0.5 flex-shrink-0" />
                  <p className="text-sm text-muted-foreground">Biometric authentication for enhanced security</p>
                </div>
                <div className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-success mt-0.5 flex-shrink-0" />
                  <p className="text-sm text-muted-foreground">Your data is encrypted end-to-end</p>
=======
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
>>>>>>> 51bdc2dd82ed7f1fdc968067f48a7141ac539d54
                </div>
              </div>
            </div>
          </Card>

          <p className="text-center text-sm text-muted-foreground mt-6">
            Don't have an account?{" "}
<<<<<<< HEAD
            <Link href="/register" className="text-primary hover:underline">
              Register now
=======
            <Link href="/" className="text-primary hover:underline">
              Learn more about TrustHub
>>>>>>> 51bdc2dd82ed7f1fdc968067f48a7141ac539d54
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
