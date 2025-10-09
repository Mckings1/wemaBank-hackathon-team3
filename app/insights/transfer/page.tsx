"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { AppHeader } from "@/components/app-header"
import { useAuth } from "@/lib/auth-context"
import { ArrowLeft, ArrowRight, Check, Shield } from "lucide-react"

export default function TransferFundsPage() {
  const { connectedBanks } = useAuth()
  const router = useRouter()
  const [formData, setFormData] = useState({
    fromBank: "",
    toBank: "",
    amount: "",
    note: "",
  })
  const [isSubmitted, setIsSubmitted] = useState(false)

  const fromBankData = connectedBanks.find((b) => b.id === formData.fromBank)
  const toBankData = connectedBanks.find((b) => b.id === formData.toBank)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("[v0] Transfer initiated:", formData)
    setIsSubmitted(true)
    setTimeout(() => {
      router.push("/dashboard")
    }, 2000)
  }

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-background">
        <AppHeader />
        <div className="container mx-auto px-4 py-12 max-w-2xl">
          <Card className="p-8 text-center">
            <div className="w-16 h-16 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Check className="w-8 h-8 text-success" />
            </div>
            <h2 className="text-2xl font-bold text-foreground mb-2">Transfer Successful!</h2>
            <p className="text-muted-foreground mb-6">
              ₦{Number.parseInt(formData.amount).toLocaleString()} has been transferred from {fromBankData?.name} to{" "}
              {toBankData?.name}.
            </p>
            <Button asChild>
              <Link href="/dashboard">View Dashboard</Link>
            </Button>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <AppHeader />

      <div className="container mx-auto px-4 py-12 max-w-2xl">
        <Button asChild variant="ghost" size="sm" className="mb-6">
          <Link href="/insights">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Insights
          </Link>
        </Button>

        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
              <ArrowRight className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-foreground">Transfer Funds</h1>
              <p className="text-muted-foreground">Move money between your connected accounts</p>
            </div>
          </div>
        </div>

        <Card className="p-6 mb-6 bg-success/5 border-success/20">
          <div className="flex items-start gap-3">
            <Shield className="w-5 h-5 text-success mt-0.5" />
            <div>
              <p className="text-sm font-medium text-foreground mb-1">Secure Transfer</p>
              <p className="text-sm text-muted-foreground">
                All transfers are encrypted and processed securely through your bank's infrastructure.
              </p>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="fromBank">From Account</Label>
              <Select
                value={formData.fromBank}
                onValueChange={(value) => setFormData({ ...formData, fromBank: value })}
                required
              >
                <SelectTrigger id="fromBank">
                  <SelectValue placeholder="Select source account" />
                </SelectTrigger>
                <SelectContent>
                  {connectedBanks.map((bank) => (
                    <SelectItem key={bank.id} value={bank.id}>
                      {bank.name} - ₦{bank.balance.toLocaleString()}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {fromBankData && (
              <Card className="p-4 bg-muted">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Available Balance</span>
                  <span className="text-lg font-semibold text-foreground">
                    ₦{fromBankData.balance.toLocaleString()}
                  </span>
                </div>
              </Card>
            )}

            <div className="flex justify-center">
              <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                <ArrowRight className="w-5 h-5 text-primary" />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="toBank">To Account</Label>
              <Select
                value={formData.toBank}
                onValueChange={(value) => setFormData({ ...formData, toBank: value })}
                required
              >
                <SelectTrigger id="toBank">
                  <SelectValue placeholder="Select destination account" />
                </SelectTrigger>
                <SelectContent>
                  {connectedBanks
                    .filter((bank) => bank.id !== formData.fromBank)
                    .map((bank) => (
                      <SelectItem key={bank.id} value={bank.id}>
                        {bank.name}
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="amount">Amount</Label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">₦</span>
                <Input
                  id="amount"
                  type="number"
                  placeholder="0"
                  value={formData.amount}
                  onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                  className="pl-8 text-2xl font-semibold"
                  required
                  max={fromBankData?.balance || 0}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="note">Note (Optional)</Label>
              <Input
                id="note"
                type="text"
                placeholder="What's this transfer for?"
                value={formData.note}
                onChange={(e) => setFormData({ ...formData, note: e.target.value })}
              />
            </div>

            <div className="pt-4 space-y-3">
              <Button
                type="submit"
                className="w-full"
                size="lg"
                disabled={!formData.fromBank || !formData.toBank || !formData.amount}
              >
                <ArrowRight className="w-4 h-4 mr-2" />
                Transfer ₦{formData.amount ? Number.parseInt(formData.amount).toLocaleString() : "0"}
              </Button>
              <Button asChild variant="outline" className="w-full bg-transparent" size="lg">
                <Link href="/insights">Cancel</Link>
              </Button>
            </div>
          </form>
        </Card>

        <Card className="p-6 mt-6">
          <h3 className="font-semibold text-foreground mb-4">Transfer Details</h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Processing Time</span>
              <span className="text-foreground font-medium">Instant</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Transfer Fee</span>
              <span className="text-foreground font-medium">₦0</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Daily Limit</span>
              <span className="text-foreground font-medium">₦5,000,000</span>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}
