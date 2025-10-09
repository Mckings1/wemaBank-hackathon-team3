"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { AppHeader } from "@/components/app-header"
import { ArrowLeft, Sparkles, Check, AlertCircle } from "lucide-react"

const categories = [
  { id: "food", name: "Food & Dining", icon: "🍽️", suggested: 85000 },
  { id: "transport", name: "Transportation", icon: "🚗", suggested: 45000 },
  { id: "shopping", name: "Shopping", icon: "🛍️", suggested: 60000 },
  { id: "bills", name: "Bills & Utilities", icon: "💡", suggested: 35000 },
  { id: "entertainment", name: "Entertainment", icon: "🎬", suggested: 25000 },
  { id: "health", name: "Healthcare", icon: "⚕️", suggested: 20000 },
]

export default function SetBudgetPage() {
  const router = useRouter()
  const [budgets, setBudgets] = useState<Record<string, string>>(
    categories.reduce((acc, cat) => ({ ...acc, [cat.id]: cat.suggested.toString() }), {}),
  )
  const [isSubmitted, setIsSubmitted] = useState(false)

  const totalBudget = Object.values(budgets).reduce((sum, val) => sum + (Number.parseInt(val) || 0), 0)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("[v0] Budget set:", budgets)
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
            <h2 className="text-2xl font-bold text-foreground mb-2">Budget Set Successfully!</h2>
            <p className="text-muted-foreground mb-6">
              Your monthly budget of ₦{totalBudget.toLocaleString()} has been saved. We'll notify you when you're
              approaching your limits.
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

      <div className="container mx-auto px-4 py-12 max-w-3xl">
        <Button asChild variant="ghost" size="sm" className="mb-6">
          <Link href="/insights">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Insights
          </Link>
        </Button>

        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-foreground">Set Your Budget</h1>
              <p className="text-muted-foreground">Control your spending with category-based budgets</p>
            </div>
          </div>
        </div>

        <Card className="p-6 mb-6 bg-accent/5 border-accent/20">
          <div className="flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-accent mt-0.5" />
            <div>
              <p className="text-sm font-medium text-foreground mb-1">AI Recommendation</p>
              <p className="text-sm text-muted-foreground">
                Based on your spending history, we've pre-filled suggested budgets for each category. Adjust them to
                match your goals.
              </p>
            </div>
          </div>
        </Card>

        <Card className="p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-foreground">Total Monthly Budget</h3>
            <p className="text-3xl font-bold text-primary">₦{totalBudget.toLocaleString()}</p>
          </div>
        </Card>

        <form onSubmit={handleSubmit} className="space-y-4">
          {categories.map((category) => (
            <Card key={category.id} className="p-6">
              <div className="flex items-center gap-4 mb-4">
                <div className="text-3xl">{category.icon}</div>
                <div className="flex-1">
                  <Label htmlFor={category.id} className="text-base font-semibold">
                    {category.name}
                  </Label>
                  <p className="text-sm text-muted-foreground">Suggested: ₦{category.suggested.toLocaleString()}</p>
                </div>
              </div>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">₦</span>
                <Input
                  id={category.id}
                  type="number"
                  value={budgets[category.id]}
                  onChange={(e) => setBudgets({ ...budgets, [category.id]: e.target.value })}
                  className="pl-8"
                  required
                />
              </div>
            </Card>
          ))}

          <div className="pt-4 space-y-3">
            <Button type="submit" className="w-full" size="lg">
              <Check className="w-4 h-4 mr-2" />
              Save Budget
            </Button>
            <Button asChild variant="outline" className="w-full bg-transparent" size="lg">
              <Link href="/insights">Cancel</Link>
            </Button>
          </div>
        </form>

        <Card className="p-6 mt-6">
          <h3 className="font-semibold text-foreground mb-4">Budget Tracking Features</h3>
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <Check className="w-5 h-5 text-success mt-0.5" />
              <p className="text-sm text-muted-foreground">Real-time spending alerts when you approach limits</p>
            </div>
            <div className="flex items-start gap-3">
              <Check className="w-5 h-5 text-success mt-0.5" />
              <p className="text-sm text-muted-foreground">Weekly budget reports delivered to your dashboard</p>
            </div>
            <div className="flex items-start gap-3">
              <Check className="w-5 h-5 text-success mt-0.5" />
              <p className="text-sm text-muted-foreground">AI-powered recommendations to optimize your budget</p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}
