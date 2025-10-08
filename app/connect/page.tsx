"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Shield, Check, ArrowLeft, Plus } from "lucide-react"
import { ConnectAccountDialog } from "@/components/connect-account-dialog"
import { useAuth } from "@/lib/auth-context"

const availableBanks = [
  { id: "wema", name: "Wema Bank", logo: "/logos/wema.png", balance: 1250000 },
  { id: "kuda", name: "Kuda Bank", logo: "/logos/kuda.png", balance: 850000 },
  { id: "opay", name: "OPay", logo: "/logos/opay.png", balance: 450000 },
  { id: "piggyvest", name: "Piggyvest", logo: "/logos/piggy.png", balance: 297500 },
  { id: "alat", name: "ALAT by Wema", logo: "/logos/alat.png", balance: 0 },
  { id: "gtbank", name: "GTBank", logo: "/logos/gtbank.png", balance: 0 },
]

export default function ConnectPage() {
  const { connectedBanks, connectBank, disconnectBank } = useAuth()
  const [selectedBank, setSelectedBank] = useState<(typeof availableBanks)[0] | null>(null)

  const handleConnect = (bankId: string) => {
    const bank = availableBanks.find((b) => b.id === bankId)
    if (bank) setSelectedBank(bank)
  }

  const handleConnectionComplete = (bankId: string) => {
    const bank = availableBanks.find((b) => b.id === bankId)
    if (bank) {
      connectBank({
        id: bank.id,
        name: bank.name,
        logo: bank.logo,
        balance: bank.balance,
        lastTransaction: "Today",
      })
    }
    setSelectedBank(null)
  }

  const handleRevoke = (bankId: string) => {
    disconnectBank(bankId)
  }

  const isConnected = (bankId: string) =>
    connectedBanks.some((b) => b.id === bankId)

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <Shield className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold text-foreground">TrustHub</span>
          </Link>
          <Button asChild variant="ghost" size="sm">
            <Link href="/">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
        </div>
      </header>

      {/* Main Section */}
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Connect Your Accounts
          </h1>
          <p className="text-lg text-muted-foreground">
            Securely link your banks and financial apps to get started
          </p>
          {connectedBanks.length > 0 && (
            <p className="text-sm text-success mt-2">
              <Check className="w-4 h-4 inline mr-1" />
              {connectedBanks.length} account
              {connectedBanks.length > 1 ? "s" : ""} connected
            </p>
          )}
        </div>

        {/* Security Notice */}
        <Card className="p-4 mb-8 bg-success/5 border-success/20">
          <div className="flex items-start gap-3">
            <Shield className="w-5 h-5 text-success mt-0.5" />
            <div>
              <p className="text-sm font-medium text-foreground">
                Bank-grade encryption
              </p>
              <p className="text-sm text-muted-foreground">
                Your credentials are never stored. You stay in control and can
                revoke access anytime.
              </p>
            </div>
          </div>
        </Card>

        {/* Banks Grid */}
        <div className="grid md:grid-cols-2 gap-4 mb-8">
          {availableBanks.map((bank) => {
            const connected = isConnected(bank.id)
            return (
              <Card key={bank.id} className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <Image
                      src={bank.logo}
                      alt={bank.name}
                      width={48}
                      height={48}
                      className="rounded-md"
                    />
                    <div>
                      <h3 className="font-semibold text-card-foreground">
                        {bank.name}
                      </h3>
                      {connected && (
                        <div className="flex items-center gap-1 text-success text-sm mt-1">
                          <Check className="w-4 h-4" />
                          <span>Connected</span>
                        </div>
                      )}
                    </div>
                  </div>
                  {connected ? (
                    <Button
                      onClick={() => handleRevoke(bank.id)}
                      variant="outline"
                      size="sm"
                      className="text-destructive"
                    >
                      Revoke
                    </Button>
                  ) : (
                    <Button
                      onClick={() => handleConnect(bank.id)}
                      variant="default"
                      size="sm"
                    >
                      Connect
                    </Button>
                  )}
                </div>
              </Card>
            )
          })}

          {/* Add another bank card */}
          <Card className="p-6 border-dashed">
            <div className="flex flex-col items-center justify-center gap-3 py-4">
              <div className="w-12 h-12 bg-muted rounded-full flex items-center justify-center">
                <Plus className="w-6 h-6 text-muted-foreground" />
              </div>
              <p className="text-sm font-medium text-muted-foreground">
                Add Another Bank
              </p>
              <p className="text-xs text-muted-foreground text-center">
                50+ more banks available
              </p>
            </div>
          </Card>
        </div>

        {/* Continue Button */}
        {connectedBanks.length > 0 && (
          <div className="flex justify-center">
            <Button asChild size="lg">
              <Link href="/dashboard">Continue to Dashboard</Link>
            </Button>
          </div>
        )}
      </div>

      {/* Connection Dialog */}
      {selectedBank && (
        <ConnectAccountDialog
          bank={selectedBank}
          onClose={() => setSelectedBank(null)}
          onConnect={handleConnectionComplete}
        />
      )}
    </div>
  )
}
