"use client"

import { useState } from "react"
import { AppHeader } from "@/components/app-header"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Sparkles, CheckCircle2 } from "lucide-react"

export default function AutomateSavingsPage() {
  const [amount, setAmount] = useState("")
  const [frequency, setFrequency] = useState("monthly")
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
          <Sparkles className="w-8 h-8 text-accent" />
          <h1 className="text-3xl font-bold text-foreground">Automate Savings</h1>
        </div>

        <Card className="p-6">
          <p className="text-muted-foreground mb-4">
            Set up an automatic savings plan to grow your balance effortlessly.
          </p>

          <div className="space-y-4">
            <div>
              <label className="block text-sm mb-1">Amount to Save (₦)</label>
              <Input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="e.g. 10000"
              />
            </div>

            <div>
              <label className="block text-sm mb-1">Frequency</label>
              <select
                value={frequency}
                onChange={(e) => setFrequency(e.target.value)}
                className="w-full border rounded-md px-3 py-2 bg-transparent"
              >
                <option value="daily">Daily</option>
                <option value="weekly">Weekly</option>
                <option value="monthly">Monthly</option>
              </select>
            </div>

            <Button onClick={handleSubmit} className="w-full mt-4">
              Save Automation
            </Button>

            {success && (
              <div className="flex items-center gap-2 text-green-600 mt-4">
                <CheckCircle2 className="w-5 h-5" />
                <p>Automation saved successfully!</p>
              </div>
            )}
          </div>
        </Card>
      </div>
    </div>
  )
}
