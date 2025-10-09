"use client"

import { useState } from "react"
import { AppHeader } from "@/components/app-header"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ArrowRight, CheckCircle2 } from "lucide-react"

export default function TransferFundsPage() {
  const [recipient, setRecipient] = useState("")
  const [amount, setAmount] = useState("")
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
          <ArrowRight className="w-8 h-8 text-primary" />
          <h1 className="text-3xl font-bold text-foreground">Transfer Funds</h1>
        </div>

        <Card className="p-6">
          <p className="text-muted-foreground mb-4">
            Send money instantly to any account within your network.
          </p>

          <div className="space-y-4">
            <div>
              <label className="block text-sm mb-1">Recipient Account</label>
              <Input
                type="text"
                value={recipient}
                onChange={(e) => setRecipient(e.target.value)}
                placeholder="Enter account number"
              />
            </div>

            <div>
              <label className="block text-sm mb-1">Amount (₦)</label>
              <Input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="e.g. 2500"
              />
            </div>

            <Button onClick={handleSubmit} className="w-full mt-4">
              Transfer Now
            </Button>

            {success && (
              <div className="flex items-center gap-2 text-green-600 mt-4">
                <CheckCircle2 className="w-5 h-5" />
                <p>Transfer successful!</p>
              </div>
            )}
          </div>
        </Card>
      </div>
    </div>
  )
}
