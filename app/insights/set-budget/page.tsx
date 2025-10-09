"use client"

import { useState } from "react"
import { AppHeader } from "@/components/app-header"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { BarChart3, CheckCircle2 } from "lucide-react"

export default function SetBudgetPage() {
  const [budget, setBudget] = useState("")
  const [category, setCategory] = useState("food")
  const [success, setSuccess] = useState(false)

  const handleSubmit = () => {
    setSuccess(true)
    setTimeout(() => setSuccess(false), 3000)
  }

  return (
    <div className="min-h-screen bg-background">
      <AppHeader />
      <div className="container mx-auto px-4 py-12 max-w-2xl">
        <div className="flex items-center gap-3 mb-6">
          <BarChart3 className="w-8 h-8 text-primary" />
          <h1 className="text-3xl font-bold text-foreground">Set a Budget</h1>
        </div>

        <Card className="p-6">
          <p className="text-muted-foreground mb-4">
            Control your spending by assigning budgets to categories.
          </p>

          <div className="space-y-4">
            <div>
              <label className="block text-sm mb-1">Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full border rounded-md px-3 py-2 bg-transparent"
              >
                <option value="food">Food & Dining</option>
                <option value="shopping">Shopping</option>
                <option value="bills">Bills & Utilities</option>
                <option value="transport">Transport</option>
              </select>
            </div>

            <div>
              <label className="block text-sm mb-1">Budget Limit (₦)</label>
              <Input
                type="number"
                value={budget}
                onChange={(e) => setBudget(e.target.value)}
                placeholder="e.g. 50000"
              />
            </div>

            <Button onClick={handleSubmit} className="w-full mt-4">
              Save Budget
            </Button>

            {success && (
              <div className="flex items-center gap-2 text-green-600 mt-4">
                <CheckCircle2 className="w-5 h-5" />
                <p>Budget saved successfully!</p>
              </div>
            )}
          </div>
        </Card>
      </div>
    </div>
  )
}
