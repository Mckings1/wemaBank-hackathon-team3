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
import { ArrowLeft, TrendingUp, Calendar, Check } from "lucide-react"

export default function AutomateSavingsPage() {
  const { connectedBanks } = useAuth()
  const router = useRouter()
  const [formData, setFormData] = useState({
    sourceBank: "",
    destinationBank: "",
    amount: "",
    frequency: "monthly",
    startDate: "",
  })
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("[v0] Automated savings setup:", formData)
    setIsSubmitted(true)
    setTimeout(() => {
      router.push("/insights")
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
            <h2 className="text-2xl font-bold text-foreground mb-2">Savings Automated!</h2>
            <p className="text-muted-foreground mb-6">
              Your automatic savings plan has been set up successfully. Transfers will begin on {formData.startDate}.
            </p>
            <Button asChild>
              <Link href="/insights">Back to Insights</Link>
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
            <div className="w-12 h-12 bg-success/10 rounded-xl flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-success" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-foreground">Automate Savings</h1>
              <p className="text-muted-foreground">Set up automatic transfers to reach your goals faster</p>
            </div>
          </div>
        </div>

        <Card className="p-6 mb-6 bg-accent/5 border-accent/20">
          <div className="flex items-start gap-3">
            <TrendingUp className="w-5 h-5 text-accent mt-0.5" />
            <div>
              <p className="text-sm font-medium text-foreground mb-1">Smart Recommendation</p>
              <p className="text-sm text-muted-foreground">
                Based on your income pattern, we recommend saving ₦10,000 monthly. This will help you build an emergency
                fund of ₦120,000 in one year.
              </p>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="sourceBank">From Account</Label>
              <Select
                value={formData.sourceBank}
                onValueChange={(value) => setFormData({ ...formData, sourceBank: value })}
                required
              >
                <SelectTrigger id="sourceBank">
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

            <div className="space-y-2">
              <Label htmlFor="destinationBank">To Savings Account</Label>
              <Select
                value={formData.destinationBank}
                onValueChange={(value) => setFormData({ ...formData, destinationBank: value })}
                required
              >
                <SelectTrigger id="destinationBank">
                  <SelectValue placeholder="Select savings account" />
                </SelectTrigger>
                <SelectContent>
                  {connectedBanks.map((bank) => (
                    <SelectItem key={bank.id} value={bank.id}>
                      {bank.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="amount">Amount to Save</Label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">₦</span>
                <Input
                  id="amount"
                  type="number"
                  placeholder="10,000"
                  value={formData.amount}
                  onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                  className="pl-8"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="frequency">Frequency</Label>
              <Select
                value={formData.frequency}
                onValueChange={(value) => setFormData({ ...formData, frequency: value })}
              >
                <SelectTrigger id="frequency">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="daily">Daily</SelectItem>
                  <SelectItem value="weekly">Weekly</SelectItem>
                  <SelectItem value="monthly">Monthly</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="startDate">Start Date</Label>
              <Input
                id="startDate"
                type="date"
                value={formData.startDate}
                onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                required
              />
            </div>

            <div className="pt-4 space-y-3">
              <Button type="submit" className="w-full" size="lg">
                <Calendar className="w-4 h-4 mr-2" />
                Set Up Automatic Savings
              </Button>
              <Button asChild variant="outline" className="w-full bg-transparent" size="lg">
                <Link href="/insights">Cancel</Link>
              </Button>
            </div>
          </form>
        </Card>

        <Card className="p-6 mt-6">
          <h3 className="font-semibold text-foreground mb-4">How It Works</h3>
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-xs font-bold text-primary">1</span>
              </div>
              <p className="text-sm text-muted-foreground">Choose your source account and savings destination</p>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-xs font-bold text-primary">2</span>
              </div>
              <p className="text-sm text-muted-foreground">Set the amount and frequency that works for your budget</p>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-xs font-bold text-primary">3</span>
              </div>
              <p className="text-sm text-muted-foreground">Sit back and watch your savings grow automatically</p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}
