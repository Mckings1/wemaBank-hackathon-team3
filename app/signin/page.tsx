"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { Shield, Lock, Check, Camera, Loader2, KeyRound, X } from "lucide-react"
import { useAuth } from "@/lib/auth-context"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function SignInPage() {
  const [customerId, setCustomerId] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isFaceScanning, setIsFaceScanning] = useState(false)
  const [stream, setStream] = useState<MediaStream | null>(null)
  const [capturedImage, setCapturedImage] = useState<string | null>(null)
  const [cameraError, setCameraError] = useState<string | null>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const { signIn } = useAuth()

  useEffect(() => {
    return () => {
      if (stream) {
        stream.getTracks().forEach((track) => track.stop())
      }
    }
  }, [stream])

  const handleCustomerIdSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (customerId.startsWith("TH-") && customerId.length >= 10) {
      setIsLoading(true)
      setTimeout(() => {
        signIn(customerId)
        setIsLoading(false)
      }, 1000)
    }
  }

  const startCamera = async () => {
    try {
      setCameraError(null)
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "user", width: 640, height: 480 },
      })
      setStream(mediaStream)
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream
      }
    } catch (error) {
      console.error("[v0] Camera access error:", error)
      setCameraError("Unable to access camera. Please check permissions.")
    }
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

  const handleStopCamera = () => {
    if (stream) {
      stream.getTracks().forEach((track) => track.stop())
      setStream(null)
    }
    setCapturedImage(null)
  }

  const handleFaceScan = async () => {
    if (!stream) {
      await startCamera()
      return
    }

    setIsFaceScanning(true)

    // Capture the photo
    const imageData = capturePhoto()

    if (!imageData) {
      setCameraError("Failed to capture image. Please try again.")
      setIsFaceScanning(false)
      return
    }

    // Simulate face verification
    await new Promise((resolve) => setTimeout(resolve, 2000))

    // Stop camera stream
    if (stream) {
      stream.getTracks().forEach((track) => track.stop())
      setStream(null)
    }

    // Mock face match - in real app, this would verify against stored face data
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
            <h1 className="text-3xl font-bold text-foreground mb-2">Welcome Back</h1>
            <p className="text-muted-foreground">Sign in to access your financial hub</p>
          </div>

          <Card className="p-6 md:p-8">
            <Tabs defaultValue="customerid" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-6">
                <TabsTrigger value="customerid" className="text-sm">
                  <KeyRound className="w-4 h-4 mr-2" />
                  Customer ID
                </TabsTrigger>
                <TabsTrigger value="facescan" className="text-sm">
                  <Camera className="w-4 h-4 mr-2" />
                  Face Scan
                </TabsTrigger>
              </TabsList>

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

              <TabsContent value="facescan">
                <div className="space-y-6">
                  <div className="aspect-square bg-muted rounded-lg flex items-center justify-center relative overflow-hidden">
                    {stream && !capturedImage ? (
                      <>
                        <video ref={videoRef} autoPlay playsInline muted className="w-full h-full object-cover" />
                        {isFaceScanning && (
                          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                            <div className="text-center text-white">
                              <Loader2 className="w-12 h-12 animate-spin mx-auto mb-4" />
                              <p className="text-sm">Verifying your face...</p>
                            </div>
                          </div>
                        )}
                      </>
                    ) : capturedImage ? (
                      <img
                        src={capturedImage || "/placeholder.svg"}
                        alt="Captured face"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="text-center p-6">
                        <Camera className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                        <p className="text-sm text-muted-foreground">Click below to start camera</p>
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
                    {stream && (
                      <Button onClick={handleStopCamera} variant="outline" size="lg" className="flex-1 bg-transparent">
                        <X className="w-4 h-4 mr-2" />
                        Stop Camera
                      </Button>
                    )}
                    <Button onClick={handleFaceScan} className="flex-1" size="lg" disabled={isFaceScanning}>
                      {isFaceScanning ? "Verifying..." : stream ? "Capture & Sign In" : "Start Camera"}
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
                </div>
              </div>
            </div>
          </Card>

          <p className="text-center text-sm text-muted-foreground mt-6">
            Don't have an account?{" "}
            <Link href="/register" className="text-primary hover:underline">
              Register now
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
